'use client';

import { useState } from 'react';

export default function JournalActions({ slug }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // Instead of a full comment system, we will link to the GitHub Discussions via Giscus
    // for a lightweight implementation, or simply provide a mailto link depending on user preference.
    // For now, let's make it an interactive UI state.

    const handleLike = () => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } else {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
        // In a real app, you would make an API call to your database here to persist the like.
    };

    const handleComment = () => {
        // Simple fallback: alert the user or scroll to a hypothetical comment section
        alert("评论功能已接入 Giscus，请前往具体的说说页面（即将推出）进行留言。目前您可以在「关于」页面的留言板进行全局交流。");
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/journals#${slug}`);
            alert('已复制该说说的链接到剪贴板！');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="journal-actions" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <button
                className="action-btn"
                onClick={handleLike}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    color: isLiked ? 'var(--accent)' : 'inherit',
                    transition: 'all 0.2s ease',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                <span style={{ fontSize: '0.95rem' }}>{likes > 0 ? Object.is(likes, 1) && !isLiked ? "赞" : likes : "赞"}</span>
            </button>

            <button
                className="action-btn"
                onClick={handleComment}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span style={{ fontSize: '0.95rem' }}>评论</span>
            </button>

            <button
                className="action-btn"
                onClick={handleShare}
                style={{
                    marginLeft: 'auto',
                    transition: 'all 0.2s ease',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0
                }}
                title="复制链接"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </button>
        </div>
    );
}
