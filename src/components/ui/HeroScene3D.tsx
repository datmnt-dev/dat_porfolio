import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroScene3DProps {
  accent: string;
  theme: "light" | "dark";
}

const ACCENT_PALETTE: Record<"light" | "dark", Record<string, string>> = {
  light: {
    cyan: "#0284c7",
    green: "#059669",
    purple: "#7c3aed",
    amber: "#b45309",
  },
  dark: {
    cyan: "#06b6d4",
    green: "#10b981",
    purple: "#8b5cf6",
    amber: "#f59e0b",
  },
};

/**
 * HeroScene3D — Software System Topology Metaphor
 * Theme-aware 3D full-stack architecture visualization:
 * Client Interface → API Gateway → Application Services → Database & Realtime Pipelines.
 */
const HeroScene3D = ({ accent, theme }: HeroScene3DProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isLight = theme === "light";
    const accentHex =
      ACCENT_PALETTE[theme][accent] ||
      (isLight ? "#0284c7" : "#06b6d4");

    const accentColor = new THREE.Color(accentHex);
    const secondaryColor = new THREE.Color(isLight ? "#4f46e5" : "#818cf8");
    const neutralNodeColor = new THREE.Color(isLight ? "#475569" : "#94a3b8");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 8.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const isMobileViewport = window.innerWidth < 768;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobileViewport ? 1.5 : 2)
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const systemGroup = new THREE.Group();
    systemGroup.position.set(2.05, 0, 0);
    scene.add(systemGroup);

    const nodeCoords = [
      { pos: new THREE.Vector3(0, 1.75, 0), color: accentColor, size: 0.3 }, // UI / Client
      { pos: new THREE.Vector3(0, 0.65, 0), color: accentColor, size: 0.25 }, // Gateway
      { pos: new THREE.Vector3(-0.88, -0.45, 0.35), color: secondaryColor, size: 0.23 }, // Service A (.NET)
      { pos: new THREE.Vector3(0.88, -0.45, -0.35), color: secondaryColor, size: 0.23 }, // Service B (NestJS)
      { pos: new THREE.Vector3(0, -1.6, 0), color: neutralNodeColor, size: 0.27 }, // Persistence
      { pos: new THREE.Vector3(1.52, 0.35, 0.42), color: accentColor, size: 0.2 }, // Realtime Channel
    ];

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    const nodeMeshes: THREE.Mesh[] = [];
    const innerMeshes: THREE.Mesh[] = [];
    nodeCoords.forEach((node) => {
      const geom = new THREE.OctahedronGeometry(node.size, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: isLight ? 0.92 : 0.9,
      });
      disposables.push(geom, mat);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(node.pos);
      systemGroup.add(mesh);
      nodeMeshes.push(mesh);

      const innerGeom = new THREE.SphereGeometry(node.size * 0.44, 12, 12);
      const innerMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: isLight ? 0.36 : 0.48,
      });
      disposables.push(innerGeom, innerMat);
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      innerMesh.position.copy(node.pos);
      systemGroup.add(innerMesh);
      innerMeshes.push(innerMesh);
    });

    const pipelineConnections = [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [1, 5],
      [0, 5],
    ];

    pipelineConnections.forEach(([fromIdx, toIdx]) => {
      const from = nodeCoords[fromIdx].pos;
      const to = nodeCoords[toIdx].pos;

      const lineGeom = new THREE.BufferGeometry().setFromPoints([from, to]);
      const lineMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: isLight ? 0.54 : 0.42,
      });
      disposables.push(lineGeom, lineMat);
      const line = new THREE.Line(lineGeom, lineMat);
      systemGroup.add(line);
    });

    // Data packets traveling along pipelines
    const packetCount = 10;
    const packetGeom = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    packetGeom.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3));
    const packetMat = new THREE.PointsMaterial({
      color: accentColor,
      size: isLight ? 0.1 : 0.085,
      transparent: true,
      opacity: 0.95,
    });
    disposables.push(packetGeom, packetMat);
    const packetPoints = new THREE.Points(packetGeom, packetMat);
    systemGroup.add(packetPoints);

    // Dual precision orbital rings for cleaner architectural depth
    const outerRingGeom = new THREE.RingGeometry(2.22, 2.245, 80);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: neutralNodeColor,
      transparent: true,
      opacity: isLight ? 0.25 : 0.18,
      side: THREE.DoubleSide,
    });
    disposables.push(outerRingGeom, outerRingMat);
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI * 0.35;
    systemGroup.add(outerRing);

    const innerRingGeom = new THREE.RingGeometry(1.52, 1.535, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: isLight ? 0.18 : 0.14,
      side: THREE.DoubleSide,
    });
    disposables.push(innerRingGeom, innerRingMat);
    const innerRing = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerRing.rotation.x = Math.PI * 0.42;
    innerRing.rotation.y = Math.PI * 0.15;
    systemGroup.add(innerRing);

    // Mouse parallax tracking
    const targetRotation = { x: 0, y: 0 };
    const mouseParallax = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotation.y = pointer.x * 0.3;
      targetRotation.x = -pointer.y * 0.22;
    };

    const basePosition = { x: 2.05, y: 0, z: 0 };

    const handleResize = () => {
      if (!host) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;

      if (width < 768) {
        basePosition.x = 0;
        basePosition.y = 0.45;
        systemGroup.scale.setScalar(0.66);
      } else if (width < 1024) {
        basePosition.x = 1.45;
        basePosition.y = 0.08;
        systemGroup.scale.setScalar(0.76);
      } else if (width < 1280) {
        basePosition.x = 1.85;
        basePosition.y = 0;
        systemGroup.scale.setScalar(0.88);
      } else {
        basePosition.x = 2.08;
        basePosition.y = 0;
        systemGroup.scale.setScalar(0.96);
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isVisible = true;
    let isLoopRunning = false;
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      const elapsed = clock.getElapsedTime();

      const floatOffsetY = Math.sin(elapsed * 1.15) * 0.18;
      const floatOffsetX = Math.cos(elapsed * 0.7) * 0.04;
      systemGroup.position.y = basePosition.y + floatOffsetY;
      systemGroup.position.x = basePosition.x + floatOffsetX;

      const rotationSpeed = 0.4;
      mouseParallax.y += (targetRotation.y - mouseParallax.y) * 0.05;
      mouseParallax.x += (targetRotation.x - mouseParallax.x) * 0.05;

      systemGroup.rotation.y = elapsed * rotationSpeed + mouseParallax.y;
      systemGroup.rotation.x = 0.12 + Math.sin(elapsed * 0.42) * 0.07 + mouseParallax.x;
      systemGroup.rotation.z = Math.cos(elapsed * 0.32) * 0.04;

      outerRing.rotation.z = -elapsed * 0.16;
      outerRing.rotation.x = Math.PI * 0.36 + Math.sin(elapsed * 0.45) * 0.05;
      innerRing.rotation.z = elapsed * 0.22;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = elapsed * (0.42 + idx * 0.07);
        mesh.rotation.x = elapsed * (0.25 + idx * 0.04);
      });

      innerMeshes.forEach((inner, idx) => {
        const pulse = 1 + Math.sin(elapsed * 2.1 + idx * 0.9) * 0.13;
        inner.scale.set(pulse, pulse, pulse);
      });

      const positions = packetGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < packetCount; i++) {
        const conn = pipelineConnections[i % pipelineConnections.length];
        const from = nodeCoords[conn[0]].pos;
        const to = nodeCoords[conn[1]].pos;
        const t = (elapsed * 0.34 + i / packetCount) % 1;

        positions[i * 3] = THREE.MathUtils.lerp(from.x, to.x, t);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, t);
        positions[i * 3 + 2] = THREE.MathUtils.lerp(from.z, to.z, t);
      }
      packetGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }
      if (!isLoopRunning) {
        isLoopRunning = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(host);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [accent, theme]);

  return (
    <div
      ref={hostRef}
      className="hero-scene-3d absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default HeroScene3D;
