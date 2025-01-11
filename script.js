const app = document.getElementById("app");
const calculator = document.createElement("div");
calculator.className = "calculator";

const output = document.createElement("div");
output.className = "output";
output.textContent = "0";
calculator.appendChild(output);

const buttons = [
  ["C", "←", ".", "×"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", "00", "="],
];

buttons.forEach((row) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "d-flex justify-content-between mb-2";

  row.forEach((text) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `btn ${text === "=" ? "btn-custom" : "btn-secondary"} flex-fill mx-1`;
    button.addEventListener("click", () => handleButtonClick(text));
    rowDiv.appendChild(button);
  });

  calculator.appendChild(rowDiv);
});

app.appendChild(calculator);

let currentInput = "";
let memory = 0;

function handleButtonClick(value) {
  if (!isNaN(value) || value === ".") {
  
    currentInput += value;
    output.textContent = currentInput;
  } else if (value === "C") {
   
    currentInput = "";
    output.textContent = "0";
  } else if (value === "←") {
    
    currentInput = currentInput.slice(0, -1);
    output.textContent = currentInput || "0";
  } else if (value === "=") {
    
    try {
      const result = eval(currentInput.replace("×", "*").replace("/", "/"));
      output.textContent = result;
      currentInput = result.toString();
    } catch {
      alert("Invalid Expression");
    }
  } else {
    
    if (currentInput && !isNaN(currentInput[currentInput.length - 1])) {
      currentInput += value;
      output.textContent = currentInput;
    }
  }
}

document.addEventListener("keydown", (event) => {
  const allowedKeys = "0123456789.";
  if (allowedKeys.includes(event.key)) {
    handleButtonClick(event.key);
  } else {
    alert("Only numbers are allowed");
  }
});
