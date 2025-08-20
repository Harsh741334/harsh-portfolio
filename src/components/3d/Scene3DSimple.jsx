import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

const Scene3DSimple = () => {
  const [activeScene, setActiveScene] = useState('neural');

  const scenes = {
    neural: { name: 'Neural Network', icon: '🧠', color: '#6366f1' },
    particles: { name: 'Particles', icon: '✨', color: '#8b5cf6' },
    skills: { name: 'Skills', icon: '🎯', color: '#10b981' }
  };

  const NeuralScene = () => (
    <>
      <Sphere position={[-2, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color="#6366f1" />
      </Sphere>
      <Sphere position={[0, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Sphere>
      <Sphere position={[2, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color="#10b981" />
      </Sphere>
    </>
  );

  const ParticleScene = () => (
    <>
      {[...Array(20)].map((_, i) => (
        <Sphere 
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]} 
          args={[0.1]}
        >
          <meshStandardMaterial color="#8b5cf6" />
        </Sphere>
      ))}
    </>
  );

  const SkillsScene = () => (
    <>
      <Box position={[-1, 1, 0]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box position={[1, 1, 0]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#6366f1" />
      </Box>
      <Box position={[-1, -1, 0]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      <Box position={[1, -1, 0]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>
    </>
  );

  const renderScene = () => {
    switch(activeScene) {
      case 'neural': return <NeuralScene />;
      case 'particles': return <ParticleScene />;
      case 'skills': return <SkillsScene />;
      default: return <NeuralScene />;
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Scene Navigation */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-gray-700">
          <h3 className="text-white text-lg font-bold mb-3">3D Scenes</h3>
          <div className="space-y-2">
            {Object.entries(scenes).map(([key, scene]) => (
              <button
                key={key}
                onClick={() => setActiveScene(key)}
                className={`
                  w-full p-2 rounded-lg text-left transition-all duration-300
                  ${activeScene === key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                <span className="mr-2">{scene.icon}</span>
                {scene.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 z-50">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-gray-700">
          <div className="text-white">
            <h4 className="font-bold">
              {scenes[activeScene].icon} {scenes[activeScene].name}
            </h4>
            <p className="text-sm text-gray-300 mt-1">
              Use mouse to rotate and zoom
            </p>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        
        {renderScene()}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3DSimple;
