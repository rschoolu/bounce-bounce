const canvas = document.querySelector('canvas')
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
canvas.style = "border: 1px solid black;"
const ctx = canvas.getContext('2d')
let target_min = getRandomArbitrary(-120, 0);
let score = 0;
let target_max = Math.abs(target_min);
let center_point = target_max + target_min;
let track_width = getRandomArbitrary(260, 750);
let time_since_last_game = 0;
let slider_x = track_width - 20;
let slider_increment = 2;
function regen() {
    slider_increment = 2;
    score = 0;
    target_min = getRandomArbitrary(-60, 0);
    target_max = getRandomArbitrary(0, 60);
    track_width = getRandomArbitrary(150, 750);
}
function win() {
    slider_increment = Math.abs(slider_increment) + 0.01;
    keydisabled = true;
    score++
    sliderdisabled = true;
    slider_x = track_width - 20;
    slider_colour = "green";
    setTimeout(()=>{keydisabled = false; sliderdisabled = false; slider_colour = "orange";}, 1000)
}
function lose() {
    regen()
    keydisabled = true;
    sliderdisabled = true;
    slider_x = track_width - 20;
    slider_colour = "red";
    setTimeout(()=>{keydisabled = false; sliderdisabled = false; slider_colour = "orange";}, 2000)
}
function calculateAccuracy() {
    if(slider_x <= target_max * 2 && slider_x >= target_min * 2) {
        return true
    } else {
        return false
    }
}
let sliderdisabled = false;
let keydisabled = false;
let slider_colour = "orange"
function processKey(key) {
    if(!keydisabled) {
    if(key == " ") {
        if(calculateAccuracy()) {
            win()
        } else {
            lose()
        }
    }
}
}

function moveSlider() {
    if(!sliderdisabled){
    if(slider_x >= track_width) {
        slider_increment = 0 - slider_increment;
    } else if (slider_x <= 0-track_width) {
        slider_increment = Math.abs(slider_increment);
    }
    slider_x = slider_increment + slider_x;
}
}
function drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "30px Arial";
    ctx.fillText('Score: ' + score, 0, 30);
    ctx.fillText('Speed: ' + Math.round(Math.abs(slider_increment) * 100) / 100, 0, 60)
    ctx.fillStyle = "skyblue";
    ctx.fillRect(((canvas.width / 2) - (track_width / 2)), ((canvas.height / 2) - 20), track_width, 20);
    ctx.fillStyle = slider_colour
    ctx.fillRect((canvas.width / 2) - ((Math.abs(target_min) / 2) + (Math.abs(target_max) / 2) - center_point), ((canvas.height / 2) - 20), (Math.abs(target_min) + Math.abs(target_max)), 20)
    ctx.fillStyle = "black"
    ctx.fillRect(((canvas.width / 2) - 20 / 2) + slider_x / 2, ((canvas.height / 2) - 20) - (25 / 2), 20, 50)
}
setInterval(() => {
    drawScreen()
}, 0);
setInterval(()=>{
    moveSlider()
}, 2)
document.addEventListener('keydown', (e)=>{
    processKey(e.key.toLowerCase())
})