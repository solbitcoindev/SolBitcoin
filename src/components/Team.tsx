import { Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import teamMember1 from "@/assets/images/team/vitalik.jpg";
import teamMember2 from "@/assets/images/team/Def_member.jpg";
import teamMember3 from "@/assets/images/team/james.jpg";
import teamMember4 from "@/assets/images/team/sarah.jpg";

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

const TeamMember = ({
  name,
  role,
  description,
  avatar,
  socials,
}: TeamMemberProps) => {
  return (
    <Card className="class-card hover:scale-105 transition-all duration-300 text-center group h-full flex flex-col">
      <CardContent className="p-8 flex flex-col flex-grow">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-primary p-1 glow-primary group-hover:scale-110 transition-transform">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold gradient-text mb-2 font-space">
          {name}
        </h3>
        <p className="text-primary font-semibold mb-4">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex gap-2 justify-center mt-auto">
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
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
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
 const teamMembers: TeamMemberProps[] = [
    {
    name: "Ethan Parker",
    role: "CEO & Co-Founder",
    description:
      "Blockchain expert with 10+ years in crypto mining and ecosystem development. Led multiple successful DeFi projects.",
    avatar: teamMember1,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Thompson",
    role: "CTO",
    description:
      "Former lead developer at major crypto exchange. Expert in Solana blockchain development and smart contract security.",
    avatar: teamMember2,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "James Wilson",
    role: "Head of Community",
    description:
      "Managed industrial-scale mining farms since 2017. Specialist in hardware optimization and renewable energy integration.",
    avatar: teamMember2,
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "William Carter",
    role: "Product Owner",
    description:
      "Crypto community builder with 500K+ followers. Expert in growth marketing and partnership development.",
    avatar: teamMember2,
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
];


  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6 font-space">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries behind SolBitcoin. Our team combines decades of
            experience in blockchain technology, crypto mining, and community
            building.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
            >
              <TeamMember {...member} />
            </motion.div>
          ))}

          {/* Порожні заглушки для рівних рядків */}
          {teamMembers.length % 4 !== 0 &&
            Array.from({ length: 4 - (teamMembers.length % 4) }).map((_, i) => (
              <div key={`empty-${i}`} className="invisible" />
            ))}
        </div>
      </div>
    </section>
  );
};
