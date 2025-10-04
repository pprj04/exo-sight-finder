import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LightCurveChartProps {
  data: Array<{ time: number; flux: number; processedFlux: number }>;
  transitEvents: number[];
}

const LightCurveChart = ({ data, transitEvents }: LightCurveChartProps) => {
  const [showProcessed, setShowProcessed] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev * 1.5, 5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev / 1.5, 1));
  const handleReset = () => setZoomLevel(1);

  const displayData = data.slice(0, Math.floor(data.length / zoomLevel));

  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-bold">Light Curve Analysis</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="data-view"
                checked={showProcessed}
                onCheckedChange={setShowProcessed}
              />
              <Label htmlFor="data-view" className="text-sm cursor-pointer">
                {showProcessed ? "Processed" : "Raw"} Data
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="border-border/50"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 5}
                className="border-border/50"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="border-border/50"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1d2e] rounded-lg p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "Time (days)", position: "insideBottom", offset: -5 }}
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
              {transitEvents.map((event, index) => (
                <ReferenceLine
                  key={index}
                  x={event}
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{
                    value: `Transit ${index + 1}`,
                    position: "top",
                    fill: "hsl(var(--destructive))",
                    fontSize: 12,
                  }}
                />
              ))}
              <Line
                type="monotone"
                dataKey={showProcessed ? "processedFlux" : "flux"}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-primary" />
            <span>Flux data</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="w-8 h-0.5 bg-destructive border-dashed" />
            <span>Transit events</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LightCurveChart;
