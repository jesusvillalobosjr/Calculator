function determineOperation(e){
    if(result.textContent.length >= 14 && !resultGiven)
        return;

    resetResultFontSize();
    let ch = e.target.textContent;

    if(decimalClicked && ch === ".")
        return;

    if(isOperation(ch)){
        resultGiven = false;
        return;
    }
    else
        clearAfterResultGiven();
        result.append(ch);
}

function getResult(){
    var number = result.textContent;
    if(validOperation()){
        let currentOperator = operator.textContent;
        let answer;
        switch(currentOperator){
            case "+":
                answer = Math.round((parseFloat(firstNumber.textContent) + parseFloat(result.textContent)) * 100) / 100;
                result.textContent = `${answer}`;
                if(overFourteenResultLength(result)) result.style.fontSize = "30px";
                break;
            case "-":
                answer = Math.round((parseFloat(firstNumber.textContent) - parseFloat(result.textContent)) * 100) / 100;
                result.textContent = `${answer}`;
                if(overFourteenResultLength(result)) result.style.fontSize = "30px";
                break;
            case "X":
                answer = Math.round((parseFloat(firstNumber.textContent) * parseFloat(result.textContent)) * 100) / 100;
                result.textContent = `${answer}`;
                if(overFourteenResultLength(result)) result.style.fontSize = "30px";
                break;
            case "%":
                answer = Math.round((parseFloat(firstNumber.textContent) / parseFloat(result.textContent)) * 100) / 100;
                result.textContent = `${answer}`;
                if(overFourteenResultLength(result)) result.style.fontSize = "30px";
                break;
        }

        resultGiven = true;
        decimalClicked = false;
        setCurrentOperation(number);
    }
}

function clear(){
    firstNumber.textContent = "";
    operator.textContent = "";
    secondNumber.textContent = "";
    result.textContent = "";
    resultGiven = false;
}

function clearAfterResultGiven(){
    if(resultGiven){
        clear();
        resultGiven = false;
    }
}

function resetResultFontSize(){
    result.style.fontSize = "3rem";
}

function overFourteenResultLength(result){
    return result.textContent.length >= 14;
}

function setCurrentOperation(number){
    secondNumber.textContent = number;
}

function clearCurrentOperation(){
    firstNumber.textContent = "";
    operator.textContent = "";
    secondNumber.textContent = "";
}

function operatorClicked(event){
    operator.textContent = "";
    secondNumber.textContent = "";

    if(!operatorInPlace() && hasNumber()){
        firstNumber.textContent = result.textContent;
        operator.textContent = event.target.textContent;
        result.textContent = "";
    }

    decimalClicked = false;
}

function isOperation(content){
    return content === "+" || content === "-" || content === "X" || content === "%";
}

function validOperation(){
    return firstNumber.textContent !== "" && operator.textContent !== "" && result.textContent !== "";
}

function hasNumber(){
    return result.textContent !== "";
}

function isEqualSign(content){
    return content === "=";
}

function operatorInPlace(){
    return operator.textContent !== "";
}

function deleteNumbers(){
    if(result.textContent !== ""){
        var text = result.textContent.split("");
        text.pop();
        result.textContent = text.join("");
    }
}

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const currentOperation = document.querySelector(".current-operation");
const operationButtons = document.querySelectorAll(".operation");
const firstNumber = document.querySelector(".first");
const operator = document.querySelector(".operator");
const secondNumber = document.querySelector(".second");
const result = document.querySelector(".result");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".period");

let resultGiven = false;
let decimalClicked = false;

plus.addEventListener("click",operatorClicked);
minus.addEventListener("click",operatorClicked);
divide.addEventListener("click",operatorClicked);
multiply.addEventListener("click",operatorClicked);
clearButton.addEventListener("click",clear);
equals.addEventListener("click",getResult);
deleteButton.addEventListener("click",deleteNumbers);
operationButtons.forEach(operation => operation.addEventListener("click",determineOperation));
decimal.addEventListener("click",() => decimalClicked = true);