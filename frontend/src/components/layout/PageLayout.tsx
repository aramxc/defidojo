'use client';

import { BackgroundImage } from '@/components/background/BackgroundImage';
import ThemeSelector from '@/components/theme/ThemeSelector';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';

interface PageLayoutProps {
  children: React.ReactNode;
}

// Shared layout for all base pages
export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0">
        <BackgroundImage overlay={false} />
      </div>

      {/* Theme Selector and Achievements */}
      <div className="fixed top-4 w-full px-4 flex justify-between items-center z-50 md:absolute md:w-auto md:right-8 md:px-0">
        <div className="md:hidden">
          <ThemeSelector />
        </div>
        <Link
          href="/achievements"
          className="w-10 h-10 flex items-center justify-center text-yellow-400
                   hover:text-yellow-300 transition-all duration-200"
          title="View Achievements"
        >
          <StarIcon className="w-6 h-6" />
        </Link>
        <div className="hidden md:block">
          <ThemeSelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}