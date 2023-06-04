import { model, Schema, Types } from "mongoose";
import { ObjectId } from "mongodb";

import User from "@mongo/Schemas/User";

interface TaskSchemaProps {
	userID: ObjectId;
	title: string;
	description: string;
	time: number;
	createdAt: number;
	alteredAt: number;
}

const TaskSchema = new Schema<TaskSchemaProps>({
	userID: {
		type: Types.ObjectId,
		ref: User,
		required: true,
		unique: false,
	},
	title: {
		type: String,
		required: true,
		unique: false,
	},
	description: {
		type: String,
		required: false,
		unique: false,
	},
	time: {
		type: Number,
		required: false,
		unique: false,
	},
	createdAt: {
		type: Number,
		required: true,
		unique: false,
		default: new Date().getTime(),
	},
	alteredAt: {
		type: Number,
		required: true,
		unique: false,
		default: new Date().getTime(),
	},
});

const Task = model<TaskSchemaProps>("Task", TaskSchema, "Tasks");
export default Task;
