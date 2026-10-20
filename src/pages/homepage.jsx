import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faItchIo } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/common/footer";
import AllProjects from "../components/projects/allProjects";
import GameJams from "../components/projects/gameJams";
import Career from "../components/homepage/career";
import INFO from "../data/user";
import SEO from "../data/seo";
import "./styles/homepage.css";

const Homepage = () => {
	useEffect(() => { window.scrollTo(0, 0); }, []);
	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>
			<div className="page-content">
				<main className="content-wrapper homepage-container">
					<header className="homepage-first-area">
						<p className="homepage-eyebrow">Ian Laurente / Game Development</p>
						<h1 className="title homepage-title">{INFO.homepage.title}</h1>
						<p className="subtitle homepage-subtitle">{INFO.homepage.description}</p>
						<div className="homepage-socials">
							<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
								<FontAwesomeIcon icon={faLinkedin} />
							</a>
							<a href={INFO.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a href={INFO.socials.itchio} target="_blank" rel="noreferrer" aria-label="itch.io">
								<FontAwesomeIcon icon={faItchIo} />
							</a>
						</div>
					</header>
					<nav className="homepage-section-nav" aria-label="Portfolio sections">
						<a href="#career">Professional Career</a>
						<a href="#projects">Personal Projects</a>
					</nav>
					<Career />
					<section className="homepage-projects" id="projects" aria-labelledby="projects-title">
						<h2 id="projects-title">Personal Projects</h2>
						<p className="homepage-projects-intro">Gameplay experiments, prototypes, and technical challenges.</p>
						<AllProjects />
						<GameJams />
					</section>
					<div className="page-footer"><Footer /></div>
				</main>
			</div>
		</>
	);
};

export default Homepage;
