const createList = (dbArray) => {
	dbArray.forEach((item) => {
		item.subtasks = [];

		dbArray.forEach((element) => {
			if (element.parentId === item.id) {
				item.subtasks.push(element);
			}
		});
	});

	return dbArray.filter((task) => task.parentId === '');
};

export { createList };
