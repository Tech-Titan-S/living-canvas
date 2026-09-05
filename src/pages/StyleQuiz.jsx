import { useState } from "react";

const quizzes = {
  style: {
    title: "Find My Interior Style",
    description:
      "Discover the interior style that matches your personality.",
    questions: [
      {
        question: "Choose the atmosphere you love.",
        options: [
          ["minimal", "Calm & Minimal"],
          ["boho", "Layered & Bohemian"],
          ["modern", "Sharp & Contemporary"],
          ["classic", "Elegant & Classic"],
        ],
      },
      {
        question: "Pick your favorite material.",
        options: [
          ["minimal", "Light Oak"],
          ["boho", "Rattan"],
          ["modern", "Glass & Metal"],
          ["classic", "Marble"],
        ],
      },
      {
        question: "Which color palette attracts you?",
        options: [
          ["minimal", "White + Beige"],
          ["boho", "Terracotta + Cream"],
          ["modern", "Black + Grey"],
          ["classic", "Cream + Gold"],
        ],
      },
      {
        question: "Choose your dream furniture.",
        options: [
          ["minimal", "Low-profile Sofa"],
          ["boho", "Vintage Sofa"],
          ["modern", "Statement Sofa"],
          ["classic", "Tufted Sofa"],
        ],
      },
      {
        question: "What should your room feel like?",
        options: [
          ["minimal", "Peaceful"],
          ["boho", "Creative"],
          ["modern", "Powerful"],
          ["classic", "Luxurious"],
        ],
      },
    ],
  },

  color: {
    title: "Discover Your Color Personality",
    description:
      "Find the colors that best represent your dream space.",
    questions: [
      {
        question: "Which color instantly attracts you?",
        options: [
          ["warm", "Warm Beige"],
          ["earth", "Terracotta"],
          ["cool", "Ice Blue"],
          ["dark", "Charcoal"],
        ],
      },
      {
        question: "Which wall would you choose?",
        options: [
          ["warm", "Soft Cream"],
          ["earth", "Clay"],
          ["cool", "Soft Blue"],
          ["dark", "Deep Grey"],
        ],
      },
      {
        question: "Choose your favorite accent.",
        options: [
          ["warm", "Gold"],
          ["earth", "Olive"],
          ["cool", "Silver"],
          ["dark", "Black"],
        ],
      },
      {
        question: "Which room feels most like you?",
        options: [
          ["warm", "Sunny & Soft"],
          ["earth", "Natural & Cozy"],
          ["cool", "Fresh & Airy"],
          ["dark", "Dramatic & Bold"],
        ],
      },
    ],
  },

  furniture: {
    title: "Find Your Furniture Style",
    description:
      "Discover the furniture pieces that belong in your dream home.",
    questions: [
      {
        question: "Choose your ideal sofa.",
        options: [
          ["minimal", "Low-profile Sofa"],
          ["vintage", "Vintage Sofa"],
          ["modern", "Sculptural Sofa"],
          ["classic", "Tufted Sofa"],
        ],
      },
      {
        question: "Choose your favorite table.",
        options: [
          ["minimal", "Light Oak Table"],
          ["vintage", "Antique Wood"],
          ["modern", "Glass Table"],
          ["classic", "Marble Table"],
        ],
      },
      {
        question: "Choose a chair.",
        options: [
          ["minimal", "Simple Lounge Chair"],
          ["vintage", "Rattan Chair"],
          ["modern", "Statement Chair"],
          ["classic", "Velvet Chair"],
        ],
      },
    ],
  },

  room: {
    title: "Design Your Dream Room",
    description:
      "Find the room atmosphere that fits your lifestyle.",
    questions: [
      {
        question: "Where do you feel most comfortable?",
        options: [
          ["cozy", "Warm & Cozy"],
          ["bright", "Bright & Airy"],
          ["luxury", "Elegant & Luxurious"],
          ["creative", "Creative & Eclectic"],
        ],
      },
      {
        question: "Choose your ideal lighting.",
        options: [
          ["cozy", "Warm Lamps"],
          ["bright", "Natural Sunlight"],
          ["luxury", "Statement Chandelier"],
          ["creative", "Colorful Ambient Lights"],
        ],
      },
      {
        question: "Pick your dream room.",
        options: [
          ["cozy", "Cozy Living Room"],
          ["bright", "Minimal Bedroom"],
          ["luxury", "Luxury Lounge"],
          ["creative", "Creative Studio"],
        ],
      },
    ],
  },
};


