// DOM
const $background = document.querySelector('.background > ul');
// console.log(background);
const $cat = document.getElementById('cat');
// console.log($cat);
const $fishes = document.querySelector('.fishes');
// console.log($fishes);
$fishChildren = [...$fishes.children];


// Setting
const GAME_COLS = 5; // 가로
const GAME_ROWS = 7; // 세로

let score = 0;
let duration = 500;
let downInterval;
let tempMovingCat;
let tempMovingFish;

const BLOCKS = {
    cat: [
        [
            [2, 5],
        ]
    ],
    fish1: [
        [
            [0, 1],
            [1, 2]
        ]

    ]
}

if (BLOCKS.cat === BLOCKS.fish1) {
    score++;
    console.log(score);
}




const movingCat = {
    name: "냥냥이",
    type: 'cat',
    direction: 0,
    left: 0,
    top: 0,
}

const movingFish = {
    name: "물고기",
    type: 'fish1',
    direction: 0,
    left: 0,
    top: 0,
}





// 게임시작
function init() {
    tempMovingCat = {
        ...movingCat
    };
    tempMovingFish = {
        ...movingFish
    };
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    drawCat()
    drawFish()
}

function prependNewLine() {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for (let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement('li');
        ul.prepend(matrix);
    }
    li.prepend(ul);
    $background.prepend(li);
}

function drawCat() {
    const {
        type,
        direction,
        left,
        top
    } = tempMovingCat;
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving")
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        // console.log({$background});

        // 범위 넘어가면 null
        const target = $background.childNodes[y] ? $background.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingCat = {
                ...movingCat
            }
            setTimeout(() => {
                drawCat();
            }, 0)
        }
    })
    movingCat.left = left;


}

function checkEmpty(target) {
    if (!target) {
        return false;
    }
    return true;
}


function moveBlock(moveType, amount) {
    tempMovingCat[moveType] += amount;
    drawCat()
}



// 이벤트 핸들링
document.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 38:
            moveBlock("top", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        default:
            break;
    }
    // console.log(e);
})





// 물고기 생성
function createFish() {
    const ul = document.createElement('ul');
}





function drawFish() {
    const {
        type,
        direction,
       
    } = tempMovingFish;
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving")
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
        console.log({
            $background
        });


        // 범위 넘어가면 null
        const target = $background.childNodes[y].childNodes[0].childNodes[x];
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } 
    })
    


}


















//랜덤으로 생성하는 함수!
// const randomCreate = () => {
//     let n = Math.floor(Math.random() * 18) + 1;
//     const $layer = document.querySelector(`.layer li:nth-child(${n})`);
//     const $newLayer = document.createElement(`div`);
//     // $newLayer.innerHTML = '<img src=../images/fish.png>';
//     $layer.classList.add(`fall`);
//     $layer.appendChild($newLayer);
//     console.log($layer);
//     return $newLayer;

// };

// for (i = 0; i < 1000; i++) {
//     setTimeout(() => {
//         randomCreate();
//     }, Math.random() * 1000000);
// }





















// 게임시작
init();