export const DEFAULT_PARAMS = {
    totalNum: 100,
    spread: 10,
    minClusterPoints: 1,
    maxClusterPoints: 3,
    seed: Math.floor(Math.random() * 1000000) // use seed?
};

export const DIMENSIONS = ['Dimension 1', 'Dimension 2', 'Dimension 3', 'Dimension 4'];

export const CAMERA_CONFIG = {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: {
        x: 0,
        y: 0,
        z: 10
    }
};

export const COLORS = {
    sphere: "#ffbaee",
    ambient: 0xffff,
    pointLight: 0xffffff
};

// export const COLORS = {
//     sphere: "#ff0000",
//     ambient: 0xffff,
//     pointLight: 0xffffff
// };