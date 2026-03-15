/**
 * Employee Timesheet (Bảng chấm công)
 */
export default {
    id: "timesheet",
    nameKey: "timesheet",
    descKey: "timesheetDesc",
    icon: "fa-calendar-check-o",
    applyBorder: true,
    firstRowBg: "#00796B",
    getData() {
        const header = ["Emp ID", "Name", "Mon", "Tue", "Wed", "Thu", "Fri", "Total Hours"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
