import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSearch } from 'react-icons/fa'
import GiftCard from '../components/GiftCard'
import FilterSidebar from '../components/FilterSidebar'
import axios from 'axios'
import { useStore } from '../store/useStore'

const CatalogPage = () => {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { filters } = useStore()

  useEffect(() => {
    fetchGifts()
  }, [filters])

  const fetchGifts = async () => {
    try {
      setLoading(true)
      console.log('Fetching gifts with filters:', filters)
      
      // Prepare params - convert priceRange array to JSON string
      const params = {
        ...filters,
        priceRange: JSON.stringify(filters.priceRange)
      }
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key]
        }
      })
      
      console.log('Sending params:', params)
      const response = await axios.get('/api/gifts', { params })
      console.log('Received gifts:', response.data.length, 'gifts')
      setGifts(response.data)
    } catch (error) {
      console.error('Error fetching gifts:', error)
      console.error('Error details:', error.response || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-2 md:mb-4">
          Gift Catalog
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-6">
          Discover {gifts.length}+ premium gifts for New Year 2026
        </p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-full p-2 max-w-2xl flex items-center"
        >
          <FaSearch className="text-luxury-gold ml-4 text-xl" />
          <input
            type="text"
            placeholder="Search gifts by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-white/50 hover:text-white px-4 text-sm"
            >
              Clear
            </button>
          )}
        </motion.div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <FilterSidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden">
            <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            <p className="text-white/70 text-sm sm:text-base">
              Showing {gifts.filter(gift => {
                if (!searchQuery) return true
                const query = searchQuery.toLowerCase()
                return (
                  gift.name.toLowerCase().includes(query) ||
                  gift.description.toLowerCase().includes(query) ||
                  gift.category.toLowerCase().includes(query) ||
                  gift.company.toLowerCase().includes(query)
                )
              }).length} result{gifts.filter(gift => {
                if (!searchQuery) return true
                const query = searchQuery.toLowerCase()
                return (
                  gift.name.toLowerCase().includes(query) ||
                  gift.description.toLowerCase().includes(query) ||
                  gift.category.toLowerCase().includes(query) ||
                  gift.company.toLowerCase().includes(query)
                )
              }).length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-effect p-4 rounded-2xl animate-pulse">
                  <div className="loading-skeleton h-48 sm:h-56 md:h-64 rounded-xl mb-4"></div>
                  <div className="loading-skeleton h-6 rounded mb-2"></div>
                  <div className="loading-skeleton h-4 rounded mb-4"></div>
                  <div className="loading-skeleton h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {gifts
                .filter(gift => {
                  if (!searchQuery) return true
                  const query = searchQuery.toLowerCase()
                  return (
                    gift.name.toLowerCase().includes(query) ||
                    gift.description.toLowerCase().includes(query) ||
                    gift.category.toLowerCase().includes(query) ||
                    gift.company.toLowerCase().includes(query)
                  )
                })
                .map((gift) => (
                  <GiftCard key={gift._id} gift={gift} />
                ))}
            </div>
          )}

          {!loading && gifts.filter(gift => {
            if (!searchQuery) return true
            const query = searchQuery.toLowerCase()
            return (
              gift.name.toLowerCase().includes(query) ||
              gift.description.toLowerCase().includes(query) ||
              gift.category.toLowerCase().includes(query) ||
              gift.company.toLowerCase().includes(query)
            )
          }).length === 0 && (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <p className="text-xl sm:text-2xl text-white/70 mb-2">
                {searchQuery ? `No gifts found for "${searchQuery}"` : 'No gifts found matching your filters'}
              </p>
              <p className="text-white/50 mb-4">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  window.location.reload()
                }} 
                className="btn-primary mt-4"
              >
                Reset & Reload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
