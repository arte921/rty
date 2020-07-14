let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let width = 800
let height = 800

canvas.width = width
canvas.height = height

function calc (scene, camera) {
    let pos = camera[0]
    let direction = camera[1]
    let sphere = scene[0]
    let screensize = [width, height]
    let oglat = direction[0] //north-south, rotates around y
    let oglon = direction[1] //east-west, rotates around z

    for (let x=0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            let screenpos = [x, y]

            let screenpart = divide(screenpos, screensize)

            let lat = oglat + (screenpart[1] - 0.5) * Math.PI / 2
            let lon = oglon + (screenpart[0] - 0.5) * Math.PI

            let d = [Math.cos(lon) * Math.sin(lat), Math.sin(lon) * Math.sin(lat), Math.cos(lat)]
        
            //console.log(d)
            let totaldist = 0
            
            let dist = sphereDistance(pos, sphere)
            
            while (dist > 1 && totaldist < 1000) {
                pos = add(pos, d, dist)
                totaldist += dist
                dist = sphereDistance(pos, sphere)
                //console.log(dist)
            } 
            
            if (dist <= 1) {
                plot(x, y, "#FF0000")
            } else {
                plot(x, y, "#00FF00")
            }

        }
    }
}



let sphere = [0, 0, 0, 8]
let camera = [[0, 0, 0], [0, 0]]
calc([sphere], camera)

