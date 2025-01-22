<?php
// api/sendMessage.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$sender_id = $decoded->user_id;

// Gets the JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['receiver_id'], $input['message'])) {
    $receiver_id = $input['receiver_id'];
    $message = $input['message'];

    // Inserts message into messages table
    $sql = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (:sender_id, :receiver_id, :message)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':sender_id' => $sender_id,
        ':receiver_id' => $receiver_id,
        ':message' => $message,
    ]);

    echo json_encode(['success' => true, 'message' => 'Message sent.']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
