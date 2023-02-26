<!DOCTYPE html>
<html class="wide wow-animation" lang="it">
  <head>
    <title>Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="css/mystyle.css">
    <link rel="stylesheet" href="css/w3.css">
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Montserrat:300,400,700%7CPoppins:300,400,500,700,900">
    <link rel="stylesheet" href="css/bootstrap2.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/datatables.css"/>
 
  
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    

    <style>.ie-panel{display: none;background: #212121;padding: 10px 0;box-shadow: 3px 3px 5px 0 rgba(0,0,0,.3);clear: both;text-align:center;position: relative;z-index: 1;} html.ie-10 .ie-panel, html.lt-ie-10 .ie-panel {display: block;}</style>
  </head>
  <body scroll="no">
    <div class="ie-panel"><a href="http://windows.microsoft.com/en-US/internet-explorer/"><img src="images/ie8-panel/warning_bar_0000_us.jpg" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."></a></div>
    <div class="preloader">
      <div class="preloader-body">
        <div class="cssload-container">
          <div class="cssload-speeding-wheel"></div>
        </div>
        <p>Loading...</p>
      </div>
    </div>
    <div class="page">
      <header class="section page-header">
        <!--RD Navbar-->
        <div class="rd-navbar-wrap">
          <nav class="rd-navbar rd-navbar-classic" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-static" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
            <div class="rd-navbar-main-outer">
              <div class="rd-navbar-main">
                <!--RD Navbar Panel-->
                <div class="rd-navbar-panel">
                  <!--RD Navbar Toggle-->
                  <button class="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                  <!--RD Navbar Brand-->
                  <div class="rd-navbar-brand">
                    <!--Brand--><a class="brand" href="index.php"><img class="brand-logo-dark" src="images/logo.png" alt="" width="100" height="17"/><img class="brand-logo-light" src="images/logo.png" alt="" width="100" height="17"/></a>
                  </div>
                </div>
                <div class="rd-navbar-main-element">
                  <div class="rd-navbar-nav-wrap">
                    <ul class="rd-navbar-nav">
                      <?php
                        if(!isset($_SESSION['loggedIN'])){
                      ?>
                      <li class="rd-nav-item active"><a class="rd-nav-link" href="index.php">Home</a>
                      </li>
                      <li class="rd-nav-item"><a class="rd-nav-link" href="#">Parco Veicoli</a>
                      </li>
                      <li class="rd-nav-item"><a class="rd-nav-link" href="#">Tracking </a>
                      </li>

                      <li id="" class="rd-nav-item"><a class="rd-nav-link" href="#"> </a>
                      </li>
                      <li class="rd-nav-item"><p id="button_login_personale" class="rd-nav-link">ACCEDI</p>
                      </li>
                      <?php
                        }else{
                      ?>
                      
                      <li class="rd-nav-item active"><a class="rd-nav-link" href="index.php">Home</a>
                      </li>
                      <li class="rd-nav-item"><a class="rd-nav-link" href="#">Tracking </a>
                      </li>

                      <li id="" class="rd-nav-item"><a class="rd-nav-link" href="index2.php">WEB APP</a>
                      </li>
                      <li id="" class="rd-nav-item"><p class="rd-nav-link"></p>
                      </li>
                      <li class="rd-nav-item">
                        <p id="username-nav-item" class="rd-nav-link">
                          <?php
                            echo $_SESSION['ragione_sociale'];
                          ?>
                        </p>
                      </li> 
                      <li class="rd-nav-item"><a class="rd-nav-link" href="include/disconnessione.php">Logout</a>
                      </li>                     
                    <?php
                      }
                    ?>
                    
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>