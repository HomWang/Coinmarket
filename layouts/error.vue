<template>
  <div class="container ErrorContainer">
    <section class="Landscape">
      <img src="../assets/img/home/404Logo.svg" alt="Logo nuxt" class="Landscape__Image">
      <h1 class="Landscape__Title">
        404
      </h1>
      <h2 class="Landscape__SubTitle">
        {{error.statusCode === 404?this.$t('common.header.PageError'):this.$t('common.header.ApplicationError')}}
      </h2>
      <ul class="Landscape__List">
        <li class="Landscape__List__Item">
          <nuxt-link to="/" class="button button--green nuxt-link-active">
            {{this.$t('common.header.HomePage')}}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
<style>
  .Landscape {
    min-height: 100vh;
    background-color: #fff;
    padding: 50px 15px;
    padding-top: 25vh;
    text-align: center;
  }
  article, aside, footer, header, nav, section {
    display: block;
  }
  .Landscape__Image{
    width: 400px;
  }
  .Landscape__Title {
    font-weight: 300;
    letter-spacing: 1px;
    margin: 20px 0;
    color: #35495e;
    font-size: 128px;
    line-height: 100px;
  }
  .Landscape__SubTitle {
    letter-spacing: 1px;
    line-height: normal;
    margin: 20px 0;
    color: #35495e;
  }
  .Landscape__List {
    list-style: none;
    margin: 0;
    padding: 0;
}
.Landscape__List__Item {
    display: inline-block;
    padding: 20px 15px;
    padding-bottom: 0;
}
.Landscape__List__Item .button {
    font-size: 16px;
}
.button--green {
    color: #fff!important;
    border-color: #3b8070;
    background-color: #3b8070;
}

.button {
    position: relative;
    display: inline-block;
    color: #4e5156!important;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 42px;
    padding-top: 13px;
    min-width: 150px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #fff;
    border-radius: 4px;
    letter-spacing: 1px;
    border: 1px solid #75818b;
}
</style>
