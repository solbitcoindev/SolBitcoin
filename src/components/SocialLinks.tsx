import { Twitter, MessageCircle, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SocialLinks = () => {
  const socialLinks = [
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/sBTC_x',
      color: 'hover:text-blue-400'
    },
    {
      icon: MessageCircle,
      label: 'Discord',
      href: 'https://discord.com/invite/dRzrfpbd',
      color: 'hover:text-indigo-400'
    },
    {
      icon: Send,
      label: 'Telegram',
      href: '#',
      color: 'hover:text-blue-500'
    },
    {
      icon: FileText,
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
            <link.icon className="h-5 w-5" />
            <span className="sr-only">{link.label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};