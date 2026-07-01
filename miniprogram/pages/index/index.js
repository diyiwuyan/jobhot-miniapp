const { fetchJobs, searchInItems } = require('../../utils/api');

// 标签映射
const CHANNEL_MAP = { campus: '校招', intern: '实习', talk: '宣讲会' };
const COMPANY_TYPE_MAP = {
  state: '央国企', bank: '银行', institution: '事业单位',
  foreign: '外企', private: '民企',
};

Page({
  data: {
    days: [],         // 按日期分组的数据 [{date, items}]
    jobs: [],         // 扁平化的岗位列表（用于搜索）
    loading: false,
    noMore: false,
    keyword: '',
    activeChannel: 'all',
    activeCategory: 'all',
    page: 1,
    totalPages: 1,
    isSearching: false,
  },

  onLoad() {
    this.loadJobs(true);
  },

  onPullDownRefresh() {
    this.loadJobs(true);
  },

  onReachBottom() {
    if (this.data.isSearching) return; // 搜索模式不分页
    if (!this.data.noMore && !this.data.loading) {
      this.loadJobs(false);
    }
  },

  // 加载岗位数据
  async loadJobs(reset = false) {
    if (this.data.loading) return;

    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true, isSearching: false });

    try {
      const res = await fetchJobs(this.data.activeChannel, this.data.activeCategory, page);

      // 处理数据，添加标签映射
      const newDays = (res.days || []).map(day => ({
        ...day,
        items: day.items.map(item => ({
          ...item,
          channelLabel: CHANNEL_MAP[item.channel] || item.channel,
          companyTypeLabel: COMPANY_TYPE_MAP[item.companyType] || item.companyType,
        })),
      }));

      // 扁平化用于搜索
      const newJobs = newDays.reduce((acc, day) => [...acc, ...day.items], []);

      if (reset) {
        this.setData({
          days: newDays,
          jobs: newJobs,
          page: 2,
          totalPages: res.totalPages || 1,
          noMore: (res.currentPage || 1) >= (res.totalPages || 1),
          loading: false,
        });
      } else {
        // 追加：合并日期分组
        const mergedDays = this.mergeDays(this.data.days, newDays);
        this.setData({
          days: mergedDays,
          jobs: [...this.data.jobs, ...newJobs],
          page: page + 1,
          noMore: (res.currentPage || page) >= (res.totalPages || 1),
          loading: false,
        });
      }
    } catch (err) {
      console.error('加载岗位失败:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败，请检查网络', icon: 'none' });
    }

    wx.stopPullDownRefresh();
  },

  // 合并日期分组（追加加载时，同一天的数据合并）
  mergeDays(existingDays, newDays) {
    const dayMap = new Map();
    for (const day of existingDays) {
      dayMap.set(day.date, { ...day, items: [...day.items] });
    }
    for (const day of newDays) {
      if (dayMap.has(day.date)) {
        dayMap.get(day.date).items.push(...day.items);
      } else {
        dayMap.set(day.date, { ...day, items: [...day.items] });
      }
    }
    return [...dayMap.values()];
  },

  // 搜索
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  onSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      this.clearSearch();
      return;
    }

    // 在已加载的数据中搜索
    const filtered = searchInItems(this.data.jobs, keyword);
    const searchDays = this.groupByDate(filtered);

    this.setData({
      days: searchDays,
      isSearching: true,
      noMore: true,
    });
  },

  clearSearch() {
    this.setData({ keyword: '', isSearching: false });
    this.loadJobs(true);
  },

  // 将扁平列表按日期分组
  groupByDate(items) {
    const groups = new Map();
    for (const item of items) {
      const dateKey = this.formatDateGroup(item.createdAt);
      if (!groups.has(dateKey)) groups.set(dateKey, []);
      groups.get(dateKey).push(item);
    }
    return [...groups.entries()].map(([date, dayItems]) => ({ date, items: dayItems }));
  },

  formatDateGroup(dateStr) {
    if (!dateStr) return '未知日期';
    const date = new Date(dateStr);
    // 转北京时间
    const bjTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    return `${bjTime.getUTCMonth() + 1}月${bjTime.getUTCDate()}日`;
  },

  // 筛选
  setChannel(e) {
    const channel = e.currentTarget.dataset.channel;
    this.setData({ activeChannel: channel });
    this.loadJobs(true);
  },

  setCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    this.loadJobs(true);
  },

  // 跳转详情
  goDetail(e) {
    const { index, dayindex } = e.currentTarget.dataset;
    const job = this.data.days[dayindex].items[index];
    // 将岗位数据通过全局临时存储传递
    getApp().globalData._tempJob = job;
    wx.navigateTo({
      url: `/pages/detail/detail?url=${encodeURIComponent(job.url || '')}`,
    });
  },

  onShareAppMessage() {
    return {
      title: 'JOBHOT - 更好用的大学生求职站',
      path: '/pages/index/index',
    };
  },
});
