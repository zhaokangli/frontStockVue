import { CONFIG } from './constants.js';
import { CHART_CONFIG, LINE_CONFIGS } from './chart-config.js';
import { chartState } from './state-manager.js';

// 统一图表工厂
export class UnifiedChartFactory {
    static getBaseConfig() {
        return {
            backgroundColor: CONFIG.CHART.COLORS.backgroundcanvas,
            animation: false,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' },
                borderWidth: CONFIG.CHART.STYLES.border.width,
                borderColor: CONFIG.CHART.COLORS.border.tooltip,
                backgroundColor: CONFIG.CHART.COLORS.background.tooltip,
                textStyle: { color: CONFIG.CHART.COLORS.text.tooltip }
            },
            grid: CONFIG.CHART.GRID,
            xAxis: {
                type: 'category',
                axisLabel: { color: CONFIG.CHART.COLORS.text.primary }
            },
            yAxis: {
                scale: true,
                axisLabel: { color: CONFIG.CHART.COLORS.text.primary }
            }
        };
    }

    static createOption(data) {
        const processedData = this.processAllData(data);
        const grids = this.calculateGrids();
        const xAxes = this.createXAxes(grids, processedData.timeData);
        const yAxes = this.createYAxes(grids);
        const series = this.createSeries(processedData, grids.length);

        const totalDataPoints = processedData.timeData.length;
        const dataZoom = this.getDataZoomConfig(
            Array.from({ length: xAxes.length }, (_, i) => i),
            totalDataPoints
        );

        const graphic = this.createChartTitles(grids);

        // 修改：为每个图表创建独立的图例配置
        const legends = this.createLegends(grids);

        return {
            ...this.getBaseConfig(),
            legend: legends, // 修改：使用独立的图例配置数组
            grid: grids,
            xAxis: xAxes,
            yAxis: yAxes,
            dataZoom,
            series,
            graphic: graphic.length > 0 ? graphic : undefined
        };
    }

    // 新增：为每个图表创建独立的图例
    static createLegends(grids) {
        const legends = [];

        chartState.visibleCharts.forEach((chartType, index) => {
            const config = CHART_CONFIG[chartType];
            if (!config || !config.showLegend || !config.legend) return;

            const grid = grids[index];
            if (!grid) return;

            // 构建selected对象，控制每条线的默认显示状态
            const selected = {};
            const legendData = [];
            config.lines.forEach(lineKey => {
                const lineConfig = LINE_CONFIGS[lineKey];
                if (lineConfig) {
                    const lineColor = this.getLineColor(lineConfig);
                    // 使用chartState中的线可见性状态
                    const isVisible = chartState.lineVisibility[chartType] &&
                        chartState.lineVisibility[chartType][lineKey] !== false;

                    // 显式设置图例项的颜色
                    legendData.push({
                        name: lineConfig.name,
                        // icon: 'rect', // 使用矩形图标
                        itemStyle: {
                            color: lineColor // 显式设置颜色
                        },
                        textStyle: {
                            color: CONFIG.CHART.COLORS.legend.text
                        }
                    });

                    selected[lineConfig.name] = isVisible;

                }
            });

            // 计算图例位置（在对应图表的顶部）
            const top = parseFloat(grid.top) + CONFIG.CHART.STYLES.legend.topOffset;
            legends.push({
                data: legendData,
                selected: selected,
                top: `${top}%`,
                left: CONFIG.CHART.STYLES.legend.position.left,
                textStyle: {
                    color: CONFIG.CHART.COLORS.legend.text,
                    fontSize: CONFIG.CHART.STYLES.legend.fontSize
                },
                itemWidth: CONFIG.CHART.STYLES.legend.itemWidth,
                itemHeight: CONFIG.CHART.STYLES.legend.itemHeight,
                type: 'scroll',
                pageTextStyle: {
                    color: CONFIG.CHART.COLORS.legend.pageText
                },
                pageIconColor: CONFIG.CHART.COLORS.legend.pageIcon,
                pageIconInactiveColor: CONFIG.CHART.COLORS.legend.pageIconInactive,
                pageIconSize: CONFIG.CHART.STYLES.legend.pageIconSize
            });
        });

        return legends;
    }

    // 新增辅助方法获取线的颜色
    static getLineColor(lineConfig) {
        // 对于线图，从lineStyle获取颜色
        if (lineConfig.style && lineConfig.style.lineStyle) {
            return lineConfig.style.lineStyle.color;
        }
        // 对于K线图，使用默认颜色
        if (lineConfig.type === 'candlestick') {
            return CONFIG.CHART.COLORS.legend.default.candlestick;
        }
        // 对于柱状图，使用默认颜色
        if (lineConfig.type === 'bar') {
            return lineConfig.style && lineConfig.style.itemStyle
                ? lineConfig.style.itemStyle.color
                : CONFIG.CHART.COLORS.legend.default.bar;
        }
        // 默认颜色使用常量配置
        return CONFIG.CHART.COLORS.legend.default.line;
    }

    static processAllData(data) {
        const processedData = {
            timeData: data.kline.map(item => item[0])
        };

        // 统一处理所有线配置需要的数据源
        Object.values(LINE_CONFIGS).forEach(lineConfig => {
            const dataSource = lineConfig.dataSource;

            // 如果数据源不存在但有处理器，动态生成数据
            if (!processedData[dataSource] && lineConfig.processor) {
                processedData[dataSource] = lineConfig.processor(data);
            }

            // 如果数据源在原始数据中存在，但需要特殊处理
            if (!processedData[dataSource] && data[dataSource] && lineConfig.processor) {
                processedData[dataSource] = lineConfig.processor(data);
            }
        });

        return processedData;
    }

    static createSeries(processedData, gridCount) {
        const series = [];

        chartState.visibleCharts.forEach((chartType, gridIndex) => {
            if (gridIndex < gridCount) {
                const chartConfig = CHART_CONFIG[chartType];
                const chartSeries = this.createChartSeries(chartConfig, processedData, gridIndex);
                series.push(...chartSeries);
            }
        });

        return series;
    }

    static createChartSeries(chartConfig, processedData, gridIndex) {
        const series = [];

        chartConfig.lines.forEach(lineKey => {
            const lineConfig = LINE_CONFIGS[lineKey];
            if (!lineConfig) return;

            const lineData = processedData[lineConfig.dataSource];
            if (!lineData) return;

            const seriesItem = {
                name: lineConfig.name,
                type: lineConfig.type,
                xAxisIndex: gridIndex,
                yAxisIndex: gridIndex,
                data: lineData.map(item => lineConfig.dataMapper(item)),
                ...lineConfig.style
            };

            series.push(seriesItem);
        });

        return series;
    }

    static calculateGrids() {
        const container = document.querySelector('.chart-container');
        const containerHeight = container ? container.clientHeight - 50 : 550;

        const visibleCount = chartState.totalVisibleCharts;
        const { mainRatio, subRatio } = this.getLayoutRatios(visibleCount);
        const splitHeight = 5 * Math.max(0, visibleCount - 1);
        const availableHeight = containerHeight - splitHeight;

        const grids = [];
        let currentTop = 2;

        chartState.visibleCharts.forEach((chartType, index) => {
            const config = CHART_CONFIG[chartType];
            const isMainChart = config.type === 'main';
            const ratio = isMainChart ? mainRatio : subRatio;

            if (index > 0) currentTop += 1;

            const backgroundColor = index % 2 === 0
                ? CONFIG.CHART.COLORS.grid.areaEven
                : CONFIG.CHART.COLORS.grid.areaOdd;

            grids.push(this.createGrid(
                index,
                currentTop,
                availableHeight * ratio,
                isMainChart ? 'transparent' : backgroundColor
            ));
            currentTop += ratio * 100;
        });

        return grids;
    }

    static getLayoutRatios(visibleCount) {
        return CONFIG.CHART.LAYOUT.RATIOS[visibleCount] || CONFIG.CHART.LAYOUT.RATIOS.default;
    }

    static createGrid(index, top, height, backgroundColor = 'transparent') {
        return {
            ...CONFIG.CHART.GRID,
            top: `${top}%`,
            height: `${height}px`,
            backgroundColor
        };
    }

    static createXAxes(grids, timeData) {
        return grids.map((grid, index) => {
            const chartType = chartState.visibleCharts[index];
            const config = CHART_CONFIG[chartType];

            return {
                type: 'category',
                gridIndex: index,
                boundaryGap: false,
                axisLine: {
                    onZero: false,
                    show: index > 0,
                    lineStyle: { color: CONFIG.CHART.COLORS.border.axis }
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: {
                    color: CONFIG.CHART.COLORS.text.primary,
                    show: config.showXAxisLabel
                },
                data: timeData
            };
        });
    }

    static createYAxes(grids) {
        return grids.map((grid, index) => ({
            type: 'value',
            gridIndex: index,
            scale: true,
            position: 'right',
            splitLine: {
                lineStyle: { color: CONFIG.CHART.COLORS.grid.line }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: [
                        CONFIG.CHART.COLORS.grid.areaEven,
                        CONFIG.CHART.COLORS.grid.areaOdd
                    ]
                }
            },
            axisLabel: {
                color: CONFIG.CHART.COLORS.text.primary,
                inside: false,
                margin: 8
            },
            axisLine: {
                show: true,
                lineStyle: { color: CONFIG.CHART.COLORS.border.axis }
            }
        }));
    }

    static getDataZoomConfig(xAxisIndexes = [0], totalDataPoints = 0) {
        const defaultVisibleCount = CONFIG.CHART.VISIBLECOUT;
        let start = 0;
        let end = 100;

        if (chartState.dataZoomState.start !== undefined && chartState.dataZoomState.end !== undefined) {
            start = chartState.dataZoomState.start;
            end = chartState.dataZoomState.end;
        }
        else {
            if (totalDataPoints > defaultVisibleCount) {
                start = ((totalDataPoints - defaultVisibleCount) / totalDataPoints) * 100;
            }
        }

        return [
            {
                type: 'inside',
                xAxisIndex: xAxisIndexes,
                start: start,
                end: end
            },
            {
                show: true,
                type: 'slider',
                xAxisIndex: xAxisIndexes,
                bottom: '0.5%',
                height: CONFIG.CHART.STYLES.dataZoom.height,
                backgroundColor: CONFIG.CHART.COLORS.background.dataZoom.slider,
                borderColor: CONFIG.CHART.COLORS.border.dataZoom,
                fillerColor: CONFIG.CHART.COLORS.dataZoom.filler,
                dataBackground: {
                    areaStyle: { color: CONFIG.CHART.COLORS.dataZoom.dataArea },
                    lineStyle: { color: CONFIG.CHART.COLORS.dataZoom.dataLine }
                },
                selectedDataBackground: {
                    areaStyle: { color: CONFIG.CHART.COLORS.dataZoom.dataAreaSelected },
                    lineStyle: { color: CONFIG.CHART.COLORS.dataZoom.dataLineSelected }
                },
                handleSize: CONFIG.CHART.STYLES.dataZoom.handleSize,
                handleStyle: {
                    color: CONFIG.CHART.COLORS.dataZoom.handle,
                    borderColor: CONFIG.CHART.COLORS.dataZoom.handleBorder,
                    borderWidth: CONFIG.CHART.STYLES.border.width
                },
                moveHandleSize: CONFIG.CHART.STYLES.dataZoom.moveHandleSize,
                moveHandleStyle: {
                    color: CONFIG.CHART.COLORS.dataZoom.moveHandle
                },
                textStyle: {
                    color: CONFIG.CHART.COLORS.text.primary,
                    fontSize: CONFIG.CHART.STYLES.dataZoom.fontSize
                },
                emphasis: {
                    handleStyle: {
                        color: CONFIG.CHART.COLORS.dataZoom.handleHover,
                        borderColor: CONFIG.CHART.COLORS.dataZoom.handleBorderHover
                    }
                }
            }
        ];
    }

    static createChartTitles(grids) {
        const titles = [];
        const titleStyle = CONFIG.CHART.STYLES.chartTitle;

        chartState.visibleCharts.forEach((chartType, index) => {
            const config = CHART_CONFIG[chartType];
            const grid = grids[index];

            if (config && grid) {
                titles.push({
                    type: 'text',
                    left: titleStyle.left,
                    top: `${parseFloat(grid.top) + titleStyle.topOffset}%`,
                    style: {
                        text: config.name,
                        fill: CONFIG.CHART.COLORS.text.primary,
                        font: titleStyle.font,
                        backgroundColor: titleStyle.backgroundColor,
                        padding: titleStyle.padding,
                        borderColor: CONFIG.CHART.COLORS.border.axis,
                        borderWidth: titleStyle.borderWidth,
                        borderRadius: titleStyle.borderRadius
                    },
                    z: titleStyle.zIndex
                });
            }
        });

        return titles;
    }

}