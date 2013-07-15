var timeoutPeriod = 5000;
var _xPos;
var _yPos;
var _zPos;
var _detectMoveTimer;
var _threshHoldVal = 5;
var _checkInterval = 1000;
var blurOut;
$(document).ready(function(){			
	slideOutTopDiv();
	$("#logoSearchBox").mouseleave(function(){
		slideOutTopDiv();
	}).mouseenter(function(){
		// If user focuses on the div, clear the timeout.
		clearTimeout(blurOut);
	})
	$("#openTopMenu").click(function(){
		if($("#logoSearchBox").is(":visible"))
		{
			slideOutElem("logoSearchBox","up")
		}
		else
		{
			slideInElem("logoSearchBox","up");
		}
	});

	// Initialize the camera
	var _videoInput = document.getElementById('fcSlideVideo');
	var _canvasInput = document.getElementById('fcSlideCanvas');

	var _htracker = new headtrackr.Tracker({detectionInterval : 30});
	_htracker.init(_videoInput, _canvasInput);
	_htracker.start();

	// Add the event listener to the event-
	document.addEventListener("headtrackingEvent", checkImgPos);
	document.addEventListener('headtrackrStatus', 
		function (event) {
			if(event.status == "lost")
			{
				clearTimeout(_detectMoveTimer);
			}
			else if(event.status == "found")
			{
				detectFaceMove();			
			}
	});
    
	// Colorbox
	$(".faceSlideImg").colorbox({
		rel:'gallery',
		onOpen:function(){
			detectFaceMove();
		},
		onCleanup:function(){			
			clearTimeout(_detectMoveTimer);
		}
	});


});

// Function to slide out element
function slideOutElem(elemToHide, directionToSlide,callBackFunc)
{
	$("#" + elemToHide).hide("slide", {direction : directionToSlide});
	if(callBackFunc != undefined)
	{
		callBackFunc();
	}
}

// Function to slide in element.
function slideInElem(elemToShow, directionToSlide){
	$("#" + elemToShow).show("slide", {direction : directionToSlide});
}

// Function slide out top div
function slideOutTopDiv()
{
	blurOut = setTimeout(function(){
			// hide the top div
			debugger;
			slideOutElem("logoSearchBox","up",showMenuBtn);			
	},timeoutPeriod);
}

// Function toi show top menu
function showMenuBtn()
{
	$("#openTopMenu").fadeIn(300);
}

/**** SLIDESHOW ***/
function checkImgPos( event ) {
	_xPos = event.x;
	_yPos = event.y;
	_zPos = event.z;
	console.log(event.status);
}

function detectFaceMove()
{
	if(_xPos == null || _yPos == null)
	{
		return;
	}
	if(_xPos > _threshHoldVal)
	{
		slideImage(true);
	}
	else if(_xPos < (_threshHoldVal*-1))
	{
		slideImage(false);
	}
	_detectMoveTimer = setTimeout(function()
	{
		detectFaceMove();
	},_checkInterval);
}


function slideImage(isForward)
{
	if(isForward)
	{
		// lightbox next
		$.colorbox.next();
	}
	else
	{
		// lightbox previous
		$.colorbox.prev();
	}
}
function processServerData(data)
{
	debugger;
}