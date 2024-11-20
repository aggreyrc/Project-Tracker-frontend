module.exports = {
    presets: [
      '@babel/preset-env', // Transpiles ES features to older versions
      '@babel/preset-react', // If you're using React
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // This plugin ensures modules are transformed to CommonJS
    ],
  };
  