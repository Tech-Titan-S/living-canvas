import { useMemo, useState } from "react";

const defaultItems = [
  ["Sofa", 85000],
  ["Bed", 65000],
  ["Lighting", 25000],
  ["Rugs", 18000],
  ["Decoration", 20000],
  ["Paint", 15000],
];

export default function Budget() {
  const [items, setItems] =
    useState(defaultItems);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, [, value]) =>
          sum + Number(value || 0),
        0
      ),
    [items]
  );

  function updateValue(index, value) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? [
              item[0],
              Math.max(
                0,
                Number(value)
              ),
            ]
          : item
      )
    );
  }

  return (
    <section className="budget-section">
      <div className="section-heading">
        <p className="eyebrow">
          04 · BUDGET PLANNER
        </p>

        <h2>
          Dream room.
          <i> Real budget.</i>
        </h2>

        <p>
          Plan your interior without losing
          track of your spending.
        </p>
      </div>

      <div className="budget-layout">
        <div className="budget-items">
          {items.map(
            ([name, value], index) => (
              <label key={name}>
                {name}

                <input
                  className="budget-input"
                  type="number"
                  value={value}
                  onChange={(e) =>
                    updateValue(
                      index,
                      e.target.value
                    )
                  }
                />
              </label>
            )
          )}
        </div>

        <div className="budget-result">
          <p>
            ESTIMATED PROJECT COST
          </p>

          <strong>
            Rs.{" "}
            <span>
              {total.toLocaleString(
                "en-PK"
              )}
            </span>
          </strong>

          <div className="budget-bar">
            <span
              style={{
                width: `${Math.min(
                  (total / 500000) *
                    100,
                  100
                )}%`,
              }}
            />
          </div>

          <small>
            Your estimate updates
            automatically.
          </small>
        </div>
      </div>
    </section>
  );
}