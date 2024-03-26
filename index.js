let getDate = new Date()
let finalDate = getDate.getHours() + ':' + getDate.getMinutes() + ' - ' + getDate.getDate() + '-' + getDate.getMonth() + '-' + getDate.getFullYear()


let setInfo = [
]
getState()

function getState() {
    let putAllSaveData = JSON.parse(localStorage.getItem("tasks"))
    if (putAllSaveData === null || putAllSaveData === "") {
        setInfo = []
    } else {
        setInfo = putAllSaveData
    }
}


let getLength = setInfo.length

function setElemants() {
    let index = 0
    setInfo.map((e) => {
        let createDiv1 = document.createElement("div")
        createDiv1.setAttribute("class", "information")
        createDiv1.setAttribute("id", `${getLength}`)
        let createDiv2 = document.createElement("div")
        createDiv2.setAttribute("class", "dateAndTitle")
        createDiv1.appendChild(createDiv2)
        let createH2 = document.createElement("h2")
        let createTextNodeForH2 = document.createTextNode(e.title)
        createH2.appendChild(createTextNodeForH2)
        createDiv2.appendChild(createH2)
        let createH3 = document.createElement("h3")
        let createTextNodeForH3 = document.createTextNode(e.date)
        createH3.appendChild(createTextNodeForH3)
        createDiv2.appendChild(createH3)
        let createDiv3 = document.createElement("div")
        createDiv3.setAttribute("class", "logos")
        createDiv1.appendChild(createDiv3)
        let createImg1 = document.createElement("img")
        createImg1.setAttribute("src", "image/update.png")
        createImg1.setAttribute("alt", "updateImage")
        createImg1.setAttribute("draggable", "false")
        createImg1.setAttribute("onclick", `updateInfo(${index})`)
        createDiv3.appendChild(createImg1)
        let createImg2 = document.createElement("img")
        createImg2.setAttribute("src", "image/remove.png")
        createImg2.setAttribute("alt", "removeImage")
        createImg2.setAttribute("draggable", "false")
        createImg2.setAttribute("onclick", `deleteTask(${index})`)
        createDiv3.appendChild(createImg2)
        let createImg3 = document.createElement("img")
        createImg3.setAttribute("src", "image/checked.png")
        createImg3.setAttribute("alt", "checkedImage")
        createImg3.setAttribute("draggable", "false")
        createImg3.setAttribute("onclick", `isDoneTask(${index})`)
        createDiv3.appendChild(createImg3)
        document.getElementById("meinEvents").appendChild(createDiv1)
        index++
    })
    for (let check = 0; check < index; check++) {
        let test = setInfo[check].isDone == true
        if (test === true) {
            document.getElementsByClassName("information")[check].style.backgroundColor = "green"
        }
    }
}

function addInfo() {
    let getValue = prompt("Please write down task.")
    if (getValue === "" || getValue === null) {
        return false
    } else {
        setInfo.push({ title: getValue, isDone: false, date: finalDate })
    }
    document.getElementById("meinEvents").innerHTML = ""
    setElemants()
    getStorage()
}

function deleteTask(index) {
    let getValue = document.querySelectorAll(".dateAndTitle h2")[index].innerHTML
    if (confirm("Are you sure that you want to delete! " + getValue) == true) {
        text = "You pressed OK!";
        setInfo.splice(index, 1)
    }
    document.getElementById("meinEvents").innerHTML = ""
    setElemants()
    getStorage()
}

function isDoneTask(index) {
    if (setInfo[index].isDone === false) {
        setInfo[index].isDone = true
        document.querySelectorAll(".information")[index].style.backgroundColor = "green"
    } else if (setInfo[index].isDone === true) {
        setInfo[index].isDone = false
        document.querySelectorAll(".information")[index].style.backgroundColor = ""
    }
    getStorage()
}

function updateInfo(index) {
    let getValueForUptade = document.querySelectorAll(".dateAndTitle h2")[index].innerHTML
    let setValue = prompt("You can now edit", getValueForUptade)
    if (setValue === "" || setValue === null) {
        getValueForUptade
    } else {
        document.querySelectorAll(".dateAndTitle h2")[index].innerHTML = setValue
        setInfo[index].title = setValue
    }
    getStorage()
}

function getStorage() {
    let converter = JSON.stringify(setInfo)
    localStorage.setItem("tasks", converter)
}

setElemants()