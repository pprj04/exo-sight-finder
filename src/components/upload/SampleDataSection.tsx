import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const SampleDataSection = () => {
  const handleDownloadSample = () => {
    // Create sample CSV data (Kepler-90h simulated light curve)
    const sampleData = [
      "time,flux,flux_err",
      ...Array.from({ length: 500 }, (_, i) => {
        const time = i * 0.02;
        const flux = 1.0 + Math.random() * 0.001 - 0.0005;
        const transitDepth = time > 5 && time < 5.5 ? -0.015 : 0;
        const finalFlux = flux + transitDepth;
        const fluxErr = 0.0001;
        return `${time.toFixed(6)},${finalFlux.toFixed(8)},${fluxErr.toFixed(8)}`;
      }),
    ].join("\n");

    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kepler-90h-sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Sample light curve downloaded", {
      description: "Kepler-90h transit data ready for analysis",
    });
  };

  return (
    <div className="glass-card p-4 rounded-lg border border-border/50">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-secondary/10">
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold">Try Sample Data</h3>
          <p className="text-xs text-muted-foreground">
            Download a sample light curve from Kepler-90h to test the detection system
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadSample}
            className="w-full border-border/50 hover:bg-muted/50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Sample CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SampleDataSection;
