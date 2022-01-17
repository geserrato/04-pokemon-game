<template>
  <div v-if="hasPokemon">
    <h1>Quien es este Pokémon</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)"/>

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

// Helpers
import getPokemonOptions from '@/helpers/getPokemonOptions.ts'

// Interface
import { IPokemon } from '@/interfaces/IPokemon'

export default defineComponent({
  name: 'PokemonPage',
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data () {
    return {
      pokemonArr: [] as IPokemon[],
      pokemon: {} as IPokemon,
      hasPokemon: false,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    mixPokemonArray: async function () {
      this.hasPokemon = false
      this.pokemonArr = await getPokemonOptions()
      const rndInit = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInit]
      this.hasPokemon = true
    },
    checkAnswer (selectedId: number) {
      this.showPokemon = true
      this.showAnswer = true

      if (selectedId === this.pokemon.id) {
        this.message = `Si es, ${this.pokemon.name}`
      } else {
        this.message = `Noo, es ${this.pokemon.name}`
      }
    },
    newGame () {
      this.showPokemon = false
      this.showAnswer = false
      this.hasPokemon = false
      this.message = ''
      this.mixPokemonArray()
    }
  },
  mounted () {
    this.mixPokemonArray()
  }
})
</script>
