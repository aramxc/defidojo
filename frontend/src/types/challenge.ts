export interface ChallengeTag {
    id: string;
    name: string;
    color: string; // Hex color or tailwind class name
    backgroundColor: string; // Hex color or tailwind class name
  }
  
  export interface TestCase {
    id: string;
    challengeId: string;
    input: string;
    expectedOutput: string;
    isPublic: boolean; // Some test cases might be hidden from users
    order: number; // For ordering test cases
  }
  
  export interface Solution {
    id: string;
    challengeId: string;
    userId: string;
    code: string;
    language: string;
    passedTests: boolean;
    executionTime?: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Vote {
    id: string;
    challengeId: string;
    userId: string;
    value: number; // 1 for upvote, -1 for downvote
    createdAt: Date;
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
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    solutions: Solution[];
    testCases: TestCase[];
    // Voting metrics
    upvotes: number;
    downvotes: number;
    totalVotes: number;
    // Optional fields for template/draft functionality
    isTemplate?: boolean;
    isDraft?: boolean;
    parentTemplateId?: string;
  }