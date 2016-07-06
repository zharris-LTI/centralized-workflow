$(document).ready(function(){
	
	//*~*~*~*~*~*~*~*Test Bandwidth*~*~*~*~*~*~*~*//
	
	var BandwidthRequired = 60; // 1500 is 1.5 Mbps or T1

	var imageAddr = "http://support.lti-inc.net/aappl-system-check/media/31120037-5mb.jpg"; 
	var downloadSize = 4995374; //bytes

	window.onload = function() {
		var systemCheckTable = $('#system-check');
		var connectionCheck = $('#progress');
		var minConnection = $('#min-connection');
		
		systemCheckTable.show();
		minConnection.html(commaSeparateNumber(BandwidthRequired));
		connectionCheck.html('Please wait while your connection speed is being calculated...');
		window.setTimeout(MeasureConnectionSpeed(BandwidthRequired), 1);
	};

	function MeasureConnectionSpeed(bandwidth) {
		var connectionCheck = $('#progress');
		var startTime, endTime;
		var download = new Image();
		download.onload = function () {
			endTime = (new Date()).getTime();
			showResults();
		}
		
		download.onerror = function (err, msg) {
			connectionCheck.html('Error performing this test');
		}
		
		startTime = (new Date()).getTime();
		var cacheBuster = "?nnn=" + startTime;
		download.src = imageAddr + cacheBuster;
		
		function showResults() {
			var duration = (endTime - startTime) / 1000;
			var bitsLoaded = downloadSize * 8;
			var speedBps = (bitsLoaded / duration).toFixed(2);
			var speedKbps = (speedBps / 1024).toFixed(2);
			var speedMbps = (speedKbps / 1024).toFixed(2);
			
			(speedKbps < bandwidth)? $('#bandwidthCheckImg i').removeClass().addClass('check-status fa fa-times').parents('tr').find('.error-msg').slideDown():$('#bandwidthCheckImg i').removeClass().addClass('check-status fa fa-check');
			
			connectionCheck.html('Your internet connection speed is: ' + commaSeparateNumber(speedKbps) + ' Kbps');
			checkRequirements();
		}
	}
	
	function commaSeparateNumber(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		}
			return val;
	}



	//*~*~*~*~*~*~*~*Flash Test*~*~*~*~*~*~*~*//
	
	var flashDependantCriteria = $('#portsCheckImg i,#flashCheckImg i,#MP3CheckImg i,#microphoneCheckImg i,#languageCheckImg i');

	//Test for Flash, Audio and Mic
	var minVersion = '10'; //minimum Flash version required

	$('.min-version-number').html(minVersion); //inject minimum Flash version required into markup
	
	var flashVers = swfobject.getFlashPlayerVersion(); //Get browser's Flash version
	
	var minVersCheck = swfobject.hasFlashPlayerVersion(minVersion); //Check if browser has minimum required Flash version
	
	if(minVersCheck){ // if browser passes the required version check display flash control
		$('.displayFlash').toggle();
		$('#version-number').html(flashVers.major);
		$('#flashCheckImg i').removeClass().addClass('check-status fa fa-check');
		checkRequirements();
	} else if(flashVers.major===0) { // if the browser doesn't have Flash or is blocking display message to install or unblock
		$('.installFlash').toggle();
		flashDependantCriteria.removeClass().addClass('check-status fa fa-times');
	} else { // if the browser has a really old version of Flash display message to upgrade
		$('.upgradeFlash').toggle();
		$('#version-number-low').html(flashVers.major);
		flashDependantCriteria.removeClass().addClass('check-status fa fa-times');
	}

	//*~*~*~*~*~*~*~*Check Requirements*~*~*~*~*~*~*~*//
	
	 // If all rows are checked, enable link to login page
	function checkRequirements() {
		var icons = $('td > i').filter('.check-status').length;
		var iconsWaiting = $('td > i').filter('.waiting').length;
		var iconsChecked = $('td > i').filter('.fa-check').length;
		
		if (iconsWaiting === 0) {
			if (icons === iconsChecked) {
				//$('#login-btn').removeClass('disabled').attr('href', 'http://aappl.actfltesting.org/');
				$('#pass-message-top, #pass-message-bottom').slideDown();
				$('#fail-message-top, #fail-message-bottom').slideUp();
			} else {
				$('#login-btn').addClass('disabled').removeAttr('href');
				$('#pass-message-top, #pass-message-bottom').slideUp();
				$('#fail-message-top, #fail-message-bottom').slideDown();
			}			
		}
	}

	//*~*~*~*~*~*~*~*Pop Test Windows*~*~*~*~*~*~*~*//
	
	$('#wpt-test-link').click( function() {
		window.open("opicwriting.html","opicwriting","width=970,height=700,screenX=0,screenY=0,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,titlebar=no,resizable=no"); 
	});

	$('#wpt-demo-link').click( function() {
		window.open("opicwriting.html","opicwriting","width=970,height=700,screenX=0,screenY=0,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,titlebar=no,resizable=no"); 
	});

	
	//*~*~*~*~*~*~*~*Intenet Explorer hacks*~*~*~*~*~*~*~*//

	//zebra striping for ie8
	$('.ie8 .system-check-table tr:odd').css('background-color','#eee');
	$('.ie8 .system-check-table tr:even').css('background-color','#d9e4ee');

	//column styles for ie8
	$('.ie8 .system-check-table tr td:nth-child(1)').css('width','150px').css('text-align','center').css('font-weight','bold');	
	$('.ie8 .system-check-table tr td:nth-child(2)').css('width','200px');	
	$('.ie8 .system-check-table tr td:nth-child(3)').css('width','300px');	
	$('.ie8 .system-check-table tr td:nth-child(4)').css('text-align','center');
});