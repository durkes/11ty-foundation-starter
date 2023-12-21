const sass = require('sass');
const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/**/*.css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addWatchTarget("./src/css/**/*.scss");
    eleventyConfig.addWatchTarget("./src/js/**/*.js");

    eleventyConfig.on('beforeBuild', () => {
        execSync('npm run clean'); // delete last build to remove extra files
        execSync('npx rollup -c'); // build javascript

        const result = sass.renderSync({ file: 'src/css/main.scss', outputStyle: 'compressed' });
        fs.mkdirSync('./_site/css', { recursive: true });
        fs.writeFileSync('./_site/css/main.css', result.css);

        execSync('npx postcss ./_site/css/main.css --use autoprefixer --no-map -o ./_site/css/main.css');
    });

    return {
        dir: {
            input: 'src',
            //output: '_site',
            layouts: "_layouts"
        }
    };
};
