const PatchBay = require('./src/pb-live.js')
const HydraSynth = require('hydra-synth')
const Editor = require('./src/editor.js')
const Canvas = require('./src/canvas.js')
const Audio = require('./src/audio.js')
const loop = require('raf-loop')

function init () {
  var audio = new Audio()
  window.a = audio
  // console.log("loaded", document.getElementById('code'))
  var canvas = Canvas(document.getElementById('hydra-canvas'))
  canvas.size()
  var pb = new PatchBay()
  var hydra = new HydraSynth({pb: pb, canvas: canvas.element, autoLoop: false})
  var editor = new Editor()
  editor.eval()
  var localStream = hydra.canvas.captureStream()
  pb.init(localStream, {
    server: window.location.origin,
    room: 'iclc'
  })

  var engine = loop(function(dt) {
    // delta time in milliseconds
    hydra.tick(dt)
    audio.tick()
}).start()
}

window.onload = init
