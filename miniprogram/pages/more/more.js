Page({
  data: {},

  goToPage(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({ url });
  },

  copyWebUrl() {
    wx.setClipboardData({
      data: 'https://jobhot.abcdabcd.cc',
      success: () => {
        wx.showToast({
          title: '网址已复制',
          icon: 'success',
        });
      },
    });
  },

  onShareAppMessage() {
    return {
      title: 'JOBHOT - 更好用的大学生求职站',
      path: '/pages/index/index',
    };
  },
});
