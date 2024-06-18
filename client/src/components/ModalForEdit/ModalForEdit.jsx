import { useContext, useState } from 'react';
import { taskInputValidate } from '@/utils/taskInputValidate';

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { BtnStyled, Context } from '@/app/todo/Todo';
import Box from '@mui/material/Box';

import classes from './ModalForEdit.module.scss';
import PostService from '@/API/PostService';

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

const ModalForEdit = () => {
	const {
		modalEditOpen,
		handleModalEditClose,
		allTasks,
		setAllTasks,
		editableTaskID,
		setIsLoading,
	} = useContext(Context);
	const [newTaskBody, setNewTaskBody] = useState('');
	const [invalidValue, setInvalidValue] = useState(false);

	const updateTask = (taskID) => {
		if (taskInputValidate(newTaskBody)) {
			setIsLoading(true);

			let cloneTasks = structuredClone(allTasks);
			let updatedTask;

			cloneTasks.forEach((task) => {
				if (task.id === taskID) {
					task.body = newTaskBody;

					updatedTask = structuredClone(task);
				}
			});

			setAllTasks(cloneTasks);
			setNewTaskBody('');
			handleModalEditClose();

			PostService.updateTask(taskID, updatedTask);

			setIsLoading(false);
		} else {
			setInvalidValue(true);
		}
	};

	return (
		<Modal
			open={modalEditOpen}
			onClose={handleModalEditClose}
			aria-labelledby='modal-edit-title'
			aria-describedby='modal-edit-description'>
			<Box sx={modalStyle}>
				<Typography id='modal-edit-title' variant='h6' component='h2'>
					Edit task
				</Typography>
				<Typography id='modal-edit-description' sx={{ mb: 2 }}>
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
						label='Update Task'
						variant='outlined'
					/>

					<BtnStyled
						onClick={() => {
							taskInputValidate(newTaskBody)
								? updateTask(editableTaskID)
								: setInvalidValue(true);
						}}
						variant='contained'>
						<CheckIcon />
					</BtnStyled>
					<BtnStyled
						onClick={() => {
							setNewTaskBody('');
							handleModalEditClose();
						}}
						variant='contained'>
						<CloseIcon />
					</BtnStyled>
				</div>
			</Box>
		</Modal>
	);
};

export default ModalForEdit;
