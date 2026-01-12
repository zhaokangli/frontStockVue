import { DataProcessor } from './data-processor.js';
import { CONFIG } from './constants.js';
import { IndicatorManager } from './indicator-manager.js'


// 线配置定义 - 每条线的数据获取和样式配置
export const LINE_CONFIGS = {
    // K线相关
    candlestick: {
        name: 'K线',
        dataSource: 'kline',
        processor: (data) => DataProcessor.processKlineData(data.kline),
        type: 'candlestick',
        dataMapper: (item) => [item.open, item.close, item.low, item.high],
        style: {
            itemStyle: {
                color: CONFIG.CHART.COLORS.negative,
                color0: CONFIG.CHART.COLORS.positive,
                borderColor: CONFIG.CHART.COLORS.negative,
                borderColor0: CONFIG.CHART.COLORS.positive,
                borderWidth: CONFIG.CHART.STYLES.border.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    // 趋势线
    zxdq: {
        name: '知行短期',
        dataSource: 'zxqs',
        processor: (data) => DataProcessor.processIndicatorData(data.zxqs, ['zxdq', 'zxdk']),
        type: 'line',
        dataMapper: (item) => item.zxdq,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.zxdq,
                width: CONFIG.CHART.STYLES.line.zxdqWidth
            }
        },
        defaultVisible: true, // 默认显示
    },

    zxdk: {
        name: '知行多空',
        dataSource: 'zxqs',
        processor: (data) => DataProcessor.processIndicatorData(data.zxqs, ['zxdq', 'zxdk']),
        type: 'line',
        dataMapper: (item) => item.zxdk,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.zxdk,
                width: CONFIG.CHART.STYLES.line.zxdkWidth
            }
        },
        defaultVisible: true, // 默认显示
    },

    bbi: {
        name: 'BBI',
        dataSource: 'bbi',
        processor: (data) => DataProcessor.processIndicatorData(data.bbi, ['bbi']),
        type: 'line',
        dataMapper: (value) => value.bbi,
        style: {
            symbol: 'none',
            lineStyle: {
                color: '#f50de9',
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: false, // 默认不显示
    },
    closeMA60: {
        name: '60MA',
        dataSource: 'closeMA60',
        processor: (data) => {
            return IndicatorManager.calculateMA(data.kline.map(item => parseFloat(item[2])), 60);
        },
        type: 'line',
        dataMapper: (value) => value,
        style: {
            symbol: 'none',
            lineStyle: {
                color: '#11d5f3',
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: false, // 默认不显示
    },

    // 成交量
    volume: {
        name: '成交量',
        dataSource: 'kline',
        processor: (data) => DataProcessor.processKlineData(data.kline),
        type: 'bar',
        dataMapper: (item) => ({
            value: item.volume,
            itemStyle: {
                color: item.close <= item.open
                    ? CONFIG.CHART.COLORS.positive
                    : CONFIG.CHART.COLORS.negative
            }
        }),
        defaultVisible: true, // 默认显示
    },
    volumeMA5: {
        name: '成交量5日均线',
        dataSource: 'volumeMA5',
        processor: (data) => {
            if (!data.kline) return [];
            const volumes = data.kline.map(item => parseFloat(item[5]));
            const maValues = IndicatorManager.calculateMA(volumes, 5);
            // 对计算结果进行取整处理
            return maValues.map(value => value !== null ? Math.round(value) : null);
        },
        type: 'line',
        dataMapper: (value) => value,
        style: {
            symbol: 'none',
            lineStyle: {
                color: '#fbfbfb',
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: false, // 默认不显示
    },

    volumeMA10: {
        name: '成交量10日均线',
        dataSource: 'volumeMA10',
        processor: (data) => {
            if (!data.kline) return [];
            const volumes = data.kline.map(item => parseFloat(item[5]));
            const maValues = IndicatorManager.calculateMA(volumes, 10);
            return maValues.map(value => value !== null ? Math.round(value) : null);
        },
        type: 'line',
        dataMapper: (value) => value,
        style: {
            symbol: 'none',
            lineStyle: {
                color: '#d6f511',
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: false, // 默认不显示
    },

    volumeMA40: {
        name: '成交量40日均线',
        dataSource: 'volumeMA40',
        processor: (data) => {
            if (!data.kline) return [];
            const volumes = data.kline.map(item => parseFloat(item[5]));
            const maValues = IndicatorManager.calculateMA(volumes, 40);
            return maValues.map(value => value !== null ? Math.round(value) : null);
        },
        type: 'line',
        dataMapper: (value) => value,
        style: {
            symbol: 'none',
            lineStyle: {
                color: '#e72e15',
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },
    // KDJ指标
    k: {
        name: 'K',
        dataSource: 'kdj',
        processor: (data) => DataProcessor.processIndicatorData(data.kdj, ['k', 'd', 'j']),
        type: 'line',
        dataMapper: (item) => item.k,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.kdj[0],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    d: {
        name: 'D',
        dataSource: 'kdj',
        processor: (data) => DataProcessor.processIndicatorData(data.kdj, ['k', 'd', 'j']),
        type: 'line',
        dataMapper: (item) => item.d,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.kdj[1],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    j: {
        name: 'J',
        dataSource: 'kdj',
        processor: (data) => DataProcessor.processIndicatorData(data.kdj, ['k', 'd', 'j']),
        type: 'line',
        dataMapper: (item) => item.j,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.kdj[2],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    // MACD指标
    dif: {
        name: 'DIF',
        dataSource: 'macd',
        processor: (data) => DataProcessor.processIndicatorData(data.macd, ['dif', 'dea', 'macd']),
        type: 'line',
        dataMapper: (item) => item.dif,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.macd[0],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    dea: {
        name: 'DEA',
        dataSource: 'macd',
        processor: (data) => DataProcessor.processIndicatorData(data.macd, ['dif', 'dea', 'macd']),
        type: 'line',
        dataMapper: (item) => item.dea,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.macd[1],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    macd: {
        name: 'MACD',
        dataSource: 'macd',
        processor: (data) => DataProcessor.processIndicatorData(data.macd, ['dif', 'dea', 'macd']),
        type: 'bar',
        dataMapper: (item) => ({
            value: item.macd,
            itemStyle: {
                color: item.macd >= 0
                    ? CONFIG.CHART.COLORS.negative
                    : CONFIG.CHART.COLORS.positive
            }
        }),
        defaultVisible: true, // 默认显示
    },

    // 单针下20指标
    rsvshort: {
        name: '短期波动',
        dataSource: 'dzx20',
        processor: (data) => DataProcessor.processIndicatorData(data.dzx20, ['rsvshort', 'rsvlong']),
        type: 'line',
        dataMapper: (item) => item.rsvshort,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.dzx20[0],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    rsvlong: {
        name: '长期波动',
        dataSource: 'dzx20',
        processor: (data) => DataProcessor.processIndicatorData(data.dzx20, ['rsvshort', 'rsvlong']),
        type: 'line',
        dataMapper: (item) => item.rsvlong,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.dzx20[1],
                width: CONFIG.CHART.STYLES.line.width
            }
        },
        defaultVisible: true, // 默认显示
    },

    // 水平线
    level20: {
        name: '20水平线',
        dataSource: 'dzx20',
        type: 'line',
        dataMapper: () => 20,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.dzx20Lines,
                width: 1
            }
        },
        defaultVisible: true, // 默认显示
    },

    level80: {
        name: '80水平线',
        dataSource: 'dzx20',
        type: 'line',
        dataMapper: () => 80,
        style: {
            symbol: 'none',
            lineStyle: {
                color: CONFIG.CHART.COLORS.dzx20Lines,
                width: 1
            }
        },
        defaultVisible: true, // 默认显示
    }
};

// 图表配置 - 现在只需要配置包含哪些线
export const CHART_CONFIG = {
    main: {
        name: 'K线图',
        type: 'main',
        lines: ['candlestick', 'zxdq', 'zxdk', 'bbi', 'closeMA60'],
        defaultVisibleLines: ['candlestick', 'zxdq', 'zxdk'],
        legend: ['K线', LINE_CONFIGS.zxdq.name, LINE_CONFIGS.zxdk.name, LINE_CONFIGS.bbi.name, LINE_CONFIGS.closeMA60.name], // 主图图例
        alwaysVisible: true,
        showXAxisLabel: true,
        defaultVisible: true,
        showLegend: true // 新增：控制是否显示图例
    },
    volume: {
        name: '成交量',
        type: 'sub',
        lines: ['volume', 'volumeMA5', 'volumeMA10', 'volumeMA40'],
        defaultVisibleLines: ['volume', 'volumeMA40'],
        legend: [LINE_CONFIGS.volume.name, '成交量5日均线', '成交量10日均线', '成交量40日均线'], // 成交量图例
        defaultVisible: true,
        showLegend: true
    },
    kdj: {
        name: 'KDJ',
        type: 'sub',
        lines: ['k', 'd', 'j'],
        defaultVisibleLines: ['k', 'd', 'j'],
        legend: ['K', 'D', 'J'], // KDJ图例
        defaultVisible: true,
        showLegend: true
    },
    macd: {
        name: 'MACD',
        type: 'sub',
        lines: ['dif', 'dea', 'macd'],
        defaultVisibleLines: ['dif', 'dea', 'macd'],
        legend: ['DIF', 'DEA', 'MACD'], // MACD图例
        defaultVisible: false,
        showLegend: true
    },
    dzx20: {
        name: '单针下20',
        type: 'sub',
        lines: ['rsvshort', 'rsvlong', 'level20', 'level80'],
        efaultVisibleLines: ['rsvshort', 'rsvlong', 'level20', 'level80'],
        legend: ['短期波动', '长期波动'], // 单针下20图例
        defaultVisible: false,
        showLegend: true
    }
};