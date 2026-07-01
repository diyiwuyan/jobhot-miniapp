App({
  onLaunch() {
    // 检查网络状态
    wx.getNetworkType({
      success: (res) => {
        if (res.networkType === 'none') {
          wx.showToast({ title: '当前无网络连接', icon: 'none' });
        }
      },
    });
  },

  globalData: {
    baseUrl: 'https://jobhot.abcdabcd.cc',
    apiBase: 'https://jobhot.abcdabcd.cc/api/feed',
  },
});
