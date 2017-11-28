// ======================================================================
//
// Contact 
//
// ======================================================================

$(document).ready(function () {
	$("input[type='submit']").click(function () {

		var proceed = true;
		//simple validation at client's end
		//loop through each field and we simply change border color to red for invalid fields
		$("#form input[required=true], #form textarea[required=true]").each(function () {
			$(this).css('border-color', '');
			if (!$.trim($(this).val())) { //if this field is empty
				$(this).css('border-color', 'red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
				$(this).css('border-color', 'red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
		});

		if (proceed) //everything looks good! proceed...
		{
			//get input field values data to be sent to server
			post_data = {
				'user_name': $('input[name=name]').val(),
				'user_email': $('input[name=email]').val(),
				'user_phone': $('input[name=phone]').val(),
				'msg': $('textarea[name=message]').val()
			};

			//Ajax post data to server
			$.post('contact.php', post_data, function (response) {
				if (response.type == 'error') { //load json data from server and output message
					output = '<div class="error">' + response.text + '</div>';
				} else {
					output = '<div class="success">' + response.text + '</div>';
					//reset values in all input fields
					$("#form  input[required=true],input[required=false], #form textarea[required=true]").val('');
				}
				$("#form #contact_results").hide().html(output).slideDown();
			}, 'json');
		}
	});

	//reset previously set border colors and hide all message on .keyup()
	$("#form  input[required=true], #form textarea[required=true]").keyup(function () {
		$(this).css('border-color', '');
		$("#result").slideUp();
	});
});

// ======================================================================
//
// Contact 2
//
// ======================================================================

$(document).ready(function () {
	$("input[type='submit']").click(function () {

		var proceed = true;
		//simple validation at client's end
		//loop through each field and we simply change border color to red for invalid fields
		$("#form-header input[required=true], #form-header textarea[required=true]").each(function () {
			$(this).css('border-color', '');
			if (!$.trim($(this).val())) { //if this field is empty
				$(this).css('border-color', 'red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
				$(this).css('border-color', 'red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
		});

		if (proceed) //everything looks good! proceed...
		{
			//get input field values data to be sent to server
			post_data = {
				'user_name': $('input[name=name]').val(),
				'user_email': $('input[name=email]').val(),
				'user_phone': $('input[name=phone]').val(),
				'msg': $('textarea[name=message]').val()
			};

			//Ajax post data to server
			$.post('contact.php', post_data, function (response) {
				if (response.type == 'error') { //load json data from server and output message
					output = '<div class="error">' + response.text + '</div>';
				} else {
					output = '<div class="success">' + response.text + '</div>';
					//reset values in all input fields
					$("#form-header  input[required=true],input[required=false], #form textarea[required=true]").val('');
				}
				$("#form-header #contact_results").hide().html(output).slideDown();
			}, 'json');
		}
	});

	//reset previously set border colors and hide all message on .keyup()
	$("#form-header  input[required=true], #form-header textarea[required=true]").keyup(function () {
		$(this).css('border-color', '');
		$("#result").slideUp();
	});
});

// ======================================================================
//
// Nav Offset
//
// ======================================================================

$(document).ready(function () {
	var navHeight = $('.nav').outerHeight();
	var breadcrumb = $('.breadcrumb');

	breadcrumb.css('top', navHeight);

});

// ======================================================================
//
// Menu
//
// =====================================================================

var trigger = document.getElementsByClassName('menu__trigger')[0];
var menu = document.getElementsByClassName('menu')[0];

trigger.addEventListener('click', function () {
	this.classList.toggle('is--open');
	menu.classList.toggle('is--open');
});

// ======================================================================
//
// Map
//
// ======================================================================

jQuery(document).ready(function ($) {
	//set your google maps parameters
	var latitude = 42.033650,
		longitude = -82.623183,
		map_zoom = 16;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = (is_internetExplorer11) ? 'img/icon-location.png' : 'img/icon-location.png';

	//define the basic color of your map, plus a value for saturation and brightness
	var main_color = '#1ca3e9',
		saturation_value = 20,
		brightness_value = 5;

	//we define here the style of the map
	var style = [
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{
					saturation: saturation_value
				}
      ]
    },
		{ //poi stands for point of interest - don't show these lables on the map
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{
					visibility: "off"
				}
      ]
    },
		{
			//don't show highways lables on the map
			featureType: 'road.highway',
			elementType: 'labels',
			stylers: [
				{
					visibility: "on"
				}
          ]
      },
		{
			//don't show local road lables on the map
			featureType: "road.local",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off"
				}
      ]
    },
		{
			//don't show arterial road lables on the map
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off"
				}
      ]
    },
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{
					visibility: "off"
				}
      ]
    },
    //style different elements on the map
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "landscape",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]

    },
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    },
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					hue: main_color
				},
				{
					visibility: "on"
				},
				{
					lightness: brightness_value
				},
				{
					saturation: saturation_value
				}
      ]
    }
  ];

	//set google map options
	var map_options = {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: map_zoom,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles: style,
		}
		//inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		visible: true,
		icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map
		var controlUIzoomIn = document.getElementById('zoom-in'),
			controlUIzoomOut = document.getElementById('zoom-out');
		controlDiv.appendChild(controlUIzoomIn);
		controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
			map.setZoom(map.getZoom() + 1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
			map.setZoom(map.getZoom() - 1)
		});
	}

	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

	//insert the zoom div on the top left of the map
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});
