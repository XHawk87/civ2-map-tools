import {MapData} from "../tools/map/MapData";

interface FloodWithRiversProps {
    map: MapData,
    setMap: (map: MapData) => void;
}

export default function FloodWithRivers(props: FloodWithRiversProps) {
    const {map, setMap} = props;
    const apply = () => setMap(map.withModifications((newMap) => {
        for (let x = 0; x < newMap.width; x += 1) {
            for (let y = 0; y < newMap.height; y += 1) {
                const newTile = newMap.getTile(x, y);
                if (newTile.isLand()) {
                    newTile.river = true;
                }
            }
        }
    }));
    return (
        <button onClick={apply}>Flood with Rivers</button>
    );
}