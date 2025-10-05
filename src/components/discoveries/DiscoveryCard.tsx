import { useState, Suspense, lazy } from "react";
import { Clock, Globe, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const Exoplanet3DViewer = lazy(() => import("@/components/Exoplanet3DViewer"));

interface DiscoveryCardProps {
  id: string;
  koiId: string;
  detectionDate: string;
  confidence: number;
  orbitalPeriod: number;
  planetRadius: number;
  transitDepth: number;
  lightCurveData: { time: number; flux: number }[];
  onClick: () => void;
  delay: number;
}

const DiscoveryCard = ({
  koiId,
  detectionDate,
  confidence,
  orbitalPeriod,
  planetRadius,
  transitDepth,
  lightCurveData,
  onClick,
  delay,
}: DiscoveryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (conf >= 60) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const exoplanetData = {
    name: koiId,
    orbitalPeriod,
    planetRadius,
    distance: 1.2,
    type: confidence >= 80 ? "earth-like" as const : "rocky" as const,
    starRadius: 1.0,
  };

  return (
    <Card
      className="glass-card hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mini Light Curve or 3D View */}
      <div className="h-20 bg-gradient-to-b from-white/5 to-transparent border-b border-white/10 relative">
        {!isHovered ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lightCurveData}>
              <Line
                type="monotone"
                dataKey="flux"
                stroke="hsl(var(--cyan-glow))"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <Exoplanet3DViewer data={exoplanetData} height={80} showControls={false} />
            </Suspense>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold gradient-text">{koiId}</h3>
          <p className="text-xs text-muted-foreground">{detectionDate}</p>
        </div>

        {/* Confidence Badge */}
        <Badge className={getConfidenceColor(confidence)}>
          {confidence}% Confidence
        </Badge>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex flex-col items-center text-center">
            <Clock className="h-4 w-4 text-cyan-400 mb-1" />
            <span className="text-xs text-muted-foreground">Period</span>
            <span className="font-semibold">{orbitalPeriod.toFixed(2)}d</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Globe className="h-4 w-4 text-purple-400 mb-1" />
            <span className="text-xs text-muted-foreground">Radius</span>
            <span className="font-semibold">{planetRadius.toFixed(2)}R⊕</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingDown className="h-4 w-4 text-gold mb-1" />
            <span className="text-xs text-muted-foreground">Depth</span>
            <span className="font-semibold">{(transitDepth * 100).toFixed(2)}%</span>
          </div>
        </div>

        {/* View Details Button */}
        <Button variant="outline" className="w-full glass-card border-cyan-500/30 hover:bg-cyan-500/10">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default DiscoveryCard;
