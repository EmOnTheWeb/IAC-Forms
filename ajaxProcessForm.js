function getXMLHTTPRequest() {

	var req= false;
	try {
		req= new XMLHttpRequest();  //for firefox and chrome
	} catch (err) {
	try {
		req= new ActiveXObject("Msxml12.XMLHTTP"); //for some versions of IE
	} catch (err) {
		try {
			req= new ActiveXObject("Microsoft.XMLHTTP");  //for some other versions of IE
		} catch(err) {
			req=false;
		  }
	  }
	}
	return req; 
}

function storeGasCartEnquiryValues() {
	console.log('iamhere'); 
	
	var fields = ''; 
	var fields = '&gasAmount='; 
	
	var inputs = document.getElementById('amountOfGas').getElementsByTagName('input'); 
	
	for (i=0; i<inputs.length; i++) {
	
		if(inputs[i].checked) {
		
			fields += encodeURIComponent(inputs[i].value);
			
		}
	}
	
	if(document.getElementById('less1mbar').checked) {
		fields += '&' + document.getElementById('less1mbar').name + '=' + encodeURIComponent(document.getElementById('less1mbar').value);  //must encodeURIComponent in case contains  = or &
	}
	
	if(document.getElementById('less5mbar').checked) {
		fields += '&' + document.getElementById('less5mbar').name + '=' + encodeURIComponent(document.getElementById('less5mbar').value); 
	}
	
	fields += '&' + document.getElementById('commentsGasCart').name + '=' + encodeURIComponent(document.getElementById('commentsGasCart').value); 
	
	return fields; 
}



function storeServiceRepairValues() {  //returns stringfull of service repair fields for sending by ajax //horrible document.getElementById makes me appreciate jQuery

	var fields = '&' + document.getElementById('gasCartNo').name + '=' + encodeURIComponent(document.getElementById('gasCartNo').value); 
	fields += '&' + document.getElementById('serialNo').name + '=' + encodeURIComponent(document.getElementById('serialNo').value); 
	
	
	if(document.getElementById('service').checked) { //if service radio button is checked
		fields += '&' + document.getElementById('service').name + '=' + encodeURIComponent(document.getElementById('service').value); 
		
	//get 'last serviced' fields
		fields += '&' + document.getElementById('month').name + '=' +
encodeURIComponent(document.getElementById('month').value); 

		fields += '&' + document.getElementById('year').name + '=' +
encodeURIComponent(document.getElementById('year').value);
	}
	
	
	if(document.getElementById('both').checked) { //if both service and repair radio button is checked
		fields += '&' + document.getElementById('both').name + '=' + encodeURIComponent(document.getElementById('both').value); 
	//get 'describe problem' repair field	
		fields += '&' + document.getElementById('repairInfo').getElementsByTagName('textarea')[0].name + '=' +
encodeURIComponent(document.getElementById('repairInfo').getElementsByTagName('textarea')[0].value); 

	//get 'last serviced' fields
		fields += '&' + document.getElementById('month').name + '=' +
encodeURIComponent(document.getElementById('month').value); 

		fields += '&' + document.getElementById('year').name + '=' +
encodeURIComponent(document.getElementById('year').value);

	}
	
	if(document.getElementById('repair').checked) { //if repair radio button is checked 
		fields += '&' + document.getElementById('repair').name + '=' + encodeURIComponent(document.getElementById('repair').value);
		
	//get 'describe problem' repair field
		fields += '&' + document.getElementById('repairInfo').getElementsByTagName('textarea')[0].name + '=' +
encodeURIComponent(document.getElementById('repairInfo').getElementsByTagName('textarea')[0].value); 	 	
	}

return fields; 
}

function contactValues() {

	var contactValues = ''; 
	contactValues += '&' + document.getElementById('name').name + '=' + encodeURIComponent(document.getElementById('name').value); 
	contactValues += '&' + document.getElementById('company').name + '=' +
	encodeURIComponent(document.getElementById('company').value); 
	contactValues += '&' + document.getElementById('address').name + '=' +
	encodeURIComponent(document.getElementById('address').value); 
	contactValues += '&' + document.getElementById('telephone').name + '=' +
	encodeURIComponent(document.getElementById('telephone').value); 
	contactValues += '&' + document.getElementById('email').name + '=' +
	encodeURIComponent(document.getElementById('email').value); 
	
	return contactValues; 
}

function processForm() {
	
	var page = 'processForm.php'; 
	var fields = ''; //initialize variable
	
	fields = document.getElementById('requestTopics').name + '=' +  encodeURIComponent(document.getElementById('requestTopics').value); //store which form we're on
	
	if(document.getElementById('requestTopics').value == 'servicingRepair') { //store appropriate fields depending on form 
		fields += storeServiceRepairValues(); 
	}
	if(document.getElementById('requestTopics').value == 'gasCartOrder') {
		fields += storeGasCartEnquiryValues(); 
	}
		
	fields += contactValues(); 
	
	XMLReq.open("POST", page, true); 
	XMLReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	XMLReq.onreadystatechange = formResults; 
	XMLReq.send(fields); 
}


function formResults() {
	if(XMLReq.readyState == 4) {
		if(XMLReq.status == 200) {
			result = XMLReq.responseText; 
			document.getElementById('introduction').innerHTML = result; 
			fillSpace(); 
			//alert(XMLReq.status); 
		}
	} 
}