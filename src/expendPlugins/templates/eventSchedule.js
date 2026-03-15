/**
 * Event Schedule (Lịch trình sự kiện)
 */
export default {
    id: "eventSchedule",
    nameKey: "eventSchedule",
    descKey: "eventScheduleDesc",
    icon: "fa-clock-o",
    applyBorder: true,
    firstRowBg: "#F57C00",
    getData() {
        const header = ["Start Time", "End Time", "Activity", "PIC", "Location", "Notes"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
