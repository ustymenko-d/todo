import PostService from '@/API/PostService';

const findSubtasksId = (id, list, idToRemoveList = []) => {
	list.forEach((item) => {
		if (item.id === id) {
			idToRemoveList.push(item.id);

			if (item.subtasks.length > 0) {
				item.subtasks.forEach((elem) => {
					findSubtasksId(elem.id, item.subtasks, idToRemoveList);
				});
			}
		} else if (item.id !== id && item.subtasks.length > 0) {
			item.subtasks.forEach((elem) => {
				findSubtasksId(id, item.subtasks, idToRemoveList);
			});
		}
	});

	return idToRemoveList;
};

const removeTask = (targetId, tasks, setTasks, list, setList) => {
	const removeIdList = findSubtasksId(targetId, list);

	let newList = [];

	removeIdList.forEach((id) => {
		PostService.deleteTask(id);
	});

	newList = tasks.filter((task) => !removeIdList.includes(task.id));

	setTasks(newList);
};

export { removeTask };
