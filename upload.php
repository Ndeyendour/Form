<?php
if (isset($_FILES['pdf_file'])) {
    $file = $_FILES['pdf_file']['tmp_name'];
    $filename = $_FILES['pdf_file']['name'];
    $to = 'ndeyefatou023@gmail.com'; // 🔁 Remplace avec ton adresse email
    $subject = 'Formulaire PDF reçu';
    $message = 'Bonjour, vous avez reçu un formulaire PDF en pièce jointe.';

    $content = chunk_split(base64_encode(file_get_contents($file)));
    $boundary = md5(time());

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: formulaire@tonsite.com\r\n"; // 🔁 Adresse d’envoi
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n\r\n";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $message . "\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
    $body .= $content . "\r\n";
    $body .= "--{$boundary}--";

    $success = mail($to, $subject, $body, $headers);

    if ($success) {
        echo "✅ PDF envoyé avec succès à $to.";
    } else {
        echo "❌ Erreur lors de l'envoi du PDF.";
    }
} else {
    echo "❌ Aucun fichier reçu.";
}
?>
