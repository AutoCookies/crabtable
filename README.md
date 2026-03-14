# CrabTable

An isomorphic full-stack framework for creating and editing spreadsheets, documents, and presentations across web and server. **Extensible. High-performance. Embeddable.**

**English** | [简体中文][readme-zh-link] | [日本語][readme-ja-link] | [Español][readme-es-link]

[Documentation][documentation-link] · [Showcase][playground-link] · [Blog][blog-link]

[![License][github-license-shield]][github-license-link]
[![CI][github-actions-shield]][github-actions-link]
[![Stars][github-stars-shield]][github-stars-link]
[![Contributors][github-contributors-shield]][github-contributors-link]
[![Forks][github-forks-shield]][github-forks-link]
[![Issues][github-issues-shield]][github-issues-link]
[![Coverage][codecov-shield]][codecov-link]
[![CodeFactor][codefactor-shield]][codefactor-link]

---

## Table of contents

- [Highlights](#-highlights)
- [Features](#-features)
  - [CrabTable Sheets](#-crabtable-sheets)
  - [CrabTable Docs](#-crabtable-docs-rc)
  - [CrabTable Slides](#-crabtable-slides-under-development)
- [Internationalization](#-internationalization)
- [Showcase](#-showcase)
- [Links](#-links)
- [Security](#-security)
- [Contribution](#-contribution)
- [Sponsors](#-sponsors)
- [License](#-license)

---

## 🌈 Highlights

- **Spreadsheets, documents, presentations** — one framework for all three.
- **Isomorphic** — runs in the browser and on Node.js with the same API.
- **Embeddable** — integrate into your app with presets and a facade API.
- **Feature-rich** — formulas, conditional formatting, data validation, filtering, collaborative editing, printing, import & export, and more.
- **Extensible** — plugin architecture for custom behavior and integrations.
- **Customizable** — themes and i18n support.
- **Performant** — canvas-based rendering engine; formula engine in Web Workers or server-side.
- **Integrated** — sheets, docs, and slides can interoperate and share one canvas.

## ✨ Features

### 📊 CrabTable Sheets

- **Core** — cells, rows, columns, worksheets, workbooks.
- **Formulas** — math, stats, logic, text, date/time, lookup, engineering, financial, and more.
- **Permissions** — restrict access to elements.
- **Number formatting** — format numbers by criteria.
- **Hyperlinks** — external URLs, email, in-sheet links.
- **Floating images** — place images anywhere on the sheet.
- **Find & replace** — search and replace text.
- **Filtering & sorting** — filter and sort by criteria.
- **Data validation** — control what can be entered in cells.
- **Conditional formatting** — format cells by rules.
- **Comments** — cell comments.
- **Cross-highlighting** — highlight related cells.
- **Zen Editor** — minimal, focused editing.
- **Pivot tables**[^1], **sparklines**[^1], **printing**[^1], **import/export XLSX**[^1], **charts**[^1], **collaborative editing**[^1], **editing history**[^1].

### 📝 CrabTable Docs (rc)

- **Core** — paragraphs, headings, lists, superscript, subscript.
- **Lists** — ordered, unordered, task lists.
- **Hyperlinks** — links to URLs, email, in-doc locations.
- **Floating images** — images with text layout.
- **Headers & footers** — document headers and footers.
- **Comments** — document comments.
- **Printing**[^1], **import/export DOCX**[^1], **collaborative editing**[^1].

### 📽️ CrabTable Slides (Under Development)

- **Core** — slides, shapes, text, images (in development).

## 🌐 Internationalization

CrabTable supports multiple locales, including:

`ca-ES` · `en-US` · `es-ES` · `fa-IR` · `ja-JP` · `ko-KR` · `ru-RU` · `sk-SK` · `vi-VN` · `zh-CN` · `zh-TW`

`zh-CN` and `en-US` are officially supported; others are community-maintained. See [Custom Locales](https://docs.crabtable.dev/guides/sheets/getting-started/i18n#custom-language-packs) and the [contribution guide](./CONTRIBUTING.md) to add or improve locales.

## 👾 Showcase

Examples and demos: [CrabTable Showcase](https://docs.crabtable.dev/showcase).

| **Spreadsheets** | **Multi-instance** | **Uniscript** |
| :---: | :---: | :---: |
| [Sheets][examples-link-0] | [Multi][examples-link-1] | [Uniscript][examples-link-2] |
| **Big data** | **Collaboration** | **Import & Export** |
| [Big data][examples-link-3] | [Collaboration][examples-link-4] | [Exchange][examples-link-6] |
| **Documents** | **Slides** | **Zen Editor** |
| [Docs][examples-link-8] | [Slides][examples-link-14] | [Zen][examples-link-15] |

## 🔗 Links

- [Latest preview (dev branch)](https://univer-preview.vercel.app/)
- [Official site](https://crabtable.dev)
- [Presets](https://github.com/AutoCookies/crabtable-presets)

## 🔒 Security

CrabTable follows security best practices and keeps dependencies updated. See the [Security Policy](./SECURITY.md).

## 🤝 Contribution

Contributions are welcome. Open [issues or feature requests](https://github.com/AutoCookies/crabtable/issues) and read the [contributing guide](./CONTRIBUTING.md) before submitting code.

## ❤️ Sponsors

CrabTable is supported by backers and sponsors. You can support the project via [Open Collective](https://opencollective.com/crabtable).

[![Sponsors][sponsor-badge-0]][sponsor-link-0]
[![Sponsors][sponsor-badge-1]][sponsor-link-1]
[![Sponsors][sponsor-badge-2]][sponsor-link-2]
[![Sponsors][sponsor-badge-3]][sponsor-link-3]
[![Sponsors][sponsor-badge-4]][sponsor-link-4]
[![Sponsors][sponsor-badge-5]][sponsor-link-5]
[![Sponsors][sponsor-badge-6]][sponsor-link-6]

[![Backers][backer-badge-0]][backer-link-0]
[![Backers][backer-badge-1]][backer-link-1]
[![Backers][backer-badge-2]][backer-link-2]
[![Backers][backer-badge-3]][backer-link-3]
[![Backers][backer-badge-4]][backer-link-4]
[![Backers][backer-badge-5]][backer-link-5]
[![Backers][backer-badge-6]][backer-link-6]

## 📄 License

Copyright © 2021–2025 DreamNum Co., Ltd. All rights reserved.

Licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) license.

---

[^1]: These features are provided by the non-OSS version of CrabTable (free for commercial use, with paid upgrade options).

<!-- Links -->
[github-license-shield]: https://img.shields.io/github/license/AutoCookies/crabtable?style=flat-square
[github-license-link]: ./LICENSE
[github-actions-shield]: https://img.shields.io/github/actions/workflow/status/AutoCookies/crabtable/build.yml?style=flat-square
[github-actions-link]: https://github.com/AutoCookies/crabtable/actions/workflows/build.yml
[github-stars-link]: https://github.com/AutoCookies/crabtable/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/AutoCookies/crabtable?style=flat-square
[github-contributors-link]: https://github.com/AutoCookies/crabtable/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/AutoCookies/crabtable?style=flat-square
[github-forks-link]: https://github.com/AutoCookies/crabtable/network/members
[github-forks-shield]: https://img.shields.io/github/forks/AutoCookies/crabtable?style=flat-square
[github-issues-link]: https://github.com/AutoCookies/crabtable/issues
[github-issues-shield]: https://img.shields.io/github/issues/AutoCookies/crabtable?style=flat-square
[codecov-shield]: https://img.shields.io/codecov/c/gh/AutoCookies/crabtable?token=aPfyW2pIMN&style=flat-square
[codecov-link]: https://codecov.io/gh/AutoCookies/crabtable
[codefactor-shield]: https://www.codefactor.io/repository/github/AutoCookies/crabtable/badge/dev?style=flat-square
[codefactor-link]: https://www.codefactor.io/repository/github/AutoCookies/crabtable/overview/dev

[readme-zh-link]: ./README-zh.md
[readme-ja-link]: ./README-ja.md
[readme-es-link]: ./README-es.md

[documentation-link]: https://docs.crabtable.dev/en-US
[playground-link]: https://docs.crabtable.dev/en-US/showcase
[blog-link]: https://docs.crabtable.dev/en-US/blog

[sponsor-link-0]: https://opencollective.com/crabtable/sponsor/0/website
[sponsor-link-1]: https://opencollective.com/crabtable/sponsor/1/website
[sponsor-link-2]: https://opencollective.com/crabtable/sponsor/2/website
[sponsor-link-3]: https://opencollective.com/crabtable/sponsor/3/website
[sponsor-link-4]: https://opencollective.com/crabtable/sponsor/4/website
[sponsor-link-5]: https://opencollective.com/crabtable/sponsor/5/website
[sponsor-link-6]: https://opencollective.com/crabtable/sponsor/6/website
[sponsor-badge-0]: https://opencollective.com/crabtable/sponsor/0/avatar.svg
[sponsor-badge-1]: https://opencollective.com/crabtable/sponsor/1/avatar.svg
[sponsor-badge-2]: https://opencollective.com/crabtable/sponsor/2/avatar.svg
[sponsor-badge-3]: https://opencollective.com/crabtable/sponsor/3/avatar.svg
[sponsor-badge-4]: https://opencollective.com/crabtable/sponsor/4/avatar.svg
[sponsor-badge-5]: https://opencollective.com/crabtable/sponsor/5/avatar.svg
[sponsor-badge-6]: https://opencollective.com/crabtable/sponsor/6/avatar.svg
[backer-link-0]: https://opencollective.com/crabtable/backer/0/website
[backer-link-1]: https://opencollective.com/crabtable/backer/1/website
[backer-link-2]: https://opencollective.com/crabtable/backer/2/website
[backer-link-3]: https://opencollective.com/crabtable/backer/3/website
[backer-link-4]: https://opencollective.com/crabtable/backer/4/website
[backer-link-5]: https://opencollective.com/crabtable/backer/5/website
[backer-link-6]: https://opencollective.com/crabtable/backer/6/website
[backer-badge-0]: https://opencollective.com/crabtable/backer/0/avatar.svg
[backer-badge-1]: https://opencollective.com/crabtable/backer/1/avatar.svg
[backer-badge-2]: https://opencollective.com/crabtable/backer/2/avatar.svg
[backer-badge-3]: https://opencollective.com/crabtable/backer/3/avatar.svg
[backer-badge-4]: https://opencollective.com/crabtable/backer/4/avatar.svg
[backer-badge-5]: https://opencollective.com/crabtable/backer/5/avatar.svg
[backer-badge-6]: https://opencollective.com/crabtable/backer/6/avatar.svg

[examples-link-0]: https://docs.crabtable.dev/showcase
[examples-link-1]: https://docs.crabtable.dev/showcase
[examples-link-2]: https://docs.crabtable.dev/showcase
[examples-link-3]: https://docs.crabtable.dev/showcase
[examples-link-4]: https://docs.crabtable.dev/showcase
[examples-link-6]: https://docs.crabtable.dev/showcase
[examples-link-8]: https://docs.crabtable.dev/showcase
[examples-link-14]: https://docs.crabtable.dev/showcase
[examples-link-15]: https://crabtable.dev/guides/sheet/features/zen-editor
