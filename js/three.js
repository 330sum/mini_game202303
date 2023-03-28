// DOM
const $background = document.querySelector('.background > ul');
// console.log(background);

// Setting
const GAME_COLS = 20; // 가로
const GAME_ROWS = 9; // 세로

let score = 0;
let tempMovingCat;
let tempMovingFish;
let x;
let y;


const BLOCKS = {
    cat: [
        [8, 5],
    ],
    fish: [
        [0, 5],
    ]
}

// console.log(BLOCKS.fish[0].pop()      );

if (x === BLOCKS.fish[0][0] && y === BLOCKS.fish[0][1]) {
    BLOCKS.fish[0].pop();
}


console.log(BLOCKS.fish);

const movingCat = {
    name: '냥냥이',
    type: 'cat',
    left: 0,
    top: 0
}

const movingFish = {
    name: '물고기',
    type: 'fish',
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
    checkMatch();
    drawFish();

}

function prependNewLine() {
    const $li = document.createElement('li');
    const $ul = document.createElement('ul');
    for (let j = 0; j < GAME_COLS; j++) {
        const nemo = document.createElement('li');
        $ul.prepend(nemo);
    }
    $li.prepend($ul);
    $background.prepend($li);
}

function drawCat() {
    const {
        type,
        left,
        top
    } = tempMovingCat;
    const movingBlocks = document.querySelectorAll('.moving')
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, 'moving')
    })
    BLOCKS[type].forEach(block => {
        x = block[0] + left;
        y = block[1] + top;
        // console.log({$background});

        // 범위 넘어가면 null
        const target = $background.children[y] ? $background.children[y].children[0].children[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, 'moving');
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
    movingCat.top = top;

}

function moveBlock(moveType, amount) {
    tempMovingCat[moveType] += amount;
    drawCat()
}



// console.log($background.children + "---");

function checkEmpty(target) {
    if (!target) {
        return false;
    }
    return true;
}





function drawFish() {
    const {
        type,
    } = tempMovingFish;
    BLOCKS[type].forEach(block => {
        x = block[0];
        y = block[1];

        console.log(x, y);

        const target = $background.children[y] ? $background.children[y].children[0].children[x] : null;
        target.classList.add(type);
    
    })
  
}







// 이벤트 핸들링
document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 39:
            moveBlock('left', 1);
            break;
        case 37:
            moveBlock('left', -1);
            break;
        case 38:
            moveBlock('top', -1);
            break;
        case 40:
            moveBlock('top', 1);
            break;
        default:
            break;
    }
    // console.log(e);
})





function checkMatch() {
    const column = $background.children;
    column.forEach(child => {
        let matched = true;
        child.children[0].children.forEach(li => {
            if (!li.classList.contains("tempMovingFish")) {
                matched = false;
            }
        })
        if (matched) {
            child.remove();
            prependNewLine();
        }
    })
}









// 랜덤으로 생성하는 함수!
// setInterval(()=>{
//     let n = Math.floor(Math.random() * 10) + 1;
//     const $layer = document.querySelector(`.fish-box .layer:nth-child(${n})`);
//     const $newLayer = document.createElement(`div`);
//     $newLayer.innerHTML = '<img src=../images/fish3.png>';
//     $newLayer.classList.add(`fish`)
//     $newLayer.classList.add(`fall`);
//     $layer.appendChild($newLayer);
//     console.log($layer);
// }, 1000);





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