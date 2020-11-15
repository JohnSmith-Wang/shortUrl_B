<template>
  <div class="container-fluid px-0">
    <!--此區為 製作縮網址 的component -->
    <div class="py-3 p-md-4 bg-dark">
      <MakeShortUrl />
    </div>

    <!--此區為 歷史紀錄 的component-->
    <div class="py-3 p-md-4 bg-history">
      <div class="col-12 col-md-8 mx-auto">
        <h1 class="text-dark mb-4">歷史紀錄</h1>
        <HistoryUrl :historyIndex="historyIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import MakeShortUrl from "@/components/MakeShortUrl.vue";
import HistoryUrl from "@/components/HistoryUrl.vue";
export default {
  components: {
    MakeShortUrl,
    HistoryUrl,
  },
  computed: {
    historyIndex() {
      return this.$store.state.shortUrls;
    },
  },
  created() {
    this.$store.dispatch("INIT_HISTORY_URLS"); //讀取 localStorage ， 初始化 vuex 下的 state
  },
};
</script>

<style lang="scss" scoped>
.bg-history {
  background-color: rgb(164, 229, 231);
}
</style>
