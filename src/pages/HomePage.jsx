import { motion } from 'framer-motion'
import { FaSearch, FaGift, FaShieldAlt, FaTruck, FaStar, FaLightbulb, FaCheckCircle, FaHeart, FaBaby, FaGamepad, FaUsers, FaRing, FaUserTie, FaUserFriends, FaGraduationCap, FaCoffee, FaLaptopCode, FaHeadset, FaTrophy, FaMobile, FaTags, FaHome, FaBook, FaPuzzlePiece, FaUtensils, FaAward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop&q=80', color: 'from-blue-500 to-purple-500' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop&q=80', color: 'from-pink-500 to-red-500' },
    { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop&q=80', color: 'from-green-500 to-teal-500' },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=200&fit=crop&q=80', color: 'from-yellow-500 to-orange-500' },
    { name: 'Toys', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop&q=80', color: 'from-indigo-500 to-blue-500' },
    { name: 'Food', image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=200&h=200&fit=crop&q=80', color: 'from-red-500 to-pink-500' }
  ]

  const features = [
    { icon: FaGift, title: 'Thousands of Gifts', desc: 'Curated collection of premium gifts' },
    { icon: FaShieldAlt, title: 'Blockchain Verified', desc: 'Transparent order tracking' },
    { icon: FaTruck, title: 'Fast Delivery', desc: 'Direct from suppliers' },
    { icon: FaStar, title: 'Top Rated', desc: 'Quality guaranteed' }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating icons */}
          {[...Array(20)].map((_, i) => {
            const icons = [FaGift, FaStar, FaHeart, FaTrophy]
            const IconComponent = icons[Math.floor(Math.random() * icons.length)]
            return (
              <motion.div
                key={i}
                className="absolute opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              >
                <IconComponent className="text-5xl text-luxury-gold drop-shadow-lg" />
              </motion.div>
            )
          })}
          
          {/* Glowing orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-luxury-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-luxury-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
              className="mb-6 inline-block"
            >
              <FaGift className="text-7xl sm:text-8xl text-luxury-gold drop-shadow-2xl animate-pulse" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-6 px-4 leading-tight">
              <motion.span 
                className="gradient-text-animated inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Perfect Gifts
              </motion.span>
              <br />
              <motion.span 
                className="text-white drop-shadow-2xl inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                for New Year 2026
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Celebrate 2026 with premium gifts • Instant ordering • Blockchain tracking • Earn rewards on every purchase
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-full p-2 max-w-2xl mx-auto mb-8 flex items-center"
          >
            <input
              type="text"
              placeholder="Search for perfect gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-6 py-4 focus:outline-none text-lg"
            />
            <Link to={`/catalog?search=${searchQuery}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <FaSearch />
                <span>Search</span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-12 py-6"
              >
                Browse All Gifts
              </motion.button>
            </Link>
            <Link to="/gift-guide">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-xl px-12 py-6 flex items-center space-x-2"
              >
                <FaLightbulb />
                <span>Gift Ideas Guide</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gift Recipients */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 gradient-text px-4"
        >
          Find Perfect Gifts For
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {[
            { name: 'Children', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&q=80', color: 'from-pink-500 to-purple-500' },
            { name: 'Youth', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&q=80', color: 'from-blue-500 to-cyan-500' },
            { name: 'Parents', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&h=200&fit=crop&q=80', color: 'from-green-500 to-teal-500' },
            { name: 'Wife', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&q=80', color: 'from-red-500 to-pink-500' },
            { name: 'Husband', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', color: 'from-indigo-500 to-blue-500' },
            { name: 'Friend', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&q=80', color: 'from-cyan-500 to-blue-500' },
            { name: 'Girlfriend', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', color: 'from-pink-500 to-red-500' },
            { name: 'Boyfriend', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80', color: 'from-blue-500 to-indigo-500' },
            { name: 'Teacher', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80', color: 'from-yellow-500 to-orange-500' },
            { name: 'Coworker', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80', color: 'from-gray-500 to-slate-500' },
            { name: 'Developer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80', color: 'from-green-500 to-emerald-500' },
            { name: 'Gamer', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop&q=80', color: 'from-purple-500 to-violet-500' },
            { name: 'Bachelor', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80', color: 'from-orange-500 to-red-500' },
            { name: 'Universal', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&h=200&fit=crop&q=80', color: 'from-luxury-gold to-yellow-500' }
          ].map((recipient, index) => (
            <Link key={recipient.name} to={`/catalog?recipient=${recipient.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="glass-effect p-4 sm:p-6 rounded-2xl text-center cursor-pointer group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${recipient.color} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
                <motion.div 
                  className="mb-3 sm:mb-4 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-luxury-gold/30 group-hover:border-luxury-gold transition-all">
                    <img 
                      src={recipient.image} 
                      alt={recipient.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
                <h3 className="font-semibold text-sm sm:text-base relative z-10 group-hover:text-luxury-gold transition-colors">{recipient.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 gradient-text px-4"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-effect p-4 sm:p-6 rounded-2xl text-center cursor-pointer group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              <motion.div 
                className="mb-3 sm:mb-4 relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </motion.div>
              <h3 className="font-semibold text-sm sm:text-base relative z-10 group-hover:text-luxury-gold transition-colors">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-12 gradient-text"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="glass-effect p-8 rounded-3xl text-center group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 to-luxury-gold/0 group-hover:from-luxury-gold/10 group-hover:to-luxury-gold/5 transition-all duration-300"></div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-luxury-gold to-yellow-600 shadow-lg mb-4">
                  <feature.icon className="text-4xl text-white" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3 relative z-10 group-hover:text-luxury-gold transition-colors">{feature.title}</h3>
              <p className="text-base text-white/70 relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 gradient-text px-4"
        >
          Trusted Partners
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
          {['GiftCo', 'LuxuryGifts', 'TechGifts', 'FashionHub', 'HomeEssentials'].map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="glass-effect p-6 rounded-2xl text-center group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 to-luxury-gold/0 group-hover:from-luxury-gold/10 group-hover:to-luxury-gold/5 transition-all duration-300"></div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${company}&background=FFD700&color=0A1929&size=100`}
                  alt={company}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-3 border-luxury-gold group-hover:border-4 group-hover:shadow-xl transition-all"
                />
              </motion.div>
              <p className="text-sm font-semibold mb-1 relative z-10">{company}</p>
              <p className="text-xs text-luxury-gold flex items-center justify-center space-x-1 relative z-10">
                <FaCheckCircle />
                <span>Verified</span>
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/companies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-3"
            >
              View All Companies
            </motion.button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 via-luxury-gold/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="mb-6"
            >
              <FaGift className="text-6xl text-luxury-gold mx-auto drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text-animated">
              Ready to Find the Perfect Gift?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy customers ordering premium gifts with blockchain-verified delivery
            </p>
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-16 py-6 shadow-xl"
              >
                Start Shopping Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
