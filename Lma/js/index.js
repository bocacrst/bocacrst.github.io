let lifeNumber = 756864000;
let weNumber =  18144000;
const lifeTime = document.querySelector('[data-life-nr]');
const weTime = document.querySelector('[data-we-nr]');

function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Update the count down every 1 second
var CountUp = setInterval(function(){
    
    lifeTime.innerText = numberWithCommas(lifeNumber++);
    weTime.innerText = numberWithCommas(weNumber++);
    
    
}, 1000);