/* =========================================================
   RESULTS
   ========================================================= */

const quizResults = {
  style: {
    minimal: {
      title: "Soft Minimalist",
      description:
        "You love calm spaces, clean lines, natural light and carefully selected furniture.",
      palette: "Ivory · Sand · Warm Oak",
      recommendation:
        "Choose natural wood, soft fabrics and uncluttered furniture.",
    },

    boho: {
      title: "Modern Bohemian",
      description:
        "You enjoy texture, plants, handmade objects and spaces full of personality.",
      palette: "Terracotta · Cream · Olive",
      recommendation:
        "Add woven textures, plants, earthy colors and handmade décor.",
    },

    modern: {
      title: "Contemporary Soul",
      description:
        "You prefer bold architecture, sculptural furniture and sophisticated contrast.",
      palette: "Charcoal · Stone · Ice Blue",
      recommendation:
        "Use clean silhouettes, statement furniture and contrasting materials.",
    },

    classic: {
      title: "Modern Classic",
      description:
        "You love symmetry, elegant materials and timeless details with a contemporary touch.",
      palette: "Cream · Walnut · Brass",
      recommendation:
        "Mix classic furniture with modern lighting and refined metallic details.",
    },
  },

  color: {
    warm: {
      title: "Warm & Inviting",
      description:
        "Your perfect home feels welcoming, soft and naturally comfortable.",
      palette: "Beige · Cream · Warm Gold",
      recommendation:
        "Use warm neutrals with wooden furniture and subtle golden accents.",
    },

    earth: {
      title: "Earthy Soul",
      description:
        "You are drawn to natural colors that make a room feel grounded and organic.",
      palette: "Terracotta · Olive · Cream",
      recommendation:
        "Bring in plants, natural wood, clay décor and woven textures.",
    },

    cool: {
      title: "Cool Serenity",
      description:
        "You prefer fresh, peaceful spaces with an airy and sophisticated atmosphere.",
      palette: "Ice Blue · White · Soft Grey",
      recommendation:
        "Keep the space light with cool colors, glass and minimal furniture.",
    },

    dark: {
      title: "Dramatic Luxe",
      description:
        "You love sophisticated spaces with depth, contrast and a little drama.",
      palette: "Charcoal · Black · Silver",
      recommendation:
        "Use dark walls, statement lighting and luxurious textures.",
    },
  },

  furniture: {
    minimal: {
      title: "Clean & Contemporary",
      description:
        "You prefer furniture that is functional, elegant and visually light.",
      palette: "Oak · Cream · Soft Grey",
      recommendation:
        "Choose simple silhouettes and avoid unnecessary decoration.",
    },

    vintage: {
      title: "Vintage Collector",
      description:
        "You love furniture with history, character and unique details.",
      palette: "Walnut · Cream · Olive",
      recommendation:
        "Mix vintage pieces with modern accents to keep the room fresh.",
    },

    modern: {
      title: "Statement Designer",
      description:
        "You see furniture as artwork and love pieces that immediately attract attention.",
      palette: "Black · Stone · Ice Blue",
      recommendation:
        "Invest in one or two sculptural statement pieces.",
    },

    classic: {
      title: "Timeless Elegance",
      description:
        "You prefer sophisticated furniture with beautiful proportions and luxurious materials.",
      palette: "Cream · Walnut · Brass",
      recommendation:
        "Choose elegant upholstery, marble and timeless silhouettes.",
    },
  },

  room: {
    cozy: {
      title: "The Cozy Retreat",
      description:
        "Your dream room is warm, intimate and designed for relaxation.",
      palette: "Cream · Caramel · Terracotta",
      recommendation:
        "Use soft lighting, layered textiles and comfortable furniture.",
    },

    bright: {
      title: "The Airy Escape",
      description:
        "You feel happiest in bright rooms filled with natural light and open space.",
      palette: "White · Beige · Pale Blue",
      recommendation:
        "Keep furniture light and maximize natural light.",
    },

    luxury: {
      title: "The Luxe Haven",
      description:
        "You want your home to feel sophisticated, elegant and unforgettable.",
      palette: "Cream · Walnut · Brass",
      recommendation:
        "Add premium materials, statement lighting and elegant textures.",
    },

    creative: {
      title: "The Creative Canvas",
      description:
        "Your room should express your personality through color, art and unexpected details.",
      palette: "Terracotta · Olive · Cobalt",
      recommendation:
        "Mix artwork, bold accents, plants and unusual furniture.",
    },
  },
};


