import { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw } from "lucide-react";
import * as THREE from "three";

interface ExoplanetData {
  name: string;
  orbitalPeriod: number; // days
  planetRadius: number; // Earth radii
  distance: number; // AU
  type: "earth-like" | "gas-giant" | "rocky";
  starRadius?: number; // Solar radii
}

interface Exoplanet3DViewerProps {
  data: ExoplanetData;
  height?: number;
  showControls?: boolean;
}

// Pulsing star component
const Star = ({ radius, starRadius = 1 }: { radius: number; starRadius?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * starRadius, 32, 32]} />
      <meshStandardMaterial
        emissive="#FFA500"
        emissiveIntensity={2}
        color="#FFD700"
      />
      {/* Glow effect */}
      <pointLight intensity={2} distance={10} decay={2} color="#FFA500" />
    </mesh>
  );
};

// Orbiting planet component
const Planet = ({
  radius,
  color,
  distance,
  speed,
  isAnimating,
  animationSpeed,
}: {
  radius: number;
  color: string;
  distance: number;
  speed: number;
  isAnimating: boolean;
  animationSpeed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current && isAnimating) {
      const angle = clock.getElapsedTime() * speed * animationSpeed;
      meshRef.current.position.x = Math.cos(angle) * distance;
      meshRef.current.position.z = Math.sin(angle) * distance;
    }
  });

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Orbital path component
const OrbitPath = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#00ffff", opacity: 0.3, transparent: true }))} />
  );
};

// Habitable zone component
const HabitableZone = ({ innerRadius, outerRadius }: { innerRadius: number; outerRadius: number }) => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshBasicMaterial color="#00ff00" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

// Comparison planet (Earth or Jupiter)
const ComparisonPlanet = ({
  type,
  offset,
}: {
  type: "earth" | "jupiter";
  offset: number;
}) => {
  const radius = type === "earth" ? 0.1 : 1.0;
  const color = type === "earth" ? "#4169E1" : "#DAA520";
  
  return (
    <group position={[offset, 0, 0]}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label would go here if labels are enabled */}
    </group>
  );
};

// Main 3D Scene
const Scene = ({
  data,
  isAnimating,
  animationSpeed,
  showHabitableZone,
  comparisonBody,
}: {
  data: ExoplanetData;
  isAnimating: boolean;
  animationSpeed: number;
  showHabitableZone: boolean;
  comparisonBody: string;
}) => {
  const getPlanetColor = (type: string) => {
    switch (type) {
      case "earth-like": return "#4169E1";
      case "gas-giant": return "#FFA500";
      case "rocky": return "#808080";
      default: return "#FFFFFF";
    }
  };

  const starRadius = 0.5 * (data.starRadius || 1);
  const planetRadius = 0.1 * data.planetRadius;
  const orbitDistance = 2 + data.distance;
  const orbitSpeed = 0.5 / data.orbitalPeriod;

  // Habitable zone (rough estimation: 0.95 - 1.37 AU for Sun-like star)
  const hzInner = 2.5;
  const hzOuter = 3.5;

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.3} />
      
      {/* Central Star */}
      <Star radius={starRadius} starRadius={data.starRadius} />
      
      {/* Orbital Path */}
      <OrbitPath radius={orbitDistance} />
      
      {/* Habitable Zone */}
      {showHabitableZone && <HabitableZone innerRadius={hzInner} outerRadius={hzOuter} />}
      
      {/* Exoplanet */}
      <Planet
        radius={planetRadius}
        color={getPlanetColor(data.type)}
        distance={orbitDistance}
        speed={orbitSpeed}
        isAnimating={isAnimating}
        animationSpeed={animationSpeed}
      />
      
      {/* Comparison Bodies */}
      {comparisonBody === "earth" && (
        <ComparisonPlanet type="earth" offset={-2} />
      )}
      {comparisonBody === "jupiter" && (
        <ComparisonPlanet type="jupiter" offset={-2} />
      )}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={isAnimating}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
};

const Exoplanet3DViewer = ({ 
  data, 
  height = 600,
  showControls = true 
}: Exoplanet3DViewerProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showHabitableZone, setShowHabitableZone] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [comparisonBody, setComparisonBody] = useState("none");
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60 }}
        style={{ background: "#0a0a1a" }}
      >
        <Suspense fallback={null}>
          <Scene
            data={data}
            isAnimating={isAnimating}
            animationSpeed={animationSpeed}
            showHabitableZone={showHabitableZone}
            comparisonBody={comparisonBody}
          />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 glass-card border-white/10 p-4 space-y-4">
          {/* Info Panel */}
          {showLabels && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
              <div>
                <div className="text-muted-foreground">Planet</div>
                <div className="font-semibold">{data.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Orbital Period</div>
                <div className="font-semibold">{data.orbitalPeriod.toFixed(1)} days</div>
              </div>
              <div>
                <div className="text-muted-foreground">Distance</div>
                <div className="font-semibold">{data.distance.toFixed(2)} AU</div>
              </div>
              <div>
                <div className="text-muted-foreground">Radius</div>
                <div className="font-semibold">{data.planetRadius.toFixed(2)} R⊕</div>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isAnimating ? "Pause" : "Play"}
            </Button>

            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset View
            </Button>

            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <Label className="text-xs whitespace-nowrap">Speed:</Label>
              <Slider
                value={[animationSpeed]}
                onValueChange={(val) => setAnimationSpeed(val[0])}
                min={0.5}
                max={5}
                step={0.5}
                className="flex-1"
              />
              <span className="text-xs w-8">{animationSpeed}x</span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="habitable-zone"
                checked={showHabitableZone}
                onCheckedChange={(checked) => setShowHabitableZone(checked as boolean)}
              />
              <Label htmlFor="habitable-zone" className="text-xs">
                Habitable Zone
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="show-labels"
                checked={showLabels}
                onCheckedChange={(checked) => setShowLabels(checked as boolean)}
              />
              <Label htmlFor="show-labels" className="text-xs">
                Show Labels
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-xs whitespace-nowrap">Compare:</Label>
              <Select value={comparisonBody} onValueChange={setComparisonBody}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="earth">Earth</SelectItem>
                  <SelectItem value="jupiter">Jupiter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility */}
      <div className="sr-only" role="img" aria-label={`3D visualization of ${data.name} exoplanet system showing orbital path and relative size`}>
        Interactive 3D model of exoplanet {data.name} orbiting its host star at {data.distance} AU with an orbital period of {data.orbitalPeriod} days.
      </div>
    </div>
  );
};

export default Exoplanet3DViewer;
