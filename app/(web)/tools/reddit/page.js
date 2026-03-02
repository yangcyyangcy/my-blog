'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function RedditScraperPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleScrape = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // 请求我们刚刚写的 Next.js 后端 API
            const res = await fetch(`/api/scrape-reddit?url=${encodeURIComponent(url)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '抓取失败，请检查链接或稍后再试');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 生成 CSV 并触发浏览器下载的纯前端逻辑
    const downloadCSV = () => {
        if (!result || !result.comments || result.comments.length === 0) return;

        // 1. 设置表头
        const headers = ['Author,Score,Body'];

        // 2. 拼接数据行 (处理内容里面可能存在的逗号或引号，遵循 RFC 4180 标准)
        const rows = result.comments.map(c => {
            // 字段里如果有双引号，需要变成两个双引号，并在外层包裹双引号
            const safeBody = `"${c.body.replace(/"/g, '""')}"`;
            return `${c.author},${c.score},${safeBody}`;
        });

        const csvContent = headers.concat(rows).join('\n');

        // 3. 构建 Blob 并触发下载 (加入 BOM 前缀 \uFEFF 解决 Excel 中文乱码问题)
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const urlBlob = URL.createObjectURL(blob);
        link.setAttribute('href', urlBlob);

        // 自动生成形如 reddit_comments_1710000000000.csv 的文件名
        const timestamp = new Date().getTime();
        link.setAttribute('download', `reddit_comments_${timestamp}.csv`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 font-sans text-gray-800">
            <Navigation />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Reddit Comment Scraper</h1>
                <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                    Paste a Reddit post URL below to automatically extract, clean, and filter high-quality comments into a downloadable spreadsheet.
                </p>

                {/* 搜索框 */}
                <form onSubmit={handleScrape} className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="url"
                            placeholder="https://www.reddit.com/r/..."
                            required
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !url}
                            className={`px-8 py-3 rounded-xl font-medium text-white shadow-md transition-all ${loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Scraping...
                                </span>
                            ) : 'Scrape'}
                        </button>
                    </div>
                </form>

                {/* 错误提示 */}
                {error && (
                    <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700">
                        <p className="font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                            Error
                        </p>
                        <p className="mt-1 text-sm">{error}</p>
                    </div>
                )}

                {/* 抓取结果区域 */}
                {result && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1" title={result.title}>
                                    {result.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Extracted <span className="font-medium text-gray-900">{result.count}</span> highly relevant comments
                                </p>
                            </div>

                            <button
                                onClick={downloadCSV}
                                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download CSV
                            </button>
                        </div>

                        {/* 评论预览列表 */}
                        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                            {result.comments.length > 0 ? (
                                result.comments.map((comment, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                                                u/
                                            </span>
                                            <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                                            <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                {comment.score}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {comment.body}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-gray-500">
                                    No relevant comments found remaining after filtering.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
