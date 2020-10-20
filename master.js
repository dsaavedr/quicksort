let n = 300,
    arr = [],
    pivots = [],
    exp = [],
    max = 1000,
    padding = {
        top: 0,
        left: 20,
        right: 20,
        bottom: 10
    },
    w,
    WIDTH, HEIGHT;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    w = (WIDTH - padding.left - padding.right) / n;

    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    ctx.fillStyle = 'black';
    ctx.strokeStyle = "white";

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();


    for (let i = 0; i < n; i++) {
        let n = Math.floor(random(max));
        arr.push(scale(n, 0, max, 5, HEIGHT - padding.top - padding.bottom));
    }

    quicksort(arr);
    arr.shift();

    // ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < arr.length; i++) {
        let x = padding.left + w * i;
        let y = HEIGHT - padding.bottom - arr[i];

        let color = exp.includes(arr[i]) ? "green"
            : pivots.includes(arr[i]) ? "red"
                : "white";

        rect(x, y, w, arr[i], false, true, color);
    }

    //requestAnimationFrame(ani);
}

init();

function quicksort(arr, l = 0, h = arr.length) {
    ani();
    setTimeout(() => {
        if (l < h) {
            let p = partition(arr, l, h);
            quicksort(arr, l, p - 1);
            quicksort(arr, p + 1, h);
        }
    }, 150);
}

function partition(arr, l, h) {
    let pivot = arr[h];
    pivots.push(pivot);
    let i = l;
    for (let j = l; j < h; j++) {
        if (arr[j] < pivot) {
            ani();
            swap(arr, i, j);
            i++;
        }
    }
    ani();
    swap(arr, i, h);
    exp.push(pivot);
    ani();
    return i;
}

function swap(arr, i1, i2) {
    let n1 = arr[i1],
        n2 = arr[i2];

    arr[i1] = n2;
    arr[i2] = n1;

    ani();
}