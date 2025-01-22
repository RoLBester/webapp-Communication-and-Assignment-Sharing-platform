<?php
// api/register.php

require_once 'cors.php';
require_once '../db/connect.php';

// Gets the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Checks if required fields are present
if (isset($input['name'], $input['email'], $input['password'], $input['program'], $input['year'], $input['student_id'])) {
    $name = $input['name'];
    $email = $input['email'];
    $password = $input['password'];
    $program = $input['program'];
    $year = $input['year'];
    $student_id = $input['student_id'];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepares and execute the insert statement
    $sql = "INSERT INTO users (name, email, password, program, year, student_id) VALUES (:name, :email, :password, :program, :year, :student_id)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':password' => $hashed_password,
            ':program' => $program,
            ':year' => $year,
            ':student_id' => $student_id,
        ]);
        echo json_encode(['success' => true, 'message' => 'Registration successful.']);
    } catch (PDOException $e) {
        // Checks if email already exists
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'Email already exists.']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Registration failed.']);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
