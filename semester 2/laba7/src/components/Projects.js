import React, { useState } from "react";
import projectsData from "./data/projectsData";
import ProjectItem from "./ProjectItem";
import "./Projects.css";

function Projects() {
	const [activeProjectId, setActiveProjectId] = useState(1);

	const handleTabClick = (projectId) => {
		setActiveProjectId(projectId);
	};

	return (
		<section className="projects" >
			<h2>Мои проекты</h2>
			<div className="pagination-tabs">
				{projectsData.map((project) => (
				<button key={project.id} className={`pagination-tab ${ project.id === activeProjectId ? "active" : "" }`} onClick={() => handleTabClick(project.id)}>
					{project.title}
				</button>
				))}
			</div>

			{projectsData.filter((project) => project.id === activeProjectId).map((project) => (
						<ProjectItem key={project.id} project={project} />
					)
				)
			}
		</section>
	);
}

export default Projects;