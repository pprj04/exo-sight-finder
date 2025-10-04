import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

const FileUploadZone = ({ onFileUpload, isLoading, error }: FileUploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > 50 * 1024 * 1024) {
          return;
        }
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "text/plain": [".txt"],
      "application/fits": [".fits"],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "min-h-64 glass-card rounded-lg transition-all duration-300 cursor-pointer",
          "flex flex-col items-center justify-center gap-4 p-8",
          "border-2 border-dashed",
          isDragActive && "border-primary bg-primary/5 scale-[1.02]",
          error && "border-destructive bg-destructive/5",
          !isDragActive && !error && "border-primary/30 hover:border-primary/60",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <div className={cn(
          "p-4 rounded-full transition-all duration-300",
          isDragActive ? "bg-primary/20 scale-110" : "bg-primary/10"
        )}>
          {isDragActive ? (
            <FileText className="h-12 w-12 text-primary animate-bounce" />
          ) : (
            <Upload className="h-12 w-12 text-primary" />
          )}
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">
            {isDragActive
              ? "Drop your file here"
              : "Drop light curve files here or click to browse"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports CSV, FITS, and TXT formats
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Maximum file size: 50MB
      </p>
    </div>
  );
};

export default FileUploadZone;
