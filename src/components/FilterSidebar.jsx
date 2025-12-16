import { motion } from 'framer-motion'
import { FaFilter, FaTimes } from 'react-icons/fa'
import { useStore } from '../store/useStore'

const FilterSidebar = ({ isOpen, onClose }) => {
  const { filters, setFilters, resetFilters } = useStore()

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Books', 'Toys', 'Food & Beverages']
  const companies = ['GiftCo', 'LuxuryGifts', 'TechGifts', 'FashionHub', 'HomeEssentials', 'KidsWorld', 'YouthTrends', 'EleganceStore', 'TeachersTreasure', 'RomanceGifts']
  const recipients = ['Children', 'Youth', 'Parents', 'Wife', 'Husband', 'Teacher', 'Bachelor', 'Friend', 'Girlfriend', 'Boyfriend', 'Coworker', 'Developer', 'Gamer', 'Universal']

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed lg:static lg:translate-x-0 left-0 top-0 h-full w-80 max-w-[90vw] glass-effect p-4 sm:p-6 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-display font-bold flex items-center space-x-2">
            <FaFilter className="text-luxury-gold text-lg sm:text-xl" />
            <span>Filters</span>
          </h2>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
            <FaTimes className="text-lg sm:text-xl" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Category</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => setFilters({ category: cat })}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ priceRange: [0, parseInt(e.target.value)] })}
                className="w-full accent-luxury-gold"
              />
              <div className="flex justify-between text-sm text-white/70">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Company</h3>
            <div className="space-y-2">
              {companies.map(company => (
                <label key={company} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="company"
                    checked={filters.company === company}
                    onChange={() => setFilters({ company })}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-sm">{company}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Gift For</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recipients.map(recipient => (
                <label key={recipient} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recipient"
                    checked={filters.recipient === recipient}
                    onChange={() => setFilters({ recipient })}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-sm">{recipient}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ sortBy: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:border-luxury-gold"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="w-full btn-secondary py-2 sm:py-3 text-sm sm:text-base"
          >
            Reset Filters
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar
