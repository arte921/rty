
function sphereDistance (pos, sphere) {
    return Math.sqrt(
        (pos[0] - sphere[0]) ** 2   +
        (pos[1] - sphere[1]) ** 2   +
        (pos[2] - sphere[2]) ** 2   )
        - sphere[3]
}

function closestSphereDist (pos, scene) {
    return Math.min(...scene.map(sphere => sphereDistance(pos, sphere)))
}

function add (a, b, multiplier = 1) {
    let result = []
    for (let i=0; i < a.length; i++) result.push(a[i] + b[i] * multiplier)
    return result
}

function substract (a, b) {
    let result = []
    for (let i=0; i < a.length; i++) result.push(a[i] - b[i])
    return result
}

function multiply (a, b) {
    let result = []
    for (let i=0; i < a.length; i++) result.push(a[i] * b[i])
    return result
}

function divide (a, b) {
    let result = []
    for (let i=0; i < a.length; i++) result.push(a[i] / b[i])
    return result
}

function withLength (vec, length) {
    
}

function length (vec) {
    let sq = 0
    for (let i=0; i < vec.length; i++) sq += vec[i] ** 2
    return Math.sqrt(sq)
}

let deg = rad => rad / Math.PI * 180

let rad = deg => deg / 180 * Math.PI

// ############################# begin main part #############################

const width = 80
const height = 80

function calc (scene, camera) {
    let direction = camera[1]
    let sphere = scene[0]
    console.log(scene)
    let screensize = [width, height]
    let oglat = direction[0]
    let oglon = direction[1]

    for (let y = 0; y < height; y++) {
        let line = ""
        for (let x=0; x < width; x++) {

            let screenpos = [x, y]
            let pos = camera[0]

            let screenpart = divide(screenpos, screensize)

            let lat = oglat + (screenpart[1] - 0.5) * Math.PI
            let lon = oglon + (screenpart[0] - 0.5) * Math.PI

            let d = [
                Math.cos(lon) * Math.sin(lat),
                Math.sin(lon) * Math.sin(lat),
                Math.cos(lat)
            ]
        
            let totaldist = 0
            
            let dist = closestSphereDist(pos, scene)
            
            while (dist > 1 && totaldist < 1000) {
                pos = add(pos, d, dist)
                totaldist += dist
                dist = closestSphereDist(pos, scene)
            } 
            
            
            if (dist <= 1) {
                line += "##"
            } else {
                line += "  "
            }
        }
        console.log(line)
    }
}


let scene = [
    [10, 0, 0, 5],
    [5, 5, 0, 3]
]

// lat: north-south, rotates around x,y plane
// lon: east-west, rotates around z axis

// [[x, y, z], [lat, lon]]
let camera = [
    [0, 0, 0],
    [rad(90), 0]
]

calc(
    scene,
    camera
)


