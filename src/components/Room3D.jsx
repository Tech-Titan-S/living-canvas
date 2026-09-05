function Room3DView({ roomLabel, width, height, items, onClose }) {
  const maxWidth = 900;
  const maxHeight = 550;

  const scale = Math.min(
    maxWidth / width,
    maxHeight / height,
    1
  );

  const roomWidth = width * scale;
  const roomHeight = height * scale;

  return (
    <div
      className="room3d-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(25, 18, 15, 0.72)",
        padding: "25px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="room3d-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 96vw)",
          height: "min(850px, 94vh)",
          background:
            "linear-gradient(135deg, #f8f1e7, #e9dcc9)",
          borderRadius: "24px",
          padding: "24px",
          boxSizing: "border-box",
          boxShadow:
            "0 35px 100px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="room3d-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#44362f",
                fontSize: "30px",
                fontWeight: 700,
              }}
            >
              {roomLabel} — 3D View
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#75655a",
                fontSize: "15px",
              }}
            >
              {width} × {height} · {items.length} furniture pieces
            </p>
          </div>

          <button
            type="button"
            className="room3d-close"
            onClick={onClose}
            style={{
              width: "46px",
              height: "46px",
              border: "none",
              borderRadius: "50%",
              background: "#76584b",
              color: "#fff",
              fontSize: "29px",
              cursor: "pointer",
              lineHeight: 1,
              boxShadow:
                "0 8px 20px rgba(70,45,35,.25)",
            }}
          >
            ×
          </button>
        </div>

        {/* =================================================
            3D STAGE
        ================================================= */}

        <div
          className="room3d-stage"
          style={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1400px",
            overflow: "hidden",
            borderRadius: "20px",
            background:
              "radial-gradient(circle at 50% 42%, #f7eee0 0%, #dfcfba 70%, #cdbba5 100%)",
          }}
        >

          {/* =================================================
              ROOM
          ================================================= */}

          <div
            style={{
              position: "relative",
              width: `${roomWidth}px`,
              height: `${roomHeight}px`,
              transform:
                "rotateX(57deg) rotateZ(-2deg)",
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >

            {/* =================================================
                FLOOR
            ================================================= */}

            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#eee3d0",
                backgroundImage:
                  "linear-gradient(rgba(95,80,65,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(95,80,65,.13) 1px, transparent 1px)",
                backgroundSize:
                  `${25 * scale}px ${25 * scale}px`,
                border:
                  `${5 * scale}px solid #62594f`,
                boxSizing: "border-box",
                boxShadow:
                  "0 35px 50px rgba(50,38,28,.38)",
                transformStyle:
                  "preserve-3d",
              }}
            />

            {/* =================================================
                BACK WALL
            ================================================= */}

            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${roomWidth}px`,
                height: `${180 * scale}px`,
                background:
                  "linear-gradient(90deg, #d8c8b6 0%, #f0e6d8 48%, #d9c9b7 100%)",
                border:
                  `${5 * scale}px solid #62594f`,
                boxSizing: "border-box",
                transform:
                  "rotateX(-90deg)",
                transformOrigin:
                  "bottom center",
                transformStyle:
                  "preserve-3d",
                boxShadow:
                  "0 -8px 20px rgba(50,40,30,.15)",
              }}
            >

              {/* =================================================
                  WINDOW FRAME
              ================================================= */}

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: `${48 * scale}px`,
                  transform:
                    "translateX(-50%)",
                  width: `${190 * scale}px`,
                  height: `${105 * scale}px`,
                  background: "#eee4d4",
                  border:
                    `${7 * scale}px solid #705d4e`,
                  boxSizing: "border-box",
                  boxShadow:
                    "0 8px 18px rgba(50,35,25,.28)",
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gridTemplateRows:
                    "1fr 1fr",
                  gap: `${5 * scale}px`,
                  padding: `${5 * scale}px`,
                }}
              >

                {/* GLASS 1 */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #a9dceb, #d9f3f7)",
                    border:
                      `${2 * scale}px solid #68828a`,
                    boxShadow:
                      "inset 0 0 15px rgba(255,255,255,.55)",
                  }}
                />

                {/* GLASS 2 */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #a9dceb, #d9f3f7)",
                    border:
                      `${2 * scale}px solid #68828a`,
                    boxShadow:
                      "inset 0 0 15px rgba(255,255,255,.55)",
                  }}
                />

                {/* GLASS 3 */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #a9dceb, #d9f3f7)",
                    border:
                      `${2 * scale}px solid #68828a`,
                    boxShadow:
                      "inset 0 0 15px rgba(255,255,255,.55)",
                  }}
                />

                {/* GLASS 4 */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #a9dceb, #d9f3f7)",
                    border:
                      `${2 * scale}px solid #68828a`,
                    boxShadow:
                      "inset 0 0 15px rgba(255,255,255,.55)",
                  }}
                />

              </div>

              {/* WINDOW TOP TRIM */}

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: `${156 * scale}px`,
                  transform:
                    "translateX(-50%)",
                  width: `${210 * scale}px`,
                  height: `${9 * scale}px`,
                  background: "#725d4c",
                  borderRadius: "4px",
                }}
              />

              {/* WINDOW SILL */}

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: `${40 * scale}px`,
                  transform:
                    "translateX(-50%)",
                  width: `${215 * scale}px`,
                  height: `${10 * scale}px`,
                  background: "#765f4e",
                  borderRadius: "4px",
                  boxShadow:
                    "0 5px 8px rgba(40,30,20,.25)",
                }}
              />

            </div>

            {/* =================================================
                LEFT WALL
            ================================================= */}

            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${180 * scale}px`,
                height: `${roomHeight}px`,
                background:
                  "linear-gradient(90deg, #cdbba7, #e5d7c6)",
                border:
                  `${5 * scale}px solid #62594f`,
                boxSizing: "border-box",
                transform:
                  "rotateY(90deg)",
                transformOrigin:
                  "left center",
                boxShadow:
                  "0 10px 25px rgba(50,40,30,.18)",
              }}
            />

            {/* =================================================
                RIGHT WALL
            ================================================= */}

            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: `${180 * scale}px`,
                height: `${roomHeight}px`,
                background:
                  "linear-gradient(90deg, #e5d7c6, #cdbba7)",
                border:
                  `${5 * scale}px solid #62594f`,
                boxSizing: "border-box",
                transform:
                  "rotateY(-90deg)",
                transformOrigin:
                  "right center",
                boxShadow:
                  "0 10px 25px rgba(50,40,30,.18)",
              }}
            />

            {/* =================================================
                DOOR
            ================================================= */}

            <div
              style={{
                position: "absolute",
                left: `${20 * scale}px`,
                bottom: `${-2 * scale}px`,
                width: `${72 * scale}px`,
                height: `${14 * scale}px`,
                background: "#765044",
                border:
                  `${3 * scale}px solid #4e352d`,
                boxSizing: "border-box",
                color: "#fff",
                textAlign: "center",
                fontSize: `${7 * scale}px`,
                lineHeight:
                  `${8 * scale}px`,
                transform:
                  "translateZ(4px)",
                boxShadow:
                  "0 3px 7px rgba(40,25,20,.25)",
              }}
            >
              DOOR
            </div>

            {/* =================================================
                FURNITURE
            ================================================= */}

            {items.map((item) => {
              const left =
                Number(item.left || 0) *
                scale;

              const top =
                Number(item.top || 0) *
                scale;

              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: `${left}px`,
                    top: `${top}px`,
                    transform:
                      "translate(-50%, -50%) translateZ(38px)",
                    transformStyle:
                      "preserve-3d",
                    zIndex: 10,
                    cursor: "default",
                  }}
                >
                  <div
                    className={`furniture-item ${
                      furnitureClass[item.name] ||
                      "furniture-chair"
                    }`}
                    style={{
                      position: "relative",
                      left: 0,
                      top: 0,
                    }}
                    title={item.name}
                  />

                  {/* Small shadow underneath furniture */}

                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "55%",
                      width: "80%",
                      height: "20%",
                      transform:
                        "translate(-50%, -50%) translateZ(-2px)",
                      background:
                        "rgba(45,30,20,.20)",
                      filter:
                        "blur(6px)",
                      borderRadius: "50%",
                      pointerEvents:
                        "none",
                    }}
                  />
                </div>
              );
            })}

          </div>

          {/* =================================================
              DRAG MESSAGE
          ================================================= */}

          <div
            style={{
              position: "absolute",
              bottom: "22px",
              left: "50%",
              transform:
                "translateX(-50%)",
              padding:
                "10px 18px",
              borderRadius: "30px",
              background:
                "rgba(92,70,58,.88)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow:
                "0 8px 20px rgba(50,35,25,.25)",
              pointerEvents:
                "none",
              whiteSpace:
                "nowrap",
            }}
          >
            🖱️ Drag furniture to move it
          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          style={{
            textAlign: "center",
            paddingTop: "12px",
            color: "#75655a",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          3D view uses the same room dimensions and
          furniture arrangement from your planner.
        </div>

      </div>
    </div>
  );
}