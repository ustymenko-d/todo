export default class PostService {
	static async getALL() {
		try {
			return await fetch('http://localhost:8080/tasks/all', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}).then((res) => res.json());
		} catch (error) {
			console.error(error.message);
		}
	}

	static async postTask(newTask) {
		try {
			await fetch('http://localhost:8080/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTask),
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	static async deleteTask(id) {
		try {
			return await fetch(`http://localhost:8080/tasks/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	static async toggleTaskState(id) {
		try {
			await fetch(`http://localhost:8080/tasks/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	static async updateTask(id, updatedTask) {
		try {
			await fetch(`http://localhost:8080/tasks/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTask),
			});
		} catch (error) {
			console.error(error.message);
		}
	}
}
