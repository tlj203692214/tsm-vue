<template>
 <div style="background: #f5f7fa">
    <!-- 班级管理页面头部 -->
    <div style="background: #fff; width: 99%; margin: 0px auto">
      <el-form
          ref="formData"
          :model="formData"
          :rules="rulesmation"
          size="medium"
          label-width="100px"
        >
      <div style="margin-top: 8px">
        <!-- 搜索文本框 -->
        <el-form-item
              style="margin-left: 25px;
             margin-top: 0px;"
              label-width="0"
              prop="input"
            >
        <el-input
          style="width: 15%; margin-left: 1%; margin-top: 1%"
          placeholder="请输入班级名称"
          v-model="formData.input"
          clearable
          size="small"
        >
        </el-input>
        </el-form-item>
        <!-- 搜索按钮 -->
        <div class="ssstp">
        <el-button
          type="primary"
          style="background: #f60"
          size="small"
          @click="mohucx()"
        >
        <el-icon style="vertical-align: middle;"><search /></el-icon>
        </el-button>
        </div>
        <!-- 文字链接     重置 -->
        &nbsp;&nbsp;&nbsp;
        <!-- <el-link :underline="false" style="color: rgb(0, 0, 0)">重&nbsp;置</el-link> -->
         <el-form-item size="large" style="margin-top: -108px;
          margin-left: 215px;">
              <el-button @click="resetForm1('formData')">重置</el-button>
            </el-form-item>
        <!-- 添加班级按钮 -->
        <el-button
          type="primary"
          style="margin-left: 63%;background: #f60;position: relative;top: -62px;"
          @click="centerDialogVisible = true"
          >添加班级</el-button
        >
      </div>

      <!-- 下拉框选择搜索 -->
      <div>
        <!-- 班主任 -->
        <el-form-item prop="downOne" size="large" style="margin-top: -31px;
          margin-left: -67px;position: relative;top: -19px;">
        <el-select
          v-model="formData.downOne"
          clearable
          placeholder="班主任"
          class="dowone"
          id="dowone"
          @click="dowone()"
          @change="mohucx()"
        >
          <el-option
            v-for="item in selectionone"
            :key="item.staffId"
            :label="item.staffName"
            :value="item.staffId"
          >
          </el-option>
        </el-select>
        </el-form-item>
        <!-- 教室 -->
       <el-form-item prop="downThree"  size="large" style="margin-top: -91px;
       margin-left: 35px;">
        <el-select
          v-model="formData.downThree"
          clearable
          placeholder="教室"
          class="dowthree"
          id="dowthree"
          @click="dowthree()"
           @change="mohucx()"
        >
          <el-option
            v-for="item in selectionthree"
            :key="item.classroomId"
            :label="item.classroomName"
            :value="item.classroomId"
          >
          </el-option>
        </el-select>
        </el-form-item>
      </div>
      </el-form>
    </div>
    <!-- 
      ============================================================================================================================
      班级表格 
      -->
    <div style="background: #fff; width: 99%; margin: 0px auto; margin-top: 1%">
      <div style="padding-top: 2%; padding-bottom: 1%">
        <el-table
          class="classtable"
          :data="tableData"
          style="width: 100%" max-height="250"
        >
          <el-table-column fixed prop="classesName" label="班级名称" width="170%">
          </el-table-column>
          <el-table-column prop="classroomName" label="教室" width="170%">
          </el-table-column>
          <el-table-column prop="staffName" label="班主任" width="170%">
          </el-table-column>
          <el-table-column prop="studentzh" label="班级人数" width="170%">
          </el-table-column>
          <el-table-column prop="classesDate" label="开班时间" width="190%">
          </el-table-column>
          <el-table-column label="操作" width="220%">
            <template #default="scope">
              <div style="margin: 0 auto">
                &nbsp;
                <el-button
                  type="text"
                  @click="bbxy(scope.row)"
                  >本班学员</el-button
                >&nbsp; <el-button type="text" @click="bbkb(scope.row)">本班课表</el-button>&nbsp;&nbsp;
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多<i-icon class="el-icon--right"><arrowdown /></i-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="bjbanji(scope.row)">编辑</el-dropdown-item>
                      <el-dropdown-item @click="openEnd(scope.row)">结课</el-dropdown-item>
                     
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
     <!-- 
  ============================================================================================================================     
       分页 
       -->
        <div class="block" style="margin-left: 2%">
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
      </div>
    </div>
    <!-- 
  =============================================================================================================================    
      添加班级弹框 
      -->
    <el-dialog
      v-model="centerDialogVisible"
      title="新增班级"
      width="70%"
      @close="resetForm('rulemationForm'), (this.active = 0)"
      center
    >
      <div class="high">
        <!-- <el-steps
          :active="active"
          finish-status="success"
          simple
          style="margin: 0 auto; border-radius: 25px; width: 50%"
        >
          <el-step title="1、编辑班级信息" icon="el-icon-edit"></el-step>
          <el-step title="2、分配学员" icon="el-icon-edit"></el-step>
        </el-steps> -->
        <!-- 1、添加班级信息 -->
        <!-- v-if="active == 0" -->
        <div class="form1" >
          <el-form
            :model="rulemationForm"
            :rules="rulesmation"
            ref="rulemationForm"
            label-width="100px"
            class="demo-rulemationForm"
          >
            <!-- 班级名称 -->
            <el-form-item
              label="班级名称"
              prop="className"
              style="margin-left: 15%; margin-top: 2%"
            >
              <el-input
                v-model="rulemationForm.className"
                size="small"
                placeholder="请输入班级名称"
                style="width: 25%"
              ></el-input>
            </el-form-item>
            <!-- 班主任 -->
            <el-form-item
              label="班主任"
              prop="headmaster"
              style="margin-left: 52%; margin-top: -6%"
            >
              <el-select
                v-model="rulemationForm.headmaster"
                placeholder="请选择班主任"
                size="small"
                style="width: 50%"
                @click="dowone1()"
              >
               <el-option
                  v-for="item in options"
                  :key="item.staffId"
            :label="item.staffName"
            :value="item.staffId"
    >
    </el-option>
              </el-select>
            </el-form-item>
            <!-- 课程 -->
            <el-form-item
              label="课程"
              prop="curriculum"
              style="margin-left: 15%"
            >
              <el-select
                v-model="rulemationForm.curriculum"
                placeholder="请选择课程"
                size="small"
                style="width: 25%"
                @click="cxkecheng()"
              >
                 <el-option
                  v-for="item in options1"
                  :key="item.courseId"
                    :label="item.courseName"
                    :value="item.courseId"
                   >
                   </el-option>
              </el-select>
            </el-form-item>
            <!-- 开班人数 -->
            <el-form-item
              label="开班人数"
              prop="num"
              style="margin-left: 52%; margin-top: -6%"
            >
              <el-input-number
                v-model="rulemationForm.num"
                @change="handleChange"
                label="描述文字"
                size="small"
              ></el-input-number>
            </el-form-item>
            <!-- 教室 -->
            <el-form-item label="教室" prop="classrom" style="margin-left: 15%">
              <el-select
                v-model="rulemationForm.classrom"
                placeholder="请选择教室"
                size="small"
                style="width: 25%"
                @click="cxjiaoshi()"
              >
                 <el-option
                  v-for="item in options2"
                  :key="item.classroomId"
                    :label="item.classroomName"
                    :value="item.classroomId"
                   >
                   </el-option>
              </el-select>
            </el-form-item>
            <!-- 开班时间 -->
            <el-form-item
              label="开班时间"
              class="block"
              prop="opentime"
              style="margin-left: 52%; margin-top: -6%"
            >
              <!-- <span class="demonstration">默认</span> -->
              <el-date-picker
                v-model="rulemationForm.opentime"
                type="date"
                placeholder="选择日期"
                size="small"
                style="width: 50%"
              >
              </el-date-picker>
            </el-form-item>
             <el-form-item style="margin-left: 32.5%;">
     <el-button
          
            style="margin-top: 12px"
           @click="resetFormOK('rulemationForm')"
            type="primary"
            >完成</el-button
          >
     <el-button  
            @click="resetForm('rulemationForm')"
            >取消</el-button
          >
  </el-form-item>
          </el-form>
        </div>
        <!-- 2、
  =========================================================================================================================      
        分配学员 
        -->
        <!-- v-if="active == 1" -->
        
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button v-if="active == 1" @click="nextup">上一步</el-button> -->
         

          <!-- <el-button
            v-if="active == 0"
            style="margin-top: 12px"
            type="primary"
            @click="submitOneForm('rulemationForm')"
            >下一步</el-button
          > -->
         
        </span>
      </template>
    </el-dialog>
    <!--
 ===============================================================================================================================      
      班级详情弹框 
      -->
    <el-dialog
      v-model="studentCenterDialogVisible"
      title="班级详情"
      width="60%"
      @close="resetClassStudent('classstudentbig')"
      center
    >
     <el-form
          ref="classstudentbig"
          :model="classstudentbig"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
      <!-- 搜索文本框 -->
       <!-- <el-form-item
              style="margin-top: -46px;position: relative;top: 29px;"
              label-width="0"
              prop="input"
            >
      <el-input
        style="width: 17%; margin-left: 1%; margin-top: 1%"
        placeholder="请输入学生姓名"
        v-model="classstudentbig.input"
        clearable
        size="small"
      >
      </el-input>
      </el-form-item> -->
      <!-- 搜索按钮 -->
      <!-- <el-button
        type="primary"
        style="background:#f60;position: relative;
    top: -28px;
    left: 155px;"
        size="small"
        @click="xsss()"
      >
      <el-icon><search /></el-icon>
      </el-button> -->
      &nbsp;&nbsp;&nbsp;
      <!-- 重置 -->
     <!-- <el-form-item size="large" style="margin-top: -96px;margin-left: 120px;position: relative;top: 30px;">
              <el-button type="text" @click="resetForm2('classstudentbig')">重置</el-button>
            </el-form-item> -->
      <!-- 学员分班按钮 -->
      <el-button
        type="primary"
        style="margin-left: 60%;background:#f60;    position: relative; top: -34px;"
        size="small"
        @click="submitOneForm();subForm()"
        >学员分班</el-button
      >
      </el-form>
      <!-- 
   ====================================================================================================================     
        本班学员弹框表格
         -->
      <el-table
        class="classstutable"
        :data="stuclasstable"
        style="width: 100%" max-height="250"
      >
        <el-table-column fixed  prop="studentName" label="姓名" width="170">
        </el-table-column>
        <el-table-column prop="studentSex" label="性别" width="170">
        </el-table-column>
        <el-table-column prop="studentAge" label="年龄" width="170"> </el-table-column>
        <el-table-column prop="studentPhone" label="学员联系电话" width="170">
        </el-table-column>
        <el-table-column prop="parentPhone" label="家长联系电话">
        </el-table-column>
      </el-table>
      <!-- 
     =========================================================================================================================   
        分页 
        -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="pageInfo1.currentPageOne"
          :page-sizes="[2,4,6,8]"
          :page-size="pageInfo1.sizeOne"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo1.total"
        >
        </el-pagination>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetClassStudent('classstudentbig')"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="resetClassStudent('classstudentbig')"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 
      =========================================================================================================================
      本班学员弹框中的学员分班弹框
       -->
    <el-dialog
      v-model="centerDialogStudentVisible"
      title="学员分班"
      width="65%"
      @close="resetStudentForm('ruleStudentmationForm')"
      center
    >
    <div class="form2" >
          <!-- 头部 -->
          <div style="margin-top: 4%">
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 13%;
              "
              >HTML（课程）的未分班学员</span
            >
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 37%;
              "
              >y的学员</span
            >
          </div>
          <!-- 分配学员搜索 -->
          <el-row :span="24">
            <!-- 右边内容 -->
            <el-col :span="12">
              <div style="margin-top: 3%; margin-left: 15%">
                <div style="padding-bottom: 1%">
                  <span style="color: #606266; font-size: 14px"
                    >可容纳人数：</span
                  ><span style="color: #f60">{{sessclassid.classesNumber}}</span>
                </div>
                <span style="color: #606266; font-size: 14px"
                  >当前已分配人数：</span
                ><span style="color: #f60">{{rulemationForm.value.length}}</span>
              </div>
            </el-col>
          </el-row>
          <!-- 选择学员部分 -->
          <div style="margin-top: 1%; margin-left: 1%" class="edit_dev">
            <el-transfer
              v-model="rulemationForm.value"
              :titles="['未分班学员', '已分班学员']"
              :props="{
                   key: 'key',
                   label: 'label'
                }"
               :data="data"
                @change="sffb"
            >
            </el-transfer>
           
          </div>
          
        </div>
              <el-button
            style="margin-left: 41.5%;"
            @click="fpxyresetForm()"
            >取消</el-button
          >

          <!-- <el-button
            v-if="active == 0"
            style="margin-top: 12px"
            type="primary"
            @click="submitOneForm('rulemationForm')"
            >下一步</el-button
          > -->
          <el-button
          
            style="margin-top: 12px"
           @click="xgxsbjkc()"
            type="primary"
            >完成</el-button
          >
    </el-dialog>
    <!-- 
    =========================================================================================================================  
      本班课表弹框 
      -->
    <el-dialog
    v-model="schedule"
    title="课表信息"
    width="60%"
    destroy-on-close
    center
  >
   <el-table
          class="scheduletable"
          :data="scheduletable"
         style="width: 100%" max-height="250"
        >
        <el-table-column prop="timetableMorning" label="上午课程" width="200px">
          </el-table-column>
          <el-table-column fixed  prop="timetableTime" label="上午开始时间" width="200px">
          </el-table-column>
          <el-table-column  prop="timetableMorningend" label="上午结束时间" width="200px">
          </el-table-column>
           <el-table-column prop="staffName" label="上午任课老师" width="200px">
          </el-table-column>
          <el-table-column prop="timetableAfternoon" label="下午课程" width="200px">
          </el-table-column>
          <el-table-column  prop="timetableAfternoonstart" label="下午开始时间" width="200px">
          </el-table-column>
          <el-table-column prop="timetableAfternoonend" label="下午结束时间" width="200px">
          </el-table-column>
           <el-table-column prop="staff2" label="下午任课老师" width="200px">
          </el-table-column>
          <el-table-column prop="timetableDate" label="课程日期" width="200px">
          </el-table-column> 
          <el-table-column label="状态" width="200px">
               <template #default="scope">
                  <span v-if="scope.row.timetableState==0">
                      未上
                  </span>
                  <span v-else>
                      已上
                  </span>
               </template>
          </el-table-column>
          
        </el-table>
        <!-- 
    ============================================================================================================================      
          分页 
          -->
        <div class="block" style="margin-left: 2%;margin-top:2%;">
          <el-pagination
            @size-change="classtablehandleSizeChange"
            @current-change="classtablehandleCurrentChange"
            :current-page="pageInfo2.schedulecurrentPageOne"
            :page-sizes="[2,4,6,8]"
            :page-size="pageInfo2.schedulesizeOne"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo2.total"
          >
          </el-pagination>
        </div>
  </el-dialog>
  <!-- 
 ===============================================================================================================================   
    编辑弹框 
  -->
  <el-dialog
      v-model="centerDialogEditVisible"
      title="编辑班级"
      width="70%"
      @close="resetEditForm('editpopForm'), (this.activeEdit = 0)"
      center
    >
      <div class="high">
        <!-- 1、添加班级信息 -->
        <div class="form1">
          <el-form
            :model="editpopForm"
            :rules="editmation"
            ref="editpopForm"
            label-width="100px"
            class="demo-editpopForm"
          >
            <!-- 班级名称 -->
            <el-form-item
              label="班级名称"
              prop="className"
              style="margin-left: 15%; margin-top: 2%"
            >
              <el-input
                v-model="editpopForm.className"
                size="small"
                placeholder="请输入班级名称"
                style="width: 25%"
              ></el-input>
            </el-form-item>
            <!-- 班主任 -->
            <el-form-item
              label="班主任"
              prop="headmaster"
              style="margin-left: 52%; margin-top: -6%"
            >
              <el-select
                v-model="editpopForm.headmaster"
                placeholder="请选择班主任"
                size="small"
                style="width: 50%"
                 @click="dowone2()"
              >
                    <el-option
                        v-for="item in bzr"
                       :key="item.staffId"
                        :label="item.staffName"
                        :value="item.staffId"
                    >
                    </el-option>
              </el-select>
            </el-form-item>
            <!-- 课程 -->
            <el-form-item
              label="课程"
              prop="curriculum"
              style="margin-left: 15%"
            >
              <el-select
                v-model="editpopForm.curriculum"
                placeholder="请选择课程"
                size="small"
                style="width: 25%"
                  @click="cxkecheng1()"
              >
                <el-option
                        v-for="item in classess"
                      :key="item.courseId"
                    :label="item.courseName"
                    :value="item.courseId"
                    >
                    </el-option>
              </el-select>
            </el-form-item>
            <!-- 开班人数 -->
            <el-form-item
              label="开班人数"
              prop="num"
              style="margin-left: 52%; margin-top: -6%"
            >
              <el-input-number
                v-model="editpopForm.num"
                @change="handleChangeEdit"
                label="描述文字"
                size="small"
              ></el-input-number>
            </el-form-item>
            <!-- 教室 -->
            <el-form-item label="教室" prop="classrom" style="margin-left: 15%">
              <el-select
                v-model="editpopForm.classrom"
                placeholder="请选择教室"
                size="small"
                style="width: 25%"
                 @click="cxjiaoshi1()"
              >
                <el-option
                        v-for="item in jiaoshi"
                      :key="item.classroomId"
                    :label="item.classroomName"
                    :value="item.classroomId"
                    >
                    </el-option>
              </el-select>
            </el-form-item>
            <!-- 开班时间 -->
            <el-form-item
              label="开班时间"
              class="block"
              prop="opentime"
              style="margin-left: 52%; margin-top: -6%"
            >
              <!-- <span class="demonstration">默认</span> -->
              <el-date-picker
                v-model="editpopForm.opentime"
                type="date"
                placeholder="选择日期"
                size="small"
                style="width: 50%"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left: 32.5%;">
                   <el-button
            @click="resetEditForm('editpopForm')"
            >取消</el-button
          >
        
          <el-button
            style="margin-top: 12px"
            @click="resetEditForm1('editpopForm')"
            type="primary"
            >完成</el-button
          >
            </el-form-item>
          </el-form>
        </div>
       
      </div>
      <template #footer>
        <span class="dialog-footer">
         
          
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">

