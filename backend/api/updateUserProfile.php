<?php
// api/updateUserProfile.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$user_id = $decoded->user_id;

// Gets the JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['name'], $input['program'], $input['year'], $input['student_id'])) {
    $name = $input['name'];
    $program = $input['program'];
    $year = $input['year'];
    $student_id = $input['student_id'];

    $sql = "UPDATE users SET name = :name, program = :program, year = :year, student_id = :student_id WHERE id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':program' => $program,
        ':year' => $year,
        ':student_id' => $student_id,
        ':user_id' => $user_id,
    ]);

    echo json_encode(['success' => true, 'message' => 'Profile updated successfully.']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
