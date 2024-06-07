import { FaGithub, FaVk, FaTelegramPlane } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
function SocialLinks() {
	return (
		<section className="social-links">
			<a href="https://github.com/srv328" target="_blank" rel="noopener noreferrer"> 
				<FaGithub /> GitHub<FiExternalLink />
			</a>
			<a href="https://vk.com/id330036555" target="_blank" rel="noopener noreferrer">
				<FaVk /> VK<FiExternalLink />
			</a>
			<a href="https://t.me/shevelev_rv" target="_blank" rel="noopener noreferrer">
				<FaTelegramPlane /> Telegram<FiExternalLink />
			</a>
		</section>
	);
}

export default SocialLinks;