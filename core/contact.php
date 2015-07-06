<?php
function removebadtags($data) {
  $data = preg_replace("/<html/i", "&lt;html",$data);
  $data = preg_replace("/<body/i", "&lt;body",$data);
  $data = preg_replace("/<script/i", "&lt;&#115;cript",$data);
  $data = preg_replace("/onsubmit/i", "&#111;nsubmit",$data);
  $data = preg_replace("/onmouseover/i", "&#111;nmouseover",$data);
  $data = preg_replace("/onload/i", "&#111;nload",$data);
  $data = preg_replace("/onclick/i", "&#111;nclick",$data);
  $data = preg_replace("/document\./i", "&#100;ocument.",$data);
  $data = preg_replace("/javascript/i", "j&#097;v&#097;script",$data);
  $data = preg_replace("/alert/i", "&#097;lert",$data);
  return strip_tags(trim($data));
}
function erasedata($data) {
  $data = str_replace(' & ', ' &amp; ', $data);
  return (get_magic_quotes_gpc() ? stripslashes($data) : $data);
}
function multiDimensionalArrayMap($func,$arr) {
  $newArr = array();
  if (!empty($arr)) {
    foreach($arr AS $key => $value) {
      $newArr[$key] = (is_array($value) ? multiDimensionalArrayMap($func,$value) : $func($value));
    }
  }
  return $newArr;
}
if (!empty($_POST)){
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('removebadtags', $_POST);
  $_POST  = multiDimensionalArrayMap('erasedata', $_POST);
  $emailto ="any@email.com"; // This is the email you want the response to go to.
  $emailfrom ="any@email.com"; // This is to show where the email has come from and to stop errors with spam if using a black list.
  $emailsubject = "Contact Us!"; // This is the the title for the contact
  $name = $_POST["name"];
  $email = $_POST["email"];
  $comment = $_POST["comment"];
  if($name == "")
   $data['success'] = false;
 if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)) 
   $data['success'] = false;
 if($comment == "")
   $data['success'] = false;
 if($data['success'] == true){
  $message = "Name: $name<br />
  Email: $email<br />
  Comment: $comment";
  $headers = "MIME-Version: 1.0" . "\r\n"; 
  $headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
  $headers .= "From: <$emailfrom>" . "\r\n";
  mail($emailto, $emailsubject, $message, $headers);
  $data['success'] = true;
  echo json_encode($data);
}
}
