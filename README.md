# vuepress-plugin-data

Inject external data into a VuePress site.

## Install

```bash
npm install -D vuepress-plugin-data

# or

yarn add -D vuepress-plugin-data
```

## Usage

### 1. Specify the data

Specify the data in the plugin options as an array of key/value pairs.

The value can be any of

- json serializable value
- function that returns a json serializable value
- function that returns a Promise that resolves to a json serializable value
- async function that returns a json serializable value
- Promise that resolves to a json serializable value

```js
// .vuepress/config.js
module.exports  {
  plugins: [
    [require('vuepress-plugin-data'), {
      data: [
        {
          key: 'count',
          // static value
          value: 5
        },
        {
          key: 'rando',
          // function
          value() {
            return Math.random();
          }
        },
        {
          key: 'speakers',
          // function that returns Promise
          value() {
            return axios.get('https://example.org/api/speakers')
              .then(response => response.data);
          }
        },
        {
          key: 'cities',
          // async function
          async value() {
            return await axios.get('https://example.org/api/cities')
              .then(response => response.data);
          }
        }
      ]
    }]
  ]
}
```

### 2. Access the data

Data is injected using a [global mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin):

```js
Vue.mixin({
  data() {
    return {
      data: {
        // Your data will be in here by the keys you specified
      }
    };
  }
});
```

This means all pages and components can access the data directly.

### 2a. Access data in a page

```text
---
title: My Site
---

- {{data.count}}
- {{data.rando}}

<ul>
  <li v-for="city in data.cities" :key="city.id">
    {{city.name}}
  </li>
</ul>
```

### 2b. Access data in a Vue component

```js
export default {
  computed: {
    speakerCount() {
      return this.data.speakers.length;
    }
  }
};
```

## Caveats

- Because the data is in the initial js bundle, all data is eagerly loaded by your site.

## License

MIT
