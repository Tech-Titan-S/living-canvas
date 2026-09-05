import { useEffect, useState } from "react";

/* =========================================
   HEX → RGB
========================================= */

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}


/* =========================================
   RGB → HSL
========================================= */

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;

  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h =
          (b - r) / d + 2;
        break;

      case b:
        h =
          (r - g) / d + 4;
        break;

      default:
        h = 0;
    }

    h /= 6;
  }

  return [
    h * 360,
    s * 100,
    l * 100,
  ];
}


/* =========================================
   HSL → HEX
========================================= */

function hslToHex(h, s, l) {

  h = ((h % 360) + 360) % 360;

  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  s /= 100;
  l /= 100;

  const c =
    (1 - Math.abs(2 * l - 1)) * s;

  const x =
    c *
    (1 -
      Math.abs(
        ((h / 60) % 2) - 1
      ));

  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (value) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}


/* =========================================
   GENERATE LIVE PALETTE
========================================= */

function generatePalette(baseColor) {

  if (!baseColor) {
    return [];
  }

  const hex = baseColor.toUpperCase();

  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    return [];
  }

  const rgb = hexToRgb(hex);

  const hsl = rgbToHsl(
    rgb.r,
    rgb.g,
    rgb.b
  );

  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];

  return [

    /* 01 — Base color */
    hex,

    /* 02 — +25 hue */
    hslToHex(
      h + 25,
      Math.min(90, s + 8),
      Math.min(72, l + 4)
    ),

    /* 03 — +55 hue */
    hslToHex(
      h + 55,
      Math.min(85, s + 2),
      Math.min(78, l + 12)
    ),

    /* 04 — Softer version */
    hslToHex(
      h - 25,
      Math.max(12, s - 10),
      Math.min(90, l + 20)
    ),

    /* 05 — Deep version */
    hslToHex(
      h,
      Math.max(10, s - 28),
      Math.max(18, l - 22)
    ),
  ];
}


/* =========================================
   COLOR LAB
========================================= */

export default function ColorLab() {

  const [baseColor, setBaseColor] =
    useState(() => {

      return (
        localStorage.getItem(
          "livingCanvasBaseColor"
        ) || "#A98267"
      );
    });


  const palette =
    generatePalette(baseColor);


  /* =========================================
     UPDATE WEBSITE THEME
  ========================================= */

  useEffect(() => {

    if (!palette.length) {
      return;
    }

    document.documentElement.style.setProperty(
      "--accent",
      palette[0]
    );

    document.documentElement.style.setProperty(
      "--accent-2",
      palette[1]
    );

    document.documentElement.style.setProperty(
      "--palette-soft",
      palette[3]
    );

    document.documentElement.style.setProperty(
      "--palette-deep",
      palette[4]
    );


    /* Save palette */

    localStorage.setItem(
      "livingCanvasPalette",
      JSON.stringify(palette)
    );


    /* Save base color */

    localStorage.setItem(
      "livingCanvasBaseColor",
      baseColor
    );

  }, [baseColor, palette]);


  /* =========================================
     SELECT PALETTE COLOR
  ========================================= */

  function selectColor(color) {

    setBaseColor(color);

  }


  /* =========================================
     SAVE PALETTE
  ========================================= */

 /* =========================================
   SAVE PALETTE TO SAVED DESIGNS
========================================= */

function savePalette() {
  try {
    const savedDesigns = JSON.parse(
      localStorage.getItem("livingCanvasSavedDesigns") || "[]"
    );

    const newPalette = {
      id: Date.now(),

      type: "COLOR PALETTE",

      title: "Custom Color Palette",

      description: `Base color ${baseColor.toUpperCase()}`,

      colors: [...palette],

      baseColor: baseColor.toUpperCase(),

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "livingCanvasSavedDesigns",
      JSON.stringify([
        newPalette,
        ...savedDesigns,
      ])
    );

    alert("Palette saved to Saved Designs ✦");

  } catch (error) {
    console.error("Could not save palette:", error);
    alert("Could not save palette.");
  }
}
  return (

    <section className="color-section">

      {/* =========================================
          HEADING
      ========================================= */}

      <div className="section-heading center">

        <p className="eyebrow">
          02 · COLOR LAB
        </p>

        <h2>
          Find your
          <i> perfect palette.</i>
        </h2>

      </div>


      {/* =========================================
          COLOR LAB
      ========================================= */}

      <div className="color-lab">


        {/* BASE COLOR */}

        <div className="color-main">

          <input
            type="color"
            value={baseColor}
            onChange={(e) =>
              setBaseColor(
                e.target.value.toUpperCase()
              )
            }
          />

          <div>

            <small>
              YOUR BASE COLOR
            </small>

            <h3>
              {baseColor.toUpperCase()}
            </h3>

          </div>

        </div>


        {/* =========================================
            GENERATED PALETTE
        ========================================= */}

        <div className="palette">

          {palette.map(
            (color, index) => (

              <button

                key={`${color}-${index}`}

                type="button"

                className="palette-color"

                title={`Use ${color}`}

                onClick={() =>
                  selectColor(color)
                }

                style={{
                  backgroundColor: color,
                }}

              />

            )
          )}

        </div>

      </div>


      {/* =========================================
          SAVE
      ========================================= */}

      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >

        <button
          className="button primary"
          onClick={savePalette}
        >
          Save Palette
        </button>

      </div>

    </section>

  );
}