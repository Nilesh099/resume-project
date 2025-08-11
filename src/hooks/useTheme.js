import { useState, useEffect } from "react";

const themes = {
  modern: {
    name: "Modern Light",
    colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"],
    fontFamily: "Inter, sans-serif",
    headerStyle: "clean",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  classic: {
    name: "Classic Dark",
    colors: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af", "#d1d5db"],
    fontFamily: "Georgia, serif",
    headerStyle: "traditional",
    backgroundColor: "#f9fafb",
    textColor: "#111827",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("resume_theme");
    return saved || "modern";
  });

  const [selectedColor, setSelectedColor] = useState(() => {
    const saved = localStorage.getItem("resume_color");
    return saved || themes.modern.colors[0];
  });

  useEffect(() => {
    localStorage.setItem("resume_theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("resume_color", selectedColor);
  }, [selectedColor]);

  const theme = themes[currentTheme];

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      // Auto-select first color of the new theme
      setSelectedColor(themes[themeName].colors[0]);
    }
  };

  const setColor = (color) => {
    setSelectedColor(color);
  };

  return {
    currentTheme,
    theme,
    themes,
    selectedColor,
    switchTheme,
    setColor,
  };
}
