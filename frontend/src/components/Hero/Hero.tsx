import "./styles/hero.scss";

export default function Hero() {
	const today: string = new Date().toLocaleDateString("EN-en", {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		weekday: "long",
	});

	return (
		<article className="hero">
			<h1 className="hero__title">{today}</h1>
			<p className="hero__text">Best platform for creating to-do lists :)</p>
		</article>
	);
}
