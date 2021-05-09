import {saveAs} from 'file-saver';
import {MapTile, ModifiableMapTile} from "./MapTile";

export class MapData {
    readonly mapData: DataView;
    readonly fileName: string;

    constructor(arrayBuffer: ArrayBuffer, fileName: string) {
        this.mapData = new DataView(arrayBuffer);
        this.fileName = fileName;
    }

    get height() {
        return this.mapData.getUint8(0x02);
    }

    get area() {
        return this.mapData.getUint16(0x04, true);
    }

    get width() {
        return this.area / this.height;
    }

    isFlat() {
        return (this.mapData.getUint8(0x06) & 0x01) === 0x01;
    }

    isRound() {
        return !this.isFlat();
    }

    get flat() {
        return this.isFlat();
    }

    withModifications(doModifications: (newMap: ModifiableMapData) => void): MapData {
        const newMap = new MapData(this.mapData.buffer.slice(0), this.fileName);
        const modifiableMap = new ModifiableMapData(newMap.mapData.buffer, newMap.fileName);
        doModifications(modifiableMap);
        return newMap;
    }

    getTile(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
        return new MapTile(this, x, y);
    }

    saveAs(fileName: string) {
        const {buffer, byteLength, byteOffset} = this.mapData;
        const blob = new Blob([new Uint8Array(buffer, byteOffset, byteLength)]);
        saveAs(blob, fileName);
    }
}

class ModifiableMapData extends MapData {
    get flat() {
        return this.isFlat();
    }

    set flat(flat: boolean) {
        const oldValue = this.mapData.getUint8(0x06);
        const newValue = flat ? oldValue & 0xFE : oldValue | 0x01;
        this.mapData.setUint8(0x06, newValue);
    }

    getTile(x: number, y: number): ModifiableMapTile {
        return new ModifiableMapTile(this, x, y);
    }
}
