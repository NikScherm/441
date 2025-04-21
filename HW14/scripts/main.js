var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cube, cube2;
var modelObject;
// create the first box
function createBox() {
  // create a box
  var geometry = new THREE.IcosahedronGeometry();
  //added light to see each plane.
  var material = new THREE.MeshStandardMaterial({
    color: 0x28a99e,
    roughness: 0.4,
    metalness: 0.2
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(50, 0, 0);
  scene.add(cube);
  cube.scale.x = 15; // 
  cube.scale.y = 15; // SCALE
  cube.scale.z = 15; // SCALE


  cube2 = new THREE.Mesh(geometry, material.clone());
  cube2.material.color.setHex(0xa83232); // different color if you want
  cube2.position.set(-50, 0, 0);
  cube2.scale.set(15, 15, 15);
  scene.add(cube2);
  // ///adding face numbers maybe ?
  // addFaceNumbers(cube);
  // addFaceNumbers(cube2);

  animate();
}
//==================================================================

// //helper function to add the numbers on the icosahedrons. (dice)
// function addFaceNumbers(mesh) {
//   const geom = mesh.geometry;
//   const posAttr = geom.getAttribute('position');
//   const faceCount = posAttr.count / 3;

//   for (let i = 0; i < faceCount; i++) {
//     const vA = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3);
//     const vB = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3 + 1);
//     const vC = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3 + 2);

//     const center = new THREE.Vector3().addVectors(vA, vB).add(vC).divideScalar(3);
//     center.applyMatrix4(mesh.matrixWorld); // position relative to scene

//     const label = createTextSprite(i + 1); // face number
//     label.position.copy(center);
//     scene.add(label);
//   }
// }
// function createTextSprite(text) {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   canvas.width = 256;
//   canvas.height = 256;
//   context.fillStyle = 'white';
//   context.font = 'bold 100px Arial';
//   context.textAlign = 'center';
//   context.textBaseline = 'middle';
//   context.fillText(text, 128, 128);

//   const texture = new THREE.CanvasTexture(canvas);
//   const material = new THREE.SpriteMaterial({ map: texture });
//   const sprite = new THREE.Sprite(material);
//   sprite.scale.set(5, 5, 1); // adjust size as needed
//   return sprite;
// }
//===========================================================================


// animate the first box
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  if (cube2) {
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
  }
  renderer.render(scene, camera);

}



/**
 * Generate a scene object with a background color
 **/

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;


}

/**
 * Generate the camera to be used in the scene. Camera args:
 *   [0] field of view: identifies the portion of the scene
 *     visible at any time (in degrees)
 *   [1] aspect ratio: identifies the aspect ratio of the
 *     scene in width/height
 *   [2] near clipping plane: objects closer than the near
 *     clipping plane are culled from the scene
 *   [3] far clipping plane: objects farther than the far
 *     clipping plane are culled from the scene
 **/

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}

/**
 * Generate the light to be used in the scene. Light args:
 *   [0]: Hexadecimal color of the light
 *   [1]: Numeric value of the light's strength/intensity
 *   [2]: The distance from the light where the intensity is 0
 * @param {obj} scene: the current scene object
 **/

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

/**
 * Generate the renderer to be used in the scene
 **/

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Generate the controls to be used in the scene
 * @param {obj} camera: the three.js camera for the scene
 * @param {obj} renderer: the three.js renderer for the scene
 **/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

/**
 * Load Nimrud model
 **/
//read the notes and tips and saw that gltf was supposedly better for optimisation so will be using that instead, so changed OBJLoader to GLTFloader.
function loadModel() {
  var loader = new THREE.GLTFLoader();
  loader.load(
    "models/scene.gltf",
    function (gltf) {
      const object = gltf.scene
      object.rotation.y = Math.PI*1.25;
      object.rotation.x = Math.PI*0.38;
      //object.rotation.z = Math.PI*1;


      object.scale.set(30, 30, 30);
      modelObject = object;
      scene.add(object);
      animateModel();
    }
  );
}

/**
 * Render!
 **/

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
}

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

///
var game1 = createBox();
///
loadModel();

render();