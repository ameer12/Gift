import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGift, FaStar, FaTrophy, FaCoins, FaMedal, FaGem } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const RewardsPage = () => {
  const [email, setEmail] = useState('')
  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkRewards = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(`/api/customers/${email}`)
      setCustomerData(response.data)
    } catch (error) {
      toast.error('No rewards found for this email')
      setCustomerData(null)
    } finally {
      setLoading(false)
    }
  }

  const rewardTiers = [
    { name: 'Bronze', points: 0, discount: '5%', icon: FaMedal, color: 'text-orange-600' },
    { name: 'Silver', points: 500, discount: '10%', icon: FaMedal, color: 'text-gray-400' },
    { name: 'Gold', points: 1000, discount: '15%', icon: FaTrophy, color: 'text-luxury-gold' },
    { name: 'Platinum', points: 2000, discount: '20%', icon: FaGem, color: 'text-cyan-400' }
  ]

  const getCurrentTier = (points) => {
    if (points >= 2000) return rewardTiers[3]
    if (points >= 1000) return rewardTiers[2]
    if (points >= 500) return rewardTiers[1]
    return rewardTiers[0]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold gradient-text mb-4">
            Rewards Program
          </h1>
          <p className="text-white/70 text-lg">
            Earn points with every purchase and unlock exclusive benefits!
          </p>
        </div>

        {/* Check Rewards Form */}
        <div className="glass-effect p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Check Your Rewards</h2>
          <form onSubmit={checkRewards} className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="btn-primary px-8"
            >
              {loading ? 'Checking...' : 'Check'}
            </motion.button>
          </form>
        </div>

        {/* Customer Rewards Display */}
        {customerData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Points Summary */}
            <div className="glass-effect p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {customerData.name}!</h2>
                  <p className="text-white/70">Member since {new Date(customerData.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  {(() => {
                    const TierIcon = getCurrentTier(customerData.rewardPoints).icon
                    return <TierIcon className={`text-6xl ${getCurrentTier(customerData.rewardPoints).color}`} />
                  })()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-effect p-6 rounded-xl text-center">
                  <FaCoins className="text-4xl text-luxury-gold mx-auto mb-2" />
                  <div className="text-3xl font-bold gradient-text">{customerData.rewardPoints}</div>
                  <div className="text-white/70 text-sm">Available Points</div>
                </div>

                <div className="glass-effect p-6 rounded-xl text-center">
                  <FaGift className="text-4xl text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{customerData.pendingPoints}</div>
                  <div className="text-white/70 text-sm">Pending Points</div>
                </div>

                <div className="glass-effect p-6 rounded-xl text-center">
                  <FaTrophy className="text-4xl text-purple-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{customerData.totalOrders}</div>
                  <div className="text-white/70 text-sm">Total Orders</div>
                </div>
              </div>
            </div>

            {/* Current Tier */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Your Tier: {getCurrentTier(customerData.rewardPoints).name}</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  {(() => {
                    const TierIcon = getCurrentTier(customerData.rewardPoints).icon
                    return <TierIcon className={`text-5xl ${getCurrentTier(customerData.rewardPoints).color}`} />
                  })()}
                </div>
                <div>
                  <p className="text-xl font-bold text-luxury-gold">
                    {getCurrentTier(customerData.rewardPoints).discount} Discount on All Orders
                  </p>
                  <p className="text-white/70">You have {customerData.rewardPoints} points</p>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {customerData.rewardPoints < 2000 && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to {rewardTiers.find(t => t.points > customerData.rewardPoints)?.name}</span>
                    <span>{customerData.rewardPoints} / {rewardTiers.find(t => t.points > customerData.rewardPoints)?.points}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-luxury-gold to-yellow-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(customerData.rewardPoints / rewardTiers.find(t => t.points > customerData.rewardPoints)?.points) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/60">Total Spent:</span>
                  <span className="ml-2 text-xl font-bold text-luxury-gold">${customerData.totalSpent.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-white/60">Last Order:</span>
                  <span className="ml-2">{new Date(customerData.lastOrderDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reward Tiers Info */}
        <div className="glass-effect p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Reward Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {rewardTiers.map((tier, index) => {
              const TierIcon = tier.icon
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect p-6 rounded-xl text-center hover:bg-white/10 transition-all"
                >
                  <TierIcon className={`text-4xl mb-3 mx-auto ${tier.color}`} />
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-white/70 text-sm mb-2">{tier.points}+ points</p>
                  <p className="text-luxury-gold font-bold">{tier.discount} OFF</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-effect p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-luxury-gold font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shop & Earn</h3>
                <p className="text-white/70 text-sm">Earn 10% of your purchase amount as reward points</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-luxury-gold font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Points Activate</h3>
                <p className="text-white/70 text-sm">Points become available when your order is delivered</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-luxury-gold font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Unlock Tiers</h3>
                <p className="text-white/70 text-sm">Accumulate points to reach higher tiers and bigger discounts</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-luxury-gold font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enjoy Benefits</h3>
                <p className="text-white/70 text-sm">Get automatic discounts on all future purchases</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RewardsPage
