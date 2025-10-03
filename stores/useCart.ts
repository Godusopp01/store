// composables/useCart.ts
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/product'

export function useCart() {
  const store = useProductStore()
  const { cart } = storeToRefs(store)
  const placeholder = '/placeholder-200.png'

  function formatPrice(value: number | string) {
    const num = typeof value === 'string' ? parseFloat(value as string) : (value as number)
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(Number.isFinite(num) ? num : 0)
  }

  function increase(item: any) {
    if ((store as any).increaseQuantity) {
      ;(store as any).increaseQuantity(item.id)
      return
    }
    if (item.quantity != null) item.quantity++
    else item.quantity = 2
  }

  function decrease(item: any) {
    if ((store as any).decreaseQuantity) {
      ;(store as any).decreaseQuantity(item.id)
      return
    }
    if (item.quantity == null) {
      removeItem(item.id)
      return
    }
    if (item.quantity > 1) item.quantity--
    else removeItem(item.id)
  }

  function removeItem(id: string) {
    if (typeof (store as any).removeFromCart === 'function') {
      ;(store as any).removeFromCart(id)
    } else {
      cart.value = cart.value.filter(c => c.id !== id)
    }
  }

  function clearAll() {
    if (typeof (store as any).clearCart === 'function') {
      ;(store as any).clearCart()
    } else {
      cart.value = []
    }
  }

  const totalNumber = computed(() => {
    return cart.value.reduce((s: number, i: any) => {
      const price = typeof i.price === 'string' ? parseFloat(i.price) : Number(i.price)
      const qty = i.quantity ?? 1
      return s + (Number.isFinite(price) ? price * qty : 0)
    }, 0)
  })

  const formattedTotal = computed(() =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(totalNumber.value)
  )

  return {
    cart,
    placeholder,
    formatPrice,
    increase,
    decrease,
    removeItem,
    clearAll,
    formattedTotal
  }
}
