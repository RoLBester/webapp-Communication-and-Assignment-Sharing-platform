<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); 
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

require_once 'auth.php';

$decoded = authenticate();

$sql = "SELECT u.id, u.name, u.email, l.last_login FROM users u LEFT JOIN logins l ON u.id = l.user_id";

$stmt = $pdo->query($sql);
$users = $stmt->fetchAll();

echo json_encode(['success' => true, 'users' => $users]);
?>
