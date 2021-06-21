'use strict';

//////////////// the arrray of Images ///////////////////

let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

//////////////// get by id //////////////////////////////

let leftItemIndex = 0;
let centerItemIndex = 0;
let rightItemIndex = 0;


let imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');
const asideElement = document.getElementById('showResult');
let btnResult = document.getElementById('btnResult');
let ulList = document.getElementById('unorderedList');
asideElement.appendChild(ulList);

let counter = 0;
let attmpets = 25;
//attmpets = prompt('how many sets of our products you want to see ande choose frome them? hint the defualt value is 25 sets');


////////////// Constructor function /////////////////////////////

function Images(name, src) {
  this.name = name;
  this.src = `./img/${src}`;
  this.views = 0;
  this.clicks = 0;
  Images.all.push(this);
}

Images.all = []; //the array that contain all the objects
Images.previousIndex = []; //the array contain the previous indeices for images
//////////////// New objects //////////////////////////////////

for (let i = 0; i < imgArray.length; i++) {
  //console.log(imgArray[i].split('.'));
  new Images(imgArray[i].split('.')[0], imgArray[i]);
}

/////////////// prototype render for three images //////////////////////////

function render() {

  Images.previousIndex = [];

  if (counter >= 0) {
    Images.previousIndex.push(leftItemIndex);
    Images.previousIndex.push(centerItemIndex);
    Images.previousIndex.push(rightItemIndex);
  }
  console.log(Images.previousIndex);


  let leftIndex = randomNumber(0, imgArray.length - 1);

  let centerIndex;
  do {
    centerIndex = randomNumber(0, imgArray.length - 1);
  } while (leftIndex === centerIndex);

  let rightIndex;
  do {
    rightIndex = randomNumber(0, imgArray.length - 1);
  } while ((leftIndex === rightIndex) || (rightIndex === centerIndex));

  rightImage.src = Images.all[rightIndex].src;
  centerImage.src = Images.all[centerIndex].src;
  leftImage.src = Images.all[leftIndex].src;

  leftItemIndex = leftIndex;
  centerItemIndex = centerIndex;
  rightItemIndex = rightIndex;

  // console.log(Images.all);
  Images.all[centerIndex].views++;
  Images.all[rightIndex].views++;
  Images.all[leftIndex].views++;

}
/////////////////// Event Handler for clicking ////////////////////////

function eventHandler(event) {

  console.log(event.target.src);
  if ((event.target.id === 'rightImage' || event.target.id === 'leftImage' || event.target.id === 'centerImage') && counter < attmpets) {
    if (event.target.id === 'leftImage') {
      Images.all[leftItemIndex].clicks++;
    }
    if (event.target.id === 'centerImage') {
      Images.all[centerItemIndex].clicks++;
    }
    if (event.target.id === 'rightImage') {
      Images.all[rightItemIndex].clicks++;

    }
    counter++;
    render();



  } else if (counter >= attmpets) {
    imageSection.removeEventListener('click', eventHandler);

    resultChart();

  }

}

/////////////// render for the unorderd list elements /////////////////

function resultClick(e) {
  e.preventDefault();
  console.log(e);
  for (let i = 0; i < Images.all.length; i++) {
    let liElement = document.createElement('li');
    ulList.appendChild(liElement);
    liElement.textContent = `${Images.all[i].name} had ${Images.all[i].clicks} votes, and was seen ${Images.all[i].views} times.`;

  }

  btnResult.removeEventListener('click', resultClick);
}
imageSection.addEventListener('click', eventHandler);
btnResult.addEventListener('click', resultClick);
render();

////////////// Random function generate the Index of each image ///////////////////
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  let randomIndex;
  let whileBreeak;

  do {
    randomIndex = Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive

    whileBreeak = true;

    for (let i = 0; i < Images.previousIndex.length; i++) {
      if (Images.previousIndex[i] === randomIndex) {
        whileBreeak = false;
      }
    }
  } while (!whileBreeak);
  return randomIndex;
}

///////////////// show the result as a chart /////////////////////////
function resultChart() {

  let name = [];
  let views = [];
  let clicks = [];
  for (let i = 0; i < Images.all.length; i++) {
    name.push(Images.all[i].name);
    views.push(Images.all[i].views);
    clicks.push(Images.all[i].clicks);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: '# of views',
        data: views,
        backgroundColor: 'rgba(0, 0, 0)',

        borderColor: 'red',
        borderWidth: 2
      }, {
        label: '# of clicks',
        data: clicks,
        backgroundColor: 'rgba(179, 179, 179,1)',

        borderColor: 'blue',


        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


////////////// END OF CODE ////////////////////////////