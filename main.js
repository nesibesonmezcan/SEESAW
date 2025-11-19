const state = {
  objects: [],
  angle: 30,
  totalLeftPouchWeight: 0,
  totalRightPouchWeight: 0,
  randomWeight: Math.floor(Math.random() * 10) + 1,
};

const seesawPanel = document.getElementById("seesaw-panel");
const seesawLine = document.getElementById("seesaw-line");
const resetButton = document.getElementById("reset-button");
const leftWeigth = document.getElementById("left-weight");
const rightWeigth = document.getElementById("rigth-weight");
const randomWeigth = document.getElementById("random-weight");
const slopeAngle = document.getElementById("slope-angle");
const objectsLayer = document.getElementById("objects-layer");
const information = document.getElementById("information");

const lineMiddle = 200;
const maxAngle = 30;

seesawPanel.addEventListener("click", (e) => {
  const rectangle = seesawPanel.getBoundingClientRect();
  const clickLine = e.clientX - rectangle.left;
  const side = clickLine < lineMiddle ? "left" : "right";
  const absValue = Math.abs(clickLine - lineMiddle);

  const newObject = {
    randomWeight: state.randomWeight,
    side: side,
    distance: absValue,
    xPos: clickLine,
  };

  state.objects.push(newObject);
  state.randomWeight = Math.floor(Math.random() * 10) + 1;
  objectPurse();
  calculate();
});

function calculate() {
  let leftTorq = 0;
  let rightTorq = 0;
  state.totalLeftPouchWeight = 0;
  state.totalRightPouchWeight = 0;
  information.innerHTML = "";

  state.objects.forEach((obj, index) => {
    const torq = obj.randomWeight * obj.distance;
    if (obj.side === "left") {
      leftTorq += torq;
      state.totalLeftPouchWeight += obj.randomWeight;
    } else {
      rightTorq += torq;
      state.totalRightPouchWeight += obj.randomWeight;
    }
    const logItem = document.createElement("p");
    logItem.className = "info";
    logItem.textContent = `${obj.randomWeight} ropped on ${obj.side} from center`;
    information.prepend(logItem);
  });

  let angle = (rightTorq - leftTorq) / 10;

  state.angle = Math.max(-maxAngle, Math.min(maxAngle, angle));

  seesawLine.style.transform = `translateY(-50%) rotate(${state.angle}deg)`;
  leftWeigth.textContent = `${state.totalLeftPouchWeight.toFixed(1)} kg`;
  rightWeigth.textContent = `${state.totalRightPouchWeight.toFixed(1)} kg`;
  randomWeigth.textContent = `${state.randomWeight} kg`;
  slopeAngle.textContent = `${state.angle.toFixed(1)}°`;
}

function objectPurse() {
  objectsLayer.innerHTML = "";
  state.objects.forEach((obj) => {
    const elemnt = document.createElement("div");
    elemnt.className = "objectPurses";
    elemnt.style.left = `${obj.xPos}px`;
    elemnt.style.top = "50%";
    objectsLayer.appendChild(elemnt);  
      elemnt.innerHTML=state.randomWeight

  });
}

resetButton.addEventListener("click", () => {
  state.objects.length = 0;
  objectPurse();
  calculate();
  seesawLine.style.transform = "translateY(-50%) rotate(0deg)";
});
