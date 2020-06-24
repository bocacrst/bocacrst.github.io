let values = [];
let states = [];
let i =0;
let j =0;
let thick = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0 ;i< width/thick;i++){
    values.push(random(height));
    states[i]=-1;
  }
  
  frameRate(60);
}

function bubleSort(){

  for(let k =0 ;k<20;k++){
    if(i<values.length){
      if(values[j] > values[j+1]){
        states[j] = 0;
        swap(values,j,j+1);
        
      }
      states[j]=-1
      j++;
      
      
      if(j>=values.length-i-1){
        j = 0;
        i++;
      }
    }
    else{
      noLoop();
    }
  }
  
}

 function swap(arr,a,b){
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;     
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(){
  background(0);

  bubleSort();

  for(let i = 0 ;i< values.length;i++){
    
    stroke(100);

    if(states[i]==0)
      fill(255,0,0);
    else
      fill(22, 160, 133);


    rect(i*thick,height,thick,-values[i]) ;
    
  }
}
