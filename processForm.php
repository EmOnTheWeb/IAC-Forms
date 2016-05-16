<?php 

//create short variables for contact details, needed for every form

$name = trim($_POST['name']);  
$company = trim($_POST['company']); 
$address = trim($_POST['address']);
$telephone = trim($_POST['telephone']); 
$email = trim($_POST['email']); 

$requestTopics = $_POST['requestTopics']; 
$error = 'Form could not be processed';  //error to throw in case form not processed


try {

	//check contact details are filled in. if not throw exception. form could not be processed
	
	$regex = '/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/';  //checks for general email format
 	
 	if(($name == '') || ($company == '') || ($address == '') || ($telephone == '') || (!preg_match($regex, $email))) {
 		
 		throw new Exception($error); 
 		
 	}
 	
 	
 	
 	
 	if($requestTopics == 'servicingRepair') {  //get form-relevant short variable names and go on testing 
 	
 	
 		$gasCartNo = trim($_POST['gasCartNo']); 
 		$serialNo = trim($_POST['serialNo']); 
 		$serviceOrRepair = trim($_POST['serviceOrRepair']);  
 		$repairInfo = trim($_POST['repairInfo']); 
 		$month = trim($_POST['month']); 
 		$year = trim($_POST['year']); 
 		
 		if(($gasCartNo == '') || ($serialNo == '') || ($serviceOrRepair == '')) {
			
			throw new Exception($error); 	
 		}
 		
 		if(($serviceOrRepair == 'repair' || $serviceOrRepair == 'both') && $repairInfo == '') {  //if 'repair' or 'both' is selected and there's no info 
 		
 			throw new Exception($error); 
 		}
 		
 		//no exceptions thrown so keep going and generate email!
 		
 		
 		//make safe to send in html email 
 		
 		
 		$name = htmlspecialchars($name); 
 		$company = htmlspecialchars($company); 
 		$address = htmlspecialchars($address); 
 		$telephone = htmlspecialchars($telephone); 
 		$email = htmlspecialchars($email); 
 		$gasCartNo = htmlspecialchars($gasCartNo); 
 		$serialNo = htmlspecialchars($serialNo); 
 		$serviceOrRepair = htmlspecialchars($serviceOrRepair); 
 		$repairInfo = htmlspecialchars($repairInfo); 
 		$month = htmlspecialchars($month); 
 		$year = htmlspecialchars($year); 
 		
 		
 		//store additional info. either service info or repair info 
 		
 		$additionalInfo = ''; 
 		
 		if($serviceOrRepair == 'repair') {
 			
 			$additionalInfo = "$repairInfo"; 
 			
 		}
 		
 		
 		if($serviceOrRepair == 'servicing') {   //format servicing info
 		
 			if(($year != 'year') || (($month != 'month') && ($year != 'year'))) {
 				if($month == 'month') {
 					$additionalInfo = "Cart Last serviced in $year";
 				} else {
 					$additionalInfo = "Cart Last serviced in $month $year"; 
 				}
 			} else {
 				$additionalInfo = "not available"; 
 			}
 		}
 		
 		
 		if($serviceOrRepair == 'both') {
 		
 			$serviceOrRepair .= " servicing and repair";   //change var so email reads 'Needs: both servicing and repair' 
 			
 			$additionalInfo = "$repairInfo<br>"; 
 			
 			if(($year != 'year') || (($month != 'month') && ($year != 'year'))) {
 				if($month == 'month') {
 					$additionalInfo .= "Cart last serviced in $year";
 				} else {
 					$additionalInfo .= "Cart last serviced in $month $year"; 
 				}
 			} else {
 				$additionalInfo .= "Don't know when last serviced"; 
 			}
 		}
 	
 	
 		//here we send the email finally 
 		
 	 	$to = "akg@iacuk.com";  //andy or adrian cc bee 
 	 	$subject = "Service/Repair request for gas cart $serialNo"; 
 	 	$message = "
 	 	
 	 		<html>
				<body>
 					Gas cart model number: <strong>$gasCartNo</strong><br>
 					Serial number: <strong>$serialNo</strong><br>
 					Needs: <strong>$serviceOrRepair</strong><br>
 					Additional Info: <strong>$additionalInfo</strong><br><br>
 					
 					Name: <strong>$name</strong><br>
 					Company: <strong>$company</strong><br>
 					Address: <strong>$address</strong><br>
 					Telephone: <strong>$telephone</strong><br>
 					Email: <strong>$email</strong>
				</body>
			</html>";
 	 	 
 	 	$headers = "From: brd@iacuk.com\r\n";  //from enquiries@iacuk.com or brd@iacuk.com 
 	 	$headers .= "Cc: bee@iacuk.com\r\n";
 	 	$headers .= "Content-type: text/html\r\n";
 	 		 	
 	 	mail($to,$subject,$message,$headers);  
 	}
 	
 	
 	
 	
 	
 	 
 	if($requestTopics == 'gasCartOrder') {   //generate email and test variables for the gas cart order form
 	
 		
 		$gasAmount = trim($_POST['gasAmount']); 
 		$recoveryVacuum = trim($_POST['recoveryVacuum']); 
 		$comments = trim($_POST['commentsGasCart']); 
 		
 		if($gasAmount == '') {
 		
 			throw new Exception($error); 
 		}
 		
 	//no exceptions thrown so continue with email 
 	
 	//make html safe
 		$name = htmlspecialchars($name); 
 		$company = htmlspecialchars($company); 
 		$address = htmlspecialchars($address); 
 		$telephone = htmlspecialchars($telephone); 
 		$email = htmlspecialchars($email); 
 		
 		$gasAmount = htmlspecialchars($gasAmount); 
 		$recoveryVacuum = htmlspecialchars($recoveryVacuum); 
 		$comments = htmlspecialchars($comments); 
 		
 		$to = "me@emiliedannenberg.co.uk"; //andy or adrian cc bee ah@iacuk.com
 		$subject = "new Dilo SF6 Gas cart enquiry"; //put date on the end to make unique?
 		$message = "
 		
 			<html>
				<body>
 					Gas amount: <strong>$gasAmount</strong><br>
 					Recovery Vacuum: <strong>$recoveryVacuum</strong><br>
 					Additional Comments: <strong>$comments</strong><br><br>
 					
 					Name: <strong>$name</strong><br>
 					Company: <strong>$company</strong><br>
 					Address: <strong>$address</strong><br>
 					Telephone: <strong>$telephone</strong><br>
 					Email: <strong>$email</strong>
				</body>
			</html>";
			
		$headers = "From: brd@iacuk.com\r\n";  //from enquiries@iacuk.com or brd@iacuk.com 
		$headers .= "Cc: emilie.dannenberg@gmail.com\r\n";  //bee@iacuk.com
 	 	$headers .= "Content-type: text/html\r\n";
 	 	
 	 	mail($to,$subject,$message,$headers);  
 		
 	}
 	
 	if($requestTopics== 'modulesExchange') {
 	
 		$maDevice = trim($_POST['maDevice']); 
 		$serialNo = trim($_POST['serialExch']); 
 		$reason = trim($_POST['xchgeReason']); 
 		$malfuncInfo = trim($_POST['malfunctionInfo']); //possibly empty if chose calibration
 		
 		
 		if(($maDevice == 'deviceType') || ($serialNo == '') || ($reason == '')) {
 			
 			throw new Exception($error); 
 		}
 		
 		if(($reason == 'malfunction') && ($malfuncInfo == '')) {
 			
 			throw new Exception($error); 
 		}
 		
 		//no exceptions so continue with email 
 		
 		//make html safe
 		
 		$name = htmlspecialchars($name); 
 		$company = htmlspecialchars($company); 
 		$address = htmlspecialchars($address); 
 		$telephone = htmlspecialchars($telephone); 
 		$email = htmlspecialchars($email); 
 		
 		$maDevice = htmlspecialchars($maDevice); 
 		$serialNo = htmlspecialchars($serialNo); 
 		$reason = htmlspecialchars($reason); 
 		$malfuncInfo = htmlspecialchars($malfuncInfo); 
 		
 		$to = "me@emiliedannenberg.co.uk"; //to bee@iacuk.com
 		$subject = "new modules exchange request for $maDevice s/n $serialNo"; 
 		$message = "
 		
 			<html>
				<body>
 					Device Type: <strong>$maDevice</strong><br>
 					Serial Number: <strong>$serialNo</strong><br>
 					Reason: <strong>$reason</strong><br>";
 					
 		if($reason == 'malfunction') {
 		
 			$message .= "Malfunction Description: <strong>$malfuncInfo</strong><br>";
 			
 		}			
 		$message .= "<br>
 					Name: <strong>$name</strong><br>
 					Company: <strong>$company</strong><br>
 					Address: <strong>$address</strong><br>
 					Telephone: <strong>$telephone</strong><br>
 					Email: <strong>$email</strong>
				</body>
			</html>";
			
		$headers = "From: brd@iacuk.com\r\n";  //from enquiries@iacuk.com or brd@iacuk.com 
		$headers .= "Cc: emilie.dannenberg@gmail.com\r\n";  //bee@iacuk.com
 	 	$headers .= "Content-type: text/html\r\n";
 	 	
 	 	mail($to,$subject,$message,$headers);  	
 			
 	}
 
 	
} catch (Exception $e) {
	
	echo "<div style='text-align:center;'>".$e->getMessage()." please go back and fill in all required fields</div>";
	echo "<br><a href='serviceRepairForm.htm'>Back to enquiries page</a>"; 
	
	exit; //exit script 
}

//if you reach here the mail was sent

echo "<div style='text-align:center;'>Your enquiry has been sent and we will be in touch shortly. Thanks!</div>"; 
 	
 	
?> 	
 	