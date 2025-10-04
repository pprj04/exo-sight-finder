import ResultsHeader from "@/components/results/ResultsHeader";
import LightCurveChart from "@/components/results/LightCurveChart";
import ConfidenceMetrics from "@/components/results/ConfidenceMetrics";
import ExoplanetProperties from "@/components/results/ExoplanetProperties";
import AdditionalAnalysis from "@/components/results/AdditionalAnalysis";
import ResultsActions from "@/components/results/ResultsActions";

const Results = () => {
  // Mock data for demonstration
  const lightCurveData = Array.from({ length: 500 }, (_, i) => {
    const time = i * 0.02;
    const baseFlux = 1.0 + (Math.random() - 0.5) * 0.002;
    
    // Add transit events at regular intervals
    const transitDepth = 
      (time > 5 && time < 5.5) || 
      (time > 8.5 && time < 9.0) ||
      (time > 12 && time < 12.5)
        ? -0.015
        : 0;
    
    return {
      time: parseFloat(time.toFixed(3)),
      flux: parseFloat((baseFlux + transitDepth).toFixed(6)),
      processedFlux: parseFloat((baseFlux + transitDepth + (Math.random() - 0.5) * 0.0005).toFixed(6)),
    };
  });

  const transitEvents = [5.25, 8.75, 12.25];

  const exoplanetProperties = {
    orbitalPeriod: 3.52,
    transitDepth: 0.015,
    planetRadius: 1.34,
    starTemperature: 5778,
    distance: 1200,
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="space-y-8">
          {/* Header Section */}
          <ResultsHeader
            filename="kepler-90h-sample.csv"
            detectionDate={new Date().toLocaleDateString()}
            processingTime="2.3s"
            hasDetection={true}
          />

          {/* Section 1: Light Curve Visualization */}
          <LightCurveChart data={lightCurveData} transitEvents={transitEvents} />

          {/* Section 2: Detection Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfidenceMetrics confidence={87} classification="Exoplanet Candidate" />
            <ExoplanetProperties properties={exoplanetProperties} />
          </div>

          {/* Section 3: Additional Analysis */}
          <AdditionalAnalysis />

          {/* Bottom Actions */}
          <div className="pt-8">
            <ResultsActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
