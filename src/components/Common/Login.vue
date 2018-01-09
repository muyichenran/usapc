<template>
	<div class="loginSign">
		<el-tabs type="border-card" v-model="activeName">
		  <el-tab-pane label="登陆" name="login">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				账号
		  			</td>
		  			<td>
		  				<el-input v-model="login.username" placeholder="请输入内容"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				密码
		  			</td>
		  			<td>
		  				<el-input v-model="login.password" type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
		  	</table>
		  	<el-button @click="goLogin()" class="go-login" type="primary">登录</el-button>
		  </el-tab-pane>
		  <el-tab-pane label="注册" name="sign">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				登录账号
		  			</td>
		  			<td>
		  				<el-input v-model="sign.username"  placeholder="请输入内容"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				密码
		  			</td>
		  			<td>
		  				<el-input v-model="sign.password" type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				确认密码
		  			</td>
		  			<td>
		  				<el-input v-model="sign.password2" type="password"  placeholder="请输入密码"></el-input>
		  			</td>
		  		</tr>
				<tr>
		  			<td align="right" width="100" class="td-title">
		  				昵称
		  			</td>
		  			<td>
		  				<el-input v-model="sign.name"  placeholder="请输入内容"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				验证码
		  			</td>
		  			<td>
		  				<el-input v-model="sign.registerCode"   placeholder="请输入验证码"></el-input>
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
	    	activeName:this.$route.query.active||'login',
			login:{},
			sign:{},
	    }
	},
	watch:{
	},
    methods:{
	  	goLogin:function(){
	  		var url='http://luxma.helpyoulove.com/user/login';
	        var vm=this;
	        this.$http.post(url,vm.login).then(response => {   
	            if(response.data.status==200){
					this.$cookie.set('userLogin',true)
					this.$store.state.userLogin=true;
					this.$message.success('登录成功，正在跳转……');
					var vm=this;
					this.sign={};
					setTimeout(() => {
						vm.$router.push({path:'/Index'})
					}, 1000);
					
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
	  	},
	  	goSign:function(){
			if(this.sign.username==''||this.sign.password==''||this.sign.username==null||this.sign.password==null||this.sign.name==null){
				this.$message.error('用户名、密码、昵称不得为空');
				return false;
			}
			if(this.sign.password!=this.sign.password2){
				this.$message.error('两次密码不一致');
				return false;
			}  
			if(this.sign.registerCode==''){
				this.$message.error('邀请码不得为空');
				return false;
			}
	  		var url='http://luxma.helpyoulove.com/user/register?'+this.sign.registerCode;
	        var vm=this;
	        this.$http.post(url,vm.sign).then(response => {   
	            if(response.data.status==200){
					this.$message.success('注册成功，请登录！');
					var vm=this;
					this.sign={};
					setTimeout(() => {
						vm.activeName='login'
					}, 1000);
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
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
	margin: 40px auto 40px;
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
