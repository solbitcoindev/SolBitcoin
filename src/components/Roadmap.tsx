import { CheckCircle, Clock, Target } from 'lucide-react';

interface RoadmapItemProps {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ReactNode;
}

const RoadmapItem = ({ quarter, title, description, status, icon }: RoadmapItemProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/10';
      case 'in-progress':
        return 'border-warning bg-warning/10';
      case 'upcoming':
        return 'border-primary bg-primary/10';
      default:
        return 'border-border';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-warning animate-pulse" />;
      case 'upcoming':
        return <Target className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative p-6 rounded-2xl border-2 ${getStatusColor()} backdrop-blur-sm transition-all duration-300 hover:scale-105 group`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary p-3 glow-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-muted-foreground">{quarter}</h3>
            {getStatusIcon()}
          </div>
          <h4 className="text-xl font-bold gradient-text font-space">{title}</h4>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Connecting line for desktop */}
      <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
    </div>
  );
};

export const Roadmap = () => {
  const roadmapItems = [
  {
    quarter: 'Q3 2025',
    title: 'App Launch',
    description: 'SolBitcoin web application goes live, enabling users to manage and track their crypto assets seamlessly.',
    status: 'completed' as const,
    icon: <CheckCircle className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q3 2025',
    title: 'NFT Listing on Magic Eden',
    description: 'All ASIC NFTs have been minted and listed on Magic Eden, opening new opportunities for NFT trading and community engagement.',
    status: 'completed' as const,
    icon: <CheckCircle className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q4 2025',
    title: 'V1.1 Update Development',
    description: 'Development of Investor features that will allow users to manage crypto investments and Boosters functionality that will help accelerate energy generation and $tBTC mining.',
    status: 'in-progress' as const,
    icon: <Clock className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q4 2025',
    title: '$sBTC Listing on DEX',
    description: 'Launching SOL/sBTC trading pair on decentralized exchanges, which will enable seamless crypto trading and liquidity provision.',
    status: 'in-progress' as const,
    icon: <Clock className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q1 2026',
    title: 'NFT Rental System Launch',
    description: 'A system will be introduced allowing users to rent out their ASIC NFTs, enabling passive income streams and expanding participation in the SolBitcoin ecosystem.',
    status: 'upcoming' as const,
    icon: <Target className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q2 2026',
    title: 'iOS & Android Integration',
    description: 'Mobile apps will be released for iOS and Android, providing on-the-go access to SolBitcoin services, staking, and NFT management.',
    status: 'upcoming' as const,
    icon: <Target className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q3 2026',
    title: '$sBTC Listing on CEX',
    description: 'Listing on major centralized exchanges like Binance and Bybit will occur, increasing liquidity and trading opportunities for $sBTC holders.',
    status: 'upcoming' as const,
    icon: <Target className="w-full h-full text-primary-foreground" />
  },
  {
    quarter: 'Q4 2026',
    title: 'NFT Crafting Integration',
    description: 'The NFT Crafting system will be launched, allowing users to combine or upgrade their ASIC NFTs to create more powerful and rare NFT, enhancing gameplay and investment potential within the SolBitcoin ecosystem.',
    status: 'upcoming' as const,
    icon: <Target className="w-full h-full text-primary-foreground" />
  }
];


  return (
    <section id="roadmap" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">Roadmap</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our journey to revolutionize crypto gaming and mining. Follow our progress 
            as we build the future of blockchain-based gaming ecosystems.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative">
          {roadmapItems.map((item, index) => (
            <div key={item.quarter} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <RoadmapItem {...item} />
            </div>
          ))}
          
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-success via-warning via-primary to-muted-foreground/30 -z-10"></div>
        </div>
      </div>
    </section>
  );
};