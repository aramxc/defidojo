'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/config/themes';

interface BackgroundImageProps {
  overlay?: boolean;
  overrideImage?: string;
}

export function BackgroundImage({ overlay = false, overrideImage }: BackgroundImageProps) {
  const { theme } = useTheme();
  const imagePath = overrideImage || themes[theme].colors.background.image || '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full pointer-events-none select-none"
    >
      <Image
        src={imagePath}
        alt="Background"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        quality={90}
        draggable="false"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      )}
    </motion.div>
  );
}