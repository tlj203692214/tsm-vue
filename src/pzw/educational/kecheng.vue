<template>
  <div style="background: #f5f7fa">
    <div class="tou">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 课程管理 -->
        <el-tab-pane label="课程管理" name="first">
          <div style="background: #f5f7fa; width: 100%; height: 2ex"></div>
          <el-button style="color:#ffffff;margin-left: 77%;margin-top: 16px;background:#f60;" @click="xinzhenkc=true">新增课程</el-button>
          <div class="kecheng">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="courseName" label="课程名称" width="180" />
              <el-table-column prop="courseMoney" label="课程金额" width="180" />
              <el-table-column prop="courseHour" label="课程数量" width="180" />
              <el-table-column prop="coursePrice" label="课程单价" width="180" />
              <el-table-column prop="bookFee" label="书本费" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="text" size="mini" @click="bjkctc(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="mini" @click="sckc(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
    <el-pagination
      @size-change="kchandleSizeChange"
      @current-change="kchandleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
  
          </div>
        </el-tab-pane>
        

        <!-- 教程管理 -->
        <el-tab-pane label="教程管理" name="second">
          <el-tabs
            v-model="activeName1"
            @tab-click="handleClick"
            type="border-card"
          >
 <!--
==================================================================================================================================
         教程入库
          -->
            <el-tab-pane label="教程入库" name="first">
              <el-select
                style="width: 7%"
                v-model="shousuoxlk"
               
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <!-- 搜索框 -->
              <span v-if="shousuoxlk=='教程名称'">
                 <el-input style="width: 15%" v-model="shoushuokuan" placeholder="请输入教程名称" clearable />
              </span>
              <span v-else-if="shousuoxlk=='入库人'">
                 <el-input style="width: 15%" v-model="shoushuokuan" placeholder="请输入入库人名称" clearable />
              </span>
             

              <!-- 搜索按钮 -->
              <el-button
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                "
                type="primary"
                @click="jcss()"
              >
                <el-icon>
                  <search />
                </el-icon>
              </el-button>

              <el-button
                @click="xinzengkc = true"
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                  color: white;
                  margin-left: 51%;
                "
              >
                <el-icon><plus /></el-icon>
                新增教程
              </el-button>
             
              <br />
              <!-- 教程表格 -->
              <el-table :data="jiaocai" stripe style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
                <el-table-column prop="purchaseName" label="教程名称" width="160" />
                <el-table-column
                  prop="purchaseNumber"
                  label="教程数量"
                  width="180"
                />
                 <el-table-column prop="purchasePrice" label="教程单价" width="160" />
                <el-table-column prop="purchaseAount" label="教程总金额" width="160" />
                <el-table-column prop="staffName" label="采购员" width="160" />
                <el-table-column prop="courseName" label="课程" width="160" />
                <el-table-column prop="purchaseDate" label="采购时间" width="160"/>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="zhuijiakc = true"
                      >追加库存</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
               <el-pagination
      @size-change="rkhandleSizeChange"
      @current-change="rkhandleCurrentChange"
      :current-page="pageInfo1.currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageInfo1.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo1.total"
    >
    </el-pagination>
            </el-tab-pane>

            <!-- 
===================================================================================================================================
                教程出库
             -->
            <el-tab-pane label="教程出库" name="second">

                <!-- 搜索框 -->
              <el-input style="width: 15%" v-model="shoushuokuan" />

              <!-- 搜索按钮 -->
              <el-button
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                "
                type="primary"
              >
                <el-icon>
                  <search />
                </el-icon>
              </el-button>
               <el-button
                @click="jiaocaick = true"
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                  color: white;
                  margin-left: 57%;
                "
              >
                <el-icon><plus /></el-icon>
                教程出库
              </el-button>
              <el-button
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                  color: white;
                "
              >
                <el-icon><delete /></el-icon>
                删除
              </el-button>
    <!-- 
=====================================================================================================================
          表格
    -->
              <el-table :data="jiaocai.slice((currentPage-1)*size,currentPage*size)" stripe style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
                <el-table-column prop="jcname" label="教程名称" width="180" />
                <el-table-column
                  prop="jcshulian"
                  label="出库数量"
                  width="180"
                />
                <el-table-column prop="jcjiage" label="申请人" width="180" />
                <el-table-column prop="caigouyuan" label="班级名称" width="180" />
                <el-table-column prop="cgdate" label="出库时间" />
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="xgjiaocaick = true"
                      >编辑出库教程</el-button
                    >
                  </template>
                </el-table-column>
              </el-table> 
  <!--
=============================================================================================================================
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
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  <!--
    =========================================================================================================================
    新增课程
   -->
   <el-form ref="xzkc"  :rules="rules1" :model="xzkc" label-width="120px">
      <el-dialog v-model="xinzhenkc" title="编辑课程管理" width="50%" center>
        <!-- 新增课程名称 -->
        <el-form-item label="课程名称">
          <el-input
            style="width: 30%"
            v-model="xzkc.kcname"
          ></el-input>
        </el-form-item>
        <!-- 新增课程金额 -->
        <el-form-item
          prop="kcje"
          style="position: relative; top: -8.4ex; left: 40%"
          label="课程金额"
         
        >
          <el-input style="width: 30%" v-model.number="xzkc.kcje"  :disabled="true"></el-input>
        </el-form-item>
        <!-- 新增课程课时 -->
        <el-form-item
          prop="kcks"
          style="position: relative; top: -3.4ex"
          label="课程数量"
       
        >
          <el-input
            style="width: 30%"
            @change="suan1()"
            v-model.number="xzkc.kcks"
          ></el-input>
        </el-form-item>
        <!-- 新增课程单价 -->
        <el-form-item
          prop="kcdj"
          style="position: relative; top: -11.7ex; left: 40%"
          label="课程单价"
         
        >
          <el-input
            style="width: 30%"
            @change="suan1()"
            v-model.number="xzkc.kcdj"
          ></el-input>
        </el-form-item>
        <!-- 新增书本费 -->
        <el-form-item
          prop="shuben"
          style="position: relative; top: -7.7ex"
          label="书本价格"
           @change="suan1()"
        >
          <el-input style="width: 30%" v-model.number="xzkc.shuben"></el-input>
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="xzresetForm('xzkc')">取消</el-button>
            <el-button type="primary" @click="xzsubmitForm('xzkc')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>
    <!-- 
==========================================================================================================================
        编辑管理
     -->
    <el-form ref="bjkc" :rules="rules2" :model="bjkc" label-width="120px">
      <el-dialog v-model="bianjikc" title="编辑课程管理" width="50%" center>
        <!-- 编辑课程名称 -->
        <el-form-item label="课程名称">
          <el-input
            style="width: 30%"
            v-model="bjkc.kcname"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程金额 -->
        <el-form-item
          prop="kcje"
          style="position: relative; top: -8.4ex; left: 40%"
          label="课程金额"
          :rules="[{ type: 'number', message: '请输入正确金额' }]"
           
        >
          <el-input style="width: 30%" :disabled="true" v-model.number="bjkc.kcje"></el-input>
        </el-form-item>
        <!-- 编辑课程课时 -->
        <el-form-item
          prop="kcks"
          style="position: relative; top: -3.4ex"
          label="课程数量"
          :rules="[{ type: 'number', message: '请输入正确课时' }]"
        >
          <el-input
            style="width: 30%"
            @change="suan()"
            v-model.number="bjkc.kcks"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程单价 -->
        <el-form-item
          prop="kcdj"
          style="position: relative; top: -11.7ex; left: 40%"
          label="课程单价"
          :rules="[{ type: 'number', message: '请输入正确单价' }]"
        >
          <el-input
            style="width: 30%"
            @change="suan()"
            v-model.number="bjkc.kcdj"
          ></el-input>
        </el-form-item>
        <!-- 编辑书本费 -->
        <el-form-item
          prop="shuben"
          style="position: relative; top: -7.7ex"
           @change="suan()"
          label="书本价格"
          :rules="[{ type: 'number', message: '请输入正确费用' }]"
        >
          <el-input style="width: 30%" v-model.number="bjkc.shuben"></el-input>
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="bjresetForm('bjkc')">取消</el-button>
            <el-button type="primary" @click="submitForm('bjkc')"
              >确定</el-button
            >
              
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!-- 
======================================================================================================================================        
        追加教程数量
     -->
    <el-form ref="jiaocai" :model="jiaocai" label-width="120px">
      <el-dialog v-model="zhuijiakc" title="追加教程" width="50%" center>
        <!-- 编辑教程名称 -->
        <el-form-item label="教程名称">
          <el-input
            style="width: 30%"
            disabled
            v-model="jiaocai.jcname"
          ></el-input>
        </el-form-item>
        <!-- 编辑教程金额 -->
        <el-form-item
          prop="jcjiage"
          style="position: relative; top: -8.4ex; left: 40%"
          label="教程金额"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model.number="jiaocai.jcjiage"
          ></el-input>
        </el-form-item>
        <!-- 编辑教程数量 -->
        <el-form-item
          prop="zjsl"
          style="position: relative; top: -3.4ex"
          label="追加教程数量"
          :rules="[{ type: 'number', message: '请输入正确数量' }]"
        >
          <el-input style="width: 30%" v-model.number="jiaocai.zjsl"></el-input>
        </el-form-item>
        <!-- 编辑采购员-->
        <el-form-item
          prop="caigouyuan"
          style="position: relative; top: -11.7ex; left: 40%"
          label="采购员"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.caigouyuan"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程 -->
        <el-form-item
          prop="kecheng"
          style="position: relative; top: -7.7ex"
          label="课程"
          disabled
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.kecheng"
          ></el-input>
        </el-form-item>

        <!-- 编辑时间 -->
        <el-form-item
          style="position: relative; top: -16ex; left: 40%"
          label="采购时间"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.cgdate"
          ></el-input>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm1('jiaocai')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!-- 
================================================================================================================================        
        新增教程
     -->
    <el-form ref="xzjc" :rules="rulejc" :model="xzjc" label-width="120px">
      <el-dialog v-model="xinzengkc" title="新增教程" width="50%" center>
        <!-- 新增教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjc.jcname"></el-input>
        </el-form-item>
        <!-- 新增教程金额 -->
        <el-form-item
          prop="zjsl"
          style="position: relative; top: -8.4ex; left: 40%"
          label="教程金额"
        >
          <el-input style="width: 30%" v-model.number="xzjc.zjsl" :disabled="true"></el-input>
        </el-form-item>
        <!-- 教程数量 -->
        <el-form-item
          prop="jcshulian"
          style="position: relative; top: -3.4ex"
          label="教程数量"
         
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjc.jcshulian"
             @change="suan2()"
          ></el-input>
        </el-form-item>
        <!-- 教程进价 -->
        <el-form-item
          prop="jcjiage"
          style="position: relative; top: -12.4ex; left: 40%"
          label="教程进价"
           
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjc.jcjiage"
             @change="suan2()"
          ></el-input>
        </el-form-item>
        <!-- 新增采购员-->
        <el-form-item
          prop="caigouyuan"
          style="position: relative; top: -8.7ex; left: 0%"
          label="采购员"
        >
          <!-- <el-input style="width: 30%" v-model=""></el-input> -->
          <el-select style="width: 30%" v-model="xzjc.caigouyuan" placeholder="请选择入库人" @click="cxrkr()">
    <el-option
      v-for="item in options1"
      :key="item.staffId"
      :label="item.staffName"
      :value="item.staffId"
    >
    </el-option>
  </el-select>
        </el-form-item>
        <!-- 新增课程 -->
        <el-form-item
          prop="kcname"
          style="position: relative; top: -17.2ex;left:40%"
          label="课程"
        >
          <el-select v-model="xzjc.kcname" style="width: 30%" @click="cxkc()" placeholder="请选择课程">
            <el-option
              v-for="item in kc"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 新增时间 -->
        <el-form-item
          style="position: relative; top: -14ex; left: 0%"
          prop="cgdate"
          label="采购时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjc.cgdate"
            type="date"
          >
          </el-date-picker>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="kcquxiao('xzjc')">取消</el-button>
            <el-button type="primary" @click="kconoff('xzjc')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>
    <!-- 
============================================================================================================================        
        教材出库窗口
     -->
     <el-form ref="xzjcck" :rules="ruleck" :model="xzjcck" label-width="120px">
      <el-dialog v-model="jiaocaick" title="新增教程" width="50%" center>
        <!-- 出库教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjcck.jcname"></el-input>
        </el-form-item>
        <!-- 出库教程数量 -->
        <el-form-item
          prop="cksl"
          style="position: relative; top: 2ex"
          label="教程数量"
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjcck.cksl"
          ></el-input>
        </el-form-item>
        <!-- 新增申请人-->
        <el-form-item
          prop="sqr"
          style="position: relative; top: -16.7ex; left: 40%"
          label="采购员"
        >
        <el-select style="width: 30%" v-model="xzjcck.sqr">
            <el-option ></el-option>
        </el-select>
        </el-form-item>
        <!-- 班级名称 -->
        <el-form-item
          prop="bjmc"
          style="position: relative; top: -4.5ex"
          label="班级名称"
        >
          <el-select v-model="xzjcck.bjmc" style="width: 30%">
            <el-option
              v-for="item in kc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 出库时间 -->
        <el-form-item
          style="position: relative; top: -23ex; left: 40%"
          prop="cksj"
          label="出库时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjcck.cksj"
            type="date"
          >
          </el-date-picker>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="ckonoff('xzjcck')"
              >确定</el-button
            >
            <el-button @click="ckquxiao('xzjcck')">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!--
================================================================================================================================        
        编辑出库教程
      -->
       <el-dialog v-model="xgjiaocaick" title="编辑出库教程" width="50%" center>
      <el-form ref="xzjcck" :rules="ruleout" :model="xzjcck" label-width="120px">
     
        <!-- 出库教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjcck.jcname"></el-input>
        </el-form-item>
        <!-- 出库教程数量 -->
        <el-form-item
          prop="cksl"
          style="position: relative; top: 2ex"
          label="教程数量"
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjcck.cksl"
          ></el-input>
        </el-form-item>
        <!-- 新增申请人-->
        <el-form-item
          prop="sqr"
          style="position: relative; top: -16.7ex; left: 40%"
          label="采购员"
        >
        <el-select style="width: 30%" v-model="xzjcck.sqr">
            <el-option ></el-option>
        </el-select>
        </el-form-item>
        <!-- 班级名称 -->
        <el-form-item
          prop="bjmc"
          style="position: relative; top: -4.5ex"
          label="班级名称"
        >
          <el-select v-model="xzjcck.bjmc" style="width: 30%">
            <el-option
              v-for="item in kc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 出库时间 -->
        <el-form-item
          style="position: relative; top: -23ex; left: 40%"
          prop="cksj"
          label="出库时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjcck.cksj"
            type="date"
          >
          </el-date-picker>
        </el-form-item>
</el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="bjckonoff('xzjcck')"
              >确定</el-button
            >
            <el-button @click="bjckquxiao('xzjcck')">取消</el-button>
          </span>
        </template>
    
     </el-dialog>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
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
export default {
  components: {
    ElConfigProvider,
    search: Search,
    edit: Edit,
    delete: Delete,
    plus: Plus,
  },
  props: {},
  data() {
    return {
      pageInfo:{
        currentPage:1,
        size:2,
        total:0
      },
      pageInfo1:{
        currentPage:1,
        size:2,
        total:0
      },
      locale: zhCn,
      activeName: "first",
      activeName1: "first",
      //新增课程弹窗
      xinzhenkc:false,
      //编辑课程弹窗
      bianjikc: false,
      //新增课程弹窗
      xinzengkc: false,
      //追加课程弹窗
      zhuijiakc: false,
      //教程出库弹窗
      jiaocaick:false,
      //编辑教程出库弹窗
      xgjiaocaick:false,
      //分页
       sizes:[1,2,3,4],
      size:1,
      currentPage: 1,
      //新增课程
      xzkc:{
         kcname: "",
        kcks: 0,
        kcdj: 0,
        shuben: 0,
        kcje: 0,
      },
       rules1: {
          kcname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          kcks:[
           { required: true, message: '课程数量不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课程数量' }
          ],
        kcdj:[
           { required: true, message: '课时单价不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课时单价' }
        ],
        shuben:[
           { required: true, message: '书本费不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确书本费' }
        ],
        kcje:[
           { required: true, message: '课程金额不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课程金额' }
        ]
          },
    //编辑课程
      bjkc: {
        kcname: "",
        kcks: 0,
        kcdj: 0,
        shuben: 0,
        kcje: 0,
        kcid:'',
      },
      rules2: {
          kcname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          kcks:[
           { required: true, message: '课程数量不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课程数量' }
          ],
        kcdj:[
           { required: true, message: '课时单价不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课时单价' }
        ],
        shuben:[
           { required: true, message: '书本费不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确书本费' }
        ],
        kcje:[
           { required: true, message: '课程金额不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入正确课程金额' }
        ]
          },
      //课程
      tableData: [],
      //教程
      jiaocai: [],
      //新增教程
      xzjc: 
        {
          jcname: "",
          jcshulian: 0,
          jcjiage: 0,
          caigouyuan: "",
          cgdate:'',
          kcname: "",
          zjsl: 0,
        },
      //新增教程出库
      xzjcck:[
          {
              jcname:"",
              cksl:"",
              sqr:"",
              bjmc:'',
              cksj:new Date,
          }
          ],
      rulejc: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        jcshulian: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        jcjiage: [
          {
            required: true,
            message: "教程价格不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确金额' },
        ],
        caigouyuan: [
          {
            required: true,
            message: "采购人不能为空",
            trigger: "blur",
          },
        ],
        kcname: [
          {
            required: true,
            message: "课程名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //添加出库规则
       ruleck: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        cksl: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        sqr: [
          {
            required: true,
            message: "申请人不能为空",
            trigger: "blur",
          },
        ],
        bjmc: [
          {
            required: true,
            message: "班级名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //编辑出库规则
      ruleout: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        cksl: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        sqr: [
          {
            required: true,
            message: "申请人不能为空",
            trigger: "blur",
          },
        ],
        bjmc: [
          {
            required: true,
            message: "班级名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //教程入库跟进名称或入库人查询
      options: ref([
        {
          value: "教程名称",
          label: "教程名称",
        },
        {
          value: "入库人",
          label: "入库人",
        },
      ]),
       options1: ref([]),

      kc: ref([
        {
          value: "java",
          label: "java",
        },
      ]),
      shousuoxlk: "教程名称",
      shoushuokuan: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    //新增课程确定
    xzsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/course/addcourse",{
            courseName:this.xzkc.kcname,
            courseMoney:this.xzkc.kcje,
            courseHour:this.xzkc.kcks,
            coursePrice:this.xzkc.kcdj,
            bookFee:this.xzkcshuben
          }).then(response=>{
              console.log(response);
              this.crea();
               this.xinzhenkc = false;

          }).catch(function(err){
              console.log(err)
          })
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bjkctc(row){
      this.bjkc.kcname=row.courseName
      this.bjkc.kcks=row.courseHour
      this.bjkc.kcdj=row.coursePrice
      this.bjkc.shuben=row.bookFee
      this.bjkc.kcje=row.courseMoney
      this.bjkc.kcid=row.courseId
     this.bianjikc = true
    },
    sckc(row){
        this.$confirm("是否删除课程信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.post("http://localhost:8088/TSM/course/updatazt",{
             courseId:row.courseId
          }).then(response=>{
            console.log(response)
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.crea()
          }).catch(err=>{
              console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    xzresetForm(formName){
       this.$refs[formName].resetFields()
        this.xinzhenkc = false;
    },
    //添加时：查询入库人
    cxrkr(){
        this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

        }).then(response=>{
            console.log(response.data)
            this.options1=response.data
        }).catch(err=>{
          console.log(err)
        })
    },
    //添加时：查询课程
    cxkc(){
      this.axios.get("http://localhost:8088/TSM/course/selectcourse",{

        }).then(response=>{
            console.log(response.data)
            this.kc=response.data
        }).catch(err=>{
          console.log(err)
        })
    },
       //编辑教程库存窗口
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/course/updatacourse",{
        courseId:this.bjkc.kcid,
        courseMoney:this.bjkc.kcje,
        bookFee:this.bjkc.shuben,
        coursePrice:this.bjkc.kcdj,
        courseHour:this.bjkc.kcks,
        courseName:this.bjkc.kcname
          }).then(response=>{
              console.log(response)
               ElMessage.success({
            message: '修改成功',
            type: 'success',
          })
          this.crea()
              this.bianjikc = false;
          }).cathc(err=>{
            console.log(err)
          })
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bjresetForm(formName){
      this.$refs[formName].resetFields()
        this.bianjikc = false;
    },
    //添加教程库存窗口
      kconoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/purchase/interpurchase",{
        purchaseName:this.xzjc.jcname,
        purchaseNumber:this.xzjc.jcshulian,
        purchasePrice: this.xzjc.zjsl, //单价
        purchaseAount:this.xzjc.jcjiage,//总价
        staffId: this.xzjc.caigouyuan,//采购员编号
        courseId:this.xzjc.kcname,//课程编号
        purchaseDate:this.xzjc.cgdate //采购时间

          }).then(response=>{
            console.log(response.data)
            this.axios.post("http://localhost:8088/TSM/expenditure/interexpenditure",{
              expenditureMoney:this.xzjc.jcjiage,
              expenditureDate:this.xzjc.cgdate,
              purchaseId:response.data
            }).then(response=>{
                console.log(response)
                this.cgcrea()
            ElMessage.success({
            message: '添加教程采购',
            type: 'success',
          })
            }).catch(err=>{
              console.log(err)
            })
          }).catch(err=>{
            console.log(err)
          })
          this.xinzengkc = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    kcquxiao(formName){
        this.$refs[formName].resetFields()
         this.xinzengkc = false;
    },
    //添加出库窗口
    ckonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.jiaocaick = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ckquxiao(formName){
        this.$refs[formName].resetFields()
         this.jiaocaick = false;
    },
    //添加编辑出库窗口
     bjckonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.xgjiaocaick = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bjckquxiao(formName){
        this.$refs[formName].resetFields()
         this.xgjiaocaick = false;
    },
    // //追加教程库存窗口
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.zhuijiakc = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    suan() {
      let jg = this.bjkc.kcdj * this.bjkc.kcks+this.bjkc.shuben;
      this.bjkc.kcje = jg;
    },
    suan1() {
      let jg = this.xzkc.kcdj * this.xzkc.kcks+this.xzkc.shuben;
      this.xzkc.kcje = jg;
    },
     suan2() {
      let jg = this.xzjc.jcshulian * this.xzjc.jcjiage;
      this.xzjc.zjsl= jg;
    },
    kchandleSizeChange(size){
        this.pageInfo.size=size
        this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params:this.pageInfo
    }).then(response=>{
        console.log(response.data)
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
    },
    kchandleCurrentChange(page){
      this.pageInfo.currentPage=page
        this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params:this.pageInfo
    }).then(response=>{
        console.log(response.data)
        this.tableData=response.data.records
    }).catch(err=>{
      console.log(err)
    })
    },
    //入库教程搜索
    jcss(){
        this.axios.get("http://localhost:8088/TSM/selectmhpurchase",{
          params:{
            size: this.pageInfo1.size,
            currentPage: this.pageInfo1.currentPage,
            name: this.shoushuokuan, //搜索信息
            jcmc:this.shousuoxlk
          }
        }).then(response=>{
            this.jiaocai=response.data.records
        this.pageInfo1.total=response.data.total
        }).catch(err=>{
            console.log(err)
        })
    },
    //入库分页
    rkhandleSizeChange(size) {
         this.pageInfo1.size=size
          console.log(`每页 ${size} 条`);
           //教程采购查询
   this.axios.get("http://localhost:8088/TSM/selectmhpurchase",{
          params:{
            size: this.pageInfo1.size,
            currentPage: this.pageInfo1.currentPage,
            name: this.shoushuokuan, //搜索信息
            jcmc:this.shousuoxlk
          }
        }).then(response=>{
            this.jiaocai=response.data.records
        this.pageInfo1.total=response.data.total
        }).catch(err=>{
            console.log(err)
        })
      },
    rkhandleCurrentChange(page) {
         this.pageInfo1.currentPage=page
         console.log(`当前页: ${page}`);
          //教程采购查询
    this.axios.get("http://localhost:8088/TSM/selectmhpurchase",{
          params:{
            size: this.pageInfo1.size,
            currentPage: this.pageInfo1.currentPage,
            name: this.shoushuokuan, //搜索信息
            jcmc:this.shousuoxlk
          }
        }).then(response=>{
            this.jiaocai=response.data.records
        }).catch(err=>{
            console.log(err)
        })
      },

    handleSizeChange(val) {
        this.size=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        console.log(`当前页: ${val}`);
      },
crea() {
    this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params:this.pageInfo
    }).then(response=>{
        console.log(response.data)
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
  },
  cgcrea(){
    //教程采购查询
    this.axios.get("http://localhost:8088/TSM/selectpurchase",{
      params:this.pageInfo1
    }).then(response=>{
       console.log(response.data)
        this.jiaocai=response.data.records
        this.pageInfo1.total=response.data.total
    }).catch(err=>{
         console.log(err)
    })
  },
  },
  created() {
    this.axios.get("http://localhost:8088/TSM/course/fyselectcourse",{
      params:this.pageInfo
    }).then(response=>{
        console.log(response.data)
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
    //教程采购查询
    this.axios.get("http://localhost:8088/TSM/selectpurchase",{
      params:this.pageInfo1
    }).then(response=>{
       console.log(response.data)
        this.jiaocai=response.data.records
        this.pageInfo1.total=response.data.total
    }).catch(err=>{
         console.log(err)
    })
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
* {
  padding: 0%;
  margin: 0%;
}
.wrapper {
}
.tou {
  width: 98%;
  background: #fff;
  // margin: 0 0 10px;
  margin-left: 1%;
}
.kecheng {
}
</style>