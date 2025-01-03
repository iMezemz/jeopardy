import React, { useState } from 'react';
import { Card, CardContent } from './card';

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

const JeopardyGame: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] =
    useState<SelectedQuestion | null>(null);
  const [answered, setAnswered] = useState<Answered>({});
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>({
    team1: 0,
    team2: 0,
  });
  const [timer, setTimer] = useState<number>(2);
  const [interval, setIntervalObject] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    if (selectedQuestion) {
      setTimer(30); // Reset timer to 30 seconds
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      setIntervalObject(intervalId);

      // Clear the interval when the component unmounts or the question is answered
      return () => clearInterval(intervalId);
    }
  }, [selectedQuestion]);

  // Handle timer expiration
  React.useEffect(() => {
    if (timer === 0 && selectedQuestion) {
      clearInterval(interval); // Stop the timer
    }
  }, [timer, selectedQuestion, interval]);

  const categories: Categories = {
    'Egyptian Football': [
      {
        q: 'This Egyptian won the Premier League Golden Boot three times',
        a: 'Who is Mohamed Salah?',
        value: 200,
      },
      {
        q: 'Egyptian team that won CAF Champions League 2023',
        a: 'What is Al Ahly?',
        value: 400,
      },
      {
        q: 'First Egyptian to play for Arsenal FC',
        a: 'Who is Mohamed Elneny?',
        value: 600,
      },
      {
        q: 'This Egyptian stadium hosted the 2019 AFCON final',
        a: 'What is Cairo International Stadium?',
        value: 800,
      },
      {
        q: 'First Egyptian goalkeeper to play in the Premier League',
        a: 'Who is Ahmed El-Shenawy?',
        value: 1000,
      },
    ],
    'Egyptian Politics': [
      {
        q: 'This Egyptian leader received Nobel Peace Prize',
        a: 'Who is Anwar Sadat?',
        value: 200,
      },
      {
        q: 'Year of the Egyptian Revolution against British rule',
        a: 'What is 1952?',
        value: 400,
      },
      {
        q: 'First female minister in Egyptian history',
        a: 'Who is Hikmat Abu Zeid?',
        value: 600,
      },
      {
        q: "Location of Egypt's planned new capital city",
        a: 'What is east of Cairo?',
        value: 800,
      },
      {
        q: 'Last king of Egypt before becoming a republic',
        a: 'Who is Farouk I?',
        value: 1000,
      },
    ],
    Tech: [
      {
        q: 'First smartphone to use a foldable glass screen',
        a: 'What is Samsung Galaxy Z Flip?',
        value: 200,
      },
      {
        q: 'Company that acquired Activision Blizzard in 2023',
        a: 'What is Microsoft?',
        value: 400,
      },
      {
        q: 'First social media platform to reach 1 billion users',
        a: 'What is Facebook?',
        value: 600,
      },
      {
        q: 'Inventor of the World Wide Web',
        a: 'Who is Tim Berners-Lee?',
        value: 800,
      },
      {
        q: 'First website ever created',
        a: 'What is info.cern.ch?',
        value: 1000,
      },
    ],
    Cars: [
      {
        q: 'First mass-produced electric car',
        a: 'What is the Nissan Leaf?',
        value: 200,
      },
      { q: 'Company that owns Rolls-Royce', a: 'What is BMW?', value: 400 },
      {
        q: 'First car to have air conditioning',
        a: 'What is the Packard?',
        value: 600,
      },
      {
        q: 'First production car with a turbocharged engine',
        a: 'What is the Oldsmobile Jetfire?',
        value: 800,
      },
      {
        q: 'First car to use three-point seat belts',
        a: 'What is the Volvo Amazon?',
        value: 1000,
      },
    ],
    Film: [
      {
        q: 'First streaming service film to win Best Picture',
        a: 'What is CODA?',
        value: 200,
      },
      {
        q: 'Actress with most Oscar nominations',
        a: 'Who is Meryl Streep?',
        value: 400,
      },
      {
        q: 'First fully CGI character in a movie',
        a: 'What is the stained glass knight in Young Sherlock Holmes?',
        value: 600,
      },
      {
        q: 'Most expensive movie never made',
        a: 'What is Dune by Alejandro Jodorowsky?',
        value: 800,
      },
      {
        q: 'First film shot entirely on a smartphone',
        a: 'What is Olive?',
        value: 1000,
      },
    ],
    'American Hip-Hop': [
      {
        q: 'First rap album to win Album of the Year Grammy',
        a: 'What is Speakerboxxx/The Love Below?',
        value: 200,
      },
      {
        q: 'Youngest rapper to hit #1 on Billboard Hot 100',
        a: 'Who is Lil Nas X?',
        value: 400,
      },
      {
        q: 'First rap video played on MTV',
        a: 'What is Rock Box by Run-DMC?',
        value: 600,
      },
      {
        q: 'Only rapper to have two diamond-certified albums',
        a: 'Who is Eminem?',
        value: 800,
      },
      {
        q: 'First hip-hop album inducted into Library of Congress',
        a: 'What is Straight Outta Compton?',
        value: 1000,
      },
    ],
    Geography: [
      {
        q: 'Only continent that lies in all four hemispheres',
        a: 'What is Africa?',
        value: 200,
      },
      { q: 'Country with the most islands', a: 'What is Sweden?', value: 400 },
      {
        q: 'Only country that borders both the Atlantic and Indian oceans',
        a: 'What is South Africa?',
        value: 600,
      },
      {
        q: "Lowest point on Earth's continental crust",
        a: 'What is the Dead Sea?',
        value: 800,
      },
      {
        q: 'Only country with a non-rectangular flag',
        a: 'What is Nepal?',
        value: 1000,
      },
    ],
    'General Knowledge': [
      {
        q: 'Only planet that rotates clockwise',
        a: 'What is Venus?',
        value: 200,
      },
      { q: 'Element named after the sun', a: 'What is Helium?', value: 400 },
      {
        q: 'Only bird known to fly backwards',
        a: 'What is the hummingbird?',
        value: 600,
      },
      { q: 'First animal to orbit the Earth', a: 'What is Laika?', value: 800 },
      {
        q: 'Only number whose letters appear in alphabetical order',
        a: 'What is forty?',
        value: 1000,
      },
    ],
    Surprise: [
      {
        q: 'Only continent without reptiles or snakes',
        a: 'What is Antarctica?',
        value: 200,
      },
      {
        q: "Country where you can't take photos of the Eiffel Tower at night",
        a: 'What is France?',
        value: 400,
      },
      {
        q: "Only mammal that can't produce its own vitamin C",
        a: 'What are humans?',
        value: 600,
      },
      {
        q: "City where it's illegal to build buildings taller than church",
        a: 'What is Washington D.C.?',
        value: 800,
      },
      {
        q: "Only country where McDonald's food isn't yellow",
        a: 'What is Japan?',
        value: 1000,
      },
    ],
    'International Football': [
      {
        q: 'First African team to score at World Cup',
        a: 'What is Morocco?',
        value: 200,
      },
      {
        q: 'Player with most Champions League appearances',
        a: 'Who is Cristiano Ronaldo?',
        value: 400,
      },
      {
        q: 'Team with longest unbeaten run in international football',
        a: 'What is Italy?',
        value: 600,
      },
      {
        q: 'First player to score in five World Cups',
        a: 'Who is Cristiano Ronaldo?',
        value: 800,
      },
      {
        q: 'Only goalkeeper to score in Champions League',
        a: 'Who is Sinan Bolat?',
        value: 1000,
      },
    ],
  };

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
      <div className="m-auto mb-4 flex-column align-center items-center">
        <div className="text-white text-xl text-center">
          Team 1: ${scores.team1}
        </div>
        <div className="text-white text-xl text-center">
          Team 2: ${scores.team2}
        </div>
      </div>
      <div className="grid grid-cols-9 gap-2">
        {Object.keys(categories).map((category) => (
          <div key={category} className="text-center">
            <div className="bg-blue-800 text-yellow-300 p-2 mb-2 h-16 flex items-center justify-center font-bold">
              {category}
            </div>
            {categories[category].map((item, index) => (
              <div
                key={index}
                onClick={() => handleCellClick(category, index)}
                className={`
                  ${
                    answered[`${category}-${index}`]
                      ? 'bg-gray-800'
                      : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                  }
                  text-yellow-300 p-4 mb-2 h-16 flex items-center justify-center font-bold
                `}
              >
                {answered[`${category}-${index}`] ? '' : '$' + item.value}
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6 bg-blue-900 border-2 border-yellow-300 text-white">
              <div className="text-2xl mb-4 font-bold">{timer}</div>
              <div className="text-2xl mb-4 text-yellow-300">
                $
                {
                  categories[selectedQuestion.category][selectedQuestion.index]
                    .value
                }
              </div>
              <div className="text-xl mb-6">
                {
                  categories[selectedQuestion.category][selectedQuestion.index]
                    .q
                }
              </div>
              {showAnswer ? (
                <div>
                  <div className="text-xl mb-6 text-yellow-300">
                    {
                      categories[selectedQuestion.category][
                        selectedQuestion.index
                      ].a
                    }
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        handleScore(
                          'team1',
                          categories[selectedQuestion.category][
                            selectedQuestion.index
                          ].value
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Team 1 Correct
                    </button>
                    <button
                      onClick={() =>
                        handleScore(
                          'team2',
                          categories[selectedQuestion.category][
                            selectedQuestion.index
                          ].value
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Team 2 Correct
                    </button>
                    <button
                      onClick={() => {
                        setAnswered((prev) => ({
                          ...prev,
                          [`${selectedQuestion.category}-${selectedQuestion.index}`]:
                            true,
                        }));
                        setSelectedQuestion(null);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Incorrect
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-yellow-500 text-blue-900 px-4 py-2 rounded w-full"
                >
                  Show Answer
                </button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JeopardyGame;
