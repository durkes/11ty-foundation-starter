const sass = require('sass');
const htmlmin = require('html-minifier').minify;
const fs = require('fs');
const execSync = require('child_process').execSync;

// ANSI color functions
const color = {
    red: msg => `\x1b[31m${msg}\x1b[0m`,
    green: msg => `\x1b[32m${msg}\x1b[0m`,
    yellow: msg => `\x1b[33m${msg}\x1b[0m`,
    blue: msg => `\x1b[34m${msg}\x1b[0m`,
    magenta: msg => `\x1b[35m${msg}\x1b[0m`,
    cyan: msg => `\x1b[36m${msg}\x1b[0m`
};

let isBuild = false;
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css/**/*.css');
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addWatchTarget('./src/css/**/*.scss');
    eleventyConfig.addWatchTarget('./src/js/**/*.js');

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (isBuild && outputPath && outputPath.endsWith('.html')) {
            console.log('Minifying', outputPath);

            let minified = htmlmin(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }

        return content;
    });

    eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
        isBuild = runMode === 'build';

        if (isBuild) {
            console.log(color.cyan('Deleting last build to remove any extra files'));
            execSync('npm run clean');
        }

        if (didDirChange('./src/js')) {
            console.log(color.cyan('Processing src/js'));
            execSync('npx rollup -c');
        }

        if (didDirChange('./src/css')) {
            console.log(color.cyan('Processing src/css'));

            const result = sass.renderSync({ file: 'src/css/main.scss', outputStyle: isBuild ? 'compressed' : 'expanded' });
            fs.mkdirSync('./_site/css', { recursive: true });
            fs.writeFileSync('./_site/css/main.css', result.css);

            if (isBuild) {
                execSync('npx postcss ./_site/css/main.css --use autoprefixer --no-map -o ./_site/css/main.css');
            }
        }
    });

    eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
        if (isBuild) {
            console.log(color.yellow('[config] dir:'), dir);
        }
    });

    return {
        dir: {
            input: 'src',
            //output: '_site',
            layouts: '_layouts'
        }
    };
};

const watchStates = {};
function didDirChange(directory) {
    if (isBuild) {
        // prevent watcher and always update on build
        return true;
    }

    // first call for this directory?
    if (!watchStates[directory]) {
        watchStates[directory] = { hasChanged: true, watcher: null };

        // set up watcher
        watchStates[directory].watcher = fs.watch(directory, { recursive: true }, (eventType, filename) => {
            if (filename) {
                console.log(`Change detected in ${directory}: ${filename}`);
                watchStates[directory].hasChanged = true;
            }
        });
    }

    if (watchStates[directory].hasChanged) {
        watchStates[directory].hasChanged = false;
        return true;
    } else {
        return false;
    }
}
