// 获取选择类目的一级类目id
let cateId = getCurCateId()
let ShopCate = getXwsStorage('xws/mc/common/getShopCate.json')
if (ShopCate) {
    for (let i = 0; i < ShopCate.length; i++) {
        if (cateId == ShopCate[i][1]) {
            firstCateId = ShopCate[i][6]
            break
        }
    }
}
