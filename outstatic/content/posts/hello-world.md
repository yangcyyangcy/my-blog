---
title: "我的第一篇博客文章"
status: "published"
author:
  name: "yancey"
  picture: "https://avatars.githubusercontent.com/u/221816690?v=4"
slug: "hello-world"
description: "这是使用 Next.js 构建的个人博客系统的第一篇文章。演示了 Markdown 解析、代码高亮和样式排版。"
coverImage: ""
publishedAt: "2024-05-20T00:00:00.000Z"
category: "Life"
tags:
  - "Milestone"
  - "Introduction"
---

欢迎来到我的个人博客！这篇文章是用来演示该博客系统如何将 **Markdown** 文件完美转换为漂亮的网页。

## 为什么要写博客？

写博客不仅是记录生活点滴的方式，也是梳理自己知识体系的最佳途径。在这个追求快速消费的时代，拥有一个属于自己的“数字花园”显得尤为珍贵。

1. **记录思考**：好记性不如烂笔头。
2. **知识沉淀**：把学到的东西系统化。
3. **建立连接**：通过文字与世界各地的朋友交流。

## Markdown 格式演示

这套博客系统支持所有基础的 Markdown 语法，并且我已经通过 CSS 为它们设计了非常现代、阅读体验极佳的排版。

### 引用块 (Blockquote)

> “任何值得去的地方，都没有捷径。”

### 代码块 (Code Block)

作为一个开发者，写代码是日常。这里演示一下代码块的展示效果：

```js
// 这是一个简单的 JavaScript 阶乘函数
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 输出: 120
```

甚至还有行内代码：比如你可以用 `npm run dev` 来启动本地服务。

### 列表展示

- 无序列表项 一
- 无序列表项 二
  - 嵌套列表项 A
  - 嵌套列表项 B

## 总结

这就是第一篇演示文章的全部内容啦。只要你在 `posts` 目录下创建新的 `.md` 文件，填好顶部的 `title` 和 `date`，网站就会自动抓取并展示。不需要数据库，一切都是那么简单优雅。

感谢阅读！