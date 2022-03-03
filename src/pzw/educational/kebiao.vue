<template>
  <!-- <div class="wrapper"> -->
  <div class="tou">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 
=================================================================================================================================            
                  排课
               -->
      
      <el-tab-pane label="排课" name="first">
        <div style="background: #f5f7fa; width: 100%; height: 2ex"></div>
        <!-- 搜索框 -->
        <div style="margin-top: 10px">
          <el-input
            style="width: 15%"
            v-model="shoushuokuan"
            placeholder="输入班级名称"
            clearable 
          />

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
            @click="sskb()"
          >
            <el-icon>
              <search />
            </el-icon>
          </el-button>
          <el-button
            @click="kspaike = true"
            style="
              background: #f60;
              --el-button-hover-color: #ff9f5f;
              --el-button-active-background-color: #d35400;
              --el-button-border-color: black;
              --el-button-hover-color: #f60;
              color: white;
              margin-left: 61%;
            "
          >
            <el-icon><plus /></el-icon>
            快速排课
          </el-button>
          <!-- <el-button
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
            批量删除
          </el-button> -->
        </div>
        <!-- 
 =================================================================================================================================              
            表格
         -->
        <el-table
          :data="paike"
          stripe
          style="width: 100%"
        >
          <!-- <el-table-column type="selection" width="55" />-->
          <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
            <el-table-column prop="classesName" label="班级名称" width="150" />
          <el-table-column prop="timetableTime" label="上午上课时间" width="180" />
           <el-table-column prop="timetableMorningend" label="上午下课时间" width="180" />
            <el-table-column prop="timetableAfternoonstart" label="下午上课时间" width="180" />
           <el-table-column prop="timetableAfternoonend" label="下午下课时间" width="180" />
            <el-table-column prop="timetableMorning" label="上午课程" width="150" />
          <el-table-column prop="timetableAfternoon" label="下午课程" width="150" />
         <el-table-column prop="staffname1" label="上午任课老师" width="150" />
          <el-table-column prop="staffname2" label="下午任课老师" width="150" />
          <el-table-column prop="timetableDate" label="状态" >
             <template #default="scope">
            <span v-if="this.datesj>scope.row.timetableDate">已上</span>
            <span v-else>未上</span>
          </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <!-- <el-button type="text" size="small" @click="dianming = true"
                >点名</el-button
              > -->
              <el-button type="text" size="small" @click="sckb(scope.row)">删除</el-button>
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
            :current-page="pageInfo.currentPage"
            :page-sizes="[2,4,6,8]"
            :page-size="pageInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
          >
          </el-pagination>
        </div>

        <!-- 
