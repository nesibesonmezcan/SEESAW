const seesawLine = document.getElementById('seesaw');
const objects = [];
let idCounter = 0;

seesawLine.addEventListener('click', function (event) {
  const rect = seesawLine.getBoundingClientRect();

  const clickX = event.clientX;      
  const lineLeft = rect.left; 
  const xInside = clickX - lineLeft;   

  let side;
  if (xInside < 200) {
    side = 'left';
  } else {
    side = 'right';
  }

  const pivotX = 200;
  const distance = Math.abs(xInside - pivotX);

  const weight = Math.floor(Math.random() * 10) + 1;

  const newObject = {
    id: idCounter++,
    side: side,
    weight: weight,
    distance: distance, 
    xPos: xInside   
  };

  objects.push(newObject);
  renderObjects();
  
});