# asdf

## number

<span data-test="count">{{data.count}}</span>

## object

<span data-test="x">{{data.position.x}}</span>
<span data-test="y">{{data.position.y}}</span>

## array

<div v-for="item in data.items" :key="item.id">
  <span :data-test="item.id">{{item.id}} - {{item.name}}</span>
</div>
