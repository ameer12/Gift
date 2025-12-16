import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaEnvelope, FaBox } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies')
      setCompanies(response.data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold gradient-text mb-4">
          Our Trusted Partners
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Meet the verified companies that bring you premium gifts with guaranteed quality and fast delivery
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-effect p-6 rounded-2xl animate-pulse">
              <div className="loading-skeleton h-20 w-20 rounded-full mb-4 mx-auto"></div>
              <div className="loading-skeleton h-6 rounded mb-2"></div>
              <div className="loading-skeleton h-20 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="text-center mb-4">
                <img
                  src={company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=FFD700&color=0A1929&size=200`}
                  alt={company.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-luxury-gold group-hover:scale-110 transition-transform"
                />
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="text-2xl font-bold">{company.name}</h3>
                  {company.verified && (
                    <FaCheckCircle className="text-luxury-gold text-xl" />
                  )}
                </div>
                {company.verified && (
                  <span className="text-luxury-gold text-sm">Verified Supplier</span>
                )}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-4 min-h-[80px]">
                {company.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-white/60">
                  <FaEnvelope className="text-luxury-gold" />
                  <span>{company.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/60">
                  <FaBox className="text-luxury-gold" />
                  <span>{company.giftCount || 0} Products Available</span>
                </div>
              </div>

              <Link to={`/catalog?company=${company.name}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary py-3"
                >
                  View Products
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompaniesPage
