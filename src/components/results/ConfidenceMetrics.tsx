import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface ConfidenceMetricsProps {
  confidence: number;
  classification: string;
}

const ConfidenceMetrics = ({ confidence, classification }: ConfidenceMetricsProps) => {
  const getColor = () => {
    if (confidence >= 80) return { color: "text-primary", bg: "bg-primary", icon: CheckCircle2 };
    if (confidence >= 60) return { color: "text-accent", bg: "bg-accent", icon: AlertTriangle };
    return { color: "text-destructive", bg: "bg-destructive", icon: XCircle };
  };

  const { color, bg, icon: Icon } = getColor();

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Confidence Metrics</h3>

      <div className="flex flex-col items-center space-y-6">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={`hsl(var(--${confidence >= 80 ? 'primary' : confidence >= 60 ? 'accent' : 'destructive'}))`}
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(confidence / 100) * 553} 553`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${color}`}>{confidence}%</span>
            <span className="text-sm text-muted-foreground mt-1">Confidence</span>
          </div>
        </div>

        {/* Classification Result */}
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg}/10 border border-current ${color}`}>
            <Icon className="h-5 w-5" />
            <span className="font-semibold">{classification}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            {confidence >= 80
              ? "High confidence detection - strong candidate for follow-up observation"
              : confidence >= 60
              ? "Moderate confidence - additional analysis recommended"
              : "Low confidence - likely false positive or insufficient data"}
          </p>
        </div>

        {/* Metrics Breakdown */}
        <div className="w-full space-y-3 pt-4 border-t border-border/50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Signal Strength</span>
              <span className="font-medium">{Math.min(confidence + 5, 100)}%</span>
            </div>
            <Progress value={Math.min(confidence + 5, 100)} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pattern Consistency</span>
              <span className="font-medium">{Math.max(confidence - 8, 0)}%</span>
            </div>
            <Progress value={Math.max(confidence - 8, 0)} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfidenceMetrics;
