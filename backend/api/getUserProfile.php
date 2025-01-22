<?php
// api/getUserProfile.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$user_id = $decoded->user_id;

$sql = "SELECT id, name, email, program, year, student_id FROM users WHERE id = :user_id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':user_id' => $user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(['success' => true, 'user' => $user]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}
?>
