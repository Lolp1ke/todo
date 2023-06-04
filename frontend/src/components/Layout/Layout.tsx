import { ReactNode } from "react";

import "./styles/layout.scss";

import Navbar from "@components/Navbar/Navbar.tsx";
import Hero from "@components/Hero/Hero.tsx";

interface LayoutProps {
	children: ReactNode;
	className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
	return (
		<>
			<Hero />
			<main className={className + " " + "layout"}>{children}</main>
			<Navbar />
		</>
	);
}
