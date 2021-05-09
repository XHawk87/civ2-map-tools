import React, {useRef} from "react";
import {MapData} from "../tools/map/MapData";

interface MapSaverProps {
    map: MapData;
}

export default function MapSaver(props: MapSaverProps) {
    const map = props.map;
    const fileNameRef = useRef<HTMLInputElement>(null);
    const saveClicked = () => {
        const fileName = fileNameRef.current?.value;
        if (fileName) map.saveAs(fileName);
    };
    return (
        <div>
            <input defaultValue={map.fileName} ref={fileNameRef}/>
            <button onClick={saveClicked}>Save</button>
        </div>
    );
}