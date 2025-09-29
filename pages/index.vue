<template>
  <div class="container">
    <app-header/>
    <hr class="my-6" />
    <div v-if="!products.length">Loading...</div>
    <div class="scroll-row">
      <div v-for="p in products" :key="p.id" class="card">
        <img
          :src="p.image"
          :alt="p.productName"
        class="img"
    />
        <p>{{p.productName}}</p>
        <p>฿{{ p.price }}</p>
        <button class="btn"
                @click="addToCart(p)">Add to Cart</button>
      </div>
    </div>

    <hr class="my-6" />
    <h2 class="text-xl font-bold mb-2">Cart</h2>
    <div v-if="!cart.length">No Item</div>
    <ul>
      <li v-for="c in cart" :key="c.id">{{ c.productName }} - ฿{{ c.price }}</li>
    </ul>
    <p class="t">total price : ฿{{ totalPrice }}</p>
    <button class="btn-clear" @click="clearCart">Clear All</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/product'

const store = useProductStore()
const { products, cart } = storeToRefs(store) 
const { fetchProducts } = store

function addToCart(product: { id: string; productName: string; price: string }) {
  cart.value.push(product)
}

// คำนวณราคารวม
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)
})

// ดึงข้อมูลสินค้า
fetchProducts()
function clearCart() {
  cart.value = []
}

</script>


<style>
</style>
