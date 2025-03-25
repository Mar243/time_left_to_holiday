const dateInitial = document.getElementById('date');
const result = document.getElementById('result');
const setButton = document.getElementById('set-date')

let day = document.getElementById('day');
let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

 export function setHoliday() {
  setButton.addEventListener('click', function() {  
  
  let dateTime = dateInitial.value.split('.').reverse().join('.');
   
  const vacationDate = new Date(dateTime).getTime();
  localStorage.setItem('vacationDate', JSON.stringify(vacationDate));
  result.textContent = '';

});
}


const savedVacationDate = localStorage.getItem('vacationDate');
if (savedVacationDate) {
  const time = JSON.parse(savedVacationDate);  
  const date = new Date(time);
  
  let dateOfHoliday = date.toISOString().slice(0, 10).split('-').reverse().join('.');
  dateInitial.value  = dateOfHoliday;  
  countDown(time);
}


function countDown(endDate) {
  let countDownInterval;
  
  countDownInterval = setInterval(() => {
    
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance /(1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const secunds = Math.floor((distance % (1000 * 60)) / 1000);
     
       
    day.textContent = days < 10 ? "0" + days : days;
    hrs.textContent = hours < 10 ? "0" + hours : hours;
    min.textContent = minutes < 10 ? "0" + minutes : minutes;
    sec.textContent = secunds < 10 ? "0" + secunds : secunds;

    if (distance <= 0) {
      clearInterval(countDownInterval);
      result.textContent = 'Поздравляем, Ваш отпуск начался';
      day.textContent = "00";
      hrs.textContent = "00";
      min.textContent = "00";
      sec.textContent = "00";
      dateInitial.value = '';
      return;
    }    
    
  }, 1000)
}
