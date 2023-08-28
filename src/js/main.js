const liftButton = document.querySelector('.upBotton')
const lift = document.querySelector('.lift')
const generateButton = document.querySelector('.generateLift')
const formContainer = document.querySelector('.formContainer')
const mainContainer = document.querySelector('.main')
const form = document.querySelector('.userInput')
const numberOfLifts = document.getElementById('liftNumberInput')
const numberOfFloors = document.getElementById('floorNumberInput')

generateButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('generateButton is pressed')
    formContainer.style.visibility = 'hidden'
    const newDiv = document.createElement("div");

    // Set attributes or content for the new div
    newDiv.textContent = "This is a new div added using JavaScript!";
    newDiv.style.backgroundColor = "lightblue";
    newDiv.style.padding = "10px";
    formContainer.style.height = "0px"
    formContainer.style.width = "0px"
    mainContainer.appendChild(newDiv);
    console.log("lifts", numberOfLifts.value)
    console.log("floors", numberOfFloors.value)
})

liftButton.addEventListener('click', () => {
    console.log("This button was clicked")
    lift.style.transform = 'translateY(-24em)'
    lift.style.transition = 'all 2s ease'
})



// Features To Add
// 1.) Dynamically create floors
// 2.) Lift should go that floor whose button is clicked
// 3.) Lift should wait for 2.5 seconds on a floor. Add open transition as well.