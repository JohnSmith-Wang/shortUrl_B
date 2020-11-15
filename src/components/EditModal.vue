<template>
  <div
    class="modal fade"
    id="editModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h5 class="modal-title">自訂縮網址</h5>
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
            <!--利用props進來的selTemp顯示資料-->
            <input
              class="form-control"
              v-model="selTemp.Orignal"
              readonly="readonly"
            />
          </div>

          <div class="my-4">
            <h5>原始縮網址</h5>
            <!--利用props進來的selTemp顯示資料-->
            <input
              class="form-control"
              v-model="selTemp.Short"
              readonly="readonly"
            />
          </div>

          <div class="my-4">
            <h5>自訂縮網址</h5>
            <input class="form-control" v-model="edit" />
            <!--綁定data內的edit，另外在一開始會先有資料，是透過watch先寫入的舊Encode，目的在提示使用者只須要改Encode-->
          </div>

          <div class="my-4" v-if="isEdit">
            <!--完成編輯後才會顯示，目的為以醒目的方式告訴使用者更改後的結果-->
            <h5>您的新網址</h5>
            <div class="input-group">
              <input
                id="edit-short-url"
                class="form-control"
                v-model="selTemp.Short"
                readonly="readonly"
              />
              <div class="input-group-append">
                <!--點擊複製按鈕-->
                <button
                  id="edit-copy-icon"
                  type="button"
                  class="btn btn-dark"
                  data-clipboard-target="#edit-short-url"
                  @click="copyIt"
                >
                  <i class="far fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
          <!--主要內容 結束-->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-info"
            @click="submit(selUrlIndex)"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";

export default {
  data() {
    return {
      edit: "",
      newResult: "",
      isEdit: false,
    };
  },
  props: {
    selTemp: {
      //作用於顯示編輯面板的資料
      type: Object,
      required: true,
    },
    selUrlIndex: {
      //作用於傳送給 vuex 處理時，能去抓出在 state 陣列內的哪個位址
      type: Number,
      required: true,
    },
  },
  methods: {
    submit(selUrlIndex) {
      let user = this.selTemp.UserUrl; //取縮網址的網址部分
      let oldEncode = this.selTemp.Encode; //取縮網址的Encode部分
      let newEncode = this.edit; //取使用者想更改的Encode
      const api = `https://api.pics.ee/v1/links/${oldEncode}/encodeId/?access_token=20f07f91f3303b2f66ab6f61698d977d69b83d64&caller=client-simple&lang=zh-tw`;

      this.$http
        .post(api, { value: newEncode })
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit("EDIT_HISTORY_URLS", {
              //傳送給 vuex 的 EDIT_HISTORY_URLS 去處理
              index: selUrlIndex, //告知所在的位址，讓 vuex 的 state 能抓到對應的資料，藉此更動資料
              data: {
                //欲傳給 vuex 的更動資料
                Url: user, //縮網址的網址部分
                Encode: newEncode, //使用者更改的Encode
              },
            });

            this.isEdit = true; //判斷更改完畢，藉此顯示 您的新網址 的部分(v-if=isEdit)

            this.$bus.$emit("message:push", "轉換成功!", "success");
          }
        })
        .catch((err) => {
          this.$bus.$emit("message:push", err, "danger");
        });
    },
    initCopy() {
      new Clipboard("#edit-copy-icon");
    },
    copyIt() {
      this.$bus.$emit("message:push", "複製完畢!", "success");
    },
  },
  watch: {
    selTemp: function (val) {
      this.isEdit = false; //初始化判斷是否已經編輯完成的狀態(預設為false)
      this.edit = val.Encode; //當selTemp有變化時，會將其 Encode 值改寫到 data 下的 edit
    },
  },
  created() {
    this.initCopy();
  },
};
</script>
