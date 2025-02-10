<?php
// Endereço do roteador na rede local
$url = "http://192.168.0.10"; 

// Inicializa o cURL para buscar o conteúdo
$ch = curl_init($url);

// Configurações do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Faz a requisição
$response = curl_exec($ch);

// Verifica se houve erro
if (curl_errno($ch)) {
    echo "Erro: " . curl_error($ch);
} else {
    // Envia o conteúdo do roteador para o navegador
    header("Content-Type: text/html");
    echo $response;
}

// Fecha o cURL
curl_close($ch);
?>
