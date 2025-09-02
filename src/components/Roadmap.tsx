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
      quarter: 'Q4 2023',
      title: 'Platform Launch',
      description: 'Platform launch and token distribution. Initial community building and ecosystem development.',
      status: 'completed' as const,
      icon: <CheckCircle className="w-full h-full text-primary-foreground" />
    },
    {
      quarter: 'Q1 2024',
      title: 'Mining Farms',
      description: 'First mining farms deployment across multiple regions. Initial ASIC NFT collection release.',
      status: 'in-progress' as const,
      icon: <Clock className="w-full h-full text-primary-foreground" />
    },
    {
      quarter: 'Q2 2024',
      title: 'Global Expansion',
      description: 'Expansion to new regions and strategic partnerships. Advanced staking mechanisms implementation.',
      status: 'upcoming' as const,
      icon: <Target className="w-full h-full text-primary-foreground" />
    },
    {
      quarter: 'Q3 2024',
      title: 'DeFi Integration',
      description: 'Full DeFi ecosystem integration with yield farming and liquidity pools. Mobile app launch.',
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