/* =========================================================
   COMPONENT
   ========================================================= */

export default function StyleQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  function startQuiz(type) {
    setSelectedQuiz(type);
    setCurrent(0);
    setResult(null);

    const styles = quizzes[type].questions.flatMap((question) =>
      question.options.map(([style]) => style)
    );

    const uniqueStyles = [...new Set(styles)];

    const initialScores = {};

    uniqueStyles.forEach((style) => {
      initialScores[style] = 0;
    });

    setScores(initialScores);
  }

  function answer(style) {
    const updated = {
      ...scores,
      [style]: (scores[style] || 0) + 1,
    };

    setScores(updated);

    const questions = quizzes[selectedQuiz].questions;

    if (current + 1 >= questions.length) {
      const winner = Object.keys(updated).reduce((a, b) =>
        updated[a] > updated[b] ? a : b
      );

      setResult(quizResults[selectedQuiz][winner]);
    } else {
      setCurrent(current + 1);
    }
  }

  function retake() {
    startQuiz(selectedQuiz);
  }

  function backToQuizzes() {
    setSelectedQuiz(null);
    setCurrent(0);
    setResult(null);
    setScores({});
  }

  return (
    <section className="quiz-section" id="style">

      <div className="section-heading center">
        <p className="eyebrow">
          01 · FIND MY STYLE
        </p>

        <h2>
          Discover your
          <i> perfect space.</i>
        </h2>
      </div>


      {/* =====================================================
          QUIZ SELECTION
      ===================================================== */}

      {!selectedQuiz && (
        <div className="quiz-selection">

          {Object.entries(quizzes).map(([key, quiz]) => (
            <article
              className="quiz-choice"
              key={key}
              onClick={() => startQuiz(key)}
            >
              <span className="quiz-icon">
                ✦
              </span>

              <h3>
                {quiz.title}
              </h3>

              <p>
                {quiz.description}
              </p>

              <button
                className="button primary"
                onClick={(e) => {
                  e.stopPropagation();
                  startQuiz(key);
                }}
              >
                Start Quiz
              </button>
            </article>
          ))}

        </div>
      )}


      {/* =====================================================
          QUESTIONS
      ===================================================== */}

      {selectedQuiz && !result && (
        <div className="quiz-card">

          <div className="quiz-top">

            <button
              className="quiz-back"
              onClick={backToQuizzes}
            >
              ← All Quizzes
            </button>

            <span>
              {quizzes[selectedQuiz].title}
            </span>

          </div>


          <div className="progress">

            <span
              style={{
                width: `${
                  ((current + 1) /
                    quizzes[selectedQuiz].questions.length) *
                  100
                }%`,
              }}
            />

          </div>


          <p className="question-number">
            QUESTION {current + 1} OF{" "}
            {quizzes[selectedQuiz].questions.length}
          </p>


          <h3>
            {quizzes[selectedQuiz]
              .questions[current]
              .question}
          </h3>


          <div className="quiz-options">

            {quizzes[selectedQuiz]
              .questions[current]
              .options
              .map(([style, text]) => (
                <button
                  key={text}
                  className="quiz-option"
                  onClick={() => answer(style)}
                >
                  <span>✦</span>
                  {text}
                </button>
              ))}

          </div>

        </div>
      )}


      {/* =====================================================
          RESULT
      ===================================================== */}

      {selectedQuiz && result && (
        <div className="quiz-card quiz-result">

          <p className="eyebrow">
            YOUR LIVING CANVAS RESULT
          </p>

          <h3>
            {result.title}
          </h3>

          <p>
            {result.description}
          </p>

          <p>
            <strong>
              Recommended palette:
            </strong>{" "}
            {result.palette}
          </p>

          <p>
            <strong>
              Your design direction:
            </strong>{" "}
            {result.recommendation}
          </p>


          <div className="quiz-result-actions">

            <button
              className="button primary"
              onClick={retake}
            >
              Retake Quiz
            </button>

            <button
              className="button secondary"
              onClick={backToQuizzes}
            >
              Explore Other Quizzes
            </button>

          </div>

        </div>
      )}

    </section>
  );
}