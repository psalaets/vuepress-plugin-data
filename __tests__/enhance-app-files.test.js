const createPlugin = require('../index');

describe('enhanceAppFiles()', () => {
  test('number value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value: 50
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('boolean value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'good',
          value: true
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('string value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'name',
          value: 'blah'
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('array value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'numbers',
          value: [1, 2, 3]
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('object value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'order',
          value: {
            size: 'M',
            color: 'red'
          }
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('resolved promise value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value: Promise.resolve(40)
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('function value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value() {
            return 100;
          }
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('function that returns resolved promise value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value() {
            return Promise.resolve(99);
          }
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('async function value', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          async value() {
            return 30;
          }
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('many values', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value: 20
        },
        {
          key: 'name',
          value() {
            return 'foo';
          }
        },
        {
          key: 'last',
          value() {
            return Promise.resolve('2020-04-26');
          }
        },
        {
          key: 'badges',
          async value() {
            return [
              {
                name: 'Gold'
              },
              {
                name: 'Silver'
              }
            ];
          }
        }
      ]
    });

    const result = await instance.enhanceAppFiles();

    expect(result).toMatchSnapshot();
  });

  test('value() throws Error', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value() {
            throw new Error('oops');
          }
        }
      ]
    });

    expect.assertions(1);
    await instance.enhanceAppFiles()
      .catch(error => {
        expect(error.message).toContain('Failed to load data');
      });
  });

  test('value() returns rejected Promise', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value() {
            return Promise.reject(new Error('async oops'));
          }
        }
      ]
    });

    expect.assertions(1);
    await instance.enhanceAppFiles()
      .catch(error => {
        expect(error.message).toContain('Failed to load data');
      });
  });

  test('value is a rejected Promise', async () => {
    const instance = createPlugin({
      data: [
        {
          key: 'age',
          value: Promise.reject(new Error('less likely'))
        }
      ]
    });

    expect.assertions(1);
    await instance.enhanceAppFiles()
      .catch(error => {
        expect(error.message).toContain('Failed to load data');
      });
  });
});