================================================================================================================================
    新增课表
 -->
        <el-form
          ref="xzpaike"
          :rules="ruleck"
          :model="xzpaike"
          label-width="120px"
        >
          <el-dialog v-model="kspaike" title="排课" width="50%" center @close="pkquxiao('xzpaike')">
            <!-- 班级名称-->
            <el-form-item prop="banjiname" label="班级名称">
              <!-- <el-input
                style="width: 30%"
                v-model="xzpaike.banjiname"
              ></el-input> -->
              <el-select v-model="xzpaike.banjiname" placeholder="请选择班级" @click="cxbj()" style="width:30%">
                <el-option
                      v-for="item in options"
                      :key="item.classesId"
                      :label="item.classesName"
                      :value="item.classesId"
                 >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 开始日期 -->
            <el-form-item label="开始日期" prop="kaishidate">
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.kaishidate"
                type="date"
                placeholder="选择开始日期"
                 format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
              ></el-date-picker>
             
            </el-form-item>
            <!-- 结束日期-->
            <el-form-item
              prop="jieshudate"
              style="position: relative; top: -8.4ex; left: 40%"
              label="结束日期"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.jieshudate"
                type="date"
                placeholder="选择开始日期"
                 format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider
              style="margin-top: -38px"
              border-style="dashed"
            ></el-divider>
            <!-- 上午上课时间-->
            <el-form-item
              prop="swskdate"
              style="position: relative; top: 5ex"
              label="上午上课时间"
            >
              <!-- <el-date-picker
                style="width: 30%"
                v-model="xzpaike.swskdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker> -->
             
              <el-time-select
              style="width: 30%"
      v-model="xzpaike.swskdate"
      :max-time="endTime"
      class="mr-4"
      placeholder="选择开始时间"
      start="08:00"
      step="00:15"
      end="12:30"
    >
    </el-time-select>
            </el-form-item>
            <!-- 上午结束时间-->
            <el-form-item
              prop="swjsdate"
              style="position: relative; top: -3.6ex; left: 40%"
              label="上午结束时间"
            >
              <!-- <el-date-picker
                style="width: 30%"
                v-model="xzpaike.swjsdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker> -->
              
               <el-time-select
               style="width: 30%"
      v-model="xzpaike.swjsdate"
      :min-time="xzpaike.swskdate"
      placeholder="选择结束时间"
      start="08:00"
      step="00:15"
      end="12:30"
    >
    </el-time-select>
            </el-form-item>

            <!-- 下午上课时间-->
            <el-form-item
              prop="xwskdate"
              style="position: relative; top: -2ex"
              label="下午上课时间"
            >
              <!-- <el-date-picker
                style="width: 30%"
                v-model="xzpaike.xwskdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker> -->
              
              <el-time-select
              style="width: 30%"
      v-model="xzpaike.xwskdate"
      :max-time="endTime"
      class="mr-4"
      placeholder="选择开始时间"
      start="14:00"
      step="00:15"
      end="18:30"
    >
    </el-time-select>
            </el-form-item>
            <!-- 下午结束时间-->
            <el-form-item
              prop="xwjsdate"
              style="position: relative; top: -10.6ex; left: 40%"
              label="下午结束时间"
            >
              <!-- <el-date-picker
                style="width: 30%"
                v-model="xzpaike.xwjsdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker> -->
             
               <el-time-select
               style="width: 30%"
      v-model="xzpaike.xwjsdate"
      :min-time="xzpaike.xwskdate"
      placeholder="选择结束时间"
      start="14:00"
      step="00:15"
      end="18:30"
    >
    </el-time-select>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider
              style="margin-top: -38px"
              border-style="dashed"
            ></el-divider>
            <!-- 上午课程-->
            <el-form-item prop="swkc" label="上午课程">
              <el-input style="width: 30%" v-model="xzpaike.swkc"></el-input>
            </el-form-item>
            <!-- 下午课程-->
            <el-form-item
              prop="xwkc"
              style="position: relative; top: -8.4ex; left: 40%"
              label="下午课程"
            >
              <el-input style="width: 30%" v-model="xzpaike.xwkc"></el-input>
            </el-form-item>

            <!-- 上午上课老师 -->
            <el-form-item
              prop="swskls"
              style="position: relative; top: -4.5ex"
              label="上午上课老师"
            >
              <el-select v-model="xzpaike.swskls" style="width: 30%" placeholder="上午任课老师" @click="cxls()">
                <el-option
                  v-for="item in kc"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="item.staffId"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 下午上课老师 -->
            <el-form-item
              prop="xwskls"
              style="position: relative; top: -12.8ex; left: 40%"
              label="下午上课老师"
            >
              <el-select v-model="xzpaike.xwskls" style="width: 30%" placeholder="下午任课老师" @click="cxls()">
                <el-option
                  v-for="item in kc"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="item.staffId"
                ></el-option>
              </el-select>
            </el-form-item>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="pkquxiao('xzpaike')">取消</el-button>
                <el-button type="primary" @click="pkonoff('xzpaike'),cxpkid()"
                  >确定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </el-form>

        <!-- 
==================================================================================================================================    
    点名窗口
-->
        <el-dialog v-model="dianming" title="编辑出库教程" width="60%" center>
          <el-form
            ref="xzjcck"
            :rules="ruleout"
            :model="xzjcck"
            label-width="120px"
          >
            <el-table :data="xueyuandm" height="250" style="width: 100%">
    <el-table-column prop="xsname" label="学生姓名" width="150" />
    <el-table-column prop="xszt" label="学生上课情况" width="150" />
    <el-table-column  label="点名操作" >
        <el-radio-group v-model="radio">
    <el-radio :label="0">到课</el-radio>
    <el-radio :label="1">请假</el-radio>
     <el-radio :label="2">迟到</el-radio>
    <el-radio :label="3">旷课</el-radio>
    <el-radio :label="4">未点名</el-radio>
  </el-radio-group>
    </el-table-column>
  </el-table>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="dmonoff('xueyuandm')"
                >确定</el-button
              >
              <el-button @click="dmquxiao('xueyuandm')">取消</el-button>
            </span>
          </template>
        </el-dialog>
      </el-tab-pane>

      <!-- <el-tab-pane label="总课表查看" name="second">
        <div style="">
          <table style="width: 100%;font-family: verdana,arial,sans-serif;
          font-size:11px;
          color:#333333;
          text-align:center;
          border-width: 1px;
          border-color: #666666;
          border-collapse: collapse;" border="1">
            <tr>
  <th rowspan="2">星期</th>
 <th rowspan="2">日期</th>
  <th rowspan="1">时间</th>
 <th colspan="5">上午（8：00——12：00）</th>
  <th colspan="5">下午（14：00——17：00）</th>
