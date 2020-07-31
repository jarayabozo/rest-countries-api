<template lang="pug">
  .wrapper
    .country(v-if="country")
      .back
        router-link(to="/")
          i.fas.fa-arrow-left
          |  Back
      .country-grid
        figure
          img(v-lazy="country.flag" :alt="country.name")
        .country-content
          h1(v-text="country.name")
          .country-content-detail
            ul
              li
                strong Native Name: 
                |  {{country.nativeName}}
              li
                strong Population: 
                |  {{country.population}}
              li
                strong Region: 
                |  {{country.region}}
              li
                strong Sub Region: 
                |  {{country.subRegion}}
              li
                strong Capital: 
                |  {{country.capital}}
            ul
              li
                strong Top Level Domain: 
                span(v-for="domain in country.topLevelDomain") {{ domain }}
                  i(v-if="country.topLevelDomain.length > 1 && country.topLevelDomain.length < country.topLevelDomain.length") ,&nbsp;
              li
                strong Currencies: 
                span(v-for="(currency, index) in country.currencies") {{ currency.name }}
                  i(v-if="country.currencies.length > 1 && country.currencies.length < country.currencies.length") ,&nbsp;
              li
                strong Languages: 
                span(v-for="(lang, index) in country.languages") {{ lang.name }}
                  i(v-if="country.languages.length > 1 && index < country.languages.length - 1") ,&nbsp;
          .country-content-footer
            ul
              caption Border Countries:
              |
              li(v-for="(border, index) in borderCountries" @click="gotoCountry(border)") {{ border }}
</template>
<script>
export default {
  name:'Country',
  data() {
    return {
      country: null,
      borderCountries: []
    }
  },
  created() {
    this.getCountry();
  },
  methods: {
    async getCountry(){
      try {
        const response = await this.axios.get(`https://restcountries.eu/rest/v2/name/${this.$route.params.country}`)
        this.country = response.data[0];
        this.searchBorderCountries();
      }catch(error) {
        console.error(error);
      }
    },
    searchBorderCountries() {
      const borders = []
      this.country.borders.forEach((code) => {
        this.searchCode(code).then(function(defs){
            borders.push(defs)
        });
      })
      this.borderCountries = borders;
    },
    async searchCode(code) {
      const response = await this.axios.get(`https://restcountries.eu/rest/v2/alpha/${code.toLowerCase()}`)
      return response.data.name;
    },
    gotoCountry(name) {
      this.$router.push(`/detail/${name}`)
      this.$router.go()
    }
  }
}
</script>
<style lang="sass">
  .country
    margin-top: 40px
    margin-bottom: 100px
    @media screen and (min-width: 768px)
      margin-top: 74px
    &-grid
      display: grid
      grid-template-columns: 1fr
      @media screen and (min-width: 768px)
        grid-template-columns: 560px 1fr
      gap: 40px
      figure
        padding: 5px
        margin: 50px 0 0 0
        @media screen and (min-width: 768px)
          margin: 30px 0
        img
          max-width: 100%
    &-content
      padding: 0 10px
      align-items: center
      @media screen and (min-width: 768px)
        padding: 0
      h1
        margin: 0 0 20px  
        @media screen and (min-width: 768px)
          margin: 40px 0 20px 0
      &-detail
        display: grid
        grid-template-columns: 1fr
        gap: 20px
        @media screen and (min-width: 768px)
          gap: 10px
          grid-template-columns: 1fr 1fr
        ul
          list-style: none
          padding: 0
          margin: 0
          text-align: left
          line-height: 2
      &-footer
        margin: 0
        padding: 0
        ul
          margin: 40px 0 0 0
          padding: 0
          caption
            text-align: left
            font-weight: 800
            white-space: nowrap
            margin-right: 5px
            display: block
            margin-bottom: 10px
            @media screen and (min-width: 768px)
              display: inline-block
          li
            cursor: pointer
            display: inline-block
            padding: 5px 10px
            margin: 0 5px 10px 0
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px
            border-radius: 5px
    .back
      a
        display: inline-block
        padding: 10px 40px
        margin: 5px
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px
        border-radius: 5px
        text-decoration: none
        color: var(--dark-blue)

</style>