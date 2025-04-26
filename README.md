
# YouTube CLI Manager

A simple and powerful terminal-based CLI application to download, play, and manage YouTube videos.  
Built with **TypeScript** for a smooth and fast developer experience.

---

## 🚀 Features

- Download YouTube videos directly into your local machine.
- Play downloaded videos via terminal (Windows, MacOS, Linux supported).
- Delete videos through an easy-to-use CLI.
- Clean, modular TypeScript code structure.
- Powerful development workflow using `npm run` scripts.

---

## 📁 Project Structure


downloads/
  files/                # Downloaded video files
  downloads-path.json   # JSON file storing video paths

src/
  config/               # Environment variables and configs
  constants/            # Constant values like colors and texts
  modules/              # Core features: download, delete, open
  utils/                # Helper functions like prompts and JSON manipulation
  app.ts                # Main application logic
  index.ts              # Application entry point

.editorconfig           # Code formatting rules
.eslintrc.json          # ESLint config
.prettierrc.js          # Prettier config
tsconfig.json           # TypeScript config
package.json            # Project metadata and dependencies


---

## 📦 Available Scripts

You can manage the project easily with the following `npm run` scripts:

| Command | Description |
|:--------|:------------|
| `npm run start` | Run the app directly using `ts-node`. |
| `npm run dev` | Run the app in watch mode using `ts-node-dev`. |
| `npm run build` or `npm run compile` | Compile TypeScript files into JavaScript (`/build` folder). |
| `npm run clean` | Remove the build folder. |
| `npm run lint` | Lint the code using `gts`. |
| `npm run fix` | Auto-fix lint errors using `gts fix`. |
| `npm run prepare` | Compile TypeScript before publishing. |
| `npm run test` | Placeholder for future test scripts. |

---

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Ahmed-lashari/Youtube-CLI-Manager.git
```

2. Install dependencies:

```bash
sudo npm install @distube/ytdl-core
sudo npm install chalkColorText
sudo npm install inquirer
sudo npm install undici
```

3. Compile the project:

```bash
tsc # or npm run build
```
3. Start the project:
```bash
npm run start
```

4. For development (auto-reload):

```bash
npm run dev
```

---

## 🎮 Usage

Once running, follow the on-screen prompts to:
- Download a YouTube video
- Open and play downloaded videos
- Delete saved videos
- Exit the CLI

---

## 📜 Requirements

- Node.js 18+
- npm 9+
- TypeScript 5+
- Windows, macOS, or Linux (for playing videos)

---

## 💬 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---