import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const sparklineData = Array.from({ length: 30 }, (_, i) => ({
  value: 85 + Math.random() * 10 + i * 0.2,
}));

interface MetricCardProps {
  title: string;
  value: string;
  trend?: { value: string; isPositive: boolean };
  tooltip?: string;
  showSparkline?: boolean;
}

const MetricCard = ({ title, value, trend, tooltip, showSparkline }: MetricCardProps) => (
  <Card className="glass-card border-white/10">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold gradient-text">{value}</span>
          {trend && (
            <span className={`flex items-center text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {trend.value}
            </span>
          )}
        </div>
        {showSparkline && (
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </CardContent>
  </Card>
);

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Overall Accuracy"
        value="94.8%"
        trend={{ value: "+2.3% from last month", isPositive: true }}
        showSparkline
      />
      <MetricCard
        title="Precision"
        value="92.1%"
        tooltip="Of all positive predictions, how many were correct"
      />
      <MetricCard
        title="Recall"
        value="89.7%"
        tooltip="Of all actual exoplanets, how many did we detect"
      />
      <MetricCard
        title="F1 Score"
        value="90.9%"
        tooltip="Harmonic mean of precision and recall"
      />
    </div>
  );
};

export default MetricsCards;
