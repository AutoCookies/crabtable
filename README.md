# Crab Table

Crab Table is an in-browser spreadsheet: Excel-like editing, formatting, formulas, and export—easy to embed and fully open source.

---

## Features

### File & data
- **Save** — Download workbook as JSON (**Ctrl+S** / Cmd+S).
- **Save As** — Save with a custom filename.
- **Import XLSX** — Open `.xlsx` files.
- **Export XLSX** — Export current workbook to Excel.
- **Export PDF** — Export to PDF.
- **Print** — Print the sheet.
- **Templates** — Start from templates (empty, invoice, OKR tracker, project tasks, timesheet, expense tracker, inventory, meeting minutes, content calendar, event schedule, client contacts, basic table).

### Editing
- **Undo / Redo** — Full history (Ctrl+Z / Ctrl+Y).
- **Copy, paste, cut** — Standard shortcuts (Ctrl+C, Ctrl+V, Ctrl+X).
- **Format painter** — Copy cell formatting.
- **Find and replace** — Search and replace in the workbook.

### Cell formatting
- **Number formats** — Currency, percentage, decimals, more formats.
- **Font** — Family, size, bold, italic, underline, strikethrough, text color.
- **Fill & border** — Cell background, borders, merge cells.
- **Alignment** — Horizontal/vertical align, wrap, text rotation.

### Insert & data tools
- **Images** — Insert images into cells.
- **Links** — Insert hyperlinks.
- **Charts** — Create charts from data.
- **Comments** — Add cell comments (postil).
- **Pivot table** — Build pivot tables.
- **Freeze** — Freeze rows or columns.
- **Sort & filter** — Sort and filter by column.
- **Conditional formatting** — Rules-based cell styling.
- **Data validation** — Dropdowns and validation rules.
- **Split column** — Split text in a column.
- **Screenshot** — Capture sheet as image.
- **Protection** — Worksheet protection.

### Formulas
- Built-in functions, remote formulas, and support for custom formulas.

### Sheets
- Multiple sheets, rename, reorder, add/delete. Sheet tabs at the bottom.

---

## Usage

### 1. Add assets

```html
<link rel="stylesheet" href="path/to/plugins/css/pluginsCss.css" />
<link rel="stylesheet" href="path/to/plugins/plugins.css" />
<link rel="stylesheet" href="path/to/css/luckysheet.css" />
<link rel="stylesheet" href="path/to/assets/iconfont/iconfont.css" />
<script src="path/to/plugins/js/plugin.js"></script>
<script src="path/to/luckysheet.umd.js"></script>
```

### 2. Container

```html
<div id="luckysheet" style="margin:0;padding:0;position:absolute;width:100%;height:100%;left:0;top:0;"></div>
```

### 3. Create the sheet

```javascript
var options = { container: 'luckysheet' };
luckysheet.create(options);
```

Optional: pass `data` (sheet data) or `title` in `options` to load existing content or set the workbook title.

---

## Development

- **Requirements:** Node.js (e.g. v16+).
- **Install:** `npm install` and `npm install gulp -g`.
- **Run dev:** `npm run dev`.
- **Build:** `npm run build`.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

[MIT](http://opensource.org/licenses/MIT)
