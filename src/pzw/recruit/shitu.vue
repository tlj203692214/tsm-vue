<template>
  <div style="background: #f5f7fa; height: 100%">
    <div class="tou">
      <!-- 学生姓名 -->
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-col :span="4">
            <!-- <el-form-item label-width="0" prop="field102"> -->
            <el-select
              class="xxmc"
              v-model="formData.field102"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in field102Options"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>

            <!-- </el-form-item> -->
          </el-col>

          <!-- 搜索文本框 -->
          <el-col :span="4">
            <el-form-item label-width="0" prop="field101">
              <el-input
                class="xxss"
                v-model="formData.field101"
                placeholder="请输入学员姓名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 搜索按钮 -->
          <div class="sstp">
            <el-button type="primary">
              <i-icon style="width: 10px; height: 10px">
                <search />
              </i-icon>
              <span style="width: 10px; height: 10px"> </span>
            </el-button>
          </div>

          <!-- 开始结束日期 -->
          <el-config-provider :locale="locale">
            <app />
          </el-config-provider>
          <el-col :span="10">
            <el-form-item class="sjfw" label-width="0" prop="field105">
              <el-date-picker
                type="daterange"
                v-model="formData.field105"
                :style="{ width: '100%' }"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 新增潜客按钮 -->
          <el-col :span="10">
            <el-form-item label-width="0" prop="field106" class="xzqk">
              <el-button
                type="primary"
                size="medium"
                @click="centerDialogVisible = true"
              >
                <el-icon><plus /></el-icon>
                新增潜客
              </el-button>
            </el-form-item>
          </el-col>

          <br />

          <!-- 潜客状态 -->

          <el-col :span="10">
            <div>
              <el-select
                class="qk"
                v-model="formData.field114"
                clearable
                placeholder="潜客状态"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field114Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </div>
          </el-col>

          <!-- 来源渠道 -->
          <el-col :span="10">
            <el-form-item label-width="0" prop="field115">
              <el-select
                class="qd"
                v-model="formData.field115"
                clearable
                placeholder="来源渠道"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field115Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 意向课程 -->
          <el-col :span="10">
            <el-form-item label-width="0" prop="field117">
              <el-select
                class="yx"
                v-model="formData.field117"
                clearable
                placeholder="意向课程"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field117Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 跟进人 -->
          <el-col :span="10">
            <el-form-item label-width="0" prop="field118">
              <el-select
                class="gj"
                v-model="formData.field118"
                clearable
                placeholder="跟进人"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field118Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 是否报名 -->
          <el-col :span="10">
            <el-form-item class="sfbm" label-width="0" prop="field120">
              <el-checkbox-group v-model="formData.field120" size="medium">
                <el-checkbox
                  v-for="(item, index) in field120Options"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <!-- 重置按钮 -->
          <el-col :span="24">
            <el-form-item size="large" class="cz">
              <!-- <el-button type="primary" @click="submitForm">提交</el-button> -->
              <el-button @click="resetForm"><span>重置</span></el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- 
 ==================================================================================================================================     
      表格 
      -->
    <div class="bgfy">
      <el-table
        :data="tableData.slice((currentPage - 1) * size, currentPage * size)"
        style="width: 100%"
        max-height="300"
      >
        <el-table-column type="selection" width="55" />
        <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
        <!-- <el-table-column prop="name" label="姓名"  width="120"/>   -->

        <el-table-column label="姓名" width="120">
          <template #default="scope">
            <span
              style="color: #f60"
              @click="(genjinjilu = true), showtabs1()"
              >{{ scope.row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120" />
        <el-table-column prop="phone" label="联系方式" width="120" />
        <el-table-column prop="yxkc" label="意向课程" width="120" />
        <el-table-column prop="gjr" label="跟进人" width="120" />
        <el-table-column prop="zjgj" label="最近跟进" width="120" />
        <el-table-column prop="lyqd" label="来源渠道" width="120" />
        <el-table-column prop="bz" label="备注" width="120" />
        <el-table-column prop="zt" label="状态" width="120" />
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click.prevent="deleteRow(scope.$index, tableData)"
            >
              报名
            </el-button>
            <el-button type="text" size="small" @click="tianjiagj = true">
              添加跟进
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
                  <el-dropdown-item
                    @click="(genjinjilu = true), showtabs()"
                    v-model="anniugjjl"
                    >跟进记录</el-dropdown-item
                  >
                  <el-dropdown-item>跟进分配</el-dropdown-item>
                  <el-dropdown-item>流失</el-dropdown-item>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          :current-page="currentPage"
          :page-sizes="sizes"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 
==================================================================================================================================
      新增潜客窗口
       -->
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-dialog
        v-model="centerDialogVisible"
        title="新增潜客信息"
        width="50%"
        center
      >
        <!-- 姓名 -->
        <el-form-item prop="name">
          <span style="margin-left: -15.5%">姓名 </span>
          <div style="display: inline-block">
            <el-input
              v-model="ruleForm.name"
              placeholder="请填写学员姓名"
            ></el-input>
          </div>
        </el-form-item>
        <br />

        <!-- 性别 -->
        <el-form-item prop="radio1">
          <span style="margin-left: -15.5%">性别 </span>
          <div style="display: inline-block">
            <el-radio-group v-model="ruleForm.radio1">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <!-- 年龄 -->

        <div style="position: relative; top: -70px; left: 235px">
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="ruleForm.age"
              style="width: 14%; margin-right: 10px"
              placeholder="年龄"
              :disabled="true"
            ></el-input>

            <el-date-picker
              v-model="ruleForm.value1"
              type="date"
              placeholder="生日"
              @change="suan"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <!-- 来源渠道 -->
        <div style="position: relative; top: -40px; left: -23px">
          <el-form-item label="来源渠道" prop="lyqd">
            <el-select v-model="lyqd1" placeholder="来源渠道">
              <el-option
                v-for="item in ruleForm.lyqd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 家长联系电话 -->
        <br />
        <br />
        <div style="position: relative; top: -40px; left: 6px">
          <el-form-item label="家长联系电话" prop="jzlxdh">
            <el-input
              v-model.number="ruleForm.jzlxdh"
              style="width: 30%; margin-right: 10px"
              placeholder="家长联系人电话"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 学生联系电话 -->
        <div style="position: relative; top: -103px; left: 325px">
          <el-form-item label="学生联系电话" prop="xslxdh">
            <el-input
              v-model.number="ruleForm.xslxdh"
              style="width: 30%; margin-right: 10px"
              placeholder="学生联系电话"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 分割线 -->
        <el-divider style="margin-top: -75px"></el-divider>

        <span style="margin-left: 3%; margin-right: 2%">意向课程</span>
        <el-select v-model="value" placeholder="请选择意向课程">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 学生毕业学校 -->
        <span style="margin-left: 3%">毕业学校</span>
        <input
          type="text"
          autocomplete="off"
          placeholder="请输入毕业学校"
          class="jiazhanglx"
        />
        <br /><br />
        <!-- 家庭住址 -->
        <span style="margin-left: 3%">家庭住址</span>
        <input
          type="text"
          autocomplete="off"
          placeholder="学员家庭住址"
          class="jiatinzz"
        />

        <!--  备注  -->
        <br />
        <br />

        <div class="beiz">
          <span style="margin-left: 3%; margin-top: 3%">备注</span>
          <el-input
            v-model="textarea"
            maxlength="200"
            placeholder="备注信息（最多200字）"
            show-word-limit
            type="textarea"
            class=""
          />
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>
    <!-- 
==================================================================================================================================      
      添加跟进窗口 
      -->
    <el-dialog v-model="tianjiagj" title="添加跟进" width="39%" center>
      <!-- 跟进时间 -->
      <span style="margin-left: 5%; margin-right: 2%">跟进时间</span>
      <el-date-picker
        v-model="genjinsj"
        type="datetimerange "
        placeholder="跟进时间"
      >
      </el-date-picker>

      <!--  备注  -->
      <br />
      <br />

      <div class="sjneiron">
        <span style="margin-left: 5%; margin-top: 3%">内容</span>
        <el-input
          v-model="textarea"
          maxlength="120"
          placeholder="备注信息（最多120字）"
          show-word-limit
          type="textarea"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 
==================================================================================================================================      
      跟进记录 
      -->
    <el-dialog v-model="genjinjilu" title="潜客详情" width="50%" center>
      <el-scrollbar height="400px">
        <el-tabs v-model="anniugjjl" @tab-click="handleClick" class="gjbt">
          <el-tab-pane label="基本信息" name="基本信息">
            <div class="jibenxx">
              <span>名称：gay哥</span>
              <br /><br /><br />
              <el-button class="bianjijbxx">
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
              基本信息
            </div>

            <!-- 学员基本信息 -->
            <ul class="more-info">
              <li>
                <label>年龄：</label>
                <span
                  >19岁 <span style="margin-left: 12px">2002-12-03</span></span
                >
              </li>
              <li>
                <label>主要联系人：</label>
                <span>
                  <span class="color-danger" style="margin-right: 12px"
                    >17777777777</span
                  >父亲：阿永</span
                >
              </li>
              <li>
                <label>学校：</label>
                <span></span>
              </li>
              <li>
                <label>年级：</label>
                <span></span>
              </li>
              <li>
                <label>住址：</label>
                <span></span>
              </li>
              <li>
                <label>备注：</label>
                <span></span>
              </li>
              <li>
                <label>渠道来源：</label>
                <span>电话来访</span>
              </li>
              <li>
                <label>意向课程：</label>
                <span
                  ><span class="el-tag el-tag--small el-tag--light">html</span>
                </span>
              </li>
              <li>
                <label>最近跟进时间：</label><span>2021-12-09 18:53:18</span>
              </li>
            </ul>
          </el-tab-pane>

          <!-- 
==================================================================================================================================
          跟进记录模块
          
      -->
          <el-tab-pane label="跟进记录" name="跟进记录">
            <el-button style="margin-left=20%;">添加跟进</el-button>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.content"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :hollow="activity.hollow"
              >
                {{ activity.timestamp }}
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
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
import { ElConfigProvider } from "element-plus";
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
  components: {},
  props: [],
  data() {
    return {
      lyqd1: "",
      ruleForm: {
        name: "",
        radio1: ref(1),
        age: 0,
        value1: "",
        lyqd: ref([
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
        ]),
        jzlxdh: "",
        xslxdh: "",
        yxkc: "",
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

      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,

      textarea: ref(""), //备注信息
      locale: zhCn,
      centerDialogVisible: ref(false), //打开关闭新增潜客界面
      tianjiagj: ref(false), //打开关闭添加跟进界面
      genjinjilu: ref(false),
      genjinsj: "",
      anniugjjl: "跟进记录",
      anniugjjl1: "基本信息",
      activities: [
        {
          timestamp: "2018-04-12 20:46",
          content: "Custom icon",
          size: "large",
          color: "#f60",
        },
        {
          timestamp: "2018-04-03 20:46",
          content: "Custom color",
          color: "#f60",
        },
        {
          timestamp: "2018-04-03 20:46",
          content: "Custom size",
          size: "large",
          color: "#f60",
        },
        {
          timestamp: "2018-04-03 20:46",
          content: "Custom size",
          size: "large",
          color: "#f60",
        },
        {
          timestamp: "2018-04-03 20:46",
          content: "Custom size",
          size: "large",
          color: "#f60",
        },
      ],
      tableData: [
        {
          name: "大力",
          age: "19",
          phone: "18888888888",
          yxkc: "java",
          gjr: "阿永",
          zjgj: "2021-12-09",
          lyqd: "株洲",
          bz: "我爱Java",
          zt: "待跟进",
        },
        {
          name: "大力1",
          age: "19",
          phone: "18888888888",
          yxkc: "java",
          gjr: "阿永",
          zjgj: "2021-12-09",
          lyqd: "株洲",
          bz: "我爱Java",
          zt: "待跟进",
        },
        {
          name: "大力2",
          age: "19",
          phone: "18888888888",
          yxkc: "java",
          gjr: "阿永",
          zjgj: "2021-12-09",
          lyqd: "株洲",
          bz: "我爱Java",
          zt: "待跟进",
        },
        {
          name: "大力3",
          age: "19",
          phone: "18888888888",
          yxkc: "java",
          gjr: "阿永",
          zjgj: "2021-12-09",
          lyqd: "株洲",
          bz: "我爱Java",
          zt: "待跟进",
        },
        {
          name: "大力4",
          age: "19",
          phone: "18888888888",
          yxkc: "java",
          gjr: "阿永",
          zjgj: "2021-12-09",
          lyqd: "株洲",
          bz: "我爱Java",
          zt: "待跟进",
        },
      ],
      // options: ,
      value: ref(""),
      formData: {
        field102: "学生姓名",
        field101: undefined,
        field105: null,
        field106: "",
        field114: "潜客状态",
        field115: "来员渠道",
        field117: "意向课程",
        field118: "跟进人",
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
          label: "",
          value: "待跟进",
        },
        {
          label: "",
          value: "跟进中",
        },
        {
          label: "",
          value: "已报名",
        },
        {
          label: "",
          value: "已流失",
        },
      ],
      field115Options: [
        {
          label: "选项",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field117Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field118Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
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
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.centerDialogVisible = false;
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
    // resetForm() {
    //   this.$refs["elForm"].resetFields();
    //   //centerDialogVisible = false,
    // },
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

    handleSizeChange(val) {
      this.size = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    //日期转换成年龄
    suan() {
      console.log("ssssss");
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
  },
  //   mounted(){
  //   this.showtabs();
  // },
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

  border-top-left-radius: 0px;
}
</style>


<style>
* {
  margin: 0;
  padding: 0;
}


.tou {
  background: white;

  margin-left: 1%;
  position: relative;
  top: 6px;
}
.bgfy {
  background: white;
  height: 96%;
  width: 98%;
  margin-left: 1%;
  position: relative;
  top: 20px;
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
  left: 260px;
  top: -35px;
}

.sstp .el-button {
  margin-top: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 60px;
  height: 30px;
  position: relative;
  left: -8px;
}
.cz .el-button {
  background: rgb(255, 255, 255);
  border: 0px;
  position: relative;
  top: -97px;
  left: -47px;
  height: 16px;
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
  /* background-color: var(--el-input-background-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-font-color, var(--el-text-color-regular)); */
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



