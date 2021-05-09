import React, {LegacyRef, useEffect, useRef} from 'react';
import {MapData} from "../tools/map/MapData";
import {TerrainType} from "../tools/TerrainType";
import {loadImage} from "../tools/ImageUtils";
import {MapTile} from "../tools/map/MapTile";

interface MapRendererProps {
    map: MapData;
    tileWidth?: number;
    tileHeight?: number;
}

function exec(callbackFn: () => any) {
    callbackFn();
}

export default function MapRenderer(props: MapRendererProps) {
    const canvasRef: LegacyRef<HTMLCanvasElement> = useRef(null);
    const map = props.map;
    const tileWidth = props.tileWidth ?? 16;
    const tileHeight = props.tileHeight ?? 8;
    useEffect(() => exec(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        const terrain1 = await loadImage('/civ2-map-tools/map-renderer/TERRAIN1.png');
        const terrain2 = await loadImage('/civ2-map-tools/map-renderer/TERRAIN2.png');
        context.fillStyle = '#000000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (let y = 0; y < map.height; y += 1) {
            for (let x = 0; x < map.width; x += 1) {
                const tile = map.getTile(x, y) as MapTile;
                const xPos = x * tileWidth + (y % 2) * (tileWidth / 2);
                const yPos = y * tileHeight / 2;
                context.drawImage(terrain1, 1, 1 + 33 * tile.terrainType.valueOf(), 64, 32,
                    xPos, yPos, tileWidth, tileHeight);
                const tileNE = map.getTile(x + (y % 2), y - 1);
                const tileSE = map.getTile(x + (y % 2), y + 1);
                const tileSW = map.getTile(x + (y % 2) - 1, y + 1);
                const tileNW = map.getTile(x + (y % 2) - 1, y - 1);
                const terrainNE = tileNE?.terrainType === tile.terrainType ? 1 : 0;
                const terrainSE = tileSE?.terrainType === tile.terrainType ? 2 : 0;
                const terrainSW = tileSW?.terrainType === tile.terrainType ? 4 : 0;
                const terrainNW = tileNW?.terrainType === tile.terrainType ? 1 : 0;
                const terrainDx = 1 + (terrainNE + terrainSW + terrainSE) * 65;
                const terrainDy = terrainNW * 33;
                if (tile.terrainType === TerrainType.FOREST) {
                    context.drawImage(terrain2, terrainDx, terrainDy + 133, 64, 32,
                        xPos, yPos, tileWidth, tileHeight);
                } else if (tile.terrainType === TerrainType.MOUNTAINS) {
                    context.drawImage(terrain2, terrainDx, terrainDy + 199, 64, 32,
                        xPos, yPos, tileWidth, tileHeight);
                } else if (tile.terrainType === TerrainType.HILLS) {
                    context.drawImage(terrain2, terrainDx, terrainDy + 265, 64, 32,
                        xPos, yPos, tileWidth, tileHeight);
                }
                if (tile.river) {
                    const riverNE = (tileNE?.river || tileNE?.isWater()) ? 1 : 0;
                    const riverSE = (tileSE?.river || tileSE?.isWater()) ? 2 : 0;
                    const riverSW = (tileSW?.river || tileSW?.isWater()) ? 4 : 0;
                    const riverNW = (tileNW?.river || tileNW?.isWater()) ? 1 : 0;
                    const riverDx = 1 + (riverNE + riverSW + riverSE) * 65;
                    const riverDy = riverNW * 33;
                    context.drawImage(terrain2, riverDx, riverDy + 67, 64, 32,
                        xPos, yPos, tileWidth, tileHeight);
                }
            }
        }
    }), [map, tileHeight, tileWidth]);
    const canvasWidth = (map.width + 0.5) * tileWidth;
    const canvasHeight = (map.height + 1) * tileHeight / 2;
    return (
        <section>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}/>
        </section>
    );
}
