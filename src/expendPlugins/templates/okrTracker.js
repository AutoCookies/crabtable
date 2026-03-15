/**
 * OKR / Goal Tracker (Theo dõi Mục tiêu OKR)
 */
export default {
    id: "okrTracker",
    nameKey: "okrTracker",
    descKey: "okrTrackerDesc",
    icon: "fa-bullseye",
    applyBorder: true,
    firstRowBg: "#0097A7",
    getData() {
        const header = ["Objective", "Key Result", "Target", "Current", "Progress %", "Status"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
