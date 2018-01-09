<template>
  <div class="order-center">
  		<div class="order-center-top clearfix">
			<div class="search-top1">
				<el-select v-model="status" slot="prepend" placeholder="请选择">
					<el-option label="全部订单" value=""></el-option>
					<el-option label="已完成订单" value="1"></el-option>
					<el-option label="未完成订单" value="2"></el-option>
				</el-select>
				<el-button @click="searchStatus()" slot="append" icon="search"></el-button>
			</div>
    	</div>
    	<div class="order-list">
            <div v-for="(item,index) in orderList" class="order-item">
				<div class="order-top clearfix">
					<span>订单编号:</span>{{item.orderId}}
					<span>下单时间：</span>{{item.createTime}}
					<span>总金额：</span><i class="money">{{item.payment}}</i>
					<span v-if="item.status==1" class="f-r">已完成</span>
					<span v-else class="f-r">未完成</span>
					
				</div>
				<table class="order-table">
					<thead>
						<tr>
							<td width="100">ID</td>
							<td width="250">Name</td>
							<td width="100">Num</td>
							<td width="120">Price</td>
							<td>Price Total</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item1,index) in item.items">
							<td>{{item1.itemId}}</td>
							<td>{{item1.itemTitle}}</td>
							<td>{{item1.num}}</td>
							<td>{{item1.price}}</td>
							<td>{{item1.priceTotal}}</td>
						</tr>
					</tbody>
				</table>
			</div>  
			<div v-if="orderList.length==0" class="no-list">
				暂无数据
			</div>
			<div v-if="pageShow" class="page-list">
				<el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
			</div>
  		</div>
  </div>
</template>

<script>
export default {
    data(){
		return{
			orderList:[],
			status:'',
			searchName:'',	
			currentPage:1,
			pageSize:10,
			total:0,
			pageShow:false,

			searchId:'',
		}
    },
    components: {
    },
    methods:{
		handleSizeChange(val) {
			this.pageSize=val;
			this.bodyReady()
		},
		handleCurrentChange(val) {
			this.currentPage=val;
			this.bodyReady()
		},

		bodyReady:function(){
			var url='http://luxma.helpyoulove.com/pc/order/getOrderList'+this.currentPage+'?status='+this.status+'&stage='+this.pageSize;
			var vm=this;
			this.$http.post(url).then(response => {
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else  if(response.data.status==200){
					this.orderList=response.data.data.rows;
					this.total=response.data.data.total;
					if(this.total<10){
						this.pageShow=false
					}
				}   
				
			}, response => {
			});
		},
		searchStatus:function(){
			this.bodyReady();
		},
    },
    created(){
		this.bodyReady();
    }
}
</script>

<style lang="scss" scoped>
.order-center{
	width: 1200px;
	margin: 0 auto;
	padding: 20px 40px;
	// padding-bottom: 20px;
	background: #ffffff;
}
.order-list{
	margin-top: 35px;
}
.no-list{
	height: 50px;
	line-height: 50px;
	color: #95989a;
	text-align: center;
}
.page-list{
	margin: 40px auto;
	text-align: center;
}
.search-top1{
	width: 252px;
	float: left;
	.el-button{
		color: #97a8be;
	}
}
.search-top2{
	width: 300px;
	float: left;
	margin-left: 30px;
}
.order-item{
	border: 1px solid #e5e5e5;
	margin-bottom: 20px;
	
	.order-top{
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #95989a;
		padding: 0 10px;
		span{
			color: #000;
			padding-left: 20px;
			&:first-child{
				padding-left: 0
			}
		}
		a{
			color: #409EFF;
		}
		.money{
			color: #fe4343;
		}
	}
	.order-table{
		width: 100%;
		td{
			padding:10px 10px;
		}
		thead{
			
			background: #eef1f6
		}
		tbody{
			tr{
				background: #FAFAFA;
				&:nth-child(2n+1){
					background: #ffffff;
				}
			}
		}
	}
}
</style>
