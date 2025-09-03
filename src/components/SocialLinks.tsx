import { Twitter, MessageCircle, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import twitterIcon from '@/assets/images/icons/x_logo.svg';
import discordIcon from '@/assets/images/icons/Discord_logo.svg';
import telegramIcon from '@/assets/images/icons/Telegram_logo.svg';
import mediumIcon from '@/assets/images/icons/Medium_logo.svg';

export const SocialLinks = () => {
  const socialLinks = [
    {
      icon: twitterIcon,
      label: 'Twitter',
      href: 'https://x.com/sBTC_x',
      color: 'hover:text-blue-400'
    },
    {
      icon: discordIcon,
      label: 'Discord',
      href: 'https://discord.com/invite/dRzrfpbd',
      color: 'hover:text-indigo-400'
    },
    {
      icon: telegramIcon,
      label: 'Telegram',
      href: '#',
      color: 'hover:text-blue-500'
    },
    {
      icon: mediumIcon,
      label: 'Medium',
      href: '#',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <div className="flex gap-4 justify-center">
      {socialLinks.map((link) => (
        <Button
          key={link.label}
          variant="outline"
          size="icon"
          asChild
          className="border-border-secondary hover:border-primary hover:glow-primary transition-all duration-300"
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} transition-colors`}
          >
            <image className="h-5 w-5" />
            <span className="sr-only">{link.label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};