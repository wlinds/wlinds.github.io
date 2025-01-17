export class DataLoader {
    constructor() {
        this.csvData = null;
        this.numericColumns = [];
        this.columns = [];
    }

    async loadCSV(file) {
        try {
            const response = await fetch(file);
            const text = await response.text();
            this.csvData = this.parseCSV(text);
            const numericCols = this.analyzeColumns();
            
            return {
                data: this.csvData,
                columns: this.columns,
                numericColumns: numericCols
            };
        } catch (error) {
            console.error('Error loading CSV:', error);
            return null;
        }
    }

    parseCSV(text) {
        const lines = text.split('\n');
        this.columns = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1)
            .filter(line => line.trim() !== '')
            .map(line => {
                const values = line.split(',');
                const row = {};
                this.columns.forEach((header, i) => {
                    row[header] = values[i] ? values[i].trim() : '';
                });
                return row;
            });
    }

    processData(selectedDimensions) {
        return this.csvData.map((row, index) => {
            const coordinates = selectedDimensions.map(dim => {
                const value = parseFloat(row[dim]);
                return isNaN(value) ? 0 : value;
            });

            return {
                coordinates,
                originalData: row,
                index
            };
        });
    }

    analyzeColumns() {
        return this.columns.filter(column => {
            const values = this.csvData
                .map(row => row[column])
                .filter(val => val !== '');
            
            const numericCount = values.filter(val => {
                const num = parseFloat(val);
                return !isNaN(num);
            }).length;
            
            // stupid? idk
            return (numericCount / values.length) > 0.2;
        });
    }


    getColumnStats(column) {
        const values = this.csvData
            .map(row => parseFloat(row[column]))
            .filter(val => !isNaN(val));

        return {
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((a, b) => a + b, 0) / values.length
        };
    }
}