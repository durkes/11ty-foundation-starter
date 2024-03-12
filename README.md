# Eleventy + Foundation Starter

A comprehensive setup for static site development using [Eleventy](https://www.11ty.dev/) (11ty) for easy templating and fast builds, and [Foundation](https://get.foundation/) for a responsive, customizable front-end. Includes SCSS preprocessing, CSS autoprefixer, JavaScript bundling and transpilation, and complete code minification.

## Prerequisites

The setup batch script runs on Windows (if you're using Mac/Linux, you can skip this step and just customize the example project in this repo). Before you begin, ensure you have installed Node.js and npm on your system.

## Setup

1. Clone this repository to your local machine.
2. Open a command prompt or terminal.
3. Navigate to the cloned repository's directory.
4. Run the setup script:

```
./setup.bat
```

## Development Mode

After setting up the project, you can start the development server from inside the project directory:

```
cd projects/example
npm start
```

This command starts a local server and watches for file changes with live reloading. While in this mode, CSS, JavaScript, and HTML files are **not minified**, allowing for easier debugging and faster reloads.

## Production Build

To build the project for production, run:
```
npm run build
```

This command compiles the site into static files in the `_site` directory. During this build process, CSS, JavaScript, and HTML files are **minified** for faster site download speeds.

## Customization

Edit the source files in the `src` directory to customize your project:

- Modify layouts in the `_layouts` directory.
- Add or change styles in the `css` directory.
- For JavaScript, use the `js` directory. Edit `_bundle.js` to include custom scripts or import additional modules. If you're not using JavaScript, you can comment out unnecessary imports.
- Update or add page content in the `pages` directory.

## Future Compatibility

This project uses the latest versions of npm packages. While this ensures access to the newest features, it can lead to future compatibility issues.

- In case of build failures or compatibility issues with new projects, you may need to adjust the setup files to use specific, older package versions.
- Refer to the `package-lock.json` in the example project for a snapshot of working versions.
- If this repo needs updated for this reason, please open an issue.
