<template>
  <div class="order-center">
    	<div class="order-list">
            <div  class="order-item">
				
				<table class="order-table">
					<thead>
						<tr>
							<td width="300">商品信息</td>
							<td width="150">单价</td>
							<td width="200">数量</td>
							<td width="220">金额</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in orderList">
							<td>
								<div class="goods-info">
									<img class="img" :src="item.picUrl">
									<p class="title">{{item.itemTitle}}</p>
								</div>
							</td>
							<td>{{item.price}}</td>
							<td>{{item.num}}</td>
							
							<td>{{item.priceTotal}}</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>  
			<div v-if="orderList==''||orderList==undefined" class="no-list">
				暂无数据
			</div>
  		</div>
  </div>
</template>

<script>
export default {
    data(){
		return{
			orderList:[],
		}
    },
    components: {
    },
    methods:{
    },
    created(){
		this.orderList=this.$store.state.orderList;
		console.log(this.orderList)
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

}

.page-list{
	margin: 40px auto;
	text-align: center;
}
.search-top1{
	width: 250px;
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
	// border: 1px solid #e5e5e5;
	margin-bottom: 20px;
	
	.order-table{
		width: 100%;
		td{
			padding:10px 10px;
		}
		thead{
			font-size: 18px;
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
.goods-info{
	.img{
		width: 100px;
		height: 100px;
		float: left;
		margin-right: 8px;
	}
	.title{
		font-size:14px
	}
}
</style>
