<?php
// api/getAssignments.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$user_id = $decoded->user_id;

$sql = "SELECT * FROM assignments WHERE user_id = :user_id ORDER BY deadline ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute([':user_id' => $user_id]);
$assignments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'assignments' => $assignments]);
?>
