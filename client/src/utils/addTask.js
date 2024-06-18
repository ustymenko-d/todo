import PostService from '@/API/PostService';

const addTask = (newTask, allTasks, setAllTasks) => {
	setAllTasks([...allTasks, newTask]);
	PostService.postTask(newTask);
};

export { addTask };
