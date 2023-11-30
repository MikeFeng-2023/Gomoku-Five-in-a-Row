let data = {};
resetData();

function resetData(){
  for(let i=1; i<=15; i++){
    for(let j=1; j<=15;j++){
      let key = `${i}&${j}`;
      data[key]=0;
    }
  } 
}
loadBoard();
function loadBoard(){
  let container=document.querySelector(".grid-container");
  let row = 0;
  let html="";
  for(let i = 1; i<=15;i++){
    if(i==1){
      for(let j = 1; j<=15;j++){
        if(j==1){
          html+=`<img src="./icons/upperleftcorner.png" class="img" id=${i+"&"+j}>`;
        }else if(j==15){
          html+=`<img src="./icons/upperrightcorner.png" class="img" id=${i+"&"+j}>`;
        }
        else{
          html+=`<img src="./icons/upperboundary.png" class="img" id=${i+"&"+j}>`;
        }
      }    
    }else if(i==15){
      for(let j = 1; j<=15;j++){
        if(j==1){
          html+=`<img src="./icons/bottomleftcorner.png" class="img" id=${i+"&"+j}>`;
        }else if(j==15){
          html+=`<img src="./icons/bottomrightcorner.png" class="img" id=${i+"&"+j}>`;
        }
        else{
          html+=`<img src="./icons/bottomboundary.png" class="img" id=${i+"&"+j}>`;
        }
      } 
    }else{
      for(let j = 1; j<=15;j++){
        if(j==1){
          html+=`<img src="./icons/leftboundary.png" class="img" id=${i+"&"+j}>`;
        }else if(j==15){
          html+=`<img src="./icons/rightboundary.png" class="img" id=${i+"&"+j}>`;
        }
        else{
          html+=`<img src="./icons/normal.png" class="img" id=${i+"&"+j}>`;
        }
      }
    }

    row++;
  }
  container.innerHTML=html;  
}


let currentButton = 0;
document.querySelector("#start").addEventListener("click", StartPlay);

document.querySelector("#reset").addEventListener("click", ()=>{
  resetData();
  loadBoard();
  showInfo.innerHTML="";
  document.querySelector(".grid-container").removeEventListener("click", AddButton);
  document.querySelector("#start").addEventListener("click", StartPlay);
})

function StartPlay(){
  let showInfo=document.querySelector("#showInfo");
  currentButton=0;
  showInfo.innerHTML = "Black Button's turn!"
  document.querySelector(".grid-container").addEventListener("click", AddButton);
  document.querySelector("#start").removeEventListener("click", StartPlay);
}


function AddButton(e){
  console.log(e.target.id);
  //console.log(data[e.target.id]);
  if(data[e.target.id]==0){
    if(currentButton%2==0){
      //console.log(e.target.src);
      let oldSrc= e.target.src;
      //let newString = "Black.png";
      let newSrc =String(oldSrc).replace(".png","Black.png");
      e.target.src=newSrc;
      data[e.target.id]=2;
      if(CheckResult(e.target.id, 2)){
        showInfo.innerHTML="Black Buttons Win!";
        document.querySelector(".grid-container").removeEventListener("click", AddButton);
      }else{
        showInfo.innerHTML="White Buttons's turn!";
      }
    }else{
      let oldSrc= e.target.src;
      //let newString = "Black.png";
      let newSrc =String(oldSrc).replace(".png","White.png");
      e.target.src=newSrc;
      data[e.target.id]=1;
      if(CheckResult(e.target.id, 1)){
        showInfo.innerHTML="White Buttons Win!";
        document.querySelector(".grid-container").removeEventListener("click", AddButton);
      }else{
        showInfo.innerHTML="Black Buttons's turn!";
      }
    }
    currentButton++;
  }
}

function CheckResult(id, value){
  let count =1;
  result =false;
  let positionRow =String(id).split("&")[0];
  let positionCol =String(id).split("&")[1];
  //console.log(`${positionRow} + ${positionCol}`);
  //check the row
  let R =Number(positionRow) ;
  let C =Number(positionCol) ;
  let key = `${R}&${++C}`;
  console.log(data[key]);
  while(C<=15&&data[key]==value){
    key = `${R}&${C}`;
    //console.log(`${key} value = ${data[key]}`);
    count++;
    C++;
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }
  C = positionCol;
  key = `${R}&${--C}`;
  console.log(data[key]);
  while(C>=1&&data[key]==value){
    console.log(`${key} value = ${data[key]}`);
    count++;
    C--;
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }
//check the colum
  count =1;
  R = positionRow;
  C = positionCol;
  key = `${++R}&${C}`;
  console.log(data[key]);
  while(R<=15&&data[key]==value){
    console.log(`${key} value = ${data[key]}`);
    count++;
    R++;
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }
  R = positionRow;
  key = `${--R}&${C}`;
  console.log(data[key]);
  while(R>=1&&data[key]==value){
    console.log(`${key} value = ${data[key]}`);
    count++;
    R--;
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }

  //check the upperleft to lowerright diagonal
  count =1;
  R = positionRow;
  C = positionCol;
  key = `${++R}&${++C}`;
  console.log(data[key]);
  while(R<=15&&C<=15&&data[key]==value){
    console.log(`${key} value = ${data[key]}`);
    count++;
    R++;
    C++;
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }
  R = positionRow;
  C = positionCol;
  key = `${--R}&${--C}`;
  console.log(data[key]);
  while(R>=1&&C>=1&&data[key]==value){
    console.log(`${key} value = ${data[key]}`);
    count++;
    R--;
    C--
    key = `${R}&${C}`;
    if(count==5){
      result =true;
      break;
    }
  }

    //check the upperright to lowerleft diagonal
    count =1;
    R = positionRow;
    C = positionCol;
    key = `${--R}&${++C}`;
    console.log(data[key]);
    while(R>=1&&C<=15&&data[key]==value){
      console.log(`${key} value = ${data[key]}`);
      count++;
      R--;
      C++;
      key = `${R}&${C}`;
      if(count==5){
        result =true;
        break;
      }
    }
    R = positionRow;
    C = positionCol;
    key = `${++R}&${--C}`;
    console.log(data[key]);
    while(R<=15&&C>=1&&data[key]==value){
      console.log(`${key} value = ${data[key]}`);
      count++;
      R++;
      C--;
      key = `${R}&${C}`;
      if(count==5){
        result =true;
        break;
      }
    }
    return result;
}