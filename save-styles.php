<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// Get the updated CSS variables
$richBlack = $input['rich_black'] ?? '#0D1321';
$mauve = $input['mauve'] ?? '#BAA5FF';
$caribbean = $input['caribbean'] ?? '#38686A';
$ashGray = $input['ash_gray'] ?? '#A3B4A2';
$dun = $input['dun'] ?? '#CDC6AE';
$primaryFont = $input['primary_font'] ?? 'Arial, sans-serif';
$headingFont = $input['heading_font'] ?? 'Arial, sans-serif';
$baseFontSize = $input['base_font_size'] ?? '16';
$borderRadius = $input['border_radius'] ?? '8';

// Read the current styles.css file
$cssFile = 'styles.css';
if (!file_exists($cssFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'styles.css file not found']);
    exit;
}

$cssContent = file_get_contents($cssFile);

// Create the new :root section
$newRootSection = ":root {
    --rich-black: {$richBlack};
    --mauve: {$mauve};
    --caribbean: {$caribbean};
    --ash-gray: {$ashGray};
    --dun: {$dun};
    --primary-font: {$primaryFont};
    --heading-font: {$headingFont};
    --base-font-size: {$baseFontSize}px;
    --border-radius: {$borderRadius}px;
}";

// Replace the existing :root section
$pattern = '/:root\s*\{[^}]*\}/s';
$updatedCss = preg_replace($pattern, $newRootSection, $cssContent);

// If no :root section was found, add it at the beginning
if ($updatedCss === $cssContent) {
    $updatedCss = $newRootSection . "\n\n" . $cssContent;
}

// Write the updated CSS back to the file
if (file_put_contents($cssFile, $updatedCss) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write to styles.css']);
    exit;
}

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Styles updated successfully',
    'updated_variables' => [
        'rich_black' => $richBlack,
        'mauve' => $mauve,
        'caribbean' => $caribbean,
        'ash_gray' => $ashGray,
        'dun' => $dun,
        'primary_font' => $primaryFont,
        'heading_font' => $headingFont,
        'base_font_size' => $baseFontSize,
        'border_radius' => $borderRadius
    ]
]);
?>
