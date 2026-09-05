import { useRef, useState } from "react";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

/* =========================================================
   OPTIONS
   ========================================================= */

const styleOptions = [
  "Modern",
  "Minimal",
  "Scandinavian",
  "Bohemian",
  "Industrial",
  "Luxury",
  "Traditional",
  "Japandi",
];

const furnitureOptions = [
  "Sofa",
  "Coffee Table",
  "TV Unit",
  "Bed",
  "Wardrobe",
  "Dining Table",
  "Chairs",
  "Bookshelf",
  "Rug",
  "Floor Lamp",
  "Plants",
];

const budgetOptions = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const wallColors = [
  "Warm White",
  "Soft Cream",
  "Sage Green",
  "Dusty Rose",
  "Soft Sky Blue",
  "Terracotta",
  "Charcoal Gray",
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Customizer() {
  /* =========================================================
     REFS
     ========================================================= */

  const fileInputRef = useRef(null);

  /* =========================================================
     STATE
     ========================================================= */

  const [image, setImage] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  const [roomType, setRoomType] =
    useState("Living Room");

  const [style, setStyle] =
    useState("Modern");

  const [wallColor, setWallColor] =
    useState("Warm White");

  const [painting, setPainting] =
    useState("Minimal modern artwork");

  const [budget, setBudget] =
    useState("$1,000 - $3,000");

  const [furniture, setFurniture] =
    useState([]);

  const [extra, setExtra] =
    useState("");

  const [generating, setGenerating] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================================
     IMAGE PROCESSING
     ========================================================= */

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(
          new Error("No image selected.")
        );
        return;
      }

      if (!file.type.startsWith("image/")) {
        reject(
          new Error(
            "Please upload a valid image."
          )
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          const MIN_SIZE = 512;
          const MAX_WIDTH = 1600;
          const MAX_HEIGHT = 1200;

          let width = img.width;
          let height = img.height;

          if (!width || !height) {
            reject(
              new Error(
                "Invalid image dimensions."
              )
            );
            return;
          }

          /* Make very small images larger */
          if (
            width < MIN_SIZE ||
            height < MIN_SIZE
          ) {
            const scale = Math.max(
              MIN_SIZE / width,
              MIN_SIZE / height
            );

            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          /* Prevent extremely large images */
          if (
            width > MAX_WIDTH ||
            height > MAX_HEIGHT
          ) {
            const scale = Math.min(
              MAX_WIDTH / width,
              MAX_HEIGHT / height
            );

            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          const canvas =
            document.createElement("canvas");

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");

          if (!ctx) {
            reject(
              new Error(
                "Could not process image."
              )
            );
            return;
          }

          ctx.fillStyle = "#ffffff";

          ctx.fillRect(
            0,
            0,
            width,
            height
          );

          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );

          const result =
            canvas.toDataURL(
              "image/jpeg",
              0.9
            );

          resolve(result);
        };

        img.onerror = () => {
          reject(
            new Error(
              "Could not read the image."
            )
          );
        };

        img.src =
          event.target.result;
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Could not load image."
          )
        );
      };

      reader.readAsDataURL(file);
    });
  };

  /* =========================================================
     IMAGE UPLOAD
     ========================================================= */

  const handleImageUpload = async (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    try {
      setError("");
      setGeneratedImage("");

      const processed =
        await compressImage(file);

      setImage(processed);
    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      setError(
        err.message ||
          "Unable to process image."
      );
    }

    event.target.value = "";
  };

  /* =========================================================
     REMOVE IMAGE
     ========================================================= */

  const removeImage = () => {
    setImage("");
    setGeneratedImage("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     FURNITURE
     ========================================================= */

  const toggleFurniture = (item) => {
    setFurniture((current) => {
      if (current.includes(item)) {
        return current.filter(
          (value) => value !== item
        );
      }

      return [...current, item];
    });
  };

  /* =========================================================
     DATA URL → BLOB
     ========================================================= */

  const dataUrlToBlob = async (dataUrl) => {
    if (
      !dataUrl ||
      typeof dataUrl !== "string"
    ) {
      throw new Error(
        "No uploaded room image found."
      );
    }

    const response =
      await fetch(dataUrl);

    if (!response.ok) {
      throw new Error(
        "Could not prepare the room image."
      );
    }

    const blob =
      await response.blob();

    if (!blob || blob.size === 0) {
      throw new Error(
        "Uploaded image could not be processed."
      );
    }

    return blob;
  };

  /* =========================================================
     AI PROMPT
     ========================================================= */

  const buildPrompt = () => {
    const furnitureText =
      furniture.length > 0
        ? furniture.join(", ")
        : "Select suitable furniture automatically";

    return `
Redesign this uploaded room photo as a
photorealistic professional interior design.

ROOM TYPE:
${roomType}

INTERIOR STYLE:
${style}

WALL COLOR:
${wallColor}

FURNITURE:
${furnitureText}

WALL ARTWORK:
${painting}

BUDGET:
${budget}

ADDITIONAL INSTRUCTIONS:
${extra || "None"}

IMPORTANT REQUIREMENTS:

Preserve the original room architecture.

Keep:
- walls
- windows
- doors
- ceiling
- floor
- room proportions
- camera position
- camera angle
- perspective
- architectural structure

Do not completely replace the room.

Apply the selected wall color naturally.

Add realistic furniture that fits the
existing room.

Use realistic materials, lighting,
shadows and textures.

Make the result look like professional
interior photography.

The result must be photorealistic.

Do not create:
- people
- text
- logos
- watermarks
- illustrations
- cartoons

Keep the original room recognizable.
`;
  };

  /* =========================================================
     GENERATE
     ========================================================= */

  const generateDesign = async () => {
    if (!image) {
      setError(
        "Please upload a room photo first."
      );
      return;
    }

    if (!HF_TOKEN) {
      setError(
        "Hugging Face token is missing. Add VITE_HF_TOKEN to your .env file."
      );
      return;
    }

    if (generating) return;

    setGenerating(true);
    setError("");
    setGeneratedImage("");

    try {
      const client =
        new InferenceClient(
          HF_TOKEN
        );

      const imageBlob =
        await dataUrlToBlob(image);

      const prompt =
        buildPrompt();

      const result =
        await client.imageToImage({
          inputs: imageBlob,

          model:
            "black-forest-labs/FLUX.1-Kontext-dev",

          parameters: {
            prompt,
            num_inference_steps: 28,
          },
        });

      if (!result) {
        throw new Error(
          "AI did not return an image."
        );
      }

      const resultBlob =
        result instanceof Blob
          ? result
          : new Blob(
              [result],
              {
                type: "image/png",
              }
            );

      if (resultBlob.size === 0) {
        throw new Error(
          "AI returned an empty image."
        );
      }

      const imageUrl =
        URL.createObjectURL(
          resultBlob
        );

      setGeneratedImage(
        imageUrl
      );
    } catch (err) {
      console.error(
        "AI generation error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while generating your room."
      );
    } finally {
      setGenerating(false);
    }
  };

  /* =========================================================
     SAVE IMAGE
     ========================================================= */
/* =========================================================
   SAVE CUSTOMIZER DESIGN
========================================================= */

const saveImage = () => {
  if (!generatedImage) return;

  try {
    const savedDesigns = JSON.parse(
      localStorage.getItem("livingCanvasSavedDesigns") || "[]"
    );

    const newDesign = {
      id: Date.now(),

      type: "AI CUSTOMIZER",

      title: `${roomType} - ${style}`,

      description:
        `AI redesigned ${roomType} in ${style} style with ${wallColor} walls.`,

      image: generatedImage,

      generatedImage: generatedImage,

      roomType: roomType,

      style: style,

      wallColor: wallColor,

      furniture: [...furniture],

      painting: painting,

      budget: budget,

      extra: extra,

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "livingCanvasSavedDesigns",
      JSON.stringify([
        newDesign,
        ...savedDesigns,
      ])
    );

    /* Also download the image */

    const link = document.createElement("a");

    link.href = generatedImage;

    link.download =
      "livingcanvas-redesigned-room.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    alert("Design saved to Saved Designs ✦");

  } catch (error) {
    console.error(
      "Could not save Customizer design:",
      error
    );

    alert("Could not save the design.");
  }
};
  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <main className="ai-studio-header">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="section-heading">

        <p className="eyebrow">
          03 - AI CUSTOMIZER
        </p>

        <h2>
          Personalize Your {}
          <i>Dream Room</i>
        </h2>

        <p>
          Upload your room and customize
          every detail. Our AI will transform
          your existing space into a
          personalized interior design.
        </p>

      </div>

      {/* =====================================================
          MAIN LAYOUT
          ===================================================== */}

      <div className="ai-layout">

        {/* ===================================================
            FORM COLUMN
            =================================================== */}

        <section className="ai-form-column">

          {/* =================================================
              IMAGE
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  01
                </span>

                <h2>
                  Upload Your Room
                </h2>

              </div>

              <span className="ai-required">
                Required
              </span>

            </div>

            <label>
              Room Photo
            </label>

            <p className="field-help">
              Upload a clear photo of your
              existing interior.
            </p>

            {!image ? (

              <label className="ai-upload-box">

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleImageUpload
                  }
                  hidden
                />

                <div className="ai-upload-icon">
                  +
                </div>

                <strong>
                  Upload Room Photo
                </strong>

                <span>
                  JPG, PNG or WEBP
                </span>

                <small>
                  For best results use a
                  clear room photo.
                </small>

              </label>

            ) : (

              <div className="ai-upload-preview">

                <img
                  src={image}
                  alt="Uploaded room"
                />

                <div className="ai-upload-overlay">

                  <span>
                    ROOM PHOTO
                  </span>

                  <button
                    type="button"
                    onClick={
                      removeImage
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              ROOM TYPE
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  02
                </span>

                <h2>
                  Room Type
                </h2>

              </div>

            </div>

            <label>
              What space are you designing?
            </label>

            <select
              value={roomType}
              onChange={(e) =>
                setRoomType(
                  e.target.value
                )
              }
            >

              <option>
                Living Room
              </option>

              <option>
                Bedroom
              </option>

              <option>
                Kitchen
              </option>

              <option>
                Dining Room
              </option>

              <option>
                Bathroom
              </option>

              <option>
                Office
              </option>

              <option>
                Study Room
              </option>

              <option>
                Kids Room
              </option>

              <option>
                Apartment
              </option>

            </select>

          </div>

          {/* =================================================
              STYLE
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  03
                </span>

                <h2>
                  Interior Style
                </h2>

              </div>

            </div>

            <p className="field-help">
              Choose the visual direction
              for your room.
            </p>

            <div className="ai-options">

              {styleOptions.map(
                (item) => (

                  <button
                    type="button"
                    key={item}
                    className={
                      style === item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setStyle(item)
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              WALL COLOR
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  04
                </span>

                <h2>
                  Wall Color
                </h2>

              </div>

            </div>

            <p className="field-help">
              Choose the color you want
              for your walls.
            </p>

            <div className="ai-options">

              {wallColors.map(
                (color) => (

                  <button
                    type="button"
                    key={color}
                    className={
                      wallColor === color
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setWallColor(
                        color
                      )
                    }
                  >
                    {color}
                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              FURNITURE
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  05
                </span>

                <h2>
                  Furniture
                </h2>

              </div>

            </div>

            <p className="field-help">
              Select the furniture you want
              in your redesigned room.
            </p>

            <div className="furniture-options">

              {furnitureOptions.map(
                (item) => (

                  <button
                    type="button"
                    key={item}
                    className={
                      furniture.includes(
                        item
                      )
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      toggleFurniture(
                        item
                      )
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              ARTWORK
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  06
                </span>

                <h2>
                  Wall Artwork
                </h2>

              </div>

            </div>

            <select
              value={painting}
              onChange={(e) =>
                setPainting(
                  e.target.value
                )
              }
            >

              <option>
                Minimal modern artwork
              </option>

              <option>
                Abstract artwork
              </option>

              <option>
                Botanical artwork
              </option>

              <option>
                Black and white photography
              </option>

              <option>
                Large statement artwork
              </option>

              <option>
                Gallery wall
              </option>

              <option>
                No artwork
              </option>

            </select>

          </div>

          {/* =================================================
              BUDGET
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  07
                </span>

                <h2>
                  Budget
                </h2>

              </div>

            </div>

            <p className="field-help">
              Select your approximate
              design budget.
            </p>

            <div className="budget-options">

              {budgetOptions.map(
                (item) => (

                  <button
                    type="button"
                    key={item}
                    className={
                      budget === item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setBudget(item)
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              EXTRA
              ================================================= */}

          <div className="ai-form-card">

            <div className="ai-card-heading">

              <div>

                <span className="ai-step">
                  08
                </span>

                <h2>
                  Additional Instructions
                </h2>

              </div>

            </div>

            <p className="field-help">
              Tell the AI anything else
              you would like.
            </p>

            <textarea
              value={extra}
              onChange={(e) =>
                setExtra(
                  e.target.value
                )
              }
              placeholder="Example: Add warm lighting, wooden furniture, indoor plants and keep the room spacious..."
            />

          </div>

          {/* =================================================
              ERROR
              ================================================= */}

          {error && (
            <div className="ai-error">
              {error}
            </div>
          )}

          {/* =================================================
              GENERATE
              ================================================= */}

          <button
            type="button"
            className="ai-generate-button"
            onClick={
              generateDesign
            }
            disabled={
              generating || !image
            }
          >

            {generating ? (
              <>
                <span className="ai-loading-spinner" />
                Generating Your Room...
              </>
            ) : (
              <>
                Generate My Dream Room
                <span>→</span>
              </>
            )}

          </button>

        </section>

        {/* ===================================================
            PREVIEW COLUMN
            =================================================== */}

        <aside className="ai-preview-column">

          <div className="ai-preview-card">

            <div className="ai-preview-header">

              <div>

                <span className="eyebrow">
                  AI PREVIEW
                </span>

                <h2>
                  Your Room
                </h2>

              </div>

              {generatedImage && (
                <button
                  type="button"
                  className="ai-save-button"
                  onClick={
                    saveImage
                  }
                >
                  Save
                </button>
              )}

            </div>

            {/* =================================================
                EMPTY
                ================================================= */}

            {!image &&
              !generatedImage &&
              !generating && (

                <div className="ai-empty-preview">

                  <div className="ai-empty-icon">
                    ✦
                  </div>

                  <h3>
                    Your design will appear here
                  </h3>

                  <p>
                    Upload a room photo and
                    customize your preferences
                    to create your personalized
                    interior.
                  </p>

                </div>

              )}

            {/* =================================================
                ORIGINAL
                ================================================= */}

            {image &&
              !generatedImage &&
              !generating && (

                <div className="ai-preview-image-wrapper">

                  <img
                    src={image}
                    alt="Original room"
                    className="ai-preview-image"
                  />

                  <div className="ai-preview-label">
                    Original Room
                  </div>

                </div>

              )}

            {/* =================================================
                GENERATING
                ================================================= */}

            {generating && (

              <div className="ai-generating-preview">

                {image && (
                  <img
                    src={image}
                    alt="Generating room"
                    className="ai-preview-image generating-image"
                  />
                )}

                <div className="ai-generating-overlay">

                  <div className="ai-big-spinner" />

                  <h3>
                    Designing Your Room
                  </h3>

                  <p>
                    AI is creating your
                    personalized interior...
                  </p>

                </div>

              </div>

            )}

            {/* =================================================
                RESULT
                ================================================= */}

            {generatedImage &&
              !generating && (

                <div className="ai-generated-result">

                  <div className="ai-preview-image-wrapper">

                    <img
                      src={
                        generatedImage
                      }
                      alt="AI redesigned room"
                      className="ai-preview-image"
                    />

                    <div className="ai-preview-label">
                      AI Redesigned
                    </div>

                  </div>

                  <div className="ai-result-content">

                    <span className="ai-result-eyebrow">
                      YOUR NEW SPACE
                    </span>

                    <h3>
                      Your dream room is ready.
                    </h3>

                    <p>
                      Your room has been
                      redesigned according
                      to your selected
                      preferences.
                    </p>

                    <button
                      type="button"
                      className="ai-save-button large"
                      onClick={
                        saveImage
                      }
                    >
                      Save Redesigned Image
                    </button>

                  </div>

                </div>

              )}

          </div>

          {/* =================================================
              SUMMARY
              ================================================= */}

          <div className="ai-result">

            <div className="ai-result-image-wrapper">

              <div>

               

                <h2 ai-preview-label>
                  Design Summary
                </h2>

              </div>

            </div>

            <div className="ai-summary-card">

              <div className="summary-row">

                <span>
                  Room
                </span>

                <strong>
                  {roomType}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Style
                </span>

                <strong>
                  {style}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Wall Color
                </span>

                <strong>
                  {wallColor}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Artwork
                </span>

                <strong>
                  {painting}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Budget
                </span>

                <strong>
                  {budget}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Furniture
                </span>

                <strong>
                  {furniture.length
                    ? furniture.join(
                        ", "
                      )
                    : "AI selected"}
                </strong>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}