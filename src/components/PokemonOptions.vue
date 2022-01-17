<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="$emit('selection', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IPokemon } from '@/interfaces/IPokemon'

export default defineComponent({
  name: 'PokemonPicture',
  props: {
    pokemons: {
      type: Array as () => IPokemon[],
      required: true
    }
  }
})

</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
