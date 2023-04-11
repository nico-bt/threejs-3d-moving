import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

// const controls = new OrbitControls(camera, renderer.domElement)
// const loader = new GLTFLoader()

// Creating the scene, camera and renderer
//***********************************************************************
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 12

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Light
//***********************************************************************
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(directionalLight)

// Cube
//***********************************************************************
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Ball character
//***********************************************************************
const ballGeometry = new THREE.SphereGeometry()
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xfffff0 })
const sphere = new THREE.Mesh(ballGeometry, ballMaterial)
sphere.position.set(4, 0, 1)
scene.add(sphere)

// Floor
//***********************************************************************
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x228b22,
  side: THREE.DoubleSide,
})
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
floorMesh.rotation.x = Math.PI / 2
floorMesh.position.y = -5
scene.add(floorMesh)

// Moving the character
// Left: 37, Up: 38, Right: 39, Down: 40, Space: 32
//***********************************************************************
let keyboardEvent
let isKeyPressed = false

window.addEventListener("keydown", onKeyDown, false)
window.addEventListener("keyup", onKeyUp, false)

function onKeyDown(event) {
  keyboardEvent = event
  isKeyPressed = true
}

function onKeyUp(event) {
  keyboardEvent = event
  isKeyPressed = false
}

// En vez de usar eventlistener suelto, al meter update() dentro del animate(), hace la animación más fluida y sin delay al keyPress
function update() {
  if (isKeyPressed) {
    if (keyboardEvent.keyCode === 37) {
      sphere.position.x -= 0.1
    }
    if (keyboardEvent.keyCode === 38) {
      sphere.position.z -= 0.1
    }
    if (keyboardEvent.keyCode === 39) {
      sphere.position.x += 0.1
    }
    if (keyboardEvent.keyCode === 40) {
      sphere.position.z += 0.1
    }
    if (keyboardEvent.keyCode === 32) {
      sphere.position.y += 0.1
    }
  }
}

// Rendering the scene
//***********************************************************************
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)

  update()
}
animate()
