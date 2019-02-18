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
        <el-input placeholder="请输入品牌名称" v-model="cateName"></el-input>
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
      cateName: '',
      queryCateObj: {
        page: 1,
        pageSize: 20
      },
      addFirstCataDialog: false
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable () {
      queryFirstCate(this.queryCateObj).then(res => {
        // console.log('-----')
        // console.log(res)
        if (res.status === 200) {
          this.firstCategoryData = res.data.rows
          this.totalCount = res.data.total
          this.lastIndex = res.data.rows.length
        }
      })
    },
    handleAdd () {
      this.addFirstCataDialog = true
    },
    handleSave () {
      this.addFirstCataDialog = false
      addFirstCate({ categoryName: this.cateName }).then(res => {
        console.log(this.cateName)
        if (res.status === 200) {
          console.log(res)
          this.initTable()
          this.cateName = ''
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
