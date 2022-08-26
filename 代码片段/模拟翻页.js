// 1 
//  <template v-slot:tag-tip>
//             <div v-if="pageCount > 1" style="display: flex;justify-content: flex-end; align-items: center;">
//               <simulate-click
//                 :current-page="currentPage"
//                 :page-count="pageCount"
//                 :pager-count="6"
//                 layout="prev, pager, next"
//                 :fold="1"
//                 :has-data="hasData"
//                 :background="true"
//                 @current-change="currentChange"
//               />
//               <el-tooltip
//                 style="margin-right: 20px;"
//                 effect="dark"
//                 content="同步分页：模拟用户点击分页，无需关闭窗口，便可加载多页数据"
//                 placement="bottom-start"
//               >
//                 <i class="el-icon-question"></i>
//               </el-tooltip>
//             </div>
//           </template>

// 2

// import SimulateClick from '@/components/SimulateClick/index'

// 3
//   components: {
//     SimulateClick,
//   },

// 4

//    pageCount: undefined,
//    hasData: [],
//    currentPage: [],

// 5

//   let pageCount = $("div[id^='sycm-mc-mq-market-rank-short-vedio'] .ant-pagination.oui-pagination li")
//         .eq(-2)
//         .text()
//       pageCount = parseInt(pageCount)
//       console.log('pageCount', pageCount)
//       if (pageCount) {
//         this.pageCount = pageCount
//       }
//       let currentPage = Number($("div[id^='sycm-mc-mq-market-rank-short-vedio'] .ant-pagination-item.ant-pagination-item-active").attr('title'))
//       if (currentPage) {
//         this.currentPage = currentPage
//       }

// 6

//  currentChange(currentPage, title) {
//       let key = `li[title='${title}']`
//       console.log(currentPage, title, key)
//       if (!this.hasData.includes(currentPage)) {
//         window.addEventListener(
//           'message',
//           e => {
//             if (e.data.act.includes('xws/sync/click/mc/mkt/rank/video/list.json?page')) {
//               let page = getUrlKey(e.data.act, 'page')
//               console.log(getUrlKey(e.data.act, 'page'))
//               if (page == currentPage) {
//                 setTimeout(this.fetchData, 0)
//               }
//             }
//           },
//           {
//             once: true,
//             // passive: false,
//             // useCapture: false,
//           },
//         )
//         this.loading = true
//       }
//       $("div[id^='sycm-mc-mq-market-rank-short-vedio'] .ant-pagination.oui-pagination")
//         .children(key)
//         .click()
//     },
