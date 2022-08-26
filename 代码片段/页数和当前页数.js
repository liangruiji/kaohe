(function() {

    // 页数
    let pageCount = $(".ant-pagination.oui-pagination li").eq(-2).text()
    pageCount = parseInt(pageCount)
    // if (pageCount) {
    //     this.pageCount = pageCount
    // }

    // 当前页数
    let currentPage = Number($(".ant-pagination-item.ant-pagination-item-active").attr('title'))
    // if (currentPage) {
    //     this.currentPage = currentPage
    // }
    console.dir('pageCount:' + pageCount)
    console.dir('currentPage:' + currentPage)

}
)()
