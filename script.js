const inputSlider = document.getElementById("lengthSlider");
const lengthDisplay = document.getElementById("passwordLength");
const passDisplay = document.querySelector("[data-passwordDisplay]");
let copyMsg = document.querySelector('[data-copyMsg]')
const copyBtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-strengthIndicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox= document.querySelectorAll("input[type=checkbox]");
// Gets all the input tag elements whose type is checkbox 



let pass="";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
initialPass();
// Set strength colour to grey
setIndicator("#ccc");

// Password displayed when the page is loaded should be empty
function initialPass(){
    pass="";
    passDisplay.value = "";
}


// Shows the password Length in the UI
function handleSlider(){
    
    inputSlider.value = passwordLength;  //To set the slider to a particular value or position
    lengthDisplay.innerText = passwordLength;
    let min = inputSlider.min;
    let max = inputSlider.max;

    // The background-size CSS property sets the size of the element's background image. 
    inputSlider.style.backgroundSize = ( (passwordLength -min)*100/(max-min))+"% 100%";

    // 100% height and x% width


}   



function setIndicator(color){
    indicator.style.backgroundColor = color;
    // set the shadow of the colour]
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//While Math.random() generates a double value between 0.0 and 1.0, you might want to generate random numbers within a specific range. You can achieve this by multiplying the output of Math.random() by the size of the range, then adding the start value of the range.
// This metjod generates a random number between the given range
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

// Generates a random number
function getRndNumber(){
    return getRndInteger(0,9);
}

// Generates a random lower case character
function getRndLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
    // The String.fromCharCode(value) generates a character from the given Ascii value 'value'
    // Ascii value of a-97
    // Ascii value of z-123
}

// Generates a random upper case character
function getRndUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
    // The String.fromCharCode(value) generates a  character from the given Ascii value 'value'
    // Ascii value of A-65
    // Ascii value of Z-91
}

// Generates a random symbol 
function generateSymbol(){
    const symbols="~!@#$%^&*_+-";
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

// Calculates the strength of the password
function calcStrength(){
    let isUpper=false;
    let isLower=false;
    let isNumber=false;
    let isSymbol=false;

    if(uppercaseCheck.Checked){
        isUpper = true;
    }
    if(lowercaseCheck.Checked){
        isLower = true;
    }
    if(numbersCheck.Checked){
        isNumber = true;
    }
    if(symbolsCheck.Checked){
        isSymbol = true;
    }
    // The .Checked method returns true if the checkbox is checked otherwise it returns false if it is not checked

    // High strength
    if(passwordLength>=8){
        setIndicator("#7CFC00");
    }
    // Medium strength
    else if( passwordLength>=6){
        setIndicator("#FFFF00");
    }
    // Low strength
    else{
        setIndicator("#FF0000");
    }
}

// Copies the password 
async function copyPass(){

    try{
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Not copied";
    }
    // To make copied text visible
    copyMsg.classList.add("active");

    // Removes the copied text after two seconds
    setTimeout( function(){
        copyMsg.classList.remove("active");
    },2000);

    

}
// The navigator.clipboard.writeText("Text") method is used to copy the gievn text to the clipboard.The method returns a promise.If the text is copied to the clipboard then the promise is resolved.If it fails to copy to the clipboard then the promise is rejected.By writing await keyword befor navigaor.clipboard.writeText("Text"),we will ensure that the password is copied to the clipborad before any further actions are taken.A clipboard is a temporary storage area for data

// Changes the value of the passwordlength variable when the slider is moved left or right
inputSlider.addEventListener('input',function(e){

    passwordLength=e.target.value;
    handleSlider();
});

// When the value of an element changes then that event is known is as the "input" event

copyBtn.addEventListener('click',function(e){

    if(passwordLength>0){
        copyPass();   
    }
});

function handlecheckbox(){

    checkCount = 0;

    //The forEach() method calls a function for each element in an array.
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    
}

//Whenever the value of a checkbox changes the handlecheckbox() method is called which starts counting how many checkboxes are ticked
allCheckBox.forEach( function(checkbox){
    checkbox.addEventListener('change',handlecheckbox());
});

// Shuffles the given password
function shufflePass(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //Generates a random j index,between 0 and i+1 where 0 is inclusive and i+1 is exclusive and j will be an integer
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generateBtn.addEventListener('click',function(){

    // No check boxes are checked
    if(checkCount==0){
        return;
    }

    // If the length of the password is less then the number of checbox ticked we generate a password equal to the number of checkboxes ticked
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // Generating new password

    // The old password must be removed
    pass = "";

    let funcarr = [];

    if(uppercaseCheck.checked){
        funcarr.push(getRndUpperCase);
    }

    if(lowercaseCheck.checked){
        funcarr.push(getRndLowerCase);
    }

    if(numbersCheck.checked){
        funcarr.push(getRndNumber);
    }

    if(symbolsCheck.checked){
        funcarr.push(generateSymbol);
    }

    
    // Compulsory addition.Adding those characters which are checked 
    for(let i=0;i<funcarr.length;i++){
        pass += funcarr[i]();
    }

    console.log("Necessary addition");
    

    // Remaining addition.Adding the remaining characters according to the checked checkboxes to meet the password length
    for(let i=0;i<passwordLength-funcarr.length;i++){
        let rndIndx = getRndInteger(0,funcarr.length);
        pass += funcarr[rndIndx]();
    }

    console.log("Remaining addition");


    pass = shufflePass(Array.from(pass));

    console.log("Password shuffled");
    
    passDisplay.value = pass;

    console.log("Added to the UI")

    calcStrength();


});