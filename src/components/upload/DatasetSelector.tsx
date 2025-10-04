import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DatasetSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const datasets = [
  {
    value: "kepler",
    label: "Kepler Mission",
    description: "NASA's space telescope that discovered thousands of exoplanets using transit photometry",
  },
  {
    value: "tess",
    label: "TESS Mission",
    description: "Transiting Exoplanet Survey Satellite - surveys nearby bright stars for transiting exoplanets",
  },
  {
    value: "custom",
    label: "Custom Format",
    description: "Upload your own light curve data in CSV or FITS format with time and flux columns",
  },
];

const DatasetSelector = ({ value, onChange }: DatasetSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Dataset Type</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs bg-card border-border z-50">
            <p className="text-sm">
              Select the mission or format that matches your light curve data structure
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="glass-card border-border/50">
          <SelectValue placeholder="Select dataset type" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {datasets.map((dataset) => (
            <SelectItem key={dataset.value} value={dataset.value}>
              <div className="flex flex-col">
                <span className="font-medium">{dataset.label}</span>
                <span className="text-xs text-muted-foreground">
                  {dataset.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatasetSelector;
