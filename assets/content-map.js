// assets/content-map.js

const contentSections = [
  {
    id: 'home',
    title: '首页',
    tags: ['导航', '爱游戏', '推荐'],
    keywords: ['欢迎', '爱游戏平台', '热门内容'],
    url: 'https://app-official-aiyouxi.com.cn'
  },
  {
    id: 'games',
    title: '游戏库',
    tags: ['游戏', '分类', '爱游戏'],
    keywords: ['休闲', '动作', '策略', '冒险'],
    url: 'https://app-official-aiyouxi.com.cn/games'
  },
  {
    id: 'news',
    title: '新闻资讯',
    tags: ['新闻', '更新', '公告'],
    keywords: ['版本更新', '活动', '爱游戏动态'],
    url: 'https://app-official-aiyouxi.com.cn/news'
  },
  {
    id: 'community',
    title: '社区',
    tags: ['论坛', '交流', '玩家'],
    keywords: ['讨论', '攻略', '分享', '爱游戏社区'],
    url: 'https://app-official-aiyouxi.com.cn/community'
  }
];

const tagIndex = {};

function buildTagIndex() {
  for (const section of contentSections) {
    const allTerms = [...section.tags, ...section.keywords];
    for (const term of allTerms) {
      const lower = term.toLowerCase();
      if (!tagIndex[lower]) {
        tagIndex[lower] = [];
      }
      if (!tagIndex[lower].includes(section.id)) {
        tagIndex[lower].push(section.id);
      }
    }
  }
}

buildTagIndex();

function searchContent(query) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const cleaned = query.trim().toLowerCase();
  if (!cleaned) {
    return [];
  }

  const matchedIds = new Set();

  for (const tag in tagIndex) {
    if (tag.includes(cleaned)) {
      for (const id of tagIndex[tag]) {
        matchedIds.add(id);
      }
    }
  }

  const results = [];
  for (const section of contentSections) {
    if (matchedIds.has(section.id)) {
      results.push(section);
    }
  }

  return results;
}

function getSectionById(id) {
  for (const section of contentSections) {
    if (section.id === id) {
      return section;
    }
  }
  return null;
}

function getSectionsByTag(tag) {
  const lower = tag.toLowerCase();
  const ids = tagIndex[lower] || [];
  return contentSections.filter(s => ids.includes(s.id));
}

export {
  contentSections,
  tagIndex,
  searchContent,
  getSectionById,
  getSectionsByTag
};