// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 请求携带cookie
axios.defaults.withCredentials = true
// 登录
export const login = (username, password) => axios.post('/employee/employeeLogin', {
  username: username,
  password: password
})
// 判断是否登录
export const checkRootLogin = () => axios.get('/employee/checkRootLogin')
// 退出
export const loginOut = () => axios.get('/employee/employeeLogout')
// 查找用户
export const queryUser = obj => axios.get('/user/queryUser', {
  params: obj
})
// 修改用户状态
export const updateUser = obj => axios.post('/user/updateUser', obj)
// 一级分类查询
export const queryFirstCate = obj => axios.get('/category/queryTopCategoryPaging', { params: obj })
// 一级分类新增
export const addFirstCate = obj => axios.post('/category/addTopCategory', obj)
// 二级分类查询
export const querySecondCate = obj => axios.get('/category/querySecondCategoryPaging', {
  params: obj
})
// 二级新增分类
export const addSecondCate = obj => axios.post('/category/addSecondCategory', obj)
// 商品管理列表
export const queryProductData = obj => axios.get('/product/queryProductDetailList', {
  params: obj
})
