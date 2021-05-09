import {TerrainType, terrainTypeLookup} from "../TerrainType";
import {MapData} from "./MapData";

export class MapTile {
    protected readonly tileData: DataView;
    readonly x: number;
    readonly y: number;

    constructor(map: MapData, x: number, y: number) {
        const tileOffset = 0x62 + (x * 6) + (y * 6 * map.width);
        this.tileData = new DataView(map.mapData.buffer, tileOffset, 6);
        this.x = x;
        this.y = y;
    }

    get terrainBits() {
        return this.tileData.getUint8(0);
    }

    get terrainTypeBits() {
        return this.terrainBits & 0x0F;
    }

    getTerrainType() {
        return terrainTypeLookup(this.terrainTypeBits);
    }

    get terrainType() {
        return this.getTerrainType();
    }

    isWater() {
        return this.terrainType === TerrainType.WATER;
    }

    isLand() {
        return !this.isWater();
    }

    hasRiver() {
        return (this.tileData.getUint8(0) & 0x80) === 0x80;
    }

    get river() {
        return this.hasRiver();
    }
}

export class ModifiableMapTile extends MapTile {
    get terrainType() {
        return this.getTerrainType();
    }

    set terrainType(terrainType: TerrainType) {
        this.tileData.setUint8(0, (this.terrainBits & 0xF0) + (terrainType.valueOf() & 0x0F));
    }

    get river() {
        return this.hasRiver();
    }

    set river(river: boolean) {
        if (river === this.river) return;
        this.tileData.setUint8(0, this.tileData.getUint8(0) ^ 0x80);
    }
}
