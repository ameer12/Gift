import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWallet, FaCreditCard, FaCheckCircle } from 'react-icons/fa'
import { useWeb3 } from '../context/Web3Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { account, createOrderOnChain } = useWeb3()
  
  const [gift, setGift] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [useWeb3Payment, setUseWeb3Payment] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  })

  useEffect(() => {
    fetchGift()
  }, [id])

  const fetchGift = async () => {
    try {
      const response = await axios.get(`/api/gifts/${id}`)
      setGift(response.data.gift)
    } catch (error) {
      console.error('Error fetching gift:', error)
      toast.error('Failed to load gift details')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Create order in backend
      const orderResponse = await axios.post('/api/orders', {
        giftId: gift._id,
        customerInfo: formData,
        useBlockchain: useWeb3Payment
      })

      const orderId = orderResponse.data.orderId
      const rewardPoints = orderResponse.data.rewardPoints

      // If using Web3, record on blockchain
      if (useWeb3Payment && account) {
        const txHash = await createOrderOnChain(orderId)
        if (txHash) {
          await axios.patch(`/api/orders/${orderId}`, { blockchainTxHash: txHash })
        }
      }

      toast.success(`Order placed! You earned ${rewardPoints} reward points!`)
      navigate(`/tracking?orderId=${orderId}`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="loading-skeleton h-96 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-display font-bold gradient-text mb-8">
          Lightning-Fast Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <textarea
                  placeholder="Full Address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full mt-4 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 glass-effect rounded-lg cursor-pointer hover:bg-white/20">
                    <input
                      type="radio"
                      name="payment"
                      checked={!useWeb3Payment}
                      onChange={() => setUseWeb3Payment(false)}
                      className="w-5 h-5 accent-luxury-gold"
                    />
                    <FaCreditCard className="text-2xl text-luxury-gold" />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 glass-effect rounded-lg cursor-pointer hover:bg-white/20">
                    <input
                      type="radio"
                      name="payment"
                      checked={useWeb3Payment}
                      onChange={() => setUseWeb3Payment(true)}
                      className="w-5 h-5 accent-luxury-gold"
                    />
                    <FaWallet className="text-2xl text-luxury-gold" />
                    <span>Web3 Wallet (Blockchain Verified)</span>
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={processing}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>Complete Order</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="glass-effect p-8 rounded-2xl h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{gift.name}</h3>
                  <p className="text-white/70 text-sm">{gift.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/20 pt-4">
              <div className="flex justify-between">
                <span className="text-white/70">Subtotal</span>
                <span>${gift.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-white/20 pt-3">
                <span>Total</span>
                <span className="gradient-text">${gift.price}</span>
              </div>
            </div>

            {useWeb3Payment && (
              <div className="mt-6 p-4 bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg">
                <p className="text-sm text-luxury-gold flex items-center space-x-2">
                  <FaCheckCircle />
                  <span>Blockchain tracking enabled</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderPage
