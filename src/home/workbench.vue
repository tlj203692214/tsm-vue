<template>
  <div>
    <main class="mains main-container">
      <div class="el-scrollbar" style="height: 100%">
        <div
          class="wrapper main-wrapper el-wrap"
          style="margin-bottom: -17px; margin-right: -17px"
        >
          <div class="el-view">
            <div class="dashboard-wrapper">
              <p class="title">
                <el-icon>
                  <i-orange style="color: orangered" /> </el-icon
                >今日统计
              </p>
              <div class="today-data rows">
                <div
                  class="el-col el-col-6"
                  style="padding-left: 7.5px; padding-right: 7.5px"
                >
                  <div data-v-d8a87178 class="today-item">
                    <p class="today-title">员工出勤</p>
                    <div class="teacher-attendce">
                      <p
                        style="height: 36px; line-height: 36px; padding: 0 16px"
                      >
                        实到<span class="color-success">{{ cqyg }}</span>人
                        <span class="divider">/</span>
                        应到<span class="color-primary">{{ ydyg }}</span>人
                      </p>
                      <div style="width: 100px; margin: -36px 160px 0">
                        <div id="contain" style="height: 100%"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="el-col el-col-6"
                  style="padding-left: 7.5px; padding-right: 7.5px"
                >
                  <div data-v-d8a87178 class="today-item">
                    <p class="today-title">学员签到</p>
                    <div class="student-sign">
                      <div>
                        <p>
                          实到<span class="color-success">0</span
                          ><span class="divider">/</span> 应到<span
                            class="color-primary"
                            >{{ zdxy }}</span
                          >
                        </p>
                        <p>请假<span class="color-danger">0</span></p>
                      </div>
                      <div style="width: 100px">
                        <div id="container" style="height: 100%"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-12" style="padding-left: 7.5px">
                  <div data-v-d8a87178 class="today-item">
                    <p class="today-title">公告通知</p>
					<ul>
                    <li v-for="(a,index) in NoticeData">
                       <div style="width:70%;word-break: break-all;word-wrap: break-word;float:left"><span style="font-size:10px;">{{index+1}}、{{ a.noticeContent}}{{a.value}}</span></div>
                        <div style="float:right"><span style="color: gray; font-size: 10px; fixed:right;" >{{ a.noticeDate }}</span></div>
                    </li>
					</ul>
                  </div>
                </div>
              </div>
              <div class="shortcut-container" style="margin-bottom: 0px">
                <div
                  class="rows"
                  style="margin-left: -7.5px; margin-right: -7.5px"
                >
                  <div
                    class="el-col el-col-12"
                    style="padding-left: 7.5px; padding-right: 7.5px"
                  >
                    <p class="title">
                      <el-icon>
                        <i-orange style="color: orangered" /> </el-icon
                      >快捷入口
                    </p>
                    <div
                      class="shortcut-entrance rows"
                      style="margin-left: -8px; margin-right: -8px"
                    >
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                          <router-link to="xsbm"><img src="../assets/img/works/a.png" /></router-link>
                          <p>新生报名</p>
                        </div>
                      </div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                          <router-link to="staffsign"><img src="../assets/img/works/b.png" /></router-link>
                          <p>员工打卡</p>
                        </div>
                      </div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                        <router-link to="shitu"><img src="../assets/img/works/c.png" /></router-link>
                          <p>学员登记</p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="shortcut-entrance rows"
                      style="margin-left: -8px; margin-right: -8px"
                    >
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      ></div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      ></div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      ></div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                          <img src="../assets/img/works/d.png" />
                          <p>课表查看</p>
                        </div>
                      </div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                          <img src="../assets/img/works/e.png" />
                          <p>订单管理</p>
                        </div>
                      </div>
                      <div
                        class="el-col el-col-8"
                        style="padding-left: 8px; padding-right: 8px"
                      >
                        <div class="shortcut-item">
                          <img src="../assets/img/works/f.png" />
                          <p>老师备课</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="el-col el-col-12"
                    style="padding-left: 7.5px; padding-right: 7.5px"
                  >
                    <p class="title">
                      <el-icon>
                        <i-orange style="color: orangered" /> </el-icon
                      >机构统计
                    </p>
                    <div class="stat-wrapper">
                      <div class="grid-wrapper">
                        <div class="grid-item">
                          <div></div>
                        </div>
                        <div class="grid-item">
                          <div></div>
                        </div>
                      </div>
                      <div class="grid-wrapper">
                        <div class="grid-item">
                          <div class="grid-content child1">
                            <div class="total-icon">
                              <el-icon style="font-size: 30px">
                                <user />
                              </el-icon>
                            </div>
                            <p class="total-numbers">{{ zdxy }}</p>
                            <p class="total-name">在读学员</p>
                          </div>
                        </div>
                        <div class="grid-item">
                          <div class="grid-content child2">
                            <div class="total-icon">
                              <el-icon style="font-size: 30px">
                                <scale-to-original />
                              </el-icon>
                            </div>
                            <p class="total-numbers">{{ ksbj }}</p>
                            <p class="total-name">开设班级</p>
                          </div>
                        </div>
                      </div>
                      <div class="grid-wrapper">
                        <div class="grid-item">
                          <div class="grid-content child3">
                            <div class="total-icon">
                              <el-icon style="font-size: 30px">
                                <coin />
                              </el-icon>
                            </div>
                            <p class="total-numbers">{{ zdds }}</p>
                            <p class="total-name">总订单数</p>
                          </div>
                        </div>
                        <div class="grid-item">
                          <div class="grid-content child4">
                            <div class="total-icon">
                              <el-icon style="font-size: 30px">
                                <money />
                              </el-icon>
                            </div>
                            <p class="total-numbers">{{ zmoney }}</p>
                            <p class="total-name">订单总金额</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shortcut-container">
                <div
                  class="rows"
                  style="margin-left: -7.5px; margin-right: -7.5px"
                ></div>
              </div>
              <!-- <div class="chart-block">
							<div class="line-chart">
								<div class="title-no-border trend-title">
									<span style="float: left;">
										<el-icon><i-orange style="color: orangered;" /></el-icon>
										<span class="color-primary">订单收入</span>
									</span>
									<div class="el-radio-group">
										<el-radio-group v-model="radio1">
										    <el-radio-button label="最近一月"></el-radio-button>
										    <el-radio-button label="上个月"></el-radio-button>
										</el-radio-group>    
									</div>
								</div>
								<div></div>
							</div>
						</div> -->
            </div>
          </div>
        </div>
        <div class="el-bar is-horizontal"></div>
        <div class="el-bar is-vertical"></div>
      </div>
    </main>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { defineComponent, ref } from "vue";
