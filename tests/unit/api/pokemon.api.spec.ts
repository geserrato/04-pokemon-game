import pokemonApi from '@/api/pokemonApi'

describe('pokemonApi', () => {
  test('axios debe estar confuigurado con el api de pokemon', () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      'https://pokeapi.co/api/v2/pokemon'
    )
  })
})
