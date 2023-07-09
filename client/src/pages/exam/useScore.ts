import React from "react";

export function useScore() {
  const [score, setScore] = React.useState(0);
  const [showAnswers, setShowAnswers] = React.useState(false);

  return {
    score: showAnswers ? score : null,
    setScore,
    showAnswers,
    setShowAnswers,
  };
}
