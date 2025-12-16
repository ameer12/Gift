import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const CompanyDashboard = () => {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ pending: 0, processing: 0, shipped: 0, delivered: 0 })
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  useEffect(() => {
    const token = localStorage.getItem('companyToken')
    if (token) {
      setIsAuthenticated(true)
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/company/login', credentials)
      localStorage.setItem('companyToken', response.data.token)
      setIsAuthenticated(true)
      fetchOrders()
      toast.success('Login successful!')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('companyToken')
      const response = await axios.get('/api/company/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrders(response.data.orders)
      setStats(response.data.stats)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('companyToken')
      await axios.patch(
        `/api/company/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Order status updated!')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-8 rounded-2xl max-w-md w-full"
        >
          <h1 className="text-3xl font-display font-bold gradient-text mb-6 text-center">
            Company Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Company Email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary py-3"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text">
            Company Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('companyToken')
              setIsAuthenticated(false)
            }}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pending', value: stats.pending, icon: FaClock, color: 'from-yellow-500 to-orange-500' },
            { label: 'Processing', value: stats.processing, icon: FaBox, color: 'from-blue-500 to-purple-500' },
            { label: 'Shipped', value: stats.shipped, icon: FaTruck, color: 'from-purple-500 to-pink-500' },
            { label: 'Delivered', value: stats.delivered, icon: FaCheckCircle, color: 'from-green-500 to-teal-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold">Incoming Orders</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-white/70">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left">Order ID</th>
                    <th className="px-6 py-4 text-left">Gift</th>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId} className="border-t border-white/10 hover:bg-white/5">
                      <td className="px-6 py-4 font-mono text-sm">{order.orderId}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.gift.image}
                            alt={order.gift.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-semibold">{order.gift.name}</p>
                            <p className="text-sm text-white/70">${order.gift.price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{order.customerInfo.name}</p>
                          <p className="text-sm text-white/70">{order.customerInfo.phone}</p>
                          <p className="text-sm text-white/70">{order.customerInfo.address}</p>
                          <p className="text-sm text-white/70">{order.customerInfo.city}, {order.customerInfo.zipCode}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 0
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : order.status === 1
                              ? 'bg-blue-500/20 text-blue-400'
                              : order.status === 2
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {['Pending', 'Processing', 'Shipped', 'Delivered'][order.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {order.status < 3 && (
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.orderId, parseInt(e.target.value))}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                            >
                              <option value="0">Pending</option>
                              <option value="1">Processing</option>
                              <option value="2">Shipped</option>
                              <option value="3">Delivered</option>
                            </select>
                          )}
                          <button
                            onClick={() => {
                              alert(`Full Order Details:\n\nOrder ID: ${order.orderId}\n\nCustomer:\n${order.customerInfo.name}\n${order.customerInfo.email}\n${order.customerInfo.phone}\n\nDelivery Address:\n${order.customerInfo.address}\n${order.customerInfo.city}, ${order.customerInfo.zipCode}\n\nGift: ${order.gift.name}\nPrice: $${order.gift.price}`)
                            }}
                            className="w-full text-xs text-luxury-gold hover:text-luxury-gold/80 transition-colors"
                          >
                            View Full Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default CompanyDashboard
