<template>
  <div class="page-cart p-6 max-w-4xl mx-auto">
    <NuxtLink to="/" class="btn-back mb-6">← Back to Store</NuxtLink>

    <h1 class="text-2xl font-bold mb-4">Cart</h1>

    <div v-if="!cart.length" class="py-12 text-center">No Item</div>

    <div v-else>
      <ul class="space-y-4">
        <li v-for="item in cart" :key="item.id" class="items-center flex gap-4 p-4 border rounded">
          <img :src="item.image || placeholder" class="cart-img" />
          <div class="flex-1">
            <div class="font-medium">{{ item.productName }}</div>
            <div class="mt-2">Price : {{ formatPrice(item.price) }}</div>
          </div>

          <div class="item">
            <button @click="decrease(item)">-</button>
            <div class="w-10 text-center">{{ item.quantity ?? 1 }}</div>
            <button @click="increase(item)">+</button>
          </div>

          <div class="w-28 text-right">
            <div class="font-semibold">Total : {{ formatPrice((item.price ?? 0) * (item.quantity ?? 1)) }}</div>
            <button class="text-sm mt-2 underline" @click="removeItem(item.id)">Delete</button>
          </div>
        </li>
      </ul>

      <div class="mt-6 flex justify-between items-center">
        <button class="btn-clear px-4 py-2 border rounded" @click="clearAll">Clear All</button>

        <div class="text-right">
          <div class="text-sm text-gray-600">Total Price :</div>
          <div class="text-xl font-bold">{{ formattedTotal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart'

const { cart, placeholder, formatPrice, increase, decrease, removeItem, clearAll, formattedTotal } = useCart()
</script>

<style >

</style>
