// 生成范围随机数
function randomRange(Max, Min) {
    return Math.floor((((Max + 1) - Min) * Math.random()) + Min);
}

var isTouchDevice = 'ontouchstart' in document.documentElement;

var matLenNum;
var testList = [];
var mat = [];
var memoryStartTime;
var startTime;
var gamePointer;
var userInput = [];

// 0    未开始
// 1    记忆中
// 2    回忆中
// 3    结算中
var gameState = 0;

var countdown = document.getElementById('countdown');
var gameStartBtnI = document.getElementById('gameStartBtnI');
var matWD = document.getElementById('matWD');
var matHI = document.getElementById('matHI');
var matHD = document.getElementById('matHD');
var matWI = document.getElementById('matWI');
var memoryNumI = document.getElementById('memoryNumI');
var memoryNumD = document.getElementById('memoryNumD');
var memoryTimeI = document.getElementById('memoryTimeI');
var memoryTimeD = document.getElementById('memoryTimeD');
var spendTimeD = document.getElementById('spendTimeD');
var memoryNum;
var memoryTime;

var gameBox = document.getElementById('gameBox');
function reBuild(matW, matH) {
    for (let i = 0; i < matH; i++) {
        let tr = document.createElement("div");
        tr.className = 'gameTr';
        for (let ii = 0; ii < matW; ii++) {
            let tbox = document.createElement("div");
            let id = i * matW + ii;
            tbox.dataset.id = id;
            tbox.className = 'box';
            tr.appendChild(tbox);
        }
        gameBox.appendChild(tr);
    }
}

function reRender(array, className1, className2, text = 'only') {
    let boxes = document.getElementsByClassName("box");
    boxes = Array.from(boxes);
    boxes.forEach((element, index) => {
        let arrayIndex = array.indexOf(index);
        if (arrayIndex != -1) {
            // 数组中存在
            element.className = className1;
        } else {
            // 数组中不存在
            element.className = className2;
        }

        if (text == 'only') {
            if (arrayIndex != -1) {
                element.innerText = arrayIndex;
            } else {
                element.innerText = '0';
            }
        } else {
            element.innerText = text;
        }
    });
}

function initialize() {
    let matW;
    let matH;

    // 清除dom
    gameBox.innerHTML = '';

    // 初始化变量
    testList = [];
    mat = [];
    matW = matWI.value;
    matH = matHI.value;
    matLenNum = matW * matH;
    startTime = 0;
    memoryStartTime = 0;
    gamePointer = 0;
    memoryNum = memoryNumI.value;
    memoryTime = memoryTimeI.value;
    userInput = [];
    gameState = 0;

    // dom渲染
    matWD.innerText = matW;
    matHD.innerText = matH;
    memoryNumD.innerText = memoryNum;
    memoryTimeD.innerText = memoryTime;
    countdown.innerText = memoryTime;
    spendTimeD.innerText = '0000';

    reBuild(matW, matH);
}

function start() {
    // 创建测试方块
    while (mat.length < matLenNum) {
        mat.push(0)
    }

    // 创建测试列表
    while (testList.length < memoryNum) {
        randomNum = randomRange(matLenNum - 1, 0);
        if (testList.includes(randomNum)) {
            continue;
        } else {
            testList.push(randomNum);
        }
    }
    console.log(testList);

    reRender(testList, "box testBox", "box");
}

function countdownAnim() {
    let stillLeftTime = memoryTime - (new Date().getTime() - memoryStartTime);
    countdown.innerText = stillLeftTime < 0 ? 0 : stillLeftTime;
    if (stillLeftTime > 0) {
        window.requestAnimationFrame(countdownAnim);
    }
}

function gameEnd() {
    gameState = 3;
    spendTimeD.innerText = new Date().getTime() - startTime;

    if (userInput.toString() == testList.toString()) {
        console.log("win");
        reRender(userInput, "box winBox", "box");
    } else {
        console.log("lose");
        reRender(userInput, "box loseBox", "box");
    }
}

function testBoxClick(e){
    if (gameState != 2) {
        // 如果在结算中
        return;
    }
    if (!e.target.dataset.id) {
        // 如果点击的不是测试元素
        return;
    }

    let elementID = Number(e.target.dataset.id);
    let index = userInput.indexOf(elementID);
    if (index != -1) {
        userInput.splice(index, 1);
        gamePointer--;
    } else {
        userInput.push(elementID);
        gamePointer++;
    }
    reRender(userInput, "box testBox", "box");
    if (userInput.length == memoryNum) {
        gameEnd();
    }
}

function gameStartAction() {
    // 验证游戏状态
    if (gameState == 1 || gameState == 2) {
        return;
    }
    gameState = 1;

    initialize();
    start();
    memoryStartTime = new Date().getTime();
    // 按帧刷新记忆时间
    window.requestAnimationFrame(countdownAnim);
    setTimeout(() => {
        gameState = 2;
        // 隐藏测试方块
        reRender(testList, "box", "box", '0');
        // 记录测试开始时间
        startTime = new Date().getTime();
        if(isTouchDevice){
            gameBox.ontouchstart = testBoxClick;
        }else{
            gameBox.onclick = testBoxClick;
        }
    }, memoryTime);
}

// 按照默认设置初始化
initialize();
gameStartBtnI.onmousedown = gameStartAction;