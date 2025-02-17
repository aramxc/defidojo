'use client';

import { BackgroundImage } from '@/components/background/BackgroundImage';
import ThemeSelector from '@/components/theme/ThemeSelector';

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

      {/* Theme Selector */}
      <div className="absolute right-4 top-4 md:right-8 md:top-4 z-50">
        <ThemeSelector />
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
}