</tr>

<tr>
 <th rowspan="1">班级</th>
<th colspan="1">教员</th>
<th colspan="4">上课内容</th>
 <th colspan="1">教员</th>
<th colspan="4">上课内容</th>
</tr>
<tr v-for="cm in paikelist">
	
    <td></td>
    <td>{{cm.timetableDate}}</td>
    <td>{{cm.classesName}}</td>
    <td>{{cm.staffname1}}</td>
    <td colspan="4">{{cm.timetableMorning}}</td>
    <td>{{cm.staffname2}}</td>
    <td colspan="4">{{cm.timetableAfternoon}}</td>
</tr>
          </table>
          </div>
      </el-tab-pane> -->
    </el-tabs>
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
import { ElMessage } from 'element-plus'
export default {
  components: {
    search: Search,
    plus: Plus,
  },
  props: {},
  data() {
    return {
      activeName: "first",
      //快速排课窗口
      kspaike: false,
      //点名操作
      radio:4,
      //点名窗口
      dianming: false,
      //排课分页
      pageInfo:{
        currentPage:1,
        size:2,
        total:0
      },
      datesj:'',
      //搜索框
      shoushuokuan:'',
      //排课数据
      paike: [],
     
      kc:[],
      pkzdid:'',
      options:[],
      //新增排课
      xzpaike: [
        {
          kaishidate: "", //开始时间
          jieshudate: "", //结束时间
          banjiname: "", //班级名称
          swkc: "", //上午课程
          xwkc: "", //下午课程
          swskdate: "", //上午上课时间
          swjsdate: "", //上午结束时间
          xwskdate: "", //下午上课时间
          xwjsdate: "", //下午结束时间
          swskls: "", //上午上课老师
          xwskls: "", //下午上课老师
        },
      ],
      xueyuandm:[
          {
              xsname:'小博',
              xszt:'未上课',
          }
          ],
      //增加排课规则
      ruleck: {
        kaishidate: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        jieshudate: [
          {
            required: true,
            message: "结束时间不能为空",
            trigger: "blur",
          },
        ],
        banjiname: [
          {
            required: true,
            message: "班级不能为空",
            trigger: "blur",
          },
        ],
        swkc: [
          {
            required: true,
            message: "上午课程不能为空",
            trigger: "blur",
          },
        ],
        xwkc: [
          {
            required: true,
            message: "下午课程不能为空",
            trigger: "blur",
          },
        ],
        swskdate: [
          {
            required: true,
            message: "上午上课时间不能为空",
            trigger: "blur",
          },
        ],
        swjsdate: [
          {
            required: true,
            message: "上午结束时间不能为空",
            trigger: "blur",
          },
        ],
        xwskdate: [
          {
            required: true,
            message: "下午上课时间不能为空",
            trigger: "blur",
          },
        ],
        xwjsdate: [
          {
            required: true,
            message: "下午结束时间不能为空",
            trigger: "blur",
          },
        ],
        swskls: [
          {
            required: true,
            message: "上午上课老师不能为空",
            trigger: "blur",
          },
        ],
        xwskls: [
          {
            required: true,
            message: "下午上课老师不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
      //排课开关
    pkonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let timearr = this.getAll(this.xzpaike.kaishidate ,this.xzpaike.jieshudate)
          console.log("算后天数",timearr)
          this.axios.post("http://localhost:8088/TSM/teaching/addteaching",{
          beginDate:this.xzpaike.kaishidate,
          endTime:this.xzpaike.jieshudate,
          classesId:this.xzpaike.banjiname
          }).then(response=>{
            console.log(response)
             this.$refs[formName].resetFields();
             ElMessage.success({
            message: '排课成功',
            type: 'success',
          })
          }).catch(err=>{
            console.log(err)
          })
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cxpkid(){
      this.axios.get("http://localhost:8088/TSM/teaching/selectid",{

      }).then(response=>{
         console.log("查排课最大编号",response.data)
        this.pkzdid=response.data
        this.addkebioa(this.pkzdid)
      }).catch(err=>{
        console.log(err)
      })
    },
    //添加课表
    addkebioa(id){
      let timearr = this.getAll(this.xzpaike.kaishidate ,this.xzpaike.jieshudate)
          console.log("算后天数",timearr)
    //let v1 = this.pkzdid;
          console.log("排课最大编号",id)
          for(let i =0;i<timearr.length;i++){
            
            console.log("循环时间",timearr[i])
      this.axios.post("http://localhost:8088/TSM/timetable/addtimetable",{
         //        xzpaike: [
      //   {
      //     kaishidate: "", //开始时间
      //     jieshudate: "", //结束时间
      //     banjiname: "", //班级名称
      //     swkc: "", //上午课程
      //     xwkc: "", //下午课程
      //     swskdate: "", //上午上课时间
      //     swjsdate: "", //上午结束时间
      //     xwskdate: "", //下午上课时间
      //     xwjsdate: "", //下午结束时间
      //     swskls: "", //上午上课老师
      //     xwskls: "", //下午上课老师
      //   },
      // ],
      timetableMorning:this.xzpaike.swkc,
      timetableAfternoon:this.xzpaike.xwkc,
      timetableTime:this.xzpaike.swskdate,
      timetableMorningend:this.xzpaike.swjsdate,
      timetableAfternoonstart:this.xzpaike.xwskdate,
      timetableAfternoonend:this.xzpaike.xwjsdate,
      timetableDate:timearr[i],
      // timetableState:this.xzpaike.
       teachingId:id,
      staffId1:this.xzpaike.swskls,
      staffId2:this.xzpaike.xwskls
      }).then(response=>{
        console.log(response)
         this.kspaike = false;
         this.crea();
        
      }).catch(err=>{
        console.log(err)
      })
          }
    },
    pkquxiao(formName) {
      this.$refs[formName].resetFields();
      this.kspaike = false;
    },
  
    // 计算续住的总日期列表
		getAll(begin, end) {
      console.log("时间:",begin)
      console.log("时间1:",end)
      let aaa=begin
			let arr1 = aaa.split("-");   //这里可以换成/  就2020/01/1 这种
			let arr2 = end.split("-");
			let arr1_ = new Date();
			let arrTime = [];
			arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
			let arr2_ = new Date();
			arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
			let unixDb = arr1_.getTime();
			let unixDe = arr2_.getTime();
			for (let k = unixDb; k <= unixDe;) {
				arrTime.push(this.datetimeparse(k, 'YY-MM-DD'));
				k = k + 24 * 60 * 60 * 1000;
			}
			return arrTime;
		},
		// 时间格式处理
	datetimeparse(timestamp, format, prefix) {
			if (typeof timestamp == 'string') {
				timestamp = Number(timestamp)
			};
			//转换时区
			let currentZoneTime = new Date(timestamp);
			let currentTimestamp = currentZoneTime.getTime();
			let offsetZone = currentZoneTime.getTimezoneOffset() / 60; //如果offsetZone>0是西区，西区晚
			let offset = null;
			//客户端时间与服务器时间保持一致，固定北京时间东八区。
			offset = offsetZone + 8;
			currentTimestamp = currentTimestamp + offset * 3600 * 1000

			let newtimestamp = null;
			if (currentTimestamp) {
				if (currentTimestamp.toString().length === 13) {
					newtimestamp = currentTimestamp.toString()
				} else if (currentTimestamp.toString().length === 10) {
					newtimestamp = currentTimestamp + '000'
				} else {
					newtimestamp = null
				}
			} else {
				newtimestamp = null
			};
			let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
			let YYYY = dateobj.getFullYear()
			let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
			let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
			let HH = dateobj.getHours() > 9 ? dateobj.getHours() : '0' + dateobj.getHours()
			let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
			let ss = dateobj.getSeconds() > 9 ? dateobj.getSeconds() : '0' + dateobj.getSeconds()
			let output = '';
			let separator = '/'
			if (format) {
				separator = format.match(/-/) ? '-' : '/'
				output += format.match(/yy/i) ? YYYY : ''
				output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
				output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
				output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
				output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
				output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
			} else {
				output += YYYY + separator + MM + separator + DD
			}
			output = prefix ? (prefix + output) : output

			return newtimestamp ? output : ''
		},
    //新增排课：查询班级
    cxbj(){
      this.axios.post("http://localhost:8088/TSM/classes/cxclasscount",{

      }).then(response=>{
        console.log(response.data)
        this.options=response.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //新增排课：查询任课老师
    cxls(){
      this.axios.get("http://localhost:8088/TSM/staff/selectstaffqudao",{

      }).then(response=>{
        console.log(response.data)
        this.kc=response.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //删除课表
    sckb(row){
      this.axios.post("http://localhost:8088/TSM/timetable/deletedtimetable",{
          timetableId:row.timetableId
      }).then(response=>{
        console.log(response)
        this.crea()
         ElMessage.success({
            message: '删除成功',
            type: 'success',
          })
      }).catch(err=>{
        console.log(err)
      })
    },
    //课表模糊查询
    sskb(){
      this.axios.get("http://localhost:8088/TSM/selectteaching",{
      params:{
        currentPage:this.pageInfo.currentPage,
        size:this.pageInfo.size,
        name:this.shoushuokuan
      }
    }).then(response=>{
      console.log(response.data)
      this.paike=response.data.records
      this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
    },
    //分页
    handleCurrentChange(Page){
      this.pageInfo.currentPage=Page
      console.log(`每页 ${Page} 条`);
       this.axios.get("http://localhost:8088/TSM/selectteaching",{
      params:{
        currentPage:this.pageInfo.currentPage,
        size:this.pageInfo.size,
        name:this.shoushuokuan
      }
    }).then(response=>{
      console.log(response.data)
      this.paike=response.data.records
    }).catch(err=>{
      console.log(err)
    })
    },
    handleSizeChange(size){
      this.pageInfo.size=size
       console.log(`每页 ${size} 条`);
       this.axios.get("http://localhost:8088/TSM/selectteaching",{
      params:{
        currentPage:this.pageInfo.currentPage,
        size:this.pageInfo.size,
        name:this.shoushuokuan
      }
    }).then(response=>{
      console.log(response.data)
      this.paike=response.data.records
      this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
    },
    //点名开关
     dmonoff(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
          this.dianming = false;
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
     // });
    },
    dmquxiao(formName) {
     // this.$refs[formName].resetFields();
      this.dianming = false;
    },
    crea(){
      this.axios.get("http://localhost:8088/TSM/selectteaching",{
      params:{
        currentPage:this.pageInfo.currentPage,
        size:this.pageInfo.size,
        name:this.shoushuokuan
      }
    }).then(response=>{
      console.log(response.data)
      this.paike=response.data.records
      this.pageInfo.total=response.data.total
    }).catch(err=>{
      console.log(err)
    })
    },
  },
  created() {
     //获取当前时间 格式为：YYYY-MM-dd
    var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  this.datesj=currentdate
  let a=currentdate
  console.log("时间:",currentdate)

    this.axios.get("http://localhost:8088/TSM/selectteaching",{
      params:{
        currentPage:this.pageInfo.currentPage,
        size:this.pageInfo.size,
        name:this.shoushuokuan
      }
    }).then(response=>{
      console.log(response.data)
      this.paike=response.data.records
      this.pageInfo.total=response.data.total
      
    }).catch(err=>{
      console.log(err)
    })

    this.axios.get("http://localhost:8088/TSM/selectlist",{
     
    }).then(response=>{
      console.log(response.data)
      let b=response.data
      this.paike=response.data
     for(let i =0;i<b.length;i++){
         console.log("b[i]输出:",b[i].timetableDate)
    if(a>b[i].timetableDate){
     this.axios.post("http://localhost:8088/TSM/timetable/deletedtimetablezt",{
          timetableId:b[i].timetableId
      }).then(response=>{
        console.log("成功",response)
        this.crea()
      }).catch(err=>{
        console.log(err)
      })
    }
  }
      
    }).catch(err=>{
      console.log(err)
    })

  
  
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
html {
  background: rgb(245, 247, 250);
}
.tou {
  width: 98%;
  background: #fff;
  // margin: 0 0 10px;
  margin-left: 1%;
}
</style>