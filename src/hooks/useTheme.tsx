'use client'

import {useEffect, useState} from 'react'

type Theme = 'light' | 'dark'

export function useTheme(): [Theme, (theme: Theme) => void] {
    const [theme, setThemeState] = useState<Theme>('light')

    useEffect(() => {
        const sync = () => setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
        sync()
        const observer = new MutationObserver(sync)
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']})
        return () => observer.disconnect()
    }, [])

    const setTheme = (newTheme: Theme) => {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        document.documentElement.classList.toggle('light', newTheme === 'light')
        setThemeState(newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch {
            // The selection still applies when browser storage is unavailable.
        }
    }

    return [theme, setTheme]
}
