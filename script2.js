// var menu = document.getElementById('menu');
// var lis = menu.getElementsByTagName('li');
// document.body.innerHTML = "";
// alert( lis.length );
// let aList1 = document.getElementsByTagName('a');
// var aList2 = document.querySelectorAll('a');
// console.log(aList1.length);
// console.log(aList2.length);
// const div = document.querySelector('div');
// const a = document.createElement('a');
// aList2[2].nextElementSibling.style.background = "blue";
// console.log(aList1.length);
// console.log(aList2.length);

//скрывает блоки текста
// let textContainer = document.getElementById('container');
// let pane = document.querySelectorAll('.pane');
// console.log(pane);
// textContainer.addEventListener('click', function(event){
//   let target = event.target;
//   if(target.className != 'remove-button'){
//     return;
//   } else{
//     for(let i=0; i<pane.length; i++){
//       if(pane[i].contains(target)){
//         pane[i].style.display = 'none';
//         break;
//       }
//     }
//   }
// });

// let tree = document.querySelector('.tree');
// let allLi = document.querySelectorAll('li');
// for(let li of allLi){
//   let span = document.createElement('span');
//   li.prepend(span);
//   span.append(span.nextSibling);
// }
// tree.addEventListener('click', (e)=>{
//   let target = e.target;
//   if(target.tagName != 'SPAN'){
//     return;
//   }
//   let childrenContainer = target.parentNode.querySelector('ul');
//   if(!childrenContainer){
//     return;
//   }
//   childrenContainer.hidden = !childrenContainer.hidden;
// });

let table = document.getElementById('grid');
let thead = table.querySelector('thead');

thead.addEventListener('click', (event)=>{
  let target = event.target;
  if(target.tagName != 'TH'){
    return;
  }
  sortGrid(target.cellIndex, target.dataset.type);
});

function sortGrid(rowNum, type){
  let tbody = table.querySelector('tbody');
  console.log(tbody);
  let gridArray = Array.from(tbody.rows);
  let compare;

  switch(type){
    case 'number':{
      compare = function(rowA, rowB){
        return rowA.cells[rowNum].innerHTML - rowB.cells[rowNum].innerHTML;
      };
      break;
    }
    case 'string':{
      compare = function(rowA, rowB){
        return rowA.cells[rowNum].innerHTML > rowB.cells[rowNum].innerHTML ? 1 : -1;
      };
      break;
    }
  }
  gridArray.sort(compare);
  tbody.append(...gridArray);
}



// let tableChildren = document.getElementById('grid');
// let thead = tableChildren.querySelector('thead');
// thead.addEventListener('click', (e)=>{
//   let target = e.target;
//   console.log(e);
//   if(target.tagName != 'TH'){
//     return;
//   }
//   sortGrid(target.cellIndex, target.dataset.type);
// });

// function sortGrid(rowNum, type){
//   let tbody = tableChildren.querySelector('tbody');
//   let rowsArray = Array.from(tbody.rows);
//   let compare;
//   switch(type){
//     case 'number':{
//       compare = function(rowA, rowB){
//         return rowA.cells[rowNum].innerHTML - rowB.cells[rowNum].innerHTML;
//       };
//       break;
//     }
//     case 'string': {
//       compare = function(rowA, rowB){
//         return rowA.cells[rowNum].innerHTML > rowB.cells[rowNum].innerHTML ? 1 : -1;
//       };
//       break;
//     }
//   }
//   rowsArray.sort(compare);
//   tbody.append(...rowsArray);
// }

//подсказки
let tooltipElem;
document.addEventListener('mouseover', (event) => {
  let target = event.target;
  if (target.tagName != 'BUTTON') {
    return;
  }
  let toolTipText = target.dataset.tooltip;
  if (!toolTipText) {
    return;
  }
  tooltipElem = document.createElement('div');
  tooltipElem.classList = 'tooltip';
  tooltipElem.innerHTML = toolTipText;
  target.appendChild(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента (top-center)
  let coords = target.getBoundingClientRect();
  console.log(coords);

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) {left = 0;} // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
});

document.addEventListener('mouseout', () => {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
});

let coordsDiv = document.getElementById('coords');
let field = document.getElementById('field');
field.addEventListener('click', function(e) { // показывает координаты точки клика
  coordsDiv.innerHTML = e.clientX + ':' + e.clientY;
});
let coords = field.getBoundingClientRect();
let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
// let answer4 = [
//   coords.right - parseInt(getComputedStyle(field).borderRightWidth),
//   coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
// ];
let answer4 = [
  coords.left + field.clientLeft + field.clientWidth,
  coords.top + field.clientTop + field.clientHeight
];
console.log(`левый внешний верхний угол: ${answer1}
правый нижний угол: ${answer2}
левый внутренний верхний угол: ${answer3}
правый внутренний нижний угол: ${answer4}`);