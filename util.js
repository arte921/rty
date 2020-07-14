function sphereDistance (pos, sphere) {
    return Math.sqrt((pos[0] - sphere[0]) ** 2 + (pos[1] - sphere[1]) ** 2 + (pos[2] - sphere[2]) ** 2) - sphere[3]
}

function add (a, b, multiplier = 1) {
    let result = []
    for(let i=0; i < a.length; i++) result.push(a[i] + b[i] * multiplier)
    return result
}

function substract (a, b) {
    let result = []
    for(let i=0; i < a.length; i++) result.push(a[i] - b[i])
    return result
}

function multiply (a, b) {
    let result = []
    for(let i=0; i < a.length; i++) result.push(a[i] * b[i])
    return result
}

function divide (a, b) {
    let result = []
    for(let i=0; i < a.length; i++) result.push(a[i] / b[i])
    return result
}

function withLength (vec, length) {
    
}

function length (vec) {
    let sq = 0
    for (let i=0; i < vec.length; i++) sq += vec[i] ** 2
    return Math.sqrt(sq)
}

let degrees = rad => rad / Math.PI * 180

function plot (x, y, color = "#000000") {
    // console.log(x, y, color)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
}