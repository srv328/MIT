import React from "react";
import "./Projects.css";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { TbExternalLink } from "react-icons/tb";

const ProjectItem = ({ project }) => (
	<div className="project-item">
		<h3>
		<a href={project.githubLink} target="_blank" rel="noopener noreferrer">
			View on GitHub<FaGithub /><FiExternalLink />
		</a>
		</h3>
		<div className="project-images">
			{project.images.map((image, imgIndex) => (
				<img
					key={imgIndex}
					src={image}
					alt={`${project.title} - ${imgIndex + 1}`}
				/>
			))}
		</div>
		<p>{project.description}</p>
		{project.additionalInfo.length > 0 && (
			<div>
				<h3>Дополнительная информация:</h3>
				<ul className="additional-info">
					{project.additionalInfo.map((info, infoIndex) => (
						<li key={infoIndex}>
						<a href={info.link} target="_blank" rel="noopener noreferrer">
						{info.title}<TbExternalLink />
						</a>
						</li>
					))}
				</ul>
			</div>
		)}
	</div>
);

export default ProjectItem;