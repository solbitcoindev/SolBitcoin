import { useRef, useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, Activity } from "lucide-react";

import Asic_SX from "@/assets/images/Asics/ASIC_XP_Ultra_Pro.jpg";
import Asic_S21 from "@/assets/images/Asics/ASIC_S21_XP+.jpg";
import Asic_S19 from "@/assets/images/Asics/ASIC_S19_XP+.jpg";
import Asic_S17 from "@/assets/images/Asics/ASIC_S17_XP.jpg";
import Asic_S15 from "@/assets/images/Asics/ASIC_S15_XP.jpg";
import Asic_S11 from "@/assets/images/Asics/ASIC_S11_XP.jpg";
import Asic_S9 from "@/assets/images/Asics/ASIC_S9+.jpg";
import Asic_S7 from "@/assets/images/Asics/ASIC_S7+.jpg";
import Asic_S5 from "@/assets/images/Asics/ASIC_S5+.jpg";
import Asic_S3 from "@/assets/images/Asics/ASIC_S3.jpg";
import Asic_S1 from "@/assets/images/Asics/ASIC_S1.jpg";

// Контроль отображения акции
const SHOW_SALE = true; 

interface ASICCardProps {
  name: string;
  image: string;
  rarity: string;
  hashrate: string;
  miningRate: string;
  powerConsumption: string;
  monthlyIncome: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
}

// Стили баров по редкости
const rarityBarStyles: Record<string, string> = {
  Mithic:
    "from-purple-500/40 to-purple-700/40 border-purple-400 text-purple-200",
  Legendary:
    "from-orange-500/40 to-orange-700/40 border-orange-400 text-orange-200",
  Epic: "from-blue-500/40 to-blue-700/40 border-blue-400 text-blue-200",
  Rare: "from-green-500/40 to-green-700/40 border-green-400 text-green-200",
  Common: "from-gray-500/40 to-gray-700/40 border-gray-400 text-gray-200",
};

