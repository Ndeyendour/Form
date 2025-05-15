async function generatePDFWithFields() {
    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer VOTRE_CLE_API',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            document: {
                document_template_id: 'VOTRE_MODELE_ID',
                payload: { /* Vos données de formulaire */ },
                meta: {
                    title: 'Contrat de courtage'
                }
            }
        })
    });
    // Récupérez le PDF généré
}