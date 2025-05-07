import React from 'react';
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const ParticleBackground = React.memo(() => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent"
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 60,
          },
          opacity: {
            value: { min: 0.2, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.2,
            },
          },
          size: {
            value: { min: 1, max: 2 },
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 0.5,
          },
        },
      }}
    />
  );
});

export default ParticleBackground;