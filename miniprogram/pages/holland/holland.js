// 霍兰德职业兴趣测试 (RIASEC)
// 48题，每题5分制，6个维度各8题

const questions = [
  // R - 现实型 (Realistic)
  { id: 1, text: '我喜欢动手修理或组装东西', type: 'R' },
  { id: 2, text: '我喜欢户外活动或体育运动', type: 'R' },
  { id: 3, text: '我喜欢操作机器或使用工具', type: 'R' },
  { id: 4, text: '我喜欢做手工或制作实物', type: 'R' },
  { id: 5, text: '我更喜欢具体的任务而非抽象的讨论', type: 'R' },
  { id: 6, text: '我喜欢在实验室或车间工作', type: 'R' },
  { id: 7, text: '我对机械原理感兴趣', type: 'R' },
  { id: 8, text: '我喜欢种植或照料动植物', type: 'R' },

  // I - 研究型 (Investigative)
  { id: 9, text: '我喜欢分析问题和寻找规律', type: 'I' },
  { id: 10, text: '我对科学实验和研究感兴趣', type: 'I' },
  { id: 11, text: '我喜欢阅读科技类书籍或文章', type: 'I' },
  { id: 12, text: '我喜欢独立思考复杂问题', type: 'I' },
  { id: 13, text: '我对数据分析和统计感兴趣', type: 'I' },
  { id: 14, text: '我喜欢探索事物背后的原因', type: 'I' },
  { id: 15, text: '我享受解决数学或逻辑难题', type: 'I' },
  { id: 16, text: '我喜欢观察和记录现象', type: 'I' },

  // A - 艺术型 (Artistic)
  { id: 17, text: '我喜欢绘画、音乐或写作等创作活动', type: 'A' },
  { id: 18, text: '我喜欢欣赏艺术作品或表演', type: 'A' },
  { id: 19, text: '我喜欢用独特的方式表达自己', type: 'A' },
  { id: 20, text: '我对设计和美学有较高的追求', type: 'A' },
  { id: 21, text: '我喜欢自由灵活的工作方式', type: 'A' },
  { id: 22, text: '我有丰富的想象力', type: 'A' },
  { id: 23, text: '我喜欢参与戏剧、摄影或电影相关活动', type: 'A' },
  { id: 24, text: '我对时尚或室内设计感兴趣', type: 'A' },

  // S - 社会型 (Social)
  { id: 25, text: '我喜欢帮助他人解决问题', type: 'S' },
  { id: 26, text: '我喜欢与人交流和合作', type: 'S' },
  { id: 27, text: '我对教育或培训工作感兴趣', type: 'S' },
  { id: 28, text: '我善于倾听他人的想法和感受', type: 'S' },
  { id: 29, text: '我喜欢参加志愿服务或公益活动', type: 'S' },
  { id: 30, text: '我关心社会问题和他人的福祉', type: 'S' },
  { id: 31, text: '我喜欢组织团队活动', type: 'S' },
  { id: 32, text: '我在团队中常常扮演协调者的角色', type: 'S' },

  // E - 企业型 (Enterprising)
  { id: 33, text: '我喜欢说服他人接受我的观点', type: 'E' },
  { id: 34, text: '我喜欢领导和管理团队', type: 'E' },
  { id: 35, text: '我对商业和创业感兴趣', type: 'E' },
  { id: 36, text: '我喜欢竞争和挑战', type: 'E' },
  { id: 37, text: '我善于制定计划和目标', type: 'E' },
  { id: 38, text: '我喜欢做决策和承担责任', type: 'E' },
  { id: 39, text: '我对市场营销或销售感兴趣', type: 'E' },
  { id: 40, text: '我喜欢参与辩论或演讲', type: 'E' },

  // C - 常规型 (Conventional)
  { id: 41, text: '我喜欢按照规则和流程做事', type: 'C' },
  { id: 42, text: '我擅长整理和归类信息', type: 'C' },
  { id: 43, text: '我喜欢处理数据和表格', type: 'C' },
  { id: 44, text: '我注重细节和准确性', type: 'C' },
  { id: 45, text: '我喜欢有条理、有计划的生活', type: 'C' },
  { id: 46, text: '我对财务或会计工作感兴趣', type: 'C' },
  { id: 47, text: '我喜欢使用办公软件处理文档', type: 'C' },
  { id: 48, text: '我喜欢在稳定有序的环境中工作', type: 'C' }
]

