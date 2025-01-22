<?php
// api/getMessages.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$user_id = $decoded->user_id;

// Gets the conversation with another user
$other_user_id = isset($_GET['other_user_id']) ? $_GET['other_user_id'] : null;

if ($other_user_id) {
    $sql = "SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE (m.sender_id = :user_id AND m.receiver_id = :other_user_id) OR (m.sender_id = :other_user_id AND m.receiver_id = :user_id) ORDER BY m.timestamp ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':user_id' => $user_id,
        ':other_user_id' => $other_user_id,
    ]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'messages' => $messages]);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required parameter: other_user_id.']);
}
?>
