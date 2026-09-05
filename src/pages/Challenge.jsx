import { useState } from "react";

export default function Challenge() {
  const [score, setScore] =
    useState(0);

  function takeChallenge() {
    const colors = Number(
      prompt(
        "How many colors did you use? (1-5)"
      )
    );

    const budget = Number(
      prompt(
        "What is your estimated budget in Rs.?"
      )
    );

    const furniture = Number(
      prompt(
        "How many furniture/decor pieces did you use?"
      )
    );

    let newScore = 0;

    if (
      colors >= 2 &&
      colors <= 3
    ) {
      newScore += 30;
    }

    if (
      budget > 0 &&
      budget <= 50000
    ) {
      newScore += 40;
    }

    if (furniture >= 3) {
      newScore += 30;
    }

    setScore(newScore);

    alert(
      newScore >= 80
        ? `Amazing! Your design scored ${newScore}/100.`
        : `Your design scored ${newScore}/100. Try refining your design!`
    );
  }

  return (
    <section className="challenge-section">
      <div className="challenge-content">
        <p className="eyebrow">
          06 · WEEKLY CHALLENGE
        </p>

        <h2>
          Design a
          <i> dream reading corner.</i>
        </h2>

        <p>
          Create a cozy reading space using only
          three colors and a maximum budget of
          Rs. 50,000.
        </p>

        <div className="challenge-rules">
          <span>3 COLORS</span>
          <span>Rs. 50K MAX</span>
          <span>1 WEEK</span>
        </div>

        <button
          className="button primary"
          onClick={takeChallenge}
        >
          Take the Challenge →
        </button>
      </div>

      <div className="challenge-score">
        <div className="score-circle">
          <strong>{score}</strong>
          <span>/100</span>
        </div>

        <p>Your Design Score</p>

        <small>
          Complete the challenge to earn points.
        </small>
      </div>
    </section>
  );
}