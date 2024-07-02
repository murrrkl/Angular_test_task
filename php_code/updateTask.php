<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

$host = 'localhost';
$dbname = 'Tasks';
$username = '***';
$password = '***';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    if ($method == "GET" && isset($_GET['id'])) {

        $sql = "DELETE FROM Tasks WHERE id = :userid";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(":userid", $_GET["id"]);
        $stmt->execute();
        echo json_encode(array("message" => "Task added successfully"));
    }

    if ($method == "POST") {

        $id = $_POST['id'];
        $name = $_POST['name'];
        $date = $_POST['date'];
        $priority = $_POST['priority'];
        $labels = $_POST['labels'];
        $description = $_POST['description'];

        $sql = "UPDATE `Tasks` SET name = :name, date = :date, priority = :priority, labels = :labels, description = :description WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue("id", $id);
        $stmt->bindValue("name", $name);
        $stmt->bindValue("date", $date);
        $stmt->bindValue("priority", $priority);
        $stmt->bindValue("labels", $labels);
        $stmt->bindValue("description", $description);
        $stmt->execute();

        echo json_encode(array("message" => "Task update successfully"));

    }
} catch (PDOException $e) {
    echo "Database connection error" . $e->getMessage();
    die();
}
?>