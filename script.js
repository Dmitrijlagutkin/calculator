let display = document.querySelector(".mainHeadText")
let elem = document.querySelector(".mainBody")

let mainObj = {
	numFirst: "",
	numSecond: "",
	mathOperator: "",
	result: ""
}

function defoultObj(targetObject) {
	for (let key in targetObject) {
		targetObject[key] = ''
	}
}

function getResult(firstNum, secondNum, targetOperator) {
	let result = null
	if (targetOperator === "+") {
		result = firstNum + secondNum
	} else if (targetOperator === "-") {
		result = firstNum - secondNum
	} else if (targetOperator === "x") {
		result = firstNum * secondNum
	} else if (targetOperator === "/") {
		result = firstNum / secondNum
	}
	return result
}

function getMathOperatorKey(eventkeyCode) {
	if (eventkeyCode === 107) {
		mainObj.mathOperator = "+"
	} else if (eventkeyCode === 106) {
		mainObj.mathOperator = "x"
	} else if (eventkeyCode === 109) {
		mainObj.mathOperator = "-"
	} else if (eventkeyCode === 111) {
		mainObj.mathOperator = "/"
	}
	return mainObj.mathOperator
}

function getNumberKey(eventkeyCode) {
	let tempNumber = ''
	if (eventkeyCode === 49) {
		tempNumber = "1"
	}
	if (eventkeyCode === 50) {
		tempNumber = "2"
	}
	if (eventkeyCode === 51) {
		tempNumber = "3"
	}
	if (eventkeyCode === 52) {
		tempNumber = "4"
	}
	if (eventkeyCode === 53) {
		tempNumber = "5"
	}
	if (eventkeyCode === 54) {
		tempNumber = "6"
	}
	if (eventkeyCode === 55) {
		tempNumber = "7"
	}
	if (eventkeyCode === 56) {
		tempNumber = "8"
	}
	if (eventkeyCode === 57) {
		tempNumber = "9"
	}
	if (eventkeyCode === 48) {
		tempNumber = "0"
	}
	return tempNumber
}

// mous

elem.addEventListener("click", event => {
	display.innerText += event.target.innerText
	let tempVal = null
	let resValue = null
	tempVal = event.target.innerText
	if (tempVal !== "С") {
		if (mainObj.numFirst === "" && !isNaN(parseInt(tempVal))) {
			mainObj.numFirst = tempVal
		} else if (mainObj.numFirst !== "" && !isNaN(parseInt(tempVal))) {
			mainObj.numSecond = tempVal
		} else if (mainObj.mathOperator !== "" && tempVal !== "=") {
			mainObj.result = tempVal
			resValue = getResult(+mainObj.numFirst, +mainObj.numSecond, mainObj.mathOperator)
			display.innerText = resValue
			mainObj.numFirst = resValue
			mainObj.mathOperator = tempVal
			display.innerText += mainObj.mathOperator
			mainObj.numSecond = ""
		} else if (tempVal !== "=") {
			mainObj.mathOperator = tempVal
		} else if (tempVal = "=") {
			mainObj.result = tempVal
			resValue = getResult(+mainObj.numFirst, +mainObj.numSecond, mainObj.mathOperator)
			display.innerText = resValue
			mainObj.numSecond = ""
			mainObj.numFirst = resValue
		}
	} else {
		display.innerText = ""
		defoultObj(mainObj)
	}
})

// keyboard

document.addEventListener("keydown", event => {
	let tempValKey = event.keyCode
	let tempNum = getNumberKey(tempValKey)
	let res = ''
	let tempMath = ''
	if (tempValKey === 8) {
		display.innerText = ''
		defoultObj(mainObj)
	} else {
		if (mainObj.numFirst === '') {
			mainObj.numFirst += tempNum
			display.innerText += mainObj.numFirst
		} else if (mainObj.numSecond !== '' && tempValKey !== 187) {
			res = getResult(+mainObj.numFirst, +mainObj.numSecond, mainObj.mathOperator)
			getMathOperatorKey(tempValKey)
			mainObj.numSecond = ''
			mainObj.result = res
			display.innerText = res
			mainObj.numFirst = res
			display.innerText += mainObj.mathOperator
		} else if (mainObj.mathOperator === '') {
			getMathOperatorKey(tempValKey)
			display.innerText += mainObj.mathOperator
		} else if (tempValKey !== 187 && mainObj.numFirst !== '') {
			mainObj.numSecond = tempNum
			display.innerText += mainObj.numSecond
		} else if (tempValKey === 187) {
			res = getResult(+mainObj.numFirst, +mainObj.numSecond, mainObj.mathOperator)
			mainObj.result = res
			display.innerText = res
		}
	}
})