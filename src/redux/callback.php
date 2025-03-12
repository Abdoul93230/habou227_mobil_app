// Fichier callback.php
header("Content-Type: application/json");

// Récupération des données JSON envoyées par iPaymoney
$data = json_decode(file_get_contents("php://input"), true);

// Vérification des données reçues
if (isset($data['transaction_id']) && isset($data['status'])) {
    $transactionId = $data['transaction_id'];
    $status = $data['status'];

    // Logique de traitement en fonction du statut (succès ou échec)
    if ($status == 'success') {
        // Mettre à jour la transaction en base de données comme étant réussie
    } elseif ($status == 'failed') {
        // Mettre à jour la transaction en échec
    }

    // Réponse JSON
    echo json_encode(["status" => "received"]);
} else {
    http_response_code(400); // Mauvaise requête
    echo json_encode(["error" => "Invalid data"]);
}
