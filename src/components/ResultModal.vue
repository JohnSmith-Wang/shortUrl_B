<template>
  <div
    class="modal fade"
    id="reusltModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h5 class="modal-title">轉換成功!</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span class="text-light" aria-hidden="true">&times;</span>
          </button>
        </div>
        <!--主要內容 開始-->
        <div class="modal-body">
          <div class="mb-4">
            <h5>原始網址</h5>
            <input
              id="orignal-url"
              class="form-control"
              v-model="result.Orignal"
              readonly="readonly"
            />
          </div>
          <div class="my-4">
            <h5>縮網址</h5>
            <div class="input-group">
              <input
                id="short-url"
                class="form-control"
                v-model="result.Short"
                readonly="readonly"
              />
              <div class="input-group-append">
                <!--點擊複製按鈕-->
                <button
                  id="copy-icon"
                  type="button"
                  class="btn btn-dark"
                  data-clipboard-target="#short-url"
                  @click="copyIt"
                >
                  <i class="far fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--主要內容 結束-->
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //引入按鍵複製套件，目的在於點擊按鍵後會直接複製 data-clipboard-target 的指定內容

export default {
  data() {
    return {};
  },
  props: {
    result: {
      type: Object,
      require: true,
    },
  },
  methods: {
    initCopy() {
      new Clipboard("#copy-icon");
    },
    copyIt() {
      this.$bus.$emit("message:push", "複製完畢!", "success");
    },
  },
  mounted() {
    this.initCopy();
  },
};
</script>
