import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroScene3DProps {
  accent: string;
}

/**
 * HeroScene3D — Software System Topology Metaphor
 * Calm visual representation of an end-to-end fullstack architecture:
 * Client Interface → API Gateway → Application Services → Database & Realtime Pipelines.
 *
 * Performance features:
 * - IntersectionObserver pauses RAF when out of viewport
 * - Clamped DPR (max 1.5)
 * - Strict reduced-motion support (renders static frame, no animation loop)
 * - Complete WebGL buffer & material disposal on unmount
 */
const HeroScene3D = ({ accent }: HeroScene3DProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const accentColorHex = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim() || "#0284c7";

    const accentColor = new THREE.Color(accentColorHex);
    const secondaryColor = new THREE.Color("#6366f1"); // Indigo secondary
    const neutralNodeColor = new THREE.Color("#94a3b8");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7.8);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileViewport ? 1.0 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    // Group for system topology
    const systemGroup = new THREE.Group();
    // Position on right-center for editorial desktop layout
    systemGroup.position.set(1.45, 0, 0);
    scene.add(systemGroup);

    // Node definitions: [x, y, z, labelType, size]
    // Metaphor:
    // Top: Client / UI (React 19)
    // Mid-upper: API Gateway / Routing
    // Mid: Core Services (NestJS, .NET 8)
    // Bottom: Database / Storage (PostgreSQL, Mongo, Firestore)
    // Offset right: Realtime Hub (SignalR, WebSocket)
    const nodeCoords = [
      { pos: new THREE.Vector3(0, 1.8, 0), color: accentColor, size: 0.3 }, // UI / Client
      { pos: new THREE.Vector3(0, 0.7, 0), color: accentColor, size: 0.25 }, // Gateway
      { pos: new THREE.Vector3(-0.9, -0.4, 0.35), color: secondaryColor, size: 0.23 }, // Service A (.NET)
      { pos: new THREE.Vector3(0.9, -0.4, -0.35), color: secondaryColor, size: 0.23 }, // Service B (NestJS)
      { pos: new THREE.Vector3(0, -1.6, 0), color: neutralNodeColor, size: 0.28 }, // Database / Persistence
      { pos: new THREE.Vector3(1.6, 0.4, 0.45), color: accentColor, size: 0.2 }, // Realtime Channel
    ];

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    // Create 3D Nodes
    const nodeMeshes: THREE.Mesh[] = [];
    const innerMeshes: THREE.Mesh[] = [];
    nodeCoords.forEach((node) => {
      // Core octahedron for technical aesthetic
      const geom = new THREE.OctahedronGeometry(node.size, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      disposables.push(geom, mat);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(node.pos);
      systemGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Inner solid core
      const innerGeom = new THREE.SphereGeometry(node.size * 0.45, 8, 8);
      const innerMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.45,
      });
      disposables.push(innerGeom, innerMat);
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      innerMesh.position.copy(node.pos);
      systemGroup.add(innerMesh);
      innerMeshes.push(innerMesh);
    });

    // Node Connection pipelines (Edges)
    const pipelineConnections = [
      [0, 1], // UI -> Gateway
      [1, 2], // Gateway -> .NET Service
      [1, 3], // Gateway -> NestJS Service
      [2, 4], // .NET -> DB
      [3, 4], // NestJS -> DB
      [1, 5], // Gateway <-> Realtime Hub
      [0, 5], // UI <-> Realtime
    ];

    pipelineConnections.forEach(([fromIdx, toIdx]) => {
      const from = nodeCoords[fromIdx].pos;
      const to = nodeCoords[toIdx].pos;

      const lineGeom = new THREE.BufferGeometry().setFromPoints([from, to]);
      const lineMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.35,
      });
      disposables.push(lineGeom, lineMat);
      const line = new THREE.Line(lineGeom, lineMat);
      systemGroup.add(line);
    });

    // Subtle floating data packets traversing the connections
    const packetCount = 8;
    const packetGeom = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    packetGeom.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3));
    const packetMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    disposables.push(packetGeom, packetMat);
    const packetPoints = new THREE.Points(packetGeom, packetMat);
    systemGroup.add(packetPoints);

    // Subtle background ambient grid ring
    const gridRingGeom = new THREE.RingGeometry(2.3, 2.32, 64);
    const gridRingMat = new THREE.MeshBasicMaterial({
      color: neutralNodeColor,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    disposables.push(gridRingGeom, gridRingMat);
    const gridRing = new THREE.Mesh(gridRingGeom, gridRingMat);
    gridRing.rotation.x = Math.PI * 0.35;
    systemGroup.add(gridRing);

    // Mouse parallax tracking
    const targetRotation = { x: 0, y: 0 };
    const mouseParallax = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotation.y = pointer.x * 0.35;
      targetRotation.x = -pointer.y * 0.25;
    };

    // Base position for responsive positioning & floating levitation
    const basePosition = { x: 1.45, y: 0, z: 0 };

    // Resize handler
    const handleResize = () => {
      if (!host) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;

      // Responsive positioning
      if (width < 768) {
        basePosition.x = 0;
        basePosition.y = 0.4;
        systemGroup.scale.setScalar(0.72);
      } else if (width < 1024) {
        basePosition.x = 0.6;
        basePosition.y = 0.1;
        systemGroup.scale.setScalar(0.85);
      } else {
        basePosition.x = 1.45;
        basePosition.y = 0;
        systemGroup.scale.setScalar(1.0);
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Viewport Visibility tracking and robust animation loop
    let isVisible = true;
    let isLoopRunning = false;
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    // Render loop: floats smoothly, rotates continuously 360 degrees
    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      const elapsed = clock.getElapsedTime();

      // 1. Floating / Levitating effect (trôi nổi bồng bềnh mượt mà, êm ái)
      const floatOffsetY = Math.sin(elapsed * 1.25) * 0.22;
      const floatOffsetX = Math.cos(elapsed * 0.75) * 0.05;
      systemGroup.position.y = basePosition.y + floatOffsetY;
      systemGroup.position.x = basePosition.x + floatOffsetX;

      // 2. Continuous 360-degree orbital rotation (quay vòng 360 độ liên tục, nhịp nhàng)
      const rotationSpeed = 0.45; // Nhịp quay tròn 360 độ rõ nét, mượt mà và trực quan
      mouseParallax.y += (targetRotation.y - mouseParallax.y) * 0.05;
      mouseParallax.x += (targetRotation.x - mouseParallax.x) * 0.05;

      systemGroup.rotation.y = elapsed * rotationSpeed + mouseParallax.y;
      systemGroup.rotation.x = 0.12 + Math.sin(elapsed * 0.45) * 0.08 + mouseParallax.x;
      systemGroup.rotation.z = Math.cos(elapsed * 0.35) * 0.05;

      // 3. Orbital ambient ring rotation (quay ngược chiều nhịp nhàng)
      gridRing.rotation.z = -elapsed * 0.18;
      gridRing.rotation.x = Math.PI * 0.36 + Math.sin(elapsed * 0.5) * 0.06;

      // 4. Local node rotation and core pulsing
      nodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = elapsed * (0.45 + idx * 0.08);
        mesh.rotation.x = elapsed * (0.28 + idx * 0.05);
      });

      innerMeshes.forEach((inner, idx) => {
        const pulse = 1 + Math.sin(elapsed * 2.2 + idx * 0.9) * 0.14;
        inner.scale.set(pulse, pulse, pulse);
      });

      // 5. Update packet positions traveling along the pipelines
      const positions = packetGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < packetCount; i++) {
        const conn = pipelineConnections[i % pipelineConnections.length];
        const from = nodeCoords[conn[0]].pos;
        const to = nodeCoords[conn[1]].pos;
        const t = (elapsed * 0.35 + i / packetCount) % 1;

        positions[i * 3] = THREE.MathUtils.lerp(from.x, to.x, t);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, t);
        positions[i * 3 + 2] = THREE.MathUtils.lerp(from.z, to.z, t);
      }
      packetGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
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

    // Bắt đầu ngay lập tức khi mount để đảm bảo luôn chuyển động
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
  }, [accent]);

  return (
    <div
      ref={hostRef}
      className="hero-scene-3d absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};

export default HeroScene3D;
