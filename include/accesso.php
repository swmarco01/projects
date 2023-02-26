<script src="js/accesso.js"></script>
<div class="opacitycontainer"></div>
<div class="fullscreen-container1">
  <div class="login-container">
    <div class="login-container-internal">
      <div class="form-row row">
        <span class="span-glyph2 glyphicon glyphicon-remove glyphicon-remove-button"></span>
      </div>
      <div class="form-row row">
        <span class="span-glyph1 glyphicon glyphicon-user"></span>
      </div>
      <div class="form-row row">
        <h3 class="formtext">ACCEDI</h3>
      </div>
      <div class="form-row row">
        <form class="login-form" action="accesso.php" method="post">  
          <div id="accesso-wrongalert" class="alert alert-danger wrongalert">
            <strong>Attenzione!</strong> Email o password non valide...
          </div>  
          <div id="accesso-successalert" class="alert alert-success successalert">
            <strong>Accesso in corso!</strong> 
          </div> 
          <input class="form-control form-input1" id="form-email" type="text" name="email" placeholder="Email" required>
          <input class="form-control form-input1" id="form-password" type="password" name="password" placeholder="Password" required>
          <p class="p-change-password">Cambia password</p>
          <button name="invio_dati" id="loginbutton1" class="w3-button w3-white w3-hover-orange w3-border w3-border-orange w3-round-xxlarge submit-button" type="button">ACCEDI</button>
        </form>
      </div>
      <div class="password-change-container">
        <form action="">

        </form>
      </div>
    </div>
  </div>
</div>
