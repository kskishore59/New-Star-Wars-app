import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchCharacters,
	fetchSpecies,
	fetchStarShips,
} from "../../store/rootSlice";
import { AppThunkDispatch, RootState } from "../../store/store";
import { Character } from "../../store/types";
import SpeciesName from "../species/SpeciesName";
import StarShipsName from "../starShips/StarShipsName";

type Props = {};

const People = (props: Props) => {
	let params = useParams();
	const dispatch = useDispatch<AppThunkDispatch>();
	const characters = useSelector((state: RootState) => state.characters);
	const starShips = useSelector((state: RootState) => state.starShips);
	const species = useSelector((state: RootState) => state.species);
	const loadingSpecies = useSelector((state: RootState) => state.loadSpecies);
	const loadingStarShips = useSelector(
		(state: RootState) => state.loadStarShips,
	);

	const character = characters.find((person: Character) => {
		return person.url === `https://swapi.dev/api/people/${params.id}/`;
	});

	const getData = () => {
		const starShipId = character?.starships.map((each) => {
			const id = each.split("/");
			return id[id.length - 2];
		});

		const speciesArray = character?.species.map((each) => {
			const id = each.split("/");
			return id[id.length - 2];
		});
		console.log(speciesArray);

		const starShipsInfo = starShips.filter((value) =>
			character?.starships.includes(value.url),
		);

		const speciesInfo = species.filter((value) =>
			character?.species.includes(value.url),
		);

		console.log(starShipsInfo);
		if (starShipId && starShipsInfo.length === 0) {
			dispatch(fetchStarShips(starShipId));
		}

		if (speciesArray && speciesInfo.length === 0) {
			dispatch(fetchSpecies(speciesArray));
		}
	};

	useEffect(() => {
		if (character === undefined) {
			const characterArray = [`${params.id}`];
			dispatch(fetchCharacters(characterArray));
		} else {
			getData();
		}
	}, [character]);

	const renderSpecies = () => {
		const speciesInfo = species.filter((value) =>
			character?.species.includes(value.url),
		);
		return (
			<>
				{speciesInfo.length === 0 ? (
					""
				) : (
					<div>
						Species :
						<ul>
							{speciesInfo.map((each) => (
								<SpeciesName details={each} />
							))}
						</ul>
					</div>
				)}
			</>
		);
	};

	const renderStarShips = () => {
		const starShipsInfo = starShips.filter((value) =>
			character?.starships.includes(value.url),
		);
		return (
			<>
				{starShipsInfo.length === 0 ? (
					""
				) : (
					<div>
						<h1>Starships : </h1>
						{starShipsInfo.map((each) => (
							<StarShipsName details={each} />
						))}
					</div>
				)}
			</>
		);
	};

	return (
		<>
			<div className="Card rounded w-full overflow-hidden transition-all cursor-pointer  translate-x-px flex flex-col align-items-center justify-items-start p-5">
				<h1 className="font-bold text-2xl">{character?.name}</h1>
				<div className="text-left ml-20 mt-10">
					<h1 className="text-lg">Birth Year : {character?.birth_year}</h1>
					<h1 className="text-lg">Gender : {character?.gender}</h1>
					<h1 className="text-lg">Hair Color : {character?.hari_color}</h1>
					<h1 className="text-lg">Eye Color : {character?.eye_color}</h1>
					<h1 className="text-lg">Height : {character?.height}</h1>
					<h1 className="text-lg">Created : {character?.created}</h1>
					<h1 className="text-lg">Mass : {character?.mass}</h1>
					<div></div>
					<div>
						{loadingStarShips ? (
							<div className="flex h-9 items-center justify-center">
								<div
									className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
									role="status"
								>
									<span className="visually-hidden"></span>
								</div>
							</div>
						) : (
							renderStarShips()
						)}
						{loadingSpecies ? (
							<div className="flex h-full items-center justify-center">
								<div
									className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
									role="status"
								>
									<span className="visually-hidden"></span>
								</div>
							</div>
						) : (
							renderSpecies()
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default People;
