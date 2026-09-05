
import { useEffect, useRef, useState } from "react";
import "./Planner.css";
import html2canvas from "html2canvas";
/* =========================================================
   ROOM TYPES
========================================================= */

const roomOptions = [
  { value: "living", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "tv-lounge", label: "TV Lounge" },
  { value: "dining", label: "Dining Room" },
];

/* =========================================================
   FURNITURE
========================================================= */

const furnitureByRoom = {
  living: [
    "Sofa",
    "Coffee Table",
    "TV",
    "TV Console",
    "Armchair",
    "Rug",
    "Plant",
    "Floor Lamp",
  ],

  bedroom: [
    "Bed",
    "Nightstand",
    "Wardrobe",
    "Dresser",
    "Desk",
    "Chair",
    "Rug",
    "Lamp",
  ],

  kitchen: [
    "Kitchen Island",
    "Counter",
    "Dining Table",
    "Chair",
    "Refrigerator",
    "Stove",
    "Sink",
    "Cabinet",
  ],

  "tv-lounge": [
    "Sectional Sofa",
    "TV",
    "TV Console",
    "Recliner",
    "Coffee Table",
    "Media Unit",
    "Rug",
    "Floor Lamp",
  ],

  dining: [
    "Dining Table",
    "Dining Chair",
    "Sideboard",
    "Cabinet",
    "Bar Cart",
    "Plant",
    "Pendant Light",
  ],
};

/* =========================================================
   ORIGINAL 2D FURNITURE CLASS MAP
========================================================= */

const furnitureClass = {
  Sofa: "furniture-sofa",
  Bed: "furniture-bed",
  Chair: "furniture-chair",
  Armchair: "furniture-armchair",
  "Coffee Table": "furniture-coffee-table",
  "Dining Table": "furniture-dining-table",
  TV: "furniture-tv",
  "TV Console": "furniture-tv-console",
  Wardrobe: "furniture-wardrobe",
  Nightstand: "furniture-nightstand",
  Dresser: "furniture-dresser",
  Desk: "furniture-desk",
  Rug: "furniture-rug",
  Plant: "furniture-plant",
  "Floor Lamp": "furniture-floor-lamp",
  Lamp: "furniture-floor-lamp",
  Refrigerator: "furniture-refrigerator",
  Stove: "furniture-stove",
  Sink: "furniture-sink",
  Cabinet: "furniture-cabinet",
  "Kitchen Island": "furniture-kitchen-island",
  Counter: "furniture-counter",
  "Sectional Sofa": "furniture-sectional-sofa",
  Recliner: "furniture-recliner",
  "Media Unit": "furniture-media-unit",
  Sideboard: "furniture-sideboard",
  "Bar Cart": "furniture-bar-cart",
  "Pendant Light": "furniture-pendant-light",
  "Dining Chair": "furniture-chair",
};
/* =========================================================
   MAIN PLANNER
========================================================= */

