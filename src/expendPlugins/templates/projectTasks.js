/**
 * Project Task Tracker (Quản lý dự án)
 */
export default {
    id: "projectTasks",
    nameKey: "projectTasks",
    descKey: "projectTasksDesc",
    icon: "fa-tasks",
    applyBorder: true,
    firstRowBg: "#1976D2",
    getData() {
        const header = ["No.", "Task Name", "Assignee", "Status", "Priority", "Due Date"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
