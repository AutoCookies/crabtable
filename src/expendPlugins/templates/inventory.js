/**
 * Inventory Management (Quản lý kho)
 */
export default {
    id: "inventory",
    nameKey: "inventory",
    descKey: "inventoryDesc",
    icon: "fa-archive",
    applyBorder: true,
    firstRowBg: "#455A64",
    getData() {
        const header = ["Item ID", "Item Name", "Category", "In Stock", "Reorder Level", "Price"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
