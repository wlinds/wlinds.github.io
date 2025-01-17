import { SceneManager } from './sceneSetup.js';
import { UIControlsManager } from './controls.js';
import { generateRandomPoints, nameGenerator } from './pointGenerator.js';
import { TooltipManager } from './tooltip.js';
import { DEFAULT_PARAMS } from './config.js';
import { DataLoader } from './dataLoader.js';

class ScatterPlot {
    constructor() {
        // init managers
        this.sceneManager = new SceneManager();
        this.tooltipManager = new TooltipManager();
        this.dataLoader = new DataLoader();

        
        // init data
        this.currentDataSource = 'random';
        this.data = generateRandomPoints(DEFAULT_PARAMS);
        this.names = [...nameGenerator("Node", this.data.length)];
        
        this.dataLoader = new DataLoader();
        
        // init UI
        this.setupUIControls();
        
        // init visualization
        this.createVisualization();
        
        // interaction handlers
        this.setupInteraction();
        
        // animation loop
        this.animate();

        // load CSV data
        this.loadGameData();

        console.log('App initialized with:', {
            data: this.data,
            names: this.names
        });
    }

    async loadGameData() {
        try {
            const result = await this.dataLoader.loadCSV('./datasets/Video_Games_Sales_as_at_22_Dec_2016 copy.csv');
            if (result) {
                this.availableColumns = result.numericColumns;
                console.log('Available numeric columns:', this.availableColumns);
                
                const defaultDimensions = this.availableColumns.slice(0, 4);
                this.gameData = this.dataLoader.processData(defaultDimensions);
                
                if (this.currentDataSource === 'games') {
                    this.uiControls.updateDimensions(this.availableColumns);
                }
            }
        } catch (error) {
            console.error('Error loading game data:', error);
        }
    }
    
    
    handleDataSourceChange(source) {
        console.log('changing data source to:', source);
        this.currentDataSource = source;
    
        if (source === 'random') {
            this.data = generateRandomPoints(DEFAULT_PARAMS);
            this.names = [...nameGenerator("Node", this.data.length)];
            this.uiControls.updateDimensions(['Dimension 1', 'Dimension 2', 'Dimension 3', 'Dimension 4']);
        } else {
            if (!this.gameData) {
                console.error('Game data not loaded yet');
                return;
            }
            
            this.data = this.gameData;
            this.names = this.gameData.map(game => game.originalData.Name);
            this.uiControls.updateDimensions(this.availableColumns);
        }
        
        this.createVisualization();
    }
        

    setupUIControls() {
        this.uiControls = new UIControlsManager(
            DEFAULT_PARAMS,
            (params) => this.handleParamsChange(params),
            (dimensions) => this.handleDimensionsChange(dimensions),
            (dataSource) => this.handleDataSourceChange(dataSource)
        );
    }

    createVisualization() {
        this.sceneManager.clearSpheres();
        this.sceneManager.createSpheres(this.data, this.names);
    }

    handleParamsChange(params) {
        console.log('params changed:', params);
        this.data = generateRandomPoints(params);
        this.names = [...nameGenerator("Node", this.data.length)];
        this.createVisualization();
    }

    handleDimensionsChange(dimensions) {
        if (this.currentDataSource === 'games') {

            this.gameData = this.dataLoader.processData([
                dimensions.x,
                dimensions.y,
                dimensions.z,
                dimensions.w
            ]);
            this.data = this.gameData.map(game => game.coordinates);
        } else {

            const selectedDimensions = [dimensions.x, dimensions.y, dimensions.z].map(dim => 
                parseInt(dim.replace('Dimension ', '')) - 1
            );
            
            this.sceneManager.spheres.forEach((sphere, index) => {
                const point = this.data[index];
                const newPosition = [
                    point[selectedDimensions[0]],
                    point[selectedDimensions[1]],
                    point[selectedDimensions[2]]
                ];
                sphere.position.set(...newPosition);
            });
            return;  // skip full recreation for random mode
        }
        this.createVisualization();
    }

    // handleDimensionsChange(dimensions) {
    //     console.log('Dimensions changed:', dimensions);
    //     this.sceneManager.spheres.forEach((sphere, index) => {
    //         const point = this.data[index];
    //         const newPosition = [
    //             point[dimensions.x],
    //             point[dimensions.y],
    //             point[dimensions.z]
    //         ];
    //         sphere.position.set(...newPosition);
    //     });
    // }

    setupInteraction() {
        this.sceneManager.renderer.domElement.addEventListener('click', (event) => {
            const intersects = this.sceneManager.getRaycasterIntersects(event.clientX, event.clientY);
            
            if (intersects.length > 0) {
                const selectedSphere = intersects[0].object;
                this.sceneManager.lockCameraToPosition(selectedSphere.position);
                
                const screenPosition = this.sceneManager.projectToScreen(selectedSphere.position);
                console.log('Screen Position:', screenPosition); // Debug
                
                const tooltipData = {
                    image: 'https://via.placeholder.com/50',
                    title: selectedSphere.userData.names.join(', '),
                    subtitle: 'Data Point Information',
                    description: `Coordinates: ${selectedSphere.userData.data[0].join(', ')}`,
                    tags: ['Interactive', 'Data Point', 'Node'],
                    links: [
                        { text: 'Details', url: '#' },
                        { text: 'Analysis', url: '#' }
                    ]
                };
                console.log('Tooltip Data:', tooltipData);
                
                this.tooltipManager.show(screenPosition, tooltipData);
            }
        });
    }

    createTooltipData(userData) {
        console.log('TOOLTIP:', userData);
        
        if (this.currentDataSource === 'random') {
            // ...
        } else {
            const gameData = userData.data[0].originalData;
            console.log('Game data for tooltip:', gameData);
            
            return {
                title: gameData.Name || 'Unknown Game',
                subtitle: `${gameData.Platform} (${gameData.Year_of_Release})`,
                description: `Publisher: ${gameData.Publisher}
                             Genre: ${gameData.Genre}
                             Global Sales: ${gameData.Global_Sales}M
                             NA Sales: ${gameData.NA_Sales}M
                             EU Sales: ${gameData.EU_Sales}M
                             JP Sales: ${gameData.JP_Sales}M`,
                tags: [gameData.Platform, gameData.Genre, gameData.Rating].filter(tag => tag),
                links: [{ text: 'Details', url: '#' }]
            };
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.sceneManager.animate();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new ScatterPlot();
});