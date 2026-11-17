import { useEffect, useRef, useState } from 'preact/hooks';
import * as THREE from 'three';
import type { RoutingEngineResult } from '../engines/routingEngine';

type Routing3DCanvasProps = {
  result: RoutingEngineResult;
};

const NODE_X = [-3.6, -1.2, 1.2, 3.6];

export default function Routing3DCanvas({ result }: Routing3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;

    try {
      const width = container.clientWidth || 560;
      const height = 230;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 2.2, 7.6);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.replaceChildren(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.85);
      const keyLight = new THREE.DirectionalLight(0x93c5fd, 1.1);
      keyLight.position.set(4, 6, 5);
      scene.add(ambient, keyLight);

      const nodeGroup = new THREE.Group();
      scene.add(nodeGroup);

      result.hops.forEach((hop, idx) => {
        const color =
          hop.status === 'pass' ? 0x10b981 : hop.status === 'blocked' ? 0xef4444 : 0x64748b;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(1.15, 0.9, 1.15),
          new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25 }),
        );
        box.position.set(NODE_X[idx], 0, 0);
        nodeGroup.add(box);
      });

      const linePoints = NODE_X.map((x) => new THREE.Vector3(x, 0, 0));
      const track = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        new THREE.LineBasicMaterial({ color: 0x38bdf8 }),
      );
      nodeGroup.add(track);

      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 20, 20),
        new THREE.MeshStandardMaterial({
          color: result.allowed ? 0x34d399 : 0xf87171,
          emissive: result.allowed ? 0x059669 : 0xb91c1c,
          emissiveIntensity: 0.7,
        }),
      );
      nodeGroup.add(packet);

      const targetStopIdx = result.blockedHop ? Math.max(0, result.blockedHop - 1) : 3;
      const startX = NODE_X[0];
      const endX = NODE_X[targetStopIdx];
      let t = 0;

      const animate = () => {
        t = (t + 0.012) % 1;
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
        packet.position.set(
          startX + (endX - startX) * eased,
          0.72 + Math.sin(t * Math.PI) * 0.22,
          0,
        );
        nodeGroup.rotation.y = Math.sin(Date.now() * 0.0005) * 0.14;
        renderer?.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();
    } catch {
      setWebglUnavailable(true);
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [result]);

  if (webglUnavailable) {
    return (
      <div class="sim-3d-fallback" role="img" aria-label={result.summary}>
        {result.hops.map((hop, idx) => (
          <div key={hop.id} class={`sim-hop-pill sim-hop-${hop.status}`}>
            <strong>0{idx + 1}</strong> {hop.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      class="sim-3d-canvas"
      role="img"
      aria-label={`Visualización 3D Three.js: ${result.summary}`}
    />
  );
}
