import { Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-6 glow-cyan">
        <Telescope className="w-12 h-12 text-cyan-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2">No discoveries yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Upload light curves to start detecting exoplanets and build your discovery gallery!
      </p>
      <Button onClick={() => navigate("/upload")} size="lg">
        Upload Now
      </Button>
    </div>
  );
};

export default EmptyState;
