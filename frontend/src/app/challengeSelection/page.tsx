'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { BackgroundImage } from '@/components/background/BackgroundImage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchApi } from '@/api/config';

interface Tag {
  id: string;
  name: string;
  color: string;
  backgroundColor: string;
}

interface Challenge {
  id: string;
  title: string;
  difficulty: string;
  tags: Tag[];
}

export default function ChallengesPage() {
//   const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await fetchApi('/tags');
        setTags(data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const endpoint = selectedTag 
          ? `/challenges?tag=${encodeURIComponent(selectedTag)}`
          : '/challenges';
        const data = await fetchApi(endpoint);
        setChallenges(data.challenges);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [selectedTag]);

  if (loading) return <LoadingSpinner />;

  return (
    
    <div className="min-h-screen relative">
      <div className="fixed inset-0">
        <BackgroundImage overlay={false} />
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-theme-text">
          Choose Your Challenge
        </h1>

        {/* Tag Filter */}
        <div className="max-w-2xl mx-auto mb-8">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full p-2 rounded-lg bg-theme-panel-bg border border-theme-panel-border
                     text-theme-text focus:ring-2 focus:ring-theme-primary"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag.id}
                      style={{
                        color: tag.color,
                        backgroundColor: tag.backgroundColor
                      }}
                      className="px-2 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
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