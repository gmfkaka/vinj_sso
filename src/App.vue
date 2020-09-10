<template>
  <div id="app" :key="channelCode">
    <!-- <header-view></header-view> -->
    <router-view/>
    <!-- <footer-view></footer-view> -->
  </div>
</template>

<script>
import headerView from './components/header'
import footerView from './components/footer'
export default {
  data () {
    return {
      channelCode: ''
    }
  },
  name: 'App',
  components: {
    headerView,
    footerView
  },
  methods: {
    GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  },
  watch: {
    '$route': function (newUrl, oldUrl) {
      if (newUrl !== oldUrl) {
        this.channelCode = this.$route.query.channelCode
      }
    }
  },
  mounted () {
    // if (!this.$util.getCookie('accessToken')) {
    //   this.$util.setCookie('accessToken', this.GetQueryString('accessToken'))
    // }
    // console.log(this.GetQueryString('accessToken'))
  }
}
</script>

<style>
html,body,#app{
  width: 100%;
  font-family:PingFang-SC;
  height: 100%;
}
.labelBox{
  width: 400px;
  height: 116px;
  position: absolute;
  transform-origin: center top;
  z-index: 2003;
  display: block !important;
}
.labelItem{
  vertical-align: middle;
}
</style>
