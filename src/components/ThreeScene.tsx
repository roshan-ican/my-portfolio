"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    console.log("Three.js scene initializing...");

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles with more movement
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 25;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 25;

      // Add velocity for movement
      velocityArray[i] = (Math.random() - 0.5) * 0.03;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.03;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.03;

      // Create very bright colors for maximum visibility
      const hue = Math.random() * 0.6 + 0.4; // Wider color range for better visibility
      const color = new THREE.Color().setHSL(hue, 1.0, 1.0); // Maximum lightness
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create glow effect with larger, more transparent particles
    const glowGeometry = new THREE.BufferGeometry();
    const glowPosArray = new Float32Array(particlesCount * 3);
    const glowColorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      glowPosArray[i] = posArray[i] + (Math.random() - 0.5) * 0.1;
      glowPosArray[i + 1] = posArray[i + 1] + (Math.random() - 0.5) * 0.1;
      glowPosArray[i + 2] = posArray[i + 2] + (Math.random() - 0.5) * 0.1;

      // Create white glow
      glowColorArray[i] = 1.0;
      glowColorArray[i + 1] = 1.0;
      glowColorArray[i + 2] = 1.0;
    }

    glowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(glowPosArray, 3)
    );
    glowGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(glowColorArray, 3)
    );

    const glowMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const glowMesh = new THREE.Points(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Create extra bright particles for dark backgrounds
    const brightGeometry = new THREE.BufferGeometry();
    const brightPosArray = new Float32Array(particlesCount * 3);
    const brightColorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      brightPosArray[i] = posArray[i] + (Math.random() - 0.5) * 0.2;
      brightPosArray[i + 1] = posArray[i + 1] + (Math.random() - 0.5) * 0.2;
      brightPosArray[i + 2] = posArray[i + 2] + (Math.random() - 0.5) * 0.2;

      // Create pure white bright particles
      brightColorArray[i] = 1.0;
      brightColorArray[i + 1] = 1.0;
      brightColorArray[i + 2] = 1.0;
    }

    brightGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(brightPosArray, 3)
    );
    brightGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(brightColorArray, 3)
    );

    const brightMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const brightMesh = new THREE.Points(brightGeometry, brightMaterial);
    scene.add(brightMesh);

    // Create floating cubes
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i * 0.2, 1.0, 1.0),
        transparent: true,
        opacity: 1.0,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      cubes.push(cube);
      scene.add(cube);
    }

    // Create animated spheres
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + i * 0.1, 1.0, 1.0),
        transparent: true,
        opacity: 1.0,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Create floating octahedrons
    const octahedrons: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const octaGeometry = new THREE.OctahedronGeometry(0.2);
      const octaMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + i * 0.08, 1.0, 1.0),
        transparent: true,
        opacity: 1.0,
        wireframe: true,
      });
      const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
      octahedron.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      octahedrons.push(octahedron);
      scene.add(octahedron);
    }

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate particles with dynamic movement
      const positions = particlesMesh.geometry.attributes.position
        .array as Float32Array;
      const glowPositions = glowMesh.geometry.attributes.position
        .array as Float32Array;
      const brightPositions = brightMesh.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocity
        positions[i] += velocityArray[i];
        positions[i + 1] += velocityArray[i + 1];
        positions[i + 2] += velocityArray[i + 2];

        // Update glow positions to follow main particles
        glowPositions[i] = positions[i] + (Math.random() - 0.5) * 0.05;
        glowPositions[i + 1] = positions[i + 1] + (Math.random() - 0.5) * 0.05;
        glowPositions[i + 2] = positions[i + 2] + (Math.random() - 0.5) * 0.05;

        // Update bright positions to follow main particles
        brightPositions[i] = positions[i] + (Math.random() - 0.5) * 0.1;
        brightPositions[i + 1] = positions[i + 1] + (Math.random() - 0.5) * 0.1;
        brightPositions[i + 2] = positions[i + 2] + (Math.random() - 0.5) * 0.1;

        // Bounce off boundaries
        if (Math.abs(positions[i]) > 10) velocityArray[i] *= -1;
        if (Math.abs(positions[i + 1]) > 10) velocityArray[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 10) velocityArray[i + 2] *= -1;

        // Add mouse interaction
        positions[i] += mouseRef.current.x * 0.01;
        positions[i + 1] += mouseRef.current.y * 0.01;
      }

      particlesMesh.geometry.attributes.position.needsUpdate = true;
      glowMesh.geometry.attributes.position.needsUpdate = true;
      brightMesh.geometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += mouseRef.current.y * 0.0005;
      particlesMesh.rotation.z += mouseRef.current.x * 0.0005;
      glowMesh.rotation.y += 0.001;
      glowMesh.rotation.x += mouseRef.current.y * 0.0005;
      glowMesh.rotation.z += mouseRef.current.x * 0.0005;
      brightMesh.rotation.y += 0.001;
      brightMesh.rotation.x += mouseRef.current.y * 0.0005;
      brightMesh.rotation.z += mouseRef.current.x * 0.0005;

      // Animate cubes
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 + index * 0.002;
        cube.rotation.y += 0.01 + index * 0.002;
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;

        // Add mouse interaction to cubes
        cube.position.x += mouseRef.current.x * 0.001;
        cube.position.z += mouseRef.current.y * 0.001;
      });

      // Animate spheres
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.02;
        sphere.rotation.y += 0.02;
        sphere.position.x += Math.sin(Date.now() * 0.002 + index) * 0.002;
        sphere.position.z += Math.cos(Date.now() * 0.002 + index) * 0.002;

        // Add mouse interaction to spheres
        sphere.position.y += mouseRef.current.y * 0.002;
      });

      // Animate octahedrons
      octahedrons.forEach((octahedron, index) => {
        octahedron.rotation.x += 0.03 + index * 0.005;
        octahedron.rotation.y += 0.025;
        octahedron.rotation.z += 0.02;
        octahedron.position.y +=
          Math.sin(Date.now() * 0.001 + index * 0.7) * 0.004;
        octahedron.position.x +=
          Math.cos(Date.now() * 0.002 + index * 0.4) * 0.003;
        octahedron.position.z +=
          Math.sin(Date.now() * 0.003 + index * 0.3) * 0.002;
      });

      // Animate camera with more noticeable movement
      camera.position.x += Math.sin(Date.now() * 0.001) * 0.2;
      camera.position.y += Math.cos(Date.now() * 0.0008) * 0.1;
      camera.position.z = 8 + Math.sin(Date.now() * 0.0005) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    console.log("Three.js scene started with", particlesCount, "particles");

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeScene;
