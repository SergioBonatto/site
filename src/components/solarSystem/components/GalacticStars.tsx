"use client";
import React, { useRef, useEffect } from "react";
import type p5 from "p5";

const STAR_CONFIG = {
  COUNT: 500,
  MIN_RADIUS: 10,
  MAX_RADIUS: 1080,
  MIN_BRIGHTNESS: 150,
  MAX_BRIGHTNESS: 255,
  VELOCITY: -0.0005,
  SIZE: 1
} as const;

export const GalacticStars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("p5").then((p5Module) => {
      const p5 = p5Module.default;
      let resizeHandler: () => void;

      const sketch = (p: p5) => {
        let stars: Star[] = [];

        class Star {
          pos: p5.Vector;
          vel: number;
          brightness: number;

          constructor(p: p5) {
            let angle = p.random(p.TWO_PI);
            let radius = p.random(STAR_CONFIG.MIN_RADIUS, STAR_CONFIG.MAX_RADIUS);
            this.pos = p.createVector(
              p.cos(angle) * radius,
              p.sin(angle) * radius
            );
            this.vel = STAR_CONFIG.VELOCITY;
            this.brightness = p.random(
              STAR_CONFIG.MIN_BRIGHTNESS,
              STAR_CONFIG.MAX_BRIGHTNESS
            );
          }

          update(p: p5) {
            let angle = p.atan2(this.pos.y, this.pos.x);
            let radius = this.pos.mag();
            angle += this.vel;
            this.pos.x = p.cos(angle) * radius;
            this.pos.y = p.sin(angle) * radius;
          }

          show(p: p5) {
            p.noStroke();
            p.fill(this.brightness);
            p.ellipse(this.pos.x, this.pos.y, STAR_CONFIG.SIZE, STAR_CONFIG.SIZE);
          }
        }

        resizeHandler = () => {
          // Usa as dimensões reais do container
          const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
          const containerHeight = containerRef.current?.clientHeight || window.innerHeight;
          p.resizeCanvas(containerWidth, containerHeight);
        };

        p.setup = () => {
          // Usa as dimensões reais do container
          const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
          const containerHeight = containerRef.current?.clientHeight || window.innerHeight;
          p.createCanvas(containerWidth, containerHeight).parent(containerRef.current!);

          for (let i = 0; i < STAR_CONFIG.COUNT; i++) {
            stars.push(new Star(p));
          }

          window.addEventListener('resize', resizeHandler);
        };

        p.draw = () => {
          p.background(0, 20);
          // Centraliza baseado nas dimensões atuais do canvas
          p.translate(p.width / 2, p.height / 2);

          for (let star of stars) {
            star.update(p);
            star.show(p);
          }
        };
      };

      const p5Instance = new p5(sketch);

      return () => {
        window.removeEventListener('resize', resizeHandler);
        p5Instance.remove();
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '110%' }}
    />
  );
};
