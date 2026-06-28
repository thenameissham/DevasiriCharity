"use client";

import { useEffect, useRef } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function InteractiveConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const { reducedMotion } = useMotionExperience();

  useEffect(() => {
    if (reducedMotion) return;

    const currentCanvas = canvasRef.current;

    if (currentCanvas === null) return;

    const canvas: HTMLCanvasElement = currentCanvas;
    const context = canvas.getContext("2d");

    if (context === null) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(72, Math.max(34, Math.floor(width / 24)));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 1.8 + 0.7
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.2,
        0,
        width * 0.5,
        height * 0.2,
        width * 0.8
      );

      gradient.addColorStop(0, "rgba(37, 99, 235, 0.08)");
      gradient.addColorStop(0.45, "rgba(6, 182, 212, 0.05)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (pointer.current.active) {
          const dx = pointer.current.x - particle.x;
          const dy = pointer.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180 && distance > 1) {
            particle.x -= dx * 0.0008;
            particle.y -= dy * 0.0008;
          }
        }

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.fillStyle = "rgba(37, 99, 235, 0.34)";
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];

          if (!a || !b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            context.strokeStyle = `rgba(37, 99, 235, ${
              (1 - distance / 130) * 0.12
            })`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: event.clientX,
        y: event.clientY,
        active: true
      };
    };

    const handlePointerLeave = () => {
      pointer.current.active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.08),transparent_45%)]"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
