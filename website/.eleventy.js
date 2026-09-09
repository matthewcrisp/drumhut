'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', name), 'utf8').replace(/^\uFEFF/, ''));
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
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

  eleventyConfig.addPassthroughCopy({ '../assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ '../_CNAME': 'CNAME' });

  eleventyConfig.addGlobalData('site', () => ({ title: 'The Drum Hut' }));
  eleventyConfig.addGlobalData('navigation', () => readJson('navigation.json'));
  eleventyConfig.addGlobalData('djembes', () => readJson('djembes.json'));
  eleventyConfig.addGlobalData('dunun', () => readJson('dunun.json'));
  eleventyConfig.addGlobalData('accessories', () => readJson('accessories.json'));
  eleventyConfig.addGlobalData('demos', () => readJson('demos.json'));

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
          permalink: `${product.filename}.html`
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
