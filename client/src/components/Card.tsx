import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const Card = ({ title, description, icon: Icon, onClick, className = '' }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(14, 165, 233, 0.2)' }}
      whileTap={{ scale: 0.98 }}
      className={`bg-bg-secondary p-6 rounded-xl border border-white/5 cursor-pointer transition-colors hover:border-accent/30 ${className}`}
      onClick={onClick}
    >
      {Icon && (
        <div className="mb-4 text-accent">
          <Icon size={28} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-semibold text-text-primary mb-2 tracking-tight">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default Card;
