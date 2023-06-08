import { useTask } from "@context/TaskContext.tsx";

interface TaskProps {
	id: string;
	title: string;
	description: string;
	status: boolean;
	archived: boolean;
	time: number;
}

export default function Task({ id, title, description, status, archived, time }: TaskProps) {
	const { deleteTask, completeTask, archiveTask } = useTask();

	return (
		<div className="task">
			<span className="task__decoration" />
			<article className="task__main">
				<button
					className="task__button"
					type={"button"}
					onClick={() => {
						completeTask({ id: id, status: !status }).then(() => {
							window.location.reload();
						});
					}}
				>
					<img src={`/assets/icons/check-${status ? "on" : "off"}.svg`} alt="check" draggable={false} />
				</button>
				<h2 className="task__title">{title}</h2>
				<button
					className="task__button"
					type={"button"}
					onClick={() => {
						archiveTask({ id: id, archived: !archived }).then(() => {
							window.location.reload();
						});
					}}
				>
					<img src="/assets/icons/archive.svg" alt="delete" draggable={false} />
				</button>
				<button
					className="task__button"
					type={"button"}
					onClick={() => {
						deleteTask({ id: id }).then(() => {
							window.location.reload();
						});
					}}
				>
					<img src="/assets/icons/trash.svg" alt="delete" draggable={false} />
				</button>
			</article>
			<span className="task__line" />
			<article className="task__details">
				<p className="task__description">{description}</p>
				<p className="task__date">{new Date(time).toLocaleDateString()}</p>
			</article>
		</div>
	);
}
