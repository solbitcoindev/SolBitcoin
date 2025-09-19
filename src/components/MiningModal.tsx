import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Mail, Users } from "lucide-react";

import twitterIcon from "@/assets/icons/social/x_logo.webp";
import discordIcon from "@/assets/icons/social/Discord_logo.webp";
import telegramIcon from "@/assets/icons/social/Telegram_logo.webp";
import mediumIcon from "@/assets/icons/social/Medium_logo.webp";

interface MiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiningModal: React.FC<MiningModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const socialLinks = [
    {
      icon: twitterIcon,
      label: "Twitter",
      href: "https://x.com/sBTC_x",
      color: "hover:text-blue-400",
    },
    {
      icon: discordIcon,
      label: "Discord",
      href: "https://discord.com/invite/dRzrfpbd",
      color: "hover:text-indigo-400",
    },
    {
      icon: telegramIcon,
      label: "Telegram",
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: mediumIcon,
      label: "Medium",
      href: "#",
      color: "hover:text-green-400",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-lg bg-[#0a0a0f] border border-primary/30 rounded-3xl shadow-[0_0_30px_rgba(0,255,200,0.15)] backdrop-blur-xl p-4 sm:p-8 flex flex-col items-center gap-8 sm:gap-10">
  
        {/* Заголовок */}
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
            Mining Coming Soon
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
          
          {/* Email */}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-3 sm:pt-4 text-base sm:text-lg">
            Be the first to mine{" "}
            <span className="text-primary font-semibold">$sBTC</span> after launch. Stay tuned and don’t miss out!
          </DialogDescription>
        </DialogHeader>

        {/* Email signup 
        <div className="w-full max-w-md">
          <h3 className="flex items-center justify-center gap-2 font-semibold mb-4 sm:mb-6 text-lg sm:text-2xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-accent animate-pulse" />
            Be the First to Mine $sBTC!
          </h3>
          <div className="flex rounded-xl overflow-hidden border border-primary/40 animate-glow-gradient">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 sm:h-12 px-3 sm:px-4 bg-background/80 text-white placeholder-gray-400 focus:outline-none animate-input-glow"
            />
            <Button
              className="h-10 sm:h-12 rounded-none bg-gradient-to-r from-primary to-accent text-white font-semibold px-4 sm:px-6 text-sm sm:text-base transition-transform hover:scale-105 bg-[length:200%_200%] animate-gradient-x"
            >
              Notify Me
            </Button>
          </div>
        </div> */}

        {/* Соцсети + Close */}
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <div>
            <h3 className="flex items-center justify-center gap-2 font-semibold mb-4 sm:mb-6 text-lg sm:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-primary animate-pulse" />
              Stay Connected!
            </h3>
            <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="pulse h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-full border border-primary/30 hover:border-primary hover:scale-110 hover:shadow-[0_0_25px_rgba(0,200,255,0.8)] transition-all duration-300"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.color} transition-colors`}
                  >
                    <img src={link.icon} alt={link.label} className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto px-6 sm:px-20 py-2 rounded-lg border-border-secondary hover:border-primary hover:shadow-lg hover:shadow-primary/40 transition-all"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MiningModal;
