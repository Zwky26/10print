/*
Zack Wang
idea: have a hallway that is a chunk of block that is left clear. Rest is procedurally generated blurs 
other features: gets more red as time goes on. Hallway is more erratic, moves faster 
*/

const w = process.stdout.columns
let width = 30
let bounds = [width, w - width]
let c = Math.round(w/2)

//const blocks = ['▐', '░', '▒', '▓']
const blocks = ['_', '|', '-', '.']
function box () {
  let v = Math.round(Math.random() * 3)
  return blocks[v]
}

function changec(t) {
  let movement = Math.min(Math.round(w / 40), t)
  if (c <= bounds[0]) {
    c += movement
  } else if (c >= bounds[1]) {
    c -= movement
  } else {
    if (Math.random() > .5) {
      c += movement
    } else {
      c -= movement
    }
  }
}

function changewidth (counter) {
  width = Math.max(2, 30 - counter) 
}

function draw (a) {
  let speed = Math.max(50, 1000 / (Math.sqrt(a)))
  setTimeout(draw, speed, a + 1)
  let timescale = Math.round(a / 50)
  //let output = '\x1b[38;2;255;0;0m'
  let othercols = Math.max(0, 255 - a).toString()
  let output = '\x1b[38;2;255;'+ othercols + ';' + othercols + 'm'
  //let output = '\x1b[' + a.toString() + 'm'
  for (let i = 0; i < c - width; i++) { //make random blob on left side
    output += box()
  }
  //output += '\x1b[0m'
  for (let i = 0; i < 2 * width; i++) { //make space
    output += ' '
  }
  //output += '\x1b[30m'
  for (let i = c + width; i < w; i++) { //make random blob on right side
    output += box()
  }
  console.log(output)

  changec(timescale)
  changewidth(timescale)
}

draw(1)
