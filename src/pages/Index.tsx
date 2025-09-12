import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { CountdownTimer } from '@/components/CountdownTimer';
import SolanaRpcBtcBalance from '@/components/SolanaRpcBtcBalance';
import { ClassCard } from '@/components/ClassCard';
import { SocialLinks } from '@/components/SocialLinks';
import { FloatingParticles } from '@/components/FloatingParticles';
import { NFTCollection } from '@/components/NFTCollection';
import { Roadmap } from '@/components/Roadmap';
import { Team } from '@/components/Team';
import { Button } from '@/components/ui/button';
import Launcher from '@/components/Launcher';
import { ArrowRight, Zap, Shield, Coins, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import heroBackground from '@/assets/gif/BG_main.gif';
import energizerIcon from '@/assets/icons/classes/energizer_logo.jpg';
import minerIcon from '@/assets/icons/classes/miner_logo.jpg';
import investorIcon from '@/assets/icons/classes/investor_logo.jpg';

const Index = () => {
  const [finished, setFinished] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const isMobile = useIsMobile();

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

            {/* Launch Countdown or Mining tokens left with fade transition */}
            {/* ОДНА дата для проверки и таймера */}
            {(() => {
              // Дата указывается только здесь!
              const DATE_STRING = "2025-09-12T12:35:00";
              const now = new Date();
              const targetDate = new Date(DATE_STRING);
              if (now >= targetDate || finished) {
                return (
                  <motion.div
                    key="counter"
                    className="mb-12 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h2 className="text-3xl font-bold gradient-text mb-8 font-space">$sBTC left to mine</h2>
                    <SolanaRpcBtcBalance />
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key="timer"
                  className="mb-12 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-3xl font-bold gradient-text mb-8 font-space">Launch Countdown</h2>
                  <CountdownTimer onFinish={() => setFinished(true)} targetDate={DATE_STRING} />
                </motion.div>
              );
            })()}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 justify-center items-center mb-24">
              <Button
                size="lg"
                className="bg-gradient-primary text-black font-bold hover:opacity-90 glow-primary animate-pulse-glow px-8 py-4 text-lg"
                onClick={() => {
                  if (isMobile) {
                    window.location.href = '/launcher';
                  } else {
                    setShowLauncher(true);
                  }
                }}
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

      {/* Player Classes Section */}
      <section id="classes" className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6 font-space">Choose Your Class</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each class offers unique gameplay mechanics and earning opportunities. 
              Select the path that matches your strategy and start your SolBitcoin journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {playerClasses.map((playerClass, index) => (
              <div key={playerClass.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.5}s` }}>
                <ClassCard {...playerClass} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NFT ASIC Collection */}
      <NFTCollection />

      {/* Roadmap */}
      <Roadmap />

      {/* Team */}
      <Team />

      {/* Features Section */}
      <section id="about" className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6 font-space">Why SolBitcoin?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge blockchain technology and designed for real earning potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="text-center p-8 rounded-2xl bg-gradient-card border border-border-secondary hover:border-primary transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary p-4 group-hover:glow-primary transition-all duration-300">
                  <feature.icon className="w-full h-full text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text font-space">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-background to-background-tertiary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">Ready to Start Mining?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the SolBitcoin revolution and start earning crypto rewards today. 
            Choose your class and begin your crypto gaming journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary px-8 py-4 text-lg"
            >
              Start Mining
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border-secondary hover:border-secondary hover:glow-secondary px-8 py-4 text-lg"
            >
              <a href="https://solbitcoin.gitbook.io/white-paper/" target="_blank" rel="noopener noreferrer">
              Read Whitepaper
              </a>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text font-space">SolBitcoin</h3>
              <p className="text-muted-foreground">The future of crypto gaming on Solana</p>
            </div>
            <div className="mb-4 md:mb-0">
              <SocialLinks />
            </div>
            <div className="rights">
              <div className="text-muted-foreground text-sm">
               © 2024 SolBitcoin. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showLauncher && <Launcher onClose={() => setShowLauncher(false)} />}
    </div>
  );
};

export default Index;