export default {
  setup() {
    return {
      radio1: ref("最近一月"),
    };
  },
  data() {
    return {
      cqyg: "",
      ydyg: "",
      zdxy: "",
      ksbj: "",
      zdds: "",
      zmoney: "",
      staffId: sessionStorage.getItem("staffId"),
      deptId: "",
      NoticeData: [],
    };
  },
  mounted() {
    this.Chart = echarts.init(document.getElementById("contain"));
    this.op = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "员工出勤",
          type: "pie",
          radius: ["0%", "70%"],
          label: {
            show: false,
            position: "center",
          },
          data: [
            {
              value: 0,
              name: "应到",
            },
            {
              value: 0,
              name: "实到",
            },
          ],
        },
      ],
    };
    this.Chart.showLoading();
    setTimeout(() => {
      if (this.op && typeof this.op === "object") {
        this.op.series[0].data[0].value = this.ydyg;
        this.op.series[0].data[1].value = this.cqyg;
        this.Chart.setOption(this.op);
        this.Chart.hideLoading();
      }
    }, 500);
    this.myChart = echarts.init(document.getElementById("container"));
    this.option = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "学员签到",
          type: "pie",
          radius: ["40%", "70%"],
          label: {
            show: false,
            position: "center",
          },
          data: [
            {
              value: 0,
              name: "应到",
            },
            {
              value: 0,
              name: "请假",
            },
            {
              value: 0,
              name: "实到",
            },
          ],
        },
      ],
    };
    this.myChart.showLoading();
    setTimeout(() => {
      if (this.option && typeof this.option === "object") {
        this.option.series[0].data[0].value = this.zdxy;
        this.myChart.setOption(this.option);
        this.myChart.hideLoading();
      }
    }, 500);
  },
  methods: {
    staffCount() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staff/staffCount")
        .then(function (response) {
          console.log("应到员工", response.data);
          _this.ydyg = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    staffsigns() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staffsignCount")
        .then(function (response) {
          console.log("出勤员工", response.data);
          _this.cqyg = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    zdstudent() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/student/studentcount")
        .then(function (response) {
          console.log("在读学员", response.data);
          _this.zdxy = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ksclass() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/classes/classcount")
        .then(function (response) {
          console.log("开设班级", response.data);
          _this.ksbj = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    zorders() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoney/paymoneyCount")
        .then(function (response) {
          console.log("总订单数", response.data);
          _this.zdds = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ordernum() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoney/paymoneysum")
        .then(function (response) {
          console.log("订单总金额", response.data);
          _this.zmoney = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectDept() {
      //通过员工id查询所属部门

      this.axios
        .post("http://localhost:8088/TSM/dept/selectDepts/" + this.staffId)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.deptId = res.data[0].deptId;
          console.log(this.deptId + "sss");
          this.ckgg();
        });
    },
    ckgg() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/notice/selectNotice/" + this.deptId)
        .then(function (response) {
			console.log(response.data,"公告数据");
          _this.NoticeData = response.data.records;
        });
    },
  },
  created() {
    this.selectDept();
    this.staffCount();
    this.staffsigns();
    this.zdstudent();
    this.ksclass();
    this.zorders();
    this.ordernum();
  },
};
</script>

<style>
body {
  background: #f5f7fa;
  color: #303133;
  font-size: 14px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  margin: 0;
}

.el-scrollbar {
  position: relative;
}

.mains {
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 1;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  padding: 20px;
}

.main-container {
  padding: 0;
  overflow: hidden;
}

.el-scrollbar .wrapper {
  overflow-x: hidden;
}

.main-container .main-wrapper {
  padding: 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.el-wrap {
  overflow: scroll;
  height: 100%;
}

.dashboard-wrapper {
  margin-left: 10px !important;
  margin-right: 10px !important;
  padding: 0 !important;
}

.title {
  position: relative;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 12px;
  font-weight: 700;
}

.today-data {
  margin-bottom: 5px;
}

.rows {
  box-sizing: border-box;
}

.rows:after,
.rows:before {
  display: table;
}

.el-col-6 {
  width: 25%;
}

.today-item[data-v-d8a87178] {
  background: #fff;
  height: 140px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}

.today-title {
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  border-bottom: 1px solid #ebeef5;
}

.today-item:hover .today-title {
  color: #ff7e00;
}

.el-progress {
  position: relative;
  line-height: 1;
}

.el-progress-bar__outer {
  border-radius: 100px;
  background-color: #ebeef5;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.el-progress__text {
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  line-height: 1;
}

.today-data .today-item > div {
  padding: 12px 16px;
}

.student-sign {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}

.student-sign p span {
  font-size: 18px;
  margin-left: 3px;
}

.color-success {
  color: #67c23a;
}

.divider {
  margin: 0 16px;
}

.color-primary {
  color: #f60;
}

.color-danger {
  color: red;
}

.color-warning {
  color: #ff7e00;
}

ul li {
  list-style: none;
}

.class-service {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
}

.class-service li {
  width: 50%;
  margin-top: 12px;
  color: #303133;
}

.class-service span {
  font-size: 18px;
  margin-right: 4px;
}

.notification-record {
  display: flex;
}

.notification-record span {
  font-size: 18px;
  margin-right: 4px;
}

.notification-record li + li[data-v-d8a87178] {
  margin-top: 12px;
}

.el-col-12 {
  width: 50%;
}

.el-col-8 {
  width: 33.33333%;
}

.shortcut-item {
  height: 120px;
  margin-bottom: 10px;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 2px solid #ffbd0c;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.el-col:nth-child(2) .shortcut-item {
  border-color: #3dd23f;
}

.el-col:nth-child(3) .shortcut-item {
  border-color: #ff7e00;
}

.el-col:nth-child(4) .shortcut-item {
  border-color: #1082ff;
}

.el-col:nth-child(5) .shortcut-item {
  border-color: #ff7e00;
}

.shortcut-item img {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 6px;
}

.shortcut-container {
  margin-bottom: 10px;
}

.shortcut-container .wrapper {
  height: 300px;
  margin-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #fff;
  border-radius: 3px;
}

.stat-wrapper {
  height: 300px;
  margin-top: 5px;
}

.grid-wrapper {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.grid-item {
  width: 50%;
}

.grid-content {
  padding: 16px;
  height: 145px;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  z-index: 3;
  cursor: pointer;
}

.child1 {
  margin-bottom: 10px;
  margin-right: 7px;
}

.child2 {
  margin-bottom: 10px;
  margin-left: 7px;
}

.child3 {
  margin-right: 7px;
}

.child4 {
  margin-left: 7px;
}

.child1 .total-icon {
  background: rgba(103, 194, 58, 0.2);
  color: #67c23a;
}

.child2 .total-icon {
  background: rgba(64, 158, 255, 0.2);
  color: #409eff;
}

.child3 .total-icon {
  background: rgba(245, 108, 108, 0.2);
  color: #f56c6c;
}

.child4 .total-icon {
  background: rgba(255, 102, 0, 0.2);
  color: #f60;
}

.total-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
  font-size: 30px;
  border-radius: 50%;
}

.total-numbers {
  font-size: 21px;
  font-weight: 700;
  color: #606266;
  text-align: center;
  margin-top: 12px;
}

.total-name {
  font-size: 14px;
  color: #909399;
  text-align: center;
}

.chart-block {
  display: flex;
  -webkit-box-align: start;
  align-items: flex-start;
}

.line-chart {
  flex-shrink: 1;
  width: 100%;
  background: #fff;
  padding: 0 16px;
}

.title-no-border {
  position: relative;
  font-size: 14px;
  font-weight: 700;
}

.trend-title {
  margin: 0;
  height: 44px;
  line-height: 44px;
}

.inline-select {
  display: inline-block;
  padding-right: 26px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  margin-right: 20px;
}

.el-radio-group {
  float: right;
}
</style>
