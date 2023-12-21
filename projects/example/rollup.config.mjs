import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/js/main.js',
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
        terser(), // For minification
    ]
};
