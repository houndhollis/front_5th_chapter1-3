import { createContext, useContext, useState } from "react";
import { useCallback } from "../@lib";

interface ToggleContextType {
  theme: string;
  toggleTheme: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useToggleContext = () => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error("토글 사용이 불가능해요...");
  }
  return context;
};

export const ToggleProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <ToggleContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ToggleContext.Provider>
  );
};
