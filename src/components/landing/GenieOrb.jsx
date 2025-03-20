import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GenieOrb = () => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !container.parentElement) return;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 8; // Aumentado de 5 para 8
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Criar o robô
    const robot = new THREE.Group();
    robot.scale.set(3.5, 3.5, 3.5); // Aumentando a escala do robô em 50%

    // Corpo principal (cilindro)
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a8eff,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robot.add(body);

    // Cabeça (esfera achatada) - Ajustada para evitar artefatos
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100,
      side: THREE.FrontSide // Garante que só renderize a parte externa
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    head.scale.y = 0.8;
    robot.add(head);

    // Removendo as declarações do holograma e holoLight
    
    // Olhos (2 esferas pequenas)
    const eyeGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0eeee0,
      emissive: 0x00ff00,
      emissiveIntensity: 0.5
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.7, 0.22);
    robot.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.x = 0.15;
    robot.add(rightEye);

    // Braços (retângulos finos)
    const armGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x4a8eff });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0, 0);
    robot.add(leftArm);

    const rightArm = leftArm.clone();
    rightArm.position.x = 0.6;
    robot.add(rightArm);

    // Painel de documentação (plano com textura)
    const docGeometry = new THREE.PlaneGeometry(0.4, 0.6);
    const docMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    
    const doc = new THREE.Mesh(docGeometry, docMaterial);
    doc.position.set(0.8, 0, 0.2);
    doc.rotation.y = -Math.PI / 6;
    robot.add(doc);

    // Linhas de código (detalhes no painel)
    for (let i = 0; i < 5; i++) {
      const lineGeometry = new THREE.PlaneGeometry(0.3, 0.02);
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x4a8eff });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0.8, 0.2 - (i * 0.1), 0.21);
      line.rotation.y = -Math.PI / 6;
      robot.add(line);
    }

    scene.add(robot);

    // Remover a criação do robô filho (removido o bloco childRobot)

    // Luzes
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(2, 2, 4);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0x4444ff, 0.5);
    backLight.position.set(-2, -2, -4);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Handler para movimento do mouse
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: ((event.clientX - rect.left) / container.clientWidth) * 2 - 1,
        y: -((event.clientY - rect.top) / container.clientHeight) * 2 + 1
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animação
    const animate = () => {
      const time = Date.now() * 0.001;

      // Flutuação suave
      robot.position.y = Math.sin(time) * 0.35;
      
      robot.rotation.x = 0.5;
    
      // Rotação do robô seguindo o mouse
      const targetRotationY = mousePosition.current.x * Math.PI * 0.2;
      const targetRotationX = (-mousePosition.current.y * Math.PI * 0.08) - 0.2;
    
      robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.03;
      robot.rotation.x += (targetRotationX - robot.rotation.x) * 0.03;
    
      // Ajuste das cabeças
      head.rotation.y = (targetRotationY - robot.rotation.y) * 0.3;
      head.rotation.x = (targetRotationX - robot.rotation.x) * 0.3;

      // Piscar olhos ocasionalmente
      if (Math.sin(time * 3) > 0.95) {
        leftEye.material.emissiveIntensity = 0;
        rightEye.material.emissiveIntensity = 0;
      } else {
        leftEye.material.emissiveIntensity = 0.5;
        rightEye.material.emissiveIntensity = 0.5;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GenieOrb;