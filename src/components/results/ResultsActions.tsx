import { Button } from "@/components/ui/button";
import { Download, FileJson, Share2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResultsActions = () => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    toast.success("Report generated", {
      description: "PDF report will be downloaded shortly",
    });
  };

  const handleExportJSON = () => {
    const data = {
      detection: "CANDIDATE DETECTED",
      confidence: 87,
      properties: {
        orbitalPeriod: 3.52,
        transitDepth: 0.015,
        planetRadius: 1.34,
        starTemperature: 5778,
        distance: 1200,
      },
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exoplanet-detection-results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Data exported", {
      description: "JSON file downloaded successfully",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Exoplanet Detection Results",
        text: "Check out this exoplanet candidate I discovered!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", {
        description: "Share link copied to clipboard",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button
        variant="outline"
        onClick={handleDownloadPDF}
        className="border-border/50 hover:bg-muted/50"
      >
        <Download className="h-4 w-4 mr-2" />
        Download Report (PDF)
      </Button>

      <Button
        variant="outline"
        onClick={handleExportJSON}
        className="border-border/50 hover:bg-muted/50"
      >
        <FileJson className="h-4 w-4 mr-2" />
        Export Data (JSON)
      </Button>

      <Button
        variant="outline"
        onClick={handleShare}
        className="border-border/50 hover:bg-muted/50"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Results
      </Button>

      <Button
        onClick={() => navigate("/upload")}
        className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
      >
        <Upload className="h-4 w-4 mr-2" />
        Analyze Another
      </Button>
    </div>
  );
};

export default ResultsActions;
