require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration Multer
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});
app.get('/', (req, res) => {
    res.send('Backend déployé avec succès 🎉');
});

// Route pour recevoir le PDF
app.post('/submit-form', upload.single('pdf'), async (req, res) => {
    try {
        // Vérifier le PDF
        if (!req.file) {
            return res.status(400).json({ error: "Aucun PDF reçu" });
        }

        // Récupérer toutes les données
        const formData = req.body;
        const pdfBuffer = req.file.buffer;

        // Configuration email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                servername: 'smtp.gmail.com'
            }
        });

        // Construire le contenu textuel
        let textContent = "Détails du contrat:\n\n";
        for (const [key, value] of Object.entries(formData)) {
            if (value) textContent += `${key}: ${value}\n`;
        }

        // Envoyer l'email
        await transporter.sendMail({
            from: `"Contrats Keurgui" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Nouveau contrat de ${formData.agence_nom || 'Agence inconnue'}`,
            attachments: [{
                filename: "Keurgui-contrat-courtage.pdf",
                content: pdfBuffer
            }]
        });

        res.json({ success: true, message: "Contrat reçu et envoyé" });

    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ 
            error: "Erreur serveur",
            details: error.message 
        });
    }
});
app.post('/send-form', upload.single('pdf'), async (req, res) => {
    try {
        // Vérifier le PDF
        if (!req.file) {
            return res.status(400).json({ error: "Aucun PDF reçu" });
        }

        // Récupérer toutes les données
        const formData = req.body;
        const pdfBuffer = req.file.buffer;

        // Configuration email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                servername: 'smtp.gmail.com'
            }
        });

        // Construire le contenu textuel
        let textContent = "Détails du contrat:\n\n";
        for (const [key, value] of Object.entries(formData)) {
            if (value) textContent += `${key}: ${value}\n`;
        }

        // Envoyer l'email
        await transporter.sendMail({
            from: `"Contrats Keurgui" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Nouveau contrat de ${formData.agence_nom || 'Agence inconnue'}`,
            attachments: [{
                filename: "Keurgui-Contrat-de-gestion-immobilière.pdf",
                content: pdfBuffer
            }]
        });

        res.json({ success: true, message: "Contrat reçu et envoyé" });

    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ 
            error: "Erreur serveur",
            details: error.message 
        });
    }
});
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});