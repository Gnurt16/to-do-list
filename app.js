const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: "",
            tasks: JSON.parse(localStorage.getItem("tasks")) || []
        };
    },
    computed: {
        remainingTasks() {
            return this.tasks.filter(task => !task.completed).length;
        }
    },
    methods: {
        addTask() {
            if (this.newTask.trim() !== "") {
                this.tasks.push({ name: this.newTask, completed: false });
                this.newTask = "";
                this.saveTasks();
            }
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        },
        editTask(index) {
            const task = this.tasks[index];
            const updatedName = prompt("Chỉnh sửa công việc:", task.name);
            if (updatedName !== null && updatedName.trim() !== "") {
                task.name = updatedName.trim();
                this.saveTasks();
            }
        },
        saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
    }
}).mount("#app");
