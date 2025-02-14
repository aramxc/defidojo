export interface ChallengeTag {
    id: string;
    name: string;
    color: string; // Hex color or tailwind class name
    backgroundColor: string; // Hex color or tailwind class name
  }
  
  export interface Challenge {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: ChallengeTag[];
    description: string;
    examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }>;
    constraints: string[];
    // authorId: string;
    // createdAt: Date;
    // solutions: Solution[];
    // testCases: TestCase[];
    // etc.
  }