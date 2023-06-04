import { NavLink } from "react-router-dom";

import "./styles/navbar.scss";

export default function Navbar() {
	return (
		<nav className="navbar">
			<NavLink to={"/"} className="navbar__link" draggable={false}>
				<img src="/assets/icons/home.svg" alt="home" draggable={false} />
			</NavLink>
			<NavLink to={"/settings"} className="navbar__link" draggable={false}>
				<img src="/assets/icons/settings.svg" alt="settings" draggable={false} />
			</NavLink>
		</nav>
	);
}
