<template>
	<div class="loginSign">
		<el-tabs type="border-card" v-model="activeName">
		  <el-tab-pane label="Login" name="login">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				Account
		  			</td>
		  			<td>
		  				<el-input v-model="login.username" placeholder="Please enter your account"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				Password
		  			</td>
		  			<td>
		  				<el-input v-model="login.password" type="password"  placeholder="Please enter password"></el-input>
		  			</td>
		  		</tr>
		  	</table>
		  	<el-button @click="goLogin()" class="go-login" type="primary">Login</el-button>
		  </el-tab-pane>
		  <el-tab-pane label="Register" name="sign">
		  	<table class="login">
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				Login account
		  			</td>
		  			<td>
		  				<el-input v-model="sign.username"  placeholder="Please enter your account"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				Password
		  			</td>
		  			<td>
		  				<el-input v-model="sign.password" type="password"  placeholder="Please enter password"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				Confirm password
		  			</td>
		  			<td>
		  				<el-input v-model="sign.password2" type="password"  placeholder="Please enter password"></el-input>
		  			</td>
		  		</tr>
				<tr>
		  			<td align="right" width="100" class="td-title">
		  				Nickname
		  			</td>
		  			<td>
		  				<el-input v-model="sign.name"  placeholder="Please enter nickname"></el-input>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td align="right" width="100" class="td-title">
		  				verification number
		  			</td>
		  			<td>
		  				<el-input v-model="sign.registerCode"   placeholder=" Please enter verification number "></el-input>
		  			</td>
		  		</tr>
		  	</table>
		  	<el-button @click="goSign()" class="go-sign" type="primary">Register</el-button>
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
	  		var url='http://ws.luxtonusa.com/user/login';
	        var vm=this;
	        this.$http.post(url,vm.login).then(response => {   
	            if(response.data.status==200){
					this.$cookie.set('userLogin',true)
					this.$store.state.userLogin=true;
					this.$message.success('You are login……');
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
				this.$message.error('user name, password and nickname must be entered');
				return false;
			}
			if(this.sign.password!=this.sign.password2){
				this.$message.error('Re-enter password doesn’t match original password');
				return false;
			}  
			if(this.sign.registerCode==''){
				this.$message.error('invitation code must be entered');
				return false;
			}
	  		var url='http://ws.luxtonusa.com/user/register?registerCode='+this.sign.registerCode;
	        var vm=this;
	        this.$http.post(url,vm.sign).then(response => {   
	            if(response.data.status==200){
					this.$message.success('Please Login');
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
