<?php

if (isset($_GET['debug'])) {
    die(highlight_file(__FILE__));
}
?>
<!DOCTYPE HTML>
<html>
  <title>Bypass 2FA</title>
  <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <style>
    .corb-body { background-color: #0f0f0f;}

    .centered {
      position: fixed;
      top: 50%;
      left: 50%;
      /* bring your own prefixes */
      transform: translate(-50%, -50%);
    }

    .corb-login-length { width: 200px;}
    .corb-submit { position: relative; left: auto; right: -120px;}
    .corb-flag { color: #ffffff; }
    .corb-alert { margin-top: 20px; }
  </style>
  </head>
  <body class="corb-body container-fluid">
<?php
include 'flag.php';

if($_SERVER['REQUEST_METHOD'] == "POST"){
  $min_digits = 1000;  // Change this to set the desired number of digits
  $max_digits = 1370;  // Adjust this accordingly
  
  $otpcode = mt_rand($min_digits, $max_digits);
  
    extract($_POST);
    
    if($password == $otpcode){
        echo('<h1><div class="alert alert-success centered" role="alert"> Flag: '.$flag.' </div></h1>');   
    }else{
        echo('<h1><div class="alert alert-danger centered" role="alert">Sorry, Wrong password!</div></h1>');   
    }    
die;
}
?>
</div>
<div class="row">
  <div class="centered">
    <div class="well">
      <center><h3 class="corb-login-length">User: Admin</h3></center>
      <p style="font-size: 14px; color: #333;">OTP has been sent to <span style="font-family: inherit;">na***.1401@gmail.com</span></p>
      <br/>
      <form method="POST">
        <input name="password" class="form-control" type="text" placeholder="ENTER 4 DIGIT OTP">
        <br/>
        <button class="corb-submit btn btn-primary btn-lg" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

 <script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </body>
  <!-- the bruteforce limit is in gmail-->
</html>