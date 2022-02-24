<template>
  <el-config-provider :locale="locale">
    <el-calendar ref="calendar" v-model="value">
      <template #header="{ date }">
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="Select date and time"
        >
        </el-date-picker>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="mini" @click="selectDate('prev-year')"
            >上一年</el-button
          >
          <el-button size="mini" @click="selectDate('prev-month')"
            >上一月</el-button
          >
          <el-button size="mini" @click="selectDate('today')"
            >回到今日</el-button
          >
          <el-button size="mini" @click="selectDate('next-month')"
            >下一月</el-button
          >
          <el-button size="mini" @click="selectDate('next-year')"
            >下一年</el-button
          >
        </el-button-group>
      </template>
      <template #dateCell="{ data }">
		  <span v-if="this.newDate>data.day">
		  <p :class="data.isSelected ? 'is-selected' : ''">
		    {{ data.day.split("-").slice(1).join("-") }}
		    {{ data.isSelected ? "✔️" : "" }}
		  </p>
		  </span>
		 <span v-else>
			<p :class="data.isSelected ? 'is-selected' : ''" @click="addnotepad(data.day)">
			  {{ data.day.split("-").slice(1).join("-") }}
			  {{ data.isSelected ? "✔️" : "" }}
			</p>
		 </span>
       
        <span v-for="NotepadData in NotepadData">
			<span v-if="NotepadData.beginTime <= data.day && data.day<=NotepadData.endTime">
          <span
            v-if="NotepadData.notepadState==0 &&NotepadData.endTime<this.newDate"
            style="color:red; text-decoration: underline"
            @click="updatenotepad(NotepadData)"
            >{{ NotepadData.notepadTheme + "..." }}&nbsp;
			</span>
		  <span  v-else-if="NotepadData.notepadState==0 &&NotepadData.endTime>=this.newDate"
            style="color:orange; text-decoration: underline"
            @click="updatenotepad(NotepadData)">{{ NotepadData.notepadTheme+ "..." }}&nbsp;
		  </span>
		  <span v-else style="color:green; text-decoration: underline"
            @click="updatenotepad(NotepadData)">{{ NotepadData.notepadTheme + "..." }}&nbsp;	  
		  </span>
		 </span>
        </span>
      </template>
    </el-calendar>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  components: {
    ElConfigProvider,
  },
  setup() {
    const value = ref(new Date());
    const calendar = ref();
    const selectDate = (val: string) => {
      calendar.value.selectDate(val);
    };
    return {
      calendar,
      selectDate,
      value,
    };
  },
  data() {
    return {
		newDate:"",
      weekbegin: "",
      weekend: "",
      staffId: sessionStorage.getItem("staffId"),
      NotepadData: [],
      locale: zhCn,
    };
  },
  methods: {
    addnotepad(data) {
      //新增记事本
	
      this.$router.push("/addnotepad");
	  sessionStorage.setItem("beginTime",data);
	  sessionStorage.setItem("notepadState",0); //新建记事本默认未完成
      sessionStorage.setItem("notepad", "add"); //参数（区别修改和新增）
    },
    updatenotepad(notepad) {
      //修改记事本
      // sessionStorage.setItem("zzz",JSON.stringify(notepad))  存数组转json格式
      // JSON.parse(sessionStorage.getItem("zzz"))   得到json数据

      this.$router.push("/addnotepad");
      sessionStorage.setItem("notepad", "update"); //参数（区别修改和新增）
      sessionStorage.setItem("notepadTheme", notepad.notepadTheme); //记事本主题
      sessionStorage.setItem("notepadType", notepad.notepadType); //记事本类型
      sessionStorage.setItem("beginTime", notepad.beginTime); //记事本开始时间
      sessionStorage.setItem("endTime", notepad.endTime); //记事本结束时间
      sessionStorage.setItem("notepadPlace", notepad.notepadPlace); //记事本地点
      sessionStorage.setItem("notepadContent", notepad.notepadContent); //记事本内容
      sessionStorage.setItem("notepadId", notepad.notepadId); //记事本id
	   sessionStorage.setItem("notepadState",notepad.notepadState); //记事本状态
    },
    selectNotepad() {
      //查询记事本
      this.axios
        .get("http://localhost:8088/TSM/notepad/selectNotepad/" + this.staffId)
        .then((res) => {
          console.log(res);
          console.log(res.data[0].beginTime + "sssssssssssssss");
          this.NotepadData = res.data;
        });
    },
  },
  created() {
 var date = new Date()
       var year = date.getFullYear()
       var month = date.getMonth() + 1 < 10 ? 
                     '0' + (date.getMonth() + 1) : date.getMonth()+ 1
       var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  this.newDate=year + '-' +month + '-' + day;
    this.selectNotepad();
  },
};
</script>
<style>
.is-selected {
  color: #1989fa;
}
</style>
