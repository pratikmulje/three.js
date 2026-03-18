import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./Landing.css";

const VRScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#151414");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 4, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let model;

    const loader = new GLTFLoader();

    loader.load("/src/assets/VR.glb", (gltf) => {

      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x / 4, size.y / 4, size.z / 4);
      const scale = 2 / maxDim;
      model.scale.setScalar(scale);

      scene.add(model);
    });

    function animate() {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

  }, []);

  return <div ref={mountRef}></div>;
};

export default VRScene;