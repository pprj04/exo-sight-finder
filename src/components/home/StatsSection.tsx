import { Activity, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: Target,
    label: "Total Discoveries",
    value: "5,302",
    description: "Confirmed exoplanets",
    color: "primary",
  },
  {
    icon: Activity,
    label: "Model Accuracy",
    value: "94.8%",
    description: "Detection precision",
    color: "secondary",
  },
  {
    icon: Zap,
    label: "Analysis Time",
    value: "2.3s",
    description: "Average processing",
    color: "accent",
  },
];

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 -mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors`}
                >
                  <Icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
