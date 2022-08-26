(function() {
    var order = $(".alife-dt-card-common-table-sortable-icon-wrapper .alife-dt-card-common-table-sortable-down-icon.active", ).length ? 'desc' : 'asc'
    var orderBy = $(".alife-dt-card-common-table-sortable-icon-wrapper .oui-canary-icon.active").parents('div[data-onetrace-index-id]').attr('data-onetrace-index-id')
    console.dir('order:' + order)
    console.dir('orderBy:' + orderBy)
}
)()
