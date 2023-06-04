import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@context/AuthContext.tsx";

import "./styles/auth.scss";

import Input from "@UI/Input/Input.tsx";

export default function Auth() {
	const { currentUser, signIn, signUp } = useAuth();
	const redirectTo = useNavigate();

	const [isLogin, setIsLogin] = useState<boolean>(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	async function handleSubmitForm() {
		if (!usernameRef.current) return;
		if (!passwordRef.current) return;

		if (isLogin) {
			signIn({
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			}).then();
		} else {
			signUp({
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			}).then();
		}
	}

	useEffect(() => {
		if (currentUser) return redirectTo("/");
	}, [currentUser]);

	return (
		<form
			className="auth"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmitForm().then(() => {
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				});
			}}
		>
			<article className="auth__article">
				<h1 className="auth__title">{isLogin ? "Welcome back!" : "Create account"}</h1>
				<p className="auth__text">
					{isLogin
						? "Your work faster and structured with Todo App"
						: "Create your account and feel the benefits"}
				</p>
			</article>
			<div className="auth__content">
				<Input title={"Username"} placeholder={"SuperNickName228"} type={"text"} ref={usernameRef} />
				<Input title={"Password"} placeholder={"At least 8 characters"} type={"password"} ref={passwordRef} />
			</div>
			<div className="auth__actions">
				<button
					className="auth__action"
					type={"button"}
					onClick={() => {
						setIsLogin((prevState) => !prevState);
					}}
				>
					{isLogin ? "Create an account" : "Already have one"}
				</button>
				<button className="auth__submit" type={"submit"}>
					{isLogin ? "Sign In" : "Sign Up"}
				</button>
			</div>
		</form>
	);
}
