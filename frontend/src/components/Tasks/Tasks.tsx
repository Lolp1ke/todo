import { useEffect, useRef, useState } from "react";

import { useAuth } from "@context/AuthContext.tsx";
import { useTask } from "@context/TaskContext.tsx";

import "./styles/tasks.scss";

import Input from "@UI/Input/Input.tsx";

import { TTask } from "@shared/types/Task/TaskTypes.ts";

interface TaskProps {
	id: string;
	title: string;
	description: string;
	time: number;
}

function Task({ id, title, description, time }: TaskProps) {
	const { deleteTask } = useTask();

	return (
		<div className="task">
			<span className="task__decoration" />
			<article className="task__main">
				<button className="task__button" type={"button"}>
					<img src="/assets/icons/check.svg" alt="check" draggable={false} />
				</button>
				<h2 className="task__title">{title}</h2>
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

export default function Tasks() {
	const { currentUser } = useAuth();
	const { addTask, getAll } = useTask();

	const [tasks, setTasks] = useState<TTask[] | null>(null);
	const [showAdd, setShowAdd] = useState<boolean>(false);

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);

	async function addTaskHandler() {
		if (!currentUser) return;
		if (!titleRef.current) return;
		if (!descriptionRef.current) return;
		if (!dateRef.current) return;

		await addTask({
			userID: currentUser._id,
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			time: new Date(dateRef.current.value).getTime(),
		});
	}

	useEffect(() => {
		if (!currentUser) return;
		Promise.all([getAll({ userID: currentUser._id })]).then((data) => {
			setTasks(data[0]);
		});

		return () => {
			setTasks(null);
		};
	}, []);

	return (
		<section className="tasks">
			<form
				className="tasks__add"
				onSubmit={(e) => {
					e.preventDefault();
					addTaskHandler().then(() => {
						window.location.reload();
					});
				}}
			>
				<div className="tasks__actions">
					<h2 className="tasks__title">Create task</h2>
					<button
						className="tasks__action"
						type={"button"}
						onClick={() => {
							setShowAdd((prevState) => !prevState);
						}}
					>
						<img src="/assets/icons/chevrons/down.svg" alt="down" draggable={false} />
					</button>
				</div>
				<div className={"tasks__input" + " " + (showAdd ? "active" : "")}>
					<Input title={"Title"} placeholder={"Wake up"} type={"text"} ref={titleRef} />
					<Input
						title={"Description"}
						placeholder={"Do not turn of alarm"}
						type={"text"}
						ref={descriptionRef}
					/>
					<Input title={"Until"} type={"date"} ref={dateRef} />
					<button className="tasks__button" type={"submit"}>
						<img src="/assets/icons/plus.svg" alt="plus" draggable={false} />
					</button>
				</div>
			</form>
			{tasks &&
				tasks.map((task) => {
					return (
						<Task
							key={task._id}
							id={task._id}
							title={task.title}
							description={task.description}
							time={task.time}
						/>
					);
				})}
		</section>
	);
}
