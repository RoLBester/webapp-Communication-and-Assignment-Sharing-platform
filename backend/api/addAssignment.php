<?php
// api/addAssignment.php

require_once 'cors.php';
require_once 'auth.php';

$decoded = authenticate();
$user_id = $decoded->user_id;

// Gets the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Checks if required fields are present
if (isset($input['assignment_title'], $input['course_name'], $input['deadline'])) {
    $assignment_title = $input['assignment_title'];
    $course_name = $input['course_name'];
    $deadline = $input['deadline'];

    // Prepares and execute the insert statement
    $sql = "INSERT INTO assignments (user_id, assignment_title, course_name, deadline) VALUES (:user_id, :assignment_title, :course_name, :deadline)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':user_id' => $user_id,
            ':assignment_title' => $assignment_title,
            ':course_name' => $course_name,
            ':deadline' => $deadline,
        ]);
        echo json_encode(['success' => true, 'message' => 'Assignment added successfully.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to add assignment.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
