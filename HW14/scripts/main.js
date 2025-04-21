var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cube, cube2;
var dice;
var diceSpin = { x: 0, y: 0, z: 0 };
var modelObject;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();







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
  cube2.material.color.setHex(0xa83232); 
  cube2.position.set(-50, 0, 0);
  cube2.scale.set(15, 15, 15);
  scene.add(cube2);
 
  animate();
}


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

/**============================================================================
 MOUSE CLICK FOR DICE ROLL*/
window.addEventListener("click", onMouseClick, false); /*this event listener will allow us to interact with mouse */
function onMouseClick(event) {
/*helps locate the mouse so that you can still click when camera moves */
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  /*checks to see if mouse intersects with dice 2d */
  if (dice) {
    var intersects = raycaster.intersectObject(dice, true);
    if (intersects.length > 0) {
      /* If spinning, stops.and when stoppeds, starts with new random spin.*/
      if (diceSpin.x !== 0 || diceSpin.y !== 0 || diceSpin.z !== 0) {
        diceSpin.x = 0;
        diceSpin.y = 0;
        diceSpin.z = 0;
      } else {
        diceSpin.x = (Math.random() - 0.5) * 0.2 + 0.1;
        diceSpin.y = (Math.random() - 0.5) * 0.2 + 0.1;
        diceSpin.z = (Math.random() - 0.5) * 0.2 + 0.1;
      }
    }
  }
}

/**
 * Load Nimrud model
 **/
//read the notes and tips and saw that gltf was supposedly better for optimisation so will be using that instead, so changed OBJLoader to GLTFloader.
function loadDiceModel() {
  var loader = new THREE.GLTFLoader();
  loader.load(
    "models/dice.gltf",
    function (gltf) {
      dice = gltf.scene;

       dice.position.set(0, 0, -25);
      dice.scale.set(20, 20, 20);
      dice.rotation.y = Math.PI * 0.5;

      diceSpin.x = (Math.random() - 0.5) * 0.2 + 0.1; 
      diceSpin.y = (Math.random() - 0.5) * 0.2 + 0.1;
      diceSpin.z = (Math.random() - 0.5) * 0.2 + 0.1;
      scene.add(dice);
    }
  );
}
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
/*CLICK DICE */
function load3DText() {
  var loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      var textGeometry = new THREE.TextGeometry('Click The Dice', {
          font: font,
          size: 5, 
          height: 1, 
          curveSegments: 12, 
          bevelEnabled: true, 
          bevelThickness: 0.5, 
          bevelSize: 0.5, 
          bevelOffset: 0, 
          bevelSegments: 5 
      });

      var textMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff 
      });

      var textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(25, 0, 40); 
      textMesh.rotation.x = Math.PI*0.5;
      textMesh.rotation.y = Math.PI*1;

      scene.add(textMesh);
  });
}

/* */
function animateModel() {
  
  if (modelObject) {
    modelObject.rotation.y += 0.01;
  }
  requestAnimationFrame(animateModel);
}

/**
 * Render!
 **/

function render() {
  requestAnimationFrame(render);
  if (dice) {
    dice.rotation.x += diceSpin.x;
    dice.rotation.y += diceSpin.y;
    dice.rotation.z += diceSpin.z;
  }
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

loadDiceModel();
load3DText(); 

render();