# Eleventy + Foundation Project Starter
 Eleventy + Foundation Starter: A static site generator setup using Eleventy for its simple, fast static site generation and Foundation for a flexible, customizable front-end.

## Prerequisites

The setup batch script is for Windows. Before you begin, ensure you have installed Node.js and npm on your system.

## Setup

1. Clone this repository to your local machine
2. Open a command prompt or terminal
3. Navigate to the cloned repository's directory
4. Run the setup script:
```
./setup.bat
```

## Development

After setting up the project, you can start the development server from inside the project directory:

```
cd projects/example
npm start
```

This command starts a local server and watches for file changes with live reloading.

## Building the Project

To build the project for production, run:
```
npm run build
```

This command compiles the site into static files in the `_site` directory.

## Customization

Edit the source files in the `src` directory to customize your project:

- Modify layouts in the `_layouts` directory
- Add or change styles in the `css` directory
- Update or add page content in the `pages` directory

## Future Compatibility

This project uses the latest versions of npm packages. While this ensures access to the newest features, it can lead to future compatibility issues.

- In case of build failures or compatibility issues with new projects, you may need to adjust the setup files to use specific, older package versions
- Refer to the `package-lock.json` in the example project for a snapshot of working versions
- If this repo needs updated for this reason, please open an issue 🙏🤝
