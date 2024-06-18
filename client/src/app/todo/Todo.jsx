'use client';

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PostService from '@/API/PostService';
import { createList } from '@/utils/createList';

import ModalForAdd from '@/components/ModalForAdd/ModalForAdd';
import Button from '@mui/material/Button';
import TaskList from '@/components/TaskList/TaskList';
import CircularProgress from '@mui/material/CircularProgress';

export const Context = React.createContext();

export const BtnStyled = styled(Button)({
	backgroundColor: 'rgb(12 10 9)',
	color: 'rgb(250 250 249)',
	outlineColor: 'rgb(87 83 78)',
	'&:hover': {
		backgroundColor: 'rgb(87 83 78)',
	},
	'&:focus-visible': {
		backgroundColor: 'rgb(87 83 78)',
	},
});

const Todo = () => {
	const [allTasks, setAllTasks] = useState([]);
	const [taskList, setTaskList] = useState([]);
	const [modalAddOpen, setModalAddOpen] = useState(false);
	const handleModalAddOpen = () => setModalAddOpen(true);
	const handleModalAddClose = () => setModalAddOpen(false);

	const [modalEditOpen, setModalEditOpen] = useState(false);
	const handleModalEditOpen = () => setModalEditOpen(true);
	const handleModalEditClose = () => setModalEditOpen(false);

	const [editableTaskID, setEditableTaskID] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			let allTasks = await PostService.getALL();

			if (allTasks) {
				setAllTasks(structuredClone(allTasks));
				setTaskList(createList(allTasks));
			}

			setIsLoading(false);
		})();
	}, []);

	useEffect(() => {
		let cloneAll = createList(structuredClone(allTasks));
		setTaskList(cloneAll);
	}, [allTasks]);

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold uppercase mb-6'>Todo page</h1>

			<Context.Provider
				value={{
					allTasks,
					setAllTasks,
					taskList,
					setTaskList,
					editableTaskID,
					setEditableTaskID,
					modalAddOpen,
					handleModalAddOpen,
					handleModalAddClose,
					modalEditOpen,
					handleModalEditOpen,
					handleModalEditClose,
					setIsLoading,
				}}>
				<div className='flex flex-col gap-y-4'>
					<div className='flex justify-between items-center'>
						<BtnStyled
							onClick={() => {
								setEditableTaskID(null);
								handleModalAddOpen();
							}}
							className='max-w-fit'
							variant='contained'>
							Add new task
						</BtnStyled>

						{isLoading && <CircularProgress color='inherit' />}
					</div>

					<ModalForAdd />

					<TaskList />
				</div>
			</Context.Provider>
		</div>
	);
};

export default Todo;
