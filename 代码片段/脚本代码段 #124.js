const db = new Dexie('myDatabase')
db.version(4).stores({
    customerGroupPerspective: '[device+dateType+dateRange+cateId+sellerType]',
    // Primary key and indexed props
})
async function getKey() {
    let aa = await db.customerGroupPerspective.where({
        '[device+dateType+cateId+sellerType]': [0, 'month',50020808,-1]
    }).and((item=>{
        return ["2022-06-01|2022-06-30"].includes(item.dateRange)
    }
    )).primaryKeys()
    return aa
}
getKey()