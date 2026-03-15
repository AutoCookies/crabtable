/**
 * Import XLSX / XLS / CSV from file picker and load into the workbook.
 * Uses SheetJS (xlsx) for client-side parsing.
 */
import * as XLSX from "xlsx";
import Store from "../../store";
import { setluckysheetfile } from "../../methods/set";
import sheetmanage from "../../controllers/sheetmanage";
import { arrayRemoveItem } from "../../utils/util";

function importXlsx(options, config, isDemo) {
    arrayRemoveItem(Store.asyncLoad, "importXlsx");
}

/**
 * Convert a SheetJS workbook to internal sheet format (array of { name, index, order, status, color, config, celldata, row, column }).
 * @param {import('xlsx').WorkBook} workbook
 * @returns {Array}
 */
function workbookToSheets(workbook) {
    const sheetNames = workbook.SheetNames || [];
    if (sheetNames.length === 0) {
        return [
            {
                name: "Sheet1",
                index: 0,
                order: "0",
                status: "1",
                color: "",
                config: {},
                celldata: [],
                row: 84,
                column: 60,
            },
        ];
    }

    return sheetNames.map((name, i) => {
        const ws = workbook.Sheets[name];
        const ref = ws && ws["!ref"];
        let celldata = [];
        let maxRow = 0;
        let maxCol = 0;

        if (ref) {
            const range = XLSX.utils.decode_range(ref);
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const addr = XLSX.utils.encode_cell({ r: R, c: C });
                    const cell = ws[addr];
                    if (!cell) continue;
                    const raw = cell.v;
                    if (raw === undefined && !cell.f) continue;
                    maxRow = Math.max(maxRow, R);
                    maxCol = Math.max(maxCol, C);
                    let v;
                    if (cell.t === "s") {
                        v = { v: raw, m: raw, ct: { fa: "@", t: "s" } };
                    } else if (cell.t === "n") {
                        const num = Number(raw);
                        v = { v: num, m: String(raw), ct: { fa: "General", t: "n" } };
                    } else if (cell.t === "b") {
                        v = { v: !!raw, m: raw ? "TRUE" : "FALSE", ct: { fa: "General", t: "b" } };
                    } else if (cell.t === "d") {
                        const dateVal = raw instanceof Date ? raw : new Date(raw);
                        const str = dateVal.toISOString ? dateVal.toISOString() : String(raw);
                        v = { v: str, m: str, ct: { fa: "yyyy-mm-dd", t: "d" } };
                    } else if (cell.t === "e") {
                        v = { v: raw, m: String(raw), ct: { fa: "General", t: "e" } };
                    } else {
                        const str = raw != null ? String(raw) : "";
                        v = { v: str, m: str, ct: { fa: "@", t: "s" } };
                    }
                    if (cell.f) v.f = "=" + cell.f;
                    celldata.push({ r: R, c: C, v });
                }
            }
        }

        const row = maxRow >= 0 ? maxRow + 1 : 84;
        const column = maxCol >= 0 ? maxCol + 1 : 60;

        return {
            name: name || "Sheet" + (i + 1),
            index: i,
            order: String(i),
            status: i === 0 ? "1" : "0",
            color: "",
            config: {},
            celldata,
            row: Math.max(row, 1),
            column: Math.max(column, 1),
        };
    });
}

/**
 * Open file picker; on file select, parse and load workbook into the app.
 * @param {() => void} [onSuccess]
 * @param {(err: Error) => void} [onError]
 */
function openFileAndImport(onSuccess, onError) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";
    input.style.display = "none";
    document.body.appendChild(input);

    input.onchange = function () {
        const file = input.files && input.files[0];
        document.body.removeChild(input);
        input.value = "";
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const ab = e.target && e.target.result;
                if (!ab || !(ab instanceof ArrayBuffer)) {
                    onError && onError(new Error("Failed to read file"));
                    return;
                }
                const workbook = XLSX.read(ab, { type: "array", raw: true });
                const sheets = workbookToSheets(workbook);
                if (typeof luckysheet !== "undefined" && luckysheet.loadWorkbook) {
                    luckysheet.loadWorkbook(sheets);
                    onSuccess && onSuccess();
                } else {
                    onError && onError(new Error("loadWorkbook not available"));
                }
            } catch (err) {
                onError && onError(err);
            }
        };
        reader.onerror = function () {
            onError && onError(new Error("File read error"));
        };
        reader.readAsArrayBuffer(file);
    };

    input.click();
}

export { importXlsx, openFileAndImport, workbookToSheets };
