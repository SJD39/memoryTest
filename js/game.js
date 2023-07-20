// 生成范围随机数
function randomRange(Max, Min) {
    return Math.floor((((Max + 1) - Min) * Math.random()) + Min);
}

var matLenNum;
var testList = [];
var mat = [];
var startTime;
var endTime;
var countdownID;

var countdown = document.getElementById('countdown');
var gameBox = document.getElementsByClassName('gameBox')[0];
var gameStartBtnI = document.getElementById('gameStartBtnI');
var matWI = document.getElementById('matWI');
var matWD = document.getElementById('matWD');
var matW;
var matHI = document.getElementById('matHI');
var matHD = document.getElementById('matHD');
var matH;
var memoryNumI = document.getElementById('memoryNumI');
var memoryNumD = document.getElementById('memoryNumD');
var memoryNum;
var memoryTimeI = document.getElementById('memoryTimeI');
var memoryTimeD = document.getElementById('memoryTimeD');
var memoryTime;

function initialize() {
    // 清除dom
    gameBox.innerHTML = '';

    // 初始化变量
    testList = [];
    mat = [];
    matW = matWI.value;
    matH = matHI.value;
    matLenNum = matW * matH;
    startTime = 0;
    endTime = 0;
    memoryNum = memoryNumI.value;
    memoryTime = memoryTimeI.value * 1000;

    // dom渲染
    matWD.innerText = matW;
    matHD.innerText = matH;
    memoryNumD.innerText = memoryNum;
    memoryTimeD.innerText = memoryTimeI.value;

    table = document.createElement("table");
    tbody = document.createElement("tbody");
    gameBox.appendChild(table);
    table.appendChild(tbody);

    for (let i = 0; i < matH; i++) {
        let tr = document.createElement("tr");
        for (let ii = 0; ii < matW; ii++) {
            let th = document.createElement("th");
            let box = document.createElement("div");
            let id = i * matW + ii;
            box.dataset.id = id;
            box.className = "box";
            tr.appendChild(th);
            th.appendChild(box);
        }
        tbody.appendChild(tr);
    }
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

    // dom渲染
    let boxes = document.getElementsByClassName("box");
    boxes = Array.from(boxes);
    boxes.forEach((element, index) => {
        testListIndex = testList.indexOf(index);
        if (testListIndex != -1) {
            element.className = "box testBox";
            element.innerText = testListIndex;
        }
    });
}

function countdownAnim() {
    let stillLeftTime = new Date().getTime() - startTime;
    let temp = memoryTime - stillLeftTime;
    countdown.innerText = temp < 0 ? 0 + "ms" : temp + "ms";
    if ((memoryTime - stillLeftTime) > 0) {
        window.requestAnimationFrame(countdownAnim);
    }
}

initialize();
gameStartBtnI.onclick = function () {
    initialize();
    start();
    startTime = new Date().getTime();
    countdownID = window.requestAnimationFrame(countdownAnim);

    setTimeout(() => {
        
    }, memoryTime);
}