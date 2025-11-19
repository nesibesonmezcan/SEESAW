const rainbowColors = [
  "#FF4D4D",
  "#FF8A33",
  "#FFD93D",
  "#6EEB83",
  "#3FE0D0",
  "#4DC6FF",
  "#4B6BFF",
  "#A066FF",
  "#FF66C4",
  "#FF3FAF",
];

const state = {
  objects: [],
  angle: 30,
  totalLeftPouchWeight: 0,
  totalRightPouchWeight: 0,
  randomWeight:null,
};

function saveState() {
  localStorage.setItem("seesawState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("seesawState");
  if (!saved) return;

  try {
    const loaded = JSON.parse(saved);
    Object.assign(state,loaded)
    objectPurse();
    calculate();
  } catch (e) {
    console.error("Seesaw state yüklenirken hata:", e);
  }
}

const seesawPanel = document.getElementById("seesaw-panel");
const seesawLine = document.getElementById("seesaw-line");
const resetButton = document.getElementById("reset-button");
const leftWeigth = document.getElementById("left-weight");
const rightWeigth = document.getElementById("rigth-weight");
const randomWeight = document.getElementById("random-weight");
const slopeAngle = document.getElementById("slope-angle");
const objectsLayer = document.getElementById("objects-layer");
const information = document.getElementById("information");

let lineMiddle ;
const maxAngle = 30;

loadState();

seesawPanel.addEventListener("click", (e) => {
  const rectangle = seesawPanel.getBoundingClientRect();
  lineMiddle=rectangle.width/2
  const clickLine = e.clientX - rectangle.left;
  const side = clickLine < lineMiddle ? "left" : "right";
  const absValue = Math.abs(clickLine - lineMiddle);  

  const newObject = {
    randomWeight: Math.floor(Math.random() * 10) + 1,
    side: side,
    distance: absValue,
    xPos: clickLine,
  };

  state.objects.push(newObject);

  objectPurse();
  calculate();
  saveState();
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
    logItem.textContent = `${obj.randomWeight} kg , placed on the ${obj.side} side ${obj.distance.toFixed(1)} px from the center`; 
     randomWeight.textContent = `${obj.randomWeight} kg`;
    information.prepend(logItem);
  });

  let angle = (rightTorq - leftTorq) / 10;

  state.angle = Math.max(-maxAngle, Math.min(maxAngle, angle));
  seesawLine.style.transform = `translateY(-50%) rotate(${state.angle}deg)`;
  leftWeigth.textContent = `${state.totalLeftPouchWeight} kg`;
  rightWeigth.textContent = `${state.totalRightPouchWeight} kg`;
  slopeAngle.textContent = `${state.angle.toFixed(1)}°`;
}

function objectPurse() {
  objectsLayer.innerHTML = "";
  state.objects.forEach((obj, index) => {
    const elemnt = document.createElement("div");
    elemnt.className = "objectPurses";
    elemnt.style.left = `${obj.xPos}px`;
    const size = 20 + obj.randomWeight * 4;
    elemnt.style.width = `${size}px`;
    elemnt.style.height = `${size}px`;
    elemnt.style.top = "50%";
    elemnt.style.backgroundColor = rainbowColors[index % rainbowColors.length];
    objectsLayer.appendChild(elemnt);
    elemnt.innerHTML = obj.randomWeight;
  });
}

resetButton.addEventListener("click", () => {
  state.objects.length = 0;
  objectPurse();
  calculate();
  seesawLine.style.transform = "translateY(-50%) rotate(0deg)";
  localStorage.removeItem("seesawState");
});
