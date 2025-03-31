<template>
    <img :src="`assets/icons/arrow-${props.direction}.svg`" :alt="`arrow ${props.direction}`" class="arrow-icon" />
</template>

<script setup lang="ts">
const props = defineProps<{
    direction: 'left' | 'right'
}>();
</script>