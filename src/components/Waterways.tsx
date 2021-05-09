import {TerrainType} from "../tools/TerrainType";
import {MapData} from "../tools/map/MapData";

interface WaterwaysProps {
    map: MapData,
    setMap: (map: MapData) => void;
}

export default function Waterways(props: WaterwaysProps) {
    const {map, setMap} = props;
    const apply = () => setMap(map.withModifications((newMap) => {
        for (let x = 0; x < newMap.width; x += 1) {
            for (let y = 0; y < newMap.height; y += 1) {
                const newTile = newMap.getTile(x, y);
                const isLand = (y % 2 === 0) || (y === newMap.height - 1) || ((x === newMap.width - 1) && newMap.flat);
                if (isLand) {
                    if (newTile.isWater()) {
                        newTile.terrainType = TerrainType.MOUNTAINS;
                    }
                } else {
                    newTile.terrainType = TerrainType.WATER;
                }
            }
        }
    }));
    return (
        <button onClick={apply}>Convert to Waterways</button>
    );
}