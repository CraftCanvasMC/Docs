# Docs [![Discord](https://img.shields.io/discord/1168986665038127205.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/ySfW4QZsRV) [![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This repository is for documentation under CanvasMC's organization.

## 🚀 Getting Started

Let's get these docs running on your local machine.
To get started, you'll need to have [Bun](https://bun.sh/) installed.

**Assuming you're on macOS or Linux, run the following command in your terminal:**

```bash
curl -fsSL https://bun.com/install | bash
```

**For Windows users, you can run this in your PowerShell instead:**

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```


Once you have Bun installed, you can make any changes to our docs directly in the `src/content/docs/` directory.
To see your changes live, run the following command in your terminal:

```bash
bun run dev
```

This will start a local development server at `http://localhost:3000` where you can view your changes in real time.

## 🏕 Building

To build the documentation for production, run the following command in your terminal:

```bash
bun run build
```

This will create a production-ready build of the documentation in the `dist/` directory that
can be hosted on any static hosting server.

## 📚 License

The documentation is licensed under the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.html).

You are free to use, modify, and distribute the documentation as long as you comply with the terms of the license.
