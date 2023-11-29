import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { Group, GridHelper } from 'three';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const gltf = useRef<Group>();
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load(url, (data) => {
      gltf.current = data.scene;
    });
  }, [url, loader]);

  useFrame((state) => {
    if (gltf.current) {
      state.scene.add(gltf.current);
    }
  });

  return null;
};

const Canvas3D = () => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const loadModel = () => {
    setModelUrl('src/assets/car.glb');
  };

  return (
    <div>
      <button onClick={loadModel}>Load Model</button>
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 5, 5] }}>
        <color attach="background" args={['#ffffff']} />
        <OrbitControls enableZoom enableRotate />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <gridHelper args={[100, 10]} /> {/* Add a grid */}
        <Suspense fallback={null}>
          {modelUrl && <Model url={modelUrl} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Canvas3D;
