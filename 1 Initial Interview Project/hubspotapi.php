<?php
   //Process a new form submission in HubSpot in order to create a new Contact.

$firstname=$_POST["firstname"];
$lastname=$_POST["lastname"];
$email=$_POST["email"];
$phonenumber=$_POST["phonenumber"];

$hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
$ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
$hs_context      = array(
    'hutk' => $hubspotutk,
    'ipAddress' => $ip_addr,
    'pageUrl' => 'http://www.mikehodsdon.com',
    'pageName' => 'Landing Page Test',
  //  'redirectUrl'=> 'http://www.mikehodsdon.com/thankyou.html'
);
$hs_context_json = json_encode($hs_context);


//Need to populate these variable with values from the form.
$str_post = "firstname=" . urlencode($firstname)
    . "&lastname=" . urlencode($lastname)
    . "&email=" . urlencode($email)
    . "&phone=" . urlencode($phonenumber)
    . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

//replace the values in this URL with your portal ID and your form GUID
$endpoint = 'https://forms.hubspot.com/uploads/form/v2/3829580/b18578de-e8f1-4aaf-9a3c-05a3e4539e15';

//print_r($str_post); // print the string being sent to hubspot for debugging only

$ch = @curl_init();
@curl_setopt($ch, CURLOPT_POST, true);
@curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
@curl_setopt($ch, CURLOPT_URL, $endpoint);
@curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded'
));
@curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response    = @curl_exec($ch); //Log the response from HubSpot as needed.
$status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
@curl_close($ch);

//redirecting based upon status code..  ONLY works if nothing is printed previously by script
if($status_code=="204")
{
  header("Location: http://www.mikehodsdon.com/thankyou.html");
}
if($status_code=="302")
{
  header("Location: http://www.mikehodsdon.com/thankyou.html");
}
else
{
  echo $status_code . " " . $response;
}




?>
