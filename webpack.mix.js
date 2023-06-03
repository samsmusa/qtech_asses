const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("qtech/templates/assets/js/src/index.js", "qtech/static/js")
  .postCss("qtech/templates/assets/js/src/index.css", "qtech/static/css", [
    require("tailwindcss"),
  ]);
