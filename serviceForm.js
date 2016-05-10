$(document).ready(function() {


//if javascript is enabled the 'turn javascript on' message is hidden straightaway

$("#javascriptOn").addClass("hide");  



//bring up the appropriate form based on select on enquiries page

var form = $('form'); 
var showing = ''; //keep track of what's displayed

	$( "#requestTopics" ).change(function() {

		if($(this).val() === "choose") { 
		
			$('form').addClass("hide"); 
			fillSpace();   //adjust height to fill browser window
		}
	
		
		if($(this).val() === "servicingRepair") {
			
			form.removeClass('hide'); 
			form.attr('id', 'serviceRepair');
		
			if(showing != '') {
				showing.addClass("hide");  //if there's part of another form showing hide it.  
			}
			
			showing = $('#serviceRepairPart').removeClass("hide"); 
			$('#intro-p').css('height','');  //remove height property so intro-p adjusts to container size
		} 
		
		if($(this).val() === "gasCartOrder") {
		
			form.removeClass('hide'); 
			form.attr('id', 'gasCartOrder');  
		
			if(showing != '') {
				showing.addClass('hide'); 
			}
			
			showing = $('#gasCartOrderPart').removeClass('hide'); 
			$('#intro-p').css('height',''); 
		}
});
	
	$('#service').click(function(){   //on select service radio button...

		$('#servicedInfo').removeClass("hide");   //show gas cart servicing fields
		
		if(!$('#repairInfo').hasClass("hide")) { //hide field for repair option, but only add hide class if it isn't already there. 
	
				$('#repairInfo').addClass("hide"); 
		}	
	}); 
		
	$('#repair').click(function(){   //on select repair radio button...
			
		$('#repairInfo').removeClass("hide");   //show repair gas cart fields 
			
		if(!$('#servicedInfo').hasClass("hide")) {   //hide gas cart servicing fields, making sure not to add the hide class twice. 
			
			$('#servicedInfo').addClass("hide");
		}
	}); 
	
	$('#both').click(function(){  //if both show both repairinfo and serviceinfo fields
	
		$('#repairInfo').removeClass("hide"); 
		$('#servicedInfo').removeClass("hide"); 
		
	}); 
	
	
	
//dynamically generate select menu for year when gas cart last serviced to show past twenty years

	var year = new Date().getFullYear();
	var yearSelectElement = $('#year'); 
	
	for(i=year; i>(year-21); i--) {
	
		yearSelectElement.append('<option value ="'+i+'">'+i+'</option>');
	}
	
	
	
//if user linked from product page url fragment indicates what form they're after. get the url and display page appropriately.

 var url = window.location.href; 
 	
 	if(url.includes("#gasCartOrderPart")) {
 	
 		$("#requestTopics").val("gasCartOrder").change();   //call change programmatically to show appropriate form
 		 
	}
	
	if(url.includes("#serviceRepairPart")) {
	
		$("#requestTopics").val("servicingRepair").change(); 
	}
	

		
//front end validation
function noErrors() {

var thereIsError = 0; 

	if($('#requestTopics').val() === "servicingRepair") { //if you're submitting serviceRepair form check appropriate values
		if($('#gasCartNo').val().trim() == '') {
	
		$('#gasCartNo').effect("highlight", {color:"red"},100); //required field flashes red if try to submit empty
		thereIsError =1; 
		}
	
		if($('#serialNo').val().trim() == '') {
	
			$('#serialNo').effect("highlight", {color:"red"},100); 
		thereIsError =1; 
		}	
	
		if(!$('#service').is(':checked') && !$('#repair').is(':checked') && !$('#both').is(':checked')) {
		
			$('#radioServiceRepair').effect("highlight", {color:"red"},100); 
			thereIsError=1; 
		}
	
		if($('#repair').is(':checked') || $('#both').is(':checked')) {
			if($('#repairField').val().trim() == '') {
		
				$('#repairField').effect("highlight", {color:"red"},100); 
				thereIsError=1; 
			}
		}
	}
	if($('#requestTopics').val() === "gasCartOrder") {  //check mandatory fields specific to gasCartOrder form
	
		function isChecked() { 
		
			var checked = 0; 
			$('#amountOfGas :input').each(function() {
				if($(this).is(':checked')) checked =1;
			}); 
			if(checked===1) return true; 
			return false; 
		}
		
		if(!isChecked()) {
			$('#amountOfGas').effect("highlight", {color:"red"},100); 
			thereIsError =1; 
		}
	}
	
	if($('#name').val().trim() == '') {
	
		$('#name').effect("highlight", {color:"red"},100); 
		thereIsError =1; 
	}
	
	if($('#company').val().trim() == '') {
	
		$('#company').effect("highlight", {color:"red"},100); 
		thereIsError=1; 
	}
	
	if($('#address').val().trim() == '') {
	
		$('#address').effect("highlight", {color:"red"},100); 
		thereIsError=1;
	}
	
	if($('#telephone').val().trim() == '') {
	
		$('#telephone').effect("highlight",{color:"red"},100); 
		thereIsError=1; 
	}
	
	
	// matches at least one character of alphabet, number underscore,dot, dash followed by @ followed by at least 
	//one " " " followed by dot followed by at least one character of " " " " 
	//test this. possible wierd foreign email addresses
	
	var regEx = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/; 
	
	if(!regEx.test($('#email').val())) {
	
		$('#email').effect("highlight", {color:"red"},100); 
		thereIsError=1; 
	}

	if(thereIsError == 1){
	
		return false; 
	}
	
	return true; 
}


//bind form processing to the submit button 
	$('.submit').click(function(evt) {
		
		evt.preventDefault();
		
		if(noErrors()) { 
			$('.submit').prop('disabled',true).after('<img src="img/load.gif" id="load" alt="ajax load icon">'); 
			processForm();  //function defined in ajaxProcessForm
		}
	});
	
}); 


