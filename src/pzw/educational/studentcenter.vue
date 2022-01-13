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
                    style="margin-left: 183px; margin-top: -37px"
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
                    style="margin-top: -62px; margin-left: 203px"
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
                  <el-form-item
                    size="large"
                    style="margin-top: -61px; margin-left: 789px"
                  >
                    <el-button
                      type="primary"
                      style="margin-left: 55%; background: #f60"
                      @click="routepath()"
                      >新生报名</el-button
                    >
                  </el-form-item>
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
                     @click="dowone()"
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
                    <el-checkbox v-model="formData.checked" @change="mohuchaxun()">未分班</el-checkbox>
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
                      <el-button type="text" size="small" @click="openschool"
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
              <div style="background-color: white; height: 50%; margin-top: 1%">
                &nbsp;&nbsp;&nbsp;请选择：
                <!--历史学员：  搜索下拉框 -->
                <el-select
                  v-model="valueone"
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

                <!--历史学员：  搜索文本框 -->
                <el-input
                  style="width: 120px"
                  placeholder="请输入内容"
                  v-model="inputone"
                  clearable
                >
                </el-input>
                <!--历史学员:  搜索按钮 -->
                <el-button type="primary" style="height: 8px; background: #f60">
                  <el-icon><search /></el-icon
                ></el-button>
                <!--历史学员： 文字链接     重置 -->
                &nbsp;&nbsp;&nbsp;
                <el-link :underline="false" style="color: #000000"
                  >重&nbsp;置</el-link
                >
                <!--历史学员：  新生报名按钮 -->
                <el-button
                  type="primary"
                  style="margin-left: 55%; background: #f60"
                  @click="routepath()"
                  >新生报名</el-button
                >
              </div>
              <div style="background-color: white">
                <!--历史学员：  所在班级  下拉框搜索 -->
                <el-select
                  v-model="downTwo"
                  clearable
                  placeholder="毕业班级"
                  class="dowtwo"
                  id="dowtwo"
                  @click="dowtwo()"
                >
                  <el-option
                    v-for="item in selectiontwo"
                    :key="item.downTwo"
                    :label="item.labetwo"
                    :value="item.downTwo"
                  >
                  </el-option>
                </el-select>
              </div>
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
                  <el-table-column prop="nameone" label="姓名" width="125">
                  </el-table-column>
                  <el-table-column prop="ageone" label="年龄" width="125">
                  </el-table-column>
                  <el-table-column prop="sexssone" label="性别" width="125">
                  </el-table-column>
                  <el-table-column
                    prop="phonesone"
                    label="联系电话"
                    width="205"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="addressone"
                    label="学生住址"
                    width="225"
                  >
                  </el-table-column>
                  <el-table-column prop="classsone" label="班级" width="155">
                  </el-table-column>
                  <el-table-column prop="timeone" label="毕业时间" width="160">
                  </el-table-column>
                  <el-table-column label="操作" width="130">
                    <template #default>
                      <el-button type="text" size="small" @click="opendelect"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChangeOne"
                    @current-change="handleCurrentChangeOne"
                    :current-page="currentPageOne"
                    :page-sizes="sizesOne"
                    :page-size="sizeOne"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
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
                <el-button
                  type="primary"
                  style="background-color: #f60"
                  size="small"
                  @click="shiftDialogVisible = true"
                  >转班</el-button
                >
                <el-button
                  type="primary"
                  style="background-color: #f60; margin-left: 2%"
                  size="small"
                  @click="outcenterDialogVisible = true"
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
      =================================================================================================================
      上课记录 
      -->
          <el-tab-pane label="上课记录" name="record">
            <div>
              <!-- 时间选择器搜索 -->
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
              </div>
              <!--
    ================================================================================================================
     上课记录表格
      -->
              <div style="margin-top: 2%">
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
              </div>
              <!--
   ===========================================================================================================================  
    分页 
    -->
              <div class="block" style="margin-top: 1%">
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
          </el-tab-pane>
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
                  @click="addcenterDialogVisible = true"
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
                  <el-table-column prop="honorname" label="学员名字">
                  </el-table-column>
                  <el-table-column prop="honorclassname" label="班级名称">
                  </el-table-column>
                  <el-table-column prop="honorcontent" label="荣誉内容">
                  </el-table-column>
                  <el-table-column prop="honortime" label="荣誉时间">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default>
                      <el-button type="text" size="small" @click="openhonor"
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
                  :current-page="honorcurrentPage"
                  :page-sizes="honorsizes"
                  :page-size="honorsize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="4"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
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
                  @click="addconverDialogVisible = true"
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
                  <el-table-column prop="convername" label="学员名字">
                  </el-table-column>
                  <el-table-column prop="converteacher" label="班主任">
                  </el-table-column>
                  <el-table-column prop="convertext" label="谈话内容">
                  </el-table-column>
                  <el-table-column prop="convertdata" label="谈话时间">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template #default>
                      <el-button type="text" size="small" @click="openhonor"
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
                  :current-page="convercurrentPage"
                  :page-sizes="conversizes"
                  :page-size="conversize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="4"
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
                readonly="readonly"
                size="small"
                style="width: 74%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 状态 -->
            <el-form-item label="状态" prop="shifstate">
              <el-input
                v-model="shiftruleForm.shifstate"
                readonly="readonly"
                size="small"
                style="width: 75%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <!-- 原来班级 -->
            <el-form-item label="原来班级" prop="shiforiginal">
              <el-input
                v-model="shiftruleForm.shiforiginal"
                readonly="readonly"
                size="small"
                style="width: 74%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 转班班级 -->
            <el-form-item label="转班班级" prop="shiforiginalclass">
              <el-select
                v-model="shiftruleForm.shiforiginalclass"
                placeholder="请选择转班班级"
                size="small"
              >
                <el-option label="TR02201" value="shanghai"></el-option>
                <el-option label="TR02203" value="beijing"></el-option>
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
            <el-form-item label="审核人" prop="shifreviewer">
              <el-select
                v-model="shiftruleForm.shifreviewer"
                placeholder="请选择审核人"
                size="small"
              >
                <el-option label="张三" value="shanghai"></el-option>
                <el-option label="李四" value="beijing"></el-option>
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
            <!-- 状态 -->
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
              >
                <el-option label="张三" value="shanghai"></el-option>
                <el-option label="李四" value="beijing"></el-option>
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
            @click="outsubmitForm('outruleForm')"
            size="small"
            style="margin-left: 9%"
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
            <el-form-item label="班主任" prop="addconverclass">
              <el-input
                v-model="addconverruleForm.addconverclass"
                size="small"
                readonly="readonly"
                style="width: 70%"
              ></el-input>
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
      activeName: "",
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

      // 在读学员：   访客状态下拉框
      selectionone: [],

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
      //历史学员：    下拉框默认值
      valueone: "学生姓名",
      //历史学员：     搜索文本框
      inputone: "",
      // 历史学员：   访客状态下拉框
      selectiontwo: [
        {
          downTwo: "选项1",
          labetwo: "TR02201",
        },
        {
          downTwo: "选项2",
          labetwo: "TR02202",
        },
        {
          downTwo: "选项3",
          labetwo: "TR02203",
        },
      ],
      //历史学员：    下拉框默认值
      downTwo: "毕业班级",
      // 历史学员：  分页
      sizesOne: [1, 2, 3, 4],
      sizeOne: 1,
      currentPageOne: 1,
      //历史学员：    表格
      tableDataOne: [
        {
          nameone: "沈杨卓",
          ageone: "25",
          sexssone: "男",
          phonesone: "123456789000",
          addressone: "湖南株洲中科韬睿",
          classsone: "TR02201",
          timeone: "2021-12-13",
        },
        {
          nameone: "沈杨卓",
          ageone: "25",
          sexssone: "男",
          phonesone: "123456789000",
          addressone: "湖南株洲中科韬睿",
          classsone: "TR02201",
          timeone: "2021-12-13",
        },
        {
          nameone: "沈杨卓",
          ageone: "25",
          sexssone: "男",
          phonesone: "123456789000",
          addressone: "湖南株洲中科韬睿",
          classsone: "TR02201",
          timeone: "2021-12-13",
        },
        {
          nameone: "沈杨卓",
          ageone: "25",
          sexssone: "男",
          phonesone: "123456789000",
          addressone: "湖南株洲中科韬睿",
          classsone: "TR02201",
          timeone: "2021-12-13",
        },
      ],
      // 在读学员： 编辑弹框
      studentClassVisible: ref(false),
      // 在读学员： 编辑弹框： 编辑表单
      studEditFrom: {
        name: "", // 姓名
        stusexs: "男", //性别
        stuphone: "", //学员联系方式
        date1: "", //日期
        age: 0, //年龄
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
      // 在读学员： 详情弹框 上课记录表格分页
      recordsizes: [1, 2, 3, 4],
      recordsize: 1,
      recordcurrentPage: 1,
      // 在读学员： 详情弹框  转班按钮弹框
      shiftDialogVisible: ref(false),
      // 在读学员： 详情弹框 转班按钮弹框表单
      shiftruleForm: {
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
      honortable: [
        {
          honorname: "张三",
          honorclassname: "TR02201",
          honorcontent: "ASDDHFGIKASGFCHIJ",
          honortime: "2021-02-02",
        },
      ],
      // 在读学员： 荣誉表格分页
      honorsizes: [1, 2, 3, 4],
      honorsize: 1,
      honorcurrentPage: 1,
      // 在读学员： 添加荣誉弹框
      addcenterDialogVisible: ref(false),
      // 在读学员： 添加荣誉弹框表单
      addhonorruleForm: {
        addhonorname: "wwww", //学员名称
        addhonorclass: "TR02201", //班级
        addhonortext: "", //荣誉内容
        addhonortime: "", //荣誉时间
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
      //  在读学员： 详情弹框    谈话记录表格
      conversationtable: [
        {
          convername: "张三",
          converteacher: "TR02201",
          convertext: "ASDDHFGIKASGFCHIJ",
          convertdata: "2021-02-02",
        },
      ],
      // 在读学员：详情弹框   学员谈话记录表格分页
      conversizes: [1, 2, 3, 4],
      conversize: 1,
      convercurrentPage: 1,
      // 在读学员： 添加谈话弹框
      addconverDialogVisible: ref(false),
      // 在读学员： 添加谈话弹框表单
      addconverruleForm: {
        addconvername: "wwww", //学员名称
        addconverclass: "TR02201", //班级
        addconvertext: "", //荣誉内容
        addconvertime: "", //荣誉时间
      },
      addrules: {
        addconvername: [
          { required: true, message: "请输入学员名称", trigger: "blur" },
        ],
        addconverclass: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        addconvertime: [
          { required: true, message: "请选择获奖时间", trigger: "change" },
        ],
        addconvertext: [
          { required: true, message: "请输入获奖内容", trigger: "blur" },
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
                values:_this.formData.value,
            xsname:_this.formData.input,//学生姓名
            bj:_this.formData.downOne,//学生所在班级
            sffb:_this.formData.checked//是否分班
             }
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
                values:_this.formData.value,
            xsname:_this.formData.input,//学生姓名
            bj:_this.formData.downOne,//学生所在班级
            sffb:_this.formData.checked//是否分班
             }
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
    //在读学员模糊查询
    mohuchaxun(){
      console.log(this.formData.value)
      console.log(this.formData.downOne)
      console.log(this.formData.value)
        var _this=this
          this.axios.get("http://localhost:8088/TSM/mohustudent",{
             params: {
            currentPage: _this.pageInfo.currentPage,
              size: _this.pageInfo.size,
             values:_this.formData.value,
            xsname:_this.formData.input,//学生姓名
            bj:_this.formData.downOne,//学生所在班级
            sffb:_this.formData.checked//是否分班
             }
      }).then(response=>{
 console.log(response);
        this.tableData = response.data.records;
        this.pageInfo.total = response.data.total;
      }).catch(function(err){
        console.log(err)
      })
      
    },
    // 在读学员: 删除弹出框
    openschool() {
      this.$confirm(
        "此操作将永久删除学员的个人信息及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.nextaa();
      });
    },
    // 历史学员:  删除弹出框
    opendelect() {
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
    // 头部标签页
    handleClick1(row) {
      (this.centerDetailDialogVisible = true), console.log("tab:", row);
      this.studentxiangq = row;
    },
    //在读学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
      this.axios.post("http://localhost:8088/TSM/classes/cxclasscount",{

      }).then(response=>{
        console.log(response.data)
        this.selectionone=response.data
      }).catch(function(err){
        console.log(err)
      })
    },

    //历史学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowtwo() {
      document.getElementById("dowtwo").style.color = "#409eff";
    },
    // 历史学员：   表格
    handleClickOne(row) {
      console.log(row);
    },
    // 历史学员：  分页
    handleSizeChangeOne(val) {
      this.sizeOne = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeOne(val) {
      this.currentPageOne = val;
      console.log(`当前页: ${val}`);
    },
    // 报名
    routepath() {
      this.centerDialogVisible = true;
      const routepath = [
        {
          paneName: this.activeName,
          path: this.$route.path,
        },
      ];

      sessionStorage.setItem("routepath", JSON.stringify(routepath));
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
      const birthStr = this.studEditFrom.date1;
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
      this.studEditFrom.age = age;
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.shiftruleForm = {};
          this.shiftDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    shifresetForm(formName) {
      this.shiftruleForm = {};
      this.shiftDialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    // 在读学员： 详情弹框  退学按钮弹框  表单确认、取消按钮
    outsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.outruleForm = {};
          this.outcenterDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    outresetForm(formName) {
      this.outruleForm = {};
      this.outcenterDialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    //  在读学员： 学员荣誉  删除弹出框
    openhonor() {
      this.$confirm(
        "此操作将永久删除学员的个人荣誉及其关联的所有信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.nextaa();
      });
    },
    // 在读学员： 学员荣誉表格分页
    honorhandleSizeChange(val) {
      this.honorsize = val;
      console.log(`每页 ${val} 条`);
    },
    honorhandleCurrentChange(val) {
      this.honorcurrentPage = val;
      console.log(`当前页: ${val}`);
    },
    //在读学员： 学员荣誉   添加荣誉弹框   表单确认、取消按钮
    addhonorsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addhonorruleForm = {};
          this.addcenterDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addhonorresetForm(formName) {
      this.addhonorruleForm = {};
      this.addcenterDialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    //在读学员： 学员荣誉   添加谈话   表单确认、取消按钮
    addconversubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addconverruleForm = {};
          this.addconverDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addconverresetForm(formName) {
      this.addconverruleForm = {};
      this.addconverDialogVisible = false;
    },
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