import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sBTCLogo from '@/assets/icons/logo/Logo_sBTC.png';

interface NavigationProps {
  onOpenLauncher?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenLauncher }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Classes', href: '#classes' },
    { label: 'NFT Equipment', href: '#nft' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center mt-2 md:mt-0 space-x-2">
            <img src={sBTCLogo} alt="sBTC Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-2xl font-bold gradient-text font-space">
              SolBitcoin
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button (desktop) */}
          <div className="hidden md:block">
            <Button
              variant="default"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary"
              onClick={() => onOpenLauncher?.()}
            >
              Start Mining
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full z-50">
            <div className="bg-background/90 backdrop-blur-md shadow-lg px-4 pt-4 pb-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Кнопка Start Mining (mobile) */}
              <Button
                variant="default"
                className="w-full bg-gradient-primary text-primary-foreground"
                onClick={() => {
                  setIsOpen(false);
                  onOpenLauncher?.();
                }}
              >
                Start Mining
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
