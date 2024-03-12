import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const isProdBuild = process.env.BUILD_ENV === 'production';

export default {
    input: 'src/js/_bundle.js',
    output: {
        file: '_site/js/bundle.js',
        format: 'iife', // 'iife' or 'esm' depending on your requirement
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled'
        }),
        isProdBuild && terser(), // minification
    ]
};
