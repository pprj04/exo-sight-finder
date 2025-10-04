import { Card } from "@/components/ui/card";
import { FileText, Database, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface FilePreviewProps {
  file: File | null;
  dataPoints: number;
  previewData: Array<{ time: number; flux: number }>;
}

const FilePreview = ({ file, dataPoints, previewData }: FilePreviewProps) => {
  if (!file) return null;

  const fileSizeKB = (file.size / 1024).toFixed(2);
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const displaySize = file.size > 1024 * 1024 ? `${fileSizeMB} MB` : `${fileSizeKB} KB`;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        File Information
      </h3>

      <div className="grid grid-cols-1 gap-3">
        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">File name</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Database className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium">{displaySize}</p>
              <p className="text-xs text-muted-foreground">File size</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">{dataPoints.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Data points</p>
            </div>
          </div>
        </Card>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Light Curve Preview</h4>
          <Card className="glass-card p-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={previewData}>
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="flux" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Showing first {previewData.length} flux measurements
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
