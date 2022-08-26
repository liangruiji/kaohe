R = {
        'db': null,
        'isStoragePersisted': true,
        'init': function(U) {
            this.db = new Dexie(U),
            this.db.version(0).stores({
                'MonitorShopList': '++id,cateId,dateRange,dateType,device,sellerType,type',
                'MarketRank': '++id,cateId,dateRange,dateType,device,sellerType,priceSeg,moduleType,dataType',
                'MyMonitor': '++id,cateId,dateRange,dateType,device,sellerType,moduleType',
                'MarketIndustryTrend': '++id,type,cateId,dateRange,dateType,device,diffCateId,indexCode,sellerType,createTime,status,flag',
                'MarketIndustryCateCons': '++id,cateId,dateRange,dateType,device,indexCode,sellerType,createTime',
                'MarketRedBlueSea': '++id,cateId,cateLevel,dateRange,dateType,device,index,sellerType,createTime',
                'MarketPurCate': '++id,cateId,dateRange,dateType,relateCateId,seller,createTime',
                'MarketCustomerTrend': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,createTime',
                'MarketCustomerAttrPortrait': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,attrType,createTime',
                'MyMonitorPaging': '++id,cateId,dateRange,dateType,device,sellerType,pageSize,page,order,orderBy,indexCode,moduleType',
                'IndustryMonitorPaging': '++id,cateId,dateRange,dateType,device,sellerType,pageSize,page,order,orderBy,indexCode,moduleType'
            })
    
            this.db.open().catch((Y)=> {
                console.error('Open failed: ' + Y),
                this.db.delete().then(()=> {
                    localStorage.clear()
                    sessionStorage.clear()
                    this.db.open().then(()=> {
                        console.log('reopen 成功');
                    }).catch(()=> {
                       console.log('reopen 失败');
                    });
                });
            })
            navigator.storage && navigator.storage.persisted && navigator.storage.persisted().then((Y)=>{
                this.isStoragePersisted = Y;
            });
        }
    }
R.init('test')
class aa {
    constructor(table) {
        this.db = R.db
        if (!this.db[table]) {
            throw new Error('表不存在，请先添加表');
        }
        this.table = this.db.table(table)
    }
    filterDataByTableField(U) {
        var V = {}
        this.tableField.forEach((item)=>{
            if (U.hasOwnProperty(item) && U[item] != '') {
                V[item] = !isNaN(U[item]) && U[item] ? parseFloat(U[item]) : U[item]
            }
        }
        )
        return V
    }
    filterDataByTableFieldSecMethod(U) {
        var V = {};
        this.tableField.forEach((item)=>{
            if (!U.hasOwnProperty(item)) {
                return flase;
            }
            if (U[item] == null || U[item] == undefined || U[item] == 'undefined') {
                V[item] = ''
            }
            if (isNaN(U[item])) {
                V[item] = U[item]
            } else if (U[item] === '' || typeof U[item] == 'boolean') {
                V[item] = String(U[item])
            } else {
                V[item] = parseFloat(U[item])
            }

        }
        )

        return V;
    }
    filterDataByTableFieldNew(U, W) {
        let X = {};
        this.tableField.forEach((item)=>{
            if (!U.hasOwnProperty(item)) {
                W || (X[item] = '')
                return false
            }
            if (this.isNumber(U[item])) {
                X[item] = parseFloat(U[item])
            } else if (U[item] == null || U[item] == undefined || U[item] == 'undefined') {
                X[item] = ''
            } else if (typeof U[item] == 'boolean') {
                X[item] = Number(U[item])
            } else {
                X[item] = U[item];
            }

        }
        )
        return X;
    }

    isNumber(U) {
        let type = typeof U
        let val = !['object', 'undefined', 'boolean'].includes(type) && U !== '' && !isNaN(U);
        return val

    }
    clearExpiredData(U, V) {
        V = Object.assign({
            'month': 6,
            'week': 12,
            'day': 30,
            'today': 0,
            'recent7': 1,
            'recent30': 1
        }, V);
        var W = moment()['format']('YYYY-MM-DD')
          , X = '';
        switch (U) {
        case 'month':
            X = 'months';
            break;
        case 'week':
            X = 'weeks';
            break;
        case 'day':
        case 'today':
        case 'recent7':
        case 'recent30':
            X = 'days';
        }
        this.table.where({
            'dateType': U
        }).and(function(Y) {
            let Z = ['month', 'week', 'day', 'today'].includes(U) ? Y.dateRange.split('|')[0] : Y.dateRange.split('|')[1];
            return moment(W)['diff'](moment(Z), X) > V[U];
        }).delete();
    }

}
let bb = new aa('MarketRank')