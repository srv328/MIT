import { React, useState } from 'react';
import Header from './components/Header';
import Activity from './components/Activity';
import ProfileImage from './components/ProfileImage';
import SocialLinks from './components/SocialLinks';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import ExpandableSection from './components/ExpandableSection';
import Modal from "./components/Modal";
import Swal from 'sweetalert2';
import './App.css'; 

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false); 

	const handleOpenModal = () => {
		setIsModalOpen(true);
		setTimeout(() => { 
			const modal = document.querySelector(".modal");
			modal.classList.add("open"); 
		}, 10); 
	};

	const handleCloseModal = () => {
		const modal = document.querySelector(".modal");
		modal.classList.remove("open");
		modal.classList.add("close");
		setTimeout(() => {
			setIsModalOpen(false); 
			modal.classList.remove("close");
		}, 10); 
	};

	const handleFormSubmission = (success) => {
		setIsModalOpen(false); 
		if (success) {
			Swal.fire({
				icon: 'success',
				title: 'Сообщение успешно отправлено!',
				showConfirmButton: false,
				timer: 1700
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Упс, что-то пошло не так..Попробуйте снова!',
				showConfirmButton: true,
			});
		}
	};

	return (
		<div>
			<Header />
			<div class="container"> 
				<ProfileImage />
				<SocialLinks />
				<AboutMe />
				<ExpandableSection title="Деятельность">
					<Activity />
				</ExpandableSection>
				<ExpandableSection title="Опыт работы">
					<Experience />
				</ExpandableSection>
				<ExpandableSection title="Мои навыки">
					<Skills />
				</ExpandableSection>
				<Projects />
				<button className="contact-button" onClick={handleOpenModal}>Связаться со мной</button>
				<Modal isOpen={isModalOpen} onClose={handleCloseModal}> 
					<ContactForm onFormSubmission={handleFormSubmission}/> 
				</Modal>
			</div> 
			<Footer />
		</div>
	);
}

export default App;