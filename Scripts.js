class Calculator{
    constructor(previousResultTextElement,currentResultTextElement){
        this.previousResultTextElement = previousResultTextElement
        this.currentResultTextElement = currentResultTextElement
        this.clear();
    }

    clear(){
      this.previousResultText = "";
      this.currentResultText = "";
      this.currentOperation = undefined;
    }

    delete(){
        if(this.currentResultText.length > 0)
        this.currentResultText = this.currentResultText.slice(0, -1);
    }

    chooseOperand(operation) {
       
       if(this.currentResultText !== ""){
        if(this.previousResultText !== ""){
          this.compute();
        }   
        this.previousResultText = this.currentResultText;
       }

        this.currentResultText = "";
        this.currentOperation = operation

    }
    

    appendNumber(number){
        if(number === "."){
        if(this.currentResultText.includes('.'))
        return
        else if(this.currentResultText === ""){
            this.currentResultText = "0"
        }
    }
        
        this.currentResultText = this.currentResultText + number
    }

    compute(){
        let result;
        const prev = parseFloat(this.previousResultText);
        const current = parseFloat(this.currentResultText);
        if(isNaN(prev) || isNaN(current)) return

        switch(this.currentOperation){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;   
                break;
            case '/':
                result = prev / current;  
                break;     
            default:
                return      
        }
        this.currentResultText = result;
        this.currentOperation = undefined;
        this.previousResultText = ""  
        
    }
    getDisplayNumber(number){
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      console.log("int: " + integerDigits);
      console.log("frac:" + decimalDigits);
      console.log("**********")
        
      let integerDisplay;
      if(isNaN(integerDigits)){
        integerDisplay = "";
      }else{
        integerDisplay = integerDigits.toLocaleString("en",{ maximumFractionDigits : 0})
      }

      if(decimalDigits != null){
        return integerDisplay + "." + decimalDigits;
      }
      else{
        return integerDisplay;
      }
    }

     updateDisplay(){
     this.currentResultTextElement.innerText = this.getDisplayNumber(this.currentResultText);
     this.previousResultTextElement.innerText = this.getDisplayNumber(this.previousResultText) + " " + (this.currentOperation !== undefined ? this.currentOperation : "");
    }

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('#equal')
const allClearButton = document.querySelector("#AC")
const deleteButton = document.getElementById("del")
const previousResultTextElement = document.getElementById("previousResult")
const currentResultTextElement = document.getElementById("currentResult")


const calculator = new Calculator(previousResultTextElement,currentResultTextElement)

numberButtons.forEach(btn => btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
}))

operationButtons.forEach(btn => btn.addEventListener("click", () => {
    calculator.chooseOperand(btn.innerText)
    calculator.updateDisplay()
}))

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay()
})

equalButton.addEventListener("click",() => {    
    calculator.compute();
    calculator.updateDisplay();
    calculator.currentResultText = "";
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay()
})






