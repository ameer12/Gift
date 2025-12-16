import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaShieldAlt, FaTruck, FaCheckCircle, FaGift } from 'react-icons/fa'
import axios from 'axios'
import GiftCard from '../components/GiftCard'

const GiftDetailPage = () => {
  const { id } = useParams()
  const [gift, setGift] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedGifts, setRelatedGifts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGiftDetails()
  }, [id])

  const fetchGiftDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/gifts/${id}`)
      setGift(response.data.gift)
      setRelatedGifts(response.data.related)
    } catch (error) {
      console.error('Error fetching gift details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="loading-skeleton h-96 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="loading-skeleton h-12 rounded"></div>
            <div className="loading-skeleton h-6 rounded"></div>
            <div className="loading-skeleton h-32 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!gift) return <div className="text-center py-20">Gift not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
      >
        {/* Image Gallery */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-2xl overflow-hidden mb-4"
          >
            <img
              src={gift.images[selectedImage]}
              alt={gift.name}
              className="w-full h-[500px] object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {gift.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-luxury-gold' : ''
                }`}
              >
                <img src={img} alt="" className="w-full h-24 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">{gift.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < gift.rating ? 'text-luxury-gold' : 'text-white/20'}
                  />
                ))}
              </div>
              <span className="text-white/70">({gift.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-5xl font-bold gradient-text">${gift.price}</span>
              {gift.originalPrice && (
                <span className="text-2xl text-white/50 line-through">
                  ${gift.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <img src={gift.companyLogo} alt={gift.company} className="w-12 h-12 rounded-full border-2 border-luxury-gold" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">{gift.company}</span>
                  {gift.companyVerified && (
                    <span className="text-luxury-gold text-sm flex items-center space-x-1">
                      <FaCheckCircle />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-xs">Trusted Supplier</p>
              </div>
            </div>
            {gift.companyDescription && (
              <p className="text-white/80 text-sm leading-relaxed border-t border-white/10 pt-3">
                {gift.companyDescription}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-white/80">
              <FaShieldAlt className="text-luxury-gold text-xl" />
              <span>Blockchain Delivery Guarantee</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <FaTruck className="text-luxury-gold text-xl" />
              <span>Fast Delivery (3-5 days)</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <FaCheckCircle className="text-luxury-gold text-xl" />
              <span>Quality Verified</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-white/70 leading-relaxed">{gift.description}</p>
          </div>

          {/* Product Details */}
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {gift.brand && (
                <div>
                  <span className="text-white/60">Brand:</span>
                  <span className="ml-2 font-semibold">{gift.brand}</span>
                </div>
              )}
              {gift.model && (
                <div>
                  <span className="text-white/60">Model:</span>
                  <span className="ml-2 font-semibold">{gift.model}</span>
                </div>
              )}
              {gift.sku && (
                <div>
                  <span className="text-white/60">SKU:</span>
                  <span className="ml-2 font-mono text-xs">{gift.sku}</span>
                </div>
              )}
              {gift.weight && (
                <div>
                  <span className="text-white/60">Weight:</span>
                  <span className="ml-2">{gift.weight}</span>
                </div>
              )}
              {gift.dimensions && (
                <div className="col-span-2">
                  <span className="text-white/60">Dimensions:</span>
                  <span className="ml-2">{gift.dimensions}</span>
                </div>
              )}
              {gift.warranty && (
                <div>
                  <span className="text-white/60">Warranty:</span>
                  <span className="ml-2">{gift.warranty}</span>
                </div>
              )}
              {gift.returnPolicy && (
                <div>
                  <span className="text-white/60">Returns:</span>
                  <span className="ml-2">{gift.returnPolicy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reward Points */}
          {gift.rewardPoints && (
            <div className="bg-gradient-to-r from-luxury-gold/20 to-yellow-500/20 border border-luxury-gold/30 p-6 rounded-xl">
              <div className="flex items-center space-x-3">
                <FaGift className="text-4xl text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-gold">Earn {gift.rewardPoints} Reward Points!</h3>
                  <p className="text-white/80 text-sm">Get points with every purchase. Redeem for discounts on future orders!</p>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Info */}
          <div className="glass-effect p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaTruck className="text-2xl text-luxury-gold" />
                <span className="font-semibold">{gift.shipping || 'Standard Shipping'}</span>
              </div>
              {gift.freeShipping && (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  FREE
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Link to={`/order/${gift.id}`} className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 text-lg"
              >
                Order Now - 1-Click Checkout
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-secondary py-4"
            >
              Add to Wishlist
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Related Gifts */}
      {relatedGifts.length > 0 && (
        <div>
          <h2 className="text-3xl font-display font-bold mb-8 gradient-text">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GiftDetailPage
