<template>
  <div class="manage">
    <el-card class="box-card">
        <el-button type="primary" @click="handleAdd">添加商品</el-button>
       <el-table
        border
        ref="multipleTable"
        :data="brandData"
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
        prop="brandId"
        label="商品编号"
        width="100px">
        </el-table-column>
        <el-table-column
        align="center"
        prop="proName"
        label="商品名称"
        >
        </el-table-column>
        <el-table-column
        align="center"
        prop="proDesc"
        label="商品描述"
        width="200px"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        align="center"
        prop="num"
        label="商品库存"
        width="100px"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        align="center"
        prop="size"
        label="商品尺寸"
        width="100px"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        align="center"
        prop=""
        label="是否下架"
        show-overflow-tooltip
        width="200px">已上商品
        </el-table-column>
        <el-table-column
        label="操作"
        width="160px"
        align="center">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handleChange(scope.$index, scope.row)">下架
            </el-button>
        </template>
        </el-table-column>
      </el-table>
       <div class="showCount">显示第 {{firstIndex}} 到第 {{lastIndex}} 条记录，总共 {{totalCount}} 条记录</div>
   </el-card>
   <el-dialog
        title="添加分类"
        :visible.sync="addProCataDialog"
        width="30%">
        <div class="selectBrand">请选择品牌：
        <el-select v-model="selectedValue" placeholder="请选择">
            <el-option
              v-for="item in selectoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </div>
        <el-form ref="form" :model="proForm">
        <el-input placeholder="请输入产品名称" v-model="proForm.proName"></el-input>
        <el-input placeholder="请输入产品描述" v-model="proForm.proDesc"></el-input>
        <el-input placeholder="请输入产品数量" v-model="proForm.proNum"></el-input>
        <el-input placeholder="请输入产品尺寸如20-39" v-model="proForm.proSize"></el-input>
        <el-input placeholder="请输入商品价格" v-model="proForm.proPrice"></el-input>
        <el-input placeholder="请输入商品折扣价" v-model="proForm.proDiscount"></el-input>
        </el-form>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <!-- <el-button type="info">请选择需要上传的图片</el-button><span>**请选择三张图片</span> -->
        <i class="el-icon-plus"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addProCataDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleSave">保存商品</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { queryProductData } from '@/api'
export default {
  data () {
    return {
      brandData: [],
      multipleSelection: [],
      totalCount: 0,
      firstIndex: 1,
      lastIndex: '',
      queryObj: {
        page: '1',
        pageSize: '5'
      },
      addProCataDialog: false,
      selectedValue: '',
      selectoptions: [],
      proForm: {
        proName: '',
        proDesc: '',
        proNum: '',
        proSize: '',
        proPrice: '',
        proDiscount: ''
      }

    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable () {
      queryProductData(this.queryObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.brandData = res.data.rows
          this.totalCount = res.data.total
          this.lastIndex = res.data.rows.length
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleChange (row) {
      console.log('handleDelete')
      // console.log(row)
    },
    handleAdd () {
      this.addProCataDialog = true
    },
    handleSave (row) {
      console.log('handleDelete')
      // console.log(row)
    },
    handlePictureCardPreview () {
      console.log('handlePictureCardPreview')
    },
    handleRemove () {
      console.log('handleRemove')
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
    .el-form{
      .el-input__inner{
        margin: 10px 0px;
      }
    }
</style>
