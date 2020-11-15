import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const LS = {
  save(data) {
    localStorage.setItem("short-url", JSON.stringify(data));
  },
  load() {
    return JSON.parse(localStorage.getItem("short-url") || "[]");
  },
};

export default new Vuex.Store({
  strict: true,
  state: {
    shortUrls: [],
    /*
    資料儲存形式
    {
      Orignal: 原來的網址
      Short: 縮網址後的網址 (ex. https://user12345.pse.is/ABCDEF)
      UserUrl: 取Encode前的網址(ex. https://user12345.pse.is/)
      Encode: 取Encode的網址(ex. ABCDEF)
    }
    */
  },
  mutations: {
    SET_HISTORY_URLS(state, data) {
      state.shortUrls = data; //讓 state.shortUrls 陣列 參照 data
      LS.save(state.shortUrls); // 儲存現在的 state.shortUrls 到 localStorage
    },
    ADD_HISTORY_URLS(state, data) {
      state.shortUrls.push(data); //將新的一筆資料push到 state.shortUrls 陣列中
      LS.save(state.shortUrls); // 儲存現在的 state.shortUrls 到 localStorage
    },
    EDIT_HISTORY_URLS(state, { index, data }) {
      //利用 index 找到 state.shortUrls 內對應位置的那筆資料
      state.shortUrls[index].Short = data.Url + data.Encode; //更改接收到短網址(url+Encode)
      state.shortUrls[index].Encode = data.Encode; //更改接收到的Encode
      LS.save(state.shortUrls); // 儲存現在的 state.shortUrls 到 localStorage
    },
  },
  actions: {
    INIT_HISTORY_URLS({ commit }) {
      commit("SET_HISTORY_URLS", LS.load()); //載入 localStorage 的資料，並交給 SET_HISTORY_URLS 處理
    },
  },
});
