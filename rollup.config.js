import resolve from 'rollup-plugin-node-resolve';

module.exports = {
    input: './js/index.js',
    output: {
        format: 'umd',
        file: './dist/index.js'
    },
    plugins: [
        resolve()
    ]
};