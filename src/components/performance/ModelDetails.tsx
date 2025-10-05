import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Activity, History, Download, FileText } from "lucide-react";

const ModelDetails = () => {
  return (
    <>
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Model Type:</span>
            <span className="font-semibold">Ensemble (CNN + Random Forest)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Parameters:</span>
            <span className="font-semibold">2.3M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Training Time:</span>
            <span className="font-semibold">4.2 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dataset Size:</span>
            <span className="font-semibold">5,302 light curves</span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Detection Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Analyzed:</span>
            <span className="font-semibold">8,547</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confirmed Candidates:</span>
            <span className="font-semibold text-green-500">412</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">False Positives:</span>
            <span className="font-semibold text-red-500">89</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg Processing Time:</span>
            <span className="font-semibold">2.3s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-primary/10 border border-primary/20">
              <div>
                <div className="font-semibold">v1.3 (Current)</div>
                <div className="text-xs text-muted-foreground">Released Jan 15, 2025</div>
              </div>
              <div className="text-sm font-bold text-green-500">94.8%</div>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md">
              <div>
                <div className="font-semibold">v1.2</div>
                <div className="text-xs text-muted-foreground">Released Dec 10, 2024</div>
              </div>
              <div className="text-sm font-semibold text-muted-foreground">92.1%</div>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md">
              <div>
                <div className="font-semibold">v1.1</div>
                <div className="text-xs text-muted-foreground">Released Nov 5, 2024</div>
              </div>
              <div className="text-sm font-semibold text-muted-foreground">88.5%</div>
            </div>
          </div>
          <Button variant="link" className="w-full p-0 h-auto">
            View Changelog
          </Button>
        </CardContent>
      </Card>

      {/* Download Section - Full Width */}
      <Card className="glass-card border-white/10 lg:col-span-3">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Export Full Metrics Report (PDF)
            </Button>
            <Button variant="secondary" className="gap-2">
              <Download className="h-4 w-4" />
              Download Model Weights
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ModelDetails;
