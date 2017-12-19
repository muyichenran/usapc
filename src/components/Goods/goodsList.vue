<template>
    <div class="goods">
        <div class="m-sortbar">
            <div class="sortbar-item clearfix">
                <span class="name">风格：</span>      
                <div class="item-list">
                    <a class="active" href="javascript:;">全部</a>
                    <a v-for="(item,index) in searchValueList" href="javascript:;">{{item.name}}</a>
                </div>  
            </div>
            <!-- <div class="sortbar-item clearfix">
                <span class="name">品牌：</span>      
                <div class="item-list">
                    <a class="active" href="javascript:;">全部</a>
                    <a v-for="(item,index) in supplierList" href="javascript:;">{{item.name}}</a>
                </div>  
            </div> -->
            <div class="sortbar-item clearfix">
                <span class="name">排序：</span>      
                <div class="item-list">
                    <a>默认</a>
                    <a>价格
                        <span class="icon">
                            <i class="i-a iconfont">&#xe622;</i>
                            <i class="i-b iconfont">&#xe62c;</i>
                        </span>
                        
                    </a>
                    <a>上架时间<i class="iconfont v-middle">&#xe767;</i></a>
                </div>  
            </div>
        </div>
        <div class="goods-list">
            <ul class="ul-goods-list clearfix">
                <li v-for="(item,index) in goodList" class="item">
                    <div @click="goGoodDetail(item.itemId)" class="item-product">
                        <div class="hd-top">
                            <img :src="item.picUrl" />
                        </div>
                        <div class="bd-bot">
                            <p class="name">{{item.title}}</p>
                            <p class="price">${{item.price}}</p>
                            <div class="desc">
                                <hr>
                                <p>{{item.sellPoint}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="text-align-center">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes,prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            catId:this.$route.query.catId,
            goodList:[],
            supplierList:[],
            searchValueList:[],
            total:0,
            curPage:1,
            pageSize:10
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize=val
            this.bodyReady()
        },
        handleCurrentChange(val) {
            this.curPage=val
            this.bodyReady()
        },
        bodyReady:function(){
            var url='http://luxma.helpyoulove.com/pc/item/searchByCatId/'+this.curPage+'?stage='+this.pageSize+'&catId='+this.catId;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
                    this.goodList=response.data.data.rows;
                    this.total=response.data.data.total;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
            
        },
        // supplierReady:function(){ 
        //     var url='http://luxma.helpyoulove.com/pc/supplier/index/list';
	    //     var vm=this;
	    //     this.$http.post(url).then(response => {   
	    //         if(response.data.status==200){
        //             this.supplierList=response.data.data;
		// 		}else{
		// 			this.$message.error(response.data.msg);
		// 		}
	    //     }, response => {
	    //     });
        // },

        searchValueReady:function(){ 
            var url='http://luxma.helpyoulove.com/property/getSearchValue/'+this.catId;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
                    this.searchValueList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        },
        goGoodDetail:function(e){
            this.$router.push({path:'/GoodsDetail',query:{Id:e}})
        }
    },
    components: {
    },
    created(){
        this.searchValueReady();
    	this.bodyReady();
        
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/mixin.scss";
    .text-align-center{
        text-align: center;
    }
    .goods{
        width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
        padding-bottom: 20px;
        background: $white;
        .m-sortbar{
            overflow: hidden;
            .sortbar-item{
                overflow: hidden;
                border-top: 1px dashed #dedede;
                line-height: 1;
                &:first-child{
                    border: none;
                }
                &>span{
                    display: inline-block;
                    float: left;
                    color: #999;
                    padding: 15px 0;
                    padding-right: 15px;
                    box-sizing: border-box;
                    width: 60px;
                    text-align: right;
                }
                .item-list{
                    float: left;
                    width: 1060px;
                    overflow: hidden;
                    a{
                        display: inline-block;
                        padding: 15px 15px;
                        color: #333;
                        i{
                            color: #999;
                        }
                        &:hover{
                            color: #b4a078;
                            i{
                                color: #999;
                            }
                        }
                    }
                    .v-middle{
                        vertical-align: middle;
                    }
                    .active{
                        color: #b4a078;
                    }
                    .icon{
                        display: inline-block;
                        width: 16px;
                        position: relative;
                        vertical-align: middle;
                        i{
                            position: absolute;
                        }
                        .i-a{
                            top: -2px;
                        }
                        .i-b{
                            bottom: -2px;
                        }
                    }
                    
                }
            }
        }    
    }
    .goods-list{
        margin-top: 10px;
        position: relative;
        background-color: #fff;
        .ul-goods-list{
            margin-right: -20px;
            .item{
                height: 375px;
                margin-right: 20px;
                margin-bottom: 20px;
                float: left;
                .item-product{
                    height: 100%;
                    line-height: 1;
                    text-align: center;
                    font-size: 13px;
                    width: 265px;
                    border: 1px solid #e5e5e5;
                    padding-bottom: 20px;
                    // height: 361px;
                    position: relative;
                    &:hover .hd-top img {
                        -webkit-transform: scale(1.05);
                        -moz-transform: scale(1.05);
                        -ms-transform: scale(1.05);
                        -o-transform: scale(1.05);
                        transform: scale(1.05)
                    }
                    .hd-top{
                        position: relative;
                        margin-bottom: 8px;
                        overflow: hidden;
                        background-color: #f4f4f4;
                        img{
                            width: 265px;
                            height: 265px;
                            -webkit-transition: transform 1s;
                            -moz-transition: transform 1s;
                            -o-transition: transform 1s;
                            transition: -webkit-transform 1s;
                            transition: transform 1s;
                            transition: transform 1s,-webkit-transform 1s;
                            background-color: #f4f4f4;
                            border: 1px solid transparent;
                            color: #f4f4f4;
                            display: block;
                            margin: 0 auto;
                        }
                    }
                    .bd-bot{
                        .name{
                            margin-bottom: 4px;
                            height: 20px;
                            line-height: 20px;
                            padding: 0 10px;
                            @include tooverflow();
                            font-weight: bold;
                            text-align: center;
                        }
                        .price{
                            color: #d4282d;
                            text-align: center;
                        }
                        .desc{
                            hr{
                                display: block;
                                width: 130px;
                                height: 1px;
                                padding: 0;
                                margin: 6px auto 14px;
                                border: 0;
                                border-top: 1px solid #e8e8e8;
                            }
                            p{
                                width: 100%;
                                padding: 0 10px;
                                line-height: 18px;
                                color: #999;
                                @include tooverflow();
                            }
                        }

                    }
                }
            }
        }
    }
</style>
