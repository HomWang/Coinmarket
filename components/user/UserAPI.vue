<template>
  <section class="container" id="UserAPI">
        <section class="UserAPI-Title">API</section>
        <section class="UserAPI-Content">
            <section class="UserAPI-Content-Describe">
                <p>提示:</p>
                <p>创建API密钥可以让您借助第三方网站或移动应用使用kex的行情查询，实时交易等服务。请不要泄露您的API Key到任何公共场所，以免造成您的资产损失。每个
用户最多只能同时拥有1个密钥对，如有遗失或忘记密钥，请删除后重新申请。发起申请后，将有工作人员在1-2个工作日内进行审核，审核通过后方可使用。
仅VIP6用户可以申请API.。</p>
                <a href="#">查看API文档</a>
            </section>
            <section class="CreatePurpose">
                <span>创建用途 </span>
                <textarea name="创建用途" id="" cols="30" rows="10"></textarea>
            </section>
            <section class="MessageCode">
                <span>短信验证码 </span>
                <input type="text">
                <button type="button">获取验证码</button>
            </section>
            <section class="CreateButton">
                <button type="button">创建</button>
            </section>
            <section class="MyKey">
                <span>我的密钥 </span>
                <section class="MyKeyTabel">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="date" label="创建日期" width="250">
                        </el-table-column>
                        <el-table-column prop="name" label="API密钥访问(Access Key)">
                        </el-table-column>
                        <el-table-column prop="address" label="状态" width="150">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </section>
        </section>
  </section>
</template>

<script>

export default {
    name: "UserAPI",

    data() {
        return {
            tableData: [{
            date: '2016-05-02',
            name: 'asfdkaslfjas;kjfalkjijekf;awljfoiaw%ksjfsa&',
            address: '已使用'
            }, {
            date: '2016-05-04',
            name: 'asfdkaslfjas;kjfalkjijekf;awljfoiaw%ksjfsa&',
            address: '已使用'
            }, {
            date: '2016-05-01',
            name: 'asfdkaslfjas;kjfalkjijekf;awljfoiaw%ksjfsa&',
            address: '已使用'
            }, {
            date: '2016-05-03',
            name: 'asfdkaslfjas;kjfalkjijekf;awljfoiaw%ksjfsa&',
            address: '已使用'
            }]
        }
    },

    mounted(){
    },
    methods: {    
    }
}
</script>

<style>
    .el-table td, .el-table th{
        padding: 0;
    }
    #UserAPI{
        width: 100%;
        padding: 30px;
        background-color: #ffffff;
    }
    .UserAPI-Title{
        font-size: 22px;
        border-bottom: 1px solid #000;
        padding-left: 30px;
        padding-bottom: 22px;
    }
    .UserAPI-Content-Describe{
        padding-top: 22px;
    }
    .UserAPI-Content-Describe>a{
        text-decoration: underline;
    }
    .CreatePurpose{
        padding-top: 50px;
    }
    .MessageCode, .CreateButton, .MyKey{
        padding: 20px 0;
        position: relative;
        overflow: hidden;
    }
    .CreatePurpose>span, .MessageCode>span, .MyKey>span{
        float: left;
        margin-right: 0.5%;
        max-width: 8%;
        width: 70px;
        text-align: right;
    }
    .CreatePurpose>textarea{
        width: 450px;
        height: 90px;
    }
    .CreateButton>button{
        margin-left: 80px;
    }
    .MyKeyTabel{
        width: 91.5%;
        border: 1px solid #000;
        float: left;
    }
</style>
