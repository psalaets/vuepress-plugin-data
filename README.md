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

Specify the data as an array of key/value pairs in the plugin options.

```js
// .vuepress/config.js
module.exports  {
  plugins: [
    [require('vuepress-plugin-data'), {
      data: [
        {
          key: 'count',
          // can be static value
          value: 5
        },
        {
          key: 'rando',
          // can be function
          value() {
            return Math.random();
          }
        },
        {
          key: 'speakers',
          // can be function that returns Promise
          value() {
            return axios.get('https://example.org/api/speakers')
              .then(response => response.data);
          }
        },
        {
          key: 'cities',
          // can be async function
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

Data is exposed using a [global mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin):

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

### 2b. Access data in a component

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

- Because the data is part of the js, all data will be eagerly loaded by your site.

## License

MIT
