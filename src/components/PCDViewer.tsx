import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PCDViewer = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  const pcdFiles = [
    '/pcds/frame1.pcd',
    '/pcds/frame2.pcd'
  ];

  let scene, camera, renderer, controls, pointCloud;

  useEffect(() => {
    const container = document.getElementById('pcd-container');
    if (!container) return;

    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    
    loadPCD(pcdFiles[frameIndex]);


    return () => {
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const loadPCD = (url) => {
    const loader = new PCDLoader();
    loader.load(url, (points) => {
      if (pointCloud) scene.remove(pointCloud);
      pointCloud = points;
      scene.add(points);
    });
  };

  const handlePrevFrame = () => {
    const newIndex = (frameIndex - 1 + pcdFiles.length) % pcdFiles.length;
    setFrameIndex(newIndex);
    loadPCD(pcdFiles[newIndex]);
  };

  const handleNextFrame = () => {
    const newIndex = (frameIndex + 1) % pcdFiles.length;
    setFrameIndex(newIndex);
    loadPCD(pcdFiles[newIndex]);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div id="pcd-container" style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <button onClick={handlePrevFrame} style={{ color: 'white' }}>Previous</button>
        <button onClick={handleNextFrame} style={{ color: 'white' }}>Next</button>
      </div>
    </div>
  );
};

export default PCDViewer;
