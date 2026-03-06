// 🌍 Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#151414');

// 📷 Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 4, 5);
camera.lookAt(0, 0, 0);

// 🖥 Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);

// 📏 Axes Helper
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// 💡 Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);



// 📦 GLB Loader
let model; // 👈 global so we can rotate

const loader = new THREE.GLTFLoader();

loader.load(
  "VR.glb",
  (gltf) => {
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x/4, size.y/4, size.z/4);
    const scale = 2 / maxDim;
    model.scale.setScalar(scale);

    scene.add(model);
    console.log("GLB Loaded & Centered ✅");
  },
  undefined,
  (error) => {
    console.error("GLB Load Error ❌", error);
  }
);



function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.008;
  }
  renderer.render(scene, camera);
}


animate();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});