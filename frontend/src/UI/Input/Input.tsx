import { forwardRef } from "react";

import "./styles/input.scss";

interface InputProps {
	title: string;
	placeholder: string;
	type: "text" | "number" | "password" | "email";
}

// export default function Input({ title, placeholder, type }: InputProps) {
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { title, placeholder, type } = props;
	return (
		<div className="input">
			<h2 className="input__title">{title}</h2>
			<input type={type} placeholder={placeholder} className="input__input" ref={ref} />
		</div>
	);
});

export default Input;
