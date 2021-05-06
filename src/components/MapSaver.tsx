import React from "react";
import {MapData} from "../tools/MapData";

interface MapSaverProps {
    mapData: MapData;
}

export default function MapSaver(props: MapSaverProps) {
    const map = props.mapData;
    const saveClicked = async () => {
        map.saveAs(map.fileName);
    };
    return (
        <div>
            <button onClick={saveClicked}>Save</button>
        </div>
    );
}