// 各类型描述
const typeDescriptions = {
  R: {
    name: '现实型 (Realistic)',
    short: '动手实践者',
    desc: '喜欢与物打交道，动手能力强，偏好具体的、有形的工作任务。',
    careers: '工程师、技术员、建筑师、机械师、农艺师、厨师、运动员'
  },
  I: {
    name: '研究型 (Investigative)',
    short: '思考探索者',
    desc: '喜欢观察、分析和解决问题，偏好独立的智力活动。',
    careers: '科学家、程序员、数据分析师、医生、心理学家、经济学家'
  },
  A: {
    name: '艺术型 (Artistic)',
    short: '创意表达者',
    desc: '喜欢创造和自我表达，偏好自由灵活、富有想象力的工作。',
    careers: '设计师、作家、音乐家、摄影师、导演、广告创意、记者'
  },
  S: {
    name: '社会型 (Social)',
    short: '助人服务者',
    desc: '喜欢与人交往、帮助他人，偏好合作性的社会服务工作。',
    careers: '教师、咨询师、社工、护士、人力资源、公关、客服经理'
  },
  E: {
    name: '企业型 (Enterprising)',
    short: '领导开拓者',
    desc: '喜欢领导、说服和管理，偏好有竞争性和影响力的工作。',
    careers: '企业管理者、销售经理、律师、政治家、创业者、投资人'
  },
  C: {
    name: '常规型 (Conventional)',
    short: '规范执行者',
    desc: '喜欢有序、规范的工作，偏好明确的规则和流程。',
    careers: '会计师、审计师、行政管理、银行职员、档案管理、质检员'
  }
}

Page({
  data: {
    stage: 'intro', // intro | testing | result
    questions: questions,
    currentIndex: 0,
    answers: {},
    progress: 0,
    result: null,
    totalQuestions: questions.length
  },

  onLoad() {
    // 检查是否有未完成的测试
    const saved = wx.getStorageSync('holland_progress')
    if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
      this.setData({
        answers: saved.answers,
        currentIndex: saved.currentIndex || 0
      })
    }
  },

  startTest() {
    this.setData({
      stage: 'testing',
      currentIndex: 0,
      answers: {},
      progress: 0
    })
  },

  resumeTest() {
    const progress = (Object.keys(this.data.answers).length / this.data.totalQuestions) * 100
    this.setData({
      stage: 'testing',
      progress: progress
    })
  },

  selectAnswer(e) {
    const { questionId, score } = e.currentTarget.dataset
    const answers = { ...this.data.answers }
    answers[questionId] = score

    const answeredCount = Object.keys(answers).length
    const progress = (answeredCount / this.data.totalQuestions) * 100

    this.setData({
      answers: answers,
      progress: progress
    })

    // 保存进度
    wx.setStorageSync('holland_progress', {
      answers: answers,
      currentIndex: this.data.currentIndex
    })

    // 自动跳转下一题
    if (this.data.currentIndex < this.data.totalQuestions - 1) {
      setTimeout(() => {
        this.setData({ currentIndex: this.data.currentIndex + 1 })
      }, 300)
    }
  },

  prevQuestion() {
    if (this.data.currentIndex > 0) {
      this.setData({ currentIndex: this.data.currentIndex - 1 })
    }
  },

  nextQuestion() {
    if (this.data.currentIndex < this.data.totalQuestions - 1) {
      this.setData({ currentIndex: this.data.currentIndex + 1 })
    }
  },

  submitTest() {
    const { answers } = this.data
    if (Object.keys(answers).length < this.data.totalQuestions) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    // 计算各维度得分
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    questions.forEach(q => {
      if (answers[q.id]) {
        scores[q.type] += answers[q.id]
      }
    })

    // 排序得到前三类型
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([type, score]) => ({
        type,
        score,
        maxScore: 40, // 8题 * 5分
        percentage: Math.round((score / 40) * 100),
        ...typeDescriptions[type]
      }))

    const result = {
      topThree: sorted.slice(0, 3),
      allScores: sorted,
      hollandCode: sorted.slice(0, 3).map(s => s.type).join(''),
      testDate: new Date().toLocaleDateString('zh-CN')
    }

    this.setData({
      stage: 'result',
      result: result
    })

    // 保存结果
    wx.setStorageSync('holland_result', result)
    // 清除进度
    wx.removeStorageSync('holland_progress')
  },

  retakeTest() {
    this.setData({
      stage: 'intro',
      answers: {},
      currentIndex: 0,
      progress: 0,
      result: null
    })
    wx.removeStorageSync('holland_result')
  },

  viewLastResult() {
    const result = wx.getStorageSync('holland_result')
    if (result) {
      this.setData({ stage: 'result', result: result })
    }
  },

  onShareAppMessage() {
    const { result } = this.data
    if (result) {
      return {
        title: `我的霍兰德职业代码是 ${result.hollandCode}，来测测你的！`,
        path: '/pages/holland/holland'
      }
    }
    return {
      title: '霍兰德职业兴趣测试 - 找到适合你的方向',
      path: '/pages/holland/holland'
    }
  }
})
