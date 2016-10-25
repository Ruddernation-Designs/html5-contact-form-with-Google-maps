<?php

include 'scripts.php';

if (!empty($_POST)){
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('removebadtags', $_POST);
  $_POST  = multiDimensionalArrayMap('erasedata', $_POST);
  $emailto ="any@email.com";
  $emailFrom = $email = filter_input(INPUT_POST,"email");
  $emailsubject = "Contact Us!";
  $name = filter_input(INPUT_POST,"name");
  $email = filter_input(INPUT_POST,"email");
  $comment = filter_input(INPUT_POST,"comment");
  $captcha = filter_input(INPUT_POST,'g-recaptcha-response');
  $response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=Add-your-secret-key-here&response=".$captcha."&remoteip=".filter_input(INPUT_SERVER,'REMOTE_ADDR')), true);
  if($captcha == "")
  $data['success'] = false;
  if($name == "")
   $data['success'] = false;
 if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)) 
   $data['success'] = false;
   $datetime = date('H:i:s \o\n l jS F Y');
 if($comment == "")
   $data['success'] = false;
 if($data['success'] == true){
  $message = "Name: $name<br/>
  Email: $email<br/>
  Comment: $comment<br/>
  Date and Time: $datetime<br/>";
  
  $headers = "MIME-Version: 1.0" . "\r\n"; 
  $headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
  $headers .= "From: <$emailfrom>" . "\r\n";
  mail($emailto, $emailsubject, $message, $headers);
  $data['success'] = true;
  echo json_encode($data);
}
}
