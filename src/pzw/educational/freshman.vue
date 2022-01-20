<template>
  <!-- 大div  主要是进行颜色分层 -->
  <div style="background-color: #f5f7fa">
    <!-- 包住所有内容 -->
    <div style="background-color: white">
      <!-- 步骤条 -->
      <div style="padding-top: 1%">
        <el-steps
          :active="active"
          finish-status="success"
          simple
          style="width: 60%; margin: 0 auto; border-radius: 25px"
        >
          <el-step title="1、确认学员基本信息" icon="el-icon-edit"></el-step>
          <el-step title="2、选择报名课程" icon="el-icon-upload"></el-step>
          <el-step title="3、支付信息" icon="el-icon-picture"></el-step>
        </el-steps>
        <!-- 步骤条下面的内容 -->
        <div>
          <!-- <firststep v-if="this.active==0"></firststep> -->
          <!-- 
      ==============================================================================================================================
      第一步填写学员信息      
       -->
          <div v-if="this.active == 0">
            <div style="margin-top: 2%">
              <!-- 基础信息 -->
              <div style="">
                <!-- 基础信息头部 -->
                <div class="information">
                  <span
                    style="background-color: #409eff; width: 0.5%; height: 0.5%"
                    >&nbsp;</span
                  >
                  <span style="padding-left: 1%">基础信息</span>
                </div>
                <!-- 基础信息内容部分 -->
                <div
                  style="
                    color: #606266;
                    border: 1px solid #eee;
                    width: 75%;
                    margin: 0 auto;
                    margin-top: -1%;
                  "
                >
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <!-- 姓名 -->
                    <el-row :gutter="24">
                      <el-col :span="12">
                        <el-form-item
                          label="姓名"
                          prop="inforname"
                          style="margin-top: 3%"
                        >
                          <el-input
                            v-model="ruleForm.inforname"
                            style="width: 60%"
                            placeholder="请填写学员姓名"
                            size="small"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <!-- 性别 -->
                        <el-form-item
                          label="性别"
                          prop="inforsexs"
                          style="margin-top: 2.5%"
                        >
                          <el-radio-group v-model="ruleForm.inforsexs">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 联系方式 -->
                    <el-row :gutter="24">
                      <el-col :span="12">
                        <el-form-item label="联系方式" prop="infocontact">
                          <el-input
                            v-model="ruleForm.infocontact"
                            size="small"
                            placeholder="请填写手机号码"
                            style="width: 60%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <!-- 年龄和出生年月 -->
                      <el-col :span="12">
                        <el-form-item label="年龄" prop="date1">
                          <el-date-picker
                            v-model="form.date1"
                            type="date"
                            size="small"
                            placeholder="Pick a date"
                            style="width: 50%"
                            @change="suan"
                          ></el-date-picker>
                          <el-input
                            v-model="form.age"
                            style="width: 20%; margin-left: 5%; color: black"
                            size="small"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="12">
                        <!-- 家长联系方式 -->
                        <el-form-item label="家长联系方式" prop="information">
                          <el-input
                            v-model="ruleForm.information"
                            size="small"
                            placeholder="请填写家长手机号码"
                            style="width: 60%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="毕业学校" prop="infoschool">
                          <el-input
                            v-model="ruleForm.infoschool"
                            size="small"
                            placeholder="请填写毕业学校"
                            style="width: 60%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="家庭地址" prop="infoaddress">
                      <el-input
                        v-model="ruleForm.infoaddress"
                        size="small"
                        placeholder="请填写家庭地址"
                        style="width: 90%"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <!-- 
   =================================================================================================================================
   第二步：填写选项课程
       -->
          <div v-else-if="this.active == 1">
            <div>
              <!-- 头部 -->
              <div
                style="
                  padding-top: 3%;
                  border-bottom: 3px solid #eee;
                  padding-bottom: 1%;
                  margin-left: 7.5%;
                  width: 85%;
                "
              >
                <span style="margin-left: 0%; color: #303133; font-size: 14px"
                  >报名方式：</span
                >
                <span
                  style="
                    border: none;
                    color: #f60;
                    background-color: white;
                    font-size: 14px;
                    margin-left: 1%;
                    cursor: pointer;
                  "
                  @click="centerDialogVisible = true"
                  >选课报名</span
                >
              </div>
              <!-- 中间部分 -->
              <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
                <span
                  style="
                    background-color: #409eff;
                    width: 0.5%;
                    height: 0.5%;
                    margin-left: 2%;
                  "
                  >&nbsp;</span
                >
                <div style="margin-top: -1.5%; margin-left: 3.5%">
                  <span
                    style="color: #303133; font-size: 14px; font-weight: 700"
                    >选择的课程</span
                  >
                </div>
              </div>
              <!-- 
    ========================================================================================================================  
      表格
       -->
              <div>
                <el-table
                  class="tableOne"
                  :data="tablesj"
                  style="width: 84%; margin-left: 2%; margin-top: 2%; margin: 0 auto;max-height=300"
                >
                  <el-table-column
                    prop="courseName"
                    style="margin: 0 auto"
                    label="课程名称"
                    width="160"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="courseMoney"
                    label="课程金额"
                    width="160"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="courseHour"
                    label="课时数量"
                    width="160"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="coursePrice"
                    label="课时单价"
                    width="160"
                  >
                  </el-table-column>
                  <el-table-column prop="bookFee" label="书本费" width="160">
                  </el-table-column>
                  <el-table-column
                    prop="courPayable"
                    label="应付金额"
                    width="160"
                  >
                  <template #default="scope">
                    {{scope.row.courseMoney+scope.row.bookFee}}
                  </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                      <el-button
                        @click="open()"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              
              </div>
              <!-- 
      ========================================================================================================================
      选课报名弹框 
      -->
              <el-dialog
                v-model="centerDialogVisible"
                title="选择课程"
                width="45%"
                destroy-on-close
                center
              >
                <!-- 弹框： 搜索文本框 -->
                <el-input
                  placeholder="请输入课程名称"
                  style="width: 25%"
                  size="small"
                  v-model="input"
                  clearable
                >
                </el-input>
                <!-- 弹框： 搜索按钮 -->
                <!-- <div class="searchbutton"> -->
                  <el-button size="small" style="background:#f60" @click="sskc()"> 
                    <el-icon color="white"><search /></el-icon>
                    </el-button>
                <!-- </div> -->
                <!-- 重置 -->
                <el-link
                  :underline="false"
                  style="color: rgb(0, 0, 0); margin-top: -8%; margin-left: 36%"
                  >重&nbsp;置</el-link
                >
                <!--
      ==========================================================================================================================   
        弹框表格 -->
                <div class="wrap">
                  <div class="myTable">
                    <el-table
                      :data="tableDataTwo"
                      class="tableTwo"
                      ref="multipleTable"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @select="select"
                      @row-click="rowClick"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column
                        prop="courseName"
                        label="课程名称"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="courseHour"
                        label="课程数量"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="coursePrice"
                        label="课时单价"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="bookFee"
                        label="书本费"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="courseMoney"
                        label="课时金额"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <br />
                <!-- 
        ==========================================================================================================================
        分页
         -->
                <div class="block" style="margin-left: 1%">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.currentPage"
                    :page-sizes="[2,4,6,8]"
                    :page-size="pageInfo.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total"
                  >
                  </el-pagination>
                </div>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="qxan()"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="qdxzkc()"
                      >确认</el-button
                    >
                   
                  </span>
                </template>
              </el-dialog>
            </div>
          </div>
          <!-- <secondstep v-else-if="this.active==1"></secondstep> -->
          <!-- 
  ==================================================================================================================================
  第三步：缴费信息
           -->
           <div v-else-if="this.active==2">
            <!-- 包所有的内容 -->
  <div>
    <!-- 订单信息 -->
    <div>
      <!-- 订单信息 -->
      <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
        <span
          style="
            background-color: #409eff;
            width: 0.5%;
            height: 0.5%;
            margin-left: 2%;
          "
          >&nbsp;</span
        >
        <div style="margin-top: -1.5%; margin-left: 3.5%">
          <span style="color: #303133; font-size: 14px; font-weight: 700"
            >订单信息</span
          >
        </div>
      </div>
      <!-- 订单信息表格 -->
      <div>
        <el-table
          class="tableOne"
          :data="tableData1"
          stripe="true"
          border
          style="width: 84%; margin-left: 2%; margin-top: 2%; margin: 0 auto"
        >
          <el-table-column
            prop="courname"
            style="margin: 0 auto"
            label="课程名称"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="couramount" label="课程金额" width="180">
          </el-table-column>
          <el-table-column prop="courhours" label="课时数量" width="180">
          </el-table-column>
          <el-table-column prop="courprice" label="课时单价" width="180">
          </el-table-column>
          <el-table-column prop="courbook" label="书本费" width="180">
          </el-table-column>
          <el-table-column prop="courpayable" label="应付金额" width="186">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 支付信息 -->
    <div>
      <!-- 支付信息 -->
      <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
        <span
          style="
            background-color: #409eff;
            width: 0.5%;
            height: 0.5%;
            margin-left: 2%;
          "
          >&nbsp;</span
        >
        <div style="margin-top: -1.5%; margin-left: 3.5%">
          <span style="color: #303133; font-size: 14px; font-weight: 700"
            >支付信息</span
          >
        </div>
      </div>
      <!-- 支付信息内容 -->
      <el-form
        :model="ruleForm1"
        :rules="rules1"
        ref="ruleForm1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div style="border: 1px solid #eee; width: 84%; margin-left: 8%">
          <!-- 学员姓名 -->
          <div style="margin-top: 1.5%; margin-left: 2%; width: 16%">
            <span style="font-size: 14px; color: #606266">学员姓名</span>
            <span style="margin-left: 12%; color: #303133; font-size: 14px"
              >aaaa</span
            >
          </div>
          <!-- 应付价格 -->
          <div style="margin-left: 19%; margin-top: -2%">
            <span style="font-size: 14px; color: #606266">应付价格</span>
            <span style="color: red; margin-left: 2%">￥ 4500元</span>
          </div>
          <!-- 经办人 -->
          <el-form-item
            label="经办人"
            prop="handler"
            style="margin-top: 1%; margin-left: -1%"
          >
            <el-select
              v-model="ruleForm1.handler"
              placeholder="请选择经办人"
              size="small"
              style="width: 26%"
            >
              <el-option label="张三" value="shanghai"></el-option>
              <el-option label="李四" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 支付方式 -->
          <el-form-item label="支付方式" prop="payment">
            <el-radio-group
              v-model="ruleForm1.payment"
              placeholder="请选择支付方式"
            >
              <el-radio-button border label="微信" size="small" style="margin: 0 2px"
                ><img
                  src="../../assets/img/微信图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span>微信</span></el-radio-button
              >
              <!-- 支付宝 -->
              <el-radio-button border label="支付宝" size="small" style="margin: 0 10px"
                ><img
                  src="../../assets/img/支付宝图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span>支付宝</span></el-radio-button
              >
              <!-- 现金 -->
              <el-radio-button border label="现金" size="small"
                ><img
                  src="../../assets/img/现金图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span>现金</span></el-radio-button
              >
              <!-- 刷卡 -->
              <el-radio-button border label="刷卡" size="small" style="margin: 0 10px"
                ><img
                  src="../../assets/img/银行卡图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span>刷卡</span></el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <!-- 支付金额 -->
          <el-form-item label="支付金额" prop="pamount">
            <el-input
              v-model="ruleForm1.pamount"
              size="small"
              style="width: 15%"
              class="textright"
            ></el-input
            >元
            <el-button
              size="small"
              style="
                background: #fff0e6;
                border-color: #ffc299;
                color: #f60;
                margin: 0 15px;
              "
              id="payfull"
              >全额付款</el-button
            >
          </el-form-item>
        <!-- 支付时间 -->
        <el-form-item prop="value3" label="支付时间" class="demonstration">
       <div class="block">
    <el-date-picker
      v-model="ruleForm1.value3"
      type="datetime"
      placeholder="选择支付时间"
      :default-time="defaultTime"
      size="small"
    >
    </el-date-picker>
  </div>
        </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
           </div>
          <!-- <thirdstep v-else-if="this.active == 2"></thirdstep> -->
        </div>
        <!-- 上一步按钮 -->
        <el-button
          v-if="this.active == 0"
          style="margin-left: 38%; margin-top: 3%; margin-bottom: 2%"
          @click="nextOne"
          >取消</el-button
        >
        <el-button
          v-else-if="this.active <= 2"
          style="margin-left: 38%; margin-top: 3%; margin-bottom: 2%"
          @click="nextOne"
          >上一步</el-button
        >
        <!-- 下一步按钮 -->
       
               <el-button
          v-if="this.active ==0"
          style="margin-left: 4%"
          @click="next('ruleForm')"
          >下一步</el-button
        >
 
  
               <el-button
          v-if="this.active==1"
          style="margin-left: 4%"
          @click="next1('tablesj')"
          >下一步</el-button
        >
       
     
        <el-button
          v-else-if="this.active == 2"
          style="margin-left: 4%"
          @click="tjopen('ruleForm1')"
          >确认提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import firststep from "../educational/firststep.vue";
