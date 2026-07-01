/**
 * 订阅页面
 * 备案完成前：订阅设置保存在本地 Storage
 * 备案完成后：可对接 Supabase 实现服务端推送
 */

const STORAGE_KEY = 'jobhot_subscription';

Page({
  data: {
    keywords: '',
    cityOptions: ['北京', '上海', '广州', '深圳', '杭州', '成都', '南京', '武汉', '西安', '重庆'],
    companyTypeOptions: [
      { label: '央国企', value: 'state' },
      { label: '银行', value: 'bank' },
      { label: '外企', value: 'foreign' },
      { label: '互联网', value: 'internet' },
      { label: '事业单位', value: 'institution' },
    ],
    selectedCities: {},
    selectedChannels: {},
    selectedCompanyTypes: {},
    subscribed: false,
  },

  onLoad() {
    this.loadSubscription();
  },

  // 从本地存储加载订阅设置
  loadSubscription() {
    try {
      const saved = wx.getStorageSync(STORAGE_KEY);
      if (saved) {
        this.setData({
          keywords: saved.keywords || '',
          selectedCities: saved.cities || {},
          selectedChannels: saved.channels || {},
          selectedCompanyTypes: saved.companyTypes || {},
          subscribed: true,
        });
      }
    } catch (err) {
      console.log('读取订阅设置失败:', err);
    }
  },

  // 输入关键词
  onKeywordsInput(e) {
    this.setData({ keywords: e.detail.value });
  },

  // 切换城市
  toggleCity(e) {
    const city = e.currentTarget.dataset.city;
    const selected = { ...this.data.selectedCities };
    selected[city] = !selected[city];
    if (!selected[city]) delete selected[city];
    this.setData({ selectedCities: selected });
  },

  // 切换频道
  toggleChannel(e) {
    const channel = e.currentTarget.dataset.channel;
    const selected = { ...this.data.selectedChannels };
    selected[channel] = !selected[channel];
    if (!selected[channel]) delete selected[channel];
    this.setData({ selectedChannels: selected });
  },

  // 切换企业类型
  toggleCompanyType(e) {
    const type = e.currentTarget.dataset.type;
    const selected = { ...this.data.selectedCompanyTypes };
    selected[type] = !selected[type];
    if (!selected[type]) delete selected[type];
    this.setData({ selectedCompanyTypes: selected });
  },

  // 保存订阅
  handleSubscribe() {
    const subscriptionData = {
      keywords: this.data.keywords,
      cities: this.data.selectedCities,
      channels: this.data.selectedChannels,
      companyTypes: this.data.selectedCompanyTypes,
      updatedAt: new Date().toISOString(),
    };

    try {
      wx.setStorageSync(STORAGE_KEY, subscriptionData);
      this.setData({ subscribed: true });
      wx.showToast({ title: '设置已保存', icon: 'success' });
    } catch (err) {
      console.error('保存订阅失败:', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  // 取消订阅
  handleUnsubscribe() {
    wx.showModal({
      title: '确认取消',
      content: '取消后将不再收到岗位提醒',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync(STORAGE_KEY);
          this.setData({
            keywords: '',
            selectedCities: {},
            selectedChannels: {},
            selectedCompanyTypes: {},
            subscribed: false,
          });
          wx.showToast({ title: '已取消订阅', icon: 'success' });
        }
      },
    });
  },
});
