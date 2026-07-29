import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroScene3DProps {
  accent: string;
}

const HeroScene3D = ({ accent }: HeroScene3DProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    const color = new THREE.Color(accentColor || "#06b6d4");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduceMotion });
    } catch {
      return;
    }
    const pointer = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const clock = new THREE.Clock();
    let frameId = 0;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduceMotion ? 1 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    camera.position.set(0, 0, 7.5);

    const rig = new THREE.Group();
    rig.position.set(1.9, 0.1, 0);
    scene.add(rig);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 2),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color.clone().multiplyScalar(0.18),
        metalness: 0.45,
        roughness: 0.34,
        flatShading: true,
        transparent: true,
        opacity: 0.7,
      }),
    );
    rig.add(core);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.72, 2)),
      new THREE.LineBasicMaterial({ color: color.clone().lerp(new THREE.Color("#ffffff"), 0.35), transparent: true, opacity: 0.48 }),
    );
    rig.add(wireframe);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.018, 8, 120),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 }),
    );
    halo.rotation.set(0.95, 0.35, -0.45);
    rig.add(halo);

    const innerHalo = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#a5f3fc"), transparent: true, opacity: 0.32 }),
    );
    innerHalo.rotation.set(-0.55, 0.6, 0.25);
    rig.add(innerHalo);

    const starCount = 180;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 2.6 + ((i * 37) % 100) / 25;
      const theta = i * 2.399963229728653;
      const z = (((i * 53) % 100) / 100 - 0.5) * 2.8;
      starPositions[i * 3] = Math.cos(theta) * radius;
      starPositions[i * 3 + 1] = Math.sin(theta) * radius;
      starPositions[i * 3 + 2] = z;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color, size: 0.035, transparent: true, opacity: 0.7, sizeAttenuation: true }),
    );
    rig.add(stars);

    const keyLight = new THREE.PointLight(color, 18, 18);
    keyLight.position.set(2.5, 2, 4);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight("#818cf8", 10, 16);
    fillLight.position.set(-3, -1.5, 3);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight("#ffffff", 1.4));

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
      targetRotation.set(pointer.y * 0.38, pointer.x * 0.52);
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      rig.rotation.x += (targetRotation.x - rig.rotation.x) * 0.04;
      rig.rotation.y += (targetRotation.y + elapsed * 0.16 - rig.rotation.y) * 0.035;
      core.rotation.y = elapsed * 0.24;
      core.rotation.z = elapsed * 0.1;
      wireframe.rotation.y = -elapsed * 0.18;
      halo.rotation.z = elapsed * 0.16;
      innerHalo.rotation.z = -elapsed * 0.12;
      stars.rotation.z = elapsed * 0.045;
      rig.position.y = 0.12 + Math.sin(elapsed * 0.7) * 0.12;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      render();
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      wireframe.geometry.dispose();
      (wireframe.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      innerHalo.geometry.dispose();
      (innerHalo.material as THREE.Material).dispose();
      starsGeometry.dispose();
      (stars.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [accent]);

  return <div ref={hostRef} className="hero-scene-3d" aria-hidden="true" />;
};

export default HeroScene3D;
