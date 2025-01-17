import { DEFAULT_PARAMS } from './config.js';

export function generateRandomPoints({
    totalNum = DEFAULT_PARAMS.totalNum,
    spread = DEFAULT_PARAMS.spread,
    minClusterPoints = DEFAULT_PARAMS.minClusterPoints,
    maxClusterPoints = DEFAULT_PARAMS.maxClusterPoints
} = {}) {
    const points = [];
    const clusters = Math.ceil(totalNum / maxClusterPoints);

    for (let i = 0; i < clusters; i++) {
        // random cluster center
        const centerX = (Math.random() - 0.5) * 2 * spread;
        const centerY = (Math.random() - 0.5) * 2 * spread;
        const centerZ = (Math.random() - 0.5) * 2 * spread;
        const centerW = (Math.random() - 0.5) * 2 * spread;

        const numClusterPoints = Math.floor(
            Math.random() * (maxClusterPoints - minClusterPoints + 1)
        ) + minClusterPoints;

        for (let j = 0; j < numClusterPoints; j++) {
            if (points.length >= totalNum) break;

            // variation around the cluster center
            const offsetX = (Math.random() - 0.5) * spread * 0.2;
            const offsetY = (Math.random() - 0.5) * spread * 0.2;
            const offsetZ = (Math.random() - 0.5) * spread * 0.2;
            const offsetW = (Math.random() - 0.5) * spread * 0.2;

            points.push([
                centerX + offsetX,
                centerY + offsetY,
                centerZ + offsetZ,
                centerW + offsetW
            ]);
        }
    }

    return points;
}

export function* nameGenerator(prefix, count) {
    for (let i = 0; i < count; i++) {
        yield `${prefix} ${i}`;
    }
}