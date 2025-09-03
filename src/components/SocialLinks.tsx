import { Twitter, MessageCircle, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import twitterIcon from '@/assets/icons/x_logo.webp';
import discordIcon from '@/assets/icons/Discord_logo.webp';
import telegramIcon from '@/assets/icons/Telegram_logo.webp';
import mediumIcon from '@/assets/icons/Medium_logo.webp';

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
    <div className='social-links'>
      <div className="flex gap-4 justify-center">
        {socialLinks.map((link) => (
          <Button
            key={link.label}
            variant="outline"
            size="icon"
            asChild
            //"border-border-secondary hover:border-primary hover:glow-primary transition-all duration-300"
            className="h-14 w-14 flex items-center justify-center rounded-full border hover:border-primary hover:glow-primary transition-all duration-300"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} transition-colors`}
            >
              <img src={link.icon} alt={link.label} className="h-7 w-7" />
              <span className="sr-only">{link.label}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};