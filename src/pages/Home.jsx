import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // ================= PALETTE =================
  const [colors] = useState(() => {
    const saved = localStorage.getItem("livingCanvasPalette");

    try {
      return saved
        ? JSON.parse(saved)
        : [
            "#C9A98A",
            "#9FB8C4",
            "#A77B5A",
            "#D8C5A9",
            "#657057",
          ];
    } catch {
      return [
        "#C9A98A",
        "#9FB8C4",
        "#A77B5A",
        "#D8C5A9",
        "#657057",
      ];
    }
  });

  // ================= RECENT WORK CATEGORIES =================
  const categories = [
    {
      title: "Bedroom",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
      description:
        "Calm, comfortable bedrooms designed for rest and relaxation.",
    },
    {
      title: "Washroom",
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=85",
      description:
        "Elegant washroom interiors with clean lines and refined details.",
    },
    {
      title: "Kitchen",
      image:
        "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1000&q=85",
      description:
        "Functional kitchens where thoughtful design meets everyday living.",
    },
    {
      title: "Apartment",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
      description:
        "Modern apartment interiors designed around comfort and personality.",
    },
    {
      title: "House",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      description:
        "Beautiful residential spaces created for modern living.",
    },
    {
      title: "Living Room",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
      description:
        "Inviting living spaces built around comfort, warmth and style.",
    },
    {
      title: "Office",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
      description:
        "Productive workspaces balancing function, focus and aesthetics.",
    },
    {
      title: "Cafe",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
      description:
        "Atmospheric cafe interiors made for memorable experiences.",
    },
    {
      title: "Classroom",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
      description:
        "Thoughtful learning environments designed for creativity and focus.",
    },
  ];

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">YOUR SPACE · YOUR STORY</p>

          <h1>
            Your Space.
            <i> Your Story.</i>
          </h1>

          <p className="hero-text">
            Upload your room, discover your design personality,
            experiment with furniture and create a space that feels
            completely yours.
          </p>

          <div className="hero-actions">
            <Link to="/customizer" className="button primary">
              Design My Room →
            </Link>

            <Link to="/style" className="button glass">
              Find My Style
            </Link>
          </div>
        </div>

        {/* HERO STATS */}
        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Upload</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Imagine</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Create</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="intro">
        <div>
          <p className="eyebrow">WELCOME TO LIVING CANVAS</p>

          <h2>
            Your room is the
            <i> canvas.</i>
          </h2>
        </div>

        <p>
          Living Canvas turns interior design into an experience.
          Experiment with colors, furniture, textures and objects
          before you commit to them in real life.
        </p>
      </section>

      {/* =====================================================
          DISCOVER YOUR STYLE
      ====================================================== */}
      <section className="home-discovery">
        <div className="home-discovery-heading">
          <span className="eyebrow">DISCOVER YOUR STYLE</span>

          <h2>
            Design a space that feels
            <em> like you.</em>
          </h2>

          <p>
            Explore your style, experiment with colors and create a
            room that reflects your personality.
          </p>
        </div>

        <div className="home-discovery-grid">

          {/* ================= STYLE QUIZ ================= */}
          <article className="discovery-card quiz-card">
            <div className="discovery-card-top">
              <span className="discovery-number">01</span>

              <span className="discovery-label">
                STYLE QUIZ
              </span>
            </div>

            <div className="discovery-content">
              <h3>
                What's your
                <br />
                interior personality?
              </h3>

              <p>
                Answer a few simple questions and discover the design
                style that matches your personality.
              </p>

              <Link
                to="/style"
                className="discovery-button"
              >
                Take the Style Quiz
                <span>→</span>
              </Link>
            </div>

            <div className="quiz-decoration">
              <div className="quiz-room room-one"></div>
              <div className="quiz-room room-two"></div>
              <div className="quiz-room room-three"></div>
            </div>
          </article>

          {/* ================= COLOR PALETTE ================= */}
          <article className="discovery-card palette-card">
            <div className="discovery-card-top">
              <span className="discovery-number">02</span>

              <span className="discovery-label">
                COLOR LAB
              </span>
            </div>

            <div className="discovery-content">
              <h3>
                Find your perfect
                <br />
                color palette.
              </h3>

              <p>
                Explore beautiful combinations and create a palette
                that brings your room to life.
              </p>

              <Link
                to="/color-lab"
                className="discovery-button"
              >
                Explore Color Lab
                <span>→</span>
              </Link>
            </div>

            {/* LIVE PALETTE */}
            <div className="palette-display">
              <div
                className="palette-circle palette-one"
                style={{
                  backgroundColor: colors[0],
                }}
              />

              <div
                className="palette-circle palette-two"
                style={{
                  backgroundColor: colors[1],
                }}
              />

              <div
                className="palette-circle palette-three"
                style={{
                  backgroundColor: colors[2],
                }}
              />

              <div
                className="palette-circle palette-four"
                style={{
                  backgroundColor: colors[3],
                }}
              />

              <div
                className="palette-circle palette-five"
                style={{
                  backgroundColor: colors[4],
                }}
              />
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          RECENT WORK
      ====================================================== */}
      <section
        className="recent-projects"
        id="recent-projects"
      >
        <div className="section-heading center">
          <p className="eyebrow">03 · RECENT WORK</p>

          <h2>
            Explore <i>beautiful spaces.</i>
          </h2>

          <p>
            Discover our latest interior concepts across different
            types of spaces.
          </p>
        </div>

        <div className="recent-work-grid">

          {categories.map((category, index) => (
            <article
              className="recent-work-card"
              key={category.title}
            >

              <div
                className="recent-work-image"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="recent-work-info">

                <small>
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {category.title.toUpperCase()}
                </small>

               

                <p>{category.description}</p>

                <button
                  className="gallery-button"
                  onClick={() =>
                    navigate(
                      `/gallery?category=${encodeURIComponent(
                        category.title
                      )}`
                    )
                  }
                >
                  Show Gallery →
                </button>

              </div>

            </article>
          ))}

        </div>
      </section>

      {/* =====================================================
          EXPLORE TOOLS
      ====================================================== */}
      <section className="home-tools">
        <div className="section-heading center">
          <p className="eyebrow">
            EXPLORE LIVING CANVAS
          </p>

          <h2>
            Everything you need to
            <i> design.</i>
          </h2>
        </div>
      </section>
    </>
  );
}