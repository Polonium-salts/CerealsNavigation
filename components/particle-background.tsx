"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  // 烟花粒子配置
  const fireworksOptions: ISourceOptions = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#ff69b4"],
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.3, max: 1 },
          anim: {
            enable: true,
            speed: 3,
            opacity_min: 0,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "star"],
        },
        size: {
          value: { min: 1, max: 8 },
          anim: {
            enable: true,
            speed: 5,
            size_min: 0.1,
            sync: false,
          },
        },
        life: {
          duration: {
            sync: false,
            value: 3,
          },
          count: 0,
          delay: {
            random: {
              enable: true,
              minimumValue: 0.5,
            },
            value: 1,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const options: ISourceOptions = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? ["#FFFFFF", "#FFD700", "#ADD8E6", "#87CEEB", "#FFFFFF"] : "#000000",
        },
        links: {
          color: "random",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 100,
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "star",
        },
        size: {
          value: { min: 1, max: 3 },
          anim: {
            enable: true,
            speed: 3,
            size_min: 0.1,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  const snowOptions: ISourceOptions = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#a0a0a0",
        },
        move: {
          direction: "bottom",
          enable: true,
          outModes: {
            default: "out",
          },
          size: true,
          speed: {
            min: 0.5,
            max: 2,
          },
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 500,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // 根据主题选择粒子效果
  const getParticleOptions = () => {
    if (theme === "dark") {
      return options; // 星空效果
    } else {
      // 默认使用雪花效果，避免Math.random()导致的水合不匹配
      return snowOptions;
    }
  };

  // 确保只在客户端挂载后渲染，避免水合不匹配
  if (!mounted || !init) {
    return <></>;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={getParticleOptions()}
    />
  );
};