'use client';

import { useContext, useRef, useState } from 'react';
import { Context } from '@/app/todo/Todo';
import PostService from '@/API/PostService';
import { removeTask } from '@/utils/removeTask';

import { BtnStyled } from '@/app/todo/Todo';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import classes from './TaskItem.module.scss';

const TaskItem = ({ task }) => {
	const {
		allTasks,
		setAllTasks,
		taskList,
		setTaskList,
		setEditableTaskID,
		handleModalAddOpen,
		handleModalEditOpen,
	} = useContext(Context);
	const parentElem = useRef();
	const [completed, setCompleted] = useState(task.completed);

	const renderSubtasks = (subtasksArr) => {
		return (
			<ul className='flex flex-col gap-y-2'>
				{subtasksArr.map((task) => {
					return (
						<li key={task.id}>
							<TaskItem task={task} />
						</li>
					);
				})}
			</ul>
		);
	};

	const handleSwitch = () => {
		setCompleted(!completed);

		PostService.toggleTaskState(parentElem.current.id);
	};

	return (
		<div
			ref={parentElem}
			id={task.id}
			className='pl-4 rounded-md flex flex-col gap-y-4'>
			<div className='flex gap-x-4 justify-between p-4 bg-stone-300 rounded-xl'>
				<div className='flex items-start gap-2'>
					<Checkbox
						checked={completed}
						color='success'
						onChange={() => {
							handleSwitch();
						}}
					/>
					<p className={completed ? 'pt-2 line-through' : 'pt-2'}>
						{task.body}
					</p>
				</div>

				<div className='flex max-md:flex-col gap-2'>
					<BtnStyled
						className={classes['task-item__button']}
						onClick={() => {
							setEditableTaskID(parentElem.current.id);
							handleModalEditOpen();
						}}>
						<EditIcon />
					</BtnStyled>

					<BtnStyled
						className={classes['task-item__button']}
						onClick={() => {
							setEditableTaskID(parentElem.current.id);
							handleModalAddOpen();
						}}>
						<AddIcon />
					</BtnStyled>

					<BtnStyled
						className={classes['task-item__button']}
						onClick={() => {
							setEditableTaskID(parentElem.current.id);
							removeTask(
								parentElem.current.id,
								allTasks,
								setAllTasks,
								taskList,
								setTaskList
							);
						}}>
						<DeleteIcon />
					</BtnStyled>
				</div>
			</div>

			<div>{task.subtasks.length > 0 && renderSubtasks(task.subtasks)}</div>
		</div>
	);
};

export default TaskItem;
