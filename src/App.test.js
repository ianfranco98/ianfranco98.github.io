import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
	window.localStorage.clear();
	delete document.documentElement.dataset.theme;
	window.scrollTo = jest.fn();
});

test("shows the portfolio without a portrait and allows switching themes", () => {
	render(<MemoryRouter><App /></MemoryRouter>);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Unreal Developer");
	expect(document.querySelector('img[src="homepage.jpg"], img[src="about.jpg"]')).toBeNull();
	fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
	expect(document.documentElement.dataset.theme).toBe("light");
	expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
	fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
	expect(document.documentElement.dataset.theme).toBe("dark");
	expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
});

test("reflects a restored light theme", () => {
	document.documentElement.dataset.theme = "light";
	render(<MemoryRouter><App /></MemoryRouter>);
	expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
});

test("allows changing themes when storage is unavailable", () => {
	const storage = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage unavailable"); });
	render(<MemoryRouter><App /></MemoryRouter>);
	fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
	expect(document.documentElement.dataset.theme).toBe("light");
	storage.mockRestore();
});
