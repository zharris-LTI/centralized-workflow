$(document).ready(function(){
	
	//*~*~*~*~*~*~*~*Test Bandwidth*~*~*~*~*~*~*~*//
	
	var BandwidthRequired = 60; // 1500 is 1.5 Mbps or T1

	var imageAddr = "http://server1.actfltesting.org/bandwidth-image/31120037-5mb.jpg"; 
	var downloadSize = 4995374; //bytes

	window.onload = function() {
		var systemCheckTable = $('#system-check');
		var connectionCheck = $('#progress');
		var minConnection = $('#min-connection');
		
		systemCheckTable.show();
		minConnection.html(commaSeparateNumber(BandwidthRequired));
		connectionCheck.html('Calculating bandwidth...');
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
			
			if(speedKbps < bandwidth) {
				$('#bandwidthCheckImg').removeClass().addClass('status fail');
				$('#bandwidthError').slideDown();
			} else {
				$('#bandwidthCheckImg').removeClass().addClass('status success');
			}
						
			connectionCheck.html('Connection Speed: ' + commaSeparateNumber(speedKbps) + ' Kbps');
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
	
	var flashDependantCriteria = $('#portsCheckImg,#flashCheckImg,#MP3CheckImg,#microphoneCheckImg,#languageCheckImg');

	//Test for Flash, Audio and Mic
	var minVersion = '10'; //minimum Flash version required

	$('.min-version-number').html(minVersion); //inject minimum Flash version required into markup
	
	var flashVers = swfobject.getFlashPlayerVersion(); //Get browser's Flash version
	$('.version-number').html(flashVers.major);
	
	var minVersCheck = swfobject.hasFlashPlayerVersion(minVersion); //Check if browser has minimum required Flash version
	
	if(minVersCheck){ // if browser passes the required version check display flash control
		$('.displayFlash').toggle();
		$('#flashCheckImg').removeClass().addClass('status success'); //check-status fa fa-check');
		checkRequirements();
	} else if(flashVers.major===0) { // if the browser doesn't have Flash or is blocking display message to install or unblock
		$('.installFlash').toggle();
		flashDependantCriteria.removeClass().addClass('status fail'); //check-status fa fa-times');
	} else { // if the browser has a really old version of Flash display message to upgrade
		$('.upgradeFlash').toggle();
		flashDependantCriteria.removeClass().addClass('status fail'); //check-status fa fa-times');
	}

	//*~*~*~*~*~*~*~*Check Requirements*~*~*~*~*~*~*~*//
	
	 // If all rows are checked, display success message else display fail message
	function checkRequirements() {
		var icons = $('td').filter('.status').length;
		var iconsWaiting = $('td').filter('.waiting').length;
		var iconsChecked = $('td').filter('.success').length;
		
		if (iconsWaiting === 0) {
			if (icons === iconsChecked) {
				$('#pass-message-bottom').show();
				$('#fail-message-bottom').hide();
			} else {
				$('#pass-message-bottom').hide();
				$('#fail-message-bottom').show();
			}			
		}
	}

	//*~*~*~*~*~*~*~*Pop Test Windows*~*~*~*~*~*~*~*//
	
	$('#wpt-test-link').click( function() {
		window.open("../opicwriting_demo.html","opicwriting","width=970,height=700,screenX=0,screenY=0,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,titlebar=no,resizable=no"); 
	});

	$('#wpt-demo-link').click( function() {
		window.open("../opicwriting_demo.html","opicwriting","width=970,height=700,screenX=0,screenY=0,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,titlebar=no,resizable=no"); 
	});

	
	//*~*~*~*~*~*~*~*Intenet Explorer hacks*~*~*~*~*~*~*~*//

	// first row
/* 	$('.ie8 .system-check-table tr:nth-child(1) td:nth-child(1)').css('background-color','#ffe4a3');
	$('.ie8 .system-check-table tr:nth-child(1) td:nth-child(2)').css('background-color','#ffedc0');
	$('.ie8 .system-check-table tr:nth-child(1) td:nth-child(3)').css('background-color','#fff2cf');
	$('.ie8 .system-check-table tr:nth-child(1) td:nth-child(4)').css('background-color','#fffbf1');
 */
	// second row
/* 	$('.ie8 .system-check-table tr:nth-child(2) td:nth-child(1)').css('background-color','#efdf9a');
	$('.ie8 .system-check-table tr:nth-child(2) td:nth-child(2)').css('background-color','#efe7b4');
	$('.ie8 .system-check-table tr:nth-child(2) td:nth-child(3)').css('background-color','#efebc2');
	$('.ie8 .system-check-table tr:nth-child(2) td:nth-child(4)').css('background-color','#eff4e0');
 */
	// third row
/* 	$('.ie8 .system-check-table tr:nth-child(3) td:nth-child(1)').css('background-color','#d9d88e');
	$('.ie8 .system-check-table tr:nth-child(3) td:nth-child(2)').css('background-color','#d9dfa4');
	$('.ie8 .system-check-table tr:nth-child(3) td:nth-child(3)').css('background-color','#d9e3b0');
	$('.ie8 .system-check-table tr:nth-child(3) td:nth-child(4)').css('background-color','#d9eaca');
 */
	// fourth row
/* 	$('.ie8 .system-check-table tr:nth-child(4) td:nth-child(1)').css('background-color','#c8d794');
	$('.ie8 .system-check-table tr:nth-child(4) td:nth-child(2)').css('background-color','#c8dca1');
	$('.ie8 .system-check-table tr:nth-child(4) td:nth-child(3)').css('background-color','#c8dfb0');
	$('.ie8 .system-check-table tr:nth-child(4) td:nth-child(4)').css('background-color','#c8e2b7');
 */
	// fifth row
/* 	$('.ie8 .system-check-table tr:nth-child(5) td:nth-child(1)').css('background-color','#bbd28b');
	$('.ie8 .system-check-table tr:nth-child(5) td:nth-child(2)').css('background-color','#bbd696');
	$('.ie8 .system-check-table tr:nth-child(5) td:nth-child(3)').css('background-color','#bbd9a3');
	$('.ie8 .system-check-table tr:nth-child(5) td:nth-child(4)').css('background-color','#bbdcaa');	
 */	
	//column styles for ie8
/* 	$('.ie8 .system-check-table tr td:nth-child(1)').css('width','150px').css('text-align','center').css('font-weight','bold');	
	$('.ie8 .system-check-table tr td:nth-child(2)').css('width','200px');	
	$('.ie8 .system-check-table tr td:nth-child(3)').css('width','300px');	
	$('.ie8 .system-check-table tr td:nth-child(4)').css('text-align','center'); */
});