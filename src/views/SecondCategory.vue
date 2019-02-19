<template>
    <div class="secondCategroy">
       <el-card class="box-card">
          <el-button type="primary" @click="addbrand">添加品牌</el-button>
        <el-table
            border
            stripe
            height="550px"
            ref="multipleTable"
            :data="secondCategoryData"
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
            label="品牌编号">
            </el-table-column>
            <el-table-column
            align="center"
            prop="brandName"
            label="品牌名称">
            </el-table-column>
            <el-table-column
            align="center"
            prop="brandLogo"
            label="品牌logo">
            <template slot-scope="scope">
            <img  :src="'http://127.0.0.1:3000'+scope.row.brandLogo" alt="">
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="categoryName"
            label="所属分类">
            </el-table-column>
        </el-table>
       <div class="showCount">显示第 {{firstIndex}} 到第 {{lastIndex}} 条记录，总共 {{totalCount}} 条记录</div>
     </el-card>
     <el-dialog
        title="添加品牌"
        :visible.sync="addSecondCataDialog"
        width="30%">
            <div class="selectCate">请选择分类：
               <el-select v-model="selectedValue">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
            <el-input placeholder="请输入分类名称" v-model="CateName"></el-input>
              <el-upload class="upload"
              action="http://127.0.0.1:3000/category/addSecondCategoryPic"
              name="pic1"
              :show-file-list="false"
              with-credentials
              :on-success="uploadImg"
              >
              <el-button size="small" type="info">请选择上传文件</el-button>
              <div class="imgView"><img src="" alt=""></div>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addSecondCataDialog = false">关闭</el-button>
                <el-button type="primary" @click="addSecondCataDialog = false">保存</el-button>
              </span>
        </el-dialog>
   </div>
</template>
<script>
import { querySecondCate, queryFirstCate } from '@/api'
export default {
  data () {
    return {
      secondCategoryData: [],
      multipleSelection: [],
      totalCount: 0,
      firstIndex: 1,
      lastIndex: '',
      addSecondCataDialog: false,
      queryCateObj: {
        page: 1,
        pageSize: 20
      },
      options: [],
      selectedValue: '',
      CateName: ''
    }
  },
  created () {
    this.initTable()
    this.querySelectValue()
  },
  methods: {
    initTable () {
      querySecondCate(this.queryCateObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.secondCategoryData = res.data.rows
          this.lastIndex = res.data.rows.length
          this.totalCount = res.data.total
        }
      })
    },
    querySelectValue () {
      queryFirstCate(this.queryCateObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.options = res.data.rows
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    addbrand () {
      this.addSecondCataDialog = true
    },
    uploadImg(response, file, fileList){
      console.log(response)
      if(res.data.success){
console.log(1)
      }  
      
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
.selectCate{
  padding: 10px 0;
}
 .box-card {
    // width: 480px;
    width: auto;
  }
  .upload{
    margin-top: 10px;
  }
    .imgView{
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
    }
</style>
