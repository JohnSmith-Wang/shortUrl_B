<template>
  <div class="col-12 col-md-6 my-4 mx-auto">
    <!--主要進行縮網址的區域-->
    <div class="input-group">
      <input
        name="origna-url"
        class="form-control"
        :class="{ 'is-invalid': errors.has('origna-url') }"
        v-model="url"
        v-validate="'required'"
        required
        placeholder="在此輸入您的網址"
      />
      <div class="input-group-append">
        <button type="button" class="btn btn-info" @click="submit">
          進行縮網址
        </button>
      </div>
    </div>

    <!--此區留給BS框架的modal彈出視窗-->
    <div>
      <ResultModal :result="result" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import ResultModal from "@/components/ResultModal.vue";

export default {
  data() {
    return {
      url: "",
      result: {},
    };
  },
  components: {
    ResultModal,
  },
  methods: {
    submit() {
      const api =
        "https://api.pics.ee/v1/links?access_token=20f07f91f3303b2f66ab6f61698d977d69b83d64&caller=client-simple&lang=zh-tw";

      this.$http
        .post(api, { url: this.url })
        .then((response) => {
          if (response.status === 200) {
            let temp; //用來暫存欲儲存的格式
            let shortUrl = response.data.data.picseeUrl; //取回回傳的網址

            temp = {
              Orignal: this.url, //原來的網址
              Short: shortUrl, //縮網址後的網址
              UserUrl: shortUrl.substr(0, 25), //取Encode前的網址(取第0個至第25個字符，屬於消極作法)
              Encode: shortUrl.substr(25), //取Encode的網址(取前面網址後方到最後的文字)
            };

            this.$store.commit("ADD_HISTORY_URLS", temp); //丟給 Vuex 的 ADD_HISTORY_URLS 動作，目的在於儲存 localStorage
            this.result = temp; //丟給 data 的 result，目的在於顯示結果畫面時需要用的資料

            this.url = ""; //清空使用者輸入網址(url)的欄位

            $("#reusltModal").modal("show"); //利用JQuery 打開結果畫面(ResultModal)
            this.$bus.$emit("message:push", "轉換成功!", "success"); //發送成功通知
          }
        })
        .catch(() => {
          this.$bus.$emit(
            "message:push",
            "請確認格式! 或是當前伺服器錯誤!",
            "danger"
          ); //一旦錯誤時，會直接報錯(消極處理)
        });
    },
  },
};
</script>
