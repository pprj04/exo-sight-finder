import { useState, useEffect } from "react";
import FileUploadZone from "@/components/upload/FileUploadZone";
import DatasetSelector from "@/components/upload/DatasetSelector";
import SampleDataSection from "@/components/upload/SampleDataSection";
import FilePreview from "@/components/upload/FilePreview";
import PreprocessingChecklist from "@/components/upload/PreprocessingChecklist";
import UploadActions from "@/components/upload/UploadActions";
import { toast } from "sonner";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dataset, setDataset] = useState("kepler");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState(0);
  const [previewData, setPreviewData] = useState<Array<{ time: number; flux: number }>>([]);

  const handleFileUpload = async (uploadedFile: File) => {
    setError(null);
    
    if (uploadedFile.size > 50 * 1024 * 1024) {
      setError("File size exceeds 50MB limit");
      toast.error("File too large", {
        description: "Please upload a file smaller than 50MB",
      });
      return;
    }

    setFile(uploadedFile);
    
    // Parse file to get data points and preview
    try {
      const text = await uploadedFile.text();
      const lines = text.split("\n").filter(line => line.trim());
      const dataLines = lines.slice(1); // Skip header
      setDataPoints(dataLines.length);

      // Create preview data (first 1000 points)
      const preview = dataLines.slice(0, 1000).map((line, index) => {
        const values = line.split(",");
        return {
          time: parseFloat(values[0]) || index,
          flux: parseFloat(values[1]) || 0,
        };
      }).filter(d => !isNaN(d.time) && !isNaN(d.flux));

      setPreviewData(preview);

      toast.success("File uploaded successfully", {
        description: `Loaded ${dataLines.length.toLocaleString()} data points`,
      });
    } catch (err) {
      setError("Failed to parse file");
      toast.error("Invalid file format", {
        description: "Please ensure your file is properly formatted CSV",
      });
    }
  };

  const handleAnalyze = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProgress(0);
    
    toast.info("Starting analysis", {
      description: "Preprocessing light curve data...",
    });
  };

  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success("Preprocessing complete", {
            description: "Light curve is ready for exoplanet detection",
          });
          return 100;
        }
        
        const newProgress = prev + 2.5;
        const newStep = Math.floor(newProgress / 25);
        setProcessingStep(newStep);
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleClear = () => {
    setFile(null);
    setError(null);
    setDataPoints(0);
    setPreviewData([]);
    setProcessingStep(0);
    setProgress(0);
    setIsProcessing(false);
    
    toast.info("Upload cleared", {
      description: "Ready for a new file",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">
            Light Curve Analysis
          </h1>
          <p className="text-muted-foreground">
            Upload stellar light curve data to detect exoplanet transits using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            <FileUploadZone
              onFileUpload={handleFileUpload}
              isLoading={isProcessing}
              error={error}
            />

            <DatasetSelector value={dataset} onChange={setDataset} />

            <SampleDataSection />
          </div>

          {/* Right Column - Preview Section */}
          <div className="space-y-6">
            <FilePreview
              file={file}
              dataPoints={dataPoints}
              previewData={previewData}
            />

            <PreprocessingChecklist
              isProcessing={isProcessing}
              currentStep={processingStep}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <UploadActions
            hasFile={!!file}
            isProcessing={isProcessing}
            isComplete={progress === 100 && !isProcessing}
            progress={progress}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
