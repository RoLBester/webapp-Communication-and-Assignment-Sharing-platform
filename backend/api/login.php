<?php
// api/login.php

require_once 'cors.php';
require_once '../db/connect.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;

// Loads environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Gets secret key from environment variables
$secret_key = $_ENV['JWT_SECRET'];

// Get the JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['email'], $input['password'])) {
    $email = $input['email'];
    $password = $input['password'];

    // Prepares and execute the select statement
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Password is correct
        $issuedAt   = time();
        $expiration = $issuedAt + 3600; // Token valid for 1 hour

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expiration,
            'user_id' => $user['id'],
            'email' => $user['email']
        ];

        // Generates JWT
        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        // Updates last login time
        $login_sql = "INSERT INTO logins (user_id, last_login) VALUES (:user_id, NOW())
                      ON DUPLICATE KEY UPDATE last_login = NOW()";
        $login_stmt = $pdo->prepare($login_sql);
        $login_stmt->execute([':user_id' => $user['id']]);

        echo json_encode(['success' => true, 'token' => $jwt, 'user_id' => $user['id'], 'message' => 'Login successful.']);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
