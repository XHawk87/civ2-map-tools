import {saveAs} from 'file-saver';
import {MapTile} from "./MapTile";
import dateFormat from 'dateformat';

export class MapData {
    private mapData: DataView;
    readonly fileName: string;

    constructor(arrayBuffer: ArrayBuffer, fileName?: string) {
        this.mapData = new DataView(arrayBuffer);
        this.fileName = fileName ?? dateFormat(Date.now(), 'yyyy-mm-dd_HH-MM-ss') + ".mp";
    }

    get buffer() {
        return this.mapData.buffer;
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

    get flat() {
        return (this.mapData.getUint8(0x06) & 0x01) === 0x01;
    }

    set flat(flat: boolean) {
        if (flat === this.flat) return;
        this.mapData.setUint8(0x06, this.mapData.getUint8(0x06) ^ 0x01);
    }

    isRound() {
        return !this.flat;
    }

    getTile(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
        return new MapTile(this, x, y);
    }

    copy() {
        return new MapData(this.mapData.buffer.slice(0));
    }

    saveAs(fileName: string) {
        const blob = new Blob([new Uint8Array(this.mapData.buffer, this.mapData.byteOffset, this.mapData.byteLength)]);
        saveAs(blob, fileName)
    }
}