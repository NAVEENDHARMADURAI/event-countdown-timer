let countdown;// setInterval function for countdown clock
let serviceInSession;
const clock = document.getElementById('clock');
const livestreamButton = document.getElementById('door');
const daysUnit = document.querySelector('.days');
const hoursUnit = document.querySelector('.hours');
const minutesUnit = document.querySelector('.minutes');
const secondsUnit = document.querySelector('.seconds');

const startDate = new Date(2021, 5, 1, 11, 30, 00).getTime();
startDate > Date.now() ? timer(startDate) : calculateFutureDate(startDate);
function timer(date){
	countdown = setInterval(()=>{
		const now = Date.now();// current date and time
		const differenceInTime = date - now;
		if(differenceInTime < 0){
			clearInterval(countdown);// clear timer
			clock.classList.add("hide");// hide the clock div element
			livestreamButton.classList.remove("hide");
			serviceInSession = setTimeout(()=>{
				livestreamButton.classList.add("hide");
				calculateFutureDate(date);
				clock.classList.remove("hide");// show the clock again
			},7200000);
			return;
		}	
		timeLeft(differenceInTime);
	}, 1000);// every 1 second
}

function timeLeft(time){
		const days = Math.floor(time /(1000 * 60 * 60 * 24));// milliseconds into days
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));// milliseconds into hours
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));// milliseconds into minutes
		const seconds = Math.floor((time % (1000 * 60)) / 1000);
		const displayDays = `${days < 10 ? '0' : '' }${days}`;// days string that will be displayed 
		const displayHours = `${hours < 10 ? '0' : ''}${hours}`;// hours string that will be displayed
		const displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
		const displaySeconds = `${seconds < 10 ? '0' : ''}${seconds}`;
		daysUnit.textContent = displayDays;
		hoursUnit.textContent = displayHours;
		minutesUnit.textContent = displayMinutes;
		secondsUnit.textContent = displaySeconds;
}
function calculateFutureDate (dateTochange){	
		const newDate = new Date(dateTochange);
		const weeklyDate  = newDate.setDate(newDate.getDate() +07);
		timer(weeklyDate);	
}