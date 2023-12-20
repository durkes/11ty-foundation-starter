@echo off
SET /P PROJECT_NAME=Enter a new project name: 
SET DEV_DIR=projects
SET SRC_DIR=src
SET SETUP_FILES_PATH=..\..\setup_files

mkdir %DEV_DIR%\%PROJECT_NAME%
cd %DEV_DIR%\%PROJECT_NAME%

echo Initializing npm...
call npm init -y

echo Installing 11ty, Nunjucks, Foundation, and Dart Sass...
call npm install @11ty/eleventy nunjucks foundation-sites sass

echo Installing additional packages...
call npm install postcss autoprefixer postcss-cli --save-dev

echo Creating directory structure...
mkdir %SRC_DIR%
mkdir %SRC_DIR%\_data
mkdir %SRC_DIR%\_includes
mkdir %SRC_DIR%\_layouts
mkdir %SRC_DIR%\assets
mkdir %SRC_DIR%\css
mkdir %SRC_DIR%\pages

echo Copying setup files...
copy "%SETUP_FILES_PATH%\.eleventy.js" "."
copy "%SETUP_FILES_PATH%\postcss.config.js" "."
copy "%SETUP_FILES_PATH%\base.njk" "%SRC_DIR%\_layouts\"
copy "%SETUP_FILES_PATH%\index.njk" "%SRC_DIR%\"
copy "%SETUP_FILES_PATH%\foundation.njk" "%SRC_DIR%\pages\"
copy "%SETUP_FILES_PATH%\main.scss" "%SRC_DIR%\css\"
copy "%SETUP_FILES_PATH%\_settings.scss" "%SRC_DIR%\css\"
copy "%SETUP_FILES_PATH%\custom.scss" "%SRC_DIR%\css\"

echo Updating package.json with start and build scripts...
echo {"scripts": { "start": "eleventy --serve", "build": "eleventy", "clean": "if exist _site rmdir /s /q _site" }} > temp_scripts.json
call node -e "let pkg=require('./package.json'); let newScripts=require('./temp_scripts.json'); Object.assign(pkg.scripts, newScripts.scripts); require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
del temp_scripts.json

echo Done!
echo.
echo Project setup is complete.
echo Next steps:
echo 1. Navigate to the project directory:
echo    cd %DEV_DIR%\%PROJECT_NAME%
echo.
echo 2. Start the development server:
echo    npm start
echo.
echo 3. Build the project for production:
echo    npm run build
echo.
echo 4. Customize your project by editing the source files in the %SRC_DIR% directory, including layouts in the %SRC_DIR%\_layouts directory and data in the %SRC_DIR%\_data directory.
echo.
echo Happy coding!
pause
