import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { arrivalPoints, canOccupy, walkingDelta, lookAngles } from './navigation.js';
import clinicImage from '../../assets/website aldiora.png';
import mlImage from '../../assets/sentimenanalisis.png';
import portraitImage from '../../assets/fotodiri2.jpg';
import certificateImage from '../../assets/certificates/ibm_intro_ai.png';
import arcadeImage from '../../assets/pokemon/bitkachu.jpg';

export const stations = [
  { id: 'about', label: 'About me', object: 'Identity wall', position: [-3.6, 2.25, -4.75] },
  { id: 'projects', label: 'Projects', object: 'Workstation', position: [0, 1.85, -3.65] },
  { id: 'experience', label: 'Experience', object: 'Journey board', position: [3.5, 2.25, -4.75] },
  { id: 'certificates', label: 'Certificates', object: 'Learning shelf', position: [5.3, 2.1, 0] },
  { id: 'skills', label: 'Skills', object: 'Stack wall', position: [-2, 2.1, 4.75] },
  { id: 'arcade', label: 'Dev-Mon', object: 'Arcade corner', position: [-4.75, 1.9, 0] },
  { id: 'contact', label: 'Contact', object: 'Say hello', position: [3.2, 1.04, 2.1] },
];

// A walkable scene: furniture geometry also defines the collision boundaries.
export function createRoom(host, { onReady, onError, onSelect, onTarget, onPosition, onLockChange = () => {}, onNotice = () => {} }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch {
    onError();
    return { dispose() {}, setPaused() {}, reset() {}, focus() {}, setTheme() {}, setQuality() {}, travel() {}, lockMouse() {}, keys: new Set() };
  }
  let disposed = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  host.appendChild(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'Interactive studio. WASD to walk, drag to look, E to interact.');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#b9cccf');
  scene.fog = new THREE.Fog('#cfcbc1', 15, 32);
  const camera = new THREE.PerspectiveCamera(65, 1, 0.08, 50);
  camera.rotation.order = 'YXZ';
  const keys = new Set();
  const colliders = [];
  const paintLabels = [];
  const themedMaterials = [];
  const geometryCache = new Map();
  const readColor = token => getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const studioPalette = {
    '--bg-main': '#33281f',
    '--bg-card': '#d3bea2',
    '--bg-soft': '#b58b60',
    '--bg-muted': '#7d5636',
    '--accent-main': '#6d8068',
    '--accent-secondary': '#b2814d',
    '--success-main': '#63805e',
    '--clay-sky': '#89999b',
    '--clay-lavender': '#b8a18a',
    '--text-main': '#33281f',
    '--text-soft': '#665548',
  };
  const studioColor = token => studioPalette[token] || readColor(token);
  const resources = new Set();
  const makeRoughnessMap = (seed, repeatX, repeatY) => {
    const surface = document.createElement('canvas');
    surface.width = 96; surface.height = 96;
    const ctx = surface.getContext('2d');
    const image = ctx.createImageData(surface.width, surface.height);
    for (let i = 0; i < image.data.length; i += 4) {
      const pixel = (i / 4) % surface.width;
      const row = Math.floor(i / 4 / surface.width);
      const variation = Math.sin(pixel * 0.31 + seed) * 18 + Math.sin(row * 0.17 + seed * 2) * 12;
      const value = Math.max(80, Math.min(220, 155 + variation));
      image.data[i] = value; image.data[i + 1] = value; image.data[i + 2] = value; image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(surface);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    resources.add(texture);
    return texture;
  };
  const makeBumpMap = (kind, repeatX, repeatY) => {
    const surface = document.createElement('canvas');
    surface.width = 128; surface.height = 128;
    const ctx = surface.getContext('2d');
    ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, surface.width, surface.height);
    if (kind === 'wood') {
      for (let row = -10; row < 150; row += 7) {
        ctx.beginPath();
        for (let x = 0; x <= 128; x += 4) {
          const y = row + Math.sin(x * 0.12 + row * 0.08) * 2.5 + Math.sin(x * 0.037) * 1.8;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = row % 21 === 0 ? '#5e5e5e' : '#969696';
        ctx.lineWidth = row % 21 === 0 ? 1.8 : 0.75;
        ctx.stroke();
      }
      ctx.globalAlpha = 0.3;
      for (const [x, y, radius] of [[28, 34, 10], [92, 91, 7], [72, 14, 4]]) {
        ctx.beginPath(); ctx.ellipse(x, y, radius, radius * 0.35, -0.2, 0, Math.PI * 2); ctx.strokeStyle = '#4d4d4d'; ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else {
      for (let y = 0; y < 128; y += 3) {
        for (let x = 0; x < 128; x += 3) {
          const value = 112 + Math.sin(x * 0.7 + y * 0.43) * 28 + Math.sin(y * 1.9) * 12;
          ctx.fillStyle = `rgb(${value},${value},${value})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
    const texture = new THREE.CanvasTexture(surface);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    resources.add(texture);
    return texture;
  };
  const woodRoughness = makeRoughnessMap(1.7, 3, 7);
  const fabricRoughness = makeRoughnessMap(4.2, 12, 12);
  const woodBump = makeBumpMap('wood', 3, 7);
  const fabricBump = makeBumpMap('fabric', 12, 12);
  const mat = (color, extra = {}) => {
    const { physical = false, ...options } = extra;
    const Material = physical ? THREE.MeshPhysicalMaterial : THREE.MeshStandardMaterial;
    const m = new Material({ color, roughness: 0.8, ...options });
    resources.add(m);
    return m;
  };
  function themed(token, extra = {}) {
    const material = mat(studioColor(token), extra);
    themedMaterials.push({ material, token });
    return material;
  }
  const wood = themed('--bg-muted', { roughness: 0.62, roughnessMap: woodRoughness, bumpMap: woodBump, bumpScale: 0.055 });
  const oak = themed('--bg-soft', { roughness: 0.68, roughnessMap: woodRoughness, bumpMap: woodBump, bumpScale: 0.04 });
  const cream = themed('--bg-card', { roughness: 0.76 });
  const ink = themed('--bg-main'), green = themed('--accent-main'), black = mat('#091122');
  const foliage = themed('--success-main');
  const brass = themed('--accent-secondary', { physical: true, metalness: 0.82, roughness: 0.22, clearcoat: 0.35 });
  const fabric = themed('--clay-sky', { roughness: 0.94, roughnessMap: fabricRoughness, bumpMap: fabricBump, bumpScale: 0.035 });
  const lilac = themed('--clay-lavender');
  const lightStrip = themed('--accent-secondary', { emissive: studioColor('--accent-secondary'), emissiveIntensity: 1.35 });
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const environmentMap = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
  scene.environment = environmentMap;
  scene.environmentIntensity = 0.38;
  roomEnvironment.traverse(object => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) object.material.dispose();
  });
  pmremGenerator.dispose();
  resources.add(environmentMap);
  function mesh(geometry, material, x, y, z, parent = scene) {
    resources.add(geometry);
    const obj = new THREE.Mesh(geometry, material);
    obj.position.set(x, y, z);
    obj.castShadow = true;
    obj.receiveShadow = true;
    parent.add(obj);
    return obj;
  }
  function box(w, h, d, material, x, y, z, parent) {
    const key = `box:${w}:${h}:${d}`;
    if (!geometryCache.has(key)) geometryCache.set(key, new THREE.BoxGeometry(w, h, d));
    return mesh(geometryCache.get(key), material, x, y, z, parent);
  }
  function rounded(w, h, d, material, x, y, z, radius = 0.08, parent) {
    const key = `round:${w}:${h}:${d}:${radius}`;
    if (!geometryCache.has(key)) geometryCache.set(key, new RoundedBoxGeometry(w, h, d, 3, radius));
    return mesh(geometryCache.get(key), material, x, y, z, parent);
  }
  function tube(points, radius, material, parent = scene) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    return mesh(new THREE.TubeGeometry(curve, 20, radius, 8, false), material, 0, 0, 0, parent);
  }
  function cylinder(top, bottom, height, material, x, y, z, parent) {
    return mesh(new THREE.CylinderGeometry(top, bottom, height, 20), material, x, y, z, parent);
  }
  function block(x, z, w, d) { colliders.push({ x, z, w: w / 2 + 0.28, d: d / 2 + 0.28 }); }
  function label(title, sub, width, height, x, y, z, bg = '--bg-card', rotation = 0) {
    const surface = document.createElement('canvas');
    surface.width = 1024; surface.height = Math.round(1024 * height / width);
    const ctx = surface.getContext('2d');
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace; resources.add(texture);
    const paint = () => {
      ctx.fillStyle = studioColor(bg); ctx.fillRect(0, 0, surface.width, surface.height);
      ctx.fillStyle = studioColor('--accent-secondary'); ctx.fillRect(60, surface.height * 0.12, 64, Math.min(8, surface.height * 0.025));
      ctx.fillStyle = studioColor('--text-main'); ctx.font = `bold ${Math.min(66, surface.height * 0.22)}px sans-serif`;
      ctx.fillText(title, 60, surface.height * 0.53, 905);
      ctx.fillStyle = studioColor('--text-soft'); ctx.font = `${Math.min(28, surface.height * 0.14)}px sans-serif`;
      ctx.fillText(sub, 60, surface.height * 0.76, 905);
      texture.needsUpdate = true;
    };
    paint(); paintLabels.push(paint);
    const material = new THREE.MeshBasicMaterial({ map: texture }); resources.add(material);
    const plane = mesh(new THREE.PlaneGeometry(width, height), material, x, y, z);
    plane.rotation.y = rotation; plane.castShadow = false;
    return plane;
  }
  // Existing portfolio imagery appears on the actual screens and framed prints.
  const loader = new THREE.TextureLoader();
  function picture(url, width, height, x, y, z, station, rotation = 0) {
    const material = mat('#ffffff', { roughness: 0.6 });
    const frame = mesh(new THREE.PlaneGeometry(width, height), material, x, y, z);
    frame.rotation.y = rotation; frame.userData.station = station; frame.castShadow = false;
    loader.load(url, texture => {
      if (disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      // Contain the original image, retaining the frame behind it as a border.
      const ratio = texture.image.width / texture.image.height;
      if (ratio > width / height) frame.scale.y = width / ratio / height;
      else frame.scale.x = height * ratio / width;
      const screenMaterial = new THREE.MeshBasicMaterial({ map: texture });
      resources.add(texture); resources.add(screenMaterial); frame.material = screenMaterial;
    }, undefined, () => { frame.visible = false; });
    return frame;
  }
  const hemisphere = new THREE.HemisphereLight('#fff4e5', '#66594d', 1.65); scene.add(hemisphere);
  const sun = new THREE.DirectionalLight('#ffe8c6', 2.35);
  sun.position.set(-8, 4.3, 2); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 4;
  sun.shadow.blurSamples = 5;
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 8, bottom: -8, near: 0.1, far: 30 });
  sun.shadow.normalBias = 0.035; sun.shadow.bias = -0.0001; scene.add(sun);
  const lamp = new THREE.PointLight('#ffd2a1', 7, 8); lamp.position.set(1.75, 1.82, -3.85); scene.add(lamp);
  // Soft daylight fills keep the room natural; the accent color stays on the
  // screens and small brass details instead of tinting the whole space neon.
  const blueLight = new THREE.PointLight('#efe0ca', 4, 11); blueLight.position.set(-2.8, 2.6, -3.8); scene.add(blueLight);
  const cyanLight = new THREE.PointLight('#d8ccb8', 3, 9); cyanLight.position.set(4.6, 2.5, 0); scene.add(cyanLight);
  function setTheme() {
    // Keep the 3D world independent from the portfolio's light/dark theme.
    themedMaterials.forEach(({ material, token }) => material.color.set(studioColor(token)));
    lightStrip.emissive.set(studioColor('--accent-secondary'));
    paintLabels.forEach(paint => paint());
    scene.background.set('#cbbda9');
    scene.fog.color.set('#d8cdbd');
    hemisphere.intensity = 1.75;
    sun.intensity = 2.35;
    blueLight.intensity = 1.4;
    cyanLight.intensity = 1.1;
    lamp.intensity = 3.5;
    scene.environmentIntensity = 0.38;
    renderer.toneMappingExposure = 1.02;
  }
  // Warm oak flooring, satin wall panels and a wide studio window.
  box(12.4, 0.18, 10.4, wood, 0, -0.11, 0);
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 4; col++) {
      box(2.98, 0.035, 0.49, (row + col) % 3 ? oak : wood, -4.5 + col * 3, 0, -4.75 + row * 0.5);
    }
  }
  box(12.4, 4.5, 0.2, cream, 0, 2.2, -5.1);
  box(0.2, 4.5, 10.4, cream, 6.1, 2.2, 0);
  box(12.4, 4.5, 0.2, cream, 0, 2.2, 5.1);
  box(0.2, 1.1, 10.4, cream, -6.1, 0.5, 0);
  box(0.2, 0.65, 10.4, cream, -6.1, 4.13, 0);
  for (const z of [-5, -1.7, 1.7, 5]) box(0.23, 3.3, 0.14, wood, -6.04, 2.5, z);
  const glass = mat('#b9dcff', { physical: true, transparent: true, opacity: 0.3, transmission: 0.55, thickness: 0.06, ior: 1.45, roughness: 0.08 });
  const windowGlass = box(0.035, 2.75, 9.8, glass, -6.08, 2.43, 0);
  windowGlass.castShadow = false; windowGlass.userData.ignoreRay = true;
  for (let i = 0; i < 7; i++) {
    box(0.32, 0.055, 10, cream, -5.94, 3.05 + i * 0.12, 0);
  }
  box(0.48, 0.12, 10.1, oak, -5.93, 1.08, 0);
  box(12, 0.16, 0.12, wood, 0, 0.12, -4.93);
  for (const x of [-3.3, 3.3]) box(0.24, 0.3, 10.2, wood, x, 4.3, 0);
  box(12.3, 0.12, 10.3, cream, 0, 4.53, 0);
  // Distant foliage outside the glass.
  for (let i = 0; i < 9; i++) {
    const tree = mesh(new THREE.IcosahedronGeometry(1.5 + i % 2, 1), foliage, -9 - i % 3, 1.7, -9 + i * 2.6);
    tree.scale.y = 1.6;
  }
  // Desk and dual screens.
  rounded(4.2, 0.16, 1.35, cream, 0, 1.05, -3.5, 0.07).userData.station = 'projects'; block(0, -3.5, 4.2, 1.35);
  for (const x of [-1.85, 1.85]) for (const z of [-4, -3]) box(0.09, 1.02, 0.09, ink, x, 0.5, z);
  for (const x of [-0.9, 0.9]) {
    rounded(1.55, 1.02, 0.1, black, x, 1.96, -3.84, 0.045).userData.station = 'projects';
    box(0.08, 0.34, 0.08, ink, x, 1.3, -3.83);
    box(0.55, 0.035, 0.32, ink, x, 1.15, -3.75);
    picture(x < 0 ? clinicImage : mlImage, 1.41, 0.66, x, 2.04, -3.779, 'projects');
    const screen = label(x < 0 ? 'Aldiora Clinic' : 'Sentiment Analysis', x < 0 ? 'REACT / TAILWIND' : 'PYTHON / PYTORCH / NLP', 1.41, 0.24, x, 1.57, -3.779);
    screen.userData.station = 'projects';
    mesh(new THREE.SphereGeometry(0.016, 8, 6), lightStrip, x + 0.66, 1.49, -3.774);

  }
  box(0.95, 0.045, 0.32, cream, -0.4, 1.16, -3.14);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) box(0.059, 0.01, 0.065, ink, -0.82 + c * 0.075, 1.188, -3.24 + r * 0.095);
  box(0.45, 0.018, 0.4, ink, 0.55, 1.15, -3.15);
  cylinder(0.09, 0.08, 0.2, cream, 1.6, 1.25, -3.15);
  cylinder(0.19, 0.19, 0.04, brass, 1.75, 1.16, -3.85);
  cylinder(0.025, 0.025, 0.75, brass, 1.75, 1.54, -3.85);
  cylinder(0.08, 0.28, 0.23, green, 1.75, 1.99, -3.85);
  // Upholstered ergonomic chair with shaped arms, headrest and rolling base.
  rounded(0.88, 0.2, 0.82, fabric, 0, 0.69, -2.25, 0.09); block(0, -2.25, 1.12, 1.05);
  const backrest = rounded(0.85, 0.96, 0.2, green, 0, 1.17, -1.9, 0.09); backrest.rotation.x = -0.12;
  rounded(0.69, 0.76, 0.06, fabric, 0, 1.19, -2.015, 0.025).rotation.x = -0.12;
  rounded(0.5, 0.23, 0.18, fabric, 0, 1.83, -1.87, 0.08);
  for (const x of [-0.51, 0.51]) {
    tube([[x, 0.64, -2.08], [x, 0.91, -2.12], [x, 0.99, -2.3]], 0.025, ink);
    rounded(0.13, 0.08, 0.48, black, x, 1.01, -2.3, 0.035);
  }
  cylinder(0.065, 0.075, 0.55, brass, 0, 0.38, -2.25);
  for (let i = 0; i < 5; i++) {
    const angle = i / 5 * Math.PI * 2;
    const x = Math.sin(angle) * 0.47, z = -2.25 + Math.cos(angle) * 0.47;
    tube([[0, 0.28, -2.25], [x * 0.55, 0.19, -2.25 + Math.cos(angle) * 0.27], [x, 0.14, z]], 0.035, ink);
    const caster = cylinder(0.065, 0.065, 0.07, black, x, 0.09, z); caster.rotation.z = Math.PI / 2;
  }
  // Identity print and experience board.
  box(2.25, 1.75, 0.1, wood, -3.6, 2.45, -4.93);
  const aboutSign = label('BIMO GHANIS', 'SOFTWARE / DATA / APPLIED AI', 2.09, 1.35, -3.6, 2.3, -4.86);
  aboutSign.userData.station = 'about';
  picture(portraitImage, 0.73, 0.81, -3.6, 3.43, -4.85, 'about');
  rounded(0.88, 0.96, 0.07, brass, -3.6, 3.43, -4.91, 0.03);
  box(2.2, 1.75, 0.1, wood, 3.5, 2.45, -4.93);
  const journeySign = label('The journey', 'TELKOM UNIVERSITY → WHAT’S NEXT', 2.04, 1.59, 3.5, 2.45, -4.86, '--bg-card');
  journeySign.userData.station = 'experience';
  // A practical skills wall makes the back of the room feel lived in and gives
  // visitors a quick, visual read of the tools behind the portfolio.
  box(2.45, 1.82, 0.1, wood, -2, 2.43, 4.93);
  const skillsSign = label('STACK / SKILLS', 'BUILD · ANALYZE · SHIP', 2.27, 0.54, -2, 3.1, 4.86, '--bg-card', Math.PI);
  skillsSign.userData.station = 'skills';
  for (const [x, title, sub] of [
    [-2.72, 'PYTHON', 'PANDAS / PYTORCH'],
    [-2, 'SQL', 'SCHEMA / ETL'],
    [-1.28, 'REACT', 'UI / VITE'],
  ]) {
    const card = label(title, sub, 0.62, 0.46, x, 2.35, 4.855, '--bg-soft', Math.PI);
    card.userData.station = 'skills';
    box(0.48, 0.025, 0.03, brass, x, 2.08, 4.84);
  }
  const skillNote = label('CURRENT FOCUS', 'DATA PRODUCTS + APPLIED AI', 1.48, 0.42, -2, 1.76, 4.855, '--bg-card', Math.PI);
  skillNote.userData.station = 'skills';
  // Bookcase facing the center.
  box(0.65, 2.85, 3.1, wood, 5.6, 1.45, -0.3).userData.station = 'certificates'; block(5.5, -0.3, 1.1, 3.1);
  for (let level = 0; level < 4; level++) {
    box(0.8, 0.07, 3.3, oak, 5.43, 0.18 + level * 0.87, -0.3);
    for (let b = 0; b < 8; b++) {
      box(0.43, 0.42 + (b % 3) * 0.1, 0.14, [cream, green, ink, brass][b % 4], 5.18, 0.45 + level * 0.87, -1.65 + b * 0.35).userData.station = 'certificates';
    }
  }
  const certificate = label('Always learning.', 'CERTIFICATES & CREDENTIALS', 2.3, 0.85, 5.04, 3.4, -0.3, '--bg-card', -Math.PI / 2);
  certificate.userData.station = 'certificates';
  rounded(0.06, 1.05, 1.6, cream, 4.87, 1.91, -0.25, 0.025).userData.station = 'certificates';
  picture(certificateImage, 1.5, 0.95, 4.832, 1.91, -0.25, 'certificates', -Math.PI / 2);
  // Arcade cabinet facing into the room.
  const arcade = new THREE.Group(); arcade.position.set(-4.75, 0, -0.15); arcade.rotation.y = Math.PI / 2; scene.add(arcade);
  box(1.05, 1.1, 0.85, ink, 0, 0.56, 0, arcade);
  box(1.05, 1.3, 0.72, green, 0, 1.68, -0.12, arcade);
  box(0.85, 0.72, 0.06, black, 0, 1.7, 0.28, arcade);
  box(1.1, 0.12, 0.48, oak, 0, 1.16, 0.35, arcade);
  cylinder(0.05, 0.05, 0.2, black, -0.24, 1.3, 0.42, arcade);
  for (const x of [0.13, 0.32]) cylinder(0.06, 0.06, 0.03, brass, x, 1.25, 0.42, arcade);
  block(-4.75, -0.15, 0.95, 1.1);
  const arcadeSign = label('DEV-MON', 'PLAY / COLLECT / DISCOVER', 0.95, 0.45, -4.365, 2.15, -0.15, '--bg-card', Math.PI / 2);
  arcadeSign.userData.station = 'arcade';
  picture(arcadeImage, 0.8, 0.65, -4.425, 1.7, -0.15, 'arcade', Math.PI / 2);
  arcade.traverse(object => { if (object.isMesh) object.userData.station = 'arcade'; });
  // A quiet contact corner with a low table and sofa.
  rounded(2.5, 0.4, 0.9, green, 2.9, 0.45, 3.75, 0.16); block(2.9, 3.75, 2.9, 1.3);
  rounded(2.6, 0.85, 0.3, fabric, 2.9, 0.9, 4.17, 0.12);
  for (const x of [1.58, 4.22]) rounded(0.27, 0.7, 1.1, fabric, x, 0.75, 3.78, 0.12);
  for (const x of [2.25, 3.55]) rounded(1.18, 0.2, 0.8, fabric, x, 0.73, 3.67, 0.085);
  rounded(2.1, 0.12, 1.15, cream, 3.2, 0.55, 2.1, 0.055); block(3.2, 2.1, 2.1, 1.15);
  for (const x of [2.4, 4]) for (const z of [1.7, 2.5]) box(0.07, 0.5, 0.07, ink, x, 0.27, z);
  const contact = label('Say hello.', 'LET’S BUILD SOMETHING.', 1.15, 0.64, 3.2, 1.04, 2.09, '--bg-card', Math.PI);
  label('Say hello.', 'LET’S BUILD SOMETHING.', 1.15, 0.64, 3.2, 1.04, 2.11).userData.station = 'contact';
  rounded(1.21, 0.7, 0.016, brass, 3.2, 1.04, 2.1, 0.006);
  cylinder(0.025, 0.025, 0.17, brass, 3.2, 0.65, 2.1);
  contact.userData.station = 'contact';
  box(4.4, 0.018, 3.6, lilac, 2.5, 0.026, 2.6);
  // Potted plants.
  for (const [x, z] of [[-4.6, -4.25], [4.9, 4.1], [-5, 3.6]]) {
    cylinder(0.28, 0.21, 0.55, cream, x, 0.3, z); block(x, z, 0.55, 0.55);
    for (let i = 0; i < 7; i++) {
      const leaf = mesh(new THREE.SphereGeometry(0.23, 16, 10), foliage, x + Math.sin(i * 2.4) * 0.22, 0.9 + i * 0.08, z + Math.cos(i * 2.4) * 0.22);
      leaf.scale.set(0.6, 2.2, 0.6); leaf.rotation.z = Math.sin(i) * 0.6;
    }
  }
  // Rounded details and real geometry give the clay studio depth at close range.
  for (const x of [2.02, 3.79]) {
    const pillow = rounded(0.48, 0.5, 0.19, lilac, x, 1.08, 3.94, 0.085);
    pillow.rotation.z = x < 3 ? -0.18 : 0.18; pillow.rotation.x = -0.2;
  }
  for (const x of [1.82, 4]) for (const z of [3.4, 4.08]) cylinder(0.04, 0.025, 0.21, brass, x, 0.14, z);
  // Ceiling pendants: opaque shade, luminous inner diffuser, suspension cable.
  for (const [x, z] of [[-1.35, -3.4], [1.35, -3.4], [3.15, 2.1]]) {
    cylinder(0.012, 0.012, 0.67, ink, x, 4.06, z);
    cylinder(0.29, 0.43, 0.22, cream, x, 3.62, z);
    cylinder(0.36, 0.36, 0.015, lightStrip, x, 3.505, z).castShadow = false;
  }
  // Cove and desk lighting, using emissive surfaces without expensive extra shadows.
  for (const x of [-5.91, 5.91]) box(0.035, 0.035, 9.7, lightStrip, x, 4.02, 0).castShadow = false;
  box(11.7, 0.035, 0.035, lightStrip, 0, 4.02, -4.92).castShadow = false;
  box(3.85, 0.022, 0.025, lightStrip, 0, 0.965, -2.83).castShadow = false;
  // Desk drawer pedestal, handles and a glass-sided workstation tower.
  rounded(0.62, 0.91, 0.96, cream, -1.68, 0.5, -3.55, 0.05);
  for (const y of [0.35, 0.63, 0.86]) {
    rounded(0.55, 0.2, 0.035, oak, -1.68, y, -3.054, 0.015);
    rounded(0.22, 0.025, 0.04, brass, -1.68, y + 0.02, -3.025, 0.01);
  }
  rounded(0.42, 0.79, 0.8, black, 1.51, 0.45, -3.5, 0.035);
  for (const y of [0.28, 0.62]) {
    const fan = mesh(new THREE.TorusGeometry(0.125, 0.013, 8, 32), lightStrip, 1.51, y, -3.092);
    fan.userData.station = 'projects'; fan.castShadow = false;
    cylinder(0.035, 0.035, 0.018, brass, 1.51, y, -3.08).rotation.x = Math.PI / 2;
  }
  const mouse = mesh(new THREE.SphereGeometry(0.09, 16, 12), cream, 0.55, 1.205, -3.15);
  mouse.scale.set(0.72, 0.45, 1.15);
  box(0.014, 0.015, 0.035, brass, 0.55, 1.245, -3.18);
  const mugHandle = mesh(new THREE.TorusGeometry(0.065, 0.018, 8, 20), cream, 1.7, 1.27, -3.15);
  mugHandle.rotation.y = Math.PI / 2;
  cylinder(0.076, 0.076, 0.006, black, 1.6, 1.352, -3.15);
  tube([[-0.9, 1.44, -3.87], [-0.8, 1.18, -3.96], [0.6, 1.14, -3.98], [1.5, 0.7, -3.9]], 0.012, black);
  // Window-side skirting and acoustic wall slats.
  for (let i = 0; i < 14; i++) rounded(0.07, 2.55, 0.07, oak, -1.5 + i * 0.23, 2.35, -4.92, 0.025);
  const studioSign = label('BG / STUDIO', 'SOFTWARE · DATA · APPLIED AI', 2.1, 0.61, 0, 3.65, -4.81);
  studioSign.userData.station = 'about';
  // A dimensional timeline under the journey board.
  tube([[2.65, 1.33, -4.88], [3.5, 1.33, -4.88], [4.35, 1.33, -4.88]], 0.012, brass);
  for (const x of [2.65, 3.5, 4.35]) mesh(new THREE.SphereGeometry(0.04, 12, 8), lightStrip, x, 1.33, -4.84).userData.station = 'experience';
  // Plant stems support the individual leaves.
  for (const [x, z] of [[-4.6, -4.25], [4.9, 4.1], [-5, 3.6]]) {
    for (let i = 0; i < 7; i++) tube([[x, 0.53, z], [x + Math.sin(i * 2.4) * 0.12, 0.8, z], [x + Math.sin(i * 2.4) * 0.22, 0.9 + i * 0.08, z + Math.cos(i * 2.4) * 0.22]], 0.008, foliage);
  }
  const markers = [];
  for (const station of stations) {
    const marker = mesh(new THREE.SphereGeometry(0.075, 12, 8), lightStrip, ...station.position);
    marker.position.y += 0.65; marker.userData.baseY = marker.position.y; marker.castShadow = false; marker.userData.station = station.id; markers.push(marker);
  }
  let hoverPoint = null;
  let paused = false, yaw = 0, pitch = -0.025, dragging = false, moved = 0, pointer = null, currentTarget = null;
  const reset = () => { camera.position.set(-0.8, 1.65, 3.9); yaw = -0.06; pitch = -0.025; keys.clear(); hoverPoint = null; };
  reset();
  const raycaster = new THREE.Raycaster();
  const rayPoint = new THREE.Vector2();
  function hit(x = 0, y = 0) {
    rayPoint.set(x, y); raycaster.setFromCamera(rayPoint, camera);
    // The first visible surface must be interactive; walls/furniture occlude objects.
    const first = raycaster.intersectObjects(scene.children, true).find(result => result.object.isMesh && !result.object.userData.ignoreRay);
    return first?.object.userData.station || null;
  }
  function select(id) { if (id) { keys.clear(); onSelect(id); } }
  const down = (e) => {
    if (paused || e.button > 0) return;
    if (document.pointerLockElement === canvas) { select(hit()); return; }
    canvas.focus({ preventScroll: true }); dragging = true; moved = 0;
    pointer = { x: e.clientX, y: e.clientY, id: e.pointerId };
    canvas.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (paused) return;
    if (!dragging) {
      const rect = canvas.getBoundingClientRect();
      hoverPoint = [(e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1];
      return;
    }
    if (!pointer || pointer.id !== e.pointerId) return;
    hoverPoint = null;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    moved += Math.abs(dx) + Math.abs(dy);
    yaw -= dx * 0.004; pitch = THREE.MathUtils.clamp(pitch - dy * 0.003, -1.1, 1.1);
    pointer.x = e.clientX; pointer.y = e.clientY;
  };
  const up = (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 7 && !paused) {
      const rect = canvas.getBoundingClientRect();
      select(hit((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1));
    }
    pointer = null;
  };
  const cancel = () => { keys.clear(); dragging = false; pointer = null; hoverPoint = null; };
  function travel(id) {
    const station = stations.find(item => item.id === id), arrival = arrivalPoints[id];
    if (!station || !arrival || !canOccupy(arrival[0], arrival[2], colliders)) return false;
    cancel(); camera.position.set(...arrival);
    const angles = lookAngles(arrival, station.position);
    yaw = angles.yaw; pitch = angles.pitch;
    camera.rotation.set(pitch, yaw, 0); canvas.focus({ preventScroll: true });
    return true;
  }
  const lockChanged = () => { cancel(); onLockChange(document.pointerLockElement === canvas); };
  const lockError = () => onNotice('Mouse look is unavailable here. You can still drag to look around.');
  const lockedMove = event => {
    if (document.pointerLockElement !== canvas || paused) return;
    yaw -= event.movementX * 0.002;
    pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.002, -1.1, 1.1);
  };
  const pointerLeave = () => { hoverPoint = null; };
  document.addEventListener('pointerlockchange', lockChanged);
  document.addEventListener('pointerlockerror', lockError);
  document.addEventListener('mousemove', lockedMove);
  canvas.addEventListener('pointerleave', pointerLeave);
  const keydown = (e) => {
    if (paused || e.target !== canvas) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyQ', 'KeyE', 'Enter'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyE' || e.code === 'Enter') {
      if (!e.repeat) select(hoverPoint && document.pointerLockElement !== canvas ? hit(...hoverPoint) : hit());
      return;
    }
    if (/^Digit[1-7]$/.test(e.code)) { e.preventDefault(); travel(stations[Number(e.code.slice(-1)) - 1].id); return; }
    hoverPoint = null;
    keys.add(e.code);
  };
  const keyup = (e) => keys.delete(e.code);
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', cancel);
  canvas.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup);
  window.addEventListener('blur', cancel); document.addEventListener('visibilitychange', cancel);
  canvas.addEventListener('webglcontextlost', onError);
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h); camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  let lastTime = 0, lastReport = 0;
  function setQuality(quality) {
    renderer.setPixelRatio(quality === 'lite' ? 1 : Math.min(window.devicePixelRatio, 1.7));
    renderer.shadowMap.enabled = quality !== 'lite';
    renderer.shadowMap.needsUpdate = true;
    scene.traverse(object => { if (object.isMesh) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => { material.needsUpdate = true; });
    } });
    resize();
  }
  renderer.setAnimationLoop(time => {
    const dt = Math.min((time - lastTime) / 1000, 0.04); lastTime = time;
    if (!paused && !document.hidden) {
      const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
      const strafe = Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
      yaw += (Number(keys.has('ArrowLeft')) - Number(keys.has('ArrowRight'))) * dt * 1.5;
      const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 4.2 : 2.6;
      const delta = walkingDelta(forward, strafe, yaw, dt, speed);
      if (canOccupy(camera.position.x + delta.x, camera.position.z, colliders)) camera.position.x += delta.x;
      if (canOccupy(camera.position.x, camera.position.z + delta.z, colliders)) camera.position.z += delta.z;
      camera.rotation.set(pitch, yaw, 0);
    }
    if (document.hidden) return;
    markers.forEach((marker, index) => {
      marker.position.y = marker.userData.baseY + (reducedMotion.matches || paused ? 0 : Math.sin(time * 0.0018 + index) * 0.035);
      marker.scale.setScalar(marker.userData.station === currentTarget ? 1.6 : 1);
    });
    camera.updateMatrixWorld();
    renderer.render(scene, camera);
    if (time - lastReport > 120) {
      lastReport = time;
      const target = paused ? null : (hoverPoint && document.pointerLockElement !== canvas ? hit(...hoverPoint) : hit());
      canvas.style.cursor = target ? 'pointer' : dragging ? 'grabbing' : 'grab';
      if (target !== currentTarget) { currentTarget = target; onTarget(target); }
      onPosition({ x: camera.position.x, z: camera.position.z, yaw });
    }
  });
  setTheme();
  onReady();
  return {
    keys, setTheme, setQuality, travel,
    async lockMouse() {
      if (!canvas.requestPointerLock) { lockError(); return; }
      if (document.pointerLockElement === canvas) { document.exitPointerLock(); return; }
      canvas.focus({ preventScroll: true });
      try { await canvas.requestPointerLock(); } catch { lockError(); }
    },
    reset() { reset(); canvas.focus({ preventScroll: true }); },
    focus() { canvas.focus({ preventScroll: true }); },
    setPaused(value) { paused = value; cancel(); if (value && document.pointerLockElement === canvas) document.exitPointerLock(); },
    dispose() {
      renderer.setAnimationLoop(null); observer.disconnect();
      document.removeEventListener('pointerlockchange', lockChanged);
      document.removeEventListener('pointerlockerror', lockError);
      document.removeEventListener('mousemove', lockedMove);
      canvas.removeEventListener('pointerleave', pointerLeave);
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', cancel);
      canvas.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', cancel); document.removeEventListener('visibilitychange', cancel);
      canvas.removeEventListener('webglcontextlost', onError);
      disposed = true;
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      resources.forEach(resource => resource.dispose()); renderer.dispose(); canvas.remove();
    },
  };
}
