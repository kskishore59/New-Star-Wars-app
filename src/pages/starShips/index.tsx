import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFilms, fetchStarShips } from "../../store/rootSlice";
import { AppThunkDispatch, RootState } from "../../store/store";
import SpeciesMoviesCard from "../species/SpeciesMovies";

type Props = {};

const StarShipFullInfo = (props: Props) => {
	const params = useParams();
	const dispatch = useDispatch<AppThunkDispatch>();
	const starships = useSelector((state: RootState) => state.starShips);
	const filmsInfo = useSelector((state: RootState) => state.films);

	const starShipInfo = starships?.find(
		(each) => each.url === `https://swapi.dev/api/starships/${params.id}/`,
	);
	const starShipFilms = filmsInfo.filter((each) =>
		starShipInfo?.films.includes(each.url),
	);

	useEffect(() => {
		const fetchNewStarShip = () => {
			if (starShipInfo === undefined) {
				const starShipArray = [`${params.id}`];
				dispatch(fetchStarShips(starShipArray));
			}
		};

		const fetchNewFilms = () => {
			console.log(filmsInfo);
			if (filmsInfo.length === 0) {
				dispatch(fetchFilms());
			}
		};
		fetchNewFilms();
		fetchNewStarShip();
	}, []);

	return (
		<div className="rounded w-full overflow-hidden transition-all shadow-lg  translate-x-px flex flex-col align-items-center p-5">
			<div>
				STARSHIP :{" "}
				<span className="font-bold text-xl">{starShipInfo?.name}</span>
			</div>
			<div className="flex-col justify-around text-left w-full h-full ml-20 mt-10">
				<h1 className="pt-2 ">MLGT : {starShipInfo?.MGLT}</h1>
				<h1 className="pt-2 ">Passengers : {starShipInfo?.passengers}</h1>
				<h1 className="pt-2 ">Model : {starShipInfo?.model}</h1>
				<h1 className="pt-2 ">Consumables : {starShipInfo?.consumables}</h1>
				<h1 className="pt-2 ">
					Cargo Capacity : {starShipInfo?.cargo_capacity}
				</h1>
				<h1 className="pt-2 ">Edited : {starShipInfo?.edited}</h1>
				<h1 className="pt-2 ">Manufacturer : {starShipInfo?.manufacturer}</h1>
				<h1 className="pt-2 ">Length : {starShipInfo?.length}</h1>
				<h1 className="pt-2 ">
					Starship Class : {starShipInfo?.starship_class}
				</h1>
				<h1 className="pt-2 ">
					Films :
					{starShipFilms.map((each) => (
						<SpeciesMoviesCard key={each.url} details={each} />
					))}
				</h1>
			</div>
		</div>
	);
};

export default StarShipFullInfo;
