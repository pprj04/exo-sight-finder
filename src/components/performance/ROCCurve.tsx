import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ReferenceLine, Dot } from "recharts";

// Generate ROC curve data
const rocData = Array.from({ length: 21 }, (_, i) => {
  const fpr = i / 20;
  const tpr = Math.pow(fpr, 0.3); // Creates a realistic ROC curve shape
  return { fpr, tpr };
});

// Add diagonal reference line data
const diagonalData = [
  { fpr: 0, tpr: 0 },
  { fpr: 1, tpr: 1 },
];

// Optimal threshold point
const optimalPoint = { fpr: 0.12, tpr: 0.897 };

const ROCCurve = () => {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>ROC Curve</CardTitle>
          <div className="text-sm">
            <span className="text-muted-foreground">AUC: </span>
            <span className="font-bold gradient-text">0.96</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis
              dataKey="fpr"
              type="number"
              domain={[0, 1]}
              label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              dataKey="tpr"
              type="number"
              domain={[0, 1]}
              label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => value.toFixed(3)}
            />
            
            {/* Area under curve */}
            <defs>
              <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>

            {/* ROC Curve */}
            <Area
              data={rocData}
              type="monotone"
              dataKey="tpr"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#rocGradient)"
            />

            {/* Diagonal reference line */}
            <Line
              data={diagonalData}
              type="linear"
              dataKey="tpr"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Optimal threshold point */}
            <ReferenceLine
              x={optimalPoint.fpr}
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
              label={{ value: 'Optimal', position: 'top', fill: 'hsl(var(--destructive))' }}
            />
            <Dot
              cx={optimalPoint.fpr * 100}
              cy={optimalPoint.tpr * 100}
              r={6}
              fill="hsl(var(--destructive))"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ROCCurve;
