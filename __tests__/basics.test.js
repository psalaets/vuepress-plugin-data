const createPlugin = require('../index');

describe('plugin', () => {
  test('identifies itself', () => {
    const instance = createPlugin({
      data: []
    });

    expect(instance.name).toBe('vuepress-plugin-data');
  });
});
