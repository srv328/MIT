import { BiLink } from "react-icons/bi";

function Activity() {
	return (
		<section className="about-me">
			<p>На 1 курсе участвовал в <a href="https://codeforces.com/gyms?filterContestType=Official+ACM-ICPC+Contest&locale=ru" target="_blank" rel="noopener noreferrer">ICPC CodeForces<BiLink /></a> с командой единомышленников в рамках "CodeWork", который проводился в стенах ВУЗа.</p>
			<p>Участник гранта <a href="https://esp.ethereum.foundation/academic-grants" target="_blank" rel="noopener noreferrer">ESP Academic Grant<BiLink /></a> с темой "Anomaly Detection on Ethereum P2P Network Using LLM".</p>
			<p>Участник программы <a href="https://fasie.ru/studstartup/" target="_blank" rel="noopener noreferrer">Студенческий стартап<BiLink /></a> с темой "LLM (Large Language Model) для проведения собеседования потенциальных сотрудников".</p>
			<p>Участник хакатона <a href="https://github.com/srv328/tenderhack-2024" target="_blank" rel="noopener noreferrer">"Tender Hack"<BiLink /></a> 2024 года.</p>
			<p>Соавтор статьи для региональной научно-практической конференции (ДВФУ). Секция: "Информационные технологии и искусственный интеллект". Тема: <a href="sources/статья.pdf" target="_blank" rel="noopener noreferrer">"Выявление уязвимостей в смарт-контрактах с помощью глубокого обучения"<BiLink /></a>.</p>
		</section>
	);
}

export default Activity;