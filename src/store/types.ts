export interface Film {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: string;
	edited: string;
	url: string;
}

export interface Character {
	name: string;
	gender: string;
	height: string;
	films: string[];
	birth_year: string;
	eye_color: string;
	homeworld: string;
	hari_color: string;
	mass: string;
	url: string;
	vehicles: string[];
	species: string[];
	edited: string;
	created: string;
	starships: string[];
}

export interface People {
	birth_year: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	created: string;
	edited: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}

export interface StarShip {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	films: string[];
	pilots: [];
	starship_class: string;
	url: string;
}

export interface Vehicle {
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	pilots: [];
	films: string[];
	url: string;
	vehicle_class: string;
}

export interface Species {
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	skin_colors: string;
	hair_colors: string;
	eye_colors: string;
	average_lifespan: string;
	homeworld: null;
	language: string;
	people: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

export interface Films {
	films: Film[];
	characters: Character[];
	people: People[];
	starShips: StarShip[];
	vehicles: Vehicle[];
	species: Species[];
	loadFilms: boolean;
	loadCharacters: boolean;
	loadPeople: boolean;
	loadSpecies: boolean;
	loadStarShips: boolean;
}

export const initialState: Films = {
	films: [],
	characters: [],
	starShips: [],
	vehicles: [],
	people: [],
	species: [],
	loadFilms: true,
	loadCharacters: true,
	loadPeople: true,
	loadSpecies: true,
	loadStarShips: true,
};
