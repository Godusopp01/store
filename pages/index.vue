<template>
  <div class="main">
  <app-header/>
  <hr class="my-6" />
  <button class="go-cart">
      <NuxtLink to="/cart" class="px-4 py-2 bg-blue-600 text-white rounded">
        🛒 Go to Cart ({{ cart.length }})
      </NuxtLink>
  </button>
    <div v-if="!products.length">Loading...</div>

    <div class="scroll-row">
      <div v-for="p in products" :key="p.id" class="card">
        <img :src="p.image" :alt="p.productName" class="img" />
        <p>{{ p.productName }}</p>
        <p>฿{{ p.price }}</p>
        <button class="btn-add"
                @click="addToCart(p)">Add to Cart</button>
      </div>
    </div>

    <hr class="my-6" />
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
// ดึงข้อมูลสินค้า
fetchProducts()
function clearCart() {
  cart.value = []
}
</script>


<style>
body { font-family: sans-serif; }
</style>
