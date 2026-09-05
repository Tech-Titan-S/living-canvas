import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedDesigns.css";

const STORAGE_KEY = "livingCanvasSavedDesigns";

export default function SavedDesigns() {
  const navigate = useNavigate();

  const [designs, setDesigns] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  /* =========================================================
     LOAD SAVED DESIGNS
  ========================================================= */

  useEffect(() => {
    loadDesigns();
  }, []);

  function loadDesigns() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (Array.isArray(saved)) {
        setDesigns(saved);
      } else {
        setDesigns([]);
      }
    } catch (error) {
      console.error(
        "Could not load saved designs:",
        error
      );

      setDesigns([]);
    }
  }

  /* =========================================================
     GET DESIGN TYPE
  ========================================================= */

  function getDesignType(design) {
    const type = String(
      design?.type || ""
    ).toLowerCase();

    if (
      type.includes("planner") ||
      type.includes("2d") ||
      type.includes("room plan")
    ) {
      return "planner";
    }

    if (
      type.includes("ai") ||
      type.includes("customizer")
    ) {
      return "ai";
    }

    if (
      type.includes("palette") ||
      type.includes("color")
    ) {
      return "palette";
    }

    return "other";
  }

  /* =========================================================
     GET IMAGE
  ========================================================= */

  function getDesignImage(design) {
    if (!design) {
      return null;
    }

    /*
      New Planner format:
      design.image
    */

    if (
      typeof design.image === "string" &&
      design.image.trim()
    ) {
      return design.image;
    }

    /*
      Some AI designs may store imageUrl
    */

    if (
      typeof design.imageUrl === "string" &&
      design.imageUrl.trim()
    ) {
      return design.imageUrl;
    }

    /*
      Some AI designs may store generatedImage
    */

    if (
      typeof design.generatedImage === "string" &&
      design.generatedImage.trim()
    ) {
      return design.generatedImage;
    }

    /*
      Designs using a nested data object
    */

    if (
      design.data &&
      typeof design.data.image === "string" &&
      design.data.image.trim()
    ) {
      return design.data.image;
    }

    if (
      design.data &&
      typeof design.data.imageUrl === "string" &&
      design.data.imageUrl.trim()
    ) {
      return design.data.imageUrl;
    }

    return null;
  }

  /* =========================================================
     GET TITLE
  ========================================================= */

  function getDesignTitle(design) {
    return (
      design?.title ||
      design?.name ||
      "Untitled Design"
    );
  }

  /* =========================================================
     GET DESCRIPTION
  ========================================================= */

  function getDesignDescription(design) {
    if (design?.description) {
      return design.description;
    }

    if (design?.type) {
      return design.type;
    }

    return "Saved interior design";
  }

  /* =========================================================
     GET DATE
  ========================================================= */

  function getDesignDate(design) {
    if (!design?.createdAt) {
      return "";
    }

    try {
      return new Date(
        design.createdAt
      ).toLocaleDateString();
    } catch {
      return "";
    }
  }

  /* =========================================================
     GET COLORS
  ========================================================= */

  function getColors(design) {
    if (Array.isArray(design?.colors)) {
      return design.colors;
    }

    if (
      design?.data &&
      Array.isArray(design.data.colors)
    ) {
      return design.data.colors;
    }

    if (
      Array.isArray(design?.palette)
    ) {
      return design.palette;
    }

    return [];
  }

  /* =========================================================
     GET FURNITURE
  ========================================================= */

  function getFurniture(design) {
    if (Array.isArray(design?.furniture)) {
      return design.furniture;
    }

    if (
      design?.data &&
      Array.isArray(design.data.furniture)
    ) {
      return design.data.furniture;
    }

    return [];
  }

  /* =========================================================
     FILTER DESIGNS
  ========================================================= */

  const filteredDesigns = designs.filter(
    (design) => {
      const type = getDesignType(design);

      const matchesFilter =
        activeFilter === "all" ||
        type === activeFilter;

      const title =
        getDesignTitle(design).toLowerCase();

      const description =
        getDesignDescription(
          design
        ).toLowerCase();

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        description.includes(searchValue);

      return (
        matchesFilter &&
        matchesSearch
      );
    }
  );

  /* =========================================================
     DELETE DESIGN
  ========================================================= */

  function deleteDesign(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this design?"
    );

    if (!confirmed) {
      return;
    }

    const updated = designs.filter(
      (design) => design.id !== id
    );

    setDesigns(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  /* =========================================================
     START RENAME
  ========================================================= */

  function startRename(design) {
    setEditingId(design.id);
    setEditingTitle(
      getDesignTitle(design)
    );
  }

  /* =========================================================
     SAVE RENAMED DESIGN
  ========================================================= */

  function saveRename(id) {
    const newTitle =
      editingTitle.trim();

    if (!newTitle) {
      setEditingId(null);
      setEditingTitle("");
      return;
    }

    const updated = designs.map(
      (design) =>
        design.id === id
          ? {
              ...design,
              title: newTitle,
            }
          : design
    );

    setDesigns(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setEditingId(null);
    setEditingTitle("");
  }

  /* =========================================================
     OPEN DESIGN
  ========================================================= */
function openDesign(design) {
  const type = getDesignType(design);

  // Save the design currently being opened
  localStorage.setItem(
    "livingCanvasCurrentDesign",
    JSON.stringify(design)
  );

  if (type === "planner") {
    navigate("/planner");
    return;
  }

  if (type === "ai") {
    navigate("/customizer");
    return;
  }

  if (type === "palette") {
    navigate("/color-lab");
    return;
  }

  navigate("/planner");
}

  /* =========================================================
     CLEAR ALL
  ========================================================= */

  function clearAllDesigns() {
    if (!designs.length) {
      return;
    }

    const confirmed = window.confirm(
      "Delete all saved designs?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEY
    );

    setDesigns([]);
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (
    designs.length === 0
  ) {
    return (
      <section className="saved-designs-page">

        <div className="saved-designs-header">
          <p className="eyebrow">
            YOUR CREATIVE SPACE
          </p>

          <h2>
            Saved <i>Designs</i>
          </h2>

          <p>
            Your favorite room plans, AI
            concepts and color palettes
            will appear here.
          </p>
        </div>

        <div className="saved-empty-state">

          <div className="saved-empty-icon">
            ✦
          </div>

          <h2>
            No saved designs yet
          </h2>

          <p>
            Start creating your dream room
            and save your favorite designs
            here.
          </p>

          <div className="saved-empty-actions">

            <button
              type="button"
              onClick={() =>
                navigate("/planner")
              }
            >
              Open Room Planner
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate("/customizer")
              }
            >
              Try AI Designer
            </button>

          </div>

        </div>

      </section>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <section className="saved-designs-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="saved-designs-header">

        <div>
          <p className="eyebrow">
            YOUR CREATIVE SPACE
          </p>

          <h1>
            Saved <i>Designs</i>
          </h1>

    
        </div>

        <div className="saved-designs-count">
          <strong>
            {designs.length}
          </strong>

          <span>
            Saved Designs
          </span>
        </div>

      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="saved-designs-toolbar">

        <div className="saved-filters">

          <button
            type="button"
            className={
              activeFilter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter("all")
            }
          >
            All
          </button>

          <button
            type="button"
            className={
              activeFilter === "planner"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter("planner")
            }
          >
            Planner
          </button>

          <button
            type="button"
            className={
              activeFilter === "ai"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter("ai")
            }
          >
            AI Designs
          </button>

          <button
            type="button"
            className={
              activeFilter === "palette"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter("palette")
            }
          >
            Palettes
          </button>

        </div>

        <div className="saved-toolbar-right">

          <div className="saved-search">

            <span>
              🔎
            </span>

            <input
              type="text"
              placeholder="Search designs..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <button
            type="button"
            className="clear-all-button"
            onClick={
              clearAllDesigns
            }
          >
            Clear All
          </button>

        </div>

      </div>

      {/* =====================================================
          NO FILTER RESULTS
      ===================================================== */}

      {filteredDesigns.length === 0 && (
        <div className="saved-no-results">

          <div>
            🔎
          </div>

          <h3>
            No designs found
          </h3>

          <p>
            Try another search or choose
            a different filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveFilter("all");
            }}
          >
            Show All Designs
          </button>

        </div>
      )}

      {/* =====================================================
          DESIGN GRID
      ===================================================== */}

      {filteredDesigns.length > 0 && (
        <div className="saved-designs-grid">

          {filteredDesigns.map(
            (design) => {

              const image =
                getDesignImage(
                  design
                );

              const type =
                getDesignType(
                  design
                );

              const title =
                getDesignTitle(
                  design
                );

              const description =
                getDesignDescription(
                  design
                );

              const colors =
                getColors(
                  design
                );

              const furniture =
                getFurniture(
                  design
                );

              return (
                <article
                  className="saved-design-card"
                  key={design.id}
                >

                  {/* =========================================
                      PREVIEW IMAGE
                  ========================================= */}

                  <div className="saved-design-preview">

                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="saved-design-image"
                      />
                    ) : (
                      <div className="saved-design-no-image">

                        <div className="no-image-icon">
                          ✦
                        </div>

                        <span>
                          No preview available
                        </span>

                      </div>
                    )}

                    {/* TYPE BADGE */}

                    <span className="saved-design-type">
                      {type === "planner" &&
                        "2D Planner"}

                      {type === "ai" &&
                        "AI Design"}

                      {type === "palette" &&
                        "Color Palette"}

                      {type === "other" &&
                        "Design"}
                    </span>

                  </div>

                  {/* =========================================
                      CARD CONTENT
                  ========================================= */}

                  <div className="saved-design-content">

                    {editingId ===
                    design.id ? (
                      <div className="rename-box">

                        <input
                          type="text"
                          value={
                            editingTitle
                          }
                          autoFocus
                          onChange={(e) =>
                            setEditingTitle(
                              e.target.value
                            )
                          }
                          onKeyDown={(e) => {
                            if (
                              e.key ===
                              "Enter"
                            ) {
                              saveRename(
                                design.id
                              );
                            }

                            if (
                              e.key ===
                              "Escape"
                            ) {
                              setEditingId(
                                null
                              );

                              setEditingTitle(
                                ""
                              );
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            saveRename(
                              design.id
                            )
                          }
                        >
                          Save
                        </button>

                      </div>
                    ) : (
                      <div className="saved-design-title-row">

                        <h3>
                          {title}
                        </h3>

                        <button
                          type="button"
                          className="rename-button"
                          title="Rename"
                          onClick={() =>
                            startRename(
                              design
                            )
                          }
                        >
                          ✎
                        </button>

                      </div>
                    )}

                    <p className="saved-design-description">
                      {description}
                    </p>

                    {/* DATE */}

                    {getDesignDate(
                      design
                    ) && (
                      <div className="saved-design-date">
                        Saved{" "}
                        {getDesignDate(
                          design
                        )}
                      </div>
                    )}

                    {/* =====================================
                        PLANNER DETAILS
                    ===================================== */}

                    {type ===
                      "planner" &&
                      furniture.length >
                        0 && (
                        <div className="saved-design-meta">

                          <span>
                            📐{" "}
                            {design.width ||
                              design.data
                                ?.width ||
                              "—"}{" "}
                            ×{" "}
                            {design.height ||
                              design.data
                                ?.height ||
                              "—"}
                          </span>

                          <span>
                            🪑{" "}
                            {
                              furniture.length
                            }{" "}
                            pieces
                          </span>

                        </div>
                      )}

                    {/* =====================================
                        COLORS
                    ===================================== */}

                    {colors.length >
                      0 && (
                      <div className="saved-colors">

                        {colors
                          .slice(0, 8)
                          .map(
                            (
                              color,
                              index
                            ) => {

                              const value =
                                typeof color ===
                                "string"
                                  ? color
                                  : color
                                      ?.hex ||
                                    color
                                      ?.color ||
                                    "#ddd";

                              return (
                                <span
                                  key={
                                    index
                                  }
                                  className="saved-color"
                                  style={{
                                    backgroundColor:
                                      value,
                                  }}
                                  title={
                                    value
                                  }
                                />
                              );
                            }
                          )}

                      </div>
                    )}

                    {/* =====================================
                        ACTIONS
                    ===================================== */}

                    <div className="saved-design-actions">

                      <button
                        type="button"
                        className="open-design-button"
                        onClick={() =>
                          openDesign(
                            design
                          )
                        }
                      >
                        Open Design
                      </button>

                      <button
                        type="button"
                        className="delete-design-button"
                        title="Delete design"
                        onClick={() =>
                          deleteDesign(
                            design.id
                          )
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>
      )}

    </section>
  );
}