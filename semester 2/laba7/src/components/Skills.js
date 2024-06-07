import { BiLink } from "react-icons/bi";

function Skills() {
	return (
		<section className="skills">
			<ul>
				<li>Чтение/написание документации</li>
				<li>Хорошая математическая база</li>
				<li>Чтение/написание документации</li>
				<li>Хорошая математическая база</li>
				<li><a href="https://github.com/srv328/web-development" target="_blank" rel="noopener noreferrer">Базовые навыки HTML/CSS/JavaScript/React.js, препроцессоры pug/stylus<BiLink /></a></li>
				<li>Базовые навыки работы с 1С:Предприятие</li>
				<li><a href="https://github.com/srv328/fundamental-algorithms-and-data-structures" target="_blank" rel="noopener noreferrer">Знание базовых алгоритмов и структур данных<BiLink /></a></li> 
				<li>Чтение/построение ER-диаграмм. Написание SQL-запросов, работа с БД (СУБД - MySQL)</li>
				<li>Разработка приложений с пользовательским интерфейсом (GUI) с помощью <a href="https://github.com/srv328/task-manager" target="_blank" rel="noopener noreferrer">WinForms<BiLink /></a> на платформе .NET Framework версии 4.7.2 (C++/C#)</li>
				<li>Написание телеграмм-ботов на базе библиотеки <a href="https://github.com/srv328/crypto-price-bot" target="_blank" rel="noopener noreferrer">Aiogram V3, работа с FSM<BiLink /></a> (Python)</li>
				<li>Работа с БД - <a href="https://github.com/srv328/test_task_farpost" target="_blank" rel="noopener noreferrer">sqlite3<BiLink /></a> (Python)</li>
				<li>Парсинг/работа с библиотекой requests (Python)</li>
				<li>Работа с <a href="https://github.com/srv328/get-erc20-balances" target="_blank" rel="noopener noreferrer">web3.py<BiLink /></a> (Python)</li>
			</ul>
		</section>
	);
}

export default Skills;