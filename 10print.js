/*
Zack Wang

  one possible implemenation of the 10print.org algorithm written in JavaScript

idea: have a hallway that is a chunk of block that is left clear. Rest is procedurally generated blurs 
*/

const w = process.stdout.columns

function draw () {
  setTimeout(draw, 1000)
  let output = ''
  for (let i = 0; i < w; i++) {
    if (Math.random() > 0.5) {
      output += '\\'
    } else {
      output += '/'
    }
  }
  console.log(output)
}

draw()