//更多的箭头图标
import { ArrowDown } from "@element-plus/icons";
// 弹框
import { defineComponent, ref } from "vue";
import qs from "qs";
 import { ElMessage } from 'element-plus'
export default {
  data() {
    // 穿梭框
    // const generateData = (_) => {
    //   const data = [];
    //   for (let i = 0; i <=this.bjxs.length; i++) {
    //     data.push({
    //       value: i,
    //       desc:`${this.bjxs[i].studentName}`,
    //       // disabled: i % 4 === 0,
    //     });
    //   }
    //   return data;
    // };
    return {
      bjxs:[],
      formData:{
        //   搜索文本框
      input: '',
      // 下拉框默认值
      downOne: '',
       // 下拉框默认值
      downThree: '',
      },
      //存储班级信息
      sessclassid:[],
       sesskebiaoid:[],
      // 添加班级弹框:第二步的搜索框
      studantName: "",
      // 穿梭框
       data:[],
       //储存添加班级后查询最新班级数据
       zxbj:[],
      // 访客状态下拉框
      selectionone: [],
       // 教室下拉框
      selectionthree: [],
      // 分页
      pageInfo:{
      total:0,
      size: 2,
      currentPage: 1,
      },
     //添加班级班主任下拉框
     options:[],
     //添加班级课程下拉框
     options1:[],
     //添加班级教室下拉框
     options2:[],
      // 更多 图标
      components: {
        arrowdown: ArrowDown,
      },
      // 班级表格
      tableData: [],
      //  添加班级弹框
      centerDialogVisible: ref(false),
      // 班级学员弹框
      studentCenterDialogVisible: ref(false),
      // 添加班级弹框步骤条
      active: 0,
      // 添加班级弹框:添加班级表单信息
      rulemationForm: {
        className: "", //班级名称
        headmaster: "", //班主任
        num: 0, //开班人数
        classrom: "", //教室
        opentime: "", //开班时间
        curriculum:"",//课程
        studantName: "",
        value: [],
      },
      // 添加班级弹框: 添加班级表单信息验证
      rulesmation: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        headmaster: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ],
        curriculum: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        num: [
          { required: true, message: "开班人数不能为空", trigger: "blur" },
          { type: "number", message: "开班人数必须为数字型" },
        ],
        opentime: [
          { required: true, message: "开班时间不能为空", trigger: "blur" },
        ],
      },
      // 添加班级弹框:开班时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 班级详情弹框
      classstudentbig: {
        input: "", //学员姓名搜索框
      },
      // 班级详情弹框表格
      scheduletable: [],
      // 本班学员弹框分页
      pageInfo1:{
       total:0,
      sizeOne: 2,
      currentPageOne: 1,
      },
     
      // 本班学员弹框中的学员分班弹框
      centerDialogStudentVisible: ref(false),
      // 分班弹框的穿梭框
      ruleStudentmationForm: {
        studantName: "",
        value: [],
      },
      // 本班课表弹框
      schedule: ref(false),
      // 本班课表弹框：  表格
       stuclasstable: [],
      // 本班学员弹框分页
      pageInfo2:{
         total:0,
      schedulesizeOne: 2,
      schedulecurrentPageOne: 1,
      },
    //编辑班级：获取班主任、课程、教室信息 
    bzr:[],
    classess:[],
    jiaoshi:[],


     //  编辑弹框
      centerDialogEditVisible: ref(false),
      // 添加班级弹框步骤条
      activeEdit: 0,
      // 添加班级弹框:添加班级表单信息
      editpopForm: {
        className: "", //班级名称
        headmaster: "", //班主任
        num: 0, //开班人数
        classrom: "", //教室
        opentime: "", //开班时间
        studantName: "",
        value: [],
        curriculum:'',//课程
        kcid:"",//课程编号
        bzrid:"",//班主任编号
        jsid:"",//教室编号
        bjbh:'',//班级编号
      },
      // 添加班级弹框: 添加班级表单信息验证
      editmation: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        headmaster: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ],
        curriculum: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        num: [
          { required: true, message: "开班人数不能为空", trigger: "blur" },
          { type: "number", message: "开班人数必须为数字型" },
        ],
        opentime: [
          { required: true, message: "开班时间不能为空", trigger: "blur" },
        ],
      },
      };
  },

  methods: {
    // 编辑弹框 清空弹框内容，关闭弹框
    resetEditForm(editpopForm) {
      this.editpopForm = {};
      this.editpopForm.num = 0;
      // this.$refs[rulemationForm].resetFields();
    },
    // 编辑弹框 清空弹框内容，关闭弹框
    resetEditForm1(editpopForm) {
      // this.editpopForm = {};
      // this.editpopForm.num = 0;
       this.$refs[editpopForm].validate((valid) => {
          if (valid) {
                      
var numReg = /^[0-9]*$/
 
var numRe = new RegExp(numReg)
 
if(!numRe.test( this.editpopForm.headmaster) && !numRe.test(  this.editpopForm.classrom) && !numRe.test(this.editpopForm.curriculum)){
           console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第1次")
            this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
             classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.bzrid,
            classesNumber:this.editpopForm.num,
            classroomId:  this.editpopForm.jsid,
            classesDate:this.editpopForm.opentime,
            courseid:  this.editpopForm.kcid
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test( this.editpopForm.headmaster) && !numRe.test(  this.editpopForm.classrom) ){
  console.log(this.editpopForm.bjbh)
            console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第2次")
     this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
        classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.bzrid,
            classesNumber:this.editpopForm.num,
            classroomId: this.editpopForm.jsid,
            classesDate:this.editpopForm.opentime,
            courseid:  this.editpopForm.curriculum
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test( this.editpopForm.headmaster) && !numRe.test(this.editpopForm.curriculum)){
  console.log(this.editpopForm.bjbh)
           console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第3次")
       this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
          classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.bzrid,
            classesNumber:this.editpopForm.num,
            classroomId:this.editpopForm.classrom,
            classesDate:this.editpopForm.opentime,
            courseid:  this.editpopForm.kcid
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test(  this.editpopForm.classrom) && !numRe.test(this.editpopForm.curriculum)){
  console.log(this.editpopForm.bjbh)
           console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第4次")
       this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
          classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.headmaster,
            classesNumber:this.editpopForm.num,
            classroomId:this.editpopForm.jsid,
            classesDate:this.editpopForm.opentime,
            courseid:  this.editpopForm.kcid
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test( this.editpopForm.headmaster)){
  console.log(this.editpopForm.bjbh)
            console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第5次")
      this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
         classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.bzrid,
            classesNumber:this.editpopForm.num,
            classroomId: this.editpopForm.classrom,
            classesDate:this.editpopForm.opentime,
            courseid: this.editpopForm.curriculum
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test(  this.editpopForm.classrom)){
  console.log(this.editpopForm.bjbh)
            console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第6次")
       this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
          classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.headmaster,
            classesNumber:this.editpopForm.num,
            classroomId: this.editpopForm.jsid,
            classesDate:this.editpopForm.opentime,
            courseid: this.editpopForm.curriculum
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}else if(!numRe.test(this.editpopForm.curriculum)){
  console.log(this.editpopForm.bjbh)
            console.log(this.editpopForm.bzrid)
             console.log( this.editpopForm.jsid)
              console.log( this.editpopForm.kcid)
              console.log(this.editpopForm.curriculum)
               console.log( this.editpopForm.classrom)
               console.log( this.editpopForm.headmaster)
              console.log("第七次")
     this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
        classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId: this.editpopForm.headmaster,
            classesNumber:this.editpopForm.num,
            classroomId:this.editpopForm.classrom,
            classesDate:this.editpopForm.opentime,
            courseid:  this.editpopForm.kcid
            }).then(response=>{
                console.log(response)
                this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            
            }).cathc(function(err){
                console.log(err)
            })
}else{
       this.axios.post("http://localhost:8088/TSM/classes/updataclasses",{
          classesId:this.editpopForm.bjbh,
            classesName: this.editpopForm.className,
            staffId:  this.editpopForm.headmaster,
            classesNumber:this.editpopForm.num,
            classroomId: this.editpopForm.classrom,
            classesDate:this.editpopForm.opentime,
            courseid: this.editpopForm.curriculum
            }).then(response=>{
                console.log(response)
                 this.crea()
                  ElMessage({
        message: '修改成功',
         type: 'success',
               })
            }).cathc(function(err){
                console.log(err)
            })
}
      //        this.editpopForm.className=row.classesName, //班级名称
      // this.editpopForm.headmaster=row.staffName, //班主任
      // this.editpopForm.num=row.classesNumber,  //开班人数
      // this.editpopForm.classrom=row.classroomName, //教室
      // this.editpopForm.opentime=row.classesDate, //开班时间
      // this.editpopForm.curriculum=row.courseName, //课程名称
      // this.editpopForm.kcid=row.courseId, //课程编号
      // this.editpopForm.bzrid=row.staffId, //班主任编号
      // this.editpopForm.jsid=row.classroomId //教室编号
          } else {
            console.log('error submit!!')
            return false
          }
        })
      this.centerDialogEditVisible = false;
       
    },
    // 添加班级弹框： 清空弹框内容，关闭弹框
    resetForm(rulemationForm) {
      // this.rulemationForm = {};
      this.rulemationForm.num = 0;
        this.$refs[rulemationForm].resetFields();
      this.centerDialogVisible = false;
      
    },
    // 分配学员： 清空弹框内容，关闭弹框
    fpxyresetForm() {
     this.data=[];
      // this.rulemationForm = {};
      // this.rulemationForm.num = 0;
      //  this.$refs[rulemationForm].resetFields();
      this.centerDialogStudentVisible = false;
    },
    //添加班级弹窗：完成
    resetFormOK(rulemationForm){
       this.$refs[rulemationForm].validate((valid) => {
           if (valid) {
       this.axios.post("http://localhost:8088/TSM/classes/addclasses",{
        classesName:this.rulemationForm.className,
        classesNumber:this.rulemationForm.num,
        classesDate:this.rulemationForm.opentime,
        classroomId:this.rulemationForm.classrom,
        staffId:this.rulemationForm.headmaster,
        courseid:this.rulemationForm.curriculum,
      }).then(response=>{
        console.log(response)
        this.crea()
          // this.$refs[rulemationForm].resetFields();
      // this.rulemationForm = {};
      // this.rulemationForm.num = 0;
      this.centerDialogVisible=false
      }).catch(err=>{
        console.log(err)
      })
           }else{
              console.log('error submit!!')
            return false
           }
        })
      
    },
    //给未分班的学员添加班级
    xgxsbjkc(){
      this.data=[];
      // console.log("快出来")
      //  console.log(this.sessclassid.courseId)
       
      //    console.log(this.sessclassid.classesId)

      //    for(let item of this.rulemationForm.value){
      //       console.log(item)
      //         this.axios.post("http://localhost:8088/TSM/student/xgstudent",{
                
      //       studentId:item,
      //     courseid:this.sessclassid.courseId,
      //     classesId:this.sessclassid.classesId,
      // }).then(response=>{
      //     console.log(response)
      // }).catch(err=>{
      //   console.log(err)
      // })
      //    }
      
      this.centerDialogStudentVisible = false;
      this.bbxy1();
      this.crea();
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
    // 访客状态下拉框样式：使点击的字体变蓝色
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
      this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

      }).then(response=>{
        console.log(response.data)
        this.selectionone=response.data
      }).catch(function(err){
        console.log(err)
      });
    },
    //添加班级班主任下拉框
     dowone1() {
      document.getElementById("dowone").style.color = "#409eff";
      this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

      }).then(response=>{
        console.log(response.data)
        this.options=response.data
      }).catch(function(err){
        console.log(err)
      });
    },
    dowone2() {
      this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

      }).then(response=>{
        console.log(response.data)
        this.bzr=response.data
      }).catch(function(err){
        console.log(err)
      });
    },
    dowthree() {
      document.getElementById("dowthree").style.color = "#409eff";
       this.axios.get("http://localhost:8088/TSM/classroom/selectlistclassroom",{

      }).then(response=>{
        console.log(response.data)
        this.selectionthree=response.data
      }).catch(function(err){
        console.log(err)
      });
    },
    //班级表格模糊查询
    mohucx(){
      console.log(this.formData.downOne)
       console.log(this.formData.downThree)
      var _this=this
      this.axios.get("http://localhost:8088/TSM/mohuselectClassVo",{
       params: {
             currentPage:_this.pageInfo.currentPage,
            size:_this.pageInfo.size,
            bjname:_this.formData.input,
            bzr:_this.formData.downOne,
            jsname:_this.formData.downThree,
          },
      }).then(response=>{
        console.log(response.data)
          this.tableData=response.data.records
      this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    // 分页
    handleSizeChange(size) {
       var _this=this
       this.pageInfo.size = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      console.log(`每页 ${size} 条`);
      this.axios.get("http://localhost:8088/TSM/mohuselectClassVo",{
        params: {
           currentPage:_this.pageInfo.currentPage,
            size:_this.pageInfo.size,
            bjname:_this.formData.input,
            bzr:_this.formData.downOne,
            jsname:_this.formData.downThree,
          },
      }).then(response=>{
        console.log(response.data)
          this.tableData=response.data.records
      this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    handleCurrentChange(page) {
      var _this=this
       this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      console.log(`每页 ${page} 条`);
      this.axios.get("http://localhost:8088/TSM/mohuselectClassVo",{
        params: {
            currentPage:_this.pageInfo.currentPage,
            size:_this.pageInfo.size,
            bjname:_this.formData.input,
            bzr:_this.formData.downOne,
            jsname:_this.formData.downThree,
          },
      }).then(response=>{
        console.log(response.data)
          this.tableData=response.data.records
      }).catch(err=>{
        console.log(err)
      })
    },
    bjbanji(row){
      this.centerDialogEditVisible = true
      this.editpopForm.className=row.classesName, //班级名称
      this.editpopForm.headmaster=row.staffName, //班主任
      this.editpopForm.num=row.classesNumber,  //开班人数
      this.editpopForm.classrom=row.classroomName, //教室
      this.editpopForm.opentime=row.classesDate, //开班时间
      this.editpopForm.curriculum=row.courseName, //课程名称
      this.editpopForm.kcid=row.courseId, //课程编号
      this.editpopForm.bzrid=row.staffId, //班主任编号
      this.editpopForm.jsid=row.classroomId, //教室编号
      this.editpopForm.bjbh=row.classesId//班级编号
    },
    // 删除弹框
    opendelect() {
      this.$confirm(
        "此操作将删除此班级，并将删除与之相关的历史排课数据，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
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
    // 结课弹框
    openEnd(row) {
      this.$confirm(
        "此操作将班级中的学生全部结课，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
         
           this.axios.get("http://localhost:8088/TSM/student/bjselect/"+row.classesId,{

          }).then((response)=>{
             console.log(response.data)
            //  console.log(row.classesId)
          
            var a=response.data
            for(let item of a){
                this.axios.post("http://localhost:8088/TSM/graduation/addgra",{
                  studentId:item.studentId,
                  courseId:item.courseid
                }).then(response=>{
                  console.log(response)
                
                }).catch(function(err){
                    console.log(err)
                })
                //修改学生表变为不可用状态
                this.axios.post("http://localhost:8088/TSM/student/xgstudentzt",{
                   studentId:item.studentId,
                 
          }).then(response=>{
            console.log(response)
          }).catch(function(err){
            console.log(err)
          })
            }
           this.axios.post("http://localhost:8088/TSM/classes/updataclasseszt",{
              classesId:row.classesId,
             
           }).then(response=>{
              console.log(response)
              this.crea()
                  this.$message({
            type: "success",
            message: "结课成功!",
          });
           }).catch(err=>{
             console.log(err)
           })
            
          }).catch(function(err){
            console.log(err)
          })
          
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结课",
          });
        });
    },
    bbxy1(){
      this.studentCenterDialogVisible = true
      this.axios.get("http://localhost:8088/TSM/selectstudnet",{
          params:{
            currentPage:this.pageInfo1.currentPageOne,
            size:this.pageInfo1.sizeOne,
            id:this.sessclassid.classesId,
          }
      }).then(response=>{
          console.log(response.data)
          this.stuclasstable=response.data.records
          this.pageInfo1.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    //本班学员
    bbxy(row){
      this.sessclassid=row;
      this.studentCenterDialogVisible = true
      this.axios.get("http://localhost:8088/TSM/selectstudnet",{
          params:{
            currentPage:this.pageInfo1.currentPageOne,
            size:this.pageInfo1.sizeOne,
            id:row.classesId,
          }
      }).then(response=>{
          console.log(response.data)
          this.stuclasstable=response.data.records
          this.pageInfo1.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    //本班课表
    bbkb(row){
      this.sesskebiaoid=row
      this.schedule = true
      this.axios.get("http://localhost:8088/TSM/selectkebiao",{
          params:{
            currentPage:this.pageInfo2.schedulecurrentPageOne,
            size:this.pageInfo2.schedulesizeOne,
            id:row.classesId,
          }
      }).then(response=>{
          console.log(response.data)
          this.scheduletable=response.data.records
          this.pageInfo2.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    xsss(){
      this.axios.get("http://localhost:8088/TSM/selectlikestudent",{
          params:{
            currentPage:this.pageInfo1.currentPageOne,
            size:this.pageInfo1.sizeOne,
              // name:this.classstudentbig.input,
          }
      }).then(response=>{
          console.log(response.data)
          this.stuclasstable=response.data.records
          this.pageInfo1.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    //添加班级查询课程下拉框
    cxkecheng(){
      this.axios.get("http://localhost:8088/TSM/course/selectcourse",{

      }).then(response=>{
        console.log(response.data)
        this.options1=response.data
      }).catch(err=>{
        console.log(err)
      })
    },
     cxkecheng1(){
      this.axios.get("http://localhost:8088/TSM/course/selectcourse",{

      }).then(response=>{
        console.log(response.data)
        this.classess=response.data
      }).catch(err=>{
        console.log(err)
      })
    },
    cxjiaoshi(){
      this.axios.get("http://localhost:8088/TSM/classroom/selectlistclassroom",{

      }).then(response=>{
          console.log(response.data)
          this.options2=response.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    cxjiaoshi1(){
      this.axios.get("http://localhost:8088/TSM/classroom/selectlistclassroom",{

      }).then(response=>{
          console.log(response.data)
          this.jiaoshi=response.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    sffb(value,direction,movedKeys){
      console.log(value,direction)
        if(direction=='right' && this.rulemationForm.value.length>this.sessclassid.classesNumber){
            this.rulemationForm.value=[];
            ElMessage.warning({
            message: '不能超出班级容纳人数',
            type: 'warning',
          })
        }else if(direction=='left'){
          console.log(direction)
          let ac={};
          for(let i of value){
            ac=i
          }
         
             for(let item of this.data){
             
             if(item.key!=ac){
              this.axios.post("http://localhost:8088/TSM/student/xgstudentkcbj",{
                
            studentId:item.key,
          courseid:'',
          classesId:'',
      }).then(response=>{
          console.log(response)
      }).catch(err=>{
        console.log(err)
      })
             }
         }
        }else if(direction=='right' && this.rulemationForm.value.length<=this.sessclassid.classesNumber){
          console.log(direction)
          for(let item of value){
            console.log(item)
              this.axios.post("http://localhost:8088/TSM/student/xgstudent",{
                
            studentId:item,
          courseid:this.sessclassid.courseId,
          classesId:this.sessclassid.classesId,
      }).then(response=>{
          console.log(response)
      }).catch(err=>{
        console.log(err)
      })
         }
        }
    },
    // 添加班级弹框步骤条
    // 下一步
    next() {
      if (this.active++ > 1) this.active = 0;
      // 关闭弹框
      // this.centerDialogVisible = false
    },
    // 上一步
    nextup() {
      if (this.active-- < 1) this.active = 0;
      this.data=[];
    },
    // 添加班级弹框:表单确认方法
    submitOneForm() {
      this.centerDialogStudentVisible = true
          this.axios.get("http://localhost:8088/TSM/student/selectxs/"+ this.sessclassid.courseId,{

          }).then(response=>{
              console.log(response.data)
              this.bjxs=response.data
              this.csk();
          }).catch(err=>{
            console.log(err)
          });
    },
    //课程班级
     subForm() {
      this.centerDialogStudentVisible = true
          this.axios.get("http://localhost:8088/TSM/student/selectkcbj/"+ this.sessclassid.courseId+"/"+this.sessclassid.classesId,{
              
          }).then(response=>{
              console.log(response.data)
               let arr=response.data;
            
                for(let item of this.data) {
                    for(let i of arr){
                      console.log(i.studentId)
                       if(item.key==i.studentId){
                  this.rulemationForm.value.push(item.key)
                  }
              }
                }
          }).catch(err=>{
            console.log(err)
          });
    },
    csk(){
         for(let item of this.bjxs) {
                console.log(item) 
                 console.log(item.studentName)    
                  this.data.push({
            key: item.studentId,
            label: `${item.studentName}`,
          }) 
                 //this.data=item.studentName
             }
    },
    // 添加班级弹框: 开班人数
    handleChange(value) {
      console.log(value);
    },
    // 本班学员弹框分页
    handleSizeChangeOne(size) {
      this.pageInfo1.sizeOne = size;
      var ps=qs.stringify(this.pageInfo1)
      console.log(ps);
      console.log(`每页 ${size} 条`);
       this.axios.get("http://localhost:8088/TSM/selectlikestudent",{
          params:{
            currentPage:this.pageInfo1.currentPageOne,
            size:this.pageInfo1.sizeOne,
            // name:this.classstudentbig.input,
          }
      }).then(response=>{
          console.log(response.data)
          this.stuclasstable=response.data.records
          this.pageInfo1.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    handleCurrentChangeOne(page) {
     this.pageInfo1.currentPageOne = page;
      var ps=qs.stringify(this.pageInfo1)
      console.log(ps);
      console.log(`每页 ${page} 条`);
       this.axios.get("http://localhost:8088/TSM/selectlikestudent",{
          params:{
            currentPage:this.pageInfo1.currentPageOne,
            size:this.pageInfo1.sizeOne,
            // name:this.classstudentbig.input,
          }
      }).then(response=>{
          console.log(response.data)
          this.stuclasstable=response.data.records
      }).catch(err=>{
        console.log(err)
      })
    },
    // 本班学员弹框： 搜索框清空
    resetClassStudent(classstudentbig) {
      this.classstudentbig = {};
      // this.$refs[rulemationForm].resetFields();
      this.studentCenterDialogVisible = false;
    },
    // 班级学员弹框中的分配学员弹框： 清空弹框内容，关闭分配学员弹框
    resetStudentForm(ruleStudentmationForm) {
      this.data=[];
      this.ruleStudentmationForm = {};
      // this.$refs[rulemationForm].resetFields();
      this.centerDialogStudentVisible = false;
    },
    // 本班课表弹框： 分页
    classtablehandleSizeChange(val) {
      this.pageInfo2.schedulesizeOne = val;
      console.log(`每页 ${val} 条`);
      this.axios.get("http://localhost:8088/TSM/selectkebiao",{
          params:{
            currentPage:this.pageInfo2.schedulecurrentPageOne,
            size:this.pageInfo2.schedulesizeOne,
            id:this.sesskebiaoid.classesId,
          }
      }).then(response=>{
          console.log(response.data)
          this.scheduletable=response.data.records
          this.pageInfo2.total=response.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    classtablehandleCurrentChange(val) {
   this.pageInfo2.schedulecurrentPageOne = val;
      console.log(`当前页: ${val}`);
      this.axios.get("http://localhost:8088/TSM/selectkebiao",{
          params:{
            currentPage:this.pageInfo2.schedulecurrentPageOne,
            size:this.pageInfo2.schedulesizeOne,
            id:this.sesskebiaoid.classesId,
          }
      }).then(response=>{
          console.log(response.data)
          this.scheduletable=response.data.records
      }).catch(err=>{
        console.log(err)
      })
    },

  resetForm1(formData) {
      this.crea();
      this.$refs[formData].resetFields();
    },
    resetForm2(classstudentbig){
      this.bbxy1();
       this.$refs[classstudentbig].resetFields();
    },


    // 编辑弹框步骤条
    // 下一步
    nextEdit() {
      if (this.activeEdit++ > 1) this.activeEdit = 0;
      // 关闭弹框
      // this.centerDialogVisible = false
    },
    // 上一步
    nextupEdit() {
      if (this.activeEdit-- < 1) this.activeEdit = 0;
    },
    // 添加班级弹框:表单确认方法
    submitOneEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextEdit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加班级弹框: 开班人数
    handleChangeEdit(value) {
      console.log(value);
    },
    crea() {
    this.axios.get("http://localhost:8088/TSM/ClassesVoService",{
      params:this.pageInfo,
    }).then(response=>{
      console.log(response.data);
      this.tableData=response.data.records
      this.pageInfo.total=response.data.total
    }).catch(function(err){
        console.log(err);
    });
  },
    
  },
   created() {
    this.axios.get("http://localhost:8088/TSM/ClassesVoService",{
      params:this.pageInfo,
    }).then(response=>{
      console.log(response.data);
      this.tableData=response.data.records
      this.pageInfo.total=response.data.total
    }).catch(function(err){
        console.log(err);
    });
  }
};
</script>
<style>
.dowone {
  margin-top: 1%;
  width: 8%;
}
.dowone .el-input__inner {
  border: none;
}
.dowtwo {
  margin-top: 1%;
  width: 8%;
}
.dowtwo .el-input__inner {
  border: none;
}
.dowthree {
  margin-top: 1%;
  width: 8%;
}
.dowthree .el-input__inner {
  border: none;
}
.timeOne.el-range-editor.el-input__inner {
  margin-left: 8%;
}
/* 表格样式 */
/* 表格 */
.classtable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.el-table th.el-table__cell {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  color: black;
  font-size: 13px;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  font-size: 13px;
}
/* 更多下拉菜单样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.i-arrow-down {
  font-size: 12px;
}
/* 添加班级弹框第二步的穿梭框样式 */
.edit_dev .el-transfer .el-transfer-panel {
  width: 40%;
}
/* 本班学员弹框表格 */
.classstutable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 本班课表弹框表格 */
.scheduletable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.ssstp .el-button {
 
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 60px;
  height: 30px;
  position: relative;
 left: 224px;
    top: -56px;
}
</style>