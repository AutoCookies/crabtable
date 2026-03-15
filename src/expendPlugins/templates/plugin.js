/**
 * Table templates: insert predefined layouts (structure only, no data) into the sheet.
 * Each template lives in its own file under ./templates/.
 */
import Store from "../../store";
import { getSheetIndex } from "../../methods/get";
import locale from "../../locale/locale";
import { datagridgrowth } from "../../global/getdata";
import { setcellvalue } from "../../global/setdata";
import sheetmanage from "../../controllers/sheetmanage";
import { jfrefreshgrid } from "../../global/refresh";
import editor from "../../global/editor";

import emptyTable from "./emptyTable.js";
import basicTable from "./basicTable.js";
import projectTasks from "./projectTasks.js";
import expenseTracker from "./expenseTracker.js";
import inventory from "./inventory.js";
import clientContacts from "./clientContacts.js";
import timesheet from "./timesheet.js";
import invoice from "./invoice.js";
import okrTracker from "./okrTracker.js";
import contentCalendar from "./contentCalendar.js";
import meetingMinutes from "./meetingMinutes.js";
import eventSchedule from "./eventSchedule.js";

const TEMPLATES = [
    emptyTable,
    basicTable,
    projectTasks,
    expenseTracker,
    inventory,
    clientContacts,
    timesheet,
    invoice,
    okrTracker,
    contentCalendar,
    meetingMinutes,
    eventSchedule,
];

const PANEL_ID = "luckysheet-templates-panel";

function getLocale() {
    const loc = locale();
    return (loc.templates || {});
}

function insertTemplateData(templateData, options = {}) {
    const sel = Store.luckysheet_select_save && Store.luckysheet_select_save[0];
    if (!sel || !sel.row || !sel.column) return;
    const r0 = sel.row[0];
    const c0 = sel.column[0];
    const order = getSheetIndex(Store.currentSheetIndex);
    const file = Store.luckysheetfile[order];
    if (!file) return;

    let data = file.data;
    if (!data || data.length === 0) {
        data = sheetmanage.buildGridData(file);
    }
    const templateRows = templateData.length;
    const templateCols = Math.max(...templateData.map((row) => row.length));
    const needRows = r0 + templateRows;
    const needCols = c0 + templateCols;
    const currentRows = data.length;
    const currentCols = data[0] ? data[0].length : 0;
    const addRows = Math.max(0, needRows - currentRows);
    const addCols = Math.max(0, needCols - currentCols);
    if (addRows > 0 || addCols > 0) {
        data = datagridgrowth(data, addRows, addCols, false);
    }

    for (let i = 0; i < templateData.length; i++) {
        const row = templateData[i];
        for (let j = 0; j < row.length; j++) {
            const val = row[j];
            const cellVal = val === "" ? "" : { v: val, m: String(val), ct: { fa: "General", t: "g" } };
            setcellvalue(r0 + i, c0 + j, data, cellVal);
        }
    }

    if (options.firstRowBg) {
        for (let j = 0; j < templateCols; j++) {
            const cell = data[r0][c0 + j];
            if (cell && typeof cell === "object") {
                cell.bg = options.firstRowBg;
            } else {
                data[r0][c0 + j] = { bg: options.firstRowBg };
            }
        }
    }

    if (options.applyBorder) {
        if (file.config == null) file.config = {};
        if (file.config.borderInfo == null) file.config.borderInfo = [];
        file.config.borderInfo.push({
            rangeType: "range",
            borderType: "border-all",
            style: "1",
            color: "#000",
            range: [{ row: [r0, r0 + templateRows - 1], column: [c0, c0 + templateCols - 1] }],
        });
        if (file.index === Store.currentSheetIndex) {
            Store.config = file.config;
        }
    }

    file.data = data;
    if (file.index === Store.currentSheetIndex) {
        Store.flowdata = data;
        if (editor.webWorkerFlowDataCache) editor.webWorkerFlowDataCache(data);
        const range = [{ row: [r0, r0 + templateRows - 1], column: [c0, c0 + templateCols - 1] }];
        jfrefreshgrid(data, range, null, false, true);
    }
}

function ensurePanel() {
    let $panel = $("#" + PANEL_ID);
    if ($panel.length) return $panel;

    const loc = getLocale();
    const title = loc.title != null ? loc.title : "Table templates";
    const insertBtn = loc.insert != null ? loc.insert : "Insert";
    const closeBtn = loc.close != null ? loc.close : "Close";

    let itemsHtml = TEMPLATES.map(
        (t) => `
        <div class="luckysheet-template-item" data-id="${t.id}">
            <div class="luckysheet-template-item-icon"><i class="fa ${t.icon}" aria-hidden="true"></i></div>
            <div class="luckysheet-template-item-body">
                <div class="luckysheet-template-item-name">${(loc[t.nameKey] != null ? loc[t.nameKey] : t.id)}</div>
                <div class="luckysheet-template-item-desc">${(loc[t.descKey] != null ? loc[t.descKey] : "")}</div>
            </div>
            <button type="button" class="luckysheet-template-insert-btn">${insertBtn}</button>
        </div>`
    ).join("");

    const content = `
        <div class="luckysheet-templates-intro">${(loc.intro != null ? loc.intro : "Choose a layout to insert at the current selection. No data is added—only structure and headers.")}</div>
        <div class="luckysheet-templates-list">${itemsHtml}</div>
    `;

    const html = `
        <div id="${PANEL_ID}" class="luckysheet-modal-dialog-slider luckysheet-templates-panel" style="display:none; right: 0; width: 320px;">
            <div class="luckysheet-modal-dialog-slider-title">
                <span>${title}</span>
                <span class="luckysheet-templates-close" title="${closeBtn}"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div>
            <div class="luckysheet-modal-dialog-slider-content luckysheet-templates-content">${content}</div>
        </div>
    `;

    $("body").append(html);
    $panel = $("#" + PANEL_ID);

    $panel.find(".luckysheet-templates-close").on("click", function () {
        $panel.hide();
    });

    $panel.find(".luckysheet-template-item").each(function () {
        const $item = $(this);
        const id = $item.data("id");
        const template = TEMPLATES.find((t) => t.id === id);
        if (!template) return;
        $item.find(".luckysheet-template-insert-btn").on("click", function (e) {
            e.stopPropagation();
            const data = template.getData();
            insertTemplateData(data, {
                applyBorder: !!template.applyBorder,
                firstRowBg: template.firstRowBg || null,
            });
            $panel.hide();
        });
    });

    return $panel;
}

export function showTemplatesPanel() {
    const $panel = ensurePanel();
    $panel.show();
}

export function getTemplates() {
    return TEMPLATES;
}
