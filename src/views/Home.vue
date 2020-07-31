<template>
  <main id="home">
    <Form/>
    <Countries/>
  </main>
</template>
<script>
import Countries from '@/components/Countries.vue'
import Form from '@/components/Form.vue'
export default {
  name: 'Home',
  components: {
    Countries,
    Form
  }
}
</script>
