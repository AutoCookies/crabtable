/**
 * Invoice Template (Hóa đơn dịch vụ)
 */
export default {
    id: "invoice",
    nameKey: "invoice",
    descKey: "invoiceDesc",
    icon: "fa-file-text-o",
    applyBorder: true,
    firstRowBg: "#C2185B",
    getData() {
        const header = ["No.", "Item / Description", "Qty", "Unit", "Unit Price", "Total"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
