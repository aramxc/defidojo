'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { BackgroundImage } from '@/components/background/BackgroundImage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchApi } from '@/api/config';

interface Challenge {
  id: string;
  title: string;
  difficulty: string;
}

export default function ChallengesPage() {
//   const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await fetchApi('/challenges') as { data: Challenge[] };
        setChallenges(data.data);
        
        // Optional: Auto-redirect if there's only one challenge
        // if (data.data.length === 1) {
        //   router.push(`/challenge/${data.data[0].id}`);
        // }
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    
    <div className="min-h-screen relative">
      <div className="fixed inset-0">
        <BackgroundImage overlay={false} />
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-theme-text">
          Choose Your Challenge
        </h1>
        
        <div className="grid gap-6 max-w-2xl mx-auto">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-theme-panel-bg backdrop-blur-sm border border-theme-panel-border 
                         rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link 
                href={`/challenge/${challenge.id}`}
                className="block"
              >
                <h2 className="text-xl font-semibold mb-2 text-theme-text">
                  {challenge.title}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-theme-text-secondary">
                    Difficulty: {challenge.difficulty}
                  </p>
                  <span className="text-theme-text-secondary hover:text-theme-text">
                    Start Challenge →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}