import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
	const [theme, setTheme] = useState(() =>
		document.documentElement.dataset.theme === "light" ? "light" : "dark"
	);

	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = nextTheme;
		setTheme(nextTheme);
		try {
			window.localStorage.setItem("portfolio-theme", nextTheme);
		} catch {
			// The toggle still works when browser storage is unavailable.
		}
	};

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
			title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
			<span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
		</button>
	);
};

export default ThemeToggle;
