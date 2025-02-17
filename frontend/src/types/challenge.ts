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
    difficulty: string;
    description: string;
    examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }>;
    constraints: string[];
    initial_code: string | null;
    author_id: string;
    author_name: string;
    is_template: boolean;
    is_draft: boolean;
    parent_template_id: string | null;
    upvotes: number;
    downvotes: number;
    total_votes: number;
    created_at: string;
    updated_at: string;
    tags?: Array<{
      id: string;
      name: string;
      color: string;
      backgroundColor: string;
    }>;
  }