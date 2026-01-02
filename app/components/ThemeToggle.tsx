"use client"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";


/**
 * ThemeToggle switches between light/dark by setting html[data-theme].
 * persists choice in localStorage
 * 
 */

const ThemeToggle = () => {

    // create state
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // initialize theme on mount
    useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored || (prefersDark ? "dark": "light");
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
    }, [])

    const toggle = () => {
        const next = theme === "light" ? "dark":"light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
    };

  return (
    <button
    aria-label="Toggle dark mode"
    className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
    onClick={toggle}
    >
        {theme === "dark" ? <Sun aria-hidden/> : <Moon aria-hidden/>}
    </button>
  )
}

export default ThemeToggle