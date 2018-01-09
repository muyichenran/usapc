<template>
	<div class="main-content">
		<!-- <div class="home-banner center1200 clearfix">
			<div class="item">
				<img src="./1.jpg" />
			</div>
			<div class="item">
				<img src="./1.jpg" />
			</div>
			<div class="item">
				<img src="./1.jpg" />
			</div>
			<div class="item">
				<img src="./1.jpg" />
			</div>
		</div>	 -->
		<div class="new-product" v-for="(item,index) in obj">
				<div class="center1200 clearfix">
					<div class="p-header">
						<h3 class="name">{{item.typeTitle}}</h3>
					</div>
					<div  class="product-list clearfix">
						<a v-for="(item1,index1) in item.advertList" @click="goGoodDetail(item1.itemId)" class="list-item" :title="item1.title">
                            <div class="img-div">
							    <img :src="item1.picUrl" />
                            </div>
							<div class="list-text">
								<div class="tags">
									<span>{{item1.itemRecommend}}</span>
								</div>
								<div class="name">
									<p>{{item1.title}}</p>
								</div>
								<p class="price">
									<span>${{item1.price}}</span>
									<span class="tagName" >Adidas制造商</span>
								</p>
							</div>
						</a>
					</div>
				</div>
			</div>
	</div>		
</template>

<script>
export default {
	data () {
		return {
			obj:{}
		}
	},
  	watch:{
	},	
	methods:{
        goGoodDetail:function(e){
            this.$router.push({path:'/GoodsDetail',query:{Id:e}})
        },
		bodyReady(){
	  		var url='http://luxma.helpyoulove.com/pc/advert/getAll';
	        var vm=this;
	        this.$http.post(url).then(response => {   
				if(response.data.status==432){
					this.$message.error("登录过期，请重新登录！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.obj=response.data.data;
					
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
		}
	},
	created(){
		this.bodyReady()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-content{
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    .home-banner{
        padding: 20px 0;
        &>.item{
            width: 285px;
            height:285px;
            float: left;
            border: 1px solid #e5e5e5;
            overflow: hidden;
            margin-right: 20px;
            img{
                width: 100%;
                -webkit-transition: -webkit-transform 1s;
                -moz-transition: -moz-transform 1s;
                -o-transition: -o-transform 1s;
                transition: transform 1s
            }
            &:hover img{
                -webkit-transform: scale(1.05);
                -moz-transform: scale(1.05);
                -ms-transform: scale(1.05);
                -o-transform: scale(1.05);
                transform: scale(1.05);
                
            }
        }
        &>.item:last-child{
            margin-right: 0;
        }
    }
    .new-product{
        width: 100%;
        min-width: 1200px;
        padding: 30px 0;
        background: #f4f0ea;
        &:nth-child(odd)
        {
            background:#ffffff;
            .list-item{
                background: #f4f0ea;
            }
        }
        &:nth-child(even)
        {
            background:#f4f0ea;
            .list-item{
                background: #fff;
            }
        }
        .p-header{
            padding-bottom: 20px;
            .name{
                font-size: 24px;
                font-weight: 700;
                line-height: 1;
            }
        }
        .product-list{
            .img-div{
                width: 100%;
                height: 224px;
                overflow: hidden;
            }
            .list-item{
                float: left;
                margin-bottom: 20px;
                width: 224px;
                margin-right: 20px;
                border-radius: 3px;
                display: block;
                cursor: pointer;
                
                &:nth-child(5n+0){
                    margin-right: 0;
                }
                &:hover img{
                    -webkit-transform: scale(1.05);
                   -moz-transform: scale(1.05);
                    -ms-transform: scale(1.05);
                    -o-transform: scale(1.05);
                    transform: scale(1.05);
                }
                img{
                    width: 100%;
					height: 224px;
                    -webkit-transition: -webkit-transform 1s;
                    -moz-transition: -moz-transform 1s;
                    -o-transition: -o-transform 1s;
                    transition: transform 1s
                }
                .list-text{
                    padding: 10px 0;
                    border-top: 1px solid #b3a07d;
                }
                .tags{
                    height: 20px;
                    font-size: 0;
                    color: #fff;
                    width: 200px;
                    margin: 0 auto 3px;
                    text-align: center;
                    overflow: hidden;
                    span{
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: #fff;
                        padding: 0 5px;
                        font-size: 12px;
                        background-color: #F28F2D;
                    }
                }
                .name{
                    display: block;
                    margin-bottom: 4px;
                    font-weight: bold;
                    height: 28px;
                    font-size: 16px;
                    line-height: 28px;
                    padding: 0 10px;
                    color: #333;
                    p{
                        overflow: hidden;
                        white-space: nowrap;
                        -ms-text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                    }
                }
                .price{
                    font-size: 14px;
                    line-height: 18px;
                    color: #d4282d;
                    padding: 1px 0 9px;
                    margin: 0;
                    text-align: center;
                    padding: 1px 0 9px;
                    .tagName {
                        background: 0 0;
                        border-left: 1px solid #999;
                        padding-left: 10px;
                        margin-left: 7px;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>
