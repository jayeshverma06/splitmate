# SplitMate

SplitMate is a lightweight, mobile-first web app for creating and managing shared bills. It helps users add a bill, choose participants, assign a split method, review the total, and save recent bills in the browser.

## Features

- Create a new bill with a name and total amount
- Add people involved in the split
- Choose split methods such as equal share, exact amounts, percentages, or share-based allocation
- Review the bill breakdown before saving
- Store draft and bill data locally in the browser using `localStorage`
- View recent bills on the home screen
- Responsive layout designed for mobile use

## Tech Stack

- HTML
- CSS
- JavaScript
- Local browser storage (no backend required)

## Project Structure

```text
splitmate/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── bill.js
│   ├── history.js
│   ├── navbar.js
│   ├── people.js
│   ├── review.js
│   └── storage.js
├── pages/
│   ├── bill-details.html
│   ├── new-bill.html
│   ├── people.html
│   ├── profile.html
│   └── review.html
├── assets/
└── README.md
```

## Getting Started

Because this is a static frontend app, you do not need a build step or package installation.

### Option 1: Open directly

- Open `index.html` in a browser.

### Option 2: Run a local web server

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Usage

1. Open the app homepage.
2. Start a new bill from the home screen.
3. Enter the bill name and total amount.
4. Add participants for the split.
5. Choose how the total should be divided.
6. Review the bill and confirm it.
7. The saved bill appears in the recent bills list.

## Notes

- Data persists in the browser using localStorage.
- This app is designed as a front-end prototype and does not connect to a server or database.
- Some buttons and actions are present as UI placeholders for future functionality.

## License

This project does not include a specific license file. If you plan to distribute or reuse it, add a license that matches your intended usage.
