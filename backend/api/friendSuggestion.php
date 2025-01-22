<?php
// api/friendSuggestion.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$current_user_id = $decoded->user_id;

// Gets the current user's information
$sql = "SELECT * FROM users WHERE id = :user_id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':user_id' => $current_user_id]);
$current_user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($current_user) {
    // Finds other users with the same program, excluding the current user
    $sql = "SELECT id, name, email, program, year FROM users WHERE program = :program AND id != :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':program' => $current_user['program'], ':user_id' => $current_user_id]);
    $suggested_friends = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'suggestions' => $suggested_friends]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}
?>
