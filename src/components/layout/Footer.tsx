import { Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-card border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              AI-Powered Exoplanet Detection
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              API
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 ExoSight Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
