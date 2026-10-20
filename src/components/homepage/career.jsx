import React, { useEffect, useRef, useState } from "react";
import career from "../../data/career";
import "./styles/career.css";

export const CareerCard = ({ experience }) => {
	const [showPreview, setShowPreview] = useState(false);
	const hoverTimer = useRef(null);

	useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

	const stopPreview = () => {
		window.clearTimeout(hoverTimer.current);
		hoverTimer.current = null;
		setShowPreview(false);
	};

	const startPreview = () => {
		if (!experience.preview) return;
		window.clearTimeout(hoverTimer.current);
		// Fetch only the hovered card's GIF while the delay counts down.
		const preload = new Image();
		preload.src = experience.preview;
		hoverTimer.current = window.setTimeout(() => {
			setShowPreview(true);
			hoverTimer.current = null;
		}, 1500);
	};

	return (
		<article className="career-card" aria-labelledby={`${experience.id}-title`} onMouseEnter={startPreview} onMouseLeave={stopPreview}>
			<div className="career-media">
				{experience.image ? (
					<img className="career-game-image" src={showPreview ? experience.preview : experience.image} alt={`${experience.game} ${showPreview ? "gameplay preview" : "Steam thumbnail"}`} width="460" height="215" loading="lazy" onError={stopPreview} />
				) : (
					<div className="career-unannounced">
						<span aria-hidden="true">&lt; / &gt;</span>
						<p>Unannounced project</p>
					</div>
				)}
			</div>
			<div className="career-content">
				<div className="career-meta">
					<a className="career-company" href={experience.studio.url} target="_blank" rel="noreferrer">
						<img src={experience.studio.icon} alt="" width="24" height="24" loading="lazy" />
						<span>{experience.studio.name}</span>
					</a>
					<span className="career-dates"><time dateTime={experience.start}>{experience.dates.split(" - ")[0]}</time> - <time dateTime={experience.end}>{experience.dates.split(" - ")[1]}</time></span>
				</div>
				<h3 id={`${experience.id}-title`}>{experience.game}</h3>
				<p className="career-role">{experience.role} <span aria-hidden="true">·</span> {experience.focus}</p>
				<ul className="career-contributions">
					{experience.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
				</ul>
				<div className="career-card-footer">
					<ul className="career-tags" aria-label="Technologies and expertise">
						{experience.tags.map((tag) => <li key={tag}>{tag}</li>)}
					</ul>
					{experience.url && <a className="career-game-link" href={experience.url} target="_blank" rel="noreferrer" aria-label={`View ${experience.game}`}>View game <span aria-hidden="true">↗</span></a>}
				</div>
			</div>
		</article>
	);
};

const Career = () => (
	<section className="career-section" id="career" aria-labelledby="career-title">
		<div className="career-section-heading">
			<h2 id="career-title">Professional Career</h2>
			<p>The teams, games, and systems I've helped build.</p>
		</div>
		<div className="career-list">
			{career.map((experience) => (
				<CareerCard experience={experience} key={experience.id} />
			))}
		</div>
	</section>
);

export default Career;
