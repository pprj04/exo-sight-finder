import { ArrowLeft, Clock, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ResultsHeaderProps {
  filename: string;
  detectionDate: string;
  processingTime: string;
  hasDetection: boolean;
}

const ResultsHeader = ({
  filename,
  detectionDate,
  processingTime,
  hasDetection,
}: ResultsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/upload")}
        className="hover:bg-muted/50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Upload
      </Button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Detection Results
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{filename}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{detectionDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{processingTime}</span>
            </div>
          </div>
        </div>

        <Badge
          className={`text-lg px-6 py-2 ${
            hasDetection
              ? "bg-primary/20 text-primary border-primary/30 glow-cyan"
              : "bg-muted text-muted-foreground border-border"
          }`}
          variant="outline"
        >
          {hasDetection ? "CANDIDATE DETECTED" : "NO DETECTION"}
        </Badge>
      </div>
    </div>
  );
};

export default ResultsHeader;
