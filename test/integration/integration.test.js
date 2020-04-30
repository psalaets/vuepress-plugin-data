const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = path.resolve(__dirname, '../../test-site/.vuepress/dist/index.html');

describe('html from vuepress site using this plugin', () => {
  test('has the data', () => {
    const html = fs.readFileSync(htmlPath, {encoding: 'utf8'});
    const $ = cheerio.load(html);

    const count = $('[data-test="count"]').text();
    const x = $('[data-test="x"]').text();
    const y = $('[data-test="y"]').text();
    const item1 = $('[data-test="1"]').text();
    const item2 = $('[data-test="2"]').text();

    expect(count).toBe('4');
    expect(x).toBe('5');
    expect(y).toBe('10');
    expect(item1).toBe('1 - chair');
    expect(item2).toBe('2 - bed');
  });
});
