<?php
$ref = ref();

if($ref != 'p=agv') {
    header("Location: ./?p=404");
    exit;
} else {
    $pdo = conectar();
    extract($_GET);
    
    $query = updateExEvento();
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(1, "1", PDO::PARAM_INT);
    $stmt->bindValue(2, "0", PDO::PARAM_INT);
    $stmt->bindParam(3, $id, PDO::PARAM_INT);
    
    $result = $stmt->execute();
    
    if(!$result){
        echo $stmt->errorCode();
        exit;
    }else{
        $pdo = null;
        $stmt = null;
        header("Location: ./?p=agv&m=ex");
        exit;
    }
}
?>

