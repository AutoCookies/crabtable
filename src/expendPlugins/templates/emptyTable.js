/**
 * Empty table template: 6 columns × 10 rows with border.
 * Structure only, no data. Inserts a bordered grid at the current selection.
 */
export default {
    id: "empty",
    nameKey: "emptyTable",
    descKey: "emptyTableDesc",
    icon: "fa-th",
    /** Apply border around the entire inserted range */
    applyBorder: true,
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
