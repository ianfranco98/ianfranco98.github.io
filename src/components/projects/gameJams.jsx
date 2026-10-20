import React from "react";

import INFO from "../../data/user";

import "./styles/gameJams.css";

const GameJams = () => (
	<section className="game-jams" aria-labelledby="game-jams-title">
		<h3 id="game-jams-title">Game Jams</h3>
		<p className="game-jams-intro">Some game jams I participated in.</p>
		<div className="game-jams-grid">
			{INFO.gameJams.map((game) => (
				<a className="game-jam-card" href={game.link} key={game.link} target="_blank" rel="noreferrer">
					<img src={game.thumbnail} alt={game.title} loading="lazy" width="630" height="500" />
				</a>
			))}
		</div>
	</section>
);

export default GameJams;
