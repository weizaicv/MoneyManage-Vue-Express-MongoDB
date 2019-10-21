<template>
  <div class="fillcontain">
    <div>
        <el-form :inline="true" ref="search_data" :model="search_data">
            <el-form-item label="投标时间筛选：">
                <el-date-picker 
                    v-model="search_data.startTime"
                    type="datetime"
                    placeholder="选择开始时间"
                ></el-date-picker>
                <el-date-picker 
                    v-model="search_data.endTime" 
                    type="datetime" 
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
            </el-form-item>
            <el-form-item class="btnRight">
                <el-button
                    type="primary"
                    size="small"
                    icon="view"
                    @click="onAddMoney()"
                    v-if="user.identity =='manager'"
                >
                添加
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="onEditMoney(scope.row)"
              v-if="user.identity =='manager'"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              v-if="user.identity =='manager'"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>
<script>
import DialogFound from '../components/DialogFound';
export default {
    name:"foundlist",
    components:{DialogFound},
    data(){
        return {
            tableData:[],
            allTableData:[],
            filterTableData:[],
            search_data:{
                startTime: "",
                endTime: ""
            },
            //分页组件的信息
            paginations: {
                page_index:1,//当前页
                total:0,//总数
                page_size:5,//1页显示条数
                page_sizes:[5,10,15,20],//每页显示条数
                layout: "total, sizes, prev, pager, next, jumper"//翻页属性
            },
            form: {
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
        }
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    created(){
        this.getProfile();
    },
    methods: {
        getProfile(){
            //获取表格数据
            this.$axios.get("/api/profile")
            .then(res =>{
                this.allTableData = res.data;
                this.filterTableData = res.data;
                this.setPaginations();
                // console.log(res)
            })
        },
        setPaginations(){
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //分页用filter
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size; 
            })
        },
        //点击页
        //一次性全部获取了所有分页了！！！！
        handleCurrentChange(page){
            //找第四页数据，先找到大于第三页所有数据的数据
            let sortNum = this.paginations.page_size * (page-1);
            let  table = this.filterTableData.filter((item,index)=>{
                return index >= sortNum;
            })
            //只显示规定size个数
            this.tableData = table.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        onScreeoutMoney(){
            if(! this.search_data.startTime || ! this.search_data.endTime){
                this.$message({
                    type:'warning',
                    message:'选择时间'
                });
                this.getProfile();
                return;
            }
            let sTime = this.search_data.startTime.getTime();
            let eTime = this.search_data.endTime.getTime();
            this.allTableData = this.filterTableData.filter((item,index)=>{
                let date = new Date(item.date);
                let time = date.getTime();
                return time >= sTime && time <= eTime;
            })
            this.setPaginations();
        },
        onDeleteMoney(row,index){
            this.$axios.delete(`/api/profile/delete/${row._id}`)
            .then(res=>{
                this.$message("删除成功");
                this.getProfile();
            })
        },
        onAddMoney(){
            //添加
            this.dialog = {show:true,option:'add',title:"添加"};
            this.form = {
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            }
        },
        onEditMoney(row){
            //编辑
            this.dialog = {show:true,option:'edit',title:"编辑"};
            this.form = {
                type: row.type,
                describe: row.describe,
                income: row.income,
                expend: row.expend,
                cash: row.cash,
                remark: row.remark,
                id: row._id
            }
        },
        // 只能对当前页面排序 不能对整体数据排序
         sortByDate(obj1, obj2) {
            console.log(obj1)
            let val1 = new Date(obj1.date).getTime();
            let val2 = new Date(obj2.date).getTime();
            return val1 - val2
         }
    },

}
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>