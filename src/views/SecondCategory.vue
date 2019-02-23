<template>
    <div class="secondCategroy">
       <el-card class="box-card">
          <el-button type="primary" @click="handleAddbrand">添加品牌</el-button>
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
         <el-dialog title="添加品牌" :visible.sync="addDialogFormVisible">
          <el-form :model="addFormData" :rules="myrules" ref = "addRef">
             <el-form-item label="请选择分类：" prop = "categoryId">
              <el-select v-model.number="addFormData.categoryId" placeholder="">
                <el-option
                v-for = "item in cateList"
                :key = "item.id"
                :label = "item.categoryName"
                :value = "item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  prop = "brandName" >
              <el-input v-model="addFormData.brandName" autocomplete="off" placeholder = "请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item  prop = "brandLogo" >
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1:3000/category/addSecondCategoryPic"
                :show-file-list = "false"
                :on-success = "uploadImg"
                name = "pic1"
                with-credentials>
                <el-button type="info" plain size = "small">请选择上传文件</el-button>
                <div class="brandImg">
                  <img :src="addFormData.brandLogo ===''? '' : 'http://127.0.0.1:3000/'+ addFormData.brandLogo" alt="" ref = "imgPre">
                </div>
              </el-upload>

            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </el-dialog>
   </div>
</template>
<script>
import { querySecondCate, queryFirstCate, addSecondCate } from '@/api'
export default {
  data () {
    return {
      secondCategoryData: [],
      multipleSelection: [],
      totalCount: 0,
      firstIndex: 1,
      lastIndex: '',
      addDialogFormVisible: false,
      queryCateObj: {
        page: 1,
        pageSize: 20
      },
      addFormData: {
        categoryId: '',
        brandName: '',
        brandLogo: '',
        hot: 1
      },
      cateList: [],
      myrules: {
        brandName: [
          { required: true, message: '请输入品牌名', triggle: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择分类' },
          { type: 'number', message: '分类不能为空' }
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      querySecondCate(this.queryCateObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.secondCategoryData = res.data.rows
          this.lastIndex = res.data.rows.length
          this.totalCount = res.data.total
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleAddbrand () {
      this.addDialogFormVisible = true
      queryFirstCate(this.queryCateObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.cateList = res.data.rows
        }
      })
      this.$nextTick(() => {
        this.$refs.addRef.clearValidate()
      })
    },
    handleSave () {
      this.$refs.addRef.validate(isPass => {
        if (isPass) {
          addSecondCate(this.addFormData).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.addDialogFormVisible = false
              this.$message.success('添加成功')
              this.initData()
              this.addFormData = {
                categoryId: '',
                brandName: '',
                brandLogo: '',
                hot: 1
              }
            } else {
              this.$message.error('添加失败')
            }
          })
        } else {
          this.$message.error('请提交完整的信息')
        }
      })
    },
    uploadImg (res, file, fileList) {
      if (res.picAddr) {
        this.addFormData.brandLogo = res.picAddr
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
 .box-card {
    // width: 480px;
    width: auto;
  }
  .upload{
    margin-top: 10px;
  }
    .brandImg{
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
</style>
