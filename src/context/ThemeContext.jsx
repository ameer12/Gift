import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedLang = localStorage.getItem('language')
    if (savedTheme) setIsDark(savedTheme === 'dark')
    if (savedLang) setLanguage(savedLang)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newTheme)
      return newTheme
    })
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  )
}
