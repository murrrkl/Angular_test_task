<?php
header("Access-Control-Allow-Origin: *"); // Allowing access from any origin
header("Access-Control-Allow-Headers: Content-Type"); // Allowing Content-Type header

$method = $_SERVER['REQUEST_METHOD'];

$host = 'localhost';
$dbname = 'Tasks';
$username = '***';
$password = '***';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    if ($method == "GET") {
        $page = isset($_GET['page']) ? $_GET['page'] : 0; // Номер страницы
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 15; // Лимит записей на странице
        $offset = $page * $limit;

        $priority_filters = isset($_GET['priority_filters']) && $_GET['priority_filters'] !== "" ? explode(',', $_GET['priority_filters']) : ['low', 'normal', 'high'];
        $priority_condition = "priority IN ('" . implode("', '", $priority_filters) . "')";

        $label_filters = isset($_GET['labels']) && $_GET['labels'] !== "" ? explode(',', $_GET['labels']) : [];
        $label_conditions = [];
        foreach ($label_filters as $label) {
            $label_conditions[] = "labels LIKE '%" . $label . "%'";
        }
        $label_condition = implode(' OR ', $label_conditions);

        $filter_conditions = [$priority_condition];
        if (!empty($label_condition)) {
            $filter_conditions[] = "(". $label_condition . ")";
        }

        $where_clause = " WHERE " . implode(' AND ', $filter_conditions);

        $sort = isset($_GET['sort']) && $_GET['sort'] === 'desc' ? 'DESC' : 'ASC';

        $stmt = $pdo->prepare("SELECT * FROM Tasks" . $where_clause . " ORDER BY id " . $sort . " LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($data);
    }
} catch (PDOException $e) {
    echo "Ошибка подключения к базе данных: " . $e->getMessage();
    die();
}
?>