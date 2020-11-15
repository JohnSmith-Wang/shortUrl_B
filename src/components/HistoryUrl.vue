<template>
  <div class="bg-light result-list p-4">
    <div class="list-scroll">
      <div
        class="col-12 col-xl-10 d-flex flex-column flex-xl-row result-template mx-auto my-4 p-2 p-xl-4"
        v-for="(item, index) in historyIndex"
        :key="item.Encode"
      >
        <div class="col-12 col-xl-9">
          <div class="mb-4">
            <h5>原始網址</h5>
            <input
              class="form-control"
              v-model="item.Orignal"
              readonly="readonly"
            />
          </div>
          <div>
            <h5>縮網址</h5>
            <input
              class="form-control"
              v-model="item.Short"
              readonly="readonly"
            />
          </div>
        </div>
        <div class="col-12 col-xl-3 d-flex align-items-center mt-4 mt-xl-0">
          <div class="mx-auto">
            <button
              type="button"
              class="btn btn-dark"
              @click="openEditModal(index, item)"
            >
              更改縮網址
            </button>
            <!--點擊該按鈕後，會傳送當筆資料的 當筆資料在陣列內的位址(index) 跟 當筆資料(item)-->
          </div>
        </div>
      </div>
    </div>
    <!--此區留給BS框架的modal彈出視窗-->
    <div>
      <EditModal :selTemp="selTemp" :selUrlIndex="selUrlIndex" />
      <!-- selTemp(當前選擇資料)、selIndex(當前選擇資料在陣列內的位址)-->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import EditModal from "@/components/EditModal.vue";
export default {
  data() {
    return {
      selUrlIndex: 0,
      selTemp: {},
    };
  },
  components: {
    EditModal,
  },
  props: {
    historyIndex: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openEditModal(index, item) {
      $("#editModal").modal("show"); //打開編輯面板(EditModal)
      this.selUrlIndex = index;
      this.selTemp = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.result-list {
  border-radius: 20px;
}
.result-template {
  border: 1px solid rgb(179, 177, 177);
  border-radius: 10px;
}
.list-scroll {
  max-height: 500px;
  overflow: auto;
}
</style>
