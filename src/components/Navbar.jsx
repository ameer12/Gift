import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaWallet, FaShoppingCart, FaLightbulb, FaTrophy } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useWeb3 } from '../context/Web3Context'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3()


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="glass-effect-strong sticky top-0 z-50 border-b border-white/20 shadow-2xl backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img 
                src="/giftgalaxy-logo.png"
                alt="GiftGalaxy Logo"
                className="h-12 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold gradient-text-animated leading-tight">
                GiftGalaxy
              </span>
              <span className="text-xs text-luxury-gold/80 font-semibold tracking-wider">2026</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-luxury-gold transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="hover:text-luxury-gold transition-colors">
              Catalog
            </Link>
            <Link to="/gift-guide" className="hover:text-luxury-gold transition-colors flex items-center space-x-1">
              <FaLightbulb />
              <span>Gift Ideas</span>
            </Link>
            <Link to="/companies" className="hover:text-luxury-gold transition-colors">
              Companies
            </Link>
            <Link to="/rewards" className="hover:text-luxury-gold transition-colors flex items-center space-x-1">
              <FaTrophy />
              <span>Rewards</span>
            </Link>
            <Link to="/tracking" className="hover:text-luxury-gold transition-colors">
              Track Order
            </Link>
            <Link to="/company/dashboard" className="hover:text-luxury-gold transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full glass-effect"
            >
              {isDark ? <FaSun className="text-luxury-gold" /> : <FaMoon />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 215, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={account ? disconnectWallet : connectWallet}
              disabled={isConnecting}
              className="btn-secondary flex items-center space-x-2 shadow-lg"
            >
              <FaWallet />
              <span className="hidden sm:inline">
                {isConnecting ? 'Connecting...' : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
              </span>
            </motion.button>

            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-full glass-effect relative shadow-lg hover:shadow-xl"
              >
                <FaShoppingCart className="text-xl" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-luxury-gold to-yellow-500 text-luxury-darkBlue text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                >
                  0
                </motion.span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
