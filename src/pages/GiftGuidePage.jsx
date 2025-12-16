import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHeart, FaChild, FaUsers, FaChalkboardTeacher, FaBriefcase, FaCode, FaGamepad, FaLightbulb, FaDollarSign, FaEdit, FaGift } from 'react-icons/fa'

const GiftGuidePage = () => {
  const giftGuides = [
    {
      icon: FaHeart,
      title: 'Friend / Girlfriend / Boyfriend / Wife / Husband',
      color: 'from-red-500 to-pink-500',
      recipient: ['Friend', 'Girlfriend', 'Boyfriend', 'Wife', 'Husband'],
      ideas: [
        {
          category: 'Personal & Thoughtful',
          items: ['Handwritten letter + keepsake', 'Custom ornament', 'Photo album', 'Activity coupons', 'Memory scrapbook']
        },
        {
          category: 'Cozy & Relaxing',
          items: ['Luxury blanket', 'Scented candles', 'Comfy loungewear', 'Spa gift set', 'Aromatherapy diffuser']
        },
        {
          category: 'Shared Experiences',
          items: ['Movie night package', 'Dinner gift card', 'Weekend trip voucher', 'Concert tickets', 'Cooking class']
        }
      ]
    },
    {
      icon: FaChild,
      title: 'Children / Younger Kids',
      color: 'from-blue-500 to-purple-500',
      recipient: ['Children'],
      ideas: [
        {
          category: 'Fun & Play',
          items: ['Educational toys', 'Board games', 'Stuffed animals', 'Building blocks', 'Art supplies']
        },
        {
          category: 'Personalized',
          items: ['Custom blankets', 'Name-engraved items', 'Personalized storybooks', 'Custom backpacks', 'Monogrammed items']
        }
      ]
    },
    {
      icon: FaUsers,
      title: 'Parents',
      color: 'from-green-500 to-teal-500',
      recipient: ['Parents'],
      ideas: [
        {
          category: 'Useful & Relaxing',
          items: ['Cozy blankets', 'Gourmet food baskets', 'Self-care kits', 'Hobby-related gifts', 'Coffee/tea sets']
        },
        {
          category: 'Sentimental & Practical',
          items: ['Photo frames', 'Kitchen gadgets', 'Garden tools', 'Reading accessories', 'Home decor']
        }
      ]
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Teacher / Educator',
      color: 'from-yellow-500 to-orange-500',
      recipient: ['Teacher'],
      ideas: [
        {
          category: 'Simple & Thoughtful',
          items: ['Snacks/baked goods', 'Coffee/tea samplers', 'Self-care kits', 'Bath bombs & candles', 'Relaxation items']
        },
        {
          category: 'Useful Supplies',
          items: ['Nice tote bag', 'Planner/notebook', 'Quality stationery', 'Classroom supplies', 'Desk organizers']
        },
        {
          category: 'Heartfelt',
          items: ['Handwritten thank you card', 'Appreciation note', 'Student artwork', 'Memory book', 'Gift card']
        }
      ]
    },
    {
      icon: FaBriefcase,
      title: 'Coworker / Casual Acquaintance',
      color: 'from-indigo-500 to-blue-500',
      recipient: ['Coworker'],
      ideas: [
        {
          category: 'Desk Essentials',
          items: ['Desk organizers', 'Mouse pad', 'Charging hub', 'Reusable water bottle', 'Small desk decor']
        },
        {
          category: 'Comfort & Wellness',
          items: ['Scented candle', 'Reusable mug/thermos', 'Cozy scarf', 'Hand cream', 'Stress relief items']
        },
        {
          category: 'Safe Choices',
          items: ['Gift cards', 'Snack baskets', 'Coffee/tea sets', 'Small plants', 'Neutral decor']
        }
      ]
    },
    {
      icon: FaCode,
      title: 'Developer / Tech-savvy Friend',
      color: 'from-purple-500 to-pink-500',
      recipient: ['Developer'],
      ideas: [
        {
          category: 'Tech Gadgets',
          items: ['Mechanical keyboard', 'Wireless mouse', 'USB hub', 'Cable organizers', 'Laptop stand']
        },
        {
          category: 'Coding Gear',
          items: ['Programming books', 'Tech-themed apparel', 'Code editor stickers', 'Developer tools', 'Monitor light bar']
        }
      ]
    },
    {
      icon: FaGamepad,
      title: 'Gamer / Hobbyist',
      color: 'from-cyan-500 to-blue-500',
      recipient: ['Gamer'],
      ideas: [
        {
          category: 'Gaming Peripherals',
          items: ['Gaming headset', 'RGB mouse pad', 'Controller accessories', 'Gaming chair cushion', 'Cable management']
        },
        {
          category: 'Hobby-Related',
          items: ['Collectibles', 'Themed merchandise', 'Game gift cards', 'Streaming equipment', 'Custom items']
        }
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold gradient-text mb-4">
          Gift Ideas Guide
        </h1>
        <p className="text-white/70 text-lg max-w-3xl mx-auto">
          Thoughtful gift recommendations for everyone in your life. Find the perfect present based on who you're shopping for!
        </p>
      </motion.div>

      <div className="space-y-8">
        {giftGuides.map((guide, index) => (
          <motion.div
            key={guide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${guide.color} p-6`}>
              <div className="flex items-center space-x-4">
                <guide.icon className="text-4xl text-white" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{guide.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {guide.ideas.map((idea, ideaIndex) => (
                  <div key={ideaIndex} className="glass-effect p-4 rounded-xl">
                    <h3 className="text-lg font-semibold mb-3 text-luxury-gold">{idea.category}</h3>
                    <ul className="space-y-2">
                      {idea.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2 text-sm text-white/80">
                          <span className="text-luxury-gold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {guide.recipient.map((rec) => (
                  <Link key={rec} to={`/catalog?recipient=${rec}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary text-sm"
                    >
                      Shop for {rec}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect p-8 rounded-2xl mt-12"
      >
        <h2 className="text-3xl font-display font-bold gradient-text mb-6 text-center">
          Gift Giving Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <FaLightbulb className="text-4xl mb-3 mx-auto text-luxury-gold" />
            <h3 className="font-semibold mb-2">Think Personal</h3>
            <p className="text-sm text-white/70">Consider their interests, hobbies, and personality</p>
          </div>
          <div className="text-center">
            <FaDollarSign className="text-4xl mb-3 mx-auto text-luxury-gold" />
            <h3 className="font-semibold mb-2">Set a Budget</h3>
            <p className="text-sm text-white/70">Thoughtful doesn't mean expensive</p>
          </div>
          <div className="text-center">
            <FaEdit className="text-4xl mb-3 mx-auto text-luxury-gold" />
            <h3 className="font-semibold mb-2">Add a Note</h3>
            <p className="text-sm text-white/70">A heartfelt message makes any gift special</p>
          </div>
          <div className="text-center">
            <FaGift className="text-4xl mb-3 mx-auto text-luxury-gold" />
            <h3 className="font-semibold mb-2">Presentation Matters</h3>
            <p className="text-sm text-white/70">Beautiful wrapping shows you care</p>
          </div>
        </div>
      </motion.div>

      {/* Browse All Gifts CTA */}
      <div className="text-center mt-12">
        <Link to="/catalog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xl px-12 py-6"
          >
            Browse All Gifts
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default GiftGuidePage
