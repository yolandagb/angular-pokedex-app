export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  imgUrl: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface StatRange {
  min: number;
  max: number;
}
export interface pokemonMeasurements {
  label: string, value: number, unit: string,

}
export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{
    language: { name: string };
    flavor_text: string;
  }>;
}