/**
 * Meeting Minutes (Biên bản cuộc họp)
 */
export default {
    id: "meetingMinutes",
    nameKey: "meetingMinutes",
    descKey: "meetingMinutesDesc",
    icon: "fa-comments-o",
    applyBorder: true,
    firstRowBg: "#5D4037",
    getData() {
        const header = ["Topic", "Decision", "Action Item", "Owner", "Deadline"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
