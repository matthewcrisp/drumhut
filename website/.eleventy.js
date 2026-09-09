'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', name), 'utf8').replace(/^\uFEFF/, ''));
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.on('eleventy.before', () => {
    const outputDirectory = path.join(__dirname, 'dist');
    if (fs.existsSync(outputDirectory)) {
      fs.readdirSync(outputDirectory)
        .filter((name) => name !== '.git')
        .forEach((name) => fs.rmSync(path.join(outputDirectory, name), { recursive: true, force: true }));
    }
  });
  eleventyConfig.addExtension('hbs', {
    outputFileExtension: 'html',
    compile: (template) => {
      const compiled = Handlebars.compile(template);
      return (data) => {
        if (data.product) {
          data = Object.assign({}, data, data.product.data, {
            filename: data.product.filename,
            data: data.product.data
          });
        }
        return compiled(data);
      };
    }
  });

  fs.readdirSync(path.join(__dirname, 'src', 'templates', 'partials'))
    .filter((name) => name.endsWith('.hbs'))
    .forEach((name) => {
      const partialName = path.basename(name, '.hbs');
      const partial = fs.readFileSync(path.join(__dirname, 'src', 'templates', 'partials', name), 'utf8');
      Handlebars.registerPartial(partialName, partial);
    });

  Handlebars.registerHelper('env', (name) => process.env[name] || '');

  // Keep the existing asset layout used by the Handlebars templates.
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/_CNAME': 'CNAME' });

  // These are installed packages, so copy the browser builds explicitly.
  // The templates and legacy plugins currently expect Bootstrap 3 and jQuery 2.
  eleventyConfig.addPassthroughCopy({
    'node_modules/jquery/dist/jquery.min.js': 'assets/js/jquery.min.js'
  });
  eleventyConfig.addPassthroughCopy({
    'node_modules/bootstrap/dist': 'assets'
  });

  eleventyConfig.addGlobalData('site', () => ({ title: 'The Drum Hut' }));
  eleventyConfig.addGlobalData('assets', '/assets');
  [
    ['djembes', 'product-djembe.hbs'],
    ['dunun', 'product-dunun.hbs'],
    ['accessories', 'product-accessory.hbs']
  ].forEach(([type, layout]) => {
    readJson(`${type}.json`).forEach((product) => {
      eleventyConfig.addTemplate(
        `products/${product.filename}.hbs`,
        '',
        Object.assign({}, product.data, {
          data: product.data,
          filename: product.filename,
          layout,
          permalink: `${product.filename}/index.html`
        })
      );
    });
  });

  return {
    dir: {
      input: 'src/templates/pages',
      includes: '../partials',
      layouts: '../layouts',
      data: '../../data',
      output: 'dist'
    },
    markdownTemplateEngine: false,
    templateFormats: ['hbs'],
    htmlTemplateEngine: 'hbs'
  };
};