// Цвета shimmer текста редкости
const rarityColors: Record<string, { start: string; end: string }> = {
  Mithic: { start: "#8a5cf6d0", end: "#8a5cf663" },
  Legendary: { start: "#f97416c0", end: "#f974169d" },
  Epic: { start: "#2674f1c5", end: "#2674f1c5" },
  Rare: { start: "#0ddd53bd", end: "#0ddd53bd" },
  Common: { start: "#9ca3afc2", end: "#9ca3afc2" },
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const ASICCard = ({
  name,
  image,
  rarity,
  hashrate,
  miningRate,
  powerConsumption,
  monthlyIncome,
  originalPrice,
  salePrice,
  discount,
}: ASICCardProps) => {
  const colors = rarityColors[rarity] || { start: "#ffffff", end: "#ffffff" };
  const startColor = colors.start;
  const endColor = colors.end;

  return (
    <Card className="class-card transform hover:scale-105 transition-all duration-300 border-border-secondary relative">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-50 min-h-[12.5rem] object-cover"
        />
        {SHOW_SALE && (
          <Badge className="absolute top-4 left-4 bg-gradient-secondary text-secondary-foreground">
            {discount} OFF
          </Badge>
        )}

        {/* Рарность на нижней части картинки */}
        <div className="absolute bottom-0 left-0 w-full py-2 text-sm font-bold uppercase tracking-wide text-center overflow-hidden">
          {/* Подложка с shimmer-анимацией */}
          <div
            className="absolute inset-0 animate-shimmer-bg"
            style={{
              backgroundImage: `linear-gradient(
                90deg,
                ${hexToRgba(startColor, 0.6)} 0%,
                ${hexToRgba(startColor, 0.8)} 25%,
                ${hexToRgba(startColor, 0.9)} 40%,
                ${hexToRgba(startColor, 1)} 50%,
                ${hexToRgba(endColor, 0.9)} 60%,
                ${hexToRgba(endColor, 0.8)} 75%,
                ${hexToRgba(endColor, 0.6)} 100%
              )`,
              backgroundSize: "400% 100%",
            }}
          ></div>

          {/* Текст с shimmer-анимацией */}
          <span
            className="relative z-10 bg-clip-text text-transparent
                       bg-gradient-to-r from-white/70 via-white/100 to-white/70
                       bg-[length:300%_100%] animate-shimmer-text"
          >
            {rarity}
          </span>

          {/* Линия сверху */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/20"></div>
        </div>
      </div>

      <CardHeader className="text-center">
        <CardTitle className="gradient-text font-space text-xl">
          {name}
        </CardTitle>
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
              <p className="font-semibold gradient-text-secondary">
                {monthlyIncome}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          {SHOW_SALE ? (
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-muted-foreground line-through text-sm">
                  {originalPrice}
                </p>
                <p className="text-2xl font-bold gradient-text-secondary">
                  {salePrice}
                </p>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                SAVE {discount}
              </Badge>
            </div>
          ) : (
            <div className="text-center mb-3">
              <p className="text-2xl font-bold gradient-text-secondary">
                {originalPrice}
              </p>
            </div>
          )}

          <Button className="w-full bg-gradient-secondary text-secondary-foreground hover:opacity-90 glow-secondary font-bold">
            Buy Now 
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const NFTCollection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [notificationClosed, setNotificationClosed] = useState(true);
  const [notificationReady, setNotificationReady] = useState(false);
  const [bounceCompleted, setBounceCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationReady(true);
      // После завершения bounce-анимации включаем пульсацию
      setTimeout(() => setBounceCompleted(true), 2000);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const visibleCount = 4;

  const asicCollection = [
    {
      name: "ASIC SX Ultra Pro",
      image: Asic_SX,
      rarity: "Mithic",
      hashrate: "600 Gh/s",
      miningRate: "1500 sBTC/d",
      powerConsumption: "3000 kW/h",
      monthlyIncome: "0.5 SOL",
      originalPrice: "5.0 SOL",
      salePrice: "2.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S21 XP+",
      image: Asic_S21,
      rarity: "Legendary",
      hashrate: "250 Gh/s",
      miningRate: "625 sBTC/d",
      powerConsumption: "1460 kW/h",
      monthlyIncome: "0.2 SOL",
      originalPrice: "7.5 SOL",
      salePrice: "3.75 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S19 XP+",
      image: Asic_S19,
      rarity: "Legendary",
      hashrate: "100 Gh/s",
      miningRate: "250 sBTC/d",
      powerConsumption: "670 kW/h",
      monthlyIncome: "0.1 SOL",
      originalPrice: "10.0 SOL",
      salePrice: "5.0 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S17 XP",
      image: Asic_S17,
      rarity: "Epic",
      hashrate: "40 Gh/s",
      miningRate: "100 sBTC/d",
      powerConsumption: "320 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S15 XP",
      image: Asic_S15,
      rarity: "Epic",
      hashrate: "15 Gh/s",
      miningRate: "37.5 sBTC/d",
      powerConsumption: "125 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S11 XP",
      image: Asic_S11,
      rarity: "Epic",
      hashrate: "6 Gh/s",
      miningRate: "15 sBTC/d",
      powerConsumption: "52 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S9+",
      image: Asic_S9,
      rarity: "Rare",
      hashrate: "2.5 Gh/s",
      miningRate: "6.25 sBTC/d",
      powerConsumption: "23 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S7+",
      image: Asic_S7,
      rarity: "Rare",
      hashrate: "1 Gh/s",
      miningRate: "2.5 sBTC/d",
      powerConsumption: "10 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S5+",
      image: Asic_S5,
      rarity: "Rare",
      hashrate: "400 Mh/s",
      miningRate: "1 sBTC/d",
      powerConsumption: "4 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S3",
      image: Asic_S3,
      rarity: "Common",
      hashrate: "200 Mh/s",
      miningRate: "0.50 sBTC/d",
      powerConsumption: "2 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
    {
      name: "ASIC S1",
      image: Asic_S1,
      rarity: "Common",
      hashrate: "100 Mh/s",
      miningRate: "0.25 sBTC/d",
      powerConsumption: "1 kW/h",
      monthlyIncome: "0.08 SOL",
      originalPrice: "15.0 SOL",
      salePrice: "7.5 SOL",
      discount: "50%",
    },
  ];

  const handleToggle = () => {
    if (expanded) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setExpanded(!expanded);
  };

  return (
    <section id="nft" ref={sectionRef} className="py-24 bg-background relative">
      {/* Notification - controlled by SHOW_SALE flag */}
      {SHOW_SALE && (
        <>
          {notificationReady && !notificationClosed ? (
            <div className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 p-4 rounded-xl shadow-xl max-w-xs animate-notification-true-pulse-scale
                max-sm:inset-x-0 max-sm:mx-auto max-sm:w-[90vw] max-sm:translate-x-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-lg">Notification</h3>
                <button
                  onClick={() => setNotificationClosed(true)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-white/90 mb-4">Launch Special: 50% OFF All ASICs!</p>
              <Button
                className="w-full bg-white text-purple-700 hover:bg-white/90 font-bold py-2"
                onClick={() => {
                  setNotificationClosed(true);
                  sectionRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Go it
              </Button>
            </div>
          ) : notificationReady ? (
            <div
              className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center cursor-pointer
                ${bounceCompleted ? 'animate-notification-pulse-scale' : 'animate-notification-bounce-once'}`}
              onClick={() => setNotificationClosed(false)}
            >
              <Bell className="h-6 w-6 text-white" />
              <div className="absolute -top-0 -right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
          ) : null}
        </>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">
            NFT ASIC Collection
          </h2>
          {/*Акція  
          <Badge className="mb-4 bg-gradient-secondary text-secondary-foreground animate-pulse text-lg px-4 py-2">
            🎉 Launch Special: 50% OFF All ASICs! 🎉
          </Badge>*/}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Own exclusive mining equipment NFTs that generate real passive
            income. Each ASIC provides unique mining capabilities and monthly
            SOL rewards.
          </p>
        </div>

        {/* Внешний контейнер */}
        <div className="relative transition-all duration-700">
          {/* Сетка карточек */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto overflow-visible">
            {asicCollection
              .slice(0, expanded ? asicCollection.length : visibleCount)
              .map((asic, index) => (
                <div
                  key={asic.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="transform transition-transform opacity-0 translate-y-4 animate-fade-in"
                >
                  <ASICCard {...asic} />
                </div>
              ))}
          </div>

          {/* Затемнение снизу */}
          {!expanded && asicCollection.length > visibleCount && (
            <div className="absolute bottom-0 -left-10 -right-10 h-80 pointer-events-none translate-y-20 z-0">
              <div className="w-full h-full bg-gradient-to-t from-background to-transparent" />
            </div>
          )}
        </div>

        {/* Кнопка */}
        {asicCollection.length > visibleCount && (
          <div className="text-center mt-12 relative z-10">
            <Button
              size="lg"
              onClick={handleToggle}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 hover:glow-primary px-8 py-4 text-lg transition-all duration-300"
            >
              {expanded ? "Hide Collection" : "View Full Collection"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
