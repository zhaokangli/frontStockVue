import { CHART_CONFIG } from './chart-config.js';
import { chartState } from './state-manager.js';

// 开关生成器
export class SwitchGenerator {
    static init() {
        this.generateChartSwitches();
        this.setupToggleAllButton();
    }

    // 生成副图开关
    static generateChartSwitches() {
        const container = document.getElementById('chartSwitchesContainer');
        if (!container) return;

        container.innerHTML = ''; // 清空容器

        // 遍历所有图表配置，为主图之外的图表生成开关
        Object.keys(CHART_CONFIG).forEach(chartType => {
            if (chartType !== 'main') {
                const config = CHART_CONFIG[chartType];
                const switchElement = this.createSwitchElement(chartType, config);
                container.appendChild(switchElement);
            }
        });
    }

    // 创建单个开关元素
    static createSwitchElement(chartType, config) {
        const label = document.createElement('label');
        label.className = 'switch';
        
        // 修改：使用chartState中的当前可见性状态，而不是默认checked
        const isChecked = chartState.visibility[chartType];
        
        label.innerHTML = `
            <input type="checkbox" id="${chartType}Switch" ${isChecked ? 'checked' : ''}>
            <span class="slider">${config.name}</span>
        `;
        
        return label;
    }

    // 设置"全部切换"按钮功能
    static setupToggleAllButton() {
        const toggleAllBtn = document.getElementById('toggleAllCharts');
        if (!toggleAllBtn) return;

        // 修改：计算当前有多少个副图是显示的
        let allVisible = this.areAllSubChartsVisible();
        
        toggleAllBtn.addEventListener('click', () => {
            allVisible = !allVisible;
            
            // 切换所有副图开关状态
            Object.keys(CHART_CONFIG).forEach(chartType => {
                if (chartType !== 'main') {
                    const switchElement = document.getElementById(`${chartType}Switch`);
                    if (switchElement) {
                        switchElement.checked = allVisible;
                        // 触发change事件
                        switchElement.dispatchEvent(new Event('change'));
                    }
                }
            });
            
            toggleAllBtn.textContent = allVisible ? '全部隐藏' : '全部显示';
        });

        // 初始化按钮文本
        toggleAllBtn.textContent = allVisible ? '全部隐藏' : '全部显示';
    }

    // 新增：检查是否所有副图都是可见的
    static areAllSubChartsVisible() {
        const subCharts = Object.keys(CHART_CONFIG).filter(chartType => chartType !== 'main');
        return subCharts.every(chartType => chartState.visibility[chartType]);
    }

    // 获取当前所有开关状态
    static getSwitchStates() {
        const states = {};
        
        Object.keys(CHART_CONFIG).forEach(chartType => {
            if (chartType !== 'main') {
                const switchElement = document.getElementById(`${chartType}Switch`);
                states[chartType] = switchElement ? switchElement.checked : true;
            }
        });
        
        return states;
    }

    // 设置特定开关状态
    static setSwitchState(chartType, isVisible) {
        const switchElement = document.getElementById(`${chartType}Switch`);
        if (switchElement) {
            switchElement.checked = isVisible;
        }
    }

    // 重置所有开关到默认状态
    static resetSwitches() {
        Object.keys(CHART_CONFIG).forEach(chartType => {
            if (chartType !== 'main') {
                const config = CHART_CONFIG[chartType];
                const switchElement = document.getElementById(`${chartType}Switch`);
                if (switchElement) {
                    // 修改：使用配置中的defaultVisible属性
                    const defaultVisible = config.defaultVisible !== undefined 
                        ? config.defaultVisible 
                        : true;
                    switchElement.checked = defaultVisible;
                }
            }
        });
        
        const toggleAllBtn = document.getElementById('toggleAllCharts');
        if (toggleAllBtn) {
            // 重置后重新计算按钮文本
            const allVisible = this.areAllSubChartsVisible();
            toggleAllBtn.textContent = allVisible ? '全部隐藏' : '全部显示';
        }
    }
}