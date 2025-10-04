import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PreprocessingChecklistProps {
  isProcessing: boolean;
  currentStep: number;
}

const steps = [
  { label: "Normalizing flux values", delay: 0 },
  { label: "Removing outliers", delay: 800 },
  { label: "Interpolating gaps", delay: 1600 },
  { label: "Extracting features", delay: 2400 },
];

const PreprocessingChecklist = ({ isProcessing, currentStep }: PreprocessingChecklistProps) => {
  if (!isProcessing && currentStep === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Preprocessing Pipeline</h4>
      <Card className="glass-card p-4 space-y-3">
        {steps.map((step, index) => {
          const isComplete = currentStep > index;
          const isCurrent = currentStep === index;

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                isComplete && "animate-fade-in"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary animate-scale-in" />
              ) : isCurrent ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "text-sm transition-colors",
                  isComplete && "text-foreground font-medium",
                  isCurrent && "text-primary font-medium",
                  !isComplete && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default PreprocessingChecklist;
