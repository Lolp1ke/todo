import { Fragment, useEffect, useState } from "react";

import { useAuth } from "@context/AuthContext.tsx";
import { useTask } from "@context/TaskContext.tsx";

import "./styles/tasks.scss";

import Task from "@components/Tasks/Task/Task.tsx";

import { TTask } from "@shared/types/Task/TaskTypes.ts";

import { Add } from "@components/Tasks/Add/Add.tsx";

export default function Tasks() {
	const { currentUser } = useAuth();
	const { getAll } = useTask();

	const [tasks, setTasks] = useState<TTask[] | null>(null);
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [showTasks, setShowTasks] = useState<boolean>(true);
	const [showCompleted, setShowCompleted] = useState<boolean>(false);

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
			<Add showAdd={showAdd} setShowAdd={setShowAdd} />
			<div className="tasks__list">
				<div className="tasks__actions">
					<h2 className="tasks__title">Active</h2>
					<button
						className="tasks__action"
						type={"button"}
						onClick={() => {
							setShowTasks((prevState) => !prevState);
						}}
					>
						<img src="/assets/icons/chevrons/down.svg" alt="down" draggable={false} />
					</button>
				</div>
				<div className={"tasks__tasks" + " " + (showTasks ? "active" : "")}>
					{tasks &&
						tasks.map((task) => {
							if (task.archived) return <Fragment key={task._id}></Fragment>;
							if (task.status) return <Fragment key={task._id}></Fragment>;

							return (
								<Task
									key={task._id}
									id={task._id}
									title={task.title}
									description={task.description}
									status={task.status}
									archived={task.archived}
									time={task.time}
								/>
							);
						})}
				</div>
			</div>
			<div className="tasks__list">
				<div className="tasks__actions">
					<h2 className="tasks__title">Completed</h2>
					<button
						className="tasks__action"
						type={"button"}
						onClick={() => {
							setShowCompleted((prevState) => !prevState);
						}}
					>
						<img src="/assets/icons/chevrons/down.svg" alt="down" draggable={false} />
					</button>
				</div>
				<div className={"tasks__tasks" + " " + (showCompleted ? "active" : "")}>
					{tasks &&
						tasks.map((task) => {
							if (task.archived) return <Fragment key={task._id}></Fragment>;
							if (!task.status) return <Fragment key={task._id}></Fragment>;

							return (
								<Task
									key={task._id}
									id={task._id}
									title={task.title}
									description={task.description}
									status={task.status}
									archived={task.archived}
									time={task.time}
								/>
							);
						})}
				</div>
			</div>
		</section>
	);
}
