import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import swapi from "../services/apis/swapi";
import { differenceWith, isEqual } from "lodash";
import { Character, Films, initialState } from "./types";

export const fetchFilms = createAsyncThunk("allFilms", async (thunkAPI) => {
	const response = await swapi.getFilms();
	return response;
});

export const fetchCharacters = createAsyncThunk(
	"allCharacters",
	async (characters: string[], thunkAPI) => {
		const response = await swapi.getCharacters(characters);
		return response;
	},
);

export const fetchDetailedCharacter = createAsyncThunk(
	"detailedCharacter",
	async (character: string, thunkAPI) => {
		const response = await swapi.getPeople(character);
		return response;
	},
);

export const fetchStarShips = createAsyncThunk(
	"starShips",
	async (starShip: string[], thunkAPI) => {
		const response = await swapi.getStarShips(starShip);
		return response;
	},
);

export const fetchSpecies = createAsyncThunk(
	"species",
	async (species: string[], thunkAPI) => {
		const response = await swapi.getSpecies(species);
		return response;
	},
);

export const rootSlice = createSlice({
	name: "films",
	initialState,
	reducers: {
		updateFilmDetails: (state: Films, action: PayloadAction<Films | any>) => {
			state.films = {
				...state.films,
				...action.payload,
			};
		},
		updateCharactersList: (state: any, action: PayloadAction<any>) => {
			state.characters = {
				...state.characters,
				...action.payload,
			};
		},
		updateFilmLoader: (state: any, action: PayloadAction<boolean>) => {
			state.loadFilms = action.payload;
		},
		updateCharacterLoader: (state: any, action: PayloadAction<boolean>) => {
			state.loadCharacters = action.payload;
		},
		updatePeopleLoader: (state: any, action: PayloadAction<boolean>) => {
			state.loadPeople = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
			.addCase(fetchFilms.fulfilled, (state, action: PayloadAction<any>) => {
				// Add user to the state array
				if (state.films.length >= 0) {
					const difference = differenceWith(
						action.payload,
						state.films,
						isEqual,
					);
					state.films = [...state.films, ...difference];
				} else {
					state.films = [...action.payload];
				}

				state.loadFilms = false;
			})
			.addCase(fetchFilms.pending, (state) => {
				state.loadFilms = true;
			})
			.addCase(
				fetchCharacters.fulfilled,
				(state, action: PayloadAction<any>) => {
					//const char = state.characters.filter((value:Character) => !action.payload.includes(value))
					//console.log(char)
					console.log(action.payload);
					if (state.characters.length !== 0) {
						const characterDifference = differenceWith(
							action.payload,
							state.characters,
							isEqual,
						);
						state.characters = [...state.characters, ...characterDifference];
					} else {
						state.characters = action.payload;
					}

					state.loadCharacters = false;
				},
			)
			.addCase(fetchCharacters.pending, (state) => {
				state.loadCharacters = true;
			})
			.addCase(
				fetchDetailedCharacter.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.people = action.payload;
					state.loadPeople = false;
				},
			)
			.addCase(fetchDetailedCharacter.pending, (state) => {
				state.loadPeople = true;
			})
			.addCase(
				fetchStarShips.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (state.starShips.length !== 0) {
						const starShipIncludes = differenceWith(
							action.payload,
							state.starShips,
							isEqual,
						);

						state.starShips = [...state.starShips, ...starShipIncludes];
					} else {
						state.starShips = action.payload;
					}

					state.loadStarShips = false;
				},
			)
			.addCase(fetchSpecies.fulfilled, (state, action: PayloadAction<any>) => {
				if (state.species.length !== 0) {
					const speciesIncludes = differenceWith(
						action.payload,
						state.species,
						isEqual,
					);
					state.species = [...state.species, ...speciesIncludes];
				} else {
					state.species = action.payload;
				}

				state.loadSpecies = false;
			});
	},
});

export const {
	updateFilmDetails,
	updateCharactersList,
	updateFilmLoader,
	updateCharacterLoader,
	updatePeopleLoader,
} = rootSlice.actions;
export default rootSlice.reducer;
