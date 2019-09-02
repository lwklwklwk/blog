<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <i @click="dialogVisible=true" class="el-icon-plus"></i>
    <el-dialog title="新增文章" :visible.sync="dialogVisible" width="30%">
      <el-form  :rules="rules" ref="form" :model="form">
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/api"
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      dialogVisible: false,
      form: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "标题", trigger: "blur" }],
      }
    };
  },
  methods:{
    commit(e){
            const that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          api
            .createDoc({
              title: that.form.title
            })
            .then(res => {
              console.log(res);
              if (res.status === 0) {
                that.$message({ type: "success", message: "新增成功" });
                this.dialogVisible = false;
              }
            })
            .catch(err => {
              that.$message({ type: "error", message: err });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    api
      .getAllDoc()
      .then(e => {
        console.log(e);
        this.docList = e;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>