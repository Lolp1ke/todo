import "./styles/account.scss";

import Layout from "@components/Layout/Layout.tsx";

import Input from "@UI/Input/Input.tsx";
import { useRef } from "react";
import { useAuth } from "@context/AuthContext.tsx";

export default function Account() {
	const { currentUser, changeName, changePassword } = useAuth();

	const nameRef = useRef<HTMLInputElement>(null);
	const oldPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);

	async function handleChangeProfile() {
		if (!currentUser) return;
		if (!nameRef.current) return;
		if (!oldPasswordRef.current) return;
		if (!newPasswordRef.current) return;

		if (nameRef.current.value) {
			await changeName({
				userID: currentUser._id,
				newName: nameRef.current.value,
			});
		}
		if (oldPasswordRef.current.value) {
			await changePassword({
				userID: currentUser._id,
				oldPassword: oldPasswordRef.current.value,
				newPassword: newPasswordRef.current.value,
			});
		}
	}

	return (
		<Layout className="account">
			<Input title={"Full Name"} placeholder={"Your name"} type={"text"} ref={nameRef} />
			<Input title={"Old password"} placeholder={"Nomer 1 es zhe"} type={"text"} ref={oldPasswordRef} />
			<Input title={"New password"} placeholder={"********"} type={"text"} ref={newPasswordRef} />

			<button
				className="account__save"
				type={"button"}
				onClick={() => {
					handleChangeProfile().then(() => {
						window.location.reload();
					});
				}}
			>
				Save changes
			</button>
		</Layout>
	);
}
