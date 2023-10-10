function determineOperation(e){
    let ch = e.target.textContent;

    if(ch !== "=")
        clearAfterResultGiven();

    if(!isOperation(ch) && !isEqualSign(ch))
        result.append(ch);
}

function getResult(){
    if(validOperation()){
        var currentOperator = operator.textContent;
        switch(currentOperator){
            case "+":
                result.textContent = `${parseFloat(firstNumber.textContent) + parseFloat(result.textContent)}`;
                break;
            case "-":
                result.textContent = `${parseFloat(firstNumber.textContent) - parseFloat(result.textContent)}`;
                break;
            case "X":
                result.textContent = `${parseFloat(firstNumber.textContent) * parseFloat(result.textContent)}`;
                break;
            case "%":
                result.textContent = `${parseFloat(firstNumber.textContent) / parseFloat(result.textContent)}`;
                break;
        }

        resultGiven = true;
        setCurrentOperation();
    }
}

function clear(){
    firstNumber.textContent = "";
    operator.textContent = "";
    secondNumber.textContent = "";
    result.textContent = "";
}

function clearAfterResultGiven(){
    if(resultGiven){
        result.textContent = "";
        resultGiven = false;
    }
}

function setCurrentOperation(){
    let currentOperator = operator.textContent;

    switch(currentOperator){
        case "+":
            secondNumber.textContent = `${result.textContent - firstNumber.textContent}`;
            break;
        case "-":
            secondNumber.textContent = `${firstNumber.textContent - result.textContent}`;
            break;
        case "X":
            secondNumber.textContent = `${result.textContent / firstNumber.textContent}`;
            break;
        case "%":
            secondNumber.textContent = `${firstNumber.textContent / result.textContent}`;
            break;
    }
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
let resultGiven = false;

plus.addEventListener("click",operatorClicked);
minus.addEventListener("click",operatorClicked);
divide.addEventListener("click",operatorClicked);
multiply.addEventListener("click",operatorClicked);
clearButton.addEventListener("click",clear);
equals.addEventListener("click",getResult);
deleteButton.addEventListener("click",() => console.log("delete"));
operationButtons.forEach(operation => operation.addEventListener("click",determineOperation))