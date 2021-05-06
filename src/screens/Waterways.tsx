import React, {ChangeEvent, LegacyRef, useRef} from "react";
import {Link} from "react-router-dom";
import {FileDrop} from "react-file-drop";
import ReactDOM from "react-dom";
import MapRenderer from "../components/MapRenderer";
import {MapData} from "../tools/MapData";
import {MapTile} from "../tools/MapTile";
import {TerrainType} from "../tools/TerrainType";
import MapSaver from "../components/MapSaver";

export default function Waterways() {
    const fileInputRef: LegacyRef<HTMLInputElement> = useRef(null);
    const loadFile = (file?: File | null | undefined) => {
        if (!file) return;
        file.arrayBuffer().then(arrayBuffer => {
            const fileName = file.name.replace(/\..*?^/, "") + "-WATERWAYS.MP";
            const map = new MapData(arrayBuffer, fileName);
            for (let x = 0; x < map.width; x += 1) {
                for (let y = 0; y < map.height; y += 1) {
                    const tile = map.getTile(x, y) as MapTile;
                    const isLand = (y % 2 === 0) || (y === map.height - 1) || ((x === map.width - 1) && map.flat);
                    if (isLand) {
                        if (tile.isWater()) {
                            tile.terrainType = TerrainType.MOUNTAINS;
                        }
                    } else {
                        tile.terrainType = TerrainType.WATER;
                    }
                }
            }
            ReactDOM.render(<MapRenderer mapData={map}/>,
                document.getElementById('map-renderer-container'));
            ReactDOM.render(<MapSaver mapData={map}/>,
                document.getElementById('map-saver-container'));
        });
    };
    const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        loadFile(event.target.files?.item(0));
    };
    const onFrameDrop = (event: DragEvent) => {
        loadFile(event.dataTransfer?.files.item(0));
    };
    const onTargetClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className="App-header">
            <Link to="/">Home</Link>
            <h2>Convert Map to Waterways</h2>
            <FileDrop onFrameDrop={onFrameDrop} onTargetClick={onTargetClick}>
                <p>Drag and drop or select a Civ 2 Map file</p>
                <div>
                    <input onChange={onFileInputChange} ref={fileInputRef} type="file" className="file-drop-select"/>
                    <div id="map-saver-container"/>
                </div>
            </FileDrop>
            <div id="map-renderer-container"/>
        </div>
    );
}
