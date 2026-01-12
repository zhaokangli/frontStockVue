import { CHART_CONFIG, LINE_CONFIGS } from './chart-config.js';

export class ChartState {
    constructor() {
        this.instances = {};
        this.currentCode = '';
        this.currentData = null;
        
        this.visibility = {};
        Object.keys(CHART_CONFIG).forEach(key => {
            const config = CHART_CONFIG[key];
            if (config.type === 'main') {
                // 主图始终显示
                this.visibility[key] = true;
            } else {
                // 副图使用配置的defaultVisible，如果没有配置则默认显示
                this.visibility[key] = config.defaultVisible !== undefined 
                    ? config.defaultVisible 
                    : true;
            }
        });
        
        // 新增：线级别可见性控制
        this.lineVisibility = {};
        // 初始化所有线的可见性
        Object.keys(CHART_CONFIG).forEach(chartType => {
            const config = CHART_CONFIG[chartType];
            this.lineVisibility[chartType] = {};
            
            config.lines.forEach(lineKey => {
                const lineConfig = LINE_CONFIGS[lineKey];
                if (lineConfig) {
                    // 如果图表有默认可见线配置，使用配置的默认值
                    if (config.defaultVisibleLines && config.defaultVisibleLines.includes(lineKey)) {
                        this.lineVisibility[chartType][lineKey] = true;
                    } else if (config.defaultVisibleLines) {
                        this.lineVisibility[chartType][lineKey] = false;
                    } else {
                        // 否则使用线本身的默认可见性
                        this.lineVisibility[chartType][lineKey] = lineConfig.defaultVisible !== undefined 
                            ? lineConfig.defaultVisible 
                            : true;
                    }
                }
            });
        });

        // 新增：图例可见性控制
        this.legendVisibility = {};
        Object.keys(CHART_CONFIG).forEach(key => {
            this.legendVisibility[key] = CHART_CONFIG[key].showLegend || false;
        });
        
        // 新增：保存dataZoom状态
        this.dataZoomState = {
            start: undefined,
            end: undefined
        };
    }

    get visibleCharts() {
        return Object.keys(this.visibility).filter(key => this.visibility[key]);
    }

    get totalVisibleCharts() {
        return this.visibleCharts.length;
    }

    // 获取图表中可见的线
    getVisibleLines(chartType) {
        if (!this.lineVisibility[chartType]) return [];
        return Object.keys(this.lineVisibility[chartType])
            .filter(lineKey => this.lineVisibility[chartType][lineKey]);
    }

    // 切换线的可见性
    toggleLineVisibility(chartType, lineKey) {
        if (this.lineVisibility[chartType] && this.lineVisibility[chartType][lineKey] !== undefined) {
            this.lineVisibility[chartType][lineKey] = !this.lineVisibility[chartType][lineKey];
        }
    }

    // 设置线的可见性
    setLineVisibility(chartType, lineKey, isVisible) {
        if (this.lineVisibility[chartType]) {
            this.lineVisibility[chartType][lineKey] = isVisible;
        }
    }

    // 新增：保存dataZoom状态
    saveDataZoomState(chartInstance) {
        if (!chartInstance) return;
        
        try {
            const option = chartInstance.getOption();
            if (option.dataZoom && option.dataZoom.length > 0) {
                const dataZoom = option.dataZoom[0];
                if (dataZoom.start !== undefined && dataZoom.end !== undefined) {
                    this.dataZoomState = {
                        start: dataZoom.start,
                        end: dataZoom.end
                    };
                }
            }
        } catch (error) {
            console.warn('保存dataZoom状态失败:', error);
        }
    }

    // 新增：应用保存的dataZoom状态
    applyDataZoomState(option) {
        if (!option.dataZoom || option.dataZoom.length === 0) return option;
        
        // 应用保存的dataZoom状态
        option.dataZoom.forEach(zoom => {
            if (zoom.type === 'inside' || zoom.type === 'slider') {
                if (this.dataZoomState.start !== undefined) {
                    zoom.start = this.dataZoomState.start;
                }
                if (this.dataZoomState.end !== undefined) {
                    zoom.end = this.dataZoomState.end;
                }
            }
        });
        
        return option;
    }
}

export const chartState = new ChartState();