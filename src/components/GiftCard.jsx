import { motion } from 'framer-motion'
import { FaStar, FaShoppingCart, FaFire, FaGift, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const GiftCard = ({ gift }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-effect-strong p-3 sm:p-4 rounded-2xl card-hover group overflow-hidden w-full relative shadow-lg hover:shadow-2xl"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 via-luxury-gold/0 to-luxury-gold/0 group-hover:from-luxury-gold/20 group-hover:via-luxury-gold/5 group-hover:to-luxury-gold/20 transition-all duration-500 rounded-2xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 bg-gradient-to-br from-white/5 to-white/10 shadow-lg">
        <img
          src={gift.image}
          alt={gift.name}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(gift.name)}&size=800&background=1E3A5F&color=FFD700&bold=true`
          }}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-darkBlue/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-2 right-2 bg-luxury-gold text-luxury-darkBlue px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
          ${gift.price}
        </div>
        {gift.trending && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm animate-pulse flex items-center space-x-1 shadow-lg"
          >
            <FaFire />
            <span>Trending</span>
          </motion.div>
        )}
        {gift.rewardPoints && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="absolute bottom-2 left-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-luxury-darkBlue px-2 py-1 rounded-full font-bold text-xs flex items-center space-x-1 shadow-lg"
          >
            <FaGift />
            <span>{gift.rewardPoints} pts</span>
          </motion.div>
        )}
        {gift.freeShipping && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="absolute bottom-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg"
          >
            FREE SHIP
          </motion.div>
        )}
        </div>

        <div className="space-y-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-1">{gift.name}</h3>
          <p className="text-white/70 text-xs sm:text-sm line-clamp-2">{gift.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < gift.rating ? 'text-luxury-gold' : 'text-white/20'}
                  />
                ))}
                <span className="text-sm text-white/70 ml-2">({gift.reviews})</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src={gift.companyLogo} 
                alt={gift.company} 
                className="w-5 h-5 rounded-full"
                onError={(e) => e.target.style.display = 'none'}
              />
              <span className="text-xs text-white/60">{gift.company}</span>
              {gift.companyVerified && (
                <FaCheckCircle className="text-luxury-gold text-xs" />
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Link to={`/gift/${gift._id}`} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-secondary py-2 text-xs sm:text-sm"
              >
                View Details
              </motion.button>
            </Link>
            <Link to={`/order/${gift._id}`} className="flex-1 sm:flex-initial">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-primary py-2 px-3 sm:px-4 text-xs sm:text-sm flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Order</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GiftCard
