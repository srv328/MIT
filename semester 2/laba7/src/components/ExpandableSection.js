import React, { useState } from "react";
import "./ExpandableSection.css"; 

import PlusIcon from './logo/x.png';
import CloseIcon from './logo/rotate_x.png';

function ExpandableSection({ title, children }) { 
	const [isExpanded, setIsExpanded] = useState(false); 

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section className={`expandable-section ${isExpanded ? 'expanded' : ''}`}>
			<h2 onClick={toggleExpanded}>
				{title}
				<span className="toggle-icon">
					{isExpanded ? <img src={CloseIcon} alt="Закрыть" /> : <img src={PlusIcon} alt="Открыть" />}
				</span>
			</h2>
			<div className="content">{children}</div>
		</section>
	);
}

export default ExpandableSection;