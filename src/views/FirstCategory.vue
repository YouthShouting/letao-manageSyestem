<template>
    <div class="firstCategroy">
       <el-card class="box-card">
          <el-button type="primary" @click="handleAdd">添加分类</el-button>
            <el-table
                border
                height="550px"
                ref="multipleTable"
                :data="firstCategoryData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                align="center"
                width="55"
                type="selection">
                </el-table-column>
                <el-table-column
                align="center"
                prop="id"
                label="分类编号">
                </el-table-column>
                <el-table-column
                align="center"
                prop="categoryName"
                label="分类名称">
                </el-table-column>
            </el-table>
      <div class="showCount">显示第 {{firstIndex}} 到第 {{lastIndex}} 条记录，总共 {{totalCount}} 条记录</div>
     </el-card>
     <el-dialog
        title="添加分类"
        :visible.sync="addFirstCataDialog"
        width="30%">
         <el-form :model="addFormData" :rules="myrules" ref = "addRef">
            <el-form-item  prop = "cateName" >
              <el-input v-model="addFormData.cateName" autocomplete="off" placeholder = "请输入分类名称"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFirstCataDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </el-dialog>
   </div>
</template>
<script>
import { queryFirstCate, addFirstCate } from '@/api'
export default {
  data () {
    return {
      firstCategoryData: [],
      multipleSelection: [],
      totalCount: 0,
      firstIndex: 1,
      lastIndex: '',
      queryCateObj: {
        page: 1,
        pageSize: 100
      },
      addFirstCataDialog: false,
      addFormData: {
        cateName: ''
      },
      myrules: {
        cateName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable () {
      queryFirstCate(this.queryCateObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.firstCategoryData = res.data.rows
          this.totalCount = res.data.rows.length
          this.lastIndex = res.data.rows.length
        }
      })
    },
    handleAdd () {
      this.addFirstCataDialog = true
      this.addFormData.cateName = ''
      this.$nextTick(() => {
        this.$refs.addRef.clearValidate()
      })
    },
    handleSave () {
      this.$refs.addRef.validate(isPass => {
        if (isPass) {
          addFirstCate({ categoryName: this.addFormData.cateName }).then(res => {
            if (res.status === 200) {
              // console.log(res)
              this.initTable()
              this.$message.success('添加成功')
              this.addFirstCataDialog = false
            } else {
              this.$message.error('添加失败')
            }
          })
        } else {
          this.$message.error('请填写分类名称')
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    }
  }
}

</script>
<style lang="scss" scope>
.el-button{
    margin-bottom: 20px;
}
.el-dialog__header{
  border-bottom: 1px solid #ccc;
}
.el-dialog__body{
  padding: 20px;
}
.el-dialog__footer{
  border-top: 1px solid #ccc;
  padding-bottom: 0px;
  padding-top: 20px;
}
.showCount{
    padding-top: 20px;
}
 .box-card {
    // width: 480px;
    width: auto;
  }
</style>
