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
        <p :class="data.isSelected ? 'is-selected' : ''" @click="addnotepad()">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>

        <span v-for="NotepadData in NotepadData">
          <span
            v-if="NotepadData.beginTime == data.day"
            style="color: blue; text-decoration: underline"
            @click="updatenotepad(NotepadData)"
            >{{ NotepadData.notepadTheme[0] + "..." }}</span
          >&nbsp;
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
      weekbegin: "",
      weekend: "",
      staffId: sessionStorage.getItem("staffId"),
      NotepadData: [],
      locale: zhCn,
    };
  },
  methods: {
    addnotepad() {
      //新增记事本
      this.$router.push("/addnotepad");
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
    },
    selectNotepad() {
      //查询记事本
      this.axios
        .get("http://localhost:8088/TSM/notepad/selectNotepad/" + this.staffId)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.NotepadData = res.data;
        });
    },
  },
  created() {
    // var date2 = new Date(this.value)
    // date2.setDate(this.value.getDate()+7)
    // var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate()
    // this.value=time2,
    this.selectNotepad();
  },
};
</script>
<style>
.is-selected {
  color: #1989fa;
}
</style>
