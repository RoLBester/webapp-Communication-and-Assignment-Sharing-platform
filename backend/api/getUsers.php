<?php
// api/getUsers.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();

$sql = "SELECT id, name FROM users";

$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'users' => $users]);
?>
