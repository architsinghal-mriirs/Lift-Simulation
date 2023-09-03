const liftButton = document.querySelector('.upBotton')
const generateButton = document.querySelector('.generateLift')
const formContainer = document.querySelector('.formContainer')
const mainContainer = document.querySelector('.main')
const form = document.querySelector('.userInput')
const numberOfLifts = document.getElementById('liftNumberInput')
const numberOfFloors = document.getElementById('floorNumberInput')
const building = document.querySelector('.building')

generateButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('generateButton is pressed')
    formContainer.style.visibility = 'hidden'
    const newDiv = document.createElement("div");

    // // Set attributes or content for the new div
    // newDiv.textContent = "This is a new div added using JavaScript!";
    // newDiv.style.backgroundColor = "lightblue";
    // newDiv.style.padding = "10px";
    formContainer.style.height = "0px"
    formContainer.style.width = "0px"
    mainContainer.appendChild(newDiv);
    console.log("lifts", numberOfLifts.value)
    console.log("floors", numberOfFloors.value)

    renderFloorsAndLifts(numberOfFloors.value, numberOfLifts.value)
    
})

function renderFloorsAndLifts(numberOfFloors, numberOfLifts) {
    for(let i=0; i<numberOfFloors; i++) {
        const floor = document.createElement("div")
        const liftRoom = document.createElement("div")
        const liftButtons = document.createElement("div")
        const upButton = document.createElement("button")
        const downButton = document.createElement("button")
        const floorName = document.createElement("p")

        floor.classList.add("floor")
        liftRoom.classList.add("liftRoom")
        liftButtons.classList.add("liftButtons")
        upButton.classList.add("upBotton")
        downButton.classList.add("upBotton")
        floorName.classList.add("floorNames")

        building.appendChild(floor)
        floor.appendChild(liftRoom)
        liftRoom.appendChild(liftButtons)
        liftButtons.appendChild(upButton)
        liftButtons.appendChild(downButton)
        liftRoom.appendChild(floorName)

        upButton.textContent = "Up"
        downButton.textContent = "Down"
        floorName.textContent = `Floor ${numberOfFloors - i}`

    }
    const liftContainer = document.createElement("div")
    liftContainer.classList.add("liftContainer")
    building.appendChild(liftContainer)
    for(let i=0; i<numberOfLifts; i++) {
        const lift = document.createElement("div")
        lift.classList.add("lift")
        liftContainer.appendChild(lift)
    }
     
}

liftButton.addEventListener('click', () => {
    console.log("This button was clicked")
    lift.style.transform = 'translateY(-24em)'
    lift.style.transition = 'all 2s ease'
})



// Features To Add
// 1.) Dynamically create floors
// 2.) Lift should go that floor whose button is clicked
// 3.) Lift should wait for 2.5 seconds on a floor. Add open transition as well.