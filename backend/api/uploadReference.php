<?php
// api/uploadReference.php

require_once 'cors.php';
require_once 'auth.php';
require_once '../db/connect.php';

// Enables error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $decoded = authenticate();
    $user_id = isset($decoded->user_id) ? $decoded->user_id : null;

    // Checks if user_id is set
    if (!$user_id) {
        throw new Exception('User not authenticated.', 401);
    }

    // Checks if a file has been uploaded
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $tags = isset($_POST['tags']) ? $_POST['tags'] : null;

        // Validates file upload
        if ($file['error'] === UPLOAD_ERR_OK) {
            $upload_dir = __DIR__ . '/../../public/uploads/'; // Adjusted path
            // To ensure the upload directory exists
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            $filename = time() . '_' . basename($file['name']);
            $target_file = $upload_dir . $filename;

            // Moves the uploaded file
            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                try {
                    // Insert into file_references table
                    $sql = "INSERT INTO file_references (file_path, uploader_id, tags) VALUES (:file_path, :uploader_id, :tags)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute([
                        ':file_path' => $target_file,
                        ':uploader_id' => $user_id,
                        ':tags' => $tags,
                    ]);

                    echo json_encode(['success' => true, 'message' => 'File uploaded successfully.']);
                } catch (PDOException $e) {
                    throw new Exception('Database error: ' . $e->getMessage(), 500);
                }
            } else {
                throw new Exception('Failed to move uploaded file.', 500);
            }
        } else {
            throw new Exception('File upload error.', 400);
        }
    } else {
        throw new Exception('No file uploaded.', 400);
    }
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit();
}
?>
