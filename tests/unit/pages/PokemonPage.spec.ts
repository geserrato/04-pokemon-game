import { shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage.vue'
import { IPokemon } from '@/interfaces/IPokemon'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('debe de hacer macth con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de llamar mixPokemonArray al montar el componente', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
    shallowMount(PokemonPage)
    expect(mixPokemonArraySpy).toHaveBeenCalled()
  })

  test('debe de hacer match con el snapshot cuando carga los pokemon', () => {
    const wrapper = shallowMount(PokemonPage, {
      data () {
        return {
          pokemonArr: pokemons as IPokemon[],
          pokemon: pokemons[2] as IPokemon,
          hasPokemon: true,
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de mostrar los componente de PokemonPicture y PokemonOptions', () => {
    const wrapper = shallowMount(PokemonPage, {
      data () {
        return {
          pokemonArr: pokemons as IPokemon[],
          pokemon: pokemons[2] as IPokemon,
          hasPokemon: true,
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    const PokemonPicture = wrapper.find('pokemon-picture-stub')
    const PokemonOptions = wrapper.find('pokemon-options-stub')

    expect(PokemonPicture.exists).toBeTruthy()
    expect(PokemonOptions.exists).toBeTruthy()
    expect(PokemonPicture.attributes('pokemonid')).toBe('3')
    expect(PokemonOptions.attributes('pokemons')).toBeTruthy()
  })

  test('pruebas en check answer', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data () {
        return {
          pokemonArr: pokemons as IPokemon[],
          pokemon: pokemons[1] as IPokemon,
          hasPokemon: true,
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    await wrapper.vm.checkAnswer(2)
    expect(wrapper.find('h2').exists).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.vm.showAnswer).toBeTruthy()
    expect(wrapper.vm.message).toBe(`Si es, ${pokemons[1].name}`)
  })
})
