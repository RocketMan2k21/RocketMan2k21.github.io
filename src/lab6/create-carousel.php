<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract title and content from the JSON data
    $elementCount = $input['elementCount'];
    $elementOrder = $input['elementOrder'];
    $content = $input['content'];
  

    // Read existing data from the JSON file
    $configData = json_decode(file_get_contents('carousel.json'), true);

    // Add new tab to the array
    $configData[] = ['elementCount' => $elementCount, 'elementOrder' => $elementOrder, 'content' => $content];

    // Write the updated data back to the JSON file
    file_put_contents('carousel.json', json_encode($configData));

    // Redirect to the second page after adding the new tab
    header('Location: second.php');
    exit();
} else {
    http_response_code(405);
}

?>