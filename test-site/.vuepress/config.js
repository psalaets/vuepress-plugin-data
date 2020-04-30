module.exports = {
  plugins: [
    [require('../../index'), {
      data: [
        {
          key: 'count',
          value: 4
        },
        {
          key: 'position',
          value: () => ({
            x: 5,
            y: 10
          })
        },
        {
          key: 'items',
          value() {
            return Promise.resolve([
              {
                id: 1,
                name: 'chair'
              },
              {
                id: 2,
                name: 'bed'
              }
            ]);
          }
        }
      ]
    }]
  ]
};
