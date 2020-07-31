<template lang="pug">
  .wrapper
    .form
      .form-grid
        .form-search
          input(
            type='text',
            name='search',
            id='search',
            autocomplete="off",
            placeholder='Search for a country...',
            aria-label="search country"
            v-model="country"
          )
        .form-select
          .label(v-on:click="toggleMenu") {{ placeholder }}
          ul.items(v-bind:class="{ active: isActive }")
            li.item(v-for="region in regions")
              a(
                href="#",
                v-text="region.label"
                v-on:click.stop.prevent="changeRegion(region)"
              )
</template>
<script>  
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Form",
  data() {
    return{
      isActive: false,
      placeholder: "Filter by Region",
      country: '',
      region: '',
      regions: [
        { label:'Africa', value: 'africa' },
        { label:'Americas', value: 'americas' },
        { label:'Asia', value: 'asia' },
        { label:'Africa', value: 'africa' },
        { label:'Europe', value: 'europe' },
        { label:'Oceania', value: 'Oceania '}
      ]
    }
  },
  created () {
    this.getCountries()
  },
  computed: {
    ...mapState(['countries'])
  },
  methods: {
    ...mapActions(['getCountries','getCountriesByRegion','getCountryByName']),
    async changeRegion(region) {
      this.region = region.value
      this.placeholder = region.label
      this.isActive = !this.isActive;
      await this.getCountriesByRegion(this.region)
    },
    toggleMenu: function() {
      this.isActive = !this.isActive;
    },
    searchCountry: function() {
      if(this.country.length > 0){
        this.getCountryByName(this.country);
      } else {
        this.getCountries();
      }
    }
  },
  watch: {
    country: function() {
      this.searchCountry()
    } 
  }
}
</script>
<style lang="sass">
  .form
    margin-top: 25px
    &-grid
      display: grid
      @media screen and (min-width: 768px)
        grid-template-columns: 1fr 1fr
    &-search
      background-color: var(--white)
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 7px
      border-radius: 5px
      padding-left: 42px
      margin-bottom: 16px
      position: relative
      @media screen and (min-width: 768px)
        width: 360px
      input
        border: none
        display: inline-block
        padding: 14.5px
        width: 100%
        outline: none
      &::before
        content: "\f002"
        font-family: "FontAwesome"
        display: inline-block
        padding: 14.5px
        vertical-align: middle
        position: absolute
        left: 22px
    &-select
      background-color: var(--white)
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 7px
      border-radius: 5px
      display: inline-block
      width: 200px
      margin-top: 16px
      position: relative
      @media screen and (min-width: 768px)
        margin-top: 0
        margin-bottom: 16px
        justify-self: end
      .label
        padding: 14.5px 20px
        &:before
          font-family: "FontAwesome"
          content: "\f078"
          position: absolute
          right: 20px
          font-weight: 300
      .items
        position: absolute
        background-color: var(--white)
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 7px
        top: 60px
        left: 0
        right: 0
        list-style: none
        margin: 0
        padding: 10px 0
        transition: all .3s
        visibility: hidden
        &.active
          visibility: visible
        .item
          &:hover
            background-color: var(--very-light-gray)
          a
            color: var(--dark-blue)
            text-decoration: none
            padding: 4px 20px
            display: block
</style>