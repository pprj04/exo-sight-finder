import { Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Exoplanet3DViewer = lazy(() => import("@/components/Exoplanet3DViewer"));

const phaseFoldedData = Array.from({ length: 100 }, (_, i) => ({
  phase: (i / 100) * 2 - 1,
  flux: 1 - (Math.abs(i - 50) < 10 ? 0.015 * (1 - Math.abs(i - 50) / 10) : 0) + (Math.random() - 0.5) * 0.001,
}));

const featureData = [
  { feature: "Transit Depth", importance: 92 },
  { feature: "Periodicity", importance: 88 },
  { feature: "Duration", importance: 76 },
  { feature: "Symmetry", importance: 68 },
  { feature: "Shape", importance: 54 },
  { feature: "Noise Level", importance: 42 },
];

const similarExoplanets = [
  {
    name: "Kepler-452b",
    radius: "1.6 R⊕",
    period: "385 days",
    distance: "1,400 ly",
    confidence: 95,
  },
  {
    name: "TRAPPIST-1e",
    radius: "0.92 R⊕",
    period: "6.1 days",
    distance: "40 ly",
    confidence: 98,
  },
  {
    name: "Proxima Centauri b",
    radius: "1.3 R⊕",
    period: "11.2 days",
    distance: "4.2 ly",
    confidence: 87,
  },
];

const AdditionalAnalysis = () => {
  // Mock data for 3D viewer
  const exoplanetData = {
    name: "KOI-7368",
    orbitalPeriod: 23.5,
    planetRadius: 1.8,
    distance: 1.2,
    type: "earth-like" as const,
    starRadius: 1.1,
  };

  return (
    <Tabs defaultValue="phase" className="w-full">
      <TabsList className="grid w-full grid-cols-4 glass-card">
        <TabsTrigger value="phase">Phase-Folded</TabsTrigger>
        <TabsTrigger value="features">Feature Importance</TabsTrigger>
        <TabsTrigger value="similar">Similar Planets</TabsTrigger>
        <TabsTrigger value="3d">3D View</TabsTrigger>
      </TabsList>

      <TabsContent value="phase" className="mt-4">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Phase-Folded Light Curve</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Transit pattern repeated and aligned at the detected orbital period
          </p>
          <div className="bg-[#1a1d2e] rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={phaseFoldedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="phase"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Phase", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Normalized Flux", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="flux"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="features" className="mt-4">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">ML Feature Importance</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Key features that contributed to the classification decision
          </p>
          <div className="bg-[#1a1d2e] rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Importance (%)", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  dataKey="feature"
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="similar" className="mt-4">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Similar Confirmed Exoplanets</h3>
          <p className="text-sm text-muted-foreground mb-6">
            NASA-confirmed exoplanets with comparable characteristics
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarExoplanets.map((planet, index) => (
              <Card
                key={index}
                className="glass-card p-4 hover:scale-105 transition-transform duration-300 border border-border/50"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-primary">{planet.name}</h4>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Radius:</span>
                      <span className="font-medium">{planet.radius}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Period:</span>
                      <span className="font-medium">{planet.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">{planet.distance}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Match confidence</span>
                      <span className="text-primary font-bold">{planet.confidence}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="3d" className="mt-4">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">3D System Visualization</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Interactive 3D model of the exoplanet system
          </p>
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          }>
            <Exoplanet3DViewer data={exoplanetData} height={600} showControls={true} />
          </Suspense>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdditionalAnalysis;
