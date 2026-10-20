import { act, fireEvent, render, screen } from "@testing-library/react";
import { CareerCard } from "./career";
import career from "../../data/career";

const experience = career[0];

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

test("shows gameplay only after 1.5 seconds over the card and restores the thumbnail on leave", () => {
	render(<CareerCard experience={experience} />);
	const card = screen.getByRole("article");
	const image = screen.getByRole("img", { name: /^Timefront/ });
	fireEvent.mouseEnter(card);
	act(() => jest.advanceTimersByTime(1499));
	expect(image).toHaveAttribute("src", experience.image);
	act(() => jest.advanceTimersByTime(1));
	expect(image).toHaveAttribute("src", experience.preview);
	fireEvent.mouseLeave(card);
	expect(image).toHaveAttribute("src", experience.image);
});

test("cancels short hovers and starts a fresh delay on re-entry", () => {
	render(<CareerCard experience={experience} />);
	const card = screen.getByRole("article");
	fireEvent.mouseEnter(card);
	act(() => jest.advanceTimersByTime(1000));
	fireEvent.mouseLeave(card);
	act(() => jest.advanceTimersByTime(2000));
	expect(screen.getByRole("img", { name: /^Timefront/ })).toHaveAttribute("src", experience.image);
	fireEvent.mouseEnter(card);
	act(() => jest.advanceTimersByTime(1499));
	expect(screen.getByRole("img", { name: /^Timefront/ })).toHaveAttribute("src", experience.image);
	act(() => jest.advanceTimersByTime(1));
	expect(screen.getByRole("img", { name: /^Timefront/ })).toHaveAttribute("src", experience.preview);
});

test("leaves the unannounced project unchanged on hover", () => {
	render(<CareerCard experience={career.find((item) => item.id === "unannounced-fps")} />);
	fireEvent.mouseEnter(screen.getByRole("article"));
	act(() => jest.advanceTimersByTime(2000));
	expect(screen.getByText("Unannounced project")).toBeInTheDocument();
	expect(jest.getTimerCount()).toBe(0);
});

test("clears a pending preview when the card unmounts", () => {
	const { unmount } = render(<CareerCard experience={experience} />);
	fireEvent.mouseEnter(screen.getByRole("article"));
	expect(jest.getTimerCount()).toBe(1);
	unmount();
	expect(jest.getTimerCount()).toBe(0);
});
