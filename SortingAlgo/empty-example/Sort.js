let values = [], state = [];
let thick = 8, i = 0, j = 0;
let mixButton, sortButton, selector,title;
let flag = false;
let selectedSort = 'BubleSort';




function setup() {
  
    createElement('h1', 'Sorting Algorithms Visualised');
    createCanvas(1000, 600);
    mixButton = createButton('Mix');
    sortButton = createButton('Sort');
    initArray();
    mixButton.mousePressed(initArray);

    selector = createSelect();
    selector.option('BubleSort');
    selector.option('SelectionSort');
    selector.option('InsertionSort');
    selector.option('QuickSort');
    selector.selected('QuickSort');

    title = createElement('h1', selector.value());
   

    sortButton.mousePressed(quickSort(values, 0, values.length - 1));

    const a ={
        x: 5,
        y: function() {
                console.log(this.x);
        }
    }
   
    frameRate(10);

}



function draw() {
    background(50);
    title.html(selector.value());

    sortButton.mousePressed(e => {
        flag = true;
    })



    if (flag) {
        if (selector.value() == 'BubleSort')
            bubleSort();
        else if (selector.value() == 'SelectionSort')
            selectionSort();
        else if (selector.value() == 'InsertionSort')
            insertionSort();

    }

    for (let i = 0; i < values.length; i++) {
        stroke(50)

        if (state[i] == 0)
            fill(22, 160, 133);
        else if (state[i] == 1)
            fill(22, 160, 133);
        else
            fill(255)

        rect(i * thick, height, thick, -values[i]);
    }

}

function initArray() {
    for (let i = 0; i < width / thick; i++) {
        values[i] = random(height);
        state[i] = -1;
    }

    i = 0;
    j = 0;
}

function selectionSort() {


    if (i < values.length) {

        let min = i; //  storing the index of minimum element

        for (var j = i + 1; j < values.length; j++) {
            if (values[min] > values[j]) {
                min = j; // updating the index of minimum element

            }


        }

        if (i !== min) {
            [values[i], values[min]] = [values[min], values[i]];

        }

        state[i] = 0;
        i++;
    }


}

function bubleSort() {

    for (let k = 0; k < 40; k++) {
        if (i < values.length) {
            if (values[j] > values[j + 1]) {

                swap(values, j, j + 1);

            }
            state[values.length - i] = 0;
            j++;


            if (j >= values.length - i - 1) {
                j = 0;
                i++;
            }
        }
        else {
            //noLoop();
        }
    }

}

function insertionSort() {
    let y = i + 1;

    if (y < values.length) {

        let key = values[y];
        let j = y - 1;
        state[y] = 0

        while (j >= 0 && values[j] > key) {
            values[j + 1] = values[j];
            j = j - 1;
        }
        values[j + 1] = key;
    }

    i++;
}

function swap(arr, a, b) {

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function swapQ(arr, a, b) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end);
    state[index] = -1;
    await Promise.all([quickSort(arr, start, index - 1), quickSort(arr, index + 1, end)]);


}

async function partition(arr, start, end) {

    for (let i = start; i < end; i++) {
        state[i] = 1;
    }

    let pivot_value = arr[end];
    let pivot_index = start;
    state[pivot_index] = 0;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot_value) {
            await swapQ(arr, i, pivot_index);
            state[pivot_index] = -1;
            pivot_index++;
            state[pivot_index] = 0;
        }

    }

    await swapQ(arr, end, pivot_index);

    for (let i = start; i < end; i++) {
        if (i != pivot_index)
            state[i] = -1;
    }

    return pivot_index;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}