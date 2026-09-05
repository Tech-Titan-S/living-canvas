export default function ThemeModal({
  open,
  onClose,
  onThemeChange,
}) {
  const themes = [
    {
      id: "sand",
      name: "Warm Sand",
      description: "Soft · Natural · Elegant",
      preview: "sand-preview",
    },
    {
      id: "noir",
      name: "Midnight Noir",
      description: "Dark · Dramatic · Modern",
      preview: "noir-preview",
    },
    {
      id: "sage",
      name: "Sage Retreat",
      description: "Organic · Calm · Fresh",
      preview: "sage-preview",
    },
    {
      id: "rose",
      name: "Dusty Rose",
      description: "Romantic · Artistic · Soft",
      preview: "rose-preview",
    },
  ];

  return (
    <div
      className={`theme-modal ${
        open ? "active" : ""
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="theme-box">
        <button
          className="close-modal"
          onClick={onClose}
        >
          ×
        </button>

        <p className="eyebrow">
          LIVING CANVAS
        </p>

        <h2>
          Choose your <i>mood.</i>
        </h2>

        <div className="theme-grid">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className="theme-card"
              onClick={() => {
                onThemeChange(theme.id);
                onClose();
              }}
            >
              <span
                className={`theme-preview ${theme.preview}`}
              />

              <strong>{theme.name}</strong>

              <small>
                {theme.description}
              </small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}