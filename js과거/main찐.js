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

const BLOCKS = {
    cat: [
        [
            [2, 5],
        ]
    ],
    fish: [
        [0, 1],
        [1, 2]
    ]
}

const movingCat = {
    name: "냥냥이",
    type: 'cat',
    direction: 0,
    left: 0,
}







// 게임시작
function init() {
    tempMovingCat = {
        ...movingCat
    };
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    drawCat()
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
        left
    } = tempMovingCat;
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving")
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left;
        const y = block[1];
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
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        default:
            break;
    }
    // console.log(e);
})





// 물고기 생성
// function createFish() {
//     const ul = document.createElement('ul');
// }










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










// function countdown() {
//     let seconds = 10;
//     function tick() {
//         let $counter = document.getElementById('counter');
//         seconds--;
//         $counter.innerHTML = (seconds < 10 ? '0' : '')  + String(seconds) + '초';
//         if( seconds > 0 ) {
//             setTimeout(tick, 1000);
//         } else {
//             alert('집사야~ 잘 먹었다옹~');
//         }
//     }
//     tick();
// }

// countdown();

















// 게임시작
init();