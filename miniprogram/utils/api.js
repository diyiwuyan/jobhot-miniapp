/**
 * API 工具模块
 * 直接请求 jobhot.abcdabcd.cc 的静态 JSON 数据
 */

const app = getApp();

/**
 * 获取岗位列表（分页）
 * @param {string} channel - all | campus | intern | talk
 * @param {string} category - all | internet | foreign | game | auto_ic | finance | security | other
 * @param {number} page - 页码，从 1 开始
 * @returns {Promise<{days: Array, currentPage: number, totalPages: number}>}
 */
function fetchJobs(channel = 'all', category = 'all', page = 1) {
  const url = `${app.globalData.apiBase}/${channel}-${category}-${page}.json`;

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          resolve(res.data);
        } else if (res.statusCode === 404) {
          // 页码超出范围，返回空数据
          resolve({ days: [], currentPage: page, totalPages: page - 1 });
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 本地搜索过滤（在已加载的数据中搜索）
 * @param {Array} items - FeedItem 数组
 * @param {string} keyword - 搜索关键词
 * @returns {Array}
 */
function searchInItems(items, keyword) {
  if (!keyword) return items;
  const kw = keyword.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(kw) ||
    (item.summary && item.summary.toLowerCase().includes(kw)) ||
    (item.location && item.location.toLowerCase().includes(kw)) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(kw)))
  );
}

module.exports = {
  fetchJobs,
  searchInItems,
};
