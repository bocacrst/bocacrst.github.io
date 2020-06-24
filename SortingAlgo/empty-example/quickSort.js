let values = [];
let states = [];
let thick = 10;

function setup() {
  createCanvas(1000, 600);

  for(let i = 0 ;i< width/thick;i++){
    values.push(random(height));
    states[i] =-1;
  }

  quickSort(values,0,values.length-1);
 // frameRate(10);
}

 async function quickSort(arr,start,end){
    if(start>=end){
        return;
    }

    let index = await partition(arr, start, end);
    states[index] = -1;
    await Promise.all([quickSort(arr,start,index-1),quickSort(arr,index+1,end)]);
   

  }

  async function partition(arr,start,end){

    for(let i = start ;i<end;i++){
        states[i] = 1;
    }

    let pivot_value = arr[end];
    let pivot_index = start;
    states[pivot_index]=0;

    for(let i=start;i<end;i++){
        if(arr[i]<pivot_value){
            await swap(arr,i,pivot_index);
            states[pivot_index] = -1;
            pivot_index++;
            states[pivot_index] = 0;
        }
        
    }

    await swap(arr,end,pivot_index);

    for(let i = start ;i<end;i++){
       if(i != pivot_index)
            states[i] = -1;
    }

    return pivot_index;
  }

  async function swap(arr,a,b){
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;     
  }



  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 
function draw() {

  background(0);
  for(let i = 0 ;i< values.length;i++){
    stroke(255, 255, 255,)
    if(states[i] == 0){
        fill(255,0,0)
    }
    else if( states[i] == 1)
     fill(22, 160, 133);
    else{
        fill(255);
    }
    rect(i*thick,height,thick,-values[i]) ;
    
  }

 
}