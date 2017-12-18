<template>
    <div class="goods-detail clearfix">
        <div class="m-slide">
            <div class="view">
                <img src="http://yanxuan.nosdn.127.net/7f51e6c2324cada00389fd1aacf4b84d.jpg">
            </div>
            <div class="list">
                <ul>
                    <li class="active">
                        <a href="javascript:;">
                            <img src="http://yanxuan.nosdn.127.net/e2a5e7100aed420074f7b4d8b5a3f9e3.png">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="http://yanxuan.nosdn.127.net/e2a5e7100aed420074f7b4d8b5a3f9e3.png">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="http://yanxuan.nosdn.127.net/e2a5e7100aed420074f7b4d8b5a3f9e3.png">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="http://yanxuan.nosdn.127.net/e2a5e7100aed420074f7b4d8b5a3f9e3.png">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="http://yanxuan.nosdn.127.net/e2a5e7100aed420074f7b4d8b5a3f9e3.png">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="m-info">
            <div class="name">男式迷彩短款厚羽绒</div>
            <div class="desc">虎斑迷彩，温暖厚实的暖意佼佼者</div>
            <div class="price">
                <div class="p-box clearfix">
                    <span class="label-1 label">
                        售价
                    </span>
                    <span class="pri">
                        <span class="do">$</span>1000
                    </span>
                </div>
                <div class="field remark">
                    <span class="label">供应商</span>
                    <span class="remarkCt">Moncler制造商</span>
                </div>
            </div>
            <table class="choose-speci">
                <tr>
                    <td class="title">
                        颜色
                    </td>
                    <td>
                        <!-- <el-checkbox-group v-model="sizeList">
                            <el-checkbox v-for="(item,index) in isSizeObj.values" :label="item" border>
                                {{item.valueTitle}}
                            </el-checkbox>
                        </el-checkbox-group>  -->
                    </td>
                </tr>
                <tr>
                    <td class="title">
                        尺码
                    </td>
                    <td></td>
                </tr>
            </table>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    components: {
    },
    created(){
    	
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/mixin.scss";
    .goods-detail{
        width: 1200px;
        margin: 0 auto;
        padding: 20px 40px;
        background: $white;
        .m-slide{
            float: left;
            width: 525px;
            overflow: hidden;
            .view{
                float: left;
                width: 430px;
                height: 430px;
                border: 1px solid #e8e8e8;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .list{
                float: right;
                overflow: hidden;
                ul{
                    margin-top: 1px;
                    position: relative;
                    li{
                        zoom: 1;
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        margin-bottom: 7px;
                        display: block;
                        vertical-align: top;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 1px solid #e8e8e8;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                                background-color: #f4f4f4;
                            }
                        }  
                    }
                    .active{
                        a{
                            margin: 0;
                            border: 2px solid #b4a078;
                        }
                    }
                }
            }
        }
        .m-info{
            float: right;
            width: 566px;
            padding-left: 62px;
            word-break: break-all;
            word-wrap: break-word;
            .name{
                font-size: 20px;
                font-weight: 700;
                line-height: 20px;
                margin-bottom: 7px;
            }
            .desc{
                width: 300px;
                font-size: 12px;
                padding-top: 10px;
                line-height: 18px;
                color: #999;
            }
            .price{
                margin-top: 20px;
                background-color: #f5f3ef;
                border-top: 1px dotted #dedede;
                border-bottom: 1px dotted #dedede;
                padding: 0 0 13px;
                line-height: 24px;
                font-size: 13px;
                position: relative;
                .label{
                    width: 55px;
                    font-size: 14px;
                    float: left;
                    color: #666;
                    margin-left: 10px;
                }
                .p-box{
                    .label-1{
                        line-height: 30px;
                        margin-top: 16px;
                    }
                    .pri{
                        float: left;
                        font-size: 18px;
                        font-weight: 700;
                        margin-right: 1px;
                        margin-top: 13px;
                        margin-left: 0;
                        height: 30px;
                        color: #d7282d;
                        font-size: 28px;
                        line-height: 30px;
                        .do{
                            margin-left: 0;
                            line-height: 30px;
                            font-size: 18px;
                        }
                    }
                }
                .field{
                    margin-bottom: 3px;
                }
                .remark{
                    margin-top: 2px;
                    height: 24px;
                    .remarkCt {
                        display: inline-block;
                        width: 436px;
                        height: 24px;
                        line-height: 24px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #666;
                    }
                }
            }
            .choose-speci{
                width: 100%;
                margin-top: 20px;
            }
        }
    }    
</style>
