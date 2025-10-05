import { useState, useMemo } from "react";
import FilterBar from "@/components/discoveries/FilterBar";
import DiscoveryCard from "@/components/discoveries/DiscoveryCard";
import EmptyState from "@/components/discoveries/EmptyState";
import DiscoveryModal from "@/components/discoveries/DiscoveryModal";
import DiscoverySkeletons from "@/components/discoveries/DiscoverySkeletons";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data generator
const generateMockDiscoveries = (count: number) => {
  const types = ["candidates", "confirmed"];
  const discoveries = [];

  for (let i = 0; i < count; i++) {
    const orbitalPeriod = Math.random() * 10 + 1;
    const transitDepth = Math.random() * 0.03 + 0.005;
    const lightCurveData = Array.from({ length: 100 }, (_, j) => ({
      time: j * 0.1,
      flux: 1.0 + (Math.random() - 0.5) * 0.002 + (j > 40 && j < 45 ? -transitDepth : 0),
      processedFlux: 1.0 + (Math.random() - 0.5) * 0.001 + (j > 40 && j < 45 ? -transitDepth : 0),
    }));

    discoveries.push({
      id: `discovery-${i}`,
      koiId: Math.random() > 0.5 ? `KOI-${7000 + i}` : `Custom-${String(i).padStart(3, "0")}`,
      detectionDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      confidence: Math.floor(Math.random() * 40 + 60),
      orbitalPeriod: parseFloat(orbitalPeriod.toFixed(2)),
      planetRadius: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
      transitDepth: parseFloat(transitDepth.toFixed(4)),
      starTemperature: Math.floor(Math.random() * 2000 + 4500),
      distance: Math.floor(Math.random() * 2000 + 500),
      type: types[Math.floor(Math.random() * types.length)],
      lightCurveData,
      transitEvents: [4.2, 4.2 + orbitalPeriod, 4.2 + orbitalPeriod * 2],
    });
  }

  return discoveries;
};

const ITEMS_PER_PAGE = 12;

const Discoveries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [confidenceThreshold, setConfidenceThreshold] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiscovery, setSelectedDiscovery] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);

  // Generate mock data
  const allDiscoveries = useMemo(() => generateMockDiscoveries(247), []);

  // Filter and sort discoveries
  const filteredDiscoveries = useMemo(() => {
    let filtered = [...allDiscoveries];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.koiId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.detectionDate.includes(searchQuery)
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((d) => d.type === filterType);
    }

    // Confidence threshold
    filtered = filtered.filter((d) => d.confidence >= confidenceThreshold);

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "confidence") return b.confidence - a.confidence;
      if (sortBy === "radius") return b.planetRadius - a.planetRadius;
      return 0; // recent is default order
    });

    return filtered;
  }, [allDiscoveries, searchQuery, filterType, confidenceThreshold, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredDiscoveries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDiscoveries = filteredDiscoveries.slice(startIndex, endIndex);

  const handleCardClick = (discovery: any) => {
    setSelectedDiscovery(discovery);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            Exoplanet Discoveries
          </h1>
          <p className="text-muted-foreground">
            Explore detected exoplanets from light curve analysis
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
            sortBy={sortBy}
            onSortChange={setSortBy}
            confidenceThreshold={confidenceThreshold}
            onConfidenceChange={setConfidenceThreshold}
          />
        </div>

        {/* Results Count */}
        {!isLoading && filteredDiscoveries.length > 0 && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredDiscoveries.length)} of{" "}
            {filteredDiscoveries.length} results
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DiscoverySkeletons />
          </div>
        ) : filteredDiscoveries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentDiscoveries.map((discovery, index) => (
                <DiscoveryCard
                  key={discovery.id}
                  {...discovery}
                  onClick={() => handleCardClick(discovery)}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>

      {/* Discovery Modal */}
      <DiscoveryModal
        discovery={selectedDiscovery}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default Discoveries;
