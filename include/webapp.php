<?php

    include 'include/connessione.php';
    if(!isset($_SESSION['loggedIN'])){
        include 'include/webappimg.php';
?>
<!-- NOT PERMISSION -->

<section id="webapp-section-not-permission" class="section section-sm position-relative">
    <div id="webapp-not-permission" class="alert alert-danger webapp-wrongalert">
        <strong>Attenzione!</strong> Per accedere a questo contenuto è necessario effettuare l'accesso...
    </div>  
</section>

<?php
    }else if( $_SESSION['webapp'] == 1 ){
        
?>
<!-- GRANTED PERMISSION -->

<?php
    include 'include/webappfunctions.php';
    include 'include/webappimg.php';
?>
<section id="webapp-section-poorwidth" class="section section-sm position-relative">
    <div id="webapp-div-poorwidth" class="alert alert-danger webapp-wrongalert">
        <strong>Attenzione!</strong> La webapp non è stata ancora implementata per il tuo dispositivo...
    </div>  
</section>
<section id="webapp-section" class="section section-sm position-relative">
    <div class="welcometext-container">
        <?php
            echo '<h3 align="center" class="welcometext">Benvenuto '.$_SESSION['ragione_sociale'].'</h3>';
        ?>
    </div>
    <div class="container1 clearfix">
        <div class="side-menu">
            <nav class="">
                <ul class="rd-navbar-nav">
                    <li class="rd2-nav-item"><span class="glyphicon glyphicon-plus-sign plus-glyph"></span><p id="oilbutton" class="rd2-nav-link p-link-style underline" href="">Cambio olio</p></li>
                    <li class="rd2-nav-item"><span class="glyphicon glyphicon-plus-sign plus-glyph"></span><p id="filterbutton" class="rd2-nav-link p-link-style" href="">Cambio filtro</p></li>
                    <li class="rd2-nav-item"><span class="glyphicon glyphicon-plus-sign plus-glyph"></span><p id="wheelbutton" class="rd2-nav-link p-link-style" href="">Cambio ruote</p></li>
                    <li class="rd2-nav-item"><span class="glyphicon glyphicon-plus-sign plus-glyph"></span><p id="revisionbutton" class="rd2-nav-link p-link-style" href="">Nuova revisione</p></li>
                </ul>

            </nav>
        </div>
        <div class="webapp-insert-container">
            <div class="insert-container">
                <span class="glyphicon glyphicon-plus-sign plus-glyph"></span><p id="insert-button" class="rd2-nav-link p-link-style underline" href="">Inserisci veicolo</p>
            </div>
            <div class="remove-container">
                <span class="glyphicon glyphicon-minus-sign minus-glyph"></span><p id="remove-button" class="rd2-nav-link p-link-style underline" href="">Elimina veicolo</p>
            </div>
        </div>
        <div class="webapp-table-container">
            <table id="webapp-table" class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tipo veicolo</th>
                        <th>Nome</th>
                        <th>Targa</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    
</section>
    


<?php
    //include 'include/datatablescript.php';  
}else if( $_SESSION['webapp'] != 1 ){
    include 'include/webappimg.php';
?>

<section id="webapp-section-not-permission" class="section section-sm position-relative">
    <div id="webapp-not-permission" class="alert alert-danger webapp-wrongalert">
        <strong>Attenzione!</strong> Non hai i permessi per accedere a questo contenuto...
    </div>  
<section>

<?php
}
?>