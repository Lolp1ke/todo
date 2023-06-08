import { Dispatch, SetStateAction, useRef } from "react";

import { useTask } from "@context/TaskContext.tsx";
import { useAuth } from "@context/AuthContext.tsx";

import Input from "@UI/Input/Input.tsx";

interface AddProps {
	showAdd: boolean;
	setShowAdd: Dispatch<SetStateAction<boolean>>;
}

export function Add({ showAdd, setShowAdd }: AddProps) {
	const { addTask } = useTask();
	const { currentUser } = useAuth();

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

	return (
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
				<Input title={"Description"} placeholder={"Do not turn of alarm"} type={"text"} ref={descriptionRef} />
				<Input title={"Until"} type={"date"} ref={dateRef} />
				<button className="tasks__button" type={"submit"}>
					<img src="/assets/icons/plus.svg" alt="plus" draggable={false} />
				</button>
			</div>
		</form>
	);
}
