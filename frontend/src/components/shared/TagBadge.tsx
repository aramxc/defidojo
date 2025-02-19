'use client';

import { motion } from 'framer-motion';
import { Tag } from '@/types/challenge';

interface TagBadgeProps {
  tag: Tag;
  animate?: boolean;
  size?: 'sm' | 'md';
}

export default function TagBadge({ tag, animate = true, size = 'md' }: TagBadgeProps) {
  const rgbaColor = tag.color.replace('rgb', 'rgba').replace(')', ', 0.08)');  // More subtle background
  const gradientColor = tag.color.replace('rgb', 'rgba').replace(')', ', 0.03)'); // Even lighter gradient end
  
  const badge = (
    <span
      style={{
        color: tag.color,
        background: `linear-gradient(135deg, ${rgbaColor} 75%, ${gradientColor} 100%)`,
        border: `0.5px solid ${tag.color.replace('rgb', 'rgba').replace(')', ', 0.2)')}`, // Subtler border
      }}
      className={`
        inline-flex items-center justify-center rounded-full font-medium
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1 text-sm'}
        transition-all duration-300
        hover:bg-opacity-25 backdrop-blur-[2px]
        shadow-sm hover:shadow
        cursor-default select-none
        hover:border-opacity-30
        tracking-wide
      `}
    >
      {tag.name}
    </span>
  );

  if (!animate) return badge;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {badge}
    </motion.div>
  );
}