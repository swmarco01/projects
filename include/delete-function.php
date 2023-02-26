<?php
    session_start();
    if(isset($_POST['rimuoviveicolo'])){
        include 'connessione.php';

        $tipoveicolo = $_POST['tipoveicolodeletePHP'];
        $idveicolo = $_POST['id_veicoloPHP'];
        $idtrasportatore = $_SESSION['userID'];

        if($tipoveicolo == "Camion"){
            $query_cancellazione_veicolo = $mysqli->query("DELETE FROM camion WHERE ID = '$idveicolo'");
            if($query_cancellazione_veicolo){
                $mysqli->query("DELETE FROM filtri WHERE id_camion = '$idveicolo'");
                $mysqli->query("DELETE FROM oli WHERE id_camion = '$idveicolo'");
                $mysqli->query("DELETE FROM revisione WHERE id_camion = '$idveicolo'");
                $mysqli->query("DELETE FROM ruote_camion WHERE id_camion = '$idveicolo'");
                exit("success");
            }
            else
                exit("failed");
        }else if($tipoveicolo == "Rimorchio"){
            $query_cancellazione_veicolo = $mysqli->query("DELETE FROM rimorchio WHERE ID = '$idveicolo'");
            if($query_cancellazione_veicolo){
                $mysqli->query("DELETE FROM revisione WHERE id_rimorchio = '$idveicolo'");
                $mysqli->query("DELETE FROM ruote_rimorchio WHERE id_rimorchio = '$idveicolo'");
                exit("success");
            }else
                exit("failed");
        }
    }
?>