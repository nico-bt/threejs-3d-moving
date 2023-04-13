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
camera.position.y = 1

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Background Texture
//***********************************************************************
const spaceTexture = new THREE.TextureLoader().load("space.jpg")
scene.background = spaceTexture

// Light
//***********************************************************************
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)

// // White directional light.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.x = -10
directionalLight.position.y = 50
directionalLight.position.z = 2
scene.add(directionalLight)

// PointLight inside Torus geometry
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-20, 20, -20)
scene.add(pointLight)

// Cubes
//***********************************************************************
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
cube.position.x = -5
cube.position.y = 1
scene.add(cube)

const cube2 = new THREE.Mesh(geometry, material)
cube2.position.x = 12
cube2.position.z = -10
scene.add(cube2)

const cube3 = new THREE.Mesh(geometry, material)
cube3.position.x = 25
cube3.position.z = -6
scene.add(cube3)

const geometryRect = new THREE.BoxGeometry(20, 2, 4)
const rectangle = new THREE.Mesh(geometryRect, material)
rectangle.position.x = -25
rectangle.position.z = -40
scene.add(rectangle)

// Torus
//***********************************************************************
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 })
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(-20, 20, -20)
scene.add(torus)

// Ball character
//***********************************************************************
const ballGeometry = new THREE.SphereGeometry(1, 32, 32)
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
const sphere = new THREE.Mesh(ballGeometry, ballMaterial)
sphere.position.set(4, 0, 1)
sphere.add(camera) //Asi lo sigue la camara
scene.add(sphere)

// Floor
//***********************************************************************
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)

const moonTexture = new THREE.TextureLoader().load("moon.jpg")
const normalTexture = new THREE.TextureLoader().load("normal.jpg")

const floorMaterial = new THREE.MeshStandardMaterial({
  // color: 0x003b2b,
  map: moonTexture,
  normalMap: normalTexture,
  side: THREE.DoubleSide,
})
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
floorMesh.rotation.x = Math.PI / 2
floorMesh.position.y = -1
scene.add(floorMesh)

// Moon
//***********************************************************************
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
)
moon.position.set(20, 14, -25)
scene.add(moon)

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
  const moveStep = 0.15
  if (isKeyPressed) {
    if (keyboardEvent.keyCode === 37) {
      sphere.position.x -= moveStep
    }
    if (keyboardEvent.keyCode === 38) {
      sphere.position.z -= moveStep
    }
    if (keyboardEvent.keyCode === 39) {
      sphere.position.x += moveStep
    }
    if (keyboardEvent.keyCode === 40) {
      sphere.position.z += moveStep
    }
    if (keyboardEvent.keyCode === 32) {
      sphere.position.y += moveStep
    }
  }
}

// Rendering the scene
//***********************************************************************
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  torus.rotation.x += 0.005
  torus.rotation.y += 0.0005
  torus.rotation.z += 0.005

  renderer.render(scene, camera)

  update()
}
animate()
