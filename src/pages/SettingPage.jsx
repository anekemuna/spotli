import { useEffect, useState } from "react";
import "./SettingPage.css";

const themes = [
  { key: "light", label: "Light", color: "#f59e0b", emoji: "🌞" },
  { key: "dark", label: "Dark", color: "#1f2937", emoji: "🌚" },
  { key: "blue", label: "Blue", color: "#2563eb", emoji: "🔵" },
  { key: "green", label: "Green", color: "#22c55e", emoji: "🟢" },
  { key: "pink", label: "Pink", color: "#ec4899", emoji: "🌸" },
  { key: "purple", label: "Purple", color: "#8b5cf6", emoji: "🟣" },
];

const themeClasses = themes.map((t) => `theme-${t.key}`);

const SettingPage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="setting-page">
      <div className="setting-wrapper">
        <h2>Settings</h2>
        <div className="theme-picker-container">
          <span>Theme:</span>
          <div className="theme-picker-row">
            {themes.map((t) => (
              <button
                key={t.key}
                className={`theme-picker-btn${
                  theme === t.key ? " selected" : ""
                }`}
                style={{ background: t.color }}
                onClick={() => setTheme(t.key)}
                aria-label={t.label}
              >
                <span className="theme-picker-emoji">{t.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
