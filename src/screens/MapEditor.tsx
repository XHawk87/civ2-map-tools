import React, {ChangeEvent, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FileDrop} from "react-file-drop";
import MapRenderer from "../components/MapRenderer";
import {MapData} from "../tools/map/MapData";
import MapSaver from "../components/MapSaver";
import Waterways from "../components/Waterways";
import FloodWithRivers from "../components/FloodWithRivers";

export default function MapEditor() {
    const [map, setMap] = useState<MapData | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadFile = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        setMap(new MapData(arrayBuffer, file.name));
    };
    const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) loadFile(file).finally();
    };
    const onFrameDrop = (event: DragEvent) => {
        const file = event.dataTransfer?.files.item(0);
        if (file) loadFile(file).finally();
    };
    const onTargetClick = () => {
        fileInputRef.current?.click();
    };

    if (map) {
        return (
            <div className="App-header">
                <Link to="/">Home</Link>
                <h2>Civ 2 Map Editor</h2>
                <FileDrop onFrameDrop={onFrameDrop} onTargetClick={onTargetClick}>
                    <p>Drag and drop or select a new Civ 2 Map file to change which map you are editing</p>
                    <div>
                        <input onChange={onFileInputChange} ref={fileInputRef} type="file"
                               className="file-drop-select"/>
                    </div>
                </FileDrop>
                <MapSaver map={map}/>
                <MapRenderer map={map}/>
                <div className="macro-buttons">
                    <Waterways map={map} setMap={setMap}/>
                    <FloodWithRivers map={map} setMap={setMap}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="App-header">
                <Link to="/">Home</Link>
                <h2>Civ 2 Map Editor</h2>
                <FileDrop onFrameDrop={onFrameDrop} onTargetClick={onTargetClick}>
                    <p>Drag and drop or select a Civ 2 Map file</p>
                    <div>
                        <input onChange={onFileInputChange} ref={fileInputRef} type="file"
                               className="file-drop-select"/>
                    </div>
                </FileDrop>
            </div>
        )
    }
}
