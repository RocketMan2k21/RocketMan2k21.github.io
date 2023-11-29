<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle both GET and POST requests

    // Example: Load data from a file
    $data = json_decode(file_get_contents('carousel.json'), true);
    echo json_encode($data);
} else {
    // Respond with a 405 Method Not Allowed for other request methods
    http_response_code(405);
}
?>