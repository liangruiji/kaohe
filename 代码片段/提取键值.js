let bb = "bizId:,bizType:业务类型,cateId:类目id,cateLevel1Id:主营一级类目id,cateLevel1Name:主营一级类目名称,cateLevel2Id:主营一级类目top2 id,cateLevel2Name:主营一级类目top2名称,cateLevel:类目层级,cnt:条数,crtAmt:下单金额,crtByrCnt:下单买家数,crtItmQty:下单件数,crtRate:下单转化率,customerCartCltOrd:加购/收藏/下单的消费者,customerVst:访问的消费者数量,gmtCreate:创建时间,gmtModified:修改时间,itemCartByrCnt:商品加购人数,itemCartCnt:商品加购件数,itemCltByrCnt:商品收藏人数,itemId:商品id,itmBounceRate:商品详情页跳出率,itmPv:商品浏览量,itmUv:商品访客数,juPayAmt:聚划算支付金额,mtdPayAmt:月累计支付金额,mtdPayItmCnt:月累计支付件数,newPayByrCnt:支付新买家数,olderPayAmt:老买家支付金额,payAmt:支付金额,payByrCnt:支付买家数,payItmCnt:支付件数,payOldByrCnt:支付老买家数,payRate:支付转化率,seGuidePayByrCnt:搜索引导支付买家数,seGuidePayRate:搜索引导支付转化率,seGuideUv:搜索引导访客数,stayTimeAvg:平均停留时长,subUserId:子账号id,sucRefundAmt:售中售后成功退款金额,tags:用户标签,userId:店铺user id,uvAvgValue:访客平均价值,ytdPayAmt:年累计支付金额"
let re = /([^,:]+):([^,:]*)/g
let obj = {}
let arr
while ((arr = re.exec(bb)) !== null) {

    obj[arr[1]] = arr[2]

}
console.log(obj)