import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, Activity } from 'lucide-react';

interface ASICCardProps {
  name: string;
  image: string;
  hashrate: string;
  miningRate: string;
  powerConsumption: string;
  monthlyIncome: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
}

const ASICCard = ({ 
  name, 
  image, 
  hashrate, 
  miningRate, 
  powerConsumption, 
  monthlyIncome, 
  originalPrice, 
  salePrice,
  discount 
}: ASICCardProps) => {
  return (
    <Card className="class-card hover:scale-105 transition-all duration-300 overflow-hidden border-border-secondary">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-gradient-secondary text-secondary-foreground">
          {discount} OFF
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="gradient-text font-space text-xl">{name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground">Hashrate</p>
              <p className="font-semibold">{hashrate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <div>
              <p className="text-muted-foreground">Mining Rate</p>
              <p className="font-semibold">{miningRate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-warning" />
            <div>
              <p className="text-muted-foreground">Power</p>
              <p className="font-semibold">{powerConsumption}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent"></div>
            <div>
              <p className="text-muted-foreground">Monthly Income</p>
              <p className="font-semibold gradient-text-secondary">{monthlyIncome}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground line-through text-sm">{originalPrice}</p>
              <p className="text-2xl font-bold gradient-text-secondary">{salePrice}</p>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              SAVE {discount}
            </Badge>
          </div>
          
          <Button className="w-full bg-gradient-secondary text-secondary-foreground hover:opacity-90 glow-secondary">
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const NFTCollection = () => {
  const asicCollection = [
    {
      name: 'ASIC SX Ultra Pro',
      image: 'https://landing-tau-inky-61.vercel.app/assets/ASIC_XP_Ultra_Pro-dM4ViSFP.jpg',
      hashrate: '600 Gh/s',
      miningRate: '1500 solBTC/d',
      powerConsumption: '3000 kW/h',
      monthlyIncome: '0.5 SOL',
      originalPrice: '5.0 SOL',
      salePrice: '2.5 SOL',
      discount: '50%'
    },
    {
      name: 'ASIC S21 XP+',
      image: 'https://landing-tau-inky-61.vercel.app/assets/ASIC_S21_XP_-aCkf9dcR.jpg',
      hashrate: '250 Gh/s',
      miningRate: '625 solBTC/d',
      powerConsumption: '1460 kW/h',
      monthlyIncome: '0.2 SOL',
      originalPrice: '7.5 SOL',
      salePrice: '3.75 SOL',
      discount: '50%'
    },
    {
      name: 'ASIC S19 XP+',
      image: 'https://landing-tau-inky-61.vercel.app/assets/ASIC_S19_XP_-D8BxRki3.jpg',
      hashrate: '100 Gh/s',
      miningRate: '250 solBTC/d',
      powerConsumption: '670 kW/h',
      monthlyIncome: '0.1 SOL',
      originalPrice: '10.0 SOL',
      salePrice: '5.0 SOL',
      discount: '50%'
    },
    {
      name: 'ASIC S17 XP',
      image: 'https://landing-tau-inky-61.vercel.app/assets/ASIC_S17_XP-DGqfgGhw.jpg',
      hashrate: '40 Gh/s',
      miningRate: '100 solBTC/d',
      powerConsumption: '320 kW/h',
      monthlyIncome: '0.08 SOL',
      originalPrice: '15.0 SOL',
      salePrice: '7.5 SOL',
      discount: '50%'
    }
  ];

  return (
    <section id="nft" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-secondary text-secondary-foreground animate-pulse text-lg px-4 py-2">
            🎉 Launch Special: 50% OFF All ASICs! 🎉
          </Badge>
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">NFT ASIC Collection</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Own exclusive mining equipment NFTs that generate real passive income. 
            Each ASIC provides unique mining capabilities and monthly SOL rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {asicCollection.map((asic, index) => (
            <div key={asic.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ASICCard {...asic} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary px-8 py-4"
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};