<template>
		<div class="top-fix">
			  <div class="usa-header">
                    <div class="usa-h-center center1200 clearfix">
                        <div class="web-name">Romon</div>							
                        <div class="usa-h-right">
                            <div v-if="!login" class="sign-login">
                                <router-link :to="{path:'/Login',query:{active:'login'}}" title="Login/Register">Login/Register</router-link>
                                <!-- <router-link :to="{path:'/Login',query:{active:'sign'}}" title="注册">注册</router-link> -->
                            </div>
                            <div v-if="login" class="sign-login">
                                <a href="javascript:;" title="userInfo.name">{{userInfo.name}}</a>
                                <a @click="exit()" href="javascript:;"  title="Exit">Exit</a>
                            </div>
                            <div v-if="login" class="our-order">
                                <router-link :to="{path:'/orderHistory'}" title="My orders">My orders</router-link>
                                <router-link :to="{path:'/shoppingCart'}" style="position:relative" title="Shopping cart"><i style="padding-right:5px;font-size:18px;vertical-align: middle;" class="iconfont">&#xe60a;</i>Shopping cart<span v-if="cartGoods&&cartGoods.length!=0" v-html="cartGoods.length" class="good-length"></span></router-link>
                            </div>
                        </div>
                    </div>			
				</div>
				<div v-if="login" class="usa-meau">
						<div class="center1200">
							<ul class="meau-list">
								<li class="meau-list-item">
									<router-link :to="{path:'/Index'}">Index</router-link>
								</li>
                                <li class="meau-list-item supplier-show">
									<a href="javascript:;" v-bind:class="{ active: supId }">
                                        Vendor
                                        <div class="supplier-blcok">
                                            <div class="supplier-center">
                                                <ul class="clearfix">
                                                    <li v-for="(item,index) in supList">
                                                        <router-link :to="{path:'/goodsList',query:{supId:item.supplierId}}">
                                                            <img :src="item.picUrl">
                                                            <p>{{item.name}}</p>
                                                        </router-link>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </a>
								</li>
								<li v-for="(item,index) in catList" class="meau-list-item">
									<router-link :to="{path:'/goodsList',query:{catId:item.catId}}">{{item.title}}</router-link>
								</li>
							</ul>
						</div>
				</div>
		</div>
</template>

<script>
export default {
    data () {
        return {
            catList:[],
            supList:[],
            active:false,
            userInfo:{},
        }
    },
    computed:{
        supId(){
            return this.$route.query.supId;
        },
        cartGoods () {
            return this.$store.state.orderList;
        },
        login(){
            return this.$store.state.userLogin;
        }
    },
    watch:{
        '$route' (to, from) {
            if(to.path=='/goodsList'){
              if(to.query.supId){
                  this.active=true;
              }
            }
        },
        login(){
            if(this.login){
                this.bodyReady();
                this.supReady();
                this.findUser()
            }
        }
    },
    methods:{
        exit(){
            var url='http://ws.luxtonusa.com/user/logout';
	        var vm=this;
	        this.$http.post(url).then(response => {
	            if(response.data.status==432){
                    this.$message.error("Your login has been expired, please re-login！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        },
        bodyReady:function(){
            var url='http://ws.luxtonusa.com/pc/item/cat/get/list';
	        var vm=this;
	        this.$http.post(url).then(response => {   
                if(response.data.status==432){
                    this.$message.error("Your login has been expired, please re-login！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else if(response.data.status==200){
					this.catList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
            
        },
        supReady:function(){
            var url='http://ws.luxtonusa.com/pc/supplier/get/list';
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
					this.supList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
            
        },
        findUser(){
            var url='http://ws.luxtonusa.com/user/getUserInfo';
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
					this.userInfo=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        }
    },
    created(){
        if(this.login){
            this.bodyReady();
            this.supReady();
            this.findUser()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.top-fix{
    width: 100%;
    min-width: 1200px;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    z-index:10;
}
.usa-header{
    width: 100%;
    min-width: 1200px;
//  position: fixed;
//  top: 0;
//  left: 0;
    height: 60px;
    line-height: 60px;
    background-color: #000;
    
    z-index: 10;
    .usa-h-center{
        font-size: 18px;
        .web-name{
            float: left;
            position: relative;
            color: #666;
        }
        
        .usa-h-right{
            float: right;         
            .sign-login{
                float: left;
                position: relative;
                color: #666;
                cursor: pointer;
                a{
                    display: inline-block;
                    color: #666;
                    padding: 0 10px;
                    &:hover{
                        color: #fff;
                    }
                }
            }
            .our-order{
                float: left;
                color: #666;
                cursor: pointer;
                a{
                    display: inline-block;
                    position: relative;
                    color: #666;
                    padding: 0 10px;
                    &:before{
                        content: '';
                        display: inline-block;
                        position: absolute;
                        left: 0;
                        top: 22px;
                        height: 16px;
                        border-left: 1px solid #5c5c5c;
                        vertical-align: middle;
                    }
                    &:hover{
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
.good-length{
    padding: 0 3px;
    min-width: 14px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    font-size: 12px;
    background: #fe4343;
    color: #fff;
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 3px;
    right: -8px;
}
.usa-meau{
    width: 100%;
    min-width: 1200px;
    height: 60px;
    background:#fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.2);
    .meau-list{
        padding: 0 20px;
        .meau-list-item{
            float: left;
            box-sizing: border-box;
            display: inline-block;
            padding: 0 20px 0;
            &>a{
                line-height: 60px;
                color: #000000;
                font-size: 20px;
                font-weight: 700;
                position:relative; 
                padding: 5px 0;
                // display: block;
                &:hover{
                    color: #b4a078;
                    border-bottom: 3px solid #b4a078
                }
            }
            .router-link-exact-active{
                color: #b4a078;
                border-bottom: 3px solid #b4a078
            }
        }
    }
}


.supplier-blcok{
    position: fixed;
    display: none;
    left: 0;
    top: 100px;
    width: 100%;
    background: #ffffff;
    min-width: 1200px;
    box-shadow: 0 2px 6px rgba(0,0,0,.4);
    .supplier-center{
        margin: 0 auto;
        width: 1200px;
        padding:15px 60px;
        ul{
            margin-right: -80px;
            li{
                text-align: center;
                margin: 15px 0;
                margin-right: 80px;
                width: 100px;
                display: block;
                float: left;
                // padding: 0 10px;
                img{
                    width: 50px;
                    height: 50px;
                }
                p{
                    line-height: 1;
                    margin-top: 15px; 
                }
            }
        }
    }
}
.supplier-show{
    &:hover{
        .supplier-blcok{
            display: block;
        }
    }
}
.active{
    color: #b4a078!important;
    border-bottom: 3px solid #b4a078
}
.usa-header .router-link-active{
    color: #fff !important;
}
</style>
