<template>
		<div>
			  <div class="usa-header">
                    <div class="usa-h-center center1200 clearfix">
                        <div class="web-name">公司名称</div>							
                        <div class="usa-h-right">
                            <div class="sign-login">
                                <router-link :to="{path:'/Login',query:{active:'login'}}" title="登陆">登陆</router-link>
                                <router-link :to="{path:'/Login',query:{active:'sign'}}" title="注册">注册</router-link>
                            </div>
                            <div class="our-order">
                                <a title="我的订单">我的订单</a>
                            </div>
                        </div>
                    </div>			
				</div>
				<div class="usa-meau">
						<div class="center1200">
							<ul class="meau-list">
								<li class="meau-list-item">
									<a>首页</a>
								</li>
								<li v-for="(item,index) in catList" class="meau-list-item">
									<a>{{item.title}}</a>
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
        }
    },
    methods:{
        bodyReady:function(){
            var url='http://luxma.helpyoulove.com/pc/item/cat/get/list';
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
					this.catList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
            
        }
    },
    created(){
    	this.bodyReady();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
		.usa-header{
    width: 100%;
    min-width: 1200px;
//  position: fixed;
//  top: 0;
//  left: 0;
    height: 40px;
    line-height: 40px;
    background-color: #000;
    
    z-index: 10;
    .usa-h-center{
        font-size: 16px;
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
                        top: 13px;
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
                display: block;
                &:before{
                    position: absolute;
                    display: block;
                    top: 0;
                    width: 100%;
                    height: 2px;
                }
                &:hover::before{                       
                    background:#b4a078;                       
                }
            }
        }
    }
}

</style>
