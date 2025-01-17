import { DEFAULT_PARAMS, DIMENSIONS } from './config.js';

export class UIControlsManager {
    constructor(params = DEFAULT_PARAMS, onParamsChange = () => {}, onDimensionsChange = () => {}, onDataSourceChange = () => {}) {
        this.currentParams = { ...params };
        this.onParamsChange = onParamsChange;
        this.onDimensionsChange = onDimensionsChange;
        this.onDataSourceChange = onDataSourceChange;
        this.defaultDimensions = ['Dimension 1', 'Dimension 2', 'Dimension 3', 'Dimension 4'];
        
        this.setupParameterControls();
        this.setupDimensionDropdowns(this.defaultDimensions);
        this.setupCollapsiblePanel();
        this.setupDataSourceToggle();
    }


    setupParameterControls() {
        const parameterInputs = ['totalNum', 'spread', 'minClusterPoints', 'maxClusterPoints'];
        
        parameterInputs.forEach(param => {
            const input = document.getElementById(param);
            const valueDisplay = document.getElementById(`${param}-value`);
            
            if (input && valueDisplay) {
                input.value = this.currentParams[param];
                valueDisplay.textContent = this.currentParams[param];
                
                input.addEventListener('input', (e) => {
                    this.currentParams[param] = parseInt(e.target.value);
                    valueDisplay.textContent = e.target.value;
                });
            }
        });

        const generateButton = document.getElementById('generate-button');
        if (generateButton) {
            generateButton.addEventListener('click', () => {
                this.onParamsChange(this.currentParams);
            });
        }
    }

    setupDimensionDropdowns(columns = DIMENSIONS) {
        const dropdowns = ['xSelect', 'ySelect', 'zSelect'];
        
        dropdowns.forEach((id, index) => {
            const select = document.getElementById(id);
            if (select) {
                select.innerHTML = '';
                
                columns.forEach((dim) => {
                    const option = document.createElement('option');
                    option.value = dim;
                    option.text = dim;
                    select.appendChild(option);
                });
                
                if (columns[index]) {
                    select.selectedIndex = index;
                }
                
                select.addEventListener('change', () => this.handleDimensionChange());
            }
        });
    }

    setupDataSourceToggle() {
        const controlsDiv = document.getElementById('parameter-controls').querySelector('.panel-content');
        const panelHeader = document.querySelector('.panel-header span');
        
        const dataSourceGroup = document.createElement('div');
        dataSourceGroup.className = 'control-group';
        dataSourceGroup.innerHTML = `
            <label>Data Source</label>
            <select id="dataSource" style="width: 100%; padding: 5px; margin-top: 5px;">
                <option value="random">Random Points</option>
                <option value="games">Games Data</option>
            </select>
        `;
    
        controlsDiv.insertBefore(dataSourceGroup, controlsDiv.firstChild);
    
        const dataSourceSelect = document.getElementById('dataSource');
        dataSourceSelect.addEventListener('change', (e) => {
            const source = e.target.value;

            panelHeader.textContent = this.getDataSourceDisplayName(source);
            
            if (source === 'random') {
                this.setupDimensionDropdowns(this.defaultDimensions);
            }
            this.onDataSourceChange(source);
        });
    

        panelHeader.textContent = this.getDataSourceDisplayName(dataSourceSelect.value);
    }


    getDataSourceDisplayName(source) {
        const displayNames = {
            'random': 'Random Points',
            'games': 'Games Data'
        };
        return displayNames[source] || 'Data Source';
    }
    
    
    toggleControlsVisibility(isRandom) {
        const controls = document.querySelectorAll('.parameter-control');
        controls.forEach(control => {
            control.style.display = isRandom ? 'block' : 'none';
        });
    }

    setupCollapsiblePanel() {
        const parameterControls = document.getElementById('parameter-controls');
        const toggleIcon = document.querySelector('.toggle-icon');
        const panelHeader = document.querySelector('.panel-header');

        if (parameterControls && toggleIcon && panelHeader) {
            panelHeader.addEventListener('click', () => {
                const isOpen = parameterControls.classList.toggle('open');
                toggleIcon.classList.toggle('open');
            });

            parameterControls.classList.add('open');
            toggleIcon.classList.add('open');
        }
    }

    handleDimensionChange() {
        const dimensions = {
            x: document.getElementById('xSelect').value,
            y: document.getElementById('ySelect').value,
            z: document.getElementById('zSelect').value
        };
        
        console.log('Dimensions changed to:', dimensions);
        this.onDimensionsChange(dimensions);
    }
    
    updateDimensions(columns) {
        console.log('Updating dimensions with:', columns);
        this.setupDimensionDropdowns(columns);
    }

    getCurrentParams() {
        return { ...this.currentParams };
    }

    getCurrentDimensions() {
        return {
            x: parseInt(document.getElementById('xSelect').value),
            y: parseInt(document.getElementById('ySelect').value),
            z: parseInt(document.getElementById('zSelect').value)
        };
    }
}