// const liftButton = document.querySelector('.upBotton')
const generateButton = document.querySelector('.generateLift')
const formContainer = document.querySelector('.formContainer')
const mainContainer = document.querySelector('.main')
const form = document.querySelector('.userInput')
const numberOfLifts = document.getElementById('liftNumberInput')
const numberOfFloors = document.getElementById('floorNumberInput')
const building = document.querySelector('.building')
const backButton = document.querySelector('.backButton')
const newDiv = document.createElement("div");

let floorsQueue = []
let liftsState = []

generateButton.addEventListener('click', (event) => {
    event.preventDefault()
    // console.log('generateButton is pressed')
    if(!numberOfFloors.value || !numberOfLifts.value || numberOfFloors.value < 0 || numberOfLifts.value < 0) {
        alert(`Please don't add empty values or negative values`)
    } else if(numberOfFloors.value > 5 || numberOfLifts.value > 5 || numberOfFloors.value < numberOfLifts.value) {
        alert(`Please adhere to the maximum limits. Number of floors cannot be higher than number of lifts`)
    }else{
        formContainer.style.visibility = 'hidden'
        formContainer.style.height = "0px"
        formContainer.style.width = "0px"
        building.style.display = 'block'
        backButton.style.display = 'none'
        mainContainer.appendChild(newDiv);
    
        renderFloorsAndLifts(numberOfFloors.value, numberOfLifts.value)
    }
    

    
})

backButton.addEventListener("click", () => {
    liftsState = []
    floorsQueue = []
    building.style.display = 'none'
    // document.getElementsByClassName('floor').remove()
    while(document.querySelector('.floor')) {
        document.querySelector('.floor').remove()

    }
    document.querySelector('.liftContainer').remove()
    backButton.style.display = 'none'
    building.innnerHTML = ''
    numberOfLifts.value = ''
    numberOfFloors.value = ''
    formContainer.style.visibility = 'visible'
    formContainer.style.height = "100vh"
    formContainer.style.width = "100vw"
    
} )

function renderFloorsAndLifts(numberOfFloors, numberOfLifts) {
    backButton.style.display = 'block'
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

        upButton.id = `Floor ${numberOfFloors - i}`
        downButton.id = `Floor ${numberOfFloors - i}`
        upButton.addEventListener("click", handleClick)
        downButton.addEventListener("click", handleClick)

    }
    const liftContainer = document.createElement("div")
    liftContainer.classList.add("liftContainer")
    building.appendChild(liftContainer)
    for(let i=1; i<=numberOfLifts; i++) {
        const lift = document.createElement("div")
        lift.classList.add("lift")
        lift.id = `Lift ${i}`
        liftContainer.appendChild(lift)
        lift.innerText = `Lift ${i}`
        lift.innerHTML = `<div class=liftOverlay id=liftOverlay${i}></div>`
    }

    initializeLiftState(numberOfLifts)
    console.log("This is the lifts state", liftsState)
     
}

function getLiftOverlay(floorNumber) {
    return document.getElementById(`liftOverlay${floorNumber}`)
}

function initializeLiftState(numberOfLifts) {
    for(let i=1; i<=numberOfLifts; i++) {
        liftsState.push({
            liftNumber: i,
            currentFloorNumber: 1,
            isOccupied: false
        })
    }
}

function getFreeLift(targetFloorNumber) {
    const freeLift = liftsState?.find(lift => lift.currentFloorNumber === targetFloorNumber && !lift.isOccupied)
    if(!!freeLift) {
        return freeLift
    }else {
        return liftsState?.find(lift => !lift?.isOccupied)
    }
    
}

function getLiftFromLiftNumber(liftNumber) {
    return document.getElementById(`Lift ${liftNumber}`)
}

function handleLiftClick(event) {
    console.log("Called",event.target)
    
}
console.log("This is the floors queue", floorsQueue)

async function handleClick(event) {
    //check which floor's button is clicked
    const buttonPressed = event.target
    const floorNumber = buttonPressed?.id?.charAt(buttonPressed?.id?.length - 1)
    // enqueue the floor number
    floorsQueue.push(floorNumber)

    let availableLifts = liftsState?.filter(lift => !lift.isOccupied)

    if(availableLifts.length === 0) {
        return
    }

    console.log("This is the floorsQueue", floorsQueue)

   await handleLiftMovement()
    
}

async function handleLiftMovement() {
    if(floorsQueue && floorsQueue.length > 0) {
        const targetFloor = floorsQueue.shift()
        console.log("Shift Called")

        // get Empty Lift Number. TODO: Modify this to get the nearest lift
        const freeLift = getFreeLift(targetFloor)

        if(freeLift) {
            // get Empty Lift Element
        const liftElement = getLiftFromLiftNumber(freeLift?.liftNumber)

        //calculate the distance between the free lift's current floor and the targetFloor
        const distance = getTravelDistance(freeLift, targetFloor)
        const door = getLiftOverlay(freeLift?.liftNumber)
        
        if(distance === 0) {
            //update lift state to be busy
            updateLiftState(freeLift, targetFloor, isOccupied = true)
            await handleDoorOpening(door, freeLift, targetFloor)
        }else{
            //update lift state to be busy
        updateLiftState(freeLift, targetFloor, isOccupied = true)
        moveLift(liftElement, distance, targetFloor)
        await setWaitingTime(2 * distance)
        await handleDoorOpening(door, freeLift, targetFloor)
        }
        
    }
        // floorsQueue = queue
    }
    
}

async function handleDoorOpening(door, freeLift, targetFloor) {
    openDoor(door)
    await setWaitingTime(2.5)
    closeDoor(door)
    await setWaitingTime(2.5)
    updateLiftState(freeLift, targetFloor, isOccupied = false)
    await handleLiftMovement()
}

function openDoor(door) {
    // door.classList.remove("closeLift")
    door.classList.add("openLift")
    door.classList.remove("closeLift")
}

function setWaitingTime(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

function closeDoor(door) {
    door.classList.add("closeLift")
    door.classList.remove("openLift")
}

function updateLiftState(freeLift, targetFloor, isOccupied) {
    freeLift.currentFloorNumber = targetFloor
    freeLift.isOccupied = isOccupied
}


function getTravelDistance(freeLift, floor) {
    const currentFloorOfTheFreeLift = freeLift?.currentFloorNumber
    const absoluteDistance = Math.abs( floor - currentFloorOfTheFreeLift )
    return absoluteDistance
}

function moveLift(lift, distance, targetFloor) {
    // const distance = getTravelDistance(lift, floorNumber)
    // console.log("This is the distance to be travelled", distance)
    lift.style.transform = `translateY(-${(targetFloor - 1) * 130}px)`
    lift.style.transition = `all ${distance * 2}s ease`

}


// liftButton.addEventListener('click', () => {
//     console.log("This button was clicked")
//     lift.style.transform = 'translateY(-24em)'
//     lift.style.transition = 'all 2s ease'
// })



// Features To Add
// 1.) Dynamically create floors
// 2.) Lift should go that floor whose button is clicked
// 3.) Lift should wait for 2.5 seconds on a floor. Add open transition as well.