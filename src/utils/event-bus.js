/**
 * 全局事件总线，统计管理事件类型，避免命名冲突
 */

import Vue from 'vue';

export const eventTypes = {
  CUSTOM_CLICK: 'custom-click',
  REPORT_SEND: 'report-send',
  CHART_SEND: 'chart-send'
};

export const eventBus = new Vue();

export default eventBus;
