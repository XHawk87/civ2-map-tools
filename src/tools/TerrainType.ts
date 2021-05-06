export enum TerrainType {
    DESERT = 0x00,
    PLAINS = 0x01,
    GRASSLAND = 0x02,
    FOREST = 0x03,
    HILLS = 0x04,
    MOUNTAINS = 0x05,
    TUNDRA = 0x06,
    GLACIER = 0x07,
    MARSH = 0x08,
    JUNGLE = 0x09,
    WATER = 0x0A,
    UNKNOWN_B = 0x0B,
    UNKNOWN_C = 0x0C,
    UNKNOWN_D = 0x0D,
    UNKNOWN_E = 0x0E,
    UNKNOWN_F = 0x0F,
}

export const terrainTypeLookup = (value: number) => {
    switch (value) {
        case 0x00:
            return TerrainType.DESERT;
        case 0x01:
            return TerrainType.PLAINS;
        case 0x02:
            return TerrainType.GRASSLAND;
        case 0x03:
            return TerrainType.FOREST;
        case 0x04:
            return TerrainType.HILLS;
        case 0x05:
            return TerrainType.MOUNTAINS;
        case 0x06:
            return TerrainType.TUNDRA;
        case 0x07:
            return TerrainType.GLACIER;
        case 0x08:
            return TerrainType.MARSH;
        case 0x09:
            return TerrainType.JUNGLE;
        case 0x0A:
            return TerrainType.WATER;
        case 0x0B:
            return TerrainType.UNKNOWN_B;
        case 0x0C:
            return TerrainType.UNKNOWN_C;
        case 0x0D:
            return TerrainType.UNKNOWN_D;
        case 0x0E:
            return TerrainType.UNKNOWN_E;
        case 0x0F:
            return TerrainType.UNKNOWN_F;
        default:
            return TerrainType.DESERT;
    }
};