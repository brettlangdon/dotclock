var now = new Date();
var today = new Date(now.getFullYear(),
		     now.getMonth(),
		     now.getDate(),
		     0, 0, 0, 0);

$(document).ready(function(){
    set_time();
    setInterval(update_time, 1000);
    setInterval(get_time, 10 * 1000);
});


var set_time = function(){
    var now = new Date().getTime()/1000;
    now = Math.round(now - (today.getTime()/1000));
    var hours = Math.floor((now / 3600) % 24);
    var minutes = Math.floor((now / 60) % 60);
    var seconds = Math.floor(now % 60);
    for(var hr = 0; hr < hours; ++hr){
	next = $('#hr-' + hr);
	next.children('.minute').addClass('active');
    }
    for(var min = 0; min < minutes; ++min){
	next = $('#hr-' + hours + ' #min-' + min);
	next.addClass('active');
    }
    for(var sec = 0; sec <= seconds; ++sec){
	parent = $('#hr-' + hours + ' #min-' + minutes);
	parent.append($('<span class="second active"></span>'));
    }
    last_hour = hours;
    last_minute = minutes;
    last_second = seconds;

    hr = (last_hour<10)?'0'+last_hour:last_hour;
    min = (last_minute<10)?'0'+last_minute:last_minute;
    sec = (last_second<10)?'0'+last_second:last_second;
    $('#time').text(hr + ':' + min + ':' + sec);
};

var get_time = function(){
    var now = new Date().getTime()/1000;
    now = Math.round(now - (today.getTime()/1000));
    var hours = Math.floor((now / 3600) % 24);
    var minutes = Math.floor((now / 60) % 60);
    var seconds = Math.floor(now % 60);
    last_hour = hours;
    last_minute = minutes;
    last_second = seconds;
};

var update_time = function(){
    last_second += 1;
    if(last_second >= 60){
	last_second = 0;
	last_minute += 1;
	if(last_minute >= 60){
	    last_minute = 0;
	    last_hour += 1;
	    if(last_hour >= 24){
		last_hour = 0;
		reset();
	    }
	}
    }
    parent = $('#hr-' + last_hour + ' #min-' + last_minute);
    parent.append($('<span class="second active"></span>'));

    hr = (last_hour<10)?'0'+last_hour:last_hour;
    min = (last_minute<10)?'0'+last_minute:last_minute;
    sec = (last_second<10)?'0'+last_second:last_second;
    $('#time').text(hr + ':' + min + ':' + sec);
};

var reset = function(){
    $('.second').remove();
    $('#clock').children('.hour').children('.minute').removeClass('active');
};