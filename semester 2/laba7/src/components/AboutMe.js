import React, { useState, useEffect } from "react";

function AboutMe() {
	const [displayedTitle, setDisplayedTitle] = useState("");
	const fullTitle = "О себе";
	const [displayedText, setDisplayedText] = useState("");
	const fullText = "Роман, 20 лет. Студент 3 курса ДВФУ Института Математики и Компьютерных Технологий направления подготовки бакалавриата Программная инженерия.";

	useEffect(() => {
		let currentIndex = 0;

		function animateTitle() {
			setDisplayedTitle(fullTitle.substring(0, currentIndex++));
			if (currentIndex <= fullTitle.length) {
				setTimeout(animateTitle, 200); 
			} else {
				animateText();
			}
		}

		function animateText() {
			let textIndex = 0;
			const textInterval = setInterval(() => {
				setDisplayedText(fullText.substring(0, textIndex++));

				if (textIndex > fullText.length) {
					clearInterval(textInterval);
				}
			}, 40);
		}

		animateTitle();

	}, []);

	return (
		<section className="about-me">
			<h2>{displayedTitle}</h2>
			<p>{displayedText}</p>
		</section>
	);
}

export default AboutMe;