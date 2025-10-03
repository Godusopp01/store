import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any[],
    cart: [] as any[]
  }),
  getters: {
    totalPrice: (s) => s.cart.reduce((sum, p) => sum + p.price, 0)
  },
  actions: {
    async fetchProducts() {
      const { data } = await axios.get('https://68d35a39214be68f8c6589da.mockapi.io/api/v1/store')
      this.products = data
    },
    removeFromCart(id: string) {   
      this.cart = this.cart.filter(c => c.id !== id)
    },
    clearCart() {   
      this.cart = []
    },
    addToCart(item:any) {
      this.cart.push(item)
    }
  }
  
})
