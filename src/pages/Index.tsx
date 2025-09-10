import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ClassCard } from '@/components/ClassCard';
import { SocialLinks } from '@/components/SocialLinks';
import { FloatingParticles } from '@/components/FloatingParticles';
import { NFTCollection } from '@/components/NFTCollection';
import { Roadmap } from '@/components/Roadmap';
import { Team } from '@/components/Team';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Coins, Users } from 'lucide-react';

import heroBackground from '@/assets/gif/BG_main.gif';
import energizerIcon from '@/assets/icons/classes/energizer_logo.jpg';
import minerIcon from '@/assets/icons/classes/miner_logo.jpg';
import investorIcon from '@/assets/icons/classes/investor_logo.jpg';

const Index = () => {
  const [finished, setFinished] = useState(false);

  const playerClasses = [
    {
      title: 'Energizer',
      description: 'Generate energy through power plants and convert kW into real SOL tokens. Tap, collect, and monetize your activity.',
      icon: energizerIcon,
      features: [
        'Tap-to-earn energy generation',
        'Convert kW to SOL tokens',
        'Upgrade power plants',
        'Market-based income system',
        'Daily reward multipliers'
      ],
      gradient: 'bg-gradient-to-br from-secondary to-warning',
      glowColor: 'glow-secondary'
    },
    {
      title: 'Miner',
      description: 'Deep dive into $sBTC mining operations. Use advanced tools and strategies to maximize your mining efficiency.',
      icon: minerIcon,
      features: [
        'Advanced mining algorithms',
        'Solana blockchain integration',
        'Mining pool participation',
        'Hardware optimization',
        'Passive income streams'
      ],
      gradient: 'bg-gradient-to-br from-primary to-success',
      glowColor: 'glow-primary'
    },
    {
      title: 'Investor',
      description: 'Strategic investment opportunities in the SolBitcoin ecosystem. Build portfolios and maximize long-term returns.',
      icon: investorIcon,
      features: [
        'Portfolio management tools',
        'Staking mechanisms',
        'Governance participation',
        'Yield farming opportunities',
        'Risk assessment tools'
      ],
      gradient: 'bg-gradient-to-br from-accent to-primary',
      glowColor: 'glow-accent'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Decentralized',
      description: 'Built on Solana blockchain with non-custodial wallet integration'
    },
    {
      icon: Coins,
      title: 'Real Rewards',
      description: 'Earn actual TON tokens that can be traded on DEX platforms'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of players in the SolBitcoin ecosystem'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      <Navigation />
      
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden md:pt-0 pt-16"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 16, 31, 0.8), rgba(15, 16, 31, 0.9)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="hero-title mb-6">
              SolBitcoin
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              An exciting crypto game that immerses players in the world of $sBTC mining through the Solana ecosystem. 
              Choose your class and start earning real rewards.
            </p>
            
            {/* Social Links */}
            <div className="mb-12">
              <SocialLinks />
            </div>

            {/* Launch Countdown */}
            {!finished && (
              <div className="mb-12 block">
                <h2 className="text-3xl font-bold gradient-text mb-8 font-space">Launch Countdown</h2>
                <CountdownTimer onFinish={() => setFinished(true)} />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 justify-center items-center mb-24">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-black font-bold hover:opacity-90 glow-primary animate-pulse-glow px-8 py-4 text-lg"
              >
                Mine $sBTC First
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border-secondary hover:border-primary hover:glow-primary px-8 py-4 text-lg"
              >
                <a href="https://solbitcoin.gitbook.io/white-paper/" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Остальное без изменений */}
      {/* Player Classes Section */}
      ...
    </div>
  );
};

export default Index;
