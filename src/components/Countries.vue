<template lang="pug">
  .wrapper
    .countries
      .countries-grid
        .country(v-if="countries.length > 0" v-for="(country, index) in countries")
          router-link(:to="{ name: 'detail', params: { country: country.name.trim().toLowerCase() } }")
            img(v-lazy="country.flag")
            .country-info
              h2(v-text="country.name")
              p
                strong Population:
                |  {{ country.population | toFormatNumber }}
              p
                strong Region:
                |  {{ country.region }}
              p
                strong Capital:
                |  {{ country.capital }}
        .alert(v-if="error")
          p {{ error }}.
</template>
<script>
import { mapState } from "vuex";

export default {
  name:'Countries',
  computed: {
    ...mapState(['countries','error'])
  },
}
</script>
<style lang="sass">
  .countries
    &-grid
      padding: 30px
      display: grid
      grid-template-columns: 1fr
      gap: 20px
      @media screen and (min-width: 768px)
        padding: 30px 0
        grid-template-columns: 1fr 1fr 1fr 1fr
        gap: 40px
      .country
        overflow: hidden
        background-color: var(--white)
        border-radius: 5px
        margin: 10px
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 7px
        a
          text-decoration: none
          color: var(--very-light-dark-blue)
        @media screen and (min-width: 768px)
          margin: 0
        img
          width: 100%
          height: 160px
          @supports(object-fit: cover)
            height: 160px
            object-fit: cover
            object-position: center center
        &-info
          padding: 30px 25px
          @media screen and (min-width: 768px)
            padding: 30px 25px
          h2
            font-size: 1rem
            font-weight: 800
            margin: 0 0 22px 0
          p
            margin: 4px 0
            strong
              font-weight: 600
    .alert
      font-size: 2em
      padding: 20px
      border-radius: 5px
      text-align: center
</style>