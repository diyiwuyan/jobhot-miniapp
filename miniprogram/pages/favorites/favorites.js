const CHANNEL_MAP = { campus: '校招', intern: '实习', talk: '宣讲会' };
const COMPANY_TYPE_MAP = {
  state: '央国企', bank: '银行', institution: '事业单位',
  foreign: '外企', private: '民企',
};

Page({
  data: {
    favorites: [],
    isEmpty: true,
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    const favoriteIds = wx.getStorageSync('favorites') || [];
    const favoriteJobs = wx.getStorageSync('favoriteJobs') || {};

    const favorites = favoriteIds
      .map(id => favoriteJobs[id])
      .filter(Boolean)
      .map(job => ({
        ...job,
        channelLabel: CHANNEL_MAP[job.channel] || job.channel,
        companyTypeLabel: COMPANY_TYPE_MAP[job.companyType] || job.companyType,
      }));

    this.setData({
      favorites,
      isEmpty: favorites.length === 0,
    });
  },

  // 点击进入详情
  goDetail(e) {
    const { item } = e.currentTarget.dataset;
    const app = getApp();
    app.globalData._tempJob = item;
    wx.navigateTo({
      url: `/pages/detail/detail?url=${encodeURIComponent(item.url || '')}`,
    });
  },

  // 取消收藏
  removeFavorite(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '取消收藏',
      content: '确定要移除这个岗位吗？',
      success: (res) => {
        if (res.confirm) {
          let favoriteIds = wx.getStorageSync('favorites') || [];
          let favoriteJobs = wx.getStorageSync('favoriteJobs') || {};
          favoriteIds = favoriteIds.filter(fid => fid !== id);
          delete favoriteJobs[id];
          wx.setStorageSync('favorites', favoriteIds);
          wx.setStorageSync('favoriteJobs', favoriteJobs);
          this.loadFavorites();
          wx.showToast({ title: '已移除', icon: 'success' });
        }
      },
    });
  },

  // 清空全部
  clearAll() {
    if (this.data.isEmpty) return;
    wx.showModal({
      title: '清空收藏',
      content: '确定要清空所有收藏的岗位吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('favorites');
          wx.removeStorageSync('favoriteJobs');
          this.loadFavorites();
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      },
    });
  },

  onShareAppMessage() {
    return {
      title: 'JOBHOT - 大学生求职信息聚合',
      path: '/pages/index/index',
    };
  },
});
