<?php
$url = "http://192.168.0.1"; // URL do site que você quer acessar
header("Content-Type: text/html");
echo file_get_contents($url);
?>
