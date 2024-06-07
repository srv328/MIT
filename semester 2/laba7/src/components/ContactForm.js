import React, { useState } from "react";

function ContactForm({ onFormSubmission }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = {};
		
		if (!name.trim()) {
			newErrors.name = true;
		}
		
		if (!email.trim()) {
			newErrors.email = true;
		}
		
		if (!message.trim()) {
			newErrors.message = true;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return; 
		}

		const payload = {
			name: name,
			email: email,
			message: message,
		};

		try {
			const response = await fetch('/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				console.log("Сообщение отправлено");
				setName("");
				setEmail("");
				setMessage("");
				setErrors({});
				onFormSubmission(true);
			} else {
				console.error("Ошибка при отправке сообщения");
				onFormSubmission(false);
			}
		} catch (error) {
				console.error("Ошибка при отправке сообщения", error);
				onFormSubmission(false);
			}
		};
	
	const handleFocus = (fieldName) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
	};

	return (
		<form className="contact-form" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Имя:</label>
				<input
					className={`contact-input ${errors.name ? "error" : ""}`}
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onFocus={() => handleFocus("name")}
				/>
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					className={`contact-input ${errors.email ? "error" : ""}`}
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onFocus={() => handleFocus("email")}
				/>
			</div>
			<div>
				<label htmlFor="message">Сообщение:</label>
				<textarea
					className={`contact-textarea ${errors.message ? "error" : ""}`}
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onFocus={() => handleFocus("message")}
				/>
			</div>
			<button className="contact-button" type="submit">Отправить</button>
		</form>
	);
}

export default ContactForm;