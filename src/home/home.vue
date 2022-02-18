<template>
  <div>
    <div class="box-header">
      <tou></tou>
    </div>
    <el-container style="height: 100%">
      <el-aside width="auto" style="overflow: hidden;background-color:red">
        <el-menu
          :default-active="$route.path"
          text-color="white"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#272a36"
          style="color: white; height:91.5vh"
          :collapse-transition="true"
          :unique-opened="true"
          router
        >
          <div style="margin: auto">
            <button id="collapse" @click="isCollapse = !isCollapse">
              {{ isCollapse == true ? "|||" : "三" }}
            </button>
          </div>
          <el-menu-item
            v-for="mune in noChildern"
            :key="mune"
            :index="mune.navigationUrl"
          >
            <!--     <template     #title>     -->
            <el-icon style="width: 39px; font-size: 32px"
              ><img :src="mune.navigationIcon" alt=""
            /></el-icon>
            <span>{{ mune.navigationName }}</span>
            <!--     </template>     -->
          </el-menu-item>

          <el-sub-menu
            v-for="mune in hasChildern"
            :key="mune"
            :index="mune.navigationUrl"
            v-show="mune.childern.length > 0"
          >
            <template #title>
              <el-icon style="width: 32px; font-size: 32px"
                ><img :src="mune.navigationIcon" alt=""
              /></el-icon>
              <span>{{ mune.navigationName }}</span>
              <!--     {{     mune.children     }}     -->
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="childern in mune.childern"
                :key="childern"
                :index="childern.navigationUrl"
              >
                <el-icon style="font-size: 32px; width: 39px">
                  <img :src="childern.navigationIcon" />
                </el-icon>
                <span>{{ childern.navigationName }}</span>  
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script setup>
import tou from "../components/header.vue";
</script>

<script type="text/javascript">
export default {
  data() {
    return {
      nav: [],
      staffId: 0,
      //是否折叠
      isCollapse: false,
    };
  },
  computed: {
    noChildern() {
      return this.nav.filter((item) => item.childern < 1);
    },
    hasChildern() {
      return this.nav.filter((item) => item.childern);
    },
  },
  methods: {
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.iscollapse = !this.iscollapse;
    },
  },
  created() {
    let _this = this;
    this.staffId = sessionStorage.getItem("staffId");
    this.axios
      .get(
        "http://localhost:8088/TSM/navigation/selectNavigation/" + this.staffId
      )
      .then(function (response) {
        console.log(response);
        _this.nav = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #fff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.box-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #b3c0d1;
}
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
  position: relative;
  z-index: 1000;
}

#collapse {
  display: block;
  margin: auto;
  background: #272a36;
  outline: 0;
  border: none;
  border-radius: 0;
  color: white;
}
</style>
