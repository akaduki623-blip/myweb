import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 首屏 3D 宇航员场景（Lusion 风格）：真实宇航员模型 + 星空，鼠标视差，缓慢漂浮旋转
// 降级策略：移动端 / 减弱动效 / WebGL 不可用 / 模型加载失败 → 显示视频兜底，不加载 3D
(function () {
  const container = document.getElementById('hero3d');
  if (!container) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const hasWebGL = (function () {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  })();

  function showVideoFallback() {
    container.style.display = 'none';
    const v = document.querySelector('.hero-video');
    if (v) v.style.display = 'block';
  }

  if (reduce || isMobile || !hasWebGL) {
    showVideoFallback();
    return;
  }

  // ===== three.js 场景 =====
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    42, container.clientWidth / container.clientHeight, 0.1, 100
  );
  camera.position.set(0, 1.1, 4.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  // 显示 3D 容器（CSS 默认 display:none 作兜底隐藏）；模型加载期间画布透明，视频作底可见
  container.style.display = 'block';

  // ===== 光照（冷青主光 + 紫色边缘光，贴合暗色科技主题）=====
  const hemi = new THREE.HemisphereLight(0x9fd8ff, 0x141426, 1.15);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(0xa78bfa, 1.4, 24);
  rim.position.set(-3.5, 1.2, -2);
  scene.add(rim);
  const fill = new THREE.PointLight(0x38bdf8, 0.9, 20);
  fill.position.set(3, -1, 2);
  scene.add(fill);

  // ===== 星空粒子背景 =====
  const starGeo = new THREE.BufferGeometry();
  const STAR = 1400;
  const sp = new Float32Array(STAR * 3);
  for (let i = 0; i < STAR; i++) {
    const r = 14 + Math.random() * 34;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    sp[i * 3] = r * Math.sin(ph) * Math.cos(th);
    sp[i * 3 + 1] = r * Math.cos(ph);
    sp[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xbfd8ff, size: 0.09, transparent: true, opacity: 0.85,
    depthWrite: false, blending: THREE.AdditiveBlending
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // ===== 加载宇航员模型（Google 托管，CORS 友好）=====
  const MODEL_URL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  let astronaut = null;
  const loader = new GLTFLoader();
  loader.load(
    MODEL_URL,
    (gltf) => {
      astronaut = gltf.scene;
      astronaut.scale.set(1.15, 1.15, 1.15);
      // 居中到原点
      const box = new THREE.Box3().setFromObject(astronaut);
      const c = box.getCenter(new THREE.Vector3());
      astronaut.position.sub(c);
      astronaut.position.y += 0.15;
      scene.add(astronaut);
      // 视频作为底层背景常驻循环播放（3D 场景透明，宇航员叠加其上）
      // 不再隐藏视频，解决「闪一下就没了」的问题
    },
    undefined,
    () => { showVideoFallback(); } // 加载失败降级
  );

  // ===== 鼠标视差 =====
  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // ===== 动画循环 =====
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (astronaut) {
      astronaut.rotation.y = t * 0.22 + mx * 0.5;   // 自转 + 鼠标横向影响
      astronaut.rotation.x = my * 0.18;             // 鼠标纵向微倾
      astronaut.position.y = Math.sin(t * 0.7) * 0.08; // 轻微漂浮
    }
    stars.rotation.y = t * 0.015;
    // 相机缓动视差
    camera.position.x += (mx * 0.7 - camera.position.x) * 0.05;
    camera.position.y += ((1.1 - my * 0.45) - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  // ===== 自适应 =====
  window.addEventListener('resize', () => {
    if (!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
