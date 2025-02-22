import { useState } from 'react';
import SubmissionModal from '@/components/modals/SubmissionModal';

export default function ActionBar({ description, constraints, submittedCode }: { description: string, constraints: string, submittedCode: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <button className="flex-1 bg-theme-button-primary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium transition-colors">
        Run Tests
      </button>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex-1 bg-theme-button-secondary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium transition-colors"
      >
        Submit Solution
      </button>

      <SubmissionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={description}
        constraints={constraints}
        submittedCode={submittedCode}
      />
    </div>
  );
}