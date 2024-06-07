const projectsData = [
	{
		id: 1,
		title: "FEFU расписание",
		githubLink: "https://github.com/srv328/schedule-bot",
		images: ["img/fefu1.png"], 
		description:
		"Бот для студентов ДВФУ для составления расписания. Написан на добровольных началах для студентов. Пет-проект, который еще находится на стадии разработки. Работа с библиотеками aiogramV3, redisStorage, FSM, sqlite3, asyncio.",
		additionalInfo: [
		{
			title: "Диаграмма вызовов функций",
			link: "https://miro.com/app/board/uXjVNNxzsho=/?share_link_id=464842219832",
		},
		{
			title: "Презентация проекта",
			link: "sources/Презентация БОТ.pdf",
		},
		],
	},
	{
		id: 2,
		title: 'Детская игра: "Смотри и запоминай!"',
		githubLink: "https://github.com/srv328/memory-card-game",
		images: ["img/pygame1.jpg", "img/pygame2.jpg", "img/pygame3.jpg", "img/pygame4.jpg"],
		description:
		"Простая детская игра, разработанная с использованием библиотеки PyGame. Игрокам нужно смотреть и запоминать расположение карточек на экране. Есть режим для 1 и 2 игроков, победитель определяется по количеству набранных очков. Разрабатывалась в рамке прохождения летней практики на 1 курсе.",
		additionalInfo: [],
	},
	{
		id: 3,
		title: "Task manager",
		githubLink: "https://github.com/srv328/task-manager",
		images: ["img/task1.png", "img/task2.png", "img/task3.png"],
		description:
		"Приложение для управления задачами, разработанное с использованием WinForms и ЯП C++. Помогает организовать и отслеживать задачи. Разрабатывалась в рамках прохождения дисциплины 'Стандарты и технологии программирования'",
		additionalInfo: [],
	},
	{
		id: 4,
		title: "База данных автозаправочной станции",
		githubLink: "https://github.com/srv328/gasstation-database-management",
		images: ["img/db1.png", "img/db2.png", "img/db3.png", "img/db4.png"],
		description:
		"Данный проект представляет собой приложение для управления базой данных автозаправочной станции. Работа с пользователями. Используется пакет MySql.data из NuGet для взаимодействия с базой данных MySQL. Интерфейс пользователя разработан с использованием WinForms, ЯП - C#. Разрабатывалась в рамках курсовой работы.",
		additionalInfo: [],
	},
	{
		id: 5,
		title: "База данных библиотеки",
		githubLink: "https://github.com/srv328/book-database-management-system",
		images: ["img/book1.png", "img/book2.png"],
		description:
		"Система управления базой данных библиотеки. Реализован с использованием структур данных: КЧ-дерево и динамическая хеш-таблица. Интерфейс пользователя разработан с использованием WinForms, ЯП - C++. Разрабатывалась в рамках курсовой работы.",
		additionalInfo: [],
	}
];

export default projectsData;