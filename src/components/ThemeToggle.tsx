import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeSwitch } from "@/components/ui/theme-switch";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <ThemeSwitch 
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}