<template>
  <div style="background: #f5f7fa">
    <div class="tou">
      <!-- 学生姓名 -->
      <!-- <el-row :gutter="15"> -->
        <el-form
          ref="formData"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
            <el-form-item
              style="margin-left: 25px;
    margin-top: -46px;"
              label-width="0"
              prop="field101"
            >
              <el-input
                 class="xxss"
                v-model="formData.field101"
                placeholder="请输入学员姓名"
                clearable
              
              >
              </el-input>
            </el-form-item>
          <!-- </el-col> -->
          <!-- 搜索按钮 -->
          <div class="sstp">
            <el-button type="primary" @click="selectmohhu()">
              <i-icon style="width: 10px; height: 10px">
                <search />
              </i-icon>
              <span style="width: 10px; height: 10px"> </span>
            </el-button>
          </div>

          <!-- 重置按钮 -->
          <!-- <el-col :span="24"> -->
            <el-form-item size="large" style="margin-top: -96px;
    margin-left: 215px;">
              <el-button @click="resetForm1('formData')">重置</el-button>
            </el-form-item>
          <!-- </el-col> -->

          <!-- 新增潜客按钮 -->
          <br />
          <br />
          <br />
          <br />
          <br />


          <!-- 意向课程 -->
          <el-col :span="10">
            <el-form-item label-width="0" prop="field117" style="margin-top: -68px;
    margin-left: 16px;">
              <el-select
                class="yx"
                v-model="formData.field117"
                clearable
                placeholder="意向课程"
                :style="{ width: '100%' }"
                @click="selectkecheng1()"
                  @change="selectmohhu()"
              >
                <el-option
                  v-for="(item, index) in field117Options"
                  :key="item.courseId"
                  :label="item.courseName"
                  :value="item.courseId"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 是否报名 -->
         
            <el-form-item class="sfbm" label-width="0" prop="field120" style="margin-left:165px;margin-top: -68px">
              <el-checkbox-group v-model="formData.field120" size="medium"    @change="selectmohhu()">
                <el-checkbox
                  v-for="(item, index) in field120Options"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>

        </el-form>
   
    </div>
    <!-- 
 ==================================================================================================================================     
      表格 
      -->
    <div class="bgfy">
      <el-table :data="tableData" style="width: 100%" max-height="300">
        <el-table-column type="selection" width="55" />
        <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
        <!-- <el-table-column prop="name" label="姓名"  width="120"/>   -->

        <el-table-column label="姓名" width="150">
          <template #default="scope">
            <span
              style="color: #f60"
              @click="handleEdit(scope.$index, scope.row), showtabs1(),selectgjjl(scope.row)"
              >{{ scope.row.studentfilesName }}</span
            >
           
          </template>
        </el-table-column>
        <el-table-column prop="studentfilesAge" label="年龄" width="150" />
        <el-table-column
          prop="studentfilesPhone"
          label="联系方式"
          width="120"
        />
        <el-table-column prop="courseName" label="意向课程" width="150" />
        <!-- <el-table-column prop="staffName" label="跟进人" width="150" />
        <el-table-column prop="followDate" label="最近跟进" width="150" /> -->
        <el-table-column prop="channelLoc" label="来源渠道" width="150" />
        <el-table-column prop="studentfilesRemarks" label="备注" width="150" />
        <el-table-column prop="studentfilesState" label="状态" width="150">
          <template #default="scope">
            <span v-if="scope.row.studentfilesState == 0">待跟进</span>
            <span v-else-if="scope.row.studentfilesState == 1">跟进中</span>
            <span v-else-if="scope.row.studentfilesState == 2">已流失</span>
            <span v-else>已报名</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
              <div v-if="scope.row.studentfilesState == 3">
                <el-dropdown>
              <span
                style="
                  color: #409eff;
                  position: relative;
                  top: 1px;
                  left: 8px;
                  font-size: 13px;
                "
                class="el-dropdown-link"
              >
                更多
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleEdit1(scope.$index, scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click="scopenschool(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
              </div>
            <div v-else>
            <el-button
              type="text"
              size="small"
              @click="routepath(scope.row)"
            >
              报名
            </el-button>

            <el-dropdown>
              <span
                style="
                  color: #409eff;
                  position: relative;
                  top: 1px;
                  left: 8px;
                  font-size: 13px;
                "
                class="el-dropdown-link"
              >
                更多
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleEdit1(scope.$index, scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click="scopenschool(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 
==================================================================================================================================        
        分页 
        
        -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </div>

   

  <!-- 
  ================================================================================================================================  
    编辑意向学员信息
   -->
   <el-form
      ref="xgruleForm1"
      :model="xgruleForm1"
      :rules="rules1"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-dialog
        v-model="bjcenterDialogVisible"
        title="编辑潜客信息"
        width="50%"
        center
        :show-close="false"
        :close-on-click-modal="close_modal"
      >
        <!-- 姓名 -->
        <el-form-item prop="studentfilesName">
          <span style="margin-left: -15.5%">姓名 </span>
          <div style="display: inline-block">
            <el-input
              v-model="xgruleForm1.studentfilesName"
              placeholder="请填写学员姓名"
            ></el-input>
          </div>
        </el-form-item>
        <br />

        <!-- 性别 -->
        <el-form-item prop="studentfilesSex">
          <span style="margin-left: -15.5%">性别</span>
          <div style="display: inline-block">
            <el-radio-group v-model="xgruleForm1.studentfilesSex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
              <el-radio label="未知">未知</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <!-- 年龄 -->

        <div style="position: relative; top: -70px; left: 235px">
          <el-form-item label="年龄" prop="studentfilesAge">
            <el-input
              v-model="xgruleForm1. studentfilesAge"
              style="width: 14%; margin-right: 10px"
              placeholder="年龄"
              :disabled="true"
            ></el-input>

            <el-date-picker
              v-model="xgruleForm1.studentfilesBirthday"
              type="date"
              placeholder="生日"
              @change="suan1()"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <!-- 来源渠道 -->
        <div style="position: relative; top: -40px; left: -23px">
          <el-form-item label="来源渠道" prop="channelLoc">
            <el-select v-model="xgruleForm1.channelLoc" placeholder="来源渠道" @click="selectqudao2()">
              <el-option
                v-for="item in xgruleForm1.lyqd"
                :key="item.channelId"
                :label="item.channelLoc"
                :value="item.channelId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
       
        <!-- 家长联系电话 -->
        <br />
        <br />
        <div style="position: relative; top: -40px; left: 6px">
          <el-form-item label="家长联系电话" prop="parentPhone">
            <el-input
              v-model.number="xgruleForm1.parentPhone"
              style="width: 30%; margin-right: 10px"
              placeholder="家长联系人电话"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 学生联系电话 -->
        <div style="position: relative; top: -103px; left: 325px">
          <el-form-item label="学生联系电话" prop="studentfilesPhone">
            <el-input
              v-model.number="xgruleForm1.studentfilesPhone"
              style="width: 30%; margin-right: 10px"
              placeholder="学生联系电话"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 分割线 -->
        <el-divider style="margin-top: -75px"></el-divider>
        <!-- 意向课程 -->
        <span style="margin-left: 3%; margin-right: 2%">意向课程</span>
        <el-select  v-model="xgruleForm1.courseName"  placeholder="请选择意向课程" @click="selectkecheng()">
          <template v-for="item in this.options" :key="item.courseId">
        <el-option 
            
            :label="item.courseName"
            :value="item.courseId"
          >
          </el-option>
          </template>
          
        </el-select>
      
        <!-- 学生毕业学校 -->
        <span style="margin-left: 3%">毕业学校</span>
        <el-input
          v-model="xgruleForm1.studentfilesSchool"
          style="width: 30%; margin-left: 10px"
          placeholder="请输入毕业学校"
        />
        <br /><br />
        <!-- 家庭住址 -->
        <span style="margin-left: 3%">家庭住址</span>
        <el-input
          v-model="xgruleForm1.studentfilesLoc"
          style="width: 70%; margin-left: 14px"
          placeholder="学员家庭住址"
        />

        <!--  备注  -->
        <br />
        <br />

        <div class="beiz">
          <span style="margin-left: 3%; margin-top: 3%">备注</span>
          <el-input
            v-model="xgruleForm1.studentfilesRemarks"
            maxlength="200"
            placeholder="备注信息（最多200字）"
            show-word-limit
            type="textarea"
            class=""
          />
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm2('xgruleForm1')">取消</el-button>
            <el-button :plain="true" type="primary" @click="bjsubmitForm('xgruleForm1')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>

  

    <!-- 
==================================================================================================================================      
      跟进记录 
      -->
    <el-dialog v-model="genjinjilu" title="潜客详情" width="50%" center>
      <el-scrollbar height="400px">
        <el-tabs v-model="anniugjjl" @tab-click="handleClick" class="gjbt">
          <el-tab-pane label="基本信息" name="基本信息">
             <el-form
        ref="xgruleForm"
        :rules="rulequdao1"
        :model="xgruleForm"
        label-width="120px"
      >
            <div class="jibenxx">
              <!-- <el-form-item label="名字" prop="studentfilesName">
          <el-input v-model="xgruleForm.studentfilesName"></el-input>
        </el-form-item> -->
             
              <span >名称：{{xgruleForm.studentfilesName}}</span>
              <br /><br /><br />
              <el-button class="bianjijbxx" @click="bjcenterDialogVisible=true">
                <el-icon>
                  <edit />
                </el-icon>
                编辑
              </el-button>
         
              <el-button>
                <el-icon>
                  <delete />
                </el-icon>
                删除
              </el-button>
              <br />
              <br>
            
            </div>

            <!-- 学员基本信息 -->
            <ul class="more-info">
              <li>
                <label>年龄：</label>
                <span
                  >{{xgruleForm.studentfilesAge}}岁 <span style="margin-left: 12px">{{xgruleForm.studentfilesBirthday}}</span></span
                >
              </li>
              <li>
                <label>家长联系电话：</label>
                <span>{{xgruleForm.parentPhone}}</span>
              </li>
              <li>
                <label>学生联系电话：</label>
                <span>{{xgruleForm.studentfilesPhone}}</span>
              </li>
              <li>
                <label>毕业学校：</label>
                <span>{{xgruleForm.studentfilesSchool}}</span>
              </li>
              <li>
                <label>学生住址：</label>
                <span>{{xgruleForm.studentfilesLoc}}</span>
              </li>
              <li>
                <label>备注：</label>
                <span>{{xgruleForm.studentfilesRemarks}}</span>
              </li>
              <li>
                <label>渠道来源：{{xgruleForm.channelLoc}}</label>
              </li>
              <li>
                <label>意向课程：</label>
                <span
                  ><span class="el-tag el-tag--small el-tag--light">{{xgruleForm.courseName}}</span>
                </span>
              </li>
            </ul>
            </el-form>
          </el-tab-pane>

        
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import {
  ArrowLeft,
  Edit,
  Share,
  Delete,
  ArrowRight,
  Close,
  Apple,
  Search,
  ArrowDown,
  Plus,
} from "@element-plus/icons";
import { defineComponent } from "vue";
import qs from "qs";
import { ElConfigProvider } from "element-plus";
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
  components: {},
  props: [],
  data() {
    return {
      //点击弹框外不取消弹框
      close_modal: false,
      //新增
      ruleForm: {
        name: "",
        radio1: ref("男"),
        age: 0,
        value1: "",
        lyqd: ref([]),
        jzlxdh: "",
        xslxdh: "",
        value: ref(0),
        lyqd1: "",
        jiatinzz: "",
        biyexx: "",
        textarea: ref(""), //备注信息
      },
      //意向学员详情
       xgruleForm: {
        studentfilesName: "",//名称
        studentfilesSex: ref(""),//性别
        studentfilesAge: 0,  //年龄
        courseName: "",//意向课程
    followDate: ref([]),//跟进时间
    studentfilesSchool:'',//毕业学校
    studentfilesLoc:'',//家庭住址
        studentfilesPhone: "", //联系电话
       // studentfilesAge: ref(0),//年龄
        channelLoc: "",//来源渠道
        studentfilesBirthday:'',//出生日期
        studentfilesRemarks: ref(""), //备注信息
        studentfilesState:''//意向学生状态
      },
       //修改
      xgruleForm1: {
        studentfilesId:'',//意向学生编号
       studentfilesName: "",//名称
        studentfilesSex: ref(""),//性别
        studentfilesAge: 0,  //年龄 
    followDate: ref([]),//跟进时间
    studentfilesSchool:'',//毕业学校
    studentfilesLoc:'',//家庭住址
        studentfilesPhone:0, //联系电话
        parentPhone:0,//家长联系电话
       // studentfilesAge: ref(0),//年龄
        channelLoc:ref(''),//来源渠道
        studentfilesBirthday:'',//出生日期
        studentfilesRemarks: ref(""), //备注信息
        studentfilesState:'',//意向学生状态
          lyqd: ref([]),//获取渠道信息
          channelid: '',//来源渠道编号
          courseId: "",//意向课程编号
      },
       //跟进添加
      gjruleForm:{
        gjr:'',
          genjinsj: "",
          textarea: ref(""), //备注信息
      },
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        radio1: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "年龄不能为空不能为空",
            trigger: "blur",
          },
        ],
        value1: [
          {
            required: true,
            message: "出生日期不能为空不能为空",
            trigger: "blur",
          },
        ],
        lyqd: [
          {
            required: true,
            message: "来源渠道不能为空不能为空",
            trigger: "blur",
          },
        ],
        jzlxdh: [
          { type: "number", message: "请输入正确号码" },
          {
            required: true,
            message: "家长电话不能为空不能为空",
            trigger: "blur",
          },
        ],
        xslxdh: [
          { type: "number", message: "请输入正确号码" },
          {
            required: true,
            message: "学生电话不能为空不能为空",
          },
        ],
      },
      //编辑规则
      rules1: {
        studentfilesName: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        studentfilesSex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur",
          },
        ],
          studentfilesAge: [
          {
            required: true,
            message: "年龄不能为空不能为空",
            trigger: "blur",
          },
        ],
         studentfilesBirthday: [
          {
            required: true,
            message: "出生日期不能为空不能为空",
            trigger: "blur",
          },
        ],
         channelLoc: [
          {
            required: true,
            message: "来源渠道不能为空不能为空",
            trigger: "blur",
          },
        ],
        parentPhone: [
          { type: "number", message: "请输入正确号码" },
          {
            required: true,
            message: "家长电话不能为空",
            trigger: "blur",
          },
        ],
        studentfilesPhone:[
          { type: "number", message: "请输入正确号码" },
          {
            required: true,
            message: "学生电话不能为空",
          },
        ],
      },
      pageInfo: {
        total: 0,
        size: 2,
        currentPage: 1,
      },
     
      locale: zhCn,
      centerDialogVisible: ref(false), //打开关闭新增潜客界面
      bjcenterDialogVisible: ref(false), //打开关闭编辑潜客界面
      tianjiagj: ref(false), //打开关闭添加跟进界面
      genjinjilu: ref(false),
      
      anniugjjl: "跟进记录",
      anniugjjl1: "基本信息",
      activities: [
      //  {
      //     timestamp: "2018-04-12 20:46",
      //     content: "Custom icon",
      //     size: "large",
      //     color: "#f60",
      //  }
      ],
      tableData: [],
      options: [],

      formData: {
        field102: '学生姓名',
        field101: '',
        field105: null,
        field106: '',
        field114: '',
        field115: '',
        field117: '',
        field118: '',
        field120: [],
      },

      field102Options: [
        {
          label: "",
          value: "学生姓名",
        },
        {
          label: "",
          value: "家长电话",
        },
      ],
      field114Options: [
        {
          label: "待跟进",
          value: 0,
        },
        {
          label: "跟进中",
          value: 1,
        },
        {
          label: "已报名",
          value: 3,
        },
        {
          label: "已流失",
          value: 2,
        },
      ],
      field115Options: ref([]),
      field117Options: ref([]),
      field118Options: ref([]),
      field120Options: [
        {
          label: "已报名",
          value: 1,
        },
      ],
    };
  },
  components: {
    search: Search,
    ElConfigProvider,
    edit: Edit,
    delete: Delete,
    plus: Plus,
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 分页
    handleCurrentChange(currentPage) {
      var _this = this;
      this.pageInfo.currentPage = currentPage;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
     if(_this.formData.field120[0]!=null){
        this.axios.get("http://localhost:8088/TSM/xsmh", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
            xsbm:_this.formData.field120[0],//是否报名
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
          

        })
        .catch(function (error) {
          console.log(error);
        });
    }else{

       this.axios.get("http://localhost:8088/TSM/ssss", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
         
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
        
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    },
    
      handleSizeChange(size) {
      var _this = this;
      this.pageInfo.size = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      if(_this.formData.field120[0]!=null){
        this.axios.get("http://localhost:8088/TSM/xsmh", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
            xsbm:_this.formData.field120[0],//是否报名
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;

        })
        .catch(function (error) {
          console.log(error);
        });
    }else{

       this.axios.get("http://localhost:8088/TSM/ssss", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
         
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    },
   
    //添加意向学员档案
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/studentfiles/addstudentfiles", {
              studentfilesName: this.ruleForm.name,
              studentfilesSex: this.ruleForm.radio1,
              studentfilesAge: this.ruleForm.age,
              studentfilesBirthday: this.ruleForm.value1,
              studentfilesPhone: this.ruleForm.xslxdh,
              parentPhone: this.ruleForm.jzlxdh,
              studentfilesSchool: this.ruleForm.biyexx,
              studentfilesLoc: this.ruleForm.jiatinzz,
              studentfilesRemarks: this.ruleForm.textarea,
              courseId: this.ruleForm.value,
              channelid: this.ruleForm.lyqd1,
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.centerDialogVisible = false;
              ElMessage({
                showClose: true,
                message: "添加意向学员成功",
                type: "success",
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
//编辑
 bjsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
var numReg = /^[0-9]*$/
 
var numRe = new RegExp(numReg)
 
if(!numRe.test(this.xgruleForm1.courseName) && !numRe.test(this.xgruleForm1.channelLoc)){
  console.log('3')
         this.axios
            .post("http://localhost:8088/TSM/studentfiles/updatestudentfiles", {
              studentfilesId:this.xgruleForm1.studentfilesId,
              studentfilesName: this.xgruleForm1.studentfilesName,
              studentfilesSex: this.xgruleForm1.studentfilesSex,
              studentfilesAge: this.xgruleForm1.studentfilesAge,
              studentfilesBirthday: this.xgruleForm1.studentfilesBirthday,
              studentfilesPhone: this.xgruleForm1.studentfilesPhone,
              parentPhone: this.xgruleForm1.parentPhone,
              studentfilesSchool: this.xgruleForm1.studentfilesSchool,
              studentfilesLoc: this.xgruleForm1.studentfilesLoc,
              studentfilesRemarks: this.xgruleForm1.studentfilesRemarks,
              courseId: this.xgruleForm1.courseId,
           channelid: this.xgruleForm1.channelid,
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.bjcenterDialogVisible = false;
            
               ElMessage({
        message: '修改成功',
         type: 'success',
               })
            })
            .catch(function (error) {
              console.log(error);
            });
}else if (!numRe.test(this.xgruleForm1.channelLoc)) {
    console.log('1')
     this.axios
            .post("http://localhost:8088/TSM/studentfiles/updatestudentfiles", {
              studentfilesId:this.xgruleForm1.studentfilesId,
              studentfilesName: this.xgruleForm1.studentfilesName,
              studentfilesSex: this.xgruleForm1.studentfilesSex,
              studentfilesAge: this.xgruleForm1.studentfilesAge,
              studentfilesBirthday: this.xgruleForm1.studentfilesBirthday,
              studentfilesPhone: this.xgruleForm1.studentfilesPhone,
              parentPhone: this.xgruleForm1.parentPhone,
              studentfilesSchool: this.xgruleForm1.studentfilesSchool,
              studentfilesLoc: this.xgruleForm1.studentfilesLoc,
              studentfilesRemarks: this.xgruleForm1.studentfilesRemarks,
            courseId: this.xgruleForm1.courseName,
               channelid: this.xgruleForm1.channelid,
             
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.bjcenterDialogVisible = false;
            
               ElMessage({
        message: '修改成功',
         type: 'success',
               })
            })
            .catch(function (error) {
              console.log(error);
            });
}else if(!numRe.test(this.xgruleForm1.courseName)){
    console.log('2')
            this.axios
            .post("http://localhost:8088/TSM/studentfiles/updatestudentfiles", {
              studentfilesId:this.xgruleForm1.studentfilesId,
              studentfilesName: this.xgruleForm1.studentfilesName,
              studentfilesSex: this.xgruleForm1.studentfilesSex,
              studentfilesAge: this.xgruleForm1.studentfilesAge,
              studentfilesBirthday: this.xgruleForm1.studentfilesBirthday,
              studentfilesPhone: this.xgruleForm1.studentfilesPhone,
              parentPhone: this.xgruleForm1.parentPhone,
              studentfilesSchool: this.xgruleForm1.studentfilesSchool,
              studentfilesLoc: this.xgruleForm1.studentfilesLoc,
              studentfilesRemarks: this.xgruleForm1.studentfilesRemarks,
              courseId: this.xgruleForm1.courseId,
             channelid: this.xgruleForm1.channelLoc,
             
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.bjcenterDialogVisible = false;
            
               ElMessage({
        message: '修改成功',
         type: 'success',
               })
            })
            .catch(function (error) {
              console.log(error);
            });
}else{
  console.log('4')
  this.axios
            .post("http://localhost:8088/TSM/studentfiles/updatestudentfiles", {
              studentfilesId:this.xgruleForm1.studentfilesId,
              studentfilesName: this.xgruleForm1.studentfilesName,
              studentfilesSex: this.xgruleForm1.studentfilesSex,
              studentfilesAge: this.xgruleForm1.studentfilesAge,
              studentfilesBirthday: this.xgruleForm1.studentfilesBirthday,
              studentfilesPhone: this.xgruleForm1.studentfilesPhone,
              parentPhone: this.xgruleForm1.parentPhone,
              studentfilesSchool: this.xgruleForm1.studentfilesSchool,
              studentfilesLoc: this.xgruleForm1.studentfilesLoc,
              studentfilesRemarks: this.xgruleForm1.studentfilesRemarks,
              courseId: this.xgruleForm1.courseName,
               channelid: this.xgruleForm1.channelLoc,
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.bjcenterDialogVisible = false;
            
               ElMessage({
        message: '修改成功',
         type: 'success',
               })
            })
            .catch(function (error) {
              console.log(error);
            });
}
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //添加跟进窗口提交信息
 gjsubmitForm(gjruleForm) {
   
    
      this.$refs[gjruleForm].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/follow/addfollow", {
              followContent:this.gjruleForm.textarea,
              followDate:this.gjruleForm.genjinsj,
              staffId:this.gjruleForm.gjr,
              studentfilesId:this.gjruleForm.studentfilesId,
            })
            .then((response) => {
              console.log(response.data);
             // this.crea();
             
              this.$refs[gjruleForm].resetFields();
              this.tianjiagj = false;
            var row= this.gjruleForm
    this.selectgjjl(row)
               ElMessage({
        message: '添加成功',
         type: 'success',
               })
               
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    },
    resetForm1(formData) {
      this.crea();
      this.$refs[formData].resetFields();
      //  this.centerDialogVisible = false
    },
    //编辑意向学员档案
    resetForm2(formData) {
      this.$refs[formData].resetFields();
       this.bjcenterDialogVisible = false
    },
    //添加跟进取消按钮
    gjresetForm(gjruleForm){
       this.$refs[gjruleForm].resetFields();
      this.tianjiagj = false
    },
    //添加跟进
    tjgj(index,row){
     
      this.tianjiagj = true
       this.gjruleForm = Object.assign({}, row)
    },
     
    showtabs() {
      if (this.anniugjjl != null) {
        let current1 = this.anniugjjl;
        if (current1 == "跟进记录") {
          this.anniugjjl = "跟进记录";
        } else {
          this.anniugjjl = "跟进记录";
        }
      }
    },
    showtabs1() {
      console.log(this.anniugjjl);
      if (this.anniugjjl != null) {
        let current1 = this.anniugjjl;
        if (current1 == "基本信息") {
          this.anniugjjl = "基本信息";
        } else {
          this.anniugjjl = "基本信息";
        }
      }
    },
    //新增时查询渠道
    selectqudao() {
      this.axios
        .get("http://localhost:8088/TSM/selectchannelname", {})
        .then((respon) => {
          console.log(respon.data);
          this.ruleForm.lyqd = respon.data;
        })
        .catch(function (error) {
          console.log(error);
          //console.log("删除失败")
        });
    },
     //编辑时查询渠道
    selectqudao2() {
      this.axios
        .get("http://localhost:8088/TSM/selectchannelname", {})
        .then((respon) => {
          console.log(respon.data);
          this.xgruleForm1.lyqd = respon.data;
        })
        .catch(function (error) {
          console.log(error);
          //console.log("删除失败")
        });
    },
    //模糊查询时查询渠道
    selectqudao1() {
      this.axios
        .get("http://localhost:8088/TSM/selectchannelname", {})
        .then((respon) => {
          console.log(respon.data);
          this.field115Options = respon.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新增时查询意向课程
    selectkecheng() {
      this.axios
        .get("http://localhost:8088/TSM/course/selectcourse", {})
        .then((response) => {
          console.log(response.data);
          this.options = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //模糊查询时查询意向课程
    selectkecheng1() {
      this.axios
        .get("http://localhost:8088/TSM/course/selectcourse", {})
        .then((response) => {
          console.log(response.data);
          this.field117Options = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //模糊查询时查询跟进人
    selectgenjinren() {
      this.axios
        .get("http://localhost:8088/TSM/staff/selectstaffqudao", {

        })
        .then((response) => {
          console.log(response.data);
          this.field118Options = response.data;
          // this.gjruleForm.gjr=response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //多个条件模糊查询
    selectmohhu() {
    console.log(this.formData.field117+"意向课程编号")
      var _this=this
       if(_this.formData.field120[0]!=null){
        this.axios.get("http://localhost:8088/TSM/xsmh", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
            xsbm:_this.formData.field120[0],//是否报名
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;

        })
        .catch(function (error) {
          console.log(error);
        });
    }else{

       this.axios.get("http://localhost:8088/TSM/ssss", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            nameabc: _this.formData.field101, //名字
            qkzt:_this.formData.field114,//潜客状态
            lyqd:_this.formData.field115,//来源渠道
            yxkc:_this.formData.field117,//意向课程
         
          },
        })
        .then((response) => {
          console.log(response.data);
            this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
      
     
    },
    //查询跟进记录
    selectgjjl(row){
      
      this.axios.get("http://localhost:8088/TSM/follow/selectfollow/"+row.studentfilesId,{
        // studentfilesId:this.activities.studentfilesId,
      }).then(res=>{
            console.log(res.data)
            this.activities=res.data
      }).catch(function(error){
        console.log(error)
      })
    },
    //潜客详情
    handleEdit(index, row){
        this.genjinjilu = true
        //console.log(row+"数据")
        this.xgruleForm = Object.assign({}, row) // 这句是关键！！！
         this.xgruleForm1 = Object.assign({}, row)
          this.gjruleForm = Object.assign({}, row)
        //  this.xgruleForm1 =row
        //  this.xgruleForm=row
         console.log( this.xgruleForm1+"数据")

    },
     handleEdit1(index, row){
        this.bjcenterDialogVisible=true,
        //console.log(row+"数据")
        this.xgruleForm = Object.assign({}, row) // 这句是关键！！！
         this.xgruleForm1 = Object.assign({}, row)
        //  this.xgruleForm1 =row
        //  this.xgruleForm=row
         console.log( this.xgruleForm1+"数据")

    },   
       //删除意向学员
      scopenschool(row){
           this.$confirm('确定删除改学员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        .then(() => {
          this.axios.post("http://localhost:8088/TSM/studentfiles/scselectfollow",{
             studentfilesId:row.studentfilesId,
           
        }).then(respon=>{
         this.crea();
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        })
      },
    //日期转换成年龄
    suan() {
      const birthStr = this.ruleForm.value1;
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
      this.ruleForm.age = age;
      console.log("年龄", age);
    },
    suan1(){
       const birthStr1 = this.xgruleForm1.studentfilesBirthday;
        let a = new Date();
      let age1 =
        a.getFullYear() -
        birthStr1.getFullYear() -
        (a.getMonth() < birthStr1.getMonth() ||
        (a.getMonth() == birthStr1.getMonth() &&
          a.getDate() < birthStr1.getDate())
          ? 1
          : 0);
      this.xgruleForm1.studentfilesAge = age1;
      console.log("年龄", age1);
    },
    crea() {
      let _this = this;
      this.axios
        .get("http://localhost:8088/TSM/selectfollowvo", {
          params: this.pageInfo,
        })
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //==================================================================================================================
    // 报名
       routepath(row) {
      this.centerDialogVisible = true;
      const routepath = [
        {
          // paneName: this.activeName,
          path: this.$route.path,
        },
      ];

      sessionStorage.setItem("routepath", JSON.stringify(routepath));
      sessionStorage.setItem('studentfilesId',row.studentfilesId);//存一个学生编号
      sessionStorage.setItem('parentPhone',row.parentPhone); // 存入一个家长电话值
       sessionStorage.setItem('studentfilesAge',row.studentfilesAge); // 存入年龄值
        sessionStorage.setItem('studentfilesBirthday',row.studentfilesBirthday); // 存入一个出生日期值
         sessionStorage.setItem('studentfilesLoc',row.studentfilesLoc); // 存入一个地址值
          sessionStorage.setItem('studentfilesName',row.studentfilesName); // 存入一个名称值
           sessionStorage.setItem('studentfilesPhone',row.studentfilesPhone); // 存入一个学生电话值
            sessionStorage.setItem('studentfilesSchool',row.studentfilesSchool); // 存入一个毕业学校值
             sessionStorage.setItem('studentfilesSex',row.studentfilesSex); // 存入一个性别值
              sessionStorage.setItem('studentfilesState',row.studentfilesState)//存一个学生状态
    console.log(row)
      console.log(row.studentfilesBirthday)
      this.$router.push("/freshman");
    },
    
  },
  
  created() {
    let _this = this;
    this.axios
      .get("http://localhost:8088/TSM/selectfollowvo", {
        params: this.pageInfo,
      })
      .then((response) => {
        console.log(response.data);
        this.tableData = response.data.records;
        this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<!--域内style -->
<style scoped>
.el-select-dropdown__item.selected {
  color: #f60;
}
.xxss {
  position: relative;
  top: 0px;
  width:150px;
  border-top-left-radius: 0px;
}
</style>


<style>
* {
  margin: 0;
  padding: 0;
}

/* html {
  background: rgb(245, 247, 250);
} */

.tou {
  background: white;
  height: 100%;
  width: 98%;
  margin-left: 1%;
  position: relative;
  top: 52px;
}
.bgfy {
  background: white;
  height: 100%;
  width: 98%;
  margin-left: 1%;
  position: relative;
  top: 68px;
}

.sstp .el-button {
  background: #f60;
  --el-button-hover-color: #ff9f5f;
  --el-button-active-background-color: #d35400;
  --el-button-border-color: black;
  --el-button-hover-color: #f60;
}
.xzqk .el-button {
  background: #f60;
  --el-button-hover-color: #ff9f5f;
  --el-button-active-background-color: #d35400;
  --el-button-border-color: black;
  --el-button-hover-color: #f60;
}

.qk .el-input__inner {
  border: none;
  width: 100px;
}

.qd .el-input__inner {
  border: none;
  width: 100px;
}

.yx .el-input__inner {
  border: none;
  width: 100px;
}

.gj .el-input__inner {
  border: none;
  width: 100px;
}

.xxmc .el-input__inner {
  width: 105px;
  margin-left: 14%;
  margin-top: 10px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
.xxmc .el-icon svg {
  margin-left: -22px;
}
.xxss .el-input__inner {
  margin-top: 10px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.xzqk .el-button {
  position: relative;
  left: 650px;
  top: -62px;
  width: 130px;
}

.sstp .el-button {
 
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 60px;
  height: 30px;
  position: relative;
 left: 175px;
    top: -58px;
}
.cz .el-button {
  background: rgb(255, 255, 255);
  border: 0px;
  position: relative;
  top: -64px;
  left: 615px;
  height: 16px;
  width: 148px;
}
.sjfw .el-form-item__content {
  position: relative;
  left: 66px;
  margin-top: -36px;
}

#el-popper-3409 {
  position: relative;
  top: 10px;
}
.nianlin {
  -webkit-appearance: none;
  background-color: var(--el-input-background-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-font-color, var(--el-text-color-regular));
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: var(--el-transition-border);
  width: 9%;
  margin-right: 2%;
}

.jiazhanglx {
  -webkit-appearance: none;
  background-color: var(--el-input-background-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-font-color, var(--el-text-color-regular));
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: var(--el-transition-border);
  width: 30%;
  margin-right: 2%;
  margin-left: 2%;
}
.jiatinzz {
  -webkit-appearance: none;
  background-color: var(--el-input-background-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-font-color, var(--el-text-color-regular));
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: var(--el-transition-border);
  width: 70%;
  margin-right: 2%;
  margin-left: 2%;
}
.beiz .el-textarea {
  width: 70%;
  position: relative;
  left: 6%;
}
.sjneiron .el-textarea {
  width: 73%;
  position: relative;
  left: 7%;
}

.gjbt .el-button {
  margin-left: 83%;
  color: #f60;
  background: #fff0e6;
  border-color: #ffc299;
  --el-color-primary-light-9: #f60;
  --el-color-primary: white;
}
.jibenxx {
  text-align: center;
  width: 210px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-right: 1px solid #ebeef5;
  min-height: 320px;
}
.jibenxx .bianjijbxx {
  margin-left: 4%;
  color: #f60;
  background: #fff0e6;
  border-color: #ffc299;
  --el-color-primary-light-9: #f60;
  --el-color-primary: white;
}
.more-info {
  list-style-type: none;
  width: 100%;
  padding: 0 30px;
  margin: 0;
  margin-top: -322px;
  margin-left: 31%;

  /* flex-shrink: 0;
    min-width: 80px;
    color: #909399;
    margin-right: 6px;
    text-align: right; */
}
span > .el-tag--light {
  --el-tag-background-color: #fff0e6;
  --el-tag-border-color: #ffa588;
  --el-tag-font-color: #ff5722;
  --el-tag-hover-color: #ff9777;
}
li > span {
  color: #303133;
}
</style>



