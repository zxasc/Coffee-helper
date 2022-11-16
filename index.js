//Ratio calculator selectors
const coffeeRatio = document.querySelector("#coffeeRatio");
const waterRatio = document.querySelector("#waterRatio");
const coffeeAmount = document.querySelector("#coffeeAmount");
const waterAmount = document.querySelector("#waterAmount");
const coffeeArrowUp = document.querySelector("#coffeeArrowUp");
const coffeeArrowDown = document.querySelector("#coffeeArrowDown");
const waterArrowUp = document.querySelector("#waterArrowUp");
const waterArrowDown = document.querySelector("#waterArrowDown");
//Ratio finder selectors
const calcWater = document.querySelector("#calcWater");
const calcCoffee = document.querySelector("#calcCoffee");
const calcRatioWater = document.querySelector("#calcRatioWater");
const calcRatioCoffee = document.querySelector("#calcRatioCoffee");
const foundBtn = document.querySelector("#foundBtn")
//Stopwatch selectors
const minutes = document.querySelector("#m");
const seconds = document.querySelector("#s");
const miliseconds = document.querySelector("#ms");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
let n = 1;
let pausedTime = 0;
let isRunning = false;
//This function does some really simple math to figure out how much coffee you need for the amount of water you put into the input box.
function howMuchCoffee() {
    ratio = coffeeRatio.value / waterRatio.value;
    if (isNaN(ratio) || !(isFinite(ratio))) {
        coffeeAmount.innerHTML = 0.00;
    } else if (ratio < 0) {
        coffeeAmount.innerHTML = ((Math.abs(ratio)) * 10).toFixed(2);
    } else {
        coffeeAmount.innerHTML = (waterAmount.value * ratio).toFixed(2);
    }
}
//This function finds out the ratio of coffee-to-water from some given recipe. It only returns whole numbers.
function findRatio() {
    if ((calcWater.value > 0) && (calcCoffee.value > 0)) {
        foundRatio = calcWater.value / (calcCoffee.value) * n;
    if ((foundRatio % 1 === 0) && (calcWater.value.length !== 0) && (calcCoffee.value.length !== 0)) {
        calcRatioWater.innerHTML = foundRatio;
        calcRatioCoffee.innerHTML = n;
        n = 1;
    } else if ((foundRatio % 1 !== 0) && (calcWater.value.length !== 0) && (calcCoffee.value.length !== 0)) {
        n++;
        findRatio();
    }
}
}
//This is the stopwatch's update function. It calculates the time between clicking the start button and the current time when running the function from the Date object, returning the elapsed time. It also takes into consideration the time at which the stopwatch was stopped.
function updateTime() {
    end = new Date()
    elapsedTime = end - startTime + pausedTime;
    ms = parseInt((elapsedTime % 1000));
    s = parseInt((elapsedTime / 1000) % 60);
    m = parseInt((elapsedTime / (1000 * 60)) % 60);
    miliseconds.innerHTML = ms;
    seconds.innerHTML = s;
    minutes.innerHTML = m;
}
//Ratio calculator event listeners
coffeeRatio.addEventListener('input', howMuchCoffee.bind());
waterRatio.addEventListener('input', howMuchCoffee.bind());
waterAmount.addEventListener('input', howMuchCoffee.bind());
coffeeArrowUp.addEventListener('click', function () {
    coffeeRatio.value++;
    if (coffeeRatio.value <= 1) {
        coffeeRatio.value = 1;
    }
    howMuchCoffee();
})
coffeeArrowDown.addEventListener('click', function () {
    coffeeRatio.value--;
    if (coffeeRatio.value <= 1) {
        coffeeRatio.value = 1;
    }
    howMuchCoffee();
})
waterArrowUp.addEventListener('click', function () {
    waterRatio.value++;
    if (waterRatio.value <= 1) {
        waterRatio.value = 1;
    }
    howMuchCoffee();
})
waterArrowDown.addEventListener('click', function () {
    waterRatio.value--;
    if (waterRatio.value <= 1) {
        waterRatio.value = 1;
    }
    howMuchCoffee();
})

//Ratio finder event listeners
calcWater.addEventListener('input', findRatio.bind());
calcCoffee.addEventListener('input', findRatio.bind());
foundBtn.addEventListener('click', function () {
    coffeeRatio.value = calcRatioCoffee.innerHTML;
    waterRatio.value = calcRatioWater.innerHTML;
    howMuchCoffee();
});
//Stopwatch event listeners, functions for starting, stopping and resetting the stopwatch.
startBtn.addEventListener('click', function () {
    if (isRunning === false) {
        startTime = new Date();
        isRunning = true;
        timer = setInterval(updateTime, 1);
    }
});
stopBtn.addEventListener('click', function () {
    pausedTime = elapsedTime;
    isRunning = false;
    clearInterval(timer);
});
resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    isRunning = false;
    pausedTime = 0;
    elapsedTime = 0;
    miliseconds.innerHTML = 0;
    seconds.innerHTML = 0;
    minutes.innerHTML = 0
});