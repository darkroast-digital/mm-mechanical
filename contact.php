<?php
if($_POST)
{
  $to_email   	= "info@mm-mechanical.com"; //Recipient email

  //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

    $output = json_encode(array( //create JSON data
      'type'=>'error',
      'text' => 'Sorry Request must be Ajax POST'
    ));
    die($output); //exit script outputting json data
    }

  //Sanitize input data using PHP filter_var().
  $user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
  $user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$user_phone		= filter_var($_POST["user_phone"], FILTER_SANITIZE_EMAIL);
  $message		= filter_var($_POST["msg"], FILTER_SANITIZE_STRING);

  //additional php validation
  if(strlen($user_name)<2){ // If length is less than 4 it will output JSON error.
    $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
    die($output);
  }
  if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
    $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
    die($output);
  }
  if(strlen($message)<3){ //check emtpy message
    $output = json_encode(array('type'=>'error', 'text' => 'Your Message Is Too Short!'));
    die($output);
  }

  //email body
  $message_body = $message."\r\n\r\nFirst Name : ".$user_name."\r\nEmail : ".$user_email."\r\nPhone : ".$user_phone ;

  //proceed with PHP email.
  $headers = 'From: '.$user_name.'' . "\r\n" .
  'Reply-To: '.$user_email.'' . "\r\n" .
  'X-Mailer: PHP/' . phpversion();

  $send_mail = mail($to_email, "New Contact From $user_name", $message_body, $headers);

  if(!$send_mail)
  {
    //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
    $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail!'));
    die($output);
  }else{
    $output = json_encode(array('type'=>'message', 'text' => 'Hey '.$user_name .' . Thanks for the message.'));
    die($output);
  }
}
?>
