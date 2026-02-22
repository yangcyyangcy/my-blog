# 🚀 如何将你的博客免费发布到公网？

恭喜你！你的非常漂亮、支持深色模式的现代 Next.js 博客已经在本地开发完毕。接下来，我们只需要 **两个免费工具**，就能让全世界都能访问你的博客！

---

## 第一步：将代码推送到 GitHub（免费的代码仓库）

GitHub 就像是程序员的“云盘”。我们需要把刚刚在本地写好的代码存上去。

1. **注册账号**：如果还没有，请去 [github.com](https://github.com/) 注册一个账号。
2. **新建仓库**：
   - 登录后，点击右上角的 **"+" -> "New repository"**。
   - `Repository name` 填入 `my-blog`（名字可以随便起）。
   - 选择 **Public**（公开）或者 **Private**（私有）都可以。
   - 点击绿色的 **"Create repository"** 按钮。
3. **上传代码**：
   - 打开你的电脑终端（或者 VS Code 的终端），确保你在 `next-blog` 目录下。
   - 依次运行以下命令（把最后一行 `你的用户名` 换成你的真实 GitHub 名字）：
   ```bash
   git init
   git add .
   git commit -m "博客初次上线"
   git branch -M main
   # 注意替换下面的用户名！
   git remote add origin https://github.com/你的用户名/my-blog.git
   git push -u origin main
   ```

---

## 第二步：使用 Vercel 一键上线（永久免费）

Vercel 是 Next.js 的官方母公司，他们为个人开发者提供世界级的免费网页托管服务！

1. 浏览器打开 [vercel.com](https://vercel.com/) 并点击右上角的 **Sign Up**。
2. 选择 **"Continue with GitHub"**，用你刚才的 GitHub 账号授权登录。
3. 进入控制台后，点击黑色的 **"Add New..."** 按钮，选择 **"Project"**。
4. 你会看到你刚刚推送到 GitHub 的 `my-blog` 仓库，点击它旁边的 **"Import"**。
5. 什么都不用改！直接点击蓝色的 **"Deploy"** 按钮。
6. 等待约 1-2 分钟……🎉 **礼花绽放！你的博客上线了！**

Vercel 会自动送你一个类似 `my-blog-xxxx.vercel.app` 的网址（别人点这个链接就能看到你啦）。以后每次你在本地修改了文件、写了新博客，只要运行 `git push` 把代码推送到 GitHub，Vercel 就会**自动在后台帮你更新网站**，完全不用再管服务器配置了！

---

## 💡 日常如何写新博客？

你**完全不需要**懂数据库或者复杂的后台。
1. 回到本地你的 `next-blog` 文件夹。
2. 在 `posts` 目录下，新建一个 `.md` 文件，比如 `my-second-post.md`。
3. 按照格式在顶部写好标题和日期：
   ```markdown
   ---
   title: "我的第二篇随笔"
   date: "2024-05-21"
   description: "今天天气真不错。"
   ---
   这里写你的文章正文...
   ```
4. 在终端运行发版命令：
   ```bash
   git add .
   git commit -m "添加新文章"
   git push
   ```
5. 喝口水，刷新你的网站，新文章就自动出现啦！ 🎉
