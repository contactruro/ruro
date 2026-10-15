"use client";

import { useEffect, useRef, useState } from "react";

/* A bank of volumetric-looking clouds, drawn live in a fragment shader (plain WebGL, no extra dependency).

   Three layers sit at different distances: a far, pale and slightly blue one; a middle cream one; and a near,
   brighter one with warm highlights and peach shadows. Each is domain-warped fractal noise whose slope gives it
   light: the sun comes from the upper left, so raised edges catch warm white and the cores fall into soft shadow.
   Layers drift at different speeds, which is the parallax. The bank rises from the bottom edge and thins to
   nothing toward the top, with soft sides and base, so it can sit at the foot of any section.

   It renders at reduced resolution (clouds are soft), only while on screen, at a capped frame rate, and once
   (a still) under reduced motion. Without WebGL it falls back to layered gradients. */

const VERT = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime; uniform float uSeed; uniform float uReach; uniform float uFade;

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x), f.y);
}
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }

float dens(vec2 p, float t){
  vec2 q = vec2(fbm(p+vec2(0.,t*.03)), fbm(p+vec2(5.2,1.3)-vec2(t*.02,0.)));
  return fbm(p + 1.7*q + vec2(t*.015,0.));
}

/* One cloud layer: coverage rises toward the bottom; light from the upper left. */
vec4 layer(vec2 uv, float scale, float speed, float reach, float off, vec3 hi, vec3 mid, vec3 sh, float soft){
  vec2 p = vec2(uv.x*uRes.x/uRes.y, uv.y)*scale + vec2(off+uSeed, 0.);
  float t = uTime*speed;
  float e = 0.035;
  float d  = dens(p, t);
  float dy = dens(p+vec2(0.,e), t) - d;
  float dx = dens(p+vec2(e,0.), t) - d;
  float field = d + (reach - uv.y)*1.25;
  float cover = smoothstep(0.62-soft, 0.78+soft, field);
  // raised, upward-and-leftward-facing surfaces catch the light; the rest fall into shadow
  float lit = clamp(0.5 + (dy*1.0 - dx*0.55)/e*0.2, 0., 1.);
  float inner = smoothstep(0.42, 0.95, d);
  vec3 col = mix(mid, hi, lit);
  col = mix(col, sh, inner*(1.-lit)*0.95);
  col = mix(col, hi, (1.0 - smoothstep(0.62, 0.78, field))*0.5);          // bright rim where the cloud thins
  float a = cover;
  a *= 1.0 - smoothstep(0.5, 1.05, uv.y + (1.-reach)*0.35);             // thins to nothing toward the top
  a *= smoothstep(0.0, 0.10, uv.x) * (1.0 - smoothstep(0.90, 1.0, uv.x)); // soft sides
  a *= smoothstep(0.0, max(uFade, 0.001), uv.y);                  // soft base
  return vec4(col*a, a);
}

void main(){
  vec2 uv = vUv;
  vec4 cFar  = layer(uv, 1.7,  0.55, uReach+0.18, 11.0, vec3(.95,.96,.99), vec3(.86,.89,.94), vec3(.66,.73,.85), 0.06);
  vec4 cMid  = layer(uv, 1.2,  0.85, uReach+0.04, 3.0,  vec3(1.,.97,.91),  vec3(.95,.89,.81), vec3(.78,.68,.64), 0.04);
  vec4 cNear = layer(uv, 0.85, 1.2,  uReach-0.08, 7.0,  vec3(1.,.985,.94), vec3(.96,.88,.79), vec3(.74,.57,.54), 0.03);
  vec4 c = cFar;
  c = cMid + c*(1.-cMid.a);
  c = cNear + c*(1.-cNear.a);
  gl_FragColor = c;
}`;

export function CloudBank({
  className = "",
  reach = 0.42,
  seed = 0,
  fps = 30,
  fade = 0.16,
}: {
  className?: string;
  /** How high the bank rises, 0 to 1 of the canvas height. */
  reach?: number;
  seed?: number;
  fps?: number;
  /** Fraction of the height over which the base fades out (0 keeps it solid). */
  fade?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    // Everything below (the graphics context, compiling the shader, the first draw) is the costliest thing on the page
    // to start, and the clouds sit far down it. So it starts only when the visitor has scrolled to within a screen or so
    // of them, by which time it is ready before they come into view.
    const init = (): (() => void) | undefined => {
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) {
      setFallback(true);
      return;
    }
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uSeed = gl.getUniformLocation(prog, "uSeed");
    const uReach = gl.getUniformLocation(prog, "uReach");
    const uFade = gl.getUniformLocation(prog, "uFade");
    gl.clearColor(0, 0, 0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    let last = 0;
    const t0 = performance.now() - 14000;

    const size = () => {
      const scale = Math.min(0.6, 900 / Math.max(cv.clientWidth, 1));
      const w = Math.max(2, Math.round(cv.clientWidth * scale));
      const h = Math.max(2, Math.round(cv.clientHeight * scale));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = (now: number) => {
      size();
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uTime, reduce ? 14 : (now - t0) / 1000);
      gl.uniform1f(uSeed, seed);
      gl.uniform1f(uReach, reach);
      gl.uniform1f(uFade, fade);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (now - last >= 1000 / fps) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    draw(performance.now());
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "120px" },
    );
    io.observe(cv);
    const onResize = () => draw(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    };
    let stop: (() => void) | undefined;
    let waiting: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "undefined") {
      stop = init();
    } else {
      waiting = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          waiting?.disconnect();
          stop = init();
        },
        { rootMargin: "1000px 0px" },
      );
      waiting.observe(cv);
    }
    return () => {
      waiting?.disconnect();
      stop?.();
    };
  }, [reach, seed, fps, fade]);

  if (fallback) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            "radial-gradient(60% 55% at 20% 100%, rgba(255,250,240,0.95), transparent 70%), radial-gradient(55% 50% at 60% 105%, rgba(247,236,222,0.95), transparent 70%), radial-gradient(50% 45% at 92% 100%, rgba(238,226,214,0.9), transparent 70%)",
        }}
      />
    );
  }
  return <canvas ref={ref} aria-hidden className={className} />;
}
