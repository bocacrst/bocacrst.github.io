let values = [];
let thick = 5;
let i = 1;
let state = [];

function setup(){
    createCanvas(1000, 600);

    for (let i = 0; i < width / thick; i++) {
        values.push(random(height));
        state[i] = -1;
    }
    frameRate(10);
}

function insertionSort(){

    if(i<values.length){
      
        
        let key = values[i]; 
        let j = i - 1; 
        state[j]=0
        // Move elements of arr[0..i-1], 
        // that are greater than key, 
        // to one position ahead of 
        // their current position 
        while (j >= 0 && values[j] > key) { 
            values[j + 1] = values[j]; 
            j = j - 1; 
        } 
        values[j + 1] = key;   
    }
 
    i++;
}

function draw(){
    background(50);
    insertionSort()
    for(let i = 0; i<values.length;i++){
        if(state[i]==0){
            fill(22, 160, 133);
        }
        else{
            fill(255); 
        }
        rect(i * thick, height, thick, -values[i]);
    }
}