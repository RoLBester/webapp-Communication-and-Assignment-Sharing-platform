<?php
// cors.php

// Allows requests from your frontend application
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust the origin to match your frontend URL

// Allows credentials (if needed)
header("Access-Control-Allow-Credentials: true");

// Specifies  allowed headers
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// Specifies allowed methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Sets content type to JSON with UTF-8 encoding
header("Content-Type: application/json; charset=UTF-8");

// Handles preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
