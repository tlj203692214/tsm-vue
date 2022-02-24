<template>
  <div>
    <!-- 搜索框 -->
    <div style="margin-top: 10px">
      <el-input
        style="width: 15%"
        v-model="shoushuokuan"
        placeholder="输入地址"
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
        @click="buttonselect()"
      >
        <el-icon>
          <search />
        </el-icon>
      </el-button>
      <!-- 添加渠道 -->
      <el-button
        @click="xinzhenqudao = true"
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
        添加渠道
      </el-button>
    </div>

    <!-- 
  =============================================================================================================================
        表格
     -->
    <el-table 
    :data="qudaotable"  style="width: 100%">
     <!-- <el-table-column prop="channelId" label="编号" width="380" /> -->
      <el-table-column prop="channelLoc" label="地址" width="380" />
      <el-table-column prop="channelName" label="学校" width="380" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="deletequdao(scope.row)">删除</el-button>
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
 ===================================================================================================================
    新增渠道窗口       
     -->
    <el-dialog v-model="xinzhenqudao" title="渠道新增" width="35%" center :show-close="false" :close-on-click-modal="close_modal">
      <el-form
        ref="xzqudao"
        :rules="rulequdao"
        :model="xzqudao"
        label-width="120px"
      >
        <el-form-item label="地址" prop="dz">
          <el-input v-model="xzqudao.dz"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="xx">
          <el-input v-model="xzqudao.xx"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dmonoff('xzqudao')"
            >确定</el-button
          >
          <el-button @click="dmquxiao('xzqudao')">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 
================================================================================================================================
        编辑渠道窗口
     -->

     <el-dialog v-model="xiugaiqudao" title="渠道新增" width="35%" center :show-close="false" :close-on-click-modal="close_modal">
      <el-form
        ref="xgqudao"
        :rules="rulequdao1"
        :model="xgqudao"
        label-width="120px"
      >
      
        <el-form-item label="地址" prop="channelLoc">
          <el-input v-model="xgqudao.channelLoc"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="channelName">
          <el-input v-model="xgqudao.channelName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="xgqdonoff('xgqudao')"
            >确定</el-button
          >
          <el-button @click="xgqdquxiao('xgqudao')">取消</el-button>
        </span>
      </template>
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
import { ElMessage } from 'element-plus'
import qs from 'qs';
export default {
  components: {
    search: Search,
    aplus: Plus,
  },
  props: {},
  data() {
    return {
      //点击弹框外不取消弹框
       close_modal:false,
      //排课分页
      pageInfo:{
          total:0,
          size: 2,
          currentPage: 1
      },
      //搜索框
          shoushuokuan:'',
        //修改渠道
        xiugaiqudao:false,
      //新增渠道
      xinzhenqudao: false,
      qudaotable: [],
      //渠道添加
      xzqudao: [
        {
          dz: "",
          xx: "",
        },
      ],
      //渠道修改
      xgqudao:[
        {
          channelId:'',
          channelLoc:'',
          channelName:'',
        }
      ],
      //渠道新增规则
      rulequdao: {
        dz: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
         xx: [
          {
            required: true,
            message: "学校不能为空",
            trigger: "blur",
          },
        ],
      },
       rulequdao1: {
        channelLoc: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
         channelName: [
          {
            required: true,
            message: "学校不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    //修改赋值
    handleEdit(index, row) {
				this.xiugaiqudao = true
				this.xgqudao = Object.assign({}, row) // 这句是关键！！！
			},
    // 分页
    handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/selectchannel", {
					 params: _this.pageInfo
					})
					.then(function(response) {
						console.log("1-------------------------------------------")
						console.log(response.data)
						_this.qudaotable = response.data.records
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.size = size
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/selectchannel", {
						 params: _this.pageInfo
					})
					.then(function(response) {
						console.log("2-------------------------------------------")
						console.log(response.data)
						_this.qudaotable = response.data.records
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
      //按钮查询
      
      buttonselect(){
        var _this=this
        this.axios.get("http://localhost:8088/TSM/anselectchannel",{
           params:{size:_this.pageInfo.size,
                    currentPage:_this.pageInfo.currentPage,
                  shoushuokuan:_this.shoushuokuan,
          }
        })
        .then(function(response){
          console.log(response.data)
            _this.qudaotable=response.data.records;
      _this.pageInfo.total=response.data.total
        }).catch(function(error){
          console.log(error)
        })
      },
      //新增渠道开关
     dmonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/addchannel",{
           channelLoc:this.xzqudao.dz,
           channelName:this.xzqudao.xx,
          })
          .then(response=>{
            console.log(response.data);
            this.crea();
             this.$refs[formName].resetFields();
              this.xinzhenqudao = false;
              ElMessage({
        showClose: true,
        message: '添加成功',
         type: 'success',
      })
          })
          .catch(function(error){
          console.log(error)
        })
    } else {
          console.log("error submit!!");
          return false;
        }
     });
    },
    dmquxiao(formName) {
     this.$refs[formName].resetFields();
      this.xinzhenqudao = false;
    },
    //修改渠道开关
    xgqdonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8088/TSM/updatechannel",{
            channelId:this.xgqudao.channelId,
            channelLoc:this.xgqudao.channelLoc,
           channelName:this.xgqudao.channelName,
          })
          .then(response=>{
            console.log(response.data);
             this.crea();
             this.$refs[formName].resetFields();
              this.xiugaiqudao = false;
               ElMessage({
        showClose: true,
        message: '修改成功',
         type: 'success',
               })
          }).catch(function(){
            console.log(error);
          })
         
    } else {
          console.log("error submit!!");
          return false;
        }
     });
    },
    xgqdquxiao(formName) {
     this.$refs[formName].resetFields();
      this.xiugaiqudao = false;
    },
  //渠道删除
  deletequdao(row){
    this.axios.post("http://localhost:8088/TSM/delectchannel",{
        channelId:row.channelId
    }).then((response) => {
					let _this = this;
					console.log(response.data)
					console.log("删除成功")
					_this.crea()
				}).catch(function(error) {
					console.log(error)
					console.log("删除失败")
				})
  },
     crea() {
    let _this=this;
    this.axios.get("http://localhost:8088/TSM/selectchannel",{
      params: _this.pageInfo
    })
    .then(response =>{
      console.log(response);
      this.qudaotable=response.data.records;
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
    this.axios.get("http://localhost:8088/TSM/selectchannel",{
      params: _this.pageInfo
    })
    .then(response =>{
      console.log(response);
      this.qudaotable=response.data.records;
      this.pageInfo.total=response.data.total
    })
    .catch(function(error){
       console.log(error);
    })
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>

</style>