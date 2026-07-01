const CHANNEL_MAP = { campus: '校招', intern: '实习', talk: '宣讲会' };
const COMPANY_TYPE_MAP = {
  state: '央国企', bank: '银行', institution: '事业单位',
  foreign: '外企', private: '民企',
};

Page({
  data: {
    job: null,
    url: '',
    isFavorited: false,
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
          deadlineLabel: job.deadline ? this.formatDate(job.deadline) : '',
        },
      });
      // 清除临时数据
      app.globalData._tempJob = null;

      // 检查是否已收藏
      this.checkFavorite(job.id);
    } else {
      wx.showToast({ title: '请从列表进入查看', icon: 'none' });
    }
  },

  // 检查收藏状态
  checkFavorite(jobId) {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ isFavorited: favorites.includes(jobId) });
  },

  // 切换收藏
  toggleFavorite() {
    const { job, isFavorited } = this.data;
    if (!job) return;

    let favorites = wx.getStorageSync('favorites') || [];

    if (isFavorited) {
      favorites = favorites.filter(id => id !== job.id);
      wx.showToast({ title: '已取消收藏', icon: 'success' });
    } else {
      favorites.unshift(job.id);
      // 同时保存岗位信息用于收藏列表展示
      let favJobs = wx.getStorageSync('favoriteJobs') || {};
      favJobs[job.id] = {
        id: job.id,
        title: job.title,
        source: job.source,
        channel: job.channel,
        companyType: job.companyType,
        location: job.location,
        url: this.data.url,
        createdAt: job.createdAt,
      };
      wx.setStorageSync('favoriteJobs', favJobs);
      wx.showToast({ title: '已收藏', icon: 'success' });
    }

    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorited: !isFavorited });
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
