let mcbwidth = 800
let mcbheight = 800

const gpu = new GPU()
const calc = gpu.createKernel(function(scene, cam, direction) {
     
    let pos = [0, 0, 0]
    let sphere = [10, 0, 0, 5]
    
    let lat = direction[0] //north-south, rotates around y
    let lon = direction[1] //east-west, rotates around z
    
    let thread = [this.thread.x, this.thread.y]

    let threadpart = divide2([this.thread.x, this.thread.y], [800, 800])
    lat += (threadpart[1] - 0.5) * Math.PI / 2
    lon += (threadpart[0] - 0.5) * Math.PI

    let d = [Math.cos(lon) * Math.sin(lat), Math.sin(lon) * Math.sin(lat), Math.cos(lat)]
   

    let totaldist = 0
    
    let dist = sphereDistance(sphere)
    
    if (dist > 1 && totaldist < 1000) {
        pos = add3(pos, d, dist)
        totaldist += dist
    } else if (dist <= 1) {
        this.color(1, 0, 1, 1)
    } else {
        this.color(0, 0.5, 0.5, 1)
    }


    function sphereDistance (sphere) {
        return Math.sqrt((pos[0] - sphere[0]) ** 2 + (pos[1] - sphere[1]) ** 2 + (pos[2] - sphere[2]) ** 2) - sphere[3]
    }

    function add3 (a, b, multiplier) {
        return [a[0] + b[0] * multiplier, a[1] + b[1] * multiplier, a[2] + b[2] * multiplier]
    }
    
    function add (a, b) {
        let result = []
        for(let i=0; i < a.length; i++) result.push(a[i] + b[i])
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
    
    
    function length (vec) {
        let sq = 0
        for (let i=0; i < vec.length; i++) sq += vec[i] ** 2
        return Math.sqrt(sq)
    }

    function divide2 (a, b) {
        return [a[0] / b[0], a[1] / b[1]]
    }   

}).setOutput([800,800]).setGraphical(true)

function render(){
    document.getElementById('body').removeChild(document.getElementById('body').childNodes[0])
    let go
    let finish
    go=new Date()

    let sphere = [10, 0, 0, 5]

    calc([sphere], [0, 0, 0], [0, 0])

    const canvas = calc.canvas
    document.getElementById('body').appendChild(canvas)

    finish = new Date()
    console.log(finish-go)


    
    //console.log(divide([2, 3], [6, 7]), "d")

}

render()