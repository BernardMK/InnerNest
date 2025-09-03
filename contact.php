<?php


  $name = "";
  $email = "";
  $phonenumber = "";
  $booking_date = "";
  $subject = "";
  $message = "";
  $error = false;

  if($_SERVER["REQUEST_METHOD"] == "post"){
    if(!empty($_POST["name"])){
      $name = $_POST["name"];
    }else{
      $error = true;
      $name_error = true;
    }
    if(!empty($_POST["email"])){
      $email = $_POST["email"];
    }else{
      $error = true;
      $email_error = true;
    }
    if(!empty($_POST["phonenumber"])){
      $phonenumber = $_POST["phonenumber"];
    }else{
      $error = true;
      $phonenumber_error = true;
    }
    if(!empty($_POST["date"])){
      $booking_date = $_POST["date"];
    }else{
      $error = true;
      $booking_date_error = true;
    }
    if(!empty($_POST["subject"])){
      $subject = $_POST["subject"];
    }else{
      $error = true;
      $subject_error = true;
    }
    if(!empty($_POST["message"])){
      $message = $_POST["message"];
    }else{
      $error = true;
      $message_error = true;
    }
  }


?>