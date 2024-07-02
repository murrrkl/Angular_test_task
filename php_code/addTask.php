<?php
date_default_timezone_set('Asia/Vladivostok');

header("Access-Control-Allow-Origin: *"); // Разрешаем доступ с любого источника
header("Access-Control-Allow-Headers: Content-Type"); // Разрешаем заголовок Content-Type

$host = 'localhost'; // Адрес сервера базы данных
$dbname = 'Tasks'; // Имя базы данных
$username = '***';
$password = '***';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (!empty($_POST)) {
        $name = $_POST['name'];
        $name = ucfirst($name);
        $priority = $_POST['priority'];
        $labels = $_POST['labels'];
        $description = $_POST['description'];

        $date = new DateTime();
        $date = $date->format('Y-m-d H:i:s');

        $sql = $pdo->prepare("INSERT INTO Tasks(name, date, priority, labels, description) VALUES (?, ?, ?, ?, ?);");
        $sql->execute([$name, $date, $priority, $labels, $description]);

        echo json_encode(array("message" => "Task added successfully"));
    } else {
        echo json_encode(array("message" => "No data received"));
    }

} catch(PDOException $e) {
    echo json_encode(array("error" => $e->getMessage()));
}

?>