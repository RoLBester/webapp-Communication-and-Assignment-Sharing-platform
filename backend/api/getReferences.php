<?php
// api/getReferences.php

require_once 'cors.php';
require_once 'auth.php';
require_once '../db/connect.php'; 

// For error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $decoded = authenticate();
    $user_id = $decoded->user_id;

    // Optional filtering by tags
    $tags = isset($_GET['tags']) ? $_GET['tags'] : null;

    if ($tags) {
        $sql = "SELECT r.*, u.name as uploader_name FROM file_references r JOIN users u ON r.uploader_id = u.id WHERE r.tags LIKE :tags";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':tags' => '%' . $tags . '%']);
    } else {
        $sql = "SELECT r.*, u.name as uploader_name FROM file_references r JOIN users u ON r.uploader_id = u.id";
        $stmt = $pdo->query($sql);
    }

    $references = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'references' => $references]);
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
