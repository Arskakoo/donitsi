let scene, camera, renderer, controls;
let model;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let moveForward = false;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    9000
  );
  camera.position.set(2, 1, 1);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffc0cb);
  document.body.appendChild(renderer.domElement);

  // Add orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 1;
  controls.screenSpacePanning = true;
  controls.maxPolarAngle = Math.PI / 2;

  // valot
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight1.position.set(0, 10, 0);
  scene.add(directionalLight1);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight2.position.set(5, 5, 5);
  scene.add(directionalLight2);
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight3.position.set(-5, 5, -5);
  scene.add(directionalLight3);

  // Modeli
  const loader = new THREE.GLTFLoader();
  loader.load(
    "donitsi.glb",
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.009;
  }
  if (moveForward && model) {
    model.position.z -= 0.01;
    if (model.position.z < -5) {
      moveForward = false;
    }
  }
  controls.update();
  renderer.render(scene, camera);
}
init();
