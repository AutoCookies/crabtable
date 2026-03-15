/**
 * Expense Tracker (Theo dõi chi tiêu)
 */
export default {
    id: "expenseTracker",
    nameKey: "expenseTracker",
    descKey: "expenseTrackerDesc",
    icon: "fa-money",
    applyBorder: true,
    firstRowBg: "#E64A19",
    getData() {
        const header = ["Date", "Category", "Description", "Amount", "Notes"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
