import { useAuth } from "@context/AuthContext.tsx";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles/settings.scss";

import Layout from "@components/Layout/Layout.tsx";
import { useCustomCookies } from "@context/CustomCookiesContext.tsx";

export default function Settings() {
	const { currentUser, changeProfilePicture } = useAuth();
	const { removeCookies } = useCustomCookies();
	const redirectTo = useNavigate();

	const imageRef = useRef<HTMLInputElement>(null);

	function handleOpenChangeImage() {
		if (!imageRef.current) return;
		imageRef.current.click();
	}

	function handleChangeImage() {
		if (!imageRef.current) return;
		if (!imageRef.current.files) return;

		const reader = new FileReader();
		reader.readAsDataURL(imageRef.current.files[0]);
		reader.onload = async function () {
			await changeProfilePicture({
				base64: reader.result as string,
			}).then(() => {
				window.location.reload();
			});
		};
	}

	function handleLogOut() {
		removeCookies("token");
		window.location.reload();
	}

	useEffect(() => {
		if (!currentUser) return redirectTo("/auth");
	}, []);
	return (
		<Layout className="settings">
			<div className="settings__profile">
				<div className="settings__picture-block">
					<img
						src={currentUser?.profilePictureURL || "https://placekitten.com/200"}
						alt="user"
						className="settings__profile-image"
						draggable={false}
					/>
					<button className="settings__picture-edit" type={"button"} onClick={handleOpenChangeImage}>
						<input type="file" ref={imageRef} hidden={true} onChange={handleChangeImage} />
						<img src="/assets/icons/edit.svg" alt="edit" draggable={false} />
					</button>
				</div>
				<h2 className="settings__profile-name">{currentUser?.name || "No name"}</h2>
				<p className="settings__profile-username">@{currentUser?.username}</p>
			</div>
			<div className="settings__pages">
				<Link to="/settings/account" className="settings__link">
					<img src="/assets/icons/profile.svg" alt="profile" draggable={false} />
					Account
				</Link>
				<p>Here will be more soon</p>
			</div>
			<span className="settings__line" />
			<div className="settings__actions">
				<Link to={"/privacy-policy"} className="settings__action-link">
					<img src="/assets/icons/book.svg" alt="book" draggable={false} />
					Privacy policy
				</Link>
				<Link to={"https://t.me/lolp1ke"} target={"_blank"} className="settings__action-link">
					<img src="/assets/icons/help.svg" alt="help" draggable={false} />
					Help
				</Link>
				<button className="settings__action" type={"button"} onClick={handleLogOut}>
					Log out
					<img src="/assets/icons/log-out.svg" alt="log-out" draggable={false} />
				</button>
			</div>
		</Layout>
	);
}
