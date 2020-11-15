<template>
  <div id="app">
    <Alert />
    <router-view />

    <footer class="py-4 bg-dark">
      <div class="col-10 mx-auto text-light">
        <div class="text-center">
          <h5>此網站僅供學術交流使用，切勿使用於商業行為</h5>
        </div>
        <div class="text-center mt-2">
          技術提供、資料來源
          <div>
            <a class="mr-4" target="_blank" href="https://picsee.io/"
              >PicSee 縮短網址</a
            >
            <a target="_blank" href="https://user.picsee.io/developers/"
              >PicSee免費短網址API</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Alert from "@/components/AlertMessage";
export default {
  data() {
    return {};
  },
  components: {
    Alert,
  },
};
</script>

<style lang="scss">
@import "./assets/all";

#app {
  height: 100%;
}
</style>
