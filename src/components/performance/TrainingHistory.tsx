import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Generate training history data
const trainingData = Array.from({ length: 101 }, (_, i) => ({
  epoch: i,
  trainAccuracy: 0.5 + (0.45 * (1 - Math.exp(-i / 15))) + Math.random() * 0.02,
  valAccuracy: 0.5 + (0.43 * (1 - Math.exp(-i / 15))) + Math.random() * 0.03,
  trainLoss: 1.5 * Math.exp(-i / 12) + Math.random() * 0.05,
  valLoss: 1.6 * Math.exp(-i / 12) + Math.random() * 0.08,
}));

const TrainingHistory = () => {
  const [visibleSeries, setVisibleSeries] = useState({
    trainAccuracy: true,
    valAccuracy: true,
    trainLoss: true,
    valLoss: true,
  });

  const toggleSeries = (series: keyof typeof visibleSeries) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle>Training History</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={visibleSeries.trainAccuracy ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSeries("trainAccuracy")}
            >
              Train Accuracy
            </Button>
            <Button
              variant={visibleSeries.valAccuracy ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSeries("valAccuracy")}
            >
              Val Accuracy
            </Button>
            <Button
              variant={visibleSeries.trainLoss ? "secondary" : "outline"}
              size="sm"
              onClick={() => toggleSeries("trainLoss")}
            >
              Train Loss
            </Button>
            <Button
              variant={visibleSeries.valLoss ? "secondary" : "outline"}
              size="sm"
              onClick={() => toggleSeries("valLoss")}
            >
              Val Loss
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trainingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis
              dataKey="epoch"
              label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              yAxisId="left"
              label={{ value: 'Accuracy', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--muted-foreground))"
              domain={[0, 1]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Loss', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--muted-foreground))"
              domain={[0, 2]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => value.toFixed(4)}
            />
            <Legend />
            
            {visibleSeries.trainAccuracy && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="trainAccuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Training Accuracy"
                animationDuration={1500}
              />
            )}
            {visibleSeries.valAccuracy && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="valAccuracy"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="Validation Accuracy"
                animationDuration={1500}
              />
            )}
            {visibleSeries.trainLoss && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="trainLoss"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                name="Training Loss"
                animationDuration={1500}
              />
            )}
            {visibleSeries.valLoss && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="valLoss"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
                name="Validation Loss"
                animationDuration={1500}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrainingHistory;
