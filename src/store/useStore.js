import { create } from 'zustand'

export const useStore = create((set) => ({
  cart: [],
  filters: {
    category: '',
    priceRange: [0, 10000],
    company: '',
    recipient: '',
    sortBy: 'popular'
  },
  
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, item]
  })),
  
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  resetFilters: () => set({
    filters: {
      category: '',
      priceRange: [0, 10000],
      company: '',
      recipient: '',
      sortBy: 'popular'
    }
  })
}))
