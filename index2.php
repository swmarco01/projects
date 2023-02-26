<?php
  session_start();
  if(isset($_POST['login'])){
    include 'include/connessione.php';

    $email = $_POST['emailPHP'];
    //$password = $_POST['passwordPHP'];
    $hashed_password = (md5($_POST['passwordPHP']));

    $query = $mysqli->query("SELECT * FROM utenti WHERE email = '$email' AND passwd = '$hashed_password' ");
    $row = $query->fetch_array(MYSQLI_ASSOC);
    if($row['passwd'] == $hashed_password && $row['email'] == $email ){
      
      $_SESSION['loggedIN'] = 1;
      $_SESSION['nome'] = $row['nome'];
      $_SESSION['cognome'] = $row['cognome'];
      exit("success");
    }else
      exit("failed");
  }
?>
      
      <?php
        //header
        include 'include/header.php';
        //ACCESSO
        include 'include/accesso.php';
        //main
        include 'include/webapp.php';
        //datatable
        include 'include/datatablescript.php';  
        //firebase
        //include 'include/firebasesdk.php';
        //footer
        include 'include/footer.php';
        
      ?>