import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LightCurveChart from "@/components/results/LightCurveChart";
import ConfidenceMetrics from "@/components/results/ConfidenceMetrics";
import ExoplanetProperties from "@/components/results/ExoplanetProperties";
import AdditionalAnalysis from "@/components/results/AdditionalAnalysis";

interface Discovery {
  id: string;
  koiId: string;
  detectionDate: string;
  confidence: number;
  orbitalPeriod: number;
  planetRadius: number;
  transitDepth: number;
  starTemperature: number;
  distance: number;
  lightCurveData: { time: number; flux: number; processedFlux: number }[];
  transitEvents: number[];
}

interface DiscoveryModalProps {
  discovery: Discovery | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DiscoveryModal = ({ discovery, open, onOpenChange }: DiscoveryModalProps) => {
  if (!discovery) return null;

  const exoplanetProperties = {
    orbitalPeriod: discovery.orbitalPeriod,
    transitDepth: discovery.transitDepth,
    planetRadius: discovery.planetRadius,
    starTemperature: discovery.starTemperature,
    distance: discovery.distance,
  };

  const classification = discovery.confidence >= 80 ? "Confirmed Exoplanet" : "Exoplanet Candidate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl gradient-text">{discovery.koiId}</DialogTitle>
          <p className="text-sm text-muted-foreground">Detected on {discovery.detectionDate}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Light Curve Visualization */}
          <LightCurveChart data={discovery.lightCurveData} transitEvents={discovery.transitEvents} />

          {/* Detection Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfidenceMetrics confidence={discovery.confidence} classification={classification} />
            <ExoplanetProperties properties={exoplanetProperties} />
          </div>

          {/* Additional Analysis */}
          <AdditionalAnalysis />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryModal;
