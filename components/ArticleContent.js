'use client';

import { useEffect, useRef } from 'react';

export default function ArticleContent({ contentHtml }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        // ── 1. MERMAID DIAGRAMS ─────────────────────────────────────────────────
        // Detect <pre><code class="language-mermaid"> blocks and render them visually
        const renderMermaid = async () => {
            // Match all possible class name formats remark/remark-gfm might output
            const mermaidBlocks = ref.current.querySelectorAll(
                'pre code.language-mermaid, code.language-mermaid, pre code.mermaid, code.mermaid'
            );

            // Also detect by content for cases where class isn't set (plain <pre><code> blocks)
            const allCodeBlocks = ref.current.querySelectorAll('pre code:not([class])');
            const mermaidKeywords = ['flowchart', 'graph ', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'gantt', 'pie ', 'erDiagram', 'journey'];
            const detectedBlocks = Array.from(allCodeBlocks).filter(el =>
                mermaidKeywords.some(kw => el.textContent.trimStart().startsWith(kw))
            );

            const allMermaid = [...new Set([...mermaidBlocks, ...detectedBlocks])];
            if (allMermaid.length === 0) return;

            const mermaid = (await import('mermaid')).default;
            mermaid.initialize({
                startOnLoad: false,
                theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'neutral',
                fontFamily: 'inherit',
                fontSize: 14,
            });

            allMermaid.forEach(async (codeEl, index) => {
                const pre = codeEl.closest('pre') || codeEl;
                const graphDefinition = codeEl.textContent;
                const id = `mermaid-${Date.now()}-${index}`;

                try {
                    const { svg } = await mermaid.render(id, graphDefinition);
                    const wrapper = document.createElement('div');
                    wrapper.className = 'mermaid-wrapper';
                    wrapper.style.cssText = [
                        'width:100%',
                        'overflow-x:auto',
                        'margin:2rem 0',
                        'padding:1.5rem',
                        'background:var(--bg-subtle)',
                        'border:1px solid var(--border)',
                        'border-radius:16px',
                        'text-align:center',
                    ].join(';');
                    wrapper.innerHTML = svg;
                    pre.replaceWith(wrapper);
                } catch (err) {
                    console.warn('Mermaid render error for block #' + index + ':', err.message);
                }
            });
        };

        renderMermaid();

        // ── 2. TABLE STYLES ─────────────────────────────────────────────────────
        const tables = ref.current.querySelectorAll('table');
        tables.forEach(table => {
            // Wrap table in two layers: outer (positioning) > fade hint + scroll wrapper
            if (!table.parentElement.classList.contains('table-scroll-wrapper')) {
                // Create outer container for positioning the fade hint
                const outer = document.createElement('div');
                outer.className = 'table-outer';

                // Create scroll wrapper
                const wrapper = document.createElement('div');
                wrapper.className = 'table-scroll-wrapper';

                // Create fade hint overlay (real DOM element, stays fixed during scroll)
                const fadeHint = document.createElement('div');
                fadeHint.className = 'table-fade-hint';

                // Assemble: outer > [fadeHint, wrapper > table]
                table.parentNode.insertBefore(outer, table);
                wrapper.appendChild(table);
                outer.appendChild(wrapper);
                outer.appendChild(fadeHint);

                // Toggle fade hint visibility based on scroll position
                const checkScroll = () => {
                    const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth;
                    const isAtEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 2;
                    fadeHint.classList.toggle('hidden', !hasOverflow || isAtEnd);
                };
                wrapper.addEventListener('scroll', checkScroll, { passive: true });
                setTimeout(checkScroll, 100);
                window.addEventListener('resize', checkScroll, { passive: true });
            }

            // Zebra striping
            table.querySelectorAll('tbody tr').forEach((row, i) => {
                if (i % 2 === 1) row.style.background = 'var(--bg-secondary)';
            });
        });

        // ── 3. IMAGE STYLES ─────────────────────────────────────────────────────
        const imgs = ref.current.querySelectorAll('img');
        imgs.forEach(img => {
            Object.assign(img.style, {
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                margin: '1.5rem auto',
                boxShadow: 'var(--shadow-md)',
            });
            img.setAttribute('loading', 'lazy');
        });

        ref.current.querySelectorAll('p').forEach(p => {
            if (p.children.length === 1 && p.children[0].tagName === 'IMG') {
                p.style.margin = '0';
            }
        });

    }, [contentHtml]);

    return (
        <div
            ref={ref}
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}
