import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ButtonTheme() {
  const [theme, setTheme] = useState("light");

  // ✅ Cargar tema guardado o iniciar en claro
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light"); // ✅ Forzar modo claro por defecto
    }
  }, []);

  // ✅ Aplicar clase "dark" según el estado
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={handleTheme}
      className="absolute size-10 top-0 right-0 flex items-center justify-center rounded-2xl cursor-pointer transition-colors hover:shadow-lg hover:border bg-blue-950 text-white hover:bg-white hover:text-blue-950 hover:shadow-gray dark:bg-blue-800"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
