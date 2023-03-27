// DOM
const $background = document.querySelector('.background > ul');
// console.log(background);
const $cat = document.getElementById('cat');
// console.log($cat);
const $fishes = document.querySelector('.fishes');
// console.log($fishes);
$fishChildren = [...$fishes.children];


// Setting
const GAME_ROWS = 28; //세로
const GAME_COLS = 16; // 가로

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    cat: [
        [
            [7, 25],
            [8, 25],
            [7, 26],
            [8, 26],

        ]
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
    tempMovingItem = {
        ...movingCat
    };
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    renderBlocks()
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

function renderBlocks() {
    const {
        type,
        direction,
        left
    } = tempMovingItem;
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
            tempMovingItem = {
                ...movingCat
            }
            setTimeout(() => {
                renderBlocks();
            }, 0)
        }
    })
    movingCat.left = left;
    // movingCat.top = top;
    // movingCat.direction =direction;

}

function checkEmpty(target) {
    if (!target) {
        return false;
    }
    return true;
}


function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks()
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



// function update() {
//     if (39 in keysDown) {
//        $cat +=5;
//     }
// }

// const target = $background.children.block;
// console.log(target);

// const target2 = $background.children
// console.log(target2);



for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 16; i++) {
        $fishChildren[i]
    }
};






// // 랜덤으로 생성하는 함수!
// const randomCreate = () => {
//     let n = Math.floor(Math.random() * 18) + 1;
//     const $layer = document.querySelector(`.layer li:nth-child(${n})`);
//     const $newLayer = document.createElement('div');
//     $layer.classList.add('fall');
//     $layer.appendChild($newLayer);
//     // console.log($layer);
//     return $newLayer;
// };

// for (i = 0; i < 100; i++) {
//     setTimeout(() => {
//         randomCreate();
//     }, Math.random() * 10000);
// }















// 게임시작
init();