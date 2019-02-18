<template>
  <div class="users">
    <el-card class="box-card">
    <el-table
        border
        height="550px"
        ref="multipleTable"
        :data="usersData"
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
        prop="username"
        label="用户名">
        </el-table-column>
        <el-table-column
        align="center"
        prop="mobile"
        label="电话">
        </el-table-column>
        <el-table-column
        align="center"
        prop=""
        label="状态"
        show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.isDelete | filterState}}</template>
        </el-table-column>
        <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
            <el-button
            size="mini"
            :type="scope.row.isDelete?'danger':'success'"
            @click="handleChange(scope.row)">
            {{scope.row.isDelete?'禁用':'启用'}}
            </el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="showCount">显示第 {{firstIndex}} 到第 {{lastIndex}} 条记录，总共 {{totalCount}} 条记录</div>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import { queryUser, updateUser } from '@/api'
export default {
  data () {
    return {
      usersData: [],
      multipleSelection: [],
      queryObj: {
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      firstIndex: 1,
      lastIndex: ''

    }
  },
  created () {
    // 初始化用户列表
    this.initTable()
  },
  methods: {
    initTable () {
      queryUser(this.queryObj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.usersData = res.data.rows
          this.totalCount = res.data.rows.length
          this.lastIndex = res.data.total
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },
    // 改变用户状态
    handleChange (row) {
      // console.log(row)
      // 发请求修改状态
      updateUser({ id: row.id, isDelete: row.isDelete ? 0 : 1 }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.initTable()
        }
      })
    }
  },
  filters: {
    filterState (value) {
      // return value === 1 ? '已启用' : '已禁用'
      return value ? '已启用' : '已禁用'
    }
  }
}
</script>
<style lang="scss" scope>
.showCount{
    padding-top: 20px;
}
</style>
