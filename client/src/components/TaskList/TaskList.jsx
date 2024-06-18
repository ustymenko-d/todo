'use client';

import { useContext } from 'react';
import { Context } from '@/app/todo/Todo';

import TaskItem from '../TaskItem/TaskItem';
import ModalForEdit from '../ModalForEdit/ModalForEdit';

const TaskList = () => {
	const { taskList } = useContext(Context);

	if (!taskList.length) {
		return <p>The list is empty</p>;
	}

	return (
		<ul className='flex flex-col gap-y-2'>
			{taskList.map((task) => {
				if (!task.parentid) {
					return (
						<li className=' p-4 rounded-2xl bg-neutral-100' key={task.id}>
							<TaskItem task={task} />
						</li>
					);
				}
			})}

			<ModalForEdit />
		</ul>
	);
};

export default TaskList;
