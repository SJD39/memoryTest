// 生成范围随机数
function randomRange(Max, Min) {
    return Math.floor((((Max + 1) - Min) * Math.random()) + Min);
}

var matW;
var matH;
var matLenNum;
var testNum;
var testList = [];
var mat = [];
var memoryTimeW;

var matWI = document.getElementById('matWI');
var matHI = document.getElementById('matHI');
var memoryNumI = document.getElementById('memoryNumI');
var startBtn = document.getElementById('startBtn');
var content = document.getElementsByClassName("content")[0];
var setPage = document.getElementsByClassName('setPage')[0];

function initialize(){
    testList = [];
    mat = [];
    matW = matWI.value;
    matH = matHI.value;
    matLenNum = matW * matH;

    // 初始化dom渲染
    table = document.createElement("table");
    tbody = document.createElement("tbody");
    content.appendChild(table);
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
    console.log(mat)

    // 创建测试列表
    while (testList.length < testNum) {
        randomNum = randomRange(matLenNum - 1, 0);
        if (testList.includes(randomNum)) {
            continue;
        } else {
            testList.push(randomNum);
        }
    }
    console.log(testList)

    // dom渲染
    let boxes = document.getElementsByClassName("box");
    console.log(boxes);
    // boxes.forEach(element => {
    //     // let index = testList.indexOf(i)
    //     // if (index != -1) {
    //         element.className = "box testBox";
    //         element.innerText = index;
    //     // }
    // });
}
function end(){
    table.remove();
}

startBtn.onclick = function(){
    initialize();
    start();
    
    end();
}