export default function Planner() {
  const [roomType, setRoomType] =
    useState("living");

  const [width, setWidth] =
    useState(500);

  const [height, setHeight] =
    useState(350);

  const [items, setItems] =
    useState([]);

  const floorRef =
    useRef(null);

  const itemRefs =
    useRef({});

  const dragRef =
    useRef({});

  /* =========================================================
     ROOM CHANGE
  ========================================================= */

  function handleRoomChange(e) {
    setRoomType(e.target.value);
    setItems([]);
  }

  /* =========================================================
     CLAMP NUMBER
  ========================================================= */

  function clampNumber(
    value,
    min,
    max,
    fallback
  ) {
    const n = parseInt(
      value,
      10
    );

    if (Number.isNaN(n)) {
      return fallback;
    }

    return Math.max(
      min,
      Math.min(max, n)
    );
  }

  /* =========================================================
     KEEP FURNITURE INSIDE ROOM
  ========================================================= */

  useEffect(() => {
    setItems((prev) =>
      prev.map((item) => {
        const el =
          itemRefs.current[
            item.id
          ];

        const halfWidth =
          el
            ? el.offsetWidth / 2
            : 40;

        const halfHeight =
          el
            ? el.offsetHeight / 2
            : 40;

        return {
          ...item,

          left: Math.max(
            halfWidth,
            Math.min(
              width - halfWidth,
              item.left
            )
          ),

          top: Math.max(
            halfHeight,
            Math.min(
              height - halfHeight,
              item.top
            )
          ),
        };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);
  useEffect(() => {
  const savedDesign = localStorage.getItem(
    "livingCanvasCurrentDesign"
  );

  if (!savedDesign) return;

  try {
    const design = JSON.parse(savedDesign);

    // Restore room type
    if (design.roomType) {
      setRoomType(design.roomType);
    }

    // Restore room dimensions
    if (design.width) {
      setWidth(Number(design.width));
    }

    if (design.height) {
      setHeight(Number(design.height));
    }

    // Restore furniture and positions
    if (Array.isArray(design.furniture)) {
      const restoredFurniture =
        design.furniture.map((item, index) => ({
          id:
            Date.now() +
            index +
            Math.random(),

          name:
            item.name || "Chair",

          left:
            typeof item.left === "string"
              ? parseFloat(item.left)
              : Number(item.left) || 0,

          top:
            typeof item.top === "string"
              ? parseFloat(item.top)
              : Number(item.top) || 0,
        }));

      setItems(restoredFurniture);
    }

    // Remove temporary data after loading
    localStorage.removeItem(
      "livingCanvasCurrentDesign"
    );

  } catch (error) {
    console.error(
      "Failed to open saved design:",
      error
    );

    localStorage.removeItem(
      "livingCanvasCurrentDesign"
    );
  }
}, []);

  /* =========================================================
     ADD FURNITURE
  ========================================================= */

  function addFurniture(name) {
    const id =
      Date.now() +
      Math.random();

    setItems((prev) => [
      ...prev,
      {
        id,
        name,
        left: width / 2,
        top: height / 2,
      },
    ]);
  }

  /* =========================================================
     DELETE
  ========================================================= */

  function deleteItem(id) {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

    delete itemRefs.current[id];
    delete dragRef.current[id];
  }

  /* =========================================================
     POINTER DOWN
  ========================================================= */

  function handlePointerDown(
    e,
    item
  ) {
    if (
      e.target.closest &&
      e.target.closest(
        ".furniture-delete"
      )
    ) {
      return;
    }

    e.preventDefault();

    dragRef.current[item.id] = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: item.left,
      startTop: item.top,
    };

    try {
      e.currentTarget.setPointerCapture(
        e.pointerId
      );
    } catch (error) {}
  }

  /* =========================================================
     POINTER MOVE
  ========================================================= */

  function handlePointerMove(
    e,
    item
  ) {
    const drag =
      dragRef.current[
        item.id
      ];

    const floor =
      floorRef.current;

    if (!drag || !floor) {
      return;
    }

    const roomRect =
      floor.getBoundingClientRect();

    const scaleX =
      floor.clientWidth /
      roomRect.width;

    const scaleY =
      floor.clientHeight /
      roomRect.height;

    let newX =
      drag.startLeft +
      (e.clientX -
        drag.startX) /
        scaleX;

    let newY =
      drag.startTop +
      (e.clientY -
        drag.startY) /
        scaleY;

    const el =
      itemRefs.current[
        item.id
      ] ||
      e.currentTarget;

    const halfWidth =
      el.offsetWidth / 2;

    const halfHeight =
      el.offsetHeight / 2;

    newX = Math.max(
      halfWidth,
      Math.min(
        floor.clientWidth -
          halfWidth,
        newX
      )
    );

    newY = Math.max(
      halfHeight,
      Math.min(
        floor.clientHeight -
          halfHeight,
        newY
      )
    );

    setItems((prev) =>
      prev.map((it) =>
        it.id === item.id
          ? {
              ...it,
              left: newX,
              top: newY,
            }
          : it
      )
    );
  }

  /* =========================================================
     POINTER UP
  ========================================================= */

  function handlePointerUp(
    e,
    item
  ) {
    delete dragRef.current[
      item.id
    ];

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch (error) {}
  }

  /* =========================================================
     CLEAR
  ========================================================= */

  function clearPlan() {
    setItems([]);
  }

  /* =========================================================
     SAVE
  ========================================================= */

 async function savePlan() {
  try {
    const furniture = items.map((item) => ({
      name: item.name,
      left: `${item.left}px`,
      top: `${item.top}px`,
    }));

    const roomLabel =
      roomOptions.find(
        (r) => r.value === roomType
      )?.label || roomType;

    // Find the actual 2D room
    const floor = floorRef.current;

    if (!floor) {
      alert("Could not find the room preview.");
      return;
    }

    // Create picture of the room
    const canvas = await html2canvas(floor, {
      backgroundColor: "#f5efe6",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Convert picture to a storable image
    const image = canvas.toDataURL("image/png");

    const design = {
      id: Date.now(),

      // Keep this simple so SavedDesigns can identify it
      type: "planner",

      title: `${roomLabel} Layout`,

      description:
        `${width} × ${height} room · ${furniture.length} pieces`,

      width,
      height,

      furniture,

      // THIS IS THE ACTUAL PICTURE
      image,

      createdAt: new Date().toISOString(),
    };

    // Get designs already saved for Saved Designs page
    const savedDesigns =
      JSON.parse(
        localStorage.getItem(
          "livingCanvasSavedDesigns"
        ) || "[]"
      );

    // Add newest design at the beginning
    savedDesigns.unshift(design);

    // Keep last 20 designs
    localStorage.setItem(
      "livingCanvasSavedDesigns",
      JSON.stringify(
        savedDesigns.slice(0, 20)
      )
    );

    // Keep your old Recent Designs functionality too
    const oldDesigns =
      JSON.parse(
        localStorage.getItem(
          "livingCanvasRecentDesigns"
        ) || "[]"
      );

    oldDesigns.unshift({
      ...design,
      type: "2D ROOM PLAN",
    });

    localStorage.setItem(
      "livingCanvasRecentDesigns",
      JSON.stringify(
        oldDesigns.slice(0, 9)
      )
    );

    alert("Your room design has been saved ✦");

  } catch (error) {
    console.error(
      "Error saving planner design:",
      error
    );

    alert(
      "Could not save the room picture. Please try again."
    );
  }
}

  /* =========================================================
     CURRENT ROOM
  ========================================================= */

  const currentFurniture =
    furnitureByRoom[
      roomType
    ] || [];

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <section
      className="planner-section"
      id="planner"
    >
      <div className="section-heading">
        <p className="eyebrow">
          02 · 2D ROOM PLANNER
        </p>

        <h2>
          Plan it before {}
          <i>
            you build it.
          </i>
        </h2>

        <p>
          Choose your room, set
          its dimensions and arrange
          furniture exactly how you
          want it.
        </p>
      </div>

      <div className="planner-layout">

        {/* =================================================
            CONTROLS
        ================================================= */}

        <div className="planner-controls">

          <label>
            Room Type

            <select
              value={roomType}
              onChange={
                handleRoomChange
              }
            >
              {roomOptions.map(
                (room) => (
                  <option
                    key={
                      room.value
                    }
                    value={
                      room.value
                    }
                  >
                    {room.label}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Room Width

            <input
              type="number"
              value={width}
              min="250"
              max="1000"
              onChange={(e) =>
                setWidth(
                  clampNumber(
                    e.target.value,
                    250,
                    1000,
                    width
                  )
                )
              }
            />
          </label>

          <label>
            Room Height

            <input
              type="number"
              value={height}
              min="200"
              max="700"
              onChange={(e) =>
                setHeight(
                  clampNumber(
                    e.target.value,
                    200,
                    700,
                    height
                  )
                )
              }
            />
          </label>

          <h4>
            Furniture
          </h4>

          <div id="furnitureOptions">
            <div className="room-furniture active">
              {currentFurniture.map(
                (name) => (
                  <button
                    key={name}
                    className="planner-add"
                    type="button"
                    onClick={() =>
                      addFurniture(
                        name
                      )
                    }
                  >
                    + {name}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            className="clear-room"
            type="button"
            onClick={
              clearPlan
            }
          >
            Clear Plan
          </button>

          <button
            className="save-design"
            type="button"
            onClick={
              savePlan
            }
          >
            Save Plan
          </button>
        </div>

        {/* =================================================
            ORIGINAL 2D FLOOR
        ================================================= */}

        <div className="floor-wrapper">

          <div
            className="floor-plan"
            ref={floorRef}
            style={{
              width:
                `${width}px`,
              height:
                `${height}px`,
            }}
          >

            <div className="door">
              DOOR
            </div>

            <div className="window">
              WINDOW
            </div>

            {items.map(
              (item) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[
                        item.id
                      ] = el;
                    }
                  }}
                  className={`furniture-item ${
                    furnitureClass[
                      item.name
                    ] ||
                    "furniture-chair"
                  }`}
                  style={{
                    left:
                      `${item.left}px`,
                    top:
                      `${item.top}px`,
                  }}
                  title={`${item.name} — drag to move`}
                  onPointerDown={(
                    e
                  ) =>
                    handlePointerDown(
                      e,
                      item
                    )
                  }
                  onPointerMove={(
                    e
                  ) =>
                    handlePointerMove(
                      e,
                      item
                    )
                  }
                  onPointerUp={(
                    e
                  ) =>
                    handlePointerUp(
                      e,
                      item
                    )
                  }
                  onPointerCancel={(
                    e
                  ) =>
                    handlePointerUp(
                      e,
                      item
                    )
                  }
                  onDragStart={(e) =>
                    e.preventDefault()
                  }
                >
                  <button
                    type="button"
                    className="furniture-delete"
                    title={`Remove ${item.name}`}
                    aria-label={`Remove ${item.name}`}
                    onPointerDown={(
                      e
                    ) =>
                      e.stopPropagation()
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(
                        item.id
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


