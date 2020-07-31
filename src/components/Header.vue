<template lang="pug">
  header.header
    .wrapper
      .header-grid
        .header-title
          h1 Where in the world?
        .action-mode
          i
          button(v-on:click="updateMode")
            |  Dark Mode     
</template>
<script>  
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  methods: {
    updateMode() {
      document.body.classList.toggle('dark-mode');
    }
  }
}
</script>
<style lang="sass">
  .header
    position: relative
    width: 100%
    background-color: var(--white)
    height: 80px
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 7px
    &-grid
      display: grid
      grid-template-columns: 1fr 1fr
      align-items: center
      height: 100%
    &-title
      text-align: left
      h1
        color: var(--very-light-dark-blue)
        display: inline
        font-size: 0.95em
        font-weight: 800
    .action-mode
      text-align: right
      i:before
        font-style: initial
        font-family: 'Font Awesome 5 Free'
        content: "\f186"
        font-weight: 400
      button
        color: var(--very-light-dark-blue)
        border: none
        background: none
        outline: none
</style>