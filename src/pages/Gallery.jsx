import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Gallery.css";

const galleries = {
  Bedroom: [
    "https://images.unsplash.com/photo-1632119289059-793dd347950f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1768077710231-f3a256362553?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],

  Washroom: [
    "https://images.pexels.com/photos/6585765/pexels-photo-6585765.jpeg",
    "https://images.pexels.com/photos/8082556/pexels-photo-8082556.jpeg",
    "https://images.pexels.com/photos/7167075/pexels-photo-7167075.jpeg",
    "https://images.pexels.com/photos/6758534/pexels-photo-6758534.jpeg",
    "https://images.pexels.com/photos/8082549/pexels-photo-8082549.jpeg"
  ],

  Kitchen: [
    "https://images.pexels.com/photos/18038066/pexels-photo-18038066.jpeg",
    "https://images.pexels.com/photos/16501692/pexels-photo-16501692.jpeg",
    "https://images.pexels.com/photos/34993898/pexels-photo-34993898.jpeg",
    "https://images.pexels.com/photos/31737857/pexels-photo-31737857.jpeg",
    "https://images.pexels.com/photos/4722305/pexels-photo-4722305.jpeg"
  ],

  Apartment: [
    "https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    "https://images.pexels.com/photos/7166561/pexels-photo-7166561.jpeg",
    "https://images.pexels.com/photos/8082559/pexels-photo-8082559.jpeg",
    "https://images.pexels.com/photos/8082203/pexels-photo-8082203.jpeg"
  ],

  House: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    "https://images.pexels.com/photos/7031600/pexels-photo-7031600.jpeg",
    "https://images.pexels.com/photos/7061676/pexels-photo-7061676.jpeg",
    "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg"
  ],

  "Living Room": [
    "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    "https://images.pexels.com/photos/16056400/pexels-photo-16056400.jpeg",
    "https://images.pexels.com/photos/20285350/pexels-photo-20285350.jpeg"
  ],

  Office: [
    "https://images.pexels.com/photos/6794967/pexels-photo-6794967.jpeg",
    "https://images.pexels.com/photos/6794932/pexels-photo-6794932.jpeg",
    "https://images.pexels.com/photos/8453801/pexels-photo-8453801.jpeg",
    "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
"https://images.pexels.com/photos/36631700/pexels-photo-36631700.jpeg"
  ],

  Cafe: [
    "https://images.pexels.com/photos/18304396/pexels-photo-18304396.jpeg",
    "https://images.pexels.com/photos/27152341/pexels-photo-27152341.jpeg",
    "https://images.pexels.com/photos/9371714/pexels-photo-9371714.jpeg",
    "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80"
  ],

  Classroom: [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80",
    "https://images.pexels.com/photos/10036827/pexels-photo-10036827.jpeg",
    "https://images.pexels.com/photos/36650154/pexels-photo-36650154.jpeg",
    "https://images.pexels.com/photos/8423433/pexels-photo-8423433.jpeg",
    "https://images.pexels.com/photos/36834057/pexels-photo-36834057.jpeg"
  ]
};

export default function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "Bedroom";

  const images = galleries[category] || galleries.Bedroom;

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <main className="gallery-page">

      <section className="gallery-viewer">

        <div className="gallery-viewer-top">

          <button
            className="gallery-back-button"
            onClick={goHome}
          >
            ← Back to Recent Work
          </button>

          <span>
            {currentImage + 1} / {images.length}
          </span>

        </div>

        <div className="gallery-heading">

          <p className="eyebrow">
            RECENT WORK
          </p>

          <h1>
            {category}
          </h1>

         

        </div>

        <div className="gallery-main-image">

          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={previousImage}
            aria-label="Previous image"
          >
            ←
          </button>

          <img
            src={images[currentImage]}
            alt={`${category} interior ${currentImage + 1}`}
          />

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            aria-label="Next image"
          >
            →
          </button>

        </div>

        <div className="gallery-bottom">

          <div className="gallery-counter">
            <span>
              {String(currentImage + 1).padStart(2, "0")}
            </span>

            <span>/</span>

            <span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <div className="gallery-controls">

            <button onClick={previousImage}>
              ← Previous
            </button>

            <button onClick={nextImage}>
              Next →
            </button>

          </div>

        </div>

        <div className="gallery-dots">

          {images.map((_, index) => (
            <button
              key={index}
              className={
                index === currentImage
                  ? "active"
                  : ""
              }
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}

        </div>

      </section>

    </main>
  );
}