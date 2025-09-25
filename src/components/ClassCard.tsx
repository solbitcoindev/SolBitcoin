import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
  glowColor: string;
}

const links: Record<string, string> = {
  Energizer: "https://solbitcoin.gitbook.io/white-paper/game-mechanics/energizer",
  Miner: "https://solbitcoin.gitbook.io/white-paper/game-mechanics/miner",
  Investor: "https://solbitcoin.gitbook.io/white-paper/game-mechanics/investor",
};

export const ClassCard = ({ title, description, icon, features, gradient, glowColor }: ClassCardProps) => {
  return (
    <div className="class-card p-8 h-full group">
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-20 h-20 mb-6 rounded-2xl ${gradient} p-4 mx-auto ${glowColor} group-hover:scale-110 transition-transform duration-300`}>
          <img src={icon} alt={title} className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-center gradient-text font-space">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 text-center leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse-glow"></div>
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          className={`w-full ${gradient} text-primary-foreground border-0 hover:opacity-90 group-hover:${glowColor} transition-all duration-300`}
        >  <a href={links[title]} target="_blank" rel="noopener noreferrer">
          Learn more about {title}
          </a>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};