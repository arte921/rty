let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

const width = 80
const height = 80

canvas.width = width
canvas.height = height

function calc (scene, camera) {
    
    let direction = camera[1]
    let sphere = scene[0]
    console.log(scene)
    let screensize = [width, height]
    let oglat = direction[0]
    let oglon = direction[1]

    for (let x=0; x < width; x++) {
        for (let y = 0; y < height; y++) {

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
                plot(x, y, "#FF0000")
                
            } else {
                plot(x, y, "#00FF00")
            }

        }
    }
}



let scene = [
    [10, 0, 0, 3],
    [5, 10, 0, 3]
]

// lat: north-south, rotates around x,y plane
// lon: east-west, rotates around z axis

// [[x, y, z], [lat, lon]]
let camera = [
    [0, 0, 0],
    [Math.PI / 2, 0]
]

function move () {
    calc(scene, camera)

    camera = [
        add(camera[0], [7.5, 5, 0], 1 / 60),
        add(camera[1], [0, 1], rad(100) / 60)
    ]

    window.requestAnimationFrame(move)
}

window.requestAnimationFrame(move)