import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold gradient-text mb-4">
              GiftGalaxy
            </h3>
            <p className="text-white/70">
              Premium gift ordering platform with blockchain-powered delivery tracking.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/catalog" className="hover:text-luxury-gold transition-colors">Browse Gifts</a></li>
              <li><a href="/tracking" className="hover:text-luxury-gold transition-colors">Track Order</a></li>
              <li><a href="/company/dashboard" className="hover:text-luxury-gold transition-colors">For Companies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="text-2xl hover:text-luxury-gold transition-colors"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="text-2xl hover:text-luxury-gold transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="text-2xl hover:text-luxury-gold transition-colors"
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>for New Year 2026</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
