 function createStars() {
  const stars = document.querySelector('.stars');

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    stars.appendChild(star);
  }
}
 
 
 window.onload = function() {
createStars();

 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

//Creating a scene
//Container where the scene is displayed
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 0,20); // Adjust the position of the camera
renderer.render(scene, camera);


// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x552c16});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


const earthTexture = new THREE.TextureLoader().load('img/earth.jpg');
const earth = new THREE.Mesh(new THREE.SphereGeometry(3, 100, 100), new THREE.MeshBasicMaterial({ map: earthTexture }));

scene.add(earth);
earth.position.z = -15;
earth.position.x = -4.5;


scene.background = new THREE.Color(0x060913); //  color


const sunTexture = new THREE.TextureLoader().load('img/sun.jpg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(8, 100, 100), new THREE.MeshBasicMaterial({ map: sunTexture }));

scene.add(sun);

sun.position.z = -50;
sun.position.x = 20;



//Venus 
const venusTexture = new THREE.TextureLoader().load('img/venus.jpg');
const venus = new THREE.Mesh(new THREE.SphereGeometry(2.3, 100, 50), new THREE.MeshBasicMaterial({ map: venusTexture }));

scene.add(venus);
venus.position.z = -30;
venus.position.x = -2;


//Mercury 
const mercuryTexture = new THREE.TextureLoader().load('img/mercury.jpg');
const mercury = new THREE.Mesh(new THREE.SphereGeometry(2, 100, 100), new THREE.MeshBasicMaterial({ map: mercuryTexture }));

scene.add(mercury);
mercury.position.z = -45;
mercury.position.x = 3;



// Assuming the 'sun' is used as a light source
const sunLight = new THREE.PointLight(0xffffff, 1); // Color: white, Intensity: 1
sunLight.position.set(20, 0, -10); // Position of the 'sun' in the scene
scene.add(sunLight);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  //earth.rotation.y += 0.01;
  //earth.rotation.z += 0.01;

  camera.position.z = t * +0.009;
  camera.position.x = t * +0.0001;
  camera.rotation.y = t * +0.00015;

}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.00065;
  venus.rotation.y -= 0.00053;
  mercury.rotation.y += 0.0002;
  renderer.render(scene, camera);
}

animate();


};