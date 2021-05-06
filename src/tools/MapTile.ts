import {MapData} from "./MapData";
import {TerrainType, terrainTypeLookup} from "./TerrainType";

export class MapTile {
    private tileData: DataView;

    constructor(mapData: MapData, x: number, y: number) {
        const tileOffset = 0x62 + (x * 6) + (y * 6 * mapData.width);
        this.tileData = new DataView(mapData.buffer, tileOffset, 6);
    }

    private get terrainBits() {
        return this.tileData.getUint8(0);
    }

    private get terrainTypeBits() {
        return this.terrainBits & 0x0F;
    }

    get terrainType() {
        return terrainTypeLookup(this.terrainTypeBits);
    }

    set terrainType(terrainType: TerrainType) {
        this.tileData.setUint8(0, (this.terrainBits & 0xF0) + (terrainType.valueOf() & 0x0F));
    }

    isWater() {
        return this.terrainType === TerrainType.WATER;
    }

    get river() {
        return (this.tileData.getUint8(0) & 0x80) === 0x80;
    }

    set river(river: boolean) {
        if (river === this.river) return;
        this.tileData.setUint8(0, this.tileData.getUint8(0) ^ 0x80);
    }

    copyTile(source: MapTile) {
        for (let offset = 0; offset < this.tileData.byteLength; offset += 1) {
            this.tileData.setUint8(offset, source.tileData.getUint8(offset));
        }
    }
}