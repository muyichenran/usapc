<template>
	<div class="loginSign">
		<el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
		  <el-tab-pane label="登陆" name="login">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				账号
		  			</td>
		  			<td>
		  				<el-input  placeholder="请输入内容"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				密码
		  			</td>
		  			<td>
		  				<el-input type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
		  	</table>
		  	<el-button @click="goLogin()" class="go-login" type="primary">登录</el-button>
		  </el-tab-pane>
		  <el-tab-pane label="注册" name="sign">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				账号
		  			</td>
		  			<td>
		  				<el-input  placeholder="请输入内容"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				密码
		  			</td>
		  			<td>
		  				<el-input type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				确认密码
		  			</td>
		  			<td>
		  				<el-input type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				验证码
		  			</td>
		  			<td>
		  				<el-input type="password"  placeholder="请输入验证码"></el-input>
		  			</td>
		  		</tr>
		  	</table>
		  	<el-button @click="goSign()" class="go-sign" type="primary">注册</el-button>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	    	activeName:'login'
	    }
	},
    methods:{
	  	handleClick(tab, event) {
	        console.log(tab, event);
	  	},
	  	goLogin:function(){
	  		var url='http://luxma.helpyoulove.com/supplier/get/list';
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            this.supplierList=response.data.data;
	        }, response => {
	        });
	  	},
	  	goSign:function(){
	  		
	  	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/mixin.scss";
.loginSign{
	width: 420px;
	background: #FFFFFF;
	margin: 40px auto;
	.el-tabs__nav{
		width: 100%;
	}
	table{
		width: 350px;
		td{
			padding: 10px;
		}
		.td-title{
			color:$hui;
			font-size: 16px;
		}
	}
	.go-login,.go-sign{
		width: 60%;
		display: block;
		margin: 20px auto 0;
	}
}

</style>
