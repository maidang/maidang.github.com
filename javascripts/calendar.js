/*
Stendig calendar!
todo: make current day "active"
auto-adjust calendar height to # of days
*/

var MONTHS = [
	"January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"
];

var WEEKDAYS = [
	"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

var DAYS_IN_MONTH = [
	31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];

var MONTH_DAYS = [
	0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5
];

window.onload = function() 
{
	buildCalendar();
}

function buildCalendar() {
	var today = new Date();
	var month = today.getMonth();
	var year = today.getFullYear();
	
	// display year and month
	$("calendar_month").innerHTML = year + " " + MONTHS[month];
	
	// generate calendar
	var firstWeekday = getWeekday(1, month, year);
	var daysInMonth = DAYS_IN_MONTH[month];
	
	var i = 0;
	var currentRow = document.createElement("tr");
	while (i < daysInMonth + firstWeekday) {
		var day = document.createElement("td");
		currentRow.appendChild(day);
		
		if (i >= firstWeekday) {
			day.innerHTML = i - firstWeekday + 1;
			
			if (i % 7 == 6) {
				$("calendar").appendChild(currentRow);
				currentRow = document.createElement("tr");
			}	
		}

		i++;
	}
	
	$("calendar").appendChild(currentRow);
}

function getWeekday(day, month, year) {
	var d = day;
	var m = MONTH_DAYS[month];
	var y = getYearValue(year);
	var c = getCenturyValue(year);
	//alert("d=" + d + "\nm=" + m + "\ny=" + y + "\nc=" + c);
	return (d + m + y + Math.floor(y / 4) + c) % 7;
}

function getYearValue(year) {
	str = year.toString().substring(2,4);
	return parseInt(str);
}

function getCenturyValue(year) {
	var c = parseInt(year.toString().substring(0, 2));
	return 6 - ((c % 4) * 2);
}