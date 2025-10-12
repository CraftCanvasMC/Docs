'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import type { HTMLAttributes } from 'react';

interface BackingProps extends HTMLAttributes<HTMLDivElement> {
  layers?: number;
  points?: number;
  speed?: number;
  pulseSpeed?: number;
  frozen?: boolean;
}

function randomHSL(hMin: number, hMax: number, sMin = 80, sMax = 100, lMin = 40, lMax = 60) {
  const h = Math.floor(Math.random() * (hMax - hMin) + hMin);
  const s = Math.floor(Math.random() * (sMax - sMin) + sMin);
  const l = Math.floor(Math.random() * (lMax - lMin) + lMin);
  return { h, s, l };
}

function createGradients(layers: number) {
  return Array.from({ length: layers }, () => ({
    from: randomHSL(250, 280),
    via: randomHSL(180, 210),
    to: randomHSL(270, 300),
    angle: Math.random() * 360,
  }));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function generatePoints(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    xTarget: Math.random() * 100,
    yTarget: Math.random() * 100,
  }));
}

export default function Backing({
  layers = 3,
  points = 20,
  speed = 0.00005,
  pulseSpeed = 0.0003,
  frozen = false,
  className,
  ...props
}: BackingProps) {
  const [gradientColors, setGradientColors] = useState(() => createGradients(layers));
  const [polyPoints, setPolyPoints] = useState(() => generatePoints(points));
  const [pulse, setPulse] = useState(0.85);

  const animationRef = useRef<number>();
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / 30;

  useEffect(() => {
    if (frozen) return;

    let lastTime = performance.now();

    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaSinceLastFrame = time - lastFrameTime.current;
      if (deltaSinceLastFrame < frameInterval) return;

      const delta = time - lastTime;
      lastTime = time;
      lastFrameTime.current = time;

      setGradientColors((prev) =>
        prev.map((g) => ({ ...g, angle: (g.angle + delta * speed * 0.1) % 360 }))
      );

      setPolyPoints((prev) =>
        prev.map((p) => {
          let { x, y, xTarget, yTarget } = p;
          x = lerp(x, xTarget, speed * delta);
          y = lerp(y, yTarget, speed * delta);

          if (Math.abs(x - xTarget) < 0.5) xTarget = Math.random() * 100;
          if (Math.abs(y - yTarget) < 0.5) yTarget = Math.random() * 100;

          return { x, y, xTarget, yTarget };
        })
      );

      setPulse(Math.sin(time * pulseSpeed) * 0.15 + 0.85);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [speed, pulseSpeed, frozen]);

  const gradientStyle = gradientColors
    .map(
      (g) =>
        `linear-gradient(${g.angle}deg, hsl(${g.from.h},${g.from.s}%,${g.from.l}%) 0%, hsl(${g.via.h},${g.via.s}%,${g.via.l}%) 50%, hsl(${g.to.h},${g.to.s}%,${g.to.l}%) 100%)`
    )
    .join(', ');

  const polygonString = polyPoints.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', ');

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 -z-10 transform-gpu overflow-hidden blur-3xl',
        className
      )}
      {...props}
    >
      <div
        className="absolute w-full h-full transition-opacity duration-700"
        style={{
          background: gradientStyle,
          clipPath: `polygon(${polygonString})`,
          opacity: 0.125,
        }}
      />
    </div>
  );
}
