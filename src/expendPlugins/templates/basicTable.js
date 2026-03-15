/**
 * Basic table template: 6 columns × 10 rows with border.
 * First row has green background (header row). No data in cells.
 */
export default {
    id: "basic",
    nameKey: "basicTable",
    descKey: "basicTableDesc",
    icon: "fa-table",
    applyBorder: true,
    /** CSS color for the first row background (e.g. green) */
    firstRowBg: "#2e7d32",
    getData() {
        const rows = 10;
        const cols = 6;
        const data = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) row.push("");
            data.push(row);
        }
        return data;
    },
};
