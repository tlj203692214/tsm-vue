<template>
  <el-cascader  :props="props"  v-model="sss"/>
   <el-cascader :props="propss"  />
   {{sss}}
</template>

<script lang="ts" setup>
let id = 0
const propss = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
   
      const nodes = Array.from({ length: level + 1 }).map((item) => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: false,
      }))
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes)
    
  },
}
</script>
<script lang="ts">
	export default{
		data(){
			return{
				props:{
					checkStrictly: true,
					lazy: true,
					lazyLoad: this.getCheckedNodes,
				},
			  sss:"",
			  sz:{
				  value:"0",
				  label:"所有部门",
			  },
				staffId:1,
			}
		},
		methods:{
		
			selectDept(){ //通过员工id查询所属部门
				
							
				this.axios.post("http://localhost:8088/TSM/dept/selectDeptjl/"+this.staffId)
				  .then(res=>{
						console.log(res)
					console.log(res.data)
					
						
				})
			},
			getCheckedNodes(node,resolve){
	
				const {data,level} = node;
		
		if(level===0){
			
					  
					const nodes =  Array.from({ length: 1 }).map((item) =>{
						return{
							value:"0",
							label:"所有部门",
							leaf:false,
							
						};
						
					});
						resolve(nodes);
						
						
				
		}else{
			this.axios.post("http://localhost:8088/TSM/dept/selectDeptsl/"+node.value)
				  .then(response=>{
					  
					
				this.axios.post("http://localhost:8088/TSM/dept/selectDeptjl/"+node.value)
					  .then(res=>{
						  
						const nodes = (res.data).map((item) =>{
							return{
								value:item.deptId,
								label:item.deptName,
								leaf:false,
								
							};
							
						});
							resolve(nodes);
							
							
					});
					
				});
				}
			},
			
			
		 },
		created(){
			this.selectDept()
		}
	}
</script>