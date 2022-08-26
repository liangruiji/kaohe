 function aa(j, k, q) {
    'use strict';
    q['d'](k, 'a', function() {
        return R;
    });
    var z = q(0x13)
      , B = q['n'](z)
      , C = q(0x17)
      , D = q['n'](C)
      , E = q(0x18)
      , F = q['n'](E)
      , G = q(0x19)
      , H = q['n'](G)
      , I = q(0x7)
      , J = q['n'](I)
      , K = q(0x8)
      , L = q['n'](K)
      , M = q(0x9e)
      , N = q(0x5d3)
      , O = q(0x4b)
      , P = q['n'](O)
      , Q = q(0x38)
      , R = {
        'db': null,
        'isStoragePersisted': !0x0,
        'init': function(U) {
            var V = this
              , W = M['a'] + '_' + P['a']['MD5'](U)['toString']()['toUpperCase']();
            this['db'] = new N['a'](W),
            this['db']['version'](0xb)['stores']({
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
            }),
            this['db']['version'](0xc)['stores']({
                'MarketIndustryTrend': '++id,type,cateId,dateRange,dateType,device,diffCateId,indexCode,sellerType,createTime,status,flag',
                'MarketCustomerTrend': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,createTime,flag',
                'MarketSearchAnalyze': '++id,dateRange,dateType,order,orderBy,keyword,device,indexCode,moduleType'
            })['upgrade'](function(Y) {
                Y['MarketCustomerTrend']['toCollection']()['modify'](function(Z) {
                    Z['flag'] = Z['flag'] || 0x0;
                }),
                Y['MarketIndustryTrend']['toCollection']()['modify'](function(Z) {
                    Z['flag'] = Z['flag'] || 0x0;
                });
            }),
            this['db']['version'](0xd)['stores']({
                'MarketIndustryCateCons': '++id,cateId,dateRange,dateType,device,indexCode,sellerType,createTime,flag'
            })['upgrade'](function(Y) {
                Y['MarketIndustryCateCons']['toCollection']()['modify'](function(Z) {
                    Z['flag'] = Z['flag'] || 0x0;
                });
            }),
            this['db']['version'](0xe)['stores']({
                'PublicTrendAnalyzeRivalInfo': '++id,firstCateId,rivalType,rivalId',
                'PublicTrendAnalyze': '++id,dateRange,dateType,cateId,rivalId,device,sellerType,indexCode,rivalType'
            }),
            this['db']['version'](0xf)['stores']({
                'MarketCustomerAttrPortrait': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,attrType,createTime,flag'
            }),
            this['db']['version'](0x10)['stores']({
                'MarketPurCate': null,
                'MarketRedBlueSea': null
            }),
            this['db']['version'](0x11)['stores']({
                'MarketIndustryTrend': '++id,type,cateId,dateRange,dateType,device,diffCateId,indexCode,sellerType,createTime,status,flag',
                'MarketIndustryCateCons': '++id,cateId,dateRange,dateType,device,indexCode,sellerType,createTime,flag',
                'MarketCustomerTrend': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,createTime,flag',
                'MarketCustomerAttrPortrait': '++id,type,cateId,dateRange,dateType,device,indexCode,sellerType,attrType,createTime,flag'
            })['upgrade'](function(Y) {
                Y['MarketIndustryTrend']['toCollection']()['modify'](function(Z) {
                    Z['createTime'] && Z['createTime'] < 0x174c0d7c400 && (Z['flag'] = 0x0);
                }),
                Y['MarketIndustryCateCons']['toCollection']()['modify'](function(Z) {
                    Z['createTime'] && Z['createTime'] < 0x174c0d7c400 && (Z['flag'] = 0x0);
                }),
                Y['MarketCustomerTrend']['toCollection']()['modify'](function(Z) {
                    Z['createTime'] && Z['createTime'] < 0x174c0d7c400 && (Z['flag'] = 0x0);
                }),
                Y['MarketCustomerAttrPortrait']['toCollection']()['modify'](function(Z) {
                    Z['createTime'] && Z['createTime'] < 0x174c0d7c400 && (Z['flag'] = 0x0);
                });
            }),
            this['db']['version'](0x12)['stores']({
                'TaobaoTvData': '++id,dateRange,dateType'
            }),
            this['db']['version'](0x13)['stores']({
                'MyMonitorPaging': '++id,cateId,dateRange,dateType,device,sellerType,pageSize,page,moduleType,type'
            })['upgrade'](function(Y) {
                Y['MyMonitorPaging']['toCollection']()['modify'](function(Z) {
                    Z['type'] = Z['type'] || 'all';
                });
            }),
            this['db']['version'](0x14)['stores']({
                'IpollVisitor': '++id,device,type,source,itemid,visitTimeStamp,updateDate,dataId'
            }),
            this['db']['version'](0x15)['stores']({
                'TrafficItemSourceDetail': '++id,belong,childPageType,dateRange,dateType,device,itemId,pPageId,pageId,pageLevel',
                'DatawarActivityComparisonItems': '++id,activityId,indexCode,page'
            }),
            this['db']['version'](0x16)['stores']({
                'MarketSearchAnalyzeTrend': '++id,dateRange,dateType,device,diffKeyword,indexCode,keyword'
            }),
            this['db']['version'](0x17)['stores']({
                'MacroMonitorItemRank': '&[dateRange+dateType+device+guideCateId+cateId+cateLevel+follow],dateRange,dateType,device,guideCateId,cateId,cateLevel,follow'
            }),
            this['db']['version'](0x18)['stores']({
                'Product360TitleOptimize': '&[dateRange+dateType+device+kwType+rivalId+type],dateRange,dateType,device,kwType,rivalId,type,id'
            }),
            this['db']['version'](0x19)['stores']({
                'MarketSearchRank': '&[dateRange+dateType+device+cateId+moduleType+subModuleType],dateRange,dateType,device,cateId,moduleType,subModuleType'
            }),
            this['db']['version'](0x1a)['stores']({
                'Product360TrafficSource': '&[dateRange+dateType+device+belong+crowdType+itemId],dateRange,dateType,device,belong,crowdType,itemId'
            }),
            this['db']['version'](0x1b)['stores']({
                'MacroMonitorCateRank': '&[dateRange+dateType+follow+cateType],dateRange,dateType,follow,cateType',
                'Category360PriceAnalysis': '&[dateRange+dateType+cateId+id],dateRange,dateType,cateId,id',
                'Product360SourceDetailSelf': '&[childPageType+dateRange+dateType+device+itemId+pPageId+pageId+pageLevel],childPageType,dateRange,dateType,device,itemId,pPageId,pageId,pageLevel',
                'shopSourceRivalList': '&[cateId+dateRange+dateType+device+page+pageSize+type],cateId,dateRange,dateType,device,page,pageSize,type',
                'TrafficShopSourceAnalyze': '&[dateRange+dateType+device+belong+order+orderBy],dateRange,dateType,device,belong,order,orderBy'
            }),
            this['db']['version'](0x1c)['stores']({
                'VideoSingleItemRelation': '&[videoId+pageType],videoId,pageType'
            }),
            this['db']['version'](0x1d)['stores']({
                'MarketAttributeInsightHotSales': '&[dateRange+dateType+pageSize+page+cateId+deviceType+sellerType+propIdStr+propValueIdStr+tabType],dateRange,dateType,pageSize,page,cateId,deviceType,sellerType,propIdStr,propValueIdStr,tabType'
            }),
            this['db']['version'](0x1e)['stores']({
                'Product360SaleAnalysisCoreOverview': '&[dateRange+dateType+device+type+itemId],dateRange,dateType,device,type,itemId'
            }),
            this['db']['version'](0x1f)['stores']({
                'Category360TrafficSource': '&[dateRange+dateType+monitorUserId+cateId+belong+device],dateRange,dateType,monitorUserId,cateId,belong,device'
            }),
            this['db']['version'](0x20)['stores']({
                'ItemSourceItemRank': '&[dateRange+dateType+pageSize+page+device],dateRange,dateType,pageSize,page,device',
                'TrafficLeadItemsDetail': '&[objId+type+appType+dateRange+dateType+page+pageSize],objId,type,appType,dateRange,dateType,page,pageSize',
                'DrainageSearchKeyword': '&[dateRange+dateType+device+kwType],dateRange,dateType,device,kwType',
                'ItemSourceSelfSource': '&[dateRange+dateType+device+itemId+crowdType],dateRange,dateType,device,itemId,crowdType',
                'ShopSourceFlowSource': '&[dateRange+dateType+device+crowdType],dateRange,dateType,device,crowdType',
                'ShopSourceItemEffect': '&[dateRange+dateType+device+crowdType+page+pageSize+belong+pageId+pPageId],dateRange,dateType,device,crowdType,page,pageSize,belong,pageId,pPageId',
                'Category360HotwordAnalysis': '&[dateRange+dateType+pageSize+page+cateId+id+outerType],dateRange,dateType,pageSize,page,cateId,id,outerType',
                'ShopSourcePartitionSource': '&[dateRange+dateType+device+page+pageSize+belong+pageId+pPageId+childPageType],dateRange,dateType,device,page,pageSize,belong,pageId,pPageId,childPageType'
            }),
            this['db']['version'](0x21)['stores']({
                'ItemTrafficSource': '&[dateRange+dateType+cateId+device+id],dateRange,dateType,cateId,device,id'
            }),
            this['db']['version'](0x22)['stores']({
                'Category360PartitionSource': '&[dateRange+dateType+pageSize+page+cateId+pageId+belong],dateRange,dateType,pageSize,page,cateId,pageId,belong'
            }),
            this['db']['version'](0x23)['stores']({
                'Product360SaleAnalysisAttrAnalysis': '&[dateRange+dateType+pageSize+page+order+orderBy+attrName+device+id+indexCode],dateRange,dateType,pageSize,page,order,orderBy,attrName,device,id,indexCode'
            }),
            this['db']['version'](0x24)['stores']({
                'BrandAnalysisTopShop': '&[dateRange+dateType+cateId+device+sellerType+topType+brandId],dateRange,dateType,cateId,device,sellerType,topType,brandId',
                'BrandAnalysisTopItem': '&[dateRange+dateType+cateId+device+sellerType+topType+brandId],dateRange,dateType,cateId,device,sellerType,topType,brandId'
            }),
            this['db']['version'](0x25)['stores']({
                'MarketIndustryConstitute': '&[dateRange+dateType+cateId+device+sellerType],dateRange,dateType,cateId,device,sellerType'
            }),
            this['db']['version'](0x26)['stores']({
                'shopSourceFlowSourceTrend': '&[dateRange+dateType+belong+device+crowdType+pageId],dateRange,dateType,belong,device,crowdType,pageId'
            }),
            this['db']['version'](0x27)['stores']({
                'MonitorShopList': null,
                'MarketRank': null,
                'MyMonitorPaging': null,
                'MyMonitor': null,
                'IndustryMonitorPaging': null,
                'PublicTrendAnalyzeRivalInfo': null,
                'PublicTrendAnalyze': null,
                'MarketIndustryTrend': null,
                'MarketSearchAnalyze': null,
                'MarketSearchAnalyzeTrend': null,
                'TaobaoTvData': null,
                'DatawarActivityComparisonItems': null,
                'TrafficItemSourceDetail': null,
                'MonitorShopListPro': '&[cateId+dateRange+dateType+device+sellerType+type],cateId,dateRange,dateType,device,sellerType,type',
                'MarketRankPro': '&[cateId+dateRange+dateType+device+sellerType+priceSeg+moduleType+dataType],cateId,dateRange,dateType,device,sellerType,priceSeg,moduleType,dataType',
                'MyMonitorPagingPro': '&[cateId+dateRange+dateType+device+sellerType+pageSize+page+moduleType+type],cateId,dateRange,dateType,device,sellerType,pageSize,page,moduleType,type',
                'IndustryMonitorPagingPro': '&[cateId+dateRange+dateType+device+sellerType+pageSize+page+moduleType],cateId,dateRange,dateType,device,sellerType,pageSize,page,moduleType',
                'PublicTrendAnalyzeRivalInfoPro': '&[firstCateId+rivalType+rivalId],firstCateId,rivalType,rivalId',
                'PublicTrendAnalyzePro': '&[dateRange+dateType+cateId+rivalId+device+sellerType+indexCode+rivalType],dateRange,dateType,cateId,rivalId,device,sellerType,indexCode,rivalType',
                'MarketIndustryTrendPro': '&[type+cateId+dateRange+dateType+device+diffCateId+indexCode+sellerType],type,cateId,dateRange,dateType,device,diffCateId,indexCode,sellerType,createTime,status,flag',
                'MarketSearchAnalyzePro': '&[dateRange+dateType+keyword+device+moduleType],dateRange,dateType,keyword,device,moduleType',
                'MarketSearchAnalyzeTrendPro': '&[dateRange+dateType+device+diffKeyword+indexCode+keyword],dateRange,dateType,device,diffKeyword,indexCode,keyword',
                'TaobaoTvDataPro': '&[dateRange+dateType],dateRange,dateType',
                'DatawarActivityComparisonItemsPro': '&[activityId+indexCode+page],activityId,indexCode,page',
                'TrafficItemSourceDetailPro': '&[belong+childPageType+dateRange+dateType+device+itemId+pPageId+pageId+pageLevel],belong,childPageType,dateRange,dateType,device,itemId,pPageId,pageId,pageLevel'
            }),
            this['db']['version'](0x28)['stores']({
                'MarketSearchAnalyzePro': '&[dateRange+dateType+keyword+device+moduleType],dateRange,dateType,keyword,device,moduleType,createTime'
            }),
            this['db']['version'](0x29)['stores']({
                'ShopSourceItemEffectNoPic': '&[dateRange+dateType+device+crowdType+childPageType+belong+pageId+pPageId],dateRange,dateType,device,crowdType,childPageType,belong,pageId,pPageId'
            }),
            this['db']['version'](0x2a)['stores']({
                'MarketSearchCateConstituteMult': '&[dateRange+dateType+device+keyword+page+pageSize+order+orderBy+level1Id+notLevel1],dateRange,dateType,device,keyword,page,pageSize,order,orderBy,level1Id,notLevel1'
            }),
            this['db']['version'](0x2b)['stores']({
                'PlanProgressMonitor': '&[planId],planId'
            }),
            this['db']['version'](0x2c)['stores']({
                'VideoMinidetailAnalysisVideoRelation': '&[itemId+dateType+dateRange+role+order+orderBy],itemId,dateType,dateRange,role,order,orderBy'
            }),
            this['db']['version'](0x2d)['stores']({
                'Category360CateRank': '&[dateRange+dateType+follow+cateType],dateRange,dateType,follow,cateType',
                'CategoryItemRank': '&[dateRange+dateType+device+guideCateId+cateId+cateLevel+follow+tag],dateRange,dateType,device,guideCateId,cateId,cateLevel,follow,tag'
            }),
            this['db']['version'](0x2e)['stores']({
                'Category360CateRankMyFocus': '&[dateRange+dateType+follow+cateType],dateRange,dateType,follow,cateType'
            }),
            this['db']['version'](0x2f)['stores']({
                'MarketProductInsightHotSales': '&[dateRange+dateType+pageSize+page+cateId+deviceType+sellerType+spuId+rankType],dateRange,dateType,pageSize,page,cateId,deviceType,sellerType,spuId,rankType'
            }),
            this['db']['version'](0x30)['stores']({
                'ShopTrafficSource': '&[dateRange+dateType+cateId+device+id],dateRange,dateType,cateId,device,id',
                'TrafficShopTrafficSource': '&[dateRange+dateType+device+id],dateRange,dateType,device,id',
                'TrafficItemTrafficSource': '&[dateRange+dateType+device+id],dateRange,dateType,device,id'
            }),
            this['db']['version'](0x31)['stores']({
                'CompeteItemAnalysisCoreIndexes': '&[dateRange+dateType+device+cateId+id],dateRange,dateType,device,cateId,id'
            }),
            this['db']['version'](0x32)['stores']({
                'EnterStoreKeyword': '&[dateRange+dateType+device+cateId+id+sellerType+topType],dateRange,dateType,device,cateId,id,sellerType,topType',
                'CoreIndexCompare': '&[dateRange+dateType+device+cateId+id+sellerType],dateRange,dateType,device,cateId,id,sellerType'
            }),
            this['db']['version'](0x33)['stores']({
                'Product360TrafficSourcePro': '&[dateRange+dateType+device+belong+crowdType+itemId+sourceType+isIndex],dateRange,dateType,device,belong,crowdType,itemId,sourceType,isIndex'
            });
            var X = this;
            this['db']['open']()['catch'](function(Y) {
                console['error']('Open failed: ' + Y),
                X['db']['delete']()['then'](function() {
                    localStorage['clear'](),
                    sessionStorage['clear'](),
                    X['db']['open']()['then'](function() {
                        console['log']('reopen 成功');
                    })['catch'](function() {
                        Q['default']['$store']['commit']('SET_ERROR_MSG', 'dbError');
                    });
                });
            }),
            navigator['storage'] && navigator['storage']['persisted'] && navigator['storage']['persisted']()['then'](function(Y) {
                V['isStoragePersisted'] = Y;
            });
        },
        'persist': function() {
            var U = this;
            return L()(J['a']['mark'](function V() {
                return J['a']['wrap'](function(W) {
                    for (; ; )
                        switch (W['prev'] = W['next']) {
                        case 0x0:
                            return W['next'] = 0x2,
                            navigator['storage'];
                        case 0x2:
                            if (W['t1'] = W['sent'],
                            !W['t1']) {
                                W['next'] = 0x5;
                                break;
                            }
                            W['t1'] = navigator['storage']['persist'];
                        case 0x5:
                            if (W['t0'] = W['t1'],
                            !W['t0']) {
                                W['next'] = 0x8;
                                break;
                            }
                            W['t0'] = navigator['storage']['persist']();
                        case 0x8:
                            return W['abrupt']('return', W['t0']);
                        case 0x9:
                        case 'end':
                            return W['stop']();
                        }
                }, V, U);
            }))();
        }
    }
      , S = (H()(T, [{
        'key': 'filterDataByTableField',
        'value': function(U) {
            var V = {};
            return this['tableField']['forEach'](function(W) {
                U['hasOwnProperty'](W) && '' !== U[W] && (V[W] = !isNaN(U[W]) && U[W] ? parseFloat(U[W]) : U[W]);
            }),
            V;
        }
    }, {
        'key': 'filterDataByTableFieldSecMethod',
        'value': function(U) {
            var V = {};
            return this['tableField']['forEach'](function(W) {
                if (!U['hasOwnProperty'](W))
                    return !0x1;
                null !== U[W] && void 0x0 !== U[W] && 'undefined' !== U[W] || (V[W] = ''),
                isNaN(U[W]) ? V[W] = U[W] : V[W] = ('' === U[W] || 'boolean' == typeof U[W] ? String : parseFloat)(U[W]);
            }),
            V;
        }
    }, {
        'key': 'filterDataByTableFieldNew',
        'value': function(U) {
            var V = this
              , W = 0x1 < arguments['length'] && void 0x0 !== arguments[0x1] && arguments[0x1]
              , X = {};
            return this['tableField']['forEach'](function(Y) {
                if (!U['hasOwnProperty'](Y))
                    return W || (X[Y] = ''),
                    !0x1;
                V['isNumber'](U[Y]) ? X[Y] = parseFloat(U[Y]) : null === U[Y] || void 0x0 === U[Y] || 'undefined' === U[Y] ? X[Y] = '' : 'boolean' == typeof U[Y] ? X[Y] = Number(U[Y]) : X[Y] = U[Y];
            }),
            X;
        }
    }, {
        'key': 'isNumber',
        'value': function(U) {
            return !['object', 'undefined', 'boolean']['includes'](void 0x0 === U ? 'undefined' : D()(U)) && '' !== U && !isNaN(U);
        }
    }, {
        'key': 'clearExpiredData',
        'value': function(U, V) {
            V = B()({
                'month': 0x6,
                'week': 0xc,
                'day': 0x1e,
                'today': 0x0,
                'recent7': 0x1,
                'recent30': 0x1
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
            this['table']['where']({
                'dateType': U
            })['and'](function(Y) {
                var Z = ['month', 'week', 'day', 'today']['includes'](U) ? Y['dateRange']['split']('|')[0x0] : Y['dateRange']['split']('|')[0x1];
                return moment(W)['diff'](moment(Z), X) > V[U];
            })['delete']();
        }
    }]),
    T);
    function T(U) {
        if (F()(this, T),
        this['db'] = R['db'],
        !this['db'][U])
            throw new Error('表不存在，请先添加表');
        this['table'] = this['db']['table'](U);
    }
    k['b'] = S;
}

