import { Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  avatar: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const TeamMember = ({ name, role, description, avatar, socials }: TeamMemberProps) => {
  return (
    <Card className="class-card hover:scale-105 transition-all duration-300 text-center group">
      <CardContent className="p-8">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-primary p-1 glow-primary group-hover:scale-110 transition-transform">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold gradient-text mb-2 font-space">{name}</h3>
        <p className="text-primary font-semibold mb-4">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        
        <div className="flex gap-2 justify-center">
          {socials.twitter && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border-secondary hover:border-primary hover:glow-primary"
            >
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
          {socials.linkedin && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border-secondary hover:border-primary hover:glow-primary"
            >
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {socials.github && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border-secondary hover:border-primary hover:glow-primary"
            >
              <a href={socials.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      description: 'Blockchain expert with 10+ years in crypto mining and ecosystem development. Led multiple successful DeFi projects.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      socials: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Maria Rodriguez',
      role: 'CTO',
      description: 'Former lead developer at major crypto exchange. Expert in Solana blockchain development and smart contract security.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2b88b52?w=400&h=400&fit=crop&crop=face',
      socials: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'James Wilson',
      role: 'Head of Mining Ops',
      description: 'Managed industrial-scale mining farms since 2017. Specialist in hardware optimization and renewable energy integration.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      socials: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Sarah Kim',
      role: 'Marketing Director',
      description: 'Crypto community builder with 500K+ followers. Expert in growth marketing and partnership development.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      socials: {
        twitter: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries behind SolBitcoin. Our team combines decades of experience 
            in blockchain technology, crypto mining, and community building.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};