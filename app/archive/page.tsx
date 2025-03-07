import { RobdayLogCarousel } from "../components/RobdayLogCarosel";

export default async function Page() {
	return (
		<div className="h-[70vh] mb-18">
			<h1 className="text-2xl font-bold">ARCHIVE</h1>
			<p className="pb-18">Welcome to your archive page.</p>
			<RobdayLogCarousel />
		</div>
	);
}