import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Question {
  q: string;
  a: string;
  value: number;
}

interface Categories {
  [key: string]: Question[];
}

interface Scores {
  team1: number;
  team2: number;
}

interface SelectedQuestion {
  category: string;
  index: number;
}

interface Answered {
  [key: string]: boolean;
}

const JeopardyGame: React.FC<{ categories: Categories }> = ({ categories }) => {
  const [selectedQuestion, setSelectedQuestion] =
    useState<SelectedQuestion | null>(null);
  const [answered, setAnswered] = useState<Answered>({});
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>({
    team1: 0,
    team2: 0,
  });
  const [timer, setTimer] = useState<number>(30);
  const [interval, setIntervalObject] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    if (selectedQuestion) {
      setTimer(30);
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      setIntervalObject(intervalId);

      return () => clearInterval(intervalId);
    }
  }, [selectedQuestion]);

  React.useEffect(() => {
    if (timer === 0 && selectedQuestion) {
      clearInterval(interval);
    }
  }, [timer, selectedQuestion, interval]);

  const handleCellClick = (category: string, index: number) => {
    if (!answered[`${category}-${index}`]) {
      setSelectedQuestion({ category, index });
      setShowAnswer(false);
    }
  };

  const handleScore = (team: 'team1' | 'team2', value: number) => {
    setScores((prev) => ({
      ...prev,
      [team]: prev[team] + value,
    }));
    if (selectedQuestion) {
      setAnswered((prev) => ({
        ...prev,
        [`${selectedQuestion.category}-${selectedQuestion.index}`]: true,
      }));
    }
    setSelectedQuestion(null);
  };

  return (
    <div className="p-4 bg-blue-900 min-h-screen">
      <Card className="mb-4 bg-transparent border-none shadow-none">
        <CardContent className="flex justify-center gap-8 p-6">
          <div className="text-white text-2xl font-bold">
            Team 1: ${scores.team1}
          </div>
          <div className="text-white text-2xl font-bold">
            Team 2: ${scores.team2}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-9 gap-2">
        {Object.keys(categories).map((category) => (
          <div key={category} className="text-center">
            <Card className="bg-blue-800 border-none mb-2">
              <CardContent className="p-4 h-16 flex items-center justify-center">
                <span className="text-yellow-300 font-bold line-clamp-2">
                  {category}
                </span>
              </CardContent>
            </Card>

            {categories[category].map((item, index) => (
              <Card
                key={index}
                className={`
                  mb-2 border-none cursor-pointer transition-colors
                  ${
                    answered[`${category}-${index}`]
                      ? 'bg-gray-800'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }
                `}
                onClick={() => handleCellClick(category, index)}
              >
                <CardContent className="p-4 h-16 flex items-center justify-center">
                  <span className="text-yellow-300 font-bold">
                    {answered[`${category}-${index}`] ? '' : '$' + item.value}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <Dialog
        open={selectedQuestion !== null}
        onOpenChange={() => setSelectedQuestion(null)}
      >
        {selectedQuestion && (
          <DialogContent className="bg-blue-900 border-2 border-yellow-300 text-white sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-center space-y-2">
                <div className="text-2xl text-white">{timer}</div>
                <div className="text-2xl text-yellow-300">
                  $
                  {
                    categories[selectedQuestion.category][
                      selectedQuestion.index
                    ].value
                  }
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <p className="text-xl text-center">
                {
                  categories[selectedQuestion.category][selectedQuestion.index]
                    .q
                }
              </p>

              {showAnswer ? (
                <div className="space-y-6">
                  <p className="text-xl text-center text-yellow-300">
                    {
                      categories[selectedQuestion.category][
                        selectedQuestion.index
                      ].a
                    }
                  </p>
                  <div className="flex justify-between gap-2">
                    <Button
                      onClick={() =>
                        handleScore(
                          'team1',
                          categories[selectedQuestion.category][
                            selectedQuestion.index
                          ].value
                        )
                      }
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Team 1 Correct
                    </Button>
                    <Button
                      onClick={() =>
                        handleScore(
                          'team2',
                          categories[selectedQuestion.category][
                            selectedQuestion.index
                          ].value
                        )
                      }
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Team 2 Correct
                    </Button>
                    <Button
                      onClick={() => {
                        setAnswered((prev) => ({
                          ...prev,
                          [`${selectedQuestion.category}-${selectedQuestion.index}`]:
                            true,
                        }));
                        setSelectedQuestion(null);
                      }}
                      variant="destructive"
                    >
                      Incorrect
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                >
                  Show Answer
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default JeopardyGame;
