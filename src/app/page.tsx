'use client';

import { useState } from 'react';
import JeopardyGame from '@/components/ui/jeopardy-game';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState('');

  const handleStart = () => {
    try {
      const parsedCategories = JSON.parse(jsonInput);
      // Basic validation to ensure it's an object
      if (typeof parsedCategories !== 'object' || parsedCategories === null) {
        throw new Error('Invalid categories format');
      }
      setCategories(parsedCategories);
      setError('');
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  if (categories) {
    return (
      <main className="">
        <JeopardyGame categories={categories} />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Jeopardy!</h1>
        <p className="text-gray-600 mb-4">
          Paste your categories JSON below to start the game.
        </p>

        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your categories JSON here..."
          className="min-h-[200px] font-mono"
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleStart}
          disabled={!jsonInput.trim()}
          className="w-full"
        >
          Start Game
        </Button>
      </div>
    </main>
  );
}
