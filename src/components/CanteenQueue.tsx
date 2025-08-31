import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, AlertCircle, Check, ShoppingBag, Plus, Minus } from 'lucide-react'

interface CanteenQueueProps {
  isOpen: boolean
  onClose: () => void
}

const CanteenQueue: React.FC<CanteenQueueProps> = ({ isOpen, onClose }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'queue' | 'order' | 'menu'>('queue')
  
  // State for cart items
  const [cartItems, setCartItems] = useState<{
    id: number
    name: string
    price: number
    quantity: number
  }[]>([])
  
  // Sample canteen data
  const canteens = [
    {
      id: 1,
      name: 'Main Canteen',
      currentWait: '15-20 min',
      status: 'Busy',
      statusColor: 'bg-yellow-500',
      operatingHours: '8:00 AM - 8:00 PM',
      image: '/image.png', // Replace with an actual canteen image
    },
    {
      id: 2,
      name: 'Coffee Corner',
      currentWait: '5-10 min',
      status: 'Normal',
      statusColor: 'bg-green-500',
      operatingHours: '8:30 AM - 7:00 PM',
      image: '/image.png', // Replace with an actual canteen image
    },
    {
      id: 3,
      name: 'Juice Bar',
      currentWait: '2-5 min',
      status: 'Light',
      statusColor: 'bg-green-500',
      operatingHours: '9:00 AM - 5:00 PM',
      image: '/image.png', // Replace with an actual canteen image
    },
    {
      id: 4,
      name: 'Night Mess',
      currentWait: '25-30 min',
      status: 'Very Busy',
      statusColor: 'bg-red-500',
      operatingHours: '7:00 PM - 2:00 AM',
      image: '/image.png', // Replace with an actual canteen image
    }
  ]
  
  // Sample menu items
  const menuItems = [
    {
      id: 1,
      name: 'Veg Sandwich',
      price: 40,
      category: 'Snacks',
      description: 'Fresh vegetables in white bread',
      availability: true,
      prepTime: '5-7 min',
      canteenId: 1
    },
    {
      id: 2,
      name: 'Masala Dosa',
      price: 60,
      category: 'South Indian',
      description: 'Crispy dosa with potato filling',
      availability: true,
      prepTime: '10-12 min',
      canteenId: 1
    },
    {
      id: 3,
      name: 'Cappuccino',
      price: 35,
      category: 'Beverages',
      description: 'Espresso with steamed milk foam',
      availability: true,
      prepTime: '3-5 min',
      canteenId: 2
    },
    {
      id: 4,
      name: 'Cold Coffee',
      price: 40,
      category: 'Beverages',
      description: 'Chilled coffee with ice cream',
      availability: true,
      prepTime: '5-7 min',
      canteenId: 2
    },
    {
      id: 5,
      name: 'Fresh Orange Juice',
      price: 30,
      category: 'Juices',
      description: 'Freshly squeezed orange juice',
      availability: true,
      prepTime: '2-4 min',
      canteenId: 3
    },
    {
      id: 6,
      name: 'Mixed Fruit Juice',
      price: 45,
      category: 'Juices',
      description: 'Blend of seasonal fruits',
      availability: true,
      prepTime: '3-5 min',
      canteenId: 3
    },
    {
      id: 7,
      name: 'Chicken Biryani',
      price: 90,
      category: 'Main Course',
      description: 'Aromatic rice with chicken pieces',
      availability: true,
      prepTime: '15-20 min',
      canteenId: 4
    },
    {
      id: 8,
      name: 'Paneer Butter Masala',
      price: 80,
      category: 'Main Course',
      description: 'Cottage cheese in rich tomato gravy',
      availability: true,
      prepTime: '12-15 min',
      canteenId: 4
    }
  ]
  
  // Sample orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234',
      items: [
        { name: 'Veg Sandwich', quantity: 1, price: 40 },
        { name: 'Cappuccino', quantity: 1, price: 35 }
      ],
      total: 75,
      status: 'In Progress',
      estimatedTime: '10 min',
      canteen: 'Main Canteen',
      timestamp: '10:45 AM'
    }
  ])
  
  // Function to add item to cart
  const addToCart = (item: any) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      setCartItems(
        cartItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }
  
  // Function to remove item from cart
  const removeFromCart = (id: number) => {
    const existingItem = cartItems.find(item => item.id === id)
    
    if (existingItem?.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(
        cartItems.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      )
    }
  }
  
  // Calculate total cart amount
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  // Place order function
  const placeOrder = () => {
    if (cartItems.length > 0) {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        items: cartItems,
        total: cartTotal,
        status: 'In Progress',
        estimatedTime: '15 min',
        canteen: 'Main Canteen',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setOrders([newOrder, ...orders])
      setCartItems([])
      setActiveTab('order')
    }
  }
  
  // Modal variants for animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  }
  
  // Backdrop variants for animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-amber-500 to-amber-600 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Canteen Queue System</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="bg-white border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('queue')}
                  className={`flex items-center justify-center px-6 py-3 font-medium text-sm ${
                    activeTab === 'queue'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Queue Status
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`flex items-center justify-center px-6 py-3 font-medium text-sm ${
                    activeTab === 'menu'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Order Food
                </button>
                <button
                  onClick={() => setActiveTab('order')}
                  className={`flex items-center justify-center px-6 py-3 font-medium text-sm ${
                    activeTab === 'order'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  My Orders
                  {orders.length > 0 && (
                    <span className="ml-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {orders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Queue Status Tab */}
              {activeTab === 'queue' && (
                <div>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      Check current wait times at campus canteens. Plan your visit to avoid peak hours and minimize wait time.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800">
                        Wait times are approximate and may vary depending on rush hours. They are updated every 15 minutes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {canteens.map(canteen => (
                      <motion.div
                        key={canteen.id}
                        whileHover={{ y: -5 }}
                        className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="h-32 bg-gray-200 relative">
                          <img 
                            src={canteen.image} 
                            alt={canteen.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium text-white bg-gray-900/70">
                            {canteen.operatingHours}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-gray-800">{canteen.name}</h3>
                            <div className={`${canteen.statusColor} text-white text-xs px-2 py-1 rounded-full`}>
                              {canteen.status}
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            <div className="text-sm">
                              <span className="text-gray-500">Current Wait:</span>
                              <span className="ml-2 font-medium text-gray-800">{canteen.currentWait}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                            <button 
                              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                              onClick={() => setActiveTab('menu')}
                            >
                              View Menu
                            </button>
                            <button 
                              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                              onClick={() => setActiveTab('menu')}
                            >
                              Order Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Peak Hours</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Breakfast (8:00 AM - 9:30 AM)</span>
                        <div className="w-40 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Lunch (12:30 PM - 2:00 PM)</span>
                        <div className="w-40 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Evening (4:30 PM - 6:00 PM)</span>
                        <div className="w-40 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Dinner (7:30 PM - 9:00 PM)</span>
                        <div className="w-40 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Order Food Tab */}
              {activeTab === 'menu' && (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Menu</h3>
                    
                    {/* Canteen selector */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Canteen</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                        {canteens.map(canteen => (
                          <option key={canteen.id} value={canteen.id}>
                            {canteen.name} - {canteen.status} ({canteen.currentWait} wait)
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Menu categories */}
                    <div className="mb-6">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        <button className="px-3 py-1 text-sm bg-amber-600 text-white rounded-full whitespace-nowrap">
                          All Items
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 whitespace-nowrap">
                          Snacks
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 whitespace-nowrap">
                          South Indian
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 whitespace-nowrap">
                          Beverages
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 whitespace-nowrap">
                          Juices
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 whitespace-nowrap">
                          Main Course
                        </button>
                      </div>
                    </div>
                    
                    {/* Menu items */}
                    <div className="space-y-4">
                      {menuItems.map(item => (
                        <motion.div
                          key={item.id}
                          whileHover={{ y: -2 }}
                          className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex justify-between"
                        >
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.prepTime}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="text-gray-800 font-medium">₹{item.price}</div>
                            <button
                              onClick={() => addToCart(item)}
                              className="mt-2 px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors"
                            >
                              Add to Order
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg sticky top-0 h-fit">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order</h3>
                    
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-1">Add items from the menu to get started</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-800">{item.name}</div>
                                <div className="text-sm text-gray-500">₹{item.price} × {item.quantity}</div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{cartTotal}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Canteen Service Fee</span>
                            <span className="font-medium">₹5</span>
                          </div>
                          <div className="flex justify-between font-bold mt-3 pt-3 border-t border-gray-200">
                            <span>Total</span>
                            <span>₹{cartTotal + 5}</span>
                          </div>
                          
                          <button
                            onClick={placeOrder}
                            className="mt-4 w-full py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            Place Order
                          </button>
                          
                          <div className="mt-3 text-xs text-gray-500 text-center">
                            Estimated preparation time: 15-20 minutes
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* My Orders Tab */}
              {activeTab === 'order' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">My Orders</h3>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        You haven't placed any orders yet. Check out the menu and place your first order.
                      </p>
                      <button
                        onClick={() => setActiveTab('menu')}
                        className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
                          <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex justify-between items-center">
                            <div>
                              <span className="text-xs text-gray-500">Order ID</span>
                              <div className="font-medium text-gray-800">{order.id}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Time</span>
                              <div className="font-medium text-gray-800">{order.timestamp}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Status</span>
                              <div className="font-medium text-amber-600">{order.status}</div>
                            </div>
                            <div className="hidden md:block">
                              <span className="text-xs text-gray-500">Canteen</span>
                              <div className="font-medium text-gray-800">{order.canteen}</div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-800">
                                      {item.quantity} × {item.name}
                                    </span>
                                    <span className="text-gray-600">₹{item.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                              <div>
                                <span className="text-gray-500 text-sm">Total</span>
                                <div className="font-bold text-gray-800">₹{order.total}</div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="text-sm text-gray-500">
                                  Ready in ~{order.estimatedTime}
                                </div>
                                <button className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded hover:bg-amber-200 transition-colors">
                                  Track Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Last updated: Just now
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg text-gray-700 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CanteenQueue
