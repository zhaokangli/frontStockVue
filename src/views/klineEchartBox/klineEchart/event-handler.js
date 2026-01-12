import { ChartManager } from './chart-manager.js';
import { CHART_CONFIG } from './chart-config.js';
import { chartState } from './state-manager.js';
import { SwitchGenerator } from './switch-generator.js';

// 事件处理器
export class EventHandler {
    static init() {
        // 先初始化开关生成器
        SwitchGenerator.init();

        // 等待DOM更新后绑定事件
        setTimeout(() => {
            this.bindButtonEvents();
            this.initChartSwitches();
            this.initLegendSwitches(); // 新增：初始化图例开关
        }, 100);

    }

    static bindButtonEvents() {
        const buttons = {
            resetBtn: this.handleReset.bind(this),
            fullscreenBtn: this.handleFullscreen.bind(this)
        };
        Object.entries(buttons).forEach(([id, handler]) => {
            const element = document.getElementById(id);
            if (element) element.addEventListener('click', handler);
        });
    }

    static initChartSwitches() {
        Object.keys(CHART_CONFIG).forEach(chartType => {
            if (chartType !== 'main') {
                const switchId = `${chartType}Switch`;
                const element = document.getElementById(switchId);
                if (element) {
                    element.addEventListener('change', (e) => {
                        ChartManager.toggleVisibility(chartType, e.target.checked);
                    });
                }
            }
        });
    }

    static initLegendSwitches() {
        Object.keys(CHART_CONFIG).forEach(chartType => {
            if (chartType !== 'main' && CHART_CONFIG[chartType].showLegend) {
                const switchId = `${chartType}LegendSwitch`;
                const element = document.getElementById(switchId);
                if (element) {
                    element.addEventListener('change', (e) => {
                        chartState.legendVisibility[chartType] = e.target.checked;
                        if (chartState.currentData) {
                            ChartManager.update(chartState.currentData);
                        }
                    });
                }
            }
        });
    }

    static handleReset() {
        // 保存当前dataZoom状态
        const previousDataZoomState = { ...chartState.dataZoomState };

        SwitchGenerator.resetSwitches();
        // 重置图表可见性
        Object.keys(CHART_CONFIG).forEach(key => {
            const config = CHART_CONFIG[key];
            if (config.type === 'main') {
                chartState.visibility[key] = true; // 主图始终显示
            } else {
                // 副图使用配置的defaultVisible
                chartState.visibility[key] = config.defaultVisible !== undefined
                    ? config.defaultVisible
                    : true;
            }
        });

        // 重置线级别可见性
        Object.keys(CHART_CONFIG).forEach(chartType => {
            const config = CHART_CONFIG[chartType];
            config.lines.forEach(lineKey => {
                const lineConfig = LINE_CONFIGS[lineKey];
                if (lineConfig) {
                    // 如果图表有默认可见线配置，使用配置的默认值
                    if (config.defaultVisibleLines && config.defaultVisibleLines.includes(lineKey)) {
                        chartState.setLineVisibility(chartType, lineKey, true);
                    } else if (config.defaultVisibleLines) {
                        chartState.setLineVisibility(chartType, lineKey, false);
                    } else {
                        // 否则使用线本身的默认可见性
                        chartState.setLineVisibility(chartType, lineKey, 
                            lineConfig.defaultVisible !== undefined ? lineConfig.defaultVisible : true);
                    }
                }
            });
        });

        // 重置图例可见性
        Object.keys(CHART_CONFIG).forEach(key => {
            chartState.legendVisibility[key] = CHART_CONFIG[key].showLegend || false;
        });

        if (chartState.currentData) {
            setTimeout(() => {
                ChartManager.update(chartState.currentData);
                ChartManager.handleResize();

                // 恢复dataZoom状态
                setTimeout(() => {
                    chartState.dataZoomState = previousDataZoomState;
                    ChartManager.update(chartState.currentData);
                }, 200);
            }, 100);
        }
    }


    static handleFullscreen() {
        const container = document.querySelector('.chart-container');
        const methods = ['requestFullscreen', 'webkitRequestFullscreen', 'msRequestFullscreen'];
        for (const method of methods) {
            if (container[method]) {
                container[method]();
                break;
            }
        }
    }
}