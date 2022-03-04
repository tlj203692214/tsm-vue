<template>
  <div style="background-color: #f5f7fa">
    <div style="height: 20%; background-color: white">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 
  ===================================================================================================================================
   在读学员
           -->
        <el-tab-pane label="在读学员" name="first">
          <div>
            <el-form
              ref="formData"
              :model="formData"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
              <div>
                <div
                  style="background-color: white; height: 50%; margin-top: 1%"
                >
                  &nbsp;&nbsp;&nbsp;请选择：
                  <!-- 搜索下拉框 -->

                  <el-select
                    v-model="formData.value"
                    placeholder="请选择"
                    style="width: 100px; margin-top: 14px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>

                  <!-- 搜索文本框 -->

                  <el-form-item
                    style="margin-left: 170px; margin-top: -37px"
                    label-width="0"
                    prop="input"
                  >
                    <span v-if="formData.value == '学生姓名'">
                      <el-input
                        style="width: 150px"
                        placeholder="请输入学生姓名"
                        v-model="formData.input"
                        clearable
                      >
                      </el-input>
                    </span>
                    <span v-else>
                      <el-input
                        style="width: 150px"
                        placeholder="请输入班级名称"
                        v-model="formData.input"
                        clearable
                      >
                      </el-input>
                    </span>
                  </el-form-item>
                  <!-- 搜索按钮 -->
                  <el-form-item
                    size="large"
                    style="margin-top: -62px; margin-left: 220px"
                  >
                    <el-button
                      type="primary"
                      style="background: #f60; border: 10px white"
                      @click="mohuchaxun()"
                    >
                      <el-icon><search /></el-icon>
                    </el-button>
                  </el-form-item>
                  <!-- 文字链接     重置 -->
                  &nbsp;&nbsp;&nbsp;
                  <el-form-item
                    size="large"
                    style="margin-top: -84px; margin-left: 325px"
                  >
                    <el-link
                      @click="resetForm1('formData')"
                      :underline="false"
                      style="color: #000000"
                      >重&nbsp;置</el-link
                    >
                  </el-form-item>
                  <!-- 新生报名按钮 -->
                  <!-- <el-form-item
                    size="large"
                    style="margin-top: -61px; margin-left: 789px"
                  >
                    <el-button
                      type="primary"
                      style="margin-left: 55%; background: #f60"
                      @click="routepath()"
                      >新生报名</el-button
                    >
                  </el-form-item> -->
                </div>
                <div style="background-color: white">
                  <!-- 所在班级  下拉框搜索 -->
                  <el-form-item
                    size="large"
                    style="margin-top: -5px; margin-left: -100px"
                    prop="downOne"
                  >
                    <el-select
                      v-model="formData.downOne"
                      clearable
                      placeholder="所在班级"
                      class="dowone"
                      id="dowone"
                      @click="dowone1()"
                      @change="mohuchaxun()"
                    >
                      <el-option
                        v-for="item in selectionone"
                        :key="item.classesId"
                        :label="item.classesName"
                        :value="item.classesId"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  &nbsp;&nbsp;&nbsp;
                  <!-- 单选框查询未分班的学员 -->
                  <el-form-item
                    size="large"
                    style="margin-top: -83px; margin-left: 35px"
                    prop="checked"
                  >
                    <el-checkbox
                      v-model="formData.checked"
                      @change="mohuchaxun()"
                      >未分班</el-checkbox
                    >
                  </el-form-item>
                  <!-- 单选框查询在课学员 -->
                </div>
              </div>
            </el-form>
            <div style="background-color: white; margin-top: 1%">
              <!--
      ====================================================================================================================== 
           在读学员表格 
       -->
              <div style="padding-top: 2%; margin-left: 2%">
                <el-table
                  class="studenttable"
                  :data="tableData"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column prop="studentName" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="studentAge" label="年龄" width="120">
                  </el-table-column>
                  <el-table-column prop="studentSex" label="性别" width="120">
                  </el-table-column>
                  <el-table-column
                    prop="studentPhone"
                    label="联系电话"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="parentPhone"
                    label="家长电话"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="studentLoc"
                    label="学生住址"
                    width="220"
                  >
                  </el-table-column>
                  <el-table-column prop="classesName" label="班级" width="150">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="140">
                    <template #default="scope">
                      &nbsp;<el-button
                        @click="handleClick1(scope.row)"
                        type="text"
                        size="small"
                        >详情</el-button
                      >
                      <el-button
                        type="text"
                        size="small"
                        @click="studentbj(scope.row)"
                        >编辑</el-button
                      >
                      <el-button type="text" size="small" @click="openschool(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 
    ===========================================================================================================================      
         分页
          -->
                <div class="block">
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
            </div>
          </div>
        </el-tab-pane>

        <!-- 
      ===========================================================================================================================    
        历史学员
           -->
        <el-tab-pane label="历史学员" name="second">
          <div>
            <div>
              <el-form
                ref="formData1"
                :model="formData1"
                :rules="rules"
                size="medium"
                label-width="100px"
              >
                <div
                  style="background-color: white; height: 50%; margin-top: 1%"
                >
                  &nbsp;&nbsp;&nbsp;请选择：
                  <!--历史学员：  搜索下拉框 -->

                  <el-select
                    v-model="formData1.valueone"
                    placeholder="请选择"
                    style="width: 100px; margin-top: 14px"
                  >
                    <el-option
                      v-for="item in optionsone"
                      :key="item.valueone"
                      :label="item.labeone"
                      :value="item.valueone"
                    >
                    </el-option>
                  </el-select>
                  <span v-if="formData1.valueone == '学生姓名'">
                    <!--历史学员：  搜索文本框 -->
                    <el-form-item
                      style="margin-left: 170px; margin-top: -37px"
                      label-width="0"
                      prop="inputone"
                    >
                      <el-input
                        style="width: 150px"
                        placeholder="请输入学生姓名"
                        v-model="formData1.inputone"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </span>
                  <span v-else>
                    <!--历史学员：  搜索文本框 -->
                    <el-form-item
                      style="margin-left: 170px; margin-top: -37px"
                      label-width="0"
                      prop="inputone"
                    >
                      <el-input
                        style="width: 150px"
                        placeholder="请输入班级名称"
                        v-model="formData1.inputone"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </span>
                  <!--历史学员:  搜索按钮 -->
                  <el-form-item
                    size="large"
                    style="margin-top: -62px; margin-left: 220px"
                  >
                    <el-button
                      type="primary"
                      style="height: 8px; background: #f60"
                      @click="lishiss()"
                    >
                      <el-icon><search /></el-icon
                    ></el-button>
                  </el-form-item>
                  <!--历史学员： 文字链接     重置 -->
                  &nbsp;&nbsp;&nbsp;
                  <el-form-item
                    size="large"
                    style="margin-top: -84px; margin-left: 325px"
                  >
                    <el-link
                      @click="resetForm2('formData1')"
                      :underline="false"
                      style="color: #000000"
                      >重&nbsp;置</el-link
                    >
                  </el-form-item>
                  <!--历史学员：  新生报名按钮 -->
                  <!-- <el-button
                  type="primary"
                  style="margin-left: 55%; background: #f60"
                  @click="routepath()"
                  >新生报名</el-button
                > -->
                </div>
                <div style="background-color: white">
                  <!--历史学员：  所在班级  下拉框搜索 -->
                  <el-form-item
                    style="margin-left: -4px; margin-top: -10px"
                    label-width="0"
                    prop="downTwo"
                  >
                    <el-select
                      v-model="formData1.downTwo"
                      clearable
                      placeholder="毕业班级"
                      class="dowtwo"
                      id="dowtwo"
                      @click="dowtwo()"
                      @change="lishiss()"
                    >
                      <el-option
                        v-for="item in selectiontwo"
                        :key="item.classesId"
                        :label="item.classesName"
                        :value="item.classesId"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <!-- 
         ===================================================================================================================
              历史学员：   表格 
            -->
            <div style="background-color: white; margin-top: 1%">
              <div style="padding-top: 2%; margin-left: 2%">
                <el-table
                  :data="tableDataOne"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column prop="studentName" label="姓名" width="125">
                  </el-table-column>
                  <el-table-column prop="studentSex" label="年龄" width="125">
                  </el-table-column>
                  <el-table-column prop="studentSex" label="性别" width="125">
                  </el-table-column>
                  <el-table-column
                    prop="studentPhone"
                    label="联系电话"
                    width="205"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="studentPhone"
                    label="学生住址"
                    width="225"
                  >
                  </el-table-column>
                  <el-table-column prop="classesName" label="班级" width="155">
                  </el-table-column>
                  <el-table-column
                    prop="graduationDate"
                    label="毕业时间"
                    width="160"
                  >
                  </el-table-column>
                  <el-table-column label="操作" width="130">
                    <template #default="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="routepath(scope.row)"
                        >续报</el-button
                      >
                      <el-button type="text" size="small" @click="opendelect(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChangeOne"
                    @current-change="handleCurrentChangeOne"
                    :current-page="pageInfo1.currentPageOne"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="pageInfo1.sizeOne"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo1.total"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 
          退学学员信息
    ============================================================================================================================      
         -->
        <el-tab-pane label="退学学员信息" name="third">
          <div>
            <el-form
              ref="formData12"
              :model="formData12"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
              <el-form-item label-width="0" prop="input">
                <el-input
                  style="width: 150px"
                  placeholder="请输入学生姓名"
                  v-model="formData12.input"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item
                size="large"
                style="margin-top: -62px; margin-left: 50px"
              >
                <el-button
                  type="primary"
                  style="background: #f60; border: 10px white"
                  @click="mohuchaxun1()"
                >
                  <el-icon><search /></el-icon>
                </el-button>
              </el-form-item>
              <!-- 文字链接     重置 -->
              &nbsp;&nbsp;&nbsp;
              <el-form-item
                size="large"
                style="margin-top: -84px; margin-left: 150px"
              >
                <el-link
                  @click="resetForm12('formData12')"
                  :underline="false"
                  style="color: #000000"
                  >重&nbsp;置</el-link
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 
        学员退学信息表格
       -->
          <el-table :data="tableDataOne1" style="width: 100%" max-height="300">
            <el-table-column prop="studentName" label="姓名" width="125">
            </el-table-column>
            <el-table-column prop="studentAge" label="年龄" width="125">
            </el-table-column>
            <el-table-column prop="studentSex" label="性别" width="125">
            </el-table-column>
            <el-table-column prop="studentPhone" label="联系电话" width="205">
            </el-table-column>
            <el-table-column prop="studentLoc" label="学生住址" width="225">
            </el-table-column>
            <el-table-column prop="courseName" label="所学专业" width="155">
            </el-table-column>
            <el-table-column prop="leaveschoolDate" label="退学时间" width="155">
            </el-table-column>
            <el-table-column
              prop="leaveschoolReason"
              label="退学原因"
              width="160"
            ></el-table-column>
            <el-table-column prop="refundMoney" label="退费金额" width="155">
            </el-table-column>
            <el-table-column label="操作" width="130">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="routepath(scope.row)"
                  >重新报读</el-button
                >
                <el-button type="text" size="small" @click="opendelect1(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 
                  分页
                 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChangeOne1"
              @current-change="handleCurrentChangeOne1"
              :current-page="pageInfo12.currentPageOne"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="pageInfo12.sizeOne"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo12.total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 
       ============================================================================================================ 
        在读学员： 编辑弹框 
        -->
      <el-dialog
        v-model="studentClassVisible"
        title="编辑学员信息"
        width="50%"
        @close="resetstudEditForm('studEditFrom')"
        center
      >
        <el-form
          :model="studEditFrom"
          :rules="studEditrules"
          ref="studEditFrom"
          label-width="100px"
          class="demo-studEditFrom"
          style="margin-top: -1%"
        >
          <el-row :span="24">
            <el-col :span="12">
              <!-- 学员姓名 -->
              <el-form-item label="姓名" prop="studentName">
                <el-input
                  v-model.number="studEditFrom.studentName"
                  size="small"
                  placeholder="请填写学员姓名"
                  style="width: 75%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别 -->
              <el-form-item label="性别" prop="studentSex">
                <el-radio-group v-model="studEditFrom.studentSex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="12">
              <!-- 联系电话 -->
              <el-form-item label="联系电话" prop="studentPhone">
                <el-input
                  v-model.number="studEditFrom.studentPhone"
                  size="small"
                  placeholder="请填写学员联系方式"
                  style="width: 75%"
                  type="stuphone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 年龄 -->
            <el-col :span="12">
              <el-form-item label="年龄" prop="studentBirthday">
                <el-date-picker
                  v-model="studEditFrom.studentBirthday"
                  type="date"
                  size="small"
                  placeholder="Pick a date"
                  style="width: 56%"
                  @change="suan"
                ></el-date-picker>
                <el-input
                  v-model="studEditFrom.studentAge"
                  style="width: 20%; margin-left: 5%; color: black"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="12">
              <!-- 联系电话 -->
              <el-form-item label="家长电话" prop="parentPhone">
                <el-input
                  v-model.number="studEditFrom.parentPhone"
                  size="small"
                  placeholder="请填写学员家长联系方式"
                  style="width: 75%"
                  type="stufatherphone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 学生住址 -->
          <el-form-item label="学生住址" prop="studentLoc">
            <el-input
              v-model.number="studEditFrom.studentLoc"
              size="small"
              placeholder="请填写学员家庭地址"
              style="width: 85%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetstudEditForm('studEditFrom')"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="submitstudEditForm('studEditFrom')"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>

      <!--
    =====================================================================================================================
     在读学员： 详情弹框 
     -->
      <el-dialog
        v-model="centerDetailDialogVisible"
        title="学员详情"
        width="60%"
        destroy-on-close
        center
      >
        <!-- 标签页 -->
        <el-tabs v-model="activeDetail" @tab-click="handleDelailClick">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="essential">
            <div>
              <div
                style="
                  margin-top: 1%;
                  border-bottom: 1px solid #edf0f6;
                  padding-bottom: 2%;
                "
              >
                <!-- 转班 -->

                <span
                  v-if="
                    studentxiangq.classesName == null ||
                    studentxiangq.classesName == ''
                  "
                >
                  <el-button type="info" plain size="small" disabled
                    >转班</el-button
                  >
                </span>
                <span v-else>
                  <el-button
                    type="primary"
                    style="background-color: #f60"
                    size="small"
                    @click="zb()"
                    >转班</el-button
                  >
                </span>
                <!-- <el-button
                  type="primary"
                  style="background-color: #f60"
                  size="small"
                  @click="zb()"
                  >转班</el-button
                > -->
                <el-button
                  type="primary"
                  style="background-color: #f60; margin-left: 2%"
                  size="small"
                  @click="tuixue()"
                  >退学</el-button
                >
              </div>
              <div style="padding-bottom: 3%">
                <!-- 姓名 -->
                <div style="margin-top: 3%; margin-left: 27%; width: 20%">
                  <span style="color: #909399">姓名：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.studentName
                  }}</span>
                </div>
                <!-- 年龄 -->
                <div style="width: 25%; margin-left: 55%; margin-top: -2%">
                  <span style="color: #909399">年龄：</span>&nbsp;
                  <span style="color: #303133"
                    >{{ studentxiangq.studentAge }}岁</span
                  >&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.studentBirthday
                  }}</span>
                </div>
                <!-- 性别 -->
                <div style="margin-top: 3%; margin-left: 27%; width: 20%">
                  <span style="color: #909399">性别：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.studentSex
                  }}</span>
                </div>
                <!-- 班级 -->
                <div style="width: 25%; margin-left: 55%; margin-top: -2%">
                  <span style="color: #909399">班级：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.classesName
                  }}</span>
                </div>
                <!-- 联系电话 -->
                <div style="margin-top: 3%; margin-left: 24%; width: 20%">
                  <span style="color: #909399">联系电话：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.studentPhone
                  }}</span>
                </div>
                <!-- 家长联系电话 -->
                <div style="width: 25%; margin-left: 55%; margin-top: -2%">
                  <span style="color: #909399">家长联系电话：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.parentPhone
                  }}</span>
                </div>
                <!-- 学员家庭地址 -->
                <div style="margin-top: 3%; margin-left: 24%">
                  <span style="color: #909399">家庭地址：</span>&nbsp;
                  <span style="color: #303133">{{
                    studentxiangq.studentLoc
                  }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--
  =============================================================================================================================          
             转班记录
           -->
          <el-tab-pane label="转班记录" name="drum">
            <div style="margin-top: 2%">
              <el-table
                class="recordtable"
                :data="recordtable1"
                style="width: 100%"
                max-height="300"
              >
                <el-table-column
                  prop="studentName"
                  label="学员姓名"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="classesName"
                  label="转班前班级"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="classesName1" label="转班后班级">
                </el-table-column>
                <el-table-column prop="transferrecordDate" label="转班时间">
                </el-table-column>
                <el-table-column prop="transferrecordReason" label="转班理由">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 
      =================================================================================================================
      上课记录 
      -->
          <!-- <el-tab-pane label="上课记录" name="record">
            <div>
             
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                >
                </el-date-picker>
              </div> -->
              <!--
    ================================================================================================================
     上课记录表格
      -->
              <!-- <div style="margin-top: 2%">
                <el-table
                  class="recordtable"
                  :data="recordtable"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column
                    prop="recorddate"
                    label="上课时间"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="recordclass" label="班级" width="180">
                  </el-table-column>
                  <el-table-column prop="recordcurriculum" label="课程">
                  </el-table-column>
                  <el-table-column prop="recordrom" label="教室">
                  </el-table-column>
                  <el-table-column prop="recordteacher" label="上课老师">
                  </el-table-column>
                </el-table>
              </div> -->
              <!--
   ===========================================================================================================================  
    分页 
    -->
              <!-- <div class="block" style="margin-top: 1%">
                <el-pagination
                  @size-change="recordhandleSizeChange"
                  @current-change="recordhandleCurrentChange"
                  :current-page="recordcurrentPage"
                  :page-sizes="recordsizes"
                  :page-size="recordsize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="4"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane> -->
          <!-- 
     ==========================================================================================================================       
            学员荣誉
           -->
          <el-tab-pane label="学员荣誉" name="honor">
            <div>
              <div
                style="
                  margin-top: 1%;
                  border-bottom: 1px solid #edf0f6;
                  padding-bottom: 2%;
                "
              >
                <el-button
                  type="primary"
                  style="background-color: #f60"
                  size="small"
                  @click="tjry()"
                  >添加荣誉</el-button
                >
              </div>
              <!-- 表格内容 -->
              <div style="margin-top: 3%">
                <el-table
                  class="honortable"
                  :data="honortable"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column prop="studentName" label="学员名字">
                  </el-table-column>
                  <el-table-column prop="classesName" label="班级名称">
                  </el-table-column>
                  <el-table-column prop="studenthonorContent" label="荣誉内容">
                  </el-table-column>
                  <el-table-column prop="studenthonorDate" label="荣誉时间">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="openhonor1(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 
         ================================================================================================================ 
          分页 
          -->
              <div style="margin-top: 1%">
                <el-pagination
                  @size-change="honorhandleSizeChange"
                  @current-change="honorhandleCurrentChange"
                  :current-page="pageInfo2.honorcurrentPage"
                  :page-sizes="[2, 4, 6, 8]"
                  :page-size="pageInfo2.honorcurrentsize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageInfo2.total"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>

          <!-- 
      ==========================================================================================================================      
            学员谈话
           -->
          <el-tab-pane label="学员谈话" name="conversation">
            <div>
              <!-- 头部 -->
              <div
                style="
                  margin-top: 1%;
                  border-bottom: 1px solid #edf0f6;
                  padding-bottom: 2%;
                "
              >
                <el-button
                  type="primary"
                  style="background-color: #f60"
                  size="small"
                  @click="tjth()"
                  >添加谈话</el-button
                >
              </div>
              <!-- 
         ===================================================================================================================  
           谈话表格内容 
           -->
              <div style="margin-top: 3%">
                <el-table
                  class="conversationtable"
                  :data="conversationtable"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column prop="studentName" label="学员名字">
                  </el-table-column>
                  <el-table-column prop="staffName" label="谈话老师">
                  </el-table-column>
                  <el-table-column prop="studenttalkContent" label="谈话内容">
                  </el-table-column>
                  <el-table-column prop="studenttalkDate" label="谈话时间">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="openhonor2(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 分页 -->
              <div style="margin-top: 1%">
                <el-pagination
                  @size-change="converhandleSizeChange"
                  @current-change="converhandleCurrentChange"
                  :current-page="pageInfo3.convercurrentPage"
                  :page-sizes="[2, 4, 6, 8]"
                  :page-size="pageInfo3.conversize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageInfo3.total"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <!-- 
            学员处罚
          ==================================================================================================================
           -->
          <el-tab-pane label="学员处罚" name="fine">
            <div>
              <div
                style="
                  margin-top: 1%;
                  border-bottom: 1px solid #edf0f6;
                  padding-bottom: 2%;
                "
              >
                <el-button
                  type="primary"
                  style="background-color: #f60"
                  size="small"
                  @click="tjcf()"
                  >添加处罚</el-button
                >
              </div>
              <!-- 表格内容 -->
              <div style="margin-top: 3%">
                <el-table
                  class="honortable"
                  :data="honortable1"
                  style="width: 100%"
                  max-height="300"
                >
                  <el-table-column prop="studentName" label="学员名字">
                  </el-table-column>
                  <el-table-column label="处罚等级">
                    <template #default="scope">
                      <span v-if="scope.row.stundentpunishGrade == 0">
                        警告
                      </span>
                      <span v-else-if="scope.row.stundentpunishGrade == 1">
                        记过
                      </span>
                      <span v-else-if="scope.row.stundentpunishGrade == 2">
                        记大过
                      </span>
                      <span v-else-if="scope.row.stundentpunishGrade == 3">
                        开除
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stundentpunishReason" label="处罚理由">
                  </el-table-column>
                  <el-table-column prop="stundentpunishDate" label="处罚时间">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="openhonor(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 
         ================================================================================================================ 
          分页 
          -->
              <div style="margin-top: 1%">
                <el-pagination
                  @size-change="honorhandleSizeChange1"
                  @current-change="honorhandleCurrentChange1"
                  :current-page="pageInfo4.honorcurrentPage"
                  :page-sizes="[2, 4, 6, 8]"
                  :page-size="pageInfo4.honorcurrentsize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageInfo4.total"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <!-- 
      ============================================================================================================================
      在读学员： 详情弹框 转班按钮弹框 
      -->
    <el-dialog
      v-model="shiftDialogVisible"
      title="学员转班"
      width="45%"
      @close="shifresetForm('shiftruleForm')"
      center
    >
      <el-form
        :model="shiftruleForm"
        :rules="shiftrules"
        ref="shiftruleForm"
        label-width="100px"
        class="demo-shiftruleForm"
        style="padding-bottom: -11%"
      >
        <el-row :span="24">
          <el-col :span="12">
            <!-- 名字 -->
            <el-form-item label="学员姓名" prop="shifname">
              <el-input
                v-model="shiftruleForm.shifname"
                disabled
                readonly="readonly"
                size="small"
                style="width: 74%"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"> -->
          <!-- 状态 -->
          <!-- <el-form-item label="状态" prop="shifstate">
              <el-input
                v-model="shiftruleForm.shifstate"
                readonly="readonly"
                size="small"
                style="width: 75%"
              ></el-input>
            </el-form-item> -->
          <!-- </el-col> -->
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <!-- 原来班级 -->
            <el-form-item label="原来班级" prop="shiforiginal">
              <el-input
                v-model="shiftruleForm.shiforiginal"
                disabled
                readonly="readonly"
                size="small"
                style="width: 74%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 转班班级 -->

            <el-form-item
              style="margin-top: -64px"
              label="转班班级"
              prop="shiforiginalclass"
            >
              <el-select
                v-model="shiftruleForm.shiforiginalclass"
                placeholder="请选择转班班级"
                size="small"
                @click="dowone()"
              >
                <el-option
                  v-for="item in selectionone"
                  :key="item.classesId"
                  :label="item.classesName"
                  :value="item.classesId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <!-- 转班时间 -->
            <el-form-item label="转班时间" prop="shiftime">
              <el-date-picker
                v-model="shiftruleForm.shiftime"
                type="date"
                placeholder="选择日期"
                size="small"
                style="width: 74%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 审核人 -->
            <el-form-item
              style="margin-top: -64px"
              label="审核人"
              prop="shifreviewer"
            >
              <el-select
                v-model="shiftruleForm.shifreviewer"
                placeholder="请选择审核人"
                size="small"
                @click="shr()"
              >
                <el-option
                  v-for="item in selectshr"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="item.staffId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 转班理由 -->
        <el-form-item label="转班理由" prop="shifreasons">
          <el-input
            style="width: 91%"
            type="textarea"
            placeholder="请输入内容"
            v-model="shiftruleForm.shifreasons"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 1%">
          <el-button
            @click="shifresetForm('shiftruleForm')"
            size="small"
            style="margin-left: 25%"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="shifsubmitForm('shiftruleForm')"
            size="small"
            style="margin-left: 9%"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--
    ==============================================================================================================================
     在读学员： 退学按钮弹框 
     -->
    <el-dialog
      v-model="outcenterDialogVisible"
      title="退学信息"
      width="45%"
      @close="outresetForm('outruleForm')"
      center
    >
      <el-form
        :model="outruleForm"
        :rules="outrules"
        ref="outruleForm"
        label-width="100px"
        class="demo-outruleForm"
      >
        <el-row :span="24">
          <el-col :span="12">
            <!-- 名字 -->
            <el-form-item label="学员姓名" prop="outname">
              <el-input
                v-model="outruleForm.outname"
                readonly="readonly"
                size="small"
                style="width: 74%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 班级 -->
            <el-form-item label="班级名称" prop="outclass">
              <el-input
                v-model="outruleForm.outclass"
                readonly="readonly"
                size="small"
                style="width: 75%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 退学理由 -->
        <el-form-item label="退学理由" prop="outreasons">
          <el-input
            style="width: 91%"
            type="textarea"
            placeholder="请输入内容"
            v-model="outruleForm.outreasons"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-row :span="24">
          <!-- 退还金额 -->
          <el-col :span="12">
            <el-form-item label="退还金额" prop="outmoney">
              <el-input
                v-model="outruleForm.outmoney"
                size="small"
                style="width: 70%"
              ></el-input
              >元
            </el-form-item>
          </el-col>
          <!-- 经办人 -->
          <el-col :span="12">
            <el-form-item label="经办人" prop="outhandler">
              <el-select
                v-model="outruleForm.outhandler"
                placeholder="请选择经办人"
                size="small"
                @click="cxjbr()"
              >
                <el-option
                    v-for="item in jbr"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="item.staffId"
                 >
               </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 退学时间 -->
        <el-form-item label="退学时间" prop="outtime">
          <el-date-picker
            v-model="outruleForm.outtime"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width: 45%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-top: 1%">
          <el-button
            @click="outresetForm('outruleForm')"
            size="small"
            style="margin-left: 25%"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="margin-left: 9%"
             @click="outsubmitForm('outruleForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 
    ========================================================================================================================
    在读学员： 添加荣誉弹框
    -->
    <el-dialog
      v-model="addcenterDialogVisible"
      title="添加荣誉"
      width="40%"
      @close="addhonorresetForm"
      center
    >
      <el-form
        :model="addhonorruleForm"
        :rules="addrules"
        ref="addhonorruleForm"
        label-width="100px"
        class="demo-addhonorruleForm"
      >
        <el-row :span="24">
          <el-col :span="12">
            <!-- 学员名称 -->
            <el-form-item label="学员名称" prop="addhonorname">
              <el-input
                v-model="addhonorruleForm.addhonorname"
                size="small"
                disabled
                readonly="readonly"
                style="width: 70%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 班级名称 -->
            <el-form-item label="班级" prop="addhonorclass">
              <el-input
                v-model="addhonorruleForm.addhonorclass"
                size="small"
                disabled
                readonly="readonly"
                style="width: 70%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 荣誉内容 -->
        <el-form-item label="荣誉内容" prop="addhonortext">
          <el-input
            style="width: 88%"
            type="textarea"
            placeholder="请输入内容"
            v-model="addhonorruleForm.addhonortext"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- 获得荣誉时间 -->
        <el-form-item label="获奖时间" prop="addhonortime">
          <el-date-picker
            size="small"
            v-model="addhonorruleForm.addhonortime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addhonorresetForm('addhonorruleForm')"
            size="small"
            style="margin-left: 23%"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="addhonorsubmitForm('addhonorruleForm')"
            size="small"
            style="margin-left: 8%"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 
    =====================================================================================================================
    在读学员： 添加谈话弹框 
    -->
    <el-dialog
      v-model="addconverDialogVisible"
      title="添加谈话内容"
      width="40%"
      @close="addconverresetForm"
      center
    >
      <el-form
        :model="addconverruleForm"
        :rules="addconverrules"
        ref="addconverruleForm"
        label-width="100px"
        class="demo-addconverruleForm"
      >
        <el-row :span="24">
          <el-col :span="12">
            <!-- 学员名称 -->
            <el-form-item label="学员名称" prop="addconvername">
              <el-input
                v-model="addconverruleForm.addconvername"
                size="small"
                readonly="readonly"
                style="width: 70%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 班级名称 -->
            <el-form-item label="谈话老师" prop="addconverclass">
              <el-select
                v-model="addconverruleForm.addconverclass"
                placeholder="请选择"
                @click="cxls()"
              >
                <el-option
                  v-for="item in optionsthree"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="item.staffId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 荣誉内容 -->
        <el-form-item label="谈话内容" prop="addconvertext">
          <el-input
            style="width: 88%"
            type="textarea"
            placeholder="请输入内容"
            v-model="addconverruleForm.addconvertext"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- 获得荣誉时间 -->
        <el-form-item label="谈话时间" prop="addconvertime">
          <el-date-picker
            size="small"
            v-model="addconverruleForm.addconvertime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addconverresetForm('addconverruleForm')"
            size="small"
            style="margin-left: 23%"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="addconversubmitForm('addconverruleForm')"
            size="small"
            style="margin-left: 8%"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 
      在读学员：添加处罚弹窗
      ==========================================================================================================================
     -->
    <el-dialog
      v-model="addpunish"
      title="添加处罚"
      width="40%"
      @close="addhonorresetForm"
      center
    >
      <el-form
        :model="addhonorruleForm1"
        :rules="addrules1"
        ref="addhonorruleForm1"
        label-width="100px"
        class="demo-addhonorruleForm1"
      >
        <el-row :span="24">
          <el-col :span="12">
            <!-- 学员名称 -->
            <el-form-item label="学员名称" prop="addhonorname">
              <el-input
                v-model="addhonorruleForm1.addhonorname"
                size="small"
                readonly="readonly"
                style="width: 70%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 处罚等级 -->
            <el-form-item label="处罚等级" prop="addhonorclass">
              <el-select
                v-model="addhonorruleForm1.addhonorclass"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionstwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 处罚内容 -->
        <el-form-item label="处罚理由" prop="addhonortext">
          <el-input
            style="width: 88%"
            type="textarea"
            placeholder="请输入内容"
            v-model="addhonorruleForm1.addhonortext"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- 处罚时间 -->
        <el-form-item label="处罚时间" prop="addhonortime">
          <el-date-picker
            size="small"
            v-model="addhonorruleForm1.addhonortime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addhonorresetForm1('addhonorruleForm1')"
            size="small"
            style="margin-left: 23%"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="addhonorsubmitForm1('addhonorruleForm1')"
            size="small"
            style="margin-left: 8%"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 弹框
import { defineComponent, ref } from "vue";
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      //学生详情
      studentxiangq: [],
      // 在读学员： 详情弹框   上课记录  时间选择器搜索
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // 头部标签页
      activeName: "first",
      //在读学员：     单选框查询未分班的学员
      checked: false,
      //在读学员：     单选框查询在课学员
      checkedtwo: false,

      //在读学员：     搜索下拉框
      options: [
        {
          value: "学生姓名",
          label: "",
        },
        {
          value: "班级",
          label: "",
        },
      ],
      optionstwo: [
        {
          value: "0",
          label: "警告",
        },
        {
          value: "1",
          label: "记过",
        },
        {
          value: "2",
          label: "记大过",
        },
        {
          value: "3",
          label: "开除",
        },
      ],
      //在读学员：谈话老师下拉框
      optionsthree: [],
      //在读学员：    下拉框默认值
      formData: {
        value: "学生姓名",
        //在读学员：     搜索文本框
        input: "",
        //在读学员：    下拉框默认值
        downOne: "",
        //在读学员：     单选框查询未分班的学员
        checked: false,
      },
      formData12: {
        //退费学员：     搜索文本框
        input: "",
      },

      // 在读学员：   访客状态下拉框
      selectionone: [],
      //在读学员：转班审核人
      selectshr: [],
      //在读学员：     表格
      tableData: [],
      //在读学员：      分页
      pageInfo: {
        total: 0,
        size: 2,
        currentPage: 1,
      },

      //历史学员：     搜索下拉框
      optionsone: [
        {
          valueone: "选项1",
          labeone: "学生姓名",
        },
        {
          valueone: "选项2",
          labeone: "班级",
        },
      ],
      formData1: {
        //历史学员：    下拉框默认值
        valueone: "学生姓名",
        //历史学员：     搜索文本框
        inputone: "",
        //历史学员：    下拉框默认值
        downTwo: "",
      },

      // 历史学员：   访客状态下拉框
      selectiontwo: [],

      // 历史学员：  分页
      pageInfo1: {
        total: 0,
        sizeOne: 2,
        currentPageOne: 1,
      },
      // 退费学员：  分页
      pageInfo12: {
        total: 0,
        sizeOne: 2,
        currentPageOne: 1,
      },
      tuixueid:'',
      //历史学员：    表格
      tableDataOne: [],
      // 在读学员： 编辑弹框
      studentClassVisible: ref(false),
      // 在读学员： 编辑弹框： 编辑表单
      studEditFrom: {
        name: "", // 姓名
        stusexs: "男", //性别
        stuphone: "", //学员联系方式
        studentBirthday: "", //日期
        studentAge: 0, //年龄
        stufatherphone: "", //家长联系方式
        stuclassrom: "", //班级
        stuaddress: "", //学员家庭地址
      },
      studEditrules: {
        studentName: [
          { required: true, message: "请填写学员姓名", trigger: "blur" },
        ],
        studentSex: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        parentPhone: [{ type: "number", message: "请输入数字" }],
        studentBirthday: [
          { required: true, message: "请选择出生日期", trigger: "change" },
        ],
        studentPhone: [{ type: "number", message: "请输入数字" }],
      },
      // 在读学员： 详情弹框
      centerDetailDialogVisible: ref(false),
      // 在读学员： 详情标签页
      activeDetail: "essential",
      // 在读学员： 详情弹框  上课记录表格
      recordtable: [
        {
          recorddate: "2016-05-02",
          recordclass: "TR02201",
          recordcurriculum: "java",
          recordrom: "02201",
          recordteacher: "张三",
        },
        {
          recorddate: "2016-05-02",
          recordclass: "TR02201",
          recordcurriculum: "java",
          recordrom: "02201",
          recordteacher: "张三",
        },
        {
          recorddate: "2016-05-02",
          recordclass: "TR02201",
          recordcurriculum: "java",
          recordrom: "02201",
          recordteacher: "张三",
        },
      ],
      //转班记录表格
      recordtable1: [],
      // 在读学员： 详情弹框 上课记录表格分页
      recordsizes: [1, 2, 3, 4],
      recordsize: 1,
      recordcurrentPage: 1,
      // 在读学员： 详情弹框  转班按钮弹框
      shiftDialogVisible: ref(false),
      // 在读学员： 详情弹框 转班按钮弹框表单
      shiftruleForm: {
        classesId: "", //班级编号
        shifid: "", //编号
        shifname: "", //姓名
        shiforiginal: "", //原来班级
        shiforiginalclass: "", //转班班级
        shiftime: "", //转班日期
        shifreviewer: "", //审核人
        shifstate: "", //状态
        shifreasons: "", //转班理由
      },
      shiftrules: {
        shifname: [
          { required: true, message: "请输入学员姓名", trigger: "blur" },
        ],
        shiforiginal: [
          { required: true, message: "请选择原来的班级", trigger: "blur" },
        ],
        shiforiginalclass: [
          { required: true, message: "请选择转班班级", trigger: "change" },
        ],
        shiftime: [
          { required: true, message: "请选择转班日期", trigger: "change" },
        ],
        shifreviewer: [
          { required: true, message: "请选择审核人", trigger: "change" },
        ],
        shifstate: [{ required: true, message: "请填写状态", trigger: "blur" }],
      },
      //退学学员
      tableDataOne1:[],
      // 在读学员： 退学弹框
      outcenterDialogVisible: ref(false),
      // 在读学员： 退学弹框表单
      outruleForm: {
        outname: "", //姓名
        outclass: "", //班级名称
        outreasons: "", //退学理由
        outmoney: "", //退还金额
        outhandler: "", //经办人
        outtime: "", //退学时间
        outstuid:'',//学生编号
        outclassid:'',//班级编号
        outcourseid:''//课程id
      },
      outrules: {
        outname: [
          { required: true, message: "请输入学员姓名", trigger: "blur" },
        ],
        outclass: [{ required: true, message: "请填写状态", trigger: "blur" }],
        outmoney: [
          { required: true, message: "请输入退还金额", trigger: "blur" },
        ],
        outhandler: [
          { required: true, message: "请选择经办人", trigger: "change" },
        ],
        outtime: [
          { required: true, message: "请选择退学时间", trigger: "change" },
        ],
      },
      // 在读学员： 荣誉表格
      honortable: [],
      // 在读学员： 荣誉表格分页
      pageInfo2: {
        total: 0,
        honorcurrentPage: 1,
        honorcurrentsize: 2,
      },
      // 在读学员： 处罚表格
      honortable1: [],
      // 在读学员： 处罚表格分页
      pageInfo4: {
        total: 0,
        honorcurrentPage: 1,
        honorcurrentsize: 2,
      },
      jbr:[],
      // 在读学员： 添加荣誉弹框
      addcenterDialogVisible: ref(false),
      //在读学员：添加处罚弹窗
      addpunish: ref(false),
      // 在读学员： 添加荣誉弹框表单
      addhonorruleForm: {
        addhonorid: "", //编号
        addhonorname: "", //学员名称
        addhonorclass: "", //班级
        addhonortext: "", //荣誉内容
        addhonortime: "", //荣誉时间
      },
      // 在读学员： 添加处罚弹框表单
      addhonorruleForm1: {
        addhonorid: "", //编号
        addhonorname: "", //学员名称
        addhonorclass: "", //处罚等级
        addhonortext: "", //处罚内容
        addhonortime: "", //处罚时间
      },
      addrules: {
        addhonorname: [
          { required: true, message: "请输入学员名称", trigger: "blur" },
        ],
        addhonorclass: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        addhonortime: [
          { required: true, message: "请选择获奖时间", trigger: "change" },
        ],
        addhonortext: [
          { required: true, message: "请输入获奖内容", trigger: "blur" },
        ],
      },
      addrules1: {
        addhonorname: [
          { required: true, message: "请输入学员名称", trigger: "blur" },
        ],
        addhonorclass: [
          { required: true, message: "请选择处分等级", trigger: "blur" },
        ],
        addhonortime: [
          { required: true, message: "请输入处分时间", trigger: "change" },
        ],
        addhonortext: [
          { required: true, message: "请输入处分内容", trigger: "blur" },
        ],
      },
      //  在读学员： 详情弹框    谈话记录表格
      conversationtable: [],
      // 在读学员：详情弹框   学员谈话记录表格分页
      pageInfo3: {
        total: 0,
        conversize: 2,
        convercurrentPage: 1,
      },
      // 在读学员： 添加谈话弹框
      addconverDialogVisible: ref(false),
      // 在读学员： 添加谈话弹框表单
      addconverruleForm: {
        addconverid: "", //学生编号
        addconvername: "", //学员名称
        addconverclass: "", //班级
        addconvertext: "", //荣誉内容
        addconvertime: "", //荣誉时间
      },
      addconverrules: {
        addconvername: [
          { required: true, message: "请输入学员名称", trigger: "blur" },
        ],
        addconverclass: [
          { required: true, message: "请选择谈话老师", trigger: "blur" },
        ],
        addconvertime: [
          { required: true, message: "请输入谈话时间", trigger: "change" },
        ],
        addconvertext: [
          { required: true, message: "请输入谈话内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //在读学员：    分页
    handleCurrentChange(currentPage) {
      var _this = this;
      this.pageInfo.currentPage = currentPage;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/mohustudent", {
          params: {
            currentPage: _this.pageInfo.currentPage,
            size: _this.pageInfo.size,
            values: _this.formData.value,
            xsname: _this.formData.input, //学生姓名
            bj: _this.formData.downOne, //学生所在班级
            sffb: _this.formData.checked, //是否分班
          },
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.tableData = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.size = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/mohustudent", {
          params: {
            currentPage: _this.pageInfo.currentPage,
            size: _this.pageInfo.size,
            values: _this.formData.value,
            xsname: _this.formData.input, //学生姓名
            bj: _this.formData.downOne, //学生所在班级
            sffb: _this.formData.checked, //是否分班
          },
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.tableData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //在读学员编辑弹窗
    studentbj(row) {
      this.studentClassVisible = true;
      this.studEditFrom = row;
    },
    //在读学生重置按钮
    resetForm1(formData) {
      this.crea();
      this.$refs[formData].resetFields();
      //  this.centerDialogVisible = false
    },
     //退费学生重置按钮
    resetForm12(formData) {
      this.txxscrea();
      this.$refs[formData].resetFields();
      //  this.centerDialogVisible = false
    },
    //在读学员模糊查询
    mohuchaxun() {
      console.log(this.formData.value);
      console.log(this.formData.downOne);
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/mohustudent", {
          params: {
            currentPage: _this.pageInfo.currentPage,
            size: _this.pageInfo.size,
            values: _this.formData.value, //下拉框学生姓名
            xsname: _this.formData.input, //学生姓名
            bj: _this.formData.downOne, //学生所在班级
            sffb: _this.formData.checked, //是否分班
          },
        })
        .then((response) => {
          console.log(response);
          this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //退学学生模糊查询
     mohuchaxun1() {
       console.log("查询名称",this.formData12.input)
       this.axios.get("http://localhost:8088/TSM/selectpage",{
        params:{
          page:this.pageInfo12. currentPageOne,
          size:this.pageInfo12.sizeOne,
          name:this.formData12.input
        }
      }).then(response=>{
          console.log(response.data)
          this.tableDataOne1=response.data.records;
          this.pageInfo12.total=response.data.total;
      }).catch(err=>{
        console.log(err)
      })
    },
    //添加荣誉弹窗
    tjry() {
      this.addhonorruleForm.addhonorname = this.studentxiangq.studentName;
      this.addhonorruleForm.addhonorid = this.studentxiangq.studentId;
      this.addhonorruleForm.addhonorclass = this.studentxiangq.classesName;
      this.addcenterDialogVisible = true;
    },
    //添加谈话弹窗
    tjth() {
      this.addconverruleForm.addconvername = this.studentxiangq.studentName;
      this.addconverruleForm.addconverid = this.studentxiangq.studentId;
      this.addconverDialogVisible = true;
    },
    //添加处分弹窗
    tjcf() {
      this.addhonorruleForm1.addhonorname = this.studentxiangq.studentName;
      this.addhonorruleForm1.addhonorid = this.studentxiangq.studentId;
      this.addpunish = true;
    },
    lishiss() {
      var _this = this;
      if (this.formData1.valueone == "学生姓名") {
        this.axios
          .get("http://localhost:8088/TSM/mohuselect", {
            params: {
              currentPageOne: _this.pageInfo1.currentPageOne,
              sizeOne: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
            this.pageInfo1.total = response.data.total;
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        this.axios
          .get("http://localhost:8088/TSM/moselect", {
            params: {
              currentPageOne: _this.pageInfo1.currentPageOne,
              sizeOne: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
            this.pageInfo1.total = response.data.total;
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    //谈话老师下拉框查询
    cxls() {
      this.axios
        .get("http://localhost:8088/TSM/staff/selectstaffqudao", {})
        .then((response) => {
          console.log(response.data);
          this.optionsthree = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //转班
    zb() {
      this.shiftruleForm.shifid = this.studentxiangq.studentId;
      this.shiftruleForm.shifname = this.studentxiangq.studentName;
      this.shiftruleForm.shiforiginal = this.studentxiangq.classesName;
      this.shiftruleForm.classesId = this.studentxiangq.classesId;
      this.shiftDialogVisible = true;
    },
    // 在读学员: 删除弹出框
    openschool(row) {
      this.$confirm(
        "此操作将永久删除学员的个人信息及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
         this.axios.post("http://localhost:8088/TSM/student/xgstudentzt",{
              studentId:row.studentId
          }).then(response=>{
            console.log(response)
            this.crea()
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          }).catch(err=>{
            console.log(err)
          })
        //this.nextaa();
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 历史学员:  删除弹出框
    opendelect(row) {
      this.$confirm(
        "此操作将永久删除学员的个人信息及其关联的相关信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.axios.post("http://localhost:8088/TSM/graduation/updatezt",{
              graduationId:row.graduationId
          }).then(response=>{
            console.log(response)
            this.lsxscrea()
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          }).catch(err=>{
            console.log(err)
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
     // 退学学员:  删除弹出框
    opendelect1(row) {
      this.$confirm(
        "此操作将永久删除学员的个人信息及其关联的相关信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.axios.post("http://localhost:8088/TSM/refund/updatezt",{
              refundId:row.refundId
          }).then(response=>{
            console.log(response)
            this.txxscrea()
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          }).catch(err=>{
            console.log(err)
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 头部标签页
    handleClick1(row) {
      (this.centerDetailDialogVisible = true), console.log("tab:", row);
      this.studentxiangq = row;
      this.axios
        .get(
          "http://localhost:8088/TSM/transferrecordVo/selecttransferrecordlist/" +
            row.studentId,
          {}
        )
        .then((response) => {
          console.log(response);
          this.recordtable1 = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      //查询荣誉
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/selectStudentHonorVo", {
          params: {
            currentPage: _this.pageInfo2.honorcurrentPage,
            size: _this.pageInfo2.honorcurrentsize,
            studnetid: row.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable = response.data.records;
          this.pageInfo2.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
      //查询谈话
      this.axios
        .get("http://localhost:8088/TSM/selectStudentTalk", {
          params: {
            currentPage: _this.pageInfo3.convercurrentPage,
            size: _this.pageInfo3.conversize,
            studnetid: row.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.conversationtable = response.data.records;
          this.pageInfo3.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });

      //查询处罚
      this.axios
        .get("http://localhost:8088/TSM/selectStudentPun", {
          params: {
            currentPage: _this.pageInfo4.honorcurrentPage,
            size: _this.pageInfo4.honorcurrentsize,
            studnetid: row.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable1 = response.data.records;
          this.pageInfo4.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //退学按钮
    tuixue(){
      this.outcenterDialogVisible = true

      this.outruleForm.outname=this.studentxiangq.studentName;
      this.outruleForm.outclass=this.studentxiangq.classesName;
      this.outruleForm.outstuid=this.studentxiangq.studentId;
      this.outruleForm.outclassid=this.studentxiangq.classesId;
      this.outruleForm.outcourseid=this.studentxiangq.courseid;
    },
    //在读学员：转班审核人下拉框
    shr() {
      this.axios
        .get("http://localhost:8088/TSM/selectjwk", {})
        .then((respon) => {
          console.log(respon.data);
          this.selectshr = respon.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
     dowone1() {
      document.getElementById("dowone").style.color = "#409eff";
      this.axios
        .post("http://localhost:8088/TSM/classes/cxclasscount", {
        
        })
        .then((response) => {
          console.log(response.data);
          this.selectionone = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //在读学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
      this.axios
        .get("http://localhost:8088/TSM/classes/cxclasscountid", {
          params:{
            courid:this.studentxiangq.courseid
          }
        })
        .then((response) => {
          console.log(response.data);
          this.selectionone = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //历史学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowtwo() {
      document.getElementById("dowtwo").style.color = "#409eff";
      this.axios
        .post("http://localhost:8088/TSM/classes/cxclasscount", {})
        .then((response) => {
          console.log(response);
          this.selectiontwo = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 历史学员：   表格
    handleCurrentChangeOne(currentPageOne) {
      var _this = this;
      this.pageInfo1.currentPageOne = currentPageOne;
      if (this.formData1.valueone == "学生姓名") {
        this.axios
          .get("http://localhost:8088/TSM/mohuselect", {
            params: {
              currentPageOne: _this.pageInfo1.currentPageOne,
              sizeOne: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        this.axios
          .get("http://localhost:8088/TSM/moselect", {
            params: {
              currentPageOne: _this.pageInfo1.currentPageOne,
              sizeOne: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
            this.pageInfo1.total = response.data.total;
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    // 历史学员：  分页
    handleSizeChangeOne(size) {
      var _this = this;
      this.pageInfo1.sizeOne = size;
      var ps = qs.stringify(this.pageInfo1);
      console.log(ps);
      if (this.formData1.valueone == "学生姓名") {
        this.axios
          .get("http://localhost:8088/TSM/mohuselect", {
            params: {
              currentPage: _this.pageInfo1.currentPageOne,
              size: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
            this.pageInfo1.total = response.data.total;
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        this.axios
          .get("http://localhost:8088/TSM/moselect", {
            params: {
              currentPage: _this.pageInfo1.currentPageOne,
              size: _this.pageInfo1.sizeOne,
              xsname: _this.formData1.inputone, //学生姓名
              bj: _this.formData1.downTwo, //学生所在班级
            },
          })
          .then((response) => {
            console.log(response);
            this.tableDataOne = response.data.records;
            this.pageInfo1.total = response.data.total;
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    // 退学学员：  分页
    handleSizeChangeOne1(size) {
      var _this = this;
      this.pageInfo12.sizeOne = size;
      var ps = qs.stringify(this.pageInfo12);
      console.log(ps);
      this.axios.get("http://localhost:8088/TSM/selectpage",{
        params:{
          page:this.pageInfo12. currentPageOne,
          size:this.pageInfo12.sizeOne,
          name:this.formData12.input
        }
      }).then(response=>{
          console.log(response.data)
          this.tableDataOne1=response.data.records;
          this.pageInfo12.total=response.data.total;
      }).catch(err=>{
        console.log(err)
      })
    },
     handleCurrentChangeOne1(currentPageOne) {
      var _this = this;
      this.pageInfo12.currentPageOne = currentPageOne;
      this.axios.get("http://localhost:8088/TSM/selectpage",{
        params:{
          page:this.pageInfo12. currentPageOne,
          size:this.pageInfo12.sizeOne,
          name:this.formData12.input
        }
      }).then(response=>{
          console.log(response.data)
          this.tableDataOne1=response.data.records;
      }).catch(err=>{
        console.log(err)
      })
    },
    //历史学生重置按钮
    resetForm2(formData1) {
      this.lsxscrea();
      this.$refs[formData1].resetFields();
      //  this.centerDialogVisible = false
    },
    // 报名
    routepath(row) {
      this.centerDialogVisible = true;
      const routepath = [
        {
          paneName: this.activeName,
          path: this.$route.path,
        },
      ];

      sessionStorage.setItem("routepath", JSON.stringify(routepath));
      sessionStorage.setItem("studentfilesId", row.studentId); //存一个学生编号
      sessionStorage.setItem("parentPhone", row.parentPhone); // 存入一个家长电话值
      sessionStorage.setItem("studentfilesAge", row.studentAge); // 存入年龄值
      sessionStorage.setItem("studentfilesBirthday", row.studentBirthday); // 存入一个出生日期值
      sessionStorage.setItem("studentfilesLoc", row.studentLoc); // 存入一个地址值
      sessionStorage.setItem("studentfilesName", row.studentName); // 存入一个名称值
      sessionStorage.setItem("studentfilesPhone", row.studentPhone); // 存入一个学生电话值
      sessionStorage.setItem("studentfilesSchool", row.studentSchool); // 存入一个毕业学校值
      sessionStorage.setItem("studentfilesSex", row.studentSex); // 存入一个性别值
      //  sessionStorage.setItem('studentfilesState',row.studentfilesState)//存一个学生状态
      this.$router.push("/freshman");
    },
    // 在读学员： 编辑弹框  确认按钮和取消按钮
    submitstudEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/student/updatastudent", {
              studentId: this.studEditFrom.studentId,
              studentName: this.studEditFrom.studentName,
              studentSex: this.studEditFrom.studentSex,
              studentAge: this.studEditFrom.studentAge,
              studentBirthday: this.studEditFrom.studentBirthday,
              studentPhone: this.studEditFrom.studentPhone,
              parentPhone: this.studEditFrom.parentPhone,
              studentSchool: this.studEditFrom.studentSchool,
              studentLoc: this.studEditFrom.studentLoc,
            })
            .then((respon) => {
              console.log(respon);
              this.crea();
              this.$refs[formName].resetFields();
              this.studentClassVisible = false;
              ElMessage({
                showClose: true,
                message: "修改学员资料成功",
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
    resetstudEditForm(formName) {
      this.$refs[formName].resetFields();
      this.studentClassVisible = false;
    },
    //日期转换成年龄
    suan() {
      console.log("ssssss");
      const birthStr = this.studEditFrom.studentBirthday;
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
      this.studEditFrom.studentAge = age;
      console.log("年龄", age);
    },
    // 在读学员： 详情弹框： 标签页
    handleDelailClick(tab, event) {
      console.log(tab, event);
    },
    // 在读学员： 详情弹框： 上课记录表格分页
    recordhandleSizeChange(val) {
      this.recordsize = val;
      console.log(`每页 ${val} 条`);
    },
    recordcurrentPage(val) {
      this.recordcurrentPage = val;
      console.log(`当前页: ${val}`);
    },
    // 在读学员： 详情弹框  转班按钮弹框  表单确认、取消按钮
    shifsubmitForm(formName) {
      console.log(this.shiftruleForm.shifreviewer);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post(
              "http://localhost:8088/TSM/transferrecord/addtransferrecord",
              {
                studentId: this.shiftruleForm.shifid,
                classesOne: this.shiftruleForm.classesId,
                classesTwo: this.shiftruleForm.shiforiginalclass,
                transferrecordDate: this.shiftruleForm.shiftime,
                transferrecordReason: this.shiftruleForm.shifreasons,
                staffId: this.shiftruleForm.shifreviewer,
              }
            )
            .then((response) => {
              console.log(response.data);
              this.xgbj();
              this.crea();
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查询经办人
    cxjbr(){
      this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

      }).then(response=>{
        console.log(response.data)
        this.jbr=response.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //修改班级
    xgbj() {
      this.axios
        .post("http://localhost:8088/TSM/student/updatastudentzb", {
          studentId: this.shiftruleForm.shifid,
          classesId: this.shiftruleForm.shiforiginalclass,
        })
        .then((response) => {
          console.log(response);
          this.shiftruleForm = {};
          this.shiftDialogVisible = false;
          this.crea();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    shifresetForm(formName) {
      this.$refs[formName].resetFields();
      this.shiftruleForm = {};
      this.shiftDialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    // 在读学员： 详情弹框  退学按钮弹框  表单确认、取消按钮
    outsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/leaveschool/addleave",{
          studentId:this.outruleForm.outstuid,
          leaveschoolDate:this.outruleForm.outtime,
          leaveschoolReason:this.outruleForm.outreasons
          }).then(response=>{
              console.log(response)
              this.cxtxid()
          }).catch(err=>{
            console.log(err)
          })
        
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查询退学申请表最大编号
    cxtxid(){
      this.axios.get("http://localhost:8088/TSM/leaveschool/selectid",{
        
      }).then(response=>{
        console.log("退学申请表最大编号:",response.data)
        this.tuixueid=response.data
        this.addtuifei(response.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    //添加退费表
    addtuifei(id){
      this.axios.post("http://localhost:8088/TSM/refund/addrefund",{
               //  outruleForm: {
      //   outname: "", //姓名
      //   outclass: "", //班级名称
      //   outreasons: "", //退学理由
      //   outmoney: "", //退还金额
      //   outhandler: "", //经办人
      //   outtime: "", //退学时间
      // outstuid:'',//学生编号
      //  outclassid:'',//班级编号
      // },
        refundDate:this.outruleForm.outtime,
        refundMoney:this.outruleForm.outmoney,
        leaveschoolId:id,
        courseId:this.outruleForm.outcourseid,
        staffId:this.outruleForm.outhandler
      }).then(response=>{
        console.log(response)
        this.addzc()
        this.scsx()
        this.crea()
          this.outruleForm = {};
          this.outcenterDialogVisible = false;
           this.$message({
              type: "success",
              message: "添加成功!",
            });
      }).catch(err=>{
        console.log(err)
      })
    },
    //删除在读学生
    scsx(){
       this.axios.post("http://localhost:8088/TSM/student/xgstudentzt",{
              studentId:this.outruleForm.outstuid
          }).then(response=>{
            console.log(response)
            this.crea()
          }).catch(err=>{
            console.log(err)
          })
    },
    //添加退学支出表
    addzc(){
      this.axios.post("http://localhost:8088/TSM/expenditure/addexpend",{
         expenditureMoney:this.outruleForm.outmoney,
         expenditureDate:this.outruleForm.outtime,
        refundId:this.tuixueid,
      }).then(response=>{
        console.log(response)
      }).catch(err=>{
        console.log(err)
      })
    },
    outresetForm(formName) {
      this.outruleForm = {};
      this.outcenterDialogVisible = false;
      this.$refs[formName].resetFields();
    },
    //  在读学员： 学员荣誉  删除弹出框
    openhonor1(row) {
      this.$confirm(
        "此操作将永久删除学员的个人荣誉及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        console.log(row.studenthonorId);
        this.axios
          .post("http://localhost:8088/TSM/studenthonor/delectry", {
            studenthonorId: row.studenthonorId,
          })
          .then((response) => {
            console.log(response);
            this.cxry();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(function (err) {
            console.log(err);
          });

        // this.nextaa();
      });
    },
    //  在读学员： 学员谈话  删除弹出框
    openhonor2(row) {
      this.$confirm(
        "此操作将永久删除学员的个人谈话及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        console.log(row.studenttalkId);
        this.axios
          .post("http://localhost:8088/TSM/studenttalk/delectstudenttalk", {
            studenttalkId: row.studenttalkId,
          })
          .then((response) => {
            console.log(response);
            this.cxth();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(function (err) {
            console.log(err);
          });

        // this.nextaa();
      });
    },
    //  在读学员： 学员处分  删除弹出框
    openhonor(row) {
      this.$confirm(
        "此操作将永久删除学员的个人处分及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        console.log(row.stundentpunishId);
        this.axios
          .post("http://localhost:8088/TSM/stundentpunish/delectstudentpun", {
            stundentpunishId: row.stundentpunishId,
          })
          .then((response) => {
            console.log(response);
            this.cxcf();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(function (err) {
            console.log(err);
          });

        // this.nextaa();
      });
    },
    // 在读学员： 学员荣誉表格分页
    honorhandleCurrentChange(val) {
      this.pageInfo2.honorcurrentPage = val;
      console.log(`每页 ${val} 条`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo2);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentHonorVo", {
          params: {
            currentPage: _this.pageInfo2.honorcurrentPage,
            size: _this.pageInfo2.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response);
          this.honortable = response.data.records;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    honorhandleSizeChange(val) {
      this.pageInfo2.honorcurrentsize = val;
      console.log(`当前页: ${val}`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo2);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentHonorVo", {
          params: {
            currentPage: _this.pageInfo2.honorcurrentPage,
            size: _this.pageInfo2.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response);
          this.honortable = response.data.records;
          this.pageInfo2.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //在读学员：学员处罚表格分页
    honorhandleCurrentChange1(page) {
      this.pageInfo4.honorcurrentPage = page;
      console.log(`每页 ${page} 条`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo4);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentPun", {
          params: {
            currentPage: _this.pageInfo4.honorcurrentPage,
            size: _this.pageInfo4.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable1 = response.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    honorhandleSizeChange1(size) {
      this.pageInfo4.honorcurrentsize = size;
      console.log(`当前页: ${size}`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo4);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentPun", {
          params: {
            currentPage: _this.pageInfo4.honorcurrentPage,
            size: _this.pageInfo4.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable1 = response.data.records;
          this.pageInfo4.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //在读学员：学员谈话分页
    converhandleSizeChange(size) {
      this.pageInfo3.conversize = size;
      console.log(`当前页: ${size}`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo3);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentTalk", {
          params: {
            currentPage: _this.pageInfo3.convercurrentPage,
            size: _this.pageInfo3.conversize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.conversationtable = response.data.records;
          this.pageInfo3.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    converhandleCurrentChange(page) {
      this.pageInfo3.convercurrentPage = page;
      console.log(`每页 ${page} 条`);
      var _this = this;
      var ps = qs.stringify(this.pageInfo3);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/selectStudentTalk", {
          params: {
            currentPage: _this.pageInfo3.convercurrentPage,
            size: _this.pageInfo3.conversize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.conversationtable = response.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //在读学员： 学员荣誉   添加荣誉弹框   表单确认、取消按钮
    addhonorsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addhonorruleForm.addhonorid);
          console.log(this.addhonorruleForm.addhonortext);
          console.log(this.addhonorruleForm.addhonortime);
          this.axios
            .post("http://localhost:8088/TSM/studenthonor/addstudenthon", {
              studentId: this.addhonorruleForm.addhonorid, //学员编号
              studenthonorContent: this.addhonorruleForm.addhonortext, //荣誉内容
              studenthonorDate: this.addhonorruleForm.addhonortime, //荣誉时间
            })
            .then((response) => {
              console.log(response);
              this.cxry();
            })
            .catch(function (err) {
              console.log(err);
            });
          // this.addhonorruleForm = {};
          this.addcenterDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //在读学员： 学员处分   添加处分弹框   表单确认、取消按钮
    addhonorsubmitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/stundentpunish/addstudentpun", {
              studentId: this.addhonorruleForm1.addhonorid, //学员编号
              stundentpunishGrade: this.addhonorruleForm1.addhonorclass, //处分等级
              stundentpunishReason: this.addhonorruleForm1.addhonortext, //处分内容
              stundentpunishDate: this.addhonorruleForm1.addhonortime, //处分时间
            })
            .then((response) => {
              console.log(response);
              this.cxcf();
            })
            .catch(function (err) {
              console.log(err);
            });
          // this.addhonorruleForm = {};
          this.addpunish = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addhonorresetForm1(formName) {
      this.$refs[formName].resetFields();
      this.addhonorruleForm1 = {};
      this.addpunish = false;
    },
    //分页查询荣誉
    cxry() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/selectStudentHonorVo", {
          params: {
            currentPage: _this.pageInfo2.honorcurrentPage,
            size: _this.pageInfo2.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable = response.data.records;
          this.pageInfo2.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //分页查询谈话
    cxth() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/selectStudentTalk", {
          params: {
            currentPage: _this.pageInfo3.convercurrentPage,
            size: _this.pageInfo3.conversize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.conversationtable = response.data.records;
          this.pageInfo3.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页查询处分
    cxcf() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/selectStudentPun", {
          params: {
            currentPage: _this.pageInfo4.honorcurrentPage,
            size: _this.pageInfo4.honorcurrentsize,
            studnetid: _this.studentxiangq.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.honortable1 = response.data.records;
          this.pageInfo4.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //在读学员： 学员荣誉   添加谈话   表单确认、取消按钮
    addconversubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/studenttalk/addstudenttalk", {
              studenttalkContent: this.addconverruleForm.addconvertext,
              studenttalkDate: this.addconverruleForm.addconvertime,
              staffId: this.addconverruleForm.addconverclass,
              studentId: this.addconverruleForm.addconverid,
            })
            .then((response) => {
              console.log(response);
              this.cxth();
              this.addconverDialogVisible = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // addconverresetForm(formName) {
    //     this.$refs[formName].resetFields()
    //   this.addconverruleForm = {};
    //   this.addconverDialogVisible = false;

    // },
    crea() {
      let _this = this;
      this.axios
        .get("http://localhost:8088/TSM/studentfy", {
          params: _this.pageInfo,
        })
        .then((response) => {
          console.log(response);
          this.tableData = response.data.records;
          this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    lsxscrea() {
      //历史学员查询
      this.axios
        .get("http://localhost:8088/TSM/selectGraduation", {
          params: this.pageInfo1,
        })
        .then((response) => {
          console.log(response);
          this.tableDataOne = response.data.records;
          this.pageInfo1.total = response.data.total;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //退学学生查询
  txxscrea(){
     this.axios.get("http://localhost:8088/TSM/selectpage",{
        params:{
          page:this.pageInfo12. currentPageOne,
          size:this.pageInfo12.sizeOne,
          name:this.formData12.input
        }
      }).then(response=>{
          console.log(response.data)
          this.tableDataOne1=response.data.records;
          this.pageInfo12.total=response.data.total;
      }).catch(err=>{
        console.log(err)
      })
  },
  },
  
  created() {
    // 报名
    if (JSON.parse(sessionStorage.getItem("routepath")) != null) {
      JSON.parse(sessionStorage.getItem("routepath")).forEach((item) => {
        if (item.paneName != "") {
          this.activeName = item.paneName;
        } else {
          this.activeName = "first";
        }
        sessionStorage.removeItem("routepath");
      });
    } else {
      this.activeName = "first";
    }

    let _this = this;
    this.axios
      .get("http://localhost:8088/TSM/studentfy", {
        params: _this.pageInfo,
      })
      .then((response) => {
        console.log(response);
        this.tableData = response.data.records;
        this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });

    //历史学员查询
    this.axios
      .get("http://localhost:8088/TSM/selectGraduation", {
        params: this.pageInfo1,
      })
      .then((response) => {
        console.log(response);
        this.tableDataOne = response.data.records;
        this.pageInfo1.total = response.data.total;
      })
      .catch(function (err) {
        console.log(err);
      });

      //学员退费查询
      this.axios.get("http://localhost:8088/TSM/selectpage",{
        params:{
          page:this.pageInfo12. currentPageOne,
          size:this.pageInfo12.sizeOne,
          name:this.formData12.input
        }
      }).then(response=>{
          console.log(response.data)
          this.tableDataOne1=response.data.records;
          this.pageInfo12.total=response.data.total;
      }).catch(err=>{
        console.log(err)
      })
  },
};
</script>
<style>
/* 表格 */
.studenttable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 在读学员：  详情弹框  上课记录表格 */
.recordtable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 在读学员： 学员荣誉表格背景 */
.honortable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.conversationtable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
</style>
