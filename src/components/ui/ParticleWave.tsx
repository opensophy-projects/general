"use client";
import React, { useEffect, useRef, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ParticleWaveProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  noiseScale?: number;
  gridSize?: number;
  isNegative?: boolean;
}

export const ParticleWave = forwardRef<HTMLDivElement, ParticleWaveProps>(({
  className,
  speed = 0.5,
  noiseScale = 4.0,
  gridSize = 1.0,
  isNegative = false,
  children,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const glContextRef = useRef<WebGLRenderingContext | null>(null);
  const configRef = useRef({ speed, noiseScale, gridSize, isNegative });
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    configRef.current = { speed, noiseScale, gridSize, isNegative };
  }, [speed, noiseScale, gridSize, isNegative]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnimating(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = globalThis.innerWidth;
        canvas.height = globalThis.innerHeight;
      }, 100);
    };

    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
    globalThis.addEventListener('resize', handleResize);

    const gl = canvas.getContext("webgl", { 
      preserveDrawingBuffer: false,
      antialias: false,
      powerPreference: "low-power",
      alpha: true,
      depth: false,
      stencil: false,
      failIfMajorPerformanceCaveat: true
    });
    
    if (!gl) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    glContextRef.current = gl;

    const vertexShader = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_speed;
      uniform float u_noiseScale;
      uniform float u_gridSize;
      uniform vec3 u_colorShadow;
      uniform vec3 u_colorHighlight;

      float rand(vec2 p) {
        return fract(sin(dot(p, vec2(12.543, 514.123))) * 4732.12);
      }

      float noise(vec2 p) {
        vec2 f = smoothstep(0.0, 1.0, fract(p));
        vec2 i = floor(p);
        
        float a = rand(i);
        float b = rand(i + vec2(1.0, 0.0));
        float c = rand(i + vec2(0.0, 1.0));
        float d = rand(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 fragCoord = vUv * u_resolution;
        vec2 uv = fragCoord / u_resolution.y;
        vec2 uvp = fragCoord / u_resolution.xy;
        
        float timeAdjusted = u_time * u_speed;
        
        uv += 0.75 * noise(uv * 3.0 + timeAdjusted / 2.0 + noise(uv * 7.0 - timeAdjusted / 3.0) / 2.0) / 2.0;
        
        float grid = (mod(floor((uvp.x) * u_resolution.x / u_gridSize), 2.0) == 0.0 ? 1.0 : 0.0) *
                     (mod(floor((uvp.y) * u_resolution.y / u_gridSize), 2.0) == 0.0 ? 1.0 : 0.0);
        
        vec3 col = mix(u_colorShadow, u_colorHighlight,
                       5.0 * vec3(pow(1.0 - noise(uv * u_noiseScale - vec2(0.0, timeAdjusted / 2.0)), 5.0)));
        
        col = pow(col, vec3(1.0));
        
        float alpha = grid;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vShader = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fShader = compileShader(fragmentShader, gl.FRAGMENT_SHADER);

    if (!vShader || !fShader) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    const positionLocation = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const speedLocation = gl.getUniformLocation(program, "u_speed");
    const noiseScaleLocation = gl.getUniformLocation(program, "u_noiseScale");
    const gridSizeLocation = gl.getUniformLocation(program, "u_gridSize");
    const colorShadowLocation = gl.getUniformLocation(program, "u_colorShadow");
    const colorHighlightLocation = gl.getUniformLocation(program, "u_colorHighlight");

    let startTime = Date.now();
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      if (!isAnimating) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = currentTime;
      const config = configRef.current;
      const time = (Date.now() - startTime) / 1000;

      // Color palettes
      const darkShadow = [0.035, 0.035, 0.043];
      const darkHighlight = [0.055, 0.059, 0.075];
      const lightShadow = [0.98, 0.98, 0.988];
      const lightHighlight = [0.9, 0.9, 0.91];

      const colorShadow = config.isNegative ? darkShadow : lightShadow;
      const colorHighlight = config.isNegative ? darkHighlight : lightHighlight;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(speedLocation, config.speed);
      gl.uniform1f(noiseScaleLocation, config.noiseScale);
      gl.uniform1f(gridSizeLocation, config.gridSize);
      gl.uniform3f(colorShadowLocation, colorShadow[0], colorShadow[1], colorShadow[2]);
      gl.uniform3f(colorHighlightLocation, colorHighlight[0], colorHighlight[1], colorHighlight[2]);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimeout);
      globalThis.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (program) {
        gl.deleteProgram(program);
      }
    };
  }, [isAnimating]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {children}
    </div>
  );
});

ParticleWave.displayName = "ParticleWave";