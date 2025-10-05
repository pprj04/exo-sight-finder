import { useState, useEffect } from "react";
import MetricsCards from "@/components/performance/MetricsCards";
import ConfusionMatrix from "@/components/performance/ConfusionMatrix";
import ROCCurve from "@/components/performance/ROCCurve";
import TrainingHistory from "@/components/performance/TrainingHistory";
import ModelDetails from "@/components/performance/ModelDetails";

const Performance = () => {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 gradient-text">AI Model Performance Metrics</h1>
              <p className="text-muted-foreground">
                Tracking accuracy and efficiency of our exoplanet detection system
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Row 1: Key Metrics Cards */}
        <div className="mb-8">
          <MetricsCards />
        </div>

        {/* Row 2: Confusion Matrix & ROC Curve */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConfusionMatrix />
          <ROCCurve />
        </div>

        {/* Row 3: Training History */}
        <div className="mb-8">
          <TrainingHistory />
        </div>

        {/* Row 4: Model Details & Download Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModelDetails />
        </div>
      </div>
    </div>
  );
};

export default Performance;
