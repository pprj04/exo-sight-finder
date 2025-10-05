import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  confidenceThreshold: number;
  onConfidenceChange: (value: number) => void;
}

const FilterBar = ({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  sortBy,
  onSortChange,
  confidenceThreshold,
  onConfidenceChange,
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by KOI ID, name, or host star"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 glass-card border-white/10"
          />
        </div>

        {/* Confidence Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="glass-card border-white/10">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Confidence: {confidenceThreshold}%+
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 glass-card border-white/10">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Minimum Confidence</h4>
              <Slider
                value={[confidenceThreshold]}
                onValueChange={(value) => onConfidenceChange(value[0])}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {confidenceThreshold}%
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px] glass-card border-white/10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass-card border-white/10">
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="confidence">Highest Confidence</SelectItem>
            <SelectItem value="radius">Largest Radius</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filterType === "all" ? "default" : "outline"}
          onClick={() => onFilterTypeChange("all")}
          className={filterType === "all" ? "" : "glass-card border-white/10"}
        >
          All
        </Button>
        <Button
          variant={filterType === "candidates" ? "default" : "outline"}
          onClick={() => onFilterTypeChange("candidates")}
          className={filterType === "candidates" ? "" : "glass-card border-white/10"}
        >
          Candidates
        </Button>
        <Button
          variant={filterType === "confirmed" ? "default" : "outline"}
          onClick={() => onFilterTypeChange("confirmed")}
          className={filterType === "confirmed" ? "" : "glass-card border-white/10"}
        >
          Confirmed
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
