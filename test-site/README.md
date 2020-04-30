# asdf

## number

<span data-test="count">{{vppData.count}}</span>

## object

<span data-test="x">{{vppData.position.x}}</span>
<span data-test="y">{{vppData.position.y}}</span>

## array

<div v-for="item in vppData.items" :key="item.id">
  <span :data-test="item.id">{{item.id}} - {{item.name}}</span>
</div>
