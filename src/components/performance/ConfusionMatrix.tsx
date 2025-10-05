import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const matrixData = [
  { label: "True Positive", count: 412, percentage: 48.2, row: 0, col: 0 },
  { label: "False Positive", count: 89, percentage: 10.4, row: 0, col: 1 },
  { label: "False Negative", count: 93, percentage: 10.9, row: 1, col: 0 },
  { label: "True Negative", count: 7953, percentage: 93.1, row: 1, col: 1 },
];

const getColorIntensity = (percentage: number) => {
  if (percentage > 80) return "bg-primary/80";
  if (percentage > 60) return "bg-primary/60";
  if (percentage > 40) return "bg-primary/40";
  if (percentage > 20) return "bg-primary/20";
  return "bg-primary/10";
};

const ConfusionMatrix = () => {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle>Confusion Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Labels */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
            <div className="h-16" /> {/* Empty corner */}
            <div className="text-center font-semibold text-sm text-muted-foreground">
              Predicted Positive
            </div>
            <div className="text-center font-semibold text-sm text-muted-foreground">
              Predicted Negative
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
            {/* Row 1 */}
            <div className="flex items-center justify-end pr-2 text-sm font-semibold text-muted-foreground">
              Actual Positive
            </div>
            {matrixData.filter(d => d.row === 0).map((cell) => (
              <div
                key={cell.label}
                className={`${getColorIntensity(cell.percentage)} rounded-lg p-6 flex flex-col items-center justify-center border border-white/10 transition-all hover:scale-105`}
              >
                <div className="text-2xl font-bold">{cell.count.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">{cell.percentage}%</div>
                <div className="text-xs text-muted-foreground mt-2">{cell.label}</div>
              </div>
            ))}

            {/* Row 2 */}
            <div className="flex items-center justify-end pr-2 text-sm font-semibold text-muted-foreground">
              Actual Negative
            </div>
            {matrixData.filter(d => d.row === 1).map((cell) => (
              <div
                key={cell.label}
                className={`${getColorIntensity(cell.percentage)} rounded-lg p-6 flex flex-col items-center justify-center border border-white/10 transition-all hover:scale-105`}
              >
                <div className="text-2xl font-bold">{cell.count.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">{cell.percentage}%</div>
                <div className="text-xs text-muted-foreground mt-2">{cell.label}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;
