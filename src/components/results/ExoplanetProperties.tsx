import { Card } from "@/components/ui/card";
import { Globe, Thermometer, Ruler, MapPin } from "lucide-react";

interface ExoplanetPropertiesProps {
  properties: {
    orbitalPeriod: number;
    transitDepth: number;
    planetRadius: number;
    starTemperature: number;
    distance: number;
  };
}

const ExoplanetProperties = ({ properties }: ExoplanetPropertiesProps) => {
  const propertyItems = [
    {
      icon: Clock,
      label: "Orbital Period",
      value: `${properties.orbitalPeriod.toFixed(2)} days`,
      color: "text-primary",
    },
    {
      icon: TrendingDown,
      label: "Transit Depth",
      value: `${(properties.transitDepth * 100).toFixed(3)}%`,
      color: "text-secondary",
    },
    {
      icon: Globe,
      label: "Planet Radius",
      value: `${properties.planetRadius.toFixed(2)} R⊕`,
      color: "text-accent",
      subtitle: "Earth radii",
    },
    {
      icon: Thermometer,
      label: "Host Star Temperature",
      value: `${properties.starTemperature.toLocaleString()} K`,
      color: "text-orange-400",
    },
    {
      icon: MapPin,
      label: "Distance",
      value: `${properties.distance.toLocaleString()} ly`,
      color: "text-purple-400",
      subtitle: "light years",
    },
  ];

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Exoplanet Properties</h3>

      <div className="space-y-4">
        {propertyItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-muted/20 ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Earth Comparison */}
        <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Size Comparison</p>
              <p className="text-xs text-muted-foreground">
                This planet is {properties.planetRadius > 1 ? "larger" : "smaller"} than Earth
                {properties.planetRadius > 1
                  ? ` (${(properties.planetRadius).toFixed(1)}× Earth's radius)`
                  : ` (${(properties.planetRadius).toFixed(2)}× Earth's radius)`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

import { Clock, TrendingDown } from "lucide-react";

export default ExoplanetProperties;
