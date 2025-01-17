import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_CONFIG, COLORS } from './config.js';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.spheres = [];
        
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.setupControls();
        this.setupEventListeners();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_CONFIG.fov,
            window.innerWidth / window.innerHeight,
            CAMERA_CONFIG.near,
            CAMERA_CONFIG.far
        );
        this.camera.position.set(
            CAMERA_CONFIG.position.x,
            CAMERA_CONFIG.position.y,
            CAMERA_CONFIG.position.z
        );
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(COLORS.ambient, 0.6);
        this.scene.add(ambientLight);

        const light = new THREE.PointLight(COLORS.pointLight, 10, 100);
        light.position.set(0, 0, 10);
        this.scene.add(light);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createSpheres(data, names) {
        const clusters = new Map();

        data.forEach((point, index) => {
            const coords = Array.isArray(point) ? point : point.coordinates;
            const key = coords.slice(0, 3).join(',');
            
            if (!clusters.has(key)) clusters.set(key, []);
            clusters.get(key).push(index);
        });

        clusters.forEach((indices, key) => {
            const point = key.split(',').map(Number);
            const numSpheres = indices.length;
            let positions = [];

            if (numSpheres === 1) {
                positions = [{ x: 0, y: 0, z: 0 }];
            } else if (numSpheres === 2) {
                positions = this.createPairOnXAxis(1);
            } else if (numSpheres === 3) {
                positions = this.createPyramid(0.8);
            } else if (numSpheres === 4) {
                positions = this.createCube(0.8);
            } else if (numSpheres === 5) {
                positions = this.createDiamond(0.8);
            } else if (numSpheres === 6) {
                positions = this.createHexagonal(0.8);
            } else {
                positions = this.generate3DSpherePoints(numSpheres, 0.5 + numSpheres * 0.1);
            }

            positions.forEach((offset, i) => {
                const index = indices[i % indices.length];
                this.addSphere(
                    [point[0] + offset.x, point[1] + offset.y, point[2] + offset.z],
                    {
                        names: [names[index]],
                        data: [data[index]]
                    }
                );
            });
        });
    }

    addSphere(position, userData) {
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: COLORS.sphere });
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.position.set(...position);
        sphere.userData = {
            names: userData.names,
            data: [userData.data]
        };
        
        this.scene.add(sphere);
        this.spheres.push(sphere);
        
        return sphere;
    }

    clearSpheres() {
        this.spheres.forEach(sphere => this.scene.remove(sphere));
        this.spheres = [];
    }

    createPairOnXAxis(spacing) {
        return [
            { x: -spacing / 2, y: 0, z: 0 },
            { x: spacing / 2, y: 0, z: 0 }
        ];
    }

    createPyramid(spacing) {
        return [
            { x: 0, y: spacing, z: spacing },
            { x: -spacing, y: -spacing, z: 0 },
            { x: spacing, y: -spacing, z: 0 }
        ];
    }

    createCube(spacing) {
        const s = spacing / 2;
        return [
            { x: -s, y: -s, z: -s },
            { x: s, y: -s, z: -s },
            { x: -s, y: s, z: -s },
            { x: s, y: s, z: -s }
        ];
    }

    createDiamond(spacing) {
        return [
            { x: 0, y: spacing, z: 0 },
            { x: 0, y: -spacing, z: 0 },
            { x: -spacing, y: 0, z: 0 },
            { x: spacing, y: 0, z: 0 },
            { x: 0, y: 0, z: spacing }
        ];
    }

    createHexagonal(spacing) {
        const positions = [];
        const angleStep = (2 * Math.PI) / 6;

        for (let i = 0; i < 6; i++) {
            positions.push({
                x: spacing * Math.cos(i * angleStep),
                y: spacing * Math.sin(i * angleStep),
                z: 0
            });
        }
        return positions;
    }

    generate3DSpherePoints(numPoints, radius) {
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            points.push({ x: x * radius, y: y * radius, z: z * radius });
        }
        return points;
    }

    getRaycasterIntersects(mouseX, mouseY) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        mouse.x = (mouseX / window.innerWidth) * 2 - 1;
        mouse.y = -(mouseY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, this.camera);
        return raycaster.intersectObjects(this.spheres);
    }

    projectToScreen(position) {
        const vector = position.clone();
        vector.project(this.camera);
        
        return {
            x: (vector.x * 0.5 + 0.5) * window.innerWidth,
            y: -(vector.y * 0.5 - 0.5) * window.innerHeight
        };
    }

    lockCameraToPosition(position) {
        const duration = 1000;
        const startTime = performance.now();
        const startCameraPosition = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const targetPosition = position.clone();
        const offset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);

        const animate = (time) => {
            const elapsed = time - startTime;
            const t = Math.min(elapsed / duration, 1);

            this.controls.target.lerpVectors(startTarget, targetPosition, t);
            const newCameraPosition = new THREE.Vector3().addVectors(this.controls.target, offset);
            this.camera.position.lerpVectors(startCameraPosition, newCameraPosition, t);
            this.controls.update();

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    animate() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}