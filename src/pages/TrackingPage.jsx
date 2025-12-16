import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaCheckCircle, FaBox, FaTruck, FaHome } from 'react-icons/fa'
import { useWeb3 } from '../context/Web3Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const TrackingPage = () => {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const { getOrderStatus } = useWeb3()

  const statusSteps = [
    { id: 0, label: 'Order Placed', icon: FaCheckCircle, color: 'text-green-400' },
    { id: 1, label: 'Processing', icon: FaBox, color: 'text-blue-400' },
    { id: 2, label: 'Shipped', icon: FaTruck, color: 'text-purple-400' },
    { id: 3, label: 'Delivered', icon: FaHome, color: 'text-luxury-gold' }
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const orderIdParam = params.get('orderId')
    if (orderIdParam) {
      setOrderId(orderIdParam)
      trackOrder(orderIdParam)
    }
  }, [])

  const trackOrder = async (id = orderId) => {
    if (!id) {
      toast.error('Please enter an order ID')
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(`/api/orders/${id}`)
      const orderData = response.data

      // If blockchain enabled, get status from chain
      if (orderData.blockchainTxHash) {
        const chainStatus = await getOrderStatus(id)
        if (chainStatus !== null) {
          orderData.status = chainStatus
        }
      }

      setOrder(orderData)
    } catch (error) {
      console.error('Error tracking order:', error)
      toast.error('Order not found')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-display font-bold gradient-text mb-4 text-center">
          Track Your Order
        </h1>
        <p className="text-white/70 text-center mb-12">
          Real-time blockchain-powered delivery tracking
        </p>

        {/* Search Box */}
        <div className="glass-effect rounded-2xl p-2 mb-12 flex items-center">
          <input
            type="text"
            placeholder="Enter your order ID..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && trackOrder()}
            className="flex-1 bg-transparent px-6 py-4 focus:outline-none text-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackOrder()}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <FaSearch />
            <span>{loading ? 'Tracking...' : 'Track'}</span>
          </motion.button>
        </div>

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Order Info Card */}
            <div className="glass-effect p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Order #{order.orderId}</h2>
                  <p className="text-white/70">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {order.blockchainTxHash && (
                  <div className="glass-effect px-4 py-2 rounded-lg">
                    <p className="text-sm text-luxury-gold flex items-center space-x-2">
                      <FaCheckCircle />
                      <span>Blockchain Verified</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Gift Details</h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.gift.image}
                      alt={order.gift.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{order.gift.name}</p>
                      <p className="text-white/70 text-sm">{order.gift.company}</p>
                      <p className="text-luxury-gold font-bold">${order.gift.price}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Delivery Address</h3>
                  <p className="text-white/70">{order.customerInfo.name}</p>
                  <p className="text-white/70">{order.customerInfo.address}</p>
                  <p className="text-white/70">
                    {order.customerInfo.city}, {order.customerInfo.zipCode}
                  </p>
                  <p className="text-white/70">{order.customerInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-effect p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-8">Delivery Timeline</h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/20"></div>
                <div
                  className="absolute left-8 top-0 w-1 bg-gradient-to-b from-luxury-gold to-green-400 transition-all duration-1000"
                  style={{ height: `${(order.status / 3) * 100}%` }}
                ></div>

                {/* Steps */}
                <div className="space-y-8">
                  {statusSteps.map((step, index) => {
                    const isCompleted = order.status >= step.id
                    const isCurrent = order.status === step.id

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-center space-x-6"
                      >
                        <div
                          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-gradient-to-br from-luxury-gold to-green-400'
                              : 'bg-white/10'
                          } ${isCurrent ? 'animate-pulse' : ''}`}
                        >
                          <step.icon
                            className={`text-2xl ${
                              isCompleted ? 'text-luxury-darkBlue' : 'text-white/50'
                            }`}
                          />
                        </div>

                        <div className="flex-1">
                          <h3
                            className={`text-xl font-semibold ${
                              isCompleted ? 'text-white' : 'text-white/50'
                            }`}
                          >
                            {step.label}
                          </h3>
                          {isCompleted && (
                            <p className="text-white/70 text-sm">
                              {step.id === 0 && `Order confirmed at ${new Date(order.createdAt).toLocaleTimeString()}`}
                              {step.id === 1 && 'Your gift is being prepared'}
                              {step.id === 2 && 'Out for delivery'}
                              {step.id === 3 && 'Successfully delivered'}
                            </p>
                          )}
                        </div>

                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-400"
                          >
                            <FaCheckCircle className="text-2xl" />
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            {order.blockchainTxHash && (
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="font-semibold mb-3">Blockchain Transaction</h3>
                <div className="flex items-center justify-between">
                  <p className="text-white/70 text-sm font-mono">
                    {order.blockchainTxHash}
                  </p>
                  <a
                    href={`https://etherscan.io/tx/${order.blockchainTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    View on Explorer
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!order && !loading && orderId && (
          <div className="text-center py-20">
            <p className="text-2xl text-white/70">No order found with this ID</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default TrackingPage
