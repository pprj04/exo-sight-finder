import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface UploadActionsProps {
  hasFile: boolean;
  isProcessing: boolean;
  isComplete: boolean;
  progress: number;
  onAnalyze: () => void;
  onClear: () => void;
}

const UploadActions = ({
  hasFile,
  isProcessing,
  isComplete,
  progress,
  onAnalyze,
  onClear,
}: UploadActionsProps) => {
  const navigate = useNavigate();
  
  const handleAnalyze = () => {
    onAnalyze();
    
    // Navigate to results after processing completes
    if (isComplete) {
      setTimeout(() => {
        navigate("/results");
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing...</span>
            <span className="text-primary font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          disabled={!hasFile || isProcessing}
          onClick={handleAnalyze}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          {isComplete ? "View Results" : "Analyze for Exoplanets"}
        </Button>

        <Button
          size="lg"
          variant="outline"
          disabled={!hasFile || isProcessing}
          onClick={onClear}
          className="border-border/50 hover:bg-muted/50"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Clear
        </Button>
      </div>

      {isComplete && (
        <div className="glass-card p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">Analysis complete - Click "View Results" to see detection outcomes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadActions;
