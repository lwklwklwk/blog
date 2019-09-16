<template>
  <div>
    <div style="width:491px;margin:0 auto;">
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column fixed prop="id" label="id" width="150"></el-table-column>
        <el-table-column prop="title" label="标题" width="120"></el-table-column>
        <el-table-column prop="lastTime" label="最后更改时间" width="120"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,'read')" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row,'edit')" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="add-button" @click="dialogVisible=true">
        <i class="el-icon-plus"></i>新增文章
      </el-button>
    </div>
    <el-dialog title="新增文章" :visible.sync="dialogVisible" width="30%">
      <el-form :rules="rules" ref="form" :model="form">
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
import api from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        title: ""
      },
      rules: {
        title: [{ required: true, message: "标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(row, type) {
      console.log(row);
      if (type === "read") {
        this.$router.push({
          path: `/client?id=${row.id}`
        });
      }

      if (type === "edit") {
        this.$router.push({
          path: `/admin/doc?id=${row.id}`
        });
      }
    },
    commit(e) {
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
                this.getDoc();
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
    },
    getDoc() {
      api
        .getAllDoc()
        .then(e => {
          console.log(e);
          this.tableData = e;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getDoc();
  }
};
</script>
<style scoped>
.add-button {
  float: right;
  margin-top: 20px;
}
</style>