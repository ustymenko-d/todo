import React, { useContext, useState } from 'react';
import { Context } from '@/app/todo/Todo';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '@/utils/addTask';

import { BtnStyled } from '@/app/todo/Todo';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import classes from './ModalForAdd.module.scss';
import { taskInputValidate } from '@/utils/taskInputValidate';
import { createList } from '@/utils/createList';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '300px',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const ModalForAdd = () => {
	const {
		modalAddOpen,
		handleModalAddClose,
		allTasks,
		setAllTasks,
		taskList,
		setTaskList,
		editableTaskID,
		setIsLoading,
	} = useContext(Context);
	const [newTaskBody, setNewTaskBody] = useState('');
	const [invalidValue, setInvalidValue] = useState(false);

	const createNewTask = () => {
		if (taskInputValidate(newTaskBody)) {
			setIsLoading(true);

			const newTask = {
				id: uuidv4(),
				body: newTaskBody,
				completed: false,
				parentId: editableTaskID ? editableTaskID : '',
			};

			addTask(newTask, allTasks, setAllTasks);

			setNewTaskBody('');
			handleModalAddClose();
			setIsLoading(false);
		}
	};

	return (
		<Modal
			open={modalAddOpen}
			onClose={handleModalAddClose}
			aria-labelledby='modal-add-title'
			aria-describedby='modal-add-description'>
			<Box sx={modalStyle}>
				<Typography id='modal-add-title' variant='h6' component='h2'>
					Add a new task
				</Typography>
				<Typography id='modal-add-description' sx={{ mb: 2 }}>
					The task title must contain some characters.
				</Typography>

				<div className={classes.modal__actions}>
					<TextField
						required
						error={invalidValue}
						value={newTaskBody}
						onChange={(e) => setNewTaskBody(e.target.value)}
						onBlur={(e) => {
							if (!taskInputValidate(e.target.value)) {
								setInvalidValue(true);
							} else {
								setInvalidValue(false);
							}
						}}
						className={classes.modal__input}
						label='New Task'
						variant='outlined'
					/>

					<BtnStyled
						onClick={() => {
							if (taskInputValidate(newTaskBody)) createNewTask();
						}}
						variant='contained'>
						Add
					</BtnStyled>
					<BtnStyled
						onClick={() => {
							setNewTaskBody('');
							handleModalAddClose();
						}}
						variant='contained'>
						Cansel
					</BtnStyled>
				</div>
			</Box>
		</Modal>
	);
};

export default ModalForAdd;
