import React, { useEffect, useRef } from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";

const AllProjects = ({ scrollable = false }) => {
	const gridRef = useRef(null);
	const viewportRef = useRef(null);

	useEffect(() => {
		if (!scrollable) return;
		const grid = gridRef.current;
		const card = grid.firstElementChild;
		if (!card) return;

		const updateHeight = () => {
			const gap = parseFloat(window.getComputedStyle(grid).rowGap) || 0;
			viewportRef.current.style.maxHeight = `${card.getBoundingClientRect().height * 2.5 + gap * 2}px`;
		};
		updateHeight();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(updateHeight);
		observer.observe(card);
		observer.observe(grid);
		return () => observer.disconnect();
	}, [scrollable]);

	const projects = (
		<div className="all-projects-container" ref={gridRef}>
			{INFO.projects.map((project, index) => (
				<div className="all-projects-project" key={index}>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
						backgroundURL={project.backgroundURL}
					/>
				</div>
			))}
		</div>
	);

	return scrollable ? (
		<div className="all-projects-scroll" ref={viewportRef} role="region" aria-label="Personal Projects" tabIndex={0}>
			{projects}
		</div>
	) : projects;
};

export default AllProjects;
