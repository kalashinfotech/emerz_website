<?php
$host = "localhost";
$dbname = "postgres";
$user = "postgres";
$pass = "DarshanJain@123";

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$pass");
if (!$conn) {
    die("Database connection error: " . pg_last_error());
}

$saveFlag = $_POST['saveFlag'] ?? '';
if ($saveFlag === 'SAVEENQUIRY') {
    $name = $_POST['name'] ?? '';
    $email_id = $_POST['email_id'] ?? '';
    $mobile_no = $_POST['mobile_no'] ?? null;

    $query = "INSERT INTO enquiry (name, email_id, mobile_no) VALUES ($1, $2, $3)";
    $result = pg_query_params($conn, $query, [$name, $email_id, $mobile_no]);

    if ($result) {
        echo "Enquiry submitted successfully!";
    } else {
        echo "Error: " . pg_last_error($conn);
    }
} else {
    echo "Invalid request";
}

pg_close($conn);
?>
