// API服务
export class ApiService {
    static async fetchKlineData(code) {
        try {
            // const response = await fetch(`/api/kline/${code}`);
            // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // return await response.json();
            // 生成模拟数据
            const data = MockDataService.generateKlineData(code);
            return await data;
        } catch (error) {
            console.error('获取K线数据失败:', error);
            throw error;
        }
    }
}


import { CONFIG } from './constants.js';

// 模拟数据生成服务
export class MockDataService {
    static generateKlineData(code = '000001', days = 500) {
        const basePrice = 10 + Math.random() * 20; // 基础价格 10-30元
        const baseVolume = 1000000; // 基础成交量
        const data = {
            code: code,
            name: `股票${code}`,
            kline: [],
            kdj: [],
            macd: [],
            zxqs: [],
            dzx20: []
        };

        // 生成时间序列（最近days天）
        const endDate = new Date();
        const timeSeries = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(endDate);
            date.setDate(date.getDate() - i);
            timeSeries.push(date.getTime());
        }

        // 生成K线数据
        let lastClose = basePrice;
        const klineData = [];
        
        for (let i = 0; i < days; i++) {
            const time = timeSeries[i];
            
            // 生成价格波动（±5%）
            const volatility = 0.05;
            const change = (Math.random() - 0.5) * 2 * volatility * lastClose;
            const close = Math.max(0.1, lastClose + change);
            
            const high = close + Math.random() * volatility * close;
            const low = Math.max(0.1, close - Math.random() * volatility * close);
            const open = low + Math.random() * (high - low);
            
            // 生成成交量（基础成交量 ±50%）
            const volume = baseVolume * (0.5 + Math.random());
            
            klineData.push([
                time, // 时间戳
                open.toFixed(3), // 开盘价
                close.toFixed(3), // 收盘价
                low.toFixed(3),  // 最低价
                high.toFixed(3), // 最高价
                Math.round(volume) // 成交量
            ]);
            
            lastClose = close;
        }
        
        data.kline = klineData;
        
        // 生成KDJ指标数据
        data.kdj = this.generateKDJData(klineData);
        
        // 生成MACD指标数据
        data.macd = this.generateMACDData(klineData);
        
        // 生成知行趋势数据
        data.zxqs = this.generateZXQSData(klineData);
        
        // 生成单针下20数据
        data.dzx20 = this.generateDZX20Data(klineData);
        
        return data;
    }

    static generateKDJData(klineData) {
        const kdjData = [];
        
        for (let i = 0; i < klineData.length; i++) {
            const time = klineData[i][0];
            
            // 模拟KDJ值（0-100之间波动）
            const k = 50 + 30 * Math.sin(i / 14) + 10 * Math.random();
            const d = 50 + 25 * Math.sin(i / 9) + 8 * Math.random();
            const j = 3 * k - 2 * d; // J = 3K - 2D
            
            kdjData.push([
                time,
                Math.max(0, Math.min(100, k)).toFixed(2),
                Math.max(0, Math.min(100, d)).toFixed(2),
                Math.max(0, Math.min(100, j)).toFixed(2)
            ]);
        }
        
        return kdjData;
    }

    static generateMACDData(klineData) {
        const macdData = [];
        
        for (let i = 0; i < klineData.length; i++) {
            const time = klineData[i][0];
            const close = parseFloat(klineData[i][2]);
            
            // 模拟MACD指标
            const dif = 0.5 * Math.sin(i / 12) + 0.3 * Math.random();
            const dea = 0.3 * Math.sin(i / 26) + 0.2 * Math.random();
            const macd = (dif - dea) * 2;
            
            macdData.push([
                time,
                dif.toFixed(4),
                dea.toFixed(4),
                macd.toFixed(4)
            ]);
        }
        
        return macdData;
    }

    static generateZXQSData(klineData) {
        const zxqsData = [];
        
        for (let i = 0; i < klineData.length; i++) {
            const time = klineData[i][0];
            const close = parseFloat(klineData[i][2]);
            
            // 模拟知行趋势指标
            const baseTrend = 10 * Math.sin(i / 30); // 基础趋势
            const zxdq = close * 0.1 + baseTrend + 2 * Math.random(); // 知行短期
            const zxdk = close * 0.08 + baseTrend * 0.8 + 1.5 * Math.random(); // 知行多空
            
            zxqsData.push([
                time,
                zxdq.toFixed(3),
                zxdk.toFixed(3)
            ]);
        }
        
        return zxqsData;
    }

    static generateDZX20Data(klineData) {
        const dzx20Data = [];
        
        for (let i = 0; i < klineData.length; i++) {
            const time = klineData[i][0];
            
            // 模拟单针下20指标（RSV短期和长期）
            const rsvshort = 50 + 30 * Math.sin(i / 8) + 15 * Math.random();
            const rsvlong = 50 + 20 * Math.sin(i / 21) + 10 * Math.random();
            
            dzx20Data.push([
                time,
                Math.max(0, Math.min(100, rsvshort)).toFixed(2),
                Math.max(0, Math.min(100, rsvlong)).toFixed(2)
            ]);
        }
        
        return dzx20Data;
    }

    // 获取股票列表（模拟）
    static getStockList() {
        return [
            { code: '000001', name: '平安银行' },
            { code: '000002', name: '万科A' },
            { code: '000858', name: '五粮液' },
            { code: '600519', name: '贵州茅台' },
            { code: '601318', name: '中国平安' },
            { code: '000333', name: '美的集团' },
            { code: '000651', name: '格力电器' },
            { code: '600036', name: '招商银行' }
        ];
    }

    // 实时更新数据（用于模拟实时行情）
    static updateRealTimeData(baseData) {
        const lastKline = baseData.kline[baseData.kline.length - 1];
        const lastTime = lastKline[0];
        const currentTime = new Date().getTime();
        
        // 如果是同一天的数据，不重复添加
        const lastDate = new Date(lastTime);
        const currentDate = new Date(currentTime);
        if (lastDate.toDateString() === currentDate.toDateString()) {
            return baseData;
        }
        
        // 复制数据并添加新的K线
        const newData = JSON.parse(JSON.stringify(baseData));
        
        // 基于最后一条数据生成新的K线
        const lastClose = parseFloat(lastKline[2]);
        const volatility = 0.03; // 日内波动3%
        const change = (Math.random() - 0.5) * 2 * volatility * lastClose;
        const close = Math.max(0.1, lastClose + change);
        const high = close + Math.random() * volatility * close;
        const low = Math.max(0.1, close - Math.random() * volatility * close);
        const open = low + Math.random() * (high - low);
        const volume = 1000000 * (0.5 + Math.random());
        
        const newKline = [
            currentTime,
            open.toFixed(3),
            close.toFixed(3),
            low.toFixed(3),
            high.toFixed(3),
            Math.round(volume)
        ];
        
        newData.kline.push(newKline);
        
        // 保持数据长度不超过500条
        if (newData.kline.length > 500) {
            newData.kline = newData.kline.slice(-500);
        }
        
        // 重新计算指标数据
        newData.kdj = this.generateKDJData(newData.kline);
        newData.macd = this.generateMACDData(newData.kline);
        newData.zxqs = this.generateZXQSData(newData.kline);
        newData.dzx20 = this.generateDZX20Data(newData.kline);
        
        return newData;
    }
}