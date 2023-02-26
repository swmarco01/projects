<?php
$host='localhost';
$user='root';
$pwd='';
$db='giovatrasporti';
$mysqli = new mysqli($host, $user, $pwd);  //libreria per l'interazione tra PHP e i database come MySQLi;
										   // effettua le operazioni di connessione a MySQL per la creazione di un database tramite MySQLi

$mysqli->query("use ".$db); //seleziona un database ed esegue operazioni SQL in tale banca dati.
?>
