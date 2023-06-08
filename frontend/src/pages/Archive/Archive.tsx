import { useEffect, useState } from "react";

import { useTask } from "@context/TaskContext.tsx";
import { useAuth } from "@context/AuthContext.tsx";

import "./styles/archive.scss";

import Layout from "@components/Layout/Layout.tsx";
import Task from "@components/Tasks/Task/Task.tsx";

import { TTask } from "@shared/types/Task/TaskTypes.ts";

export default function Archive() {
	const { currentUser } = useAuth();
	const { getAll } = useTask();

	const [tasks, setTasks] = useState<TTask[] | null>(null);

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
		<Layout className={"archive"}>
			<div className="tasks__actions">
				<h2 className="tasks__title">Archived</h2>
			</div>
			<div className="tasks__tasks active">
				{tasks &&
					tasks.map((task) => {
						if (task.archived) {
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
						}
					})}
			</div>
		</Layout>
	);
}
