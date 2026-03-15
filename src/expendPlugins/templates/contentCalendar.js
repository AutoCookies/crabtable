/**
 * Content Calendar (Lịch đăng bài truyền thông)
 */
export default {
    id: "contentCalendar",
    nameKey: "contentCalendar",
    descKey: "contentCalendarDesc",
    icon: "fa-bullhorn",
    applyBorder: true,
    firstRowBg: "#D81B60",
    getData() {
        const header = ["Publish Date", "Platform", "Content Title", "Author", "Link", "Status"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
