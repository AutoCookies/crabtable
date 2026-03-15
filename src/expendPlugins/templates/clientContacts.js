/**
 * CRM / Client Contact List (Danh bạ khách hàng)
 */
export default {
    id: "clientContacts",
    nameKey: "clientContacts",
    descKey: "clientContactsDesc",
    icon: "fa-users",
    applyBorder: true,
    firstRowBg: "#7B1FA2",
    getData() {
        const header = ["Company", "Contact Person", "Title", "Email", "Phone", "Status"];
        const data = [header];
        for (let r = 0; r < 10; r++) {
            data.push(header.map(() => ""));
        }
        return data;
    },
};
