<script src="js/wheel-function.js"></script>
<script src="js/revision-function.js"></script>
<script src="js/filter-function.js"></script>
<script src="js/oil-function.js"></script>
<script src="js/delete-function.js"></script>
<script src="js/insert-function-form.js"></script>
<div class="webapp-overlayer">
    <div class="opacitycontainer webapp-functions-container"></div>
        <div class="fullscreen-container1 webapp-functions-container">
            <!-- FUNZIONE AGGIUNGI CAMION -->

            <div class="insert-function-container function-container-style">
                <div class="insert-function-container-internal function-container-internal-style">
                    <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/gear.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">AGGIUNGI NUOVO VEICOLO</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-insert-function-form function-form" action="webappfunctions.php" method="post">  
                            <div class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Inserimento non riuscito, controlla i campi...
                            </div>  
                            <div class="alert alert-success webapp-successalert successalert">
                                <strong>Veicolo inserito con successo!</strong> 
                            </div> 
                            <select class="form-control" name="webapp-tipoveicolo" id="webapp-form-tipoveicolo">
                                <option value="Camion">Camion</option>
                                <option value="Rimorchio">Rimorchio</option>
                            </select>
                            <input class="form-control form-input1" id="webapp-form-veicolo-name" type="text" name="webapp-form-veicolo-name" placeholder="Nome del veicolo" required>
                            <input class="form-control form-input1" id="webapp-form-targa-name" type="text" name="webapp-form-targa-name" placeholder="Targa del veicolo" required>
                            <button name="invio_dati" id="invio_dati_insert_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- FUNZIONE RIMUOVI CAMION -->

            <div class="remove-function-container function-container-style">
                <div class="remove-function-container-internal function-container-internal-style">
                <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/gear.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">ELIMINA VEICOLO</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-remove-function-form function-form" action="webappfunctions.php" method="post">  
                            <div id="delete-wrong-alert" class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Cancellazione non riuscita, controlla i campi...
                            </div>  
                            <div id="delete-success-alert" class="alert alert-success webapp-successalert successalert">
                                <strong>Veicolo eliminato con successo!</strong> 
                            </div> 
                            <select class="form-control form-input1" name="webapp-tipoveicolo" id="select-tipoveicolo-delete-function">
                                <option id="option-value-nothing" value="-">-</option>
                                <option id="option-value-camion" value="Camion">Camion</option>
                                <option id="option-value-rimorchio" value="Rimorchio">Rimorchio</option>
                            </select>
                            <select name="webapp-veicolo-camion" id="delete-select-camion" class="form-control form-input1" style="display:block;">
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_camion = $mysqli->query("SELECT * FROM camion WHERE camion.id_trasportatore = '$trasportatoreID'");

                                    if($query_camion->num_rows > 0){
                                        while($row_camion=$query_camion->fetch_assoc()){
                                            echo '
                                                <option value="'.$row_camion['ID'].'">'.$row_camion['nome'].' -  Tg : '.$row_camion['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select name="webapp-veicolo-rimorchio" id="delete-select-rimorchio" class="form-control form-input1">
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $i=0;
                                    $query_rimorchio = $mysqli->query("SELECT * FROM rimorchio WHERE rimorchio.id_trasportatore='$trasportatoreID'");

                                    if($query_rimorchio->num_rows > 0){
                                        while($row_rimorchio=$query_rimorchio->fetch_assoc()){
                                            echo '
                                                <option value="'.$row_rimorchio['ID'].'">'.$row_rimorchio['nome'].' -  Tg : '.$row_rimorchio['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <button name="invio_dati" id="invio_dati_delete_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- FUNZIONE AGGIUNGI CAMBIO OLIO -->

            <div class="oil-function-container function-container-style">
                <div class="oil-function-container-internal function-container-internal-style">
                <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/olio.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">AGGIUNGI CAMBIO D'OLIO</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-oil-function-form function-form" action="webappfunctions.php" method="post">  
                            <div id="oil-wrong-alert" class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Operazione non riuscita, controlla i campi...
                            </div>  
                            <div id="oil-success-alert" class="alert alert-success webapp-successalert successalert">
                                <strong>Cambio d'olio aggiunto con successo!</strong> 
                            </div> 
                            <select name="webapp-veicolo-camion" id="oil-select-camion" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_oil" value="-">Seleziona camion</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_camion = $mysqli->query("SELECT * FROM camion WHERE camion.id_trasportatore = '$trasportatoreID'");

                                    if($query_camion->num_rows > 0){
                                        while($row_camion=$query_camion->fetch_assoc()){
                                            echo '
                                                <option class="option_active_oil" value="'.$row_camion['ID'].'">'.$row_camion['nome'].' -  Tg : '.$row_camion['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select name="oil-choose-select" id="oil-choose-select" class="form-control form-input1">
                                <option class="option_inactive_type_oil" value="-">Seleziona il tipo di olio</option>
                                <option class="option_active_type_oil" value="motore">Olio motore</option>
                                <option class="option_active_type_oil" value="cambio">Olio cambio</option>
                                <option class="option_active_type_oil" value="differenziale">Olio differenziale</option>
                            </select>
                            <input id="oil-date-input" class="form-control form-input1" type="date">
                            <button name="invio_dati" id="invio_dati_oil_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- FUNZIONE AGGIUNGI CAMBIO FILTRO -->

            <div class="filter-function-container function-container-style">
                <div class="filter-function-container-internal function-container-internal-style">
                <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/filter.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">AGGIUNGI CAMBIO FILTRO</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-filter-function-form function-form" action="webappfunctions.php" method="post">  
                            <div id="filter-wrong-alert" class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Operazione non riuscita, controlla i campi...
                            </div>  
                            <div id="filter-success-alert" class="alert alert-success webapp-successalert successalert">
                                <strong>Cambio filtro aggiunto con successo!</strong> 
                            </div> 
                            <select name="webapp-veicolo-camion" id="filter-select-camion" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_filter" value="-">Seleziona camion</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_camion = $mysqli->query("SELECT * FROM camion WHERE camion.id_trasportatore = '$trasportatoreID'");

                                    if($query_camion->num_rows > 0){
                                        while($row_camion=$query_camion->fetch_assoc()){
                                            echo '
                                                <option class="option_active_filter" value="'.$row_camion['ID'].'">'.$row_camion['nome'].' -  Tg : '.$row_camion['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select name="filter-choose-select" id="filter-choose-select" class="form-control form-input1">
                                <option class="option_inactive_type_filter" value="-">Seleziona il tipo di filtro</option>
                                <option class="option_active_type_filter" value="gasolio">Filtro gasolio</option>
                                <option class="option_active_type_filter" value="olio">Filtro olio</option>
                                <option class="option_active_type_filter" value="aria">Filtro aria</option>
                                <option class="option_active_type_filter" value="essiccatore">Filtro essiccatore</option>
                            </select>
                            <input id="filter-date-input" class="form-control form-input1" type="date">
                            <button name="invio_dati" id="invio_dati_filter_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- FUNZIONE AGGIUNGI REVISIONE -->

            <div class="revision-function-container function-container-style">
                <div class="revision-function-container-internal function-container-internal-style">
                    <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/revisione.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">AGGIUNGI NUOVA REVISIONE</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-revision-function-form function-form" action="webappfunctions.php" method="post">  
                            <div id="revision-wrong-alert" class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Operazione non riuscita, controlla i campi...
                            </div>  
                            <div id="revision-success-alert" class="alert alert-success webapp-successalert successalert">
                                <strong>Revisione aggiunta con successo!</strong> 
                            </div> 
                            <select class="form-control form-input1" name="webapp-tipoveicolo" id="revision-tipoveicolo">
                                <option class="unselected_type_revision" value="-">Seleziona tipo veicolo</option>
                                <option class="selected_type_camion_revision" value="Camion">Camion</option>
                                <option class="selected_type_rimorchio_revision" value="Rimorchio">Rimorchio</option>
                            </select>
                            <select name="webapp-veicolo-camion" id="revision-select-camion" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_camion_revision" value="-">Seleziona camion</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_camion = $mysqli->query("SELECT * FROM camion WHERE camion.id_trasportatore = '$trasportatoreID'");

                                    if($query_camion->num_rows > 0){
                                        while($row_camion=$query_camion->fetch_assoc()){
                                            echo '
                                                <option class="option_active_camion_revision" value="'.$row_camion['ID'].'">'.$row_camion['nome'].' -  Tg : '.$row_camion['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select name="webapp-veicolo-rimorchio" id="revision-select-rimorchio" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_rimorchio_revision" value="-">Seleziona Rimorchio</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_rimorchio = $mysqli->query("SELECT * FROM rimorchio WHERE rimorchio.id_trasportatore = '$trasportatoreID'");

                                    if($query_rimorchio->num_rows > 0){
                                        while($row_rimorchio=$query_rimorchio->fetch_assoc()){
                                            echo '
                                                <option class="option_active_rimorchio_revision" value="'.$row_rimorchio['ID'].'">'.$row_rimorchio['nome'].' -  Tg : '.$row_rimorchio['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <input id="revision-date-input" class="form-control form-input1" type="date">
                            <button name="invio_dati" id="invio_dati_revision_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- FUNZIONE AGGIUNGI CAMBIO RUOTE -->

            <div class="wheel-function-container function-container-style">
                <div class="wheel-function-container-internal function-container-internal-style">
                    <div class="form-row row">
                        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
                    </div>
                    <div class="form-row row">
                        <img class="functionimg" src="images/wheel.png">
                    </div>
                    <div class="form-row row">
                        <h3 class="formtext">AGGIUNGI NUOVO CAMBIO RUOTE</h3>
                    </div>
                    <div class="form-row row">
                        <form class="webapp-wheel-function-form function-form" action="webappfunctions.php" method="post">  
                            <div id="wheel-wrong-alert" class="alert alert-danger webapp-wrongalert wrongalert">
                                <strong>Attenzione!</strong> Operazione non riuscita, controlla i campi...
                            </div>  
                            <div id="wheel-success-alert" class="alert alert-success webapp-successalert successalert">
                                <strong>Cambio ruota aggiunto con successo!</strong> 
                            </div> 
                            <select class="form-control form-input1" name="webapp-tipoveicolo" id="wheel-tipoveicolo">
                                <option class="unselected_type_wheel" value="-">Seleziona tipo veicolo</option>
                                <option class="selected_type_camion_wheel" value="Camion">Camion</option>
                                <option class="selected_type_rimorchio_wheel" value="Rimorchio">Rimorchio</option>
                            </select>
                            <select name="webapp-veicolo-camion" id="wheel-select-camion" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_camion_wheel" value="-">Seleziona camion</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_camion = $mysqli->query("SELECT * FROM camion WHERE camion.id_trasportatore = '$trasportatoreID'");

                                    if($query_camion->num_rows > 0){
                                        while($row_camion=$query_camion->fetch_assoc()){
                                            echo '
                                                <option class="option_active_camion_wheel" value="'.$row_camion['ID'].'">'.$row_camion['nome'].' -  Tg : '.$row_camion['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select name="webapp-veicolo-rimorchio" id="wheel-select-rimorchio" class="form-control form-input1" style="display:block;">
                                <option class="option_inactive_rimorchio_wheel" value="-">Seleziona Rimorchio</option>
                                <?php
                                    $trasportatoreID = $_SESSION['userID'];
                                    $rimorchiostring= "Rimorchio";
                                    $camionstring= "Camion";
                                    $i=0;
                                    $query_rimorchio = $mysqli->query("SELECT * FROM rimorchio WHERE rimorchio.id_trasportatore = '$trasportatoreID'");

                                    if($query_rimorchio->num_rows > 0){
                                        while($row_rimorchio=$query_rimorchio->fetch_assoc()){
                                            echo '
                                                <option class="option_active_rimorchio_wheel" value="'.$row_rimorchio['ID'].'">'.$row_rimorchio['nome'].' -  Tg : '.$row_rimorchio['targa'].'</option>
                                            ';
                                        }
                                    }
                                ?>
                            </select>
                            <select class="form-control form-input1" name="webapp-tipoveicolo" id="wheel-camion">
                                <option class="unselected_wheel_camion" value="-">Seleziona ruota</option>
                                <option class="selected_wheel_camion" value="data_ruota_ant_sx">Ruota anteriore sinistra</option>
                                <option class="selected_wheel_camion" value="data_ruota_ant_dx">Ruota anteriore destra</option>
                                <option class="selected_wheel_camion" value="data_ruota_post_sx">Ruota posteriore sinistra</option>
                                <option class="selected_wheel_camion" value="data_ruota_post_dx">Ruota posteriore destra</option>
                            </select>
                            <select class="form-control form-input1" name="webapp-tipoveicolo" id="wheel-rimorchio">
                                <option class="unselected_wheel_rimorchio" value="-">Seleziona ruota</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_1_sx">Ruota 1° asse sinistra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_1_dx">Ruota 1° asse destra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_2_sx">Ruota 2° asse sinistra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_2_dx">Ruota 2° asse destra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_3_sx">Ruota 3° asse sinistra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_3_dx">Ruota 3° asse destra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_4_sx">Ruota 4° asse sinistra</option>
                                <option class="selected_wheel_rimorchio" value="data_ruota_4_dx">Ruota 4° asse destra</option>
                            </select>
                            <input id="wheel-date-input" class="form-control form-input1" type="date">
                            <button name="invio_dati" id="invio_dati_wheel_function" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">INVIA DATI</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    