import secondstep from "../educational/secondstep.vue";
import thirdstep from "../educational/thirdstep.vue";
import qs from 'qs';
  import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      active: 0,
      nextone: "取消",
      routepath: JSON.parse(sessionStorage.getItem("routepath")),
      // 表单验证
      ruleForm: {
        // 姓名
        inforname: "",
        // 性别
        inforsexs: "男",
        // 联系方式
        infocontact: "",
        // 家长联系方式
        information: "",
        // 家庭地址
        infoaddress: "",
        // 毕业学校
        infoschool: "",
      },
      // 新增访客弹框出生日期
      form: {
        date1: "",
        age: 0,
      },
      rules: {
        inforname: [
          { required: true, message: "请填写学员姓名", trigger: "blur" },
        ],
        inforsexs: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        infocontact: [
          {
            required: true,
            min: 11,
            max: 11,
            message: "长度在11位数",
            trigger: "blur",
          },
        ],
      },
      // 第二步值
      // ==========================================================================================================================
       multipleSelection:[],
       //sessionstorage存表格数据
       tablesess:[],
      radio:false,
      // sessionstorage存数据
      tableData: [],
      //表格
      tablesj:[],
      // 弹框的表格
      tableDataTwo: [],
      // 弹框
      centerDialogVisible: false,
      //  弹框内容：  搜索文本框
      input: "",
      // 分页
     pageInfo: {
        total: 0,
        size: 2,
        currentPage: 1,
      },
      //=============================================================================================================================
      //第三步：缴费信息
       // 支付时间
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      // 订单信息
      tableData1: [
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
      ],
      // 支付信息内容表单
      ruleForm1: {
        // 经办人
        handler: "",
        // 支付方式
        payment: "",
        // 支付金额
        pamount: "0",
        // 支付时间
        value3:"",
      },
      rules1: {
        // 经办人
        handler: [
          { required: true, message: "请选择经办人", trigger: "change" },
        ],
        // 支付方式
        payment: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        // 支付金额
        pamount: [
          { required: true, message: "请填写支付金额", trigger: "blur" },
        ],
        // 支付时间
        value3: [
          { required: true, message:"选择支付时间", trigger: "blur"}
        ],
      },
    };
  },

  methods: {
    tjopen(ruleForm1) {
       this.$refs[ruleForm1].validate((valid) => {
        if (valid) {
      this.$confirm("请确认报名信息无误,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "报名成功!",
          });
          this.nextaa();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消报名",
          });
        });
       } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    nextaa() {
      this.routepath.forEach((item) => {
        this.$router.push(item.path);
      });
    },
    // 下一步
    next(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.active++;
          var userEntity = {
              name:this.ruleForm.inforname,
              sex:this.ruleForm.inforsexs,
              phone:this.ruleForm.infocontact,
              csny:this.form.date1,
              age:this.form.age,
              jzphone:this.ruleForm.information,
              byxx:this.ruleForm.infoschool,
              jtzz:this.ruleForm.infoaddress,
            };
         sessionStorage.setItem('user', JSON.stringify(userEntity));
          if (this.active > 2) { 
            
            this.active = 0;
          }
          var userJsonStr = sessionStorage.getItem('user');
          userEntity = JSON.parse(userJsonStr);
          this.tableData=userEntity
          console.log(userEntity.name+"json数据"); // => tom
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     // 下一步
    next1() {
      console.log(this.tablesj+"集合")
      if(this.tablesj==undefined||this.tablesj==null||this.tablesj.length<=0){
          ElMessage.warning({
            message: '需要选择学习的课程',
            type: 'warning',
          })
      }else{
         console.log(this.multipleSelection.courseMoney+"json数据name");
          this.active++;
            var cour = {
              courseId:this.tablesj.courseId,
              courseMoney:this.tablesj.courseMoney,
              courseName:this.tablesj.courseName,
              courseHour:this.tablesj.courseHour,
              coursePrice:this.tablesj.coursePrice,
              courPayable:this.tablesj.courPayable,
              bookFee:this.tablesj.bookFee,
             
            };
         sessionStorage.setItem('cour', JSON.stringify(cour));
          var courJson = sessionStorage.getItem('cour');
          cour = JSON.parse(courJson);
          this.tablesess=cour
          console.log(cour.courseId+"json数据ID"); // => tom
          if (this.active > 2) {
            this.active = 0;
          }
          }
    },
    // 上一步
    nextOne() {
      if (this.active == 0) {
        this.routepath.forEach((item) => {
          this.$router.push(item.path);
        });
      }
      this.active--;
      if (this.active < 1) {
        this.active = 0;
      }
    },
   

    //   表单的确定和取消，暂时没使用
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //日期转换成年龄
    suan() {
      console.log("ssssss");
      const birthStr = this.form.date1;
      console.log(birthStr);
      let d = new Date();
      let age =
        d.getFullYear() -
        birthStr.getFullYear() -
        (d.getMonth() < birthStr.getMonth() ||
        (d.getMonth() == birthStr.getMonth() &&
          d.getDate() < birthStr.getDate())
          ? 1
          : 0);
      this.form.age = age;
      console.log("年龄", age);
    },

    // 第二步方法
    //=============================================================================================================================
     // 表格
    // handleClick(row) {
    //   console.log(row);
    // },
   // 表格的选中 可以获得当前选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }, 
    select(selection, row) {
	// 清除 所有勾选项
	this.$refs.multipleTable.clearSelection()
	// 当表格数据都没有被勾选的时候 就返回
	// 主要用于将当前勾选的表格状态清除
	if(selection.length == 0) return 
	this.$refs.multipleTable.toggleRowSelection(row, true);
},
// 表格某一行的单击事件
rowClick(row, column) {
    const selectData = this.multipleSelection
    this.$refs.multipleTable.clearSelection()
    if( selectData.length==1 ) {
        selectData.forEach(item => {
        	// 判断 如果当前的一行被勾选, 再次点击的时候就会取消选中
            if (item == row) {
                this.$refs.multipleTable.toggleRowSelection(row, false);
            }
            // 不然就让当前的一行勾选
            else {
                this.$refs.multipleTable.toggleRowSelection(row, true);
                
            }
        })
    } 
    else {
        this.$refs.multipleTable.toggleRowSelection(row, true);
    }

},
//确定新增课程弹窗
 qdxzkc(){
     this.input='',
      this.centerDialogVisible = false
       this.tablesj=this.multipleSelection
       this.sskc()
     
     
    
  },
  qxan(){
     this.centerDialogVisible = false
     this.input='',
      this.crea()
   
  },
//搜索课程
  sskc(){
    var _this=this
    this.axios.get("http://localhost:8088/TSM/course/mohuselect",{
      params:{
          currentPage: _this.pageInfo.currentPage,
              size: _this.pageInfo.size,
            kcmc:_this.input,
        }
    }).then(respon=>{
      console.log(respon.data)
        this.tableDataTwo = respon.data.records;
          this.pageInfo.total = respon.data.total;
    }).catch(function(err){

    })
  },
    
    
    
  // 分页
    handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/course/mohuselect", {
          params:{
          currentPage: _this.pageInfo.currentPage,
              size: _this.pageInfo.size,
            kcmc:_this.input,
        }
					})
					.then(function(response) {
						console.log("1-------------------------------------------")
						console.log(response.data)
						_this.tableDataTwo = response.data.records
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.size = size
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/course/mohuselect", {
           params:{
          currentPage: _this.pageInfo.currentPage,
              size: _this.pageInfo.size,
            kcmc:_this.input,
        }
					})
					.then(function(response) {
						console.log("2-------------------------------------------")
						console.log(response.data)
						_this.tableDataTwo = response.data.records
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
    // 表格删除弹框
    open() {
      this.$confirm("确定删除此课程吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tablesj=[]
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    crea() {
    let _this=this;
    this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params: _this.pageInfo
    })
    .then(response =>{
      console.log(response);
      this.tableDataTwo=response.data.records;
      this.pageInfo.total=response.data.total
    })
    .catch(function(error){
       console.log(error);
    })
  },
  },
    //直接查询
  created() {
    let _this=this;
    this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params: _this.pageInfo
    })
    .then(response =>{
      console.log(response);
      this.tableDataTwo=response.data.records;
      this.pageInfo.total=response.data.total
    })
    .catch(function(error){
       console.log(error);
    })
  },
  components: {
    firststep,
    secondstep,
    thirdstep,
  },
};
</script>
<style>
/* 基础信息头部 */
.information {
  padding-top: 1.5%;
  padding-bottom: 1%;
  border: 1px solid #eee;
  width: 75%;
  margin: 1% auto;
  font-weight: 700;
  font-size: 14px;
}
.searchbutton {
  background-color: #f60;
  width: 4%;
  margin-top: -5%;
  margin-left: 25%;
  padding: 1%;
  padding-left: 2%;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
}
/* 表格 */
.tableOne.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 弹框表格 */
.tableTwo.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 表格 */
.tableOne.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.textright .el-input__inner {
  text-align: right;
}
</style>
<style lang="less" scoped>
.wrap {
 
  /deep/ .myTable {
    /*  审查DOM也可以找到这个结构，同上  */
    .el-table__header-wrapper {
      .el-checkbox__inner {
        display: none !important;
      }
    }
  }
}

</style>