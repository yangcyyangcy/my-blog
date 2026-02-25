'use client'
import { useEffect } from 'react'

export default function Translator() {
    useEffect(() => {
        // We are disabling the text replacement because mutating text nodes 
        // violently causes React 18/19 Hydration errors with Radix UI components (like the Create Collection button).

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

        return () => {
            style.remove()
        }
    }, [])

    return null
}
