const CHANNEL_MAP = { campus: '校招', intern: '实习', talk: '宣讲会' };
const COMPANY_TYPE_MAP = {
  state: '央国企', bank: '银行', institution: '事业单位',
  foreign: '外企', private: '民企',
};

Page({
  data: {
    job: null,
    url: '',
  },

  onLoad(options) {
    const url = decodeURIComponent(options.url || '');
    this.setData({ url });

    // 从全局临时数据获取岗位信息
    const app = getApp();
    const job = app.globalData._tempJob;
    if (job) {
      this.setData({
        job: {
          ...job,
          channelLabel: CHANNEL_MAP[job.channel] || job.channel,
          companyTypeLabel: COMPANY_TYPE_MAP[job.companyType] || job.companyType,
          dateLabel: this.formatDate(job.createdAt),
        },
      });
      // 清除临时数据
      app.globalData._tempJob = null;
    } else {
      // 如果没有临时数据（比如从分享进入），显示简要信息
      wx.showToast({ title: '请从列表进入查看', icon: 'none' });
    }
  },

  // 复制链接
  copyLink() {
    if (this.data.url) {
      wx.setClipboardData({
        data: this.data.url,
        success: () => wx.showToast({ title: '链接已复制', icon: 'success' }),
      });
    } else {
      wx.showToast({ title: '暂无原文链接', icon: 'none' });
    }
  },

  // 在浏览器打开
  openInBrowser() {
    const webUrl = `${getApp().globalData.baseUrl}`;
    wx.setClipboardData({
      data: webUrl,
      success: () => wx.showToast({ title: '网址已复制，请在浏览器打开', icon: 'none' }),
    });
  },

  onShareAppMessage() {
    const job = this.data.job;
    return {
      title: job ? job.title : 'JOBHOT - 大学生求职信息',
      path: `/pages/index/index`,
    };
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const bjTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    return `${bjTime.getUTCMonth() + 1}月${bjTime.getUTCDate()}日`;
  },
});
