'use client'
import { useEffect } from 'react'

export default function Translator() {
    useEffect(() => {
        // Dictionary for translating Outstatic
        const dict = {
            'Dashboard': '返回主页',
            'Content': '内容管理',
            'Collections': '文章分类 (Collections)',
            'Singletons': '独立页面 (Singletons)',
            'Libraries': '资源库',
            'Media Library': '图片素材库',
            'Settings': '系统设置',
            'New Post': '写新文章',
            'New Collection': '新建文章分类',
            'New Singleton': '新建独立页面',
            'Save': '保存草稿',
            'Publish': '正式发布',
            'Update': '更新发布',
            'Draft': '草稿',
            'Published': '已发布',
            'draft': '草稿',
            'published': '已发布',
            'Title': '文章标题',
            'Status': '发布状态',
            'Slug': '网址后缀 (Slug)',
            'Published At': '发布时间',
            'Content Path': '存放路径',
            'Add Media': '上传新图片',
            'Delete document': '删除文档',
            'Delete Document': '删除文档',
            'Delete': '删除',
            'Cancel': '取消',
            'Confirm': '确定',
            'Are you sure you want to delete this document? This action cannot be undone.': '您确定要删除这篇文档吗？删除后将彻底从 Github 仓库移除，无法撤销。',
            'Create Collection': '创建集合',
            'Create a Collection': '创建内容集合',
            'Select a folder': '选择现有的文件夹',
            'Outstatic Folder': '默认存放位置 (推荐)',
            'Where would you like to store your Markdown files?': '您想把 Markdown 文件储存在哪里？ (默认选第一项即可)',
            'Next Step': '下一步',
            'Collection Name': '分类名称 (如：posts)',
            'First time here?': '首次配置提示',
            "It seems you haven't set up your media paths yet. Let's do that!": '在使用图片前，您需要先指定一下 Github 中存放图片的具体位置：',
            'Repository Media Path': 'Github 资源库图片路径 (请照着灰字输入 public/images/)',
            'Public Media Path': '访问路径前缀 (请照着灰字输入 /images/)',
            'Update Media Paths': '确认保存路径设置',
            'Sign Out': '退出登录',
            'Search files...': '搜索图片...',
            'Sort by': '排序方式',
            'Date': '日期',
            'Name': '名称',
            'Ascending': '正序',
            'Descending': '倒序',
            'Oldest': '早期',
            'Newest': '最新',
            'Members': '团队成员 (不可用)',
            'API Keys': 'API 密钥 (不可用)',
            'Add Custom Field': '添加自定义字段',
            'Add Custom Fields to your singleton.': '为该页面添加自定义字段信息',
            'Open from file': '从现有文件打开',
            'Create your first': '开始创建第一篇',
            'by clicking the button below.': '吧！',
            'This collection has no documents yet.': '当前分类下还没有任何文章。',
            'To learn more about how documents work': '如需了解文档的运作方式，',
            'click here': '查阅官方手册',
            'No media files available. Upload some files to get started!': '没有找到图片，点击右上角上传吧！',
            'First time setting up?': '初次使用图片库？',
            'Outstatic': '博客管理后台',
            'Recommended': '推荐',
            'Used for repeating content with the same structure': '用于具备相同结构的重复性文章',
            'Blog posts • Projects • Case studies • Team members': '例如：博客文章・项目记录・案例分析・团队成员等',
            'January': '1月', 'February': '2月', 'March': '3月', 'April': '4月',
            'May': '5月', 'June': '6月', 'July': '7月', 'August': '8月',
            'September': '9月', 'October': '10月', 'November': '11月', 'December': '12月'
        }

        // Simplify UI by hiding paid or complicated features
        const style = document.createElement('style')
        style.innerHTML = `
            /* Hide the PRO label / Upgrade upsells */
            span.text-xs.font-mono { display: none !important; }
            button:has(svg.lucide-arrow-right) { display: none !important; }
            /* Hide links to Members and API keys completely if we want the dashboard cleaner */
            a[href*="members"], a[href*="api-keys"], div:has(> svg.lucide-users) { 
                display: none !important;
            }
        `
        document.head.appendChild(style)

        const translateNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue.trim()
                if (dict[text]) {
                    node.nodeValue = node.nodeValue.replace(text, dict[text])
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'INPUT' && node.placeholder && dict[node.placeholder]) {
                    node.placeholder = dict[node.placeholder]
                }
                // Avoid translating inside code blocks or script tags
                if (node.tagName !== 'SCRIPT' && node.tagName !== 'CODE') {
                    for (const child of node.childNodes) {
                        translateNode(child)
                    }
                }
            }
        }

        const observer = new MutationObserver((mutations) => {
            let shouldTranslate = false
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
                    shouldTranslate = true
                    break
                }
            }
            // Trigger translation when DOM changes
            if (shouldTranslate) {
                translateNode(document.body)
            }
        })

        // Initial translation
        setTimeout(() => {
            translateNode(document.body)
            observer.observe(document.body, { childList: true, subtree: true, characterData: true })
        }, 100)

        return () => {
            observer.disconnect()
            style.remove()
        }
    }, [])

    return null
}
