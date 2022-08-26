<template>
  <div>
    <div class="item" @click="drawer = !drawer">
      编辑器
    </div>
    <el-drawer
      append-to-body
      size="95%"
      :with-header="false"
      custom-class="nunu-drawer"
      :visible.sync="drawer"
      :direction="direction"
      @opened.once="open"
      @opened="updatePreview1"
    >
      <div id="warp" class="mm">
        <div style="width: 100%;height: 100%;">
          <div id="editor_pane" class="editor_pane">
            <div id="tz" class="handler"></div>
            <div class="common">
              <textarea ref="testcode" name="testcode">
<div class="main-container">
  <span class="percentage">0%</span>
  <span class="moving-counter"></span>
  <div class="svg-container">
    <svg class="loader-bg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <path opacity="0.38" fill="#F7931E" d="M502.7,700.3l-0.7-50c39.1-0.5,75.9-16,103.8-43.6c27.9-27.6,43.7-64.5,44.4-103.8
        c0-1,0-2,0-3c0-25.4-6.5-50.6-18.8-72.7l43.7-24.3c16.4,29.5,25,63,25,96.9c0,1.3,0,2.7,0,4c-1,52.3-22.1,101.4-59.2,138.3
        C604,679,554.8,699.6,502.7,700.3z M496.6,700.3l-0.6,0c-52.7-1-102.1-22.4-139.1-60.1c-36.9-37.7-57.2-87.4-57.2-140.1
        c0-1.3,0-2.7,0-4c0.6-33,9.5-65.5,25.6-94.1l43.6,24.5c-12,21.4-18.7,45.8-19.2,70.6c0,1,0,2,0,3c0,39.5,15.2,76.8,42.9,105.1
        c27.7,28.3,64.8,44.3,104.4,45.1l0.3,0L496.6,700.3z M629.2,423.2c-26.8-45-74-72.4-126.3-73.5c-1,0-2,0-3,0
        c-26.3,0-52.2,6.9-74.8,20c-22.1,12.7-40.7,31-53.9,52.7l-42.8-25.9c17.5-29,42.3-53.3,71.7-70.2c30.2-17.4,64.8-26.6,99.8-26.6
        c0,0,0,0,0,0c1.3,0,2.7,0,4,0c34.6,0.7,68.6,10.3,98.2,27.9c28.7,17,52.9,41.2,70,69.9L629.2,423.2z"/>
    </svg>
    <svg class="loader-main" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <path opacity="0.38" fill="#F7931E" d="M502.6,695.3l-0.5-40c65.3-0.8,123.5-42.9,144.8-104.7l37.8,13
        C657.9,641.3,584.7,694.2,502.6,695.3z M496.7,695.3l-0.5,0c-40.9-0.8-79.9-14.1-112.7-38.6c-32.1-23.9-55.7-56.5-68.5-94.2
        l37.9-12.8C373.7,611.6,431.6,654,497,655.3l0.3,0L496.7,695.3z M686.5,557.9l-38.2-11.8c4.3-13.9,6.6-28.4,6.9-43.1
        c0-1,0-2.1,0-3.1c0-24.7-5.6-48.3-16.8-70.2c-10.6-20.9-26.2-39.5-45-53.7l24.1-31.9c23.6,17.8,43.1,41.2,56.5,67.5
        c13.8,27.2,21.1,57.7,21.1,88.3c0,1.3,0,2.6,0,3.9C694.9,522.3,691.9,540.5,686.5,557.9z M313.1,556.8c-5.6-18.3-8.4-37.4-8.4-56.7
        c0-1.3,0-2.6,0-3.9c1.2-60.7,29.8-116.4,78.6-152.8l23.9,32.1c-38.8,28.9-61.5,73.2-62.5,121.5c0,1,0,2.1,0,3.1
        c0,15.4,2.2,30.5,6.7,45.1L313.1,556.8z M589.7,373.2c-25.4-18-55.4-27.9-86.6-28.5c-1,0-2.1,0-3.1,0c-32,0-62.7,9.7-88.8,28
        l-22.9-32.8c32.9-23,71.5-35.2,111.8-35.2c1.3,0,2.6,0,3.9,0c39.3,0.8,77,13.2,109,35.8L589.7,373.2z"/>
    </svg>
    <svg class="outer-circle-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <circle fill="none" stroke="#F7931E" stroke-miterlimit="10" cx="500" cy="500" r="404.6"/>
    </svg>
    <svg class="outer-circle-2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <path fill="#F7931E" d="M502.2,884.9l-0.1-12c1.3,0,2.6,0,3.9,0l0.2,12C504.9,884.9,503.5,884.9,502.2,884.9z M494,884.9
        c-1.4,0-2.7,0-4.1-0.1l0.3-12c1.3,0,2.6,0.1,3.9,0.1L494,884.9z M514.4,884.7l-0.4-12c1.3,0,2.6-0.1,3.9-0.2l0.6,12
        C517.1,884.6,515.7,884.6,514.4,884.7z M481.8,884.5c-1.4-0.1-2.7-0.1-4.1-0.2l0.7-12c1.3,0.1,2.6,0.1,3.9,0.2L481.8,884.5z
         M526.6,884l-0.8-12c1.3-0.1,2.6-0.2,3.9-0.3l0.9,12C529.3,883.9,527.9,884,526.6,884z M469.6,883.8c-1.4-0.1-2.7-0.2-4.1-0.3
        l1.1-12c1.3,0.1,2.6,0.2,3.9,0.3L469.6,883.8z M538.7,883l-1.2-11.9c1.3-0.1,2.6-0.3,3.9-0.4l1.3,11.9
        C541.4,882.8,540.1,882.9,538.7,883z M457.5,882.6c-1.3-0.1-2.7-0.3-4-0.5l1.4-11.9c1.3,0.2,2.6,0.3,3.9,0.5L457.5,882.6z
         M550.9,881.6l-1.6-11.9c1.3-0.2,2.6-0.4,3.9-0.5l1.7,11.9C553.5,881.3,552.2,881.4,550.9,881.6z M445.4,881.1
        c-1.3-0.2-2.7-0.4-4-0.6l1.8-11.9c1.3,0.2,2.6,0.4,3.9,0.6L445.4,881.1z M562.9,879.8L561,868c1.3-0.2,2.6-0.4,3.9-0.7l2.1,11.8
        C565.6,879.4,564.3,879.6,562.9,879.8z M433.3,879.2c-1.3-0.2-2.7-0.5-4-0.7l2.2-11.8c1.3,0.2,2.6,0.5,3.9,0.7L433.3,879.2z
         M575,877.7l-2.3-11.8c1.3-0.3,2.6-0.5,3.9-0.8l2.4,11.7C577.6,877.1,576.3,877.4,575,877.7z M421.3,876.9c-1.3-0.3-2.7-0.6-4-0.9
        l2.6-11.7c1.3,0.3,2.6,0.6,3.9,0.8L421.3,876.9z M586.9,875.1l-2.7-11.7c1.3-0.3,2.6-0.6,3.8-0.9l2.8,11.7
        C589.5,874.5,588.2,874.8,586.9,875.1z M409.4,874.2c-1.3-0.3-2.6-0.6-4-1l2.9-11.6c1.3,0.3,2.5,0.6,3.8,0.9L409.4,874.2z
         M598.8,872.2l-3.1-11.6c1.3-0.3,2.5-0.7,3.8-1l3.2,11.6C601.4,871.5,600.1,871.8,598.8,872.2z M397.5,871.2
        c-1.3-0.4-2.6-0.7-3.9-1.1l3.3-11.5c1.3,0.4,2.5,0.7,3.8,1.1L397.5,871.2z M610.5,868.8l-3.4-11.5c1.3-0.4,2.5-0.8,3.8-1.2l3.6,11.5
        C613.1,868.1,611.8,868.5,610.5,868.8z M385.8,867.7c-1.3-0.4-2.6-0.8-3.9-1.2l3.7-11.4c1.3,0.4,2.5,0.8,3.8,1.2L385.8,867.7z
         M622.2,865.2l-3.8-11.4c1.2-0.4,2.5-0.8,3.7-1.3l3.9,11.3C624.7,864.3,623.5,864.7,622.2,865.2z M374.2,863.9
        c-1.3-0.4-2.6-0.9-3.9-1.4l4-11.3c1.2,0.4,2.5,0.9,3.7,1.3L374.2,863.9z M633.7,861.1l-4.2-11.3c1.2-0.5,2.5-0.9,3.7-1.4l4.3,11.2
        C636.2,860.2,635,860.6,633.7,861.1z M362.7,859.7c-1.3-0.5-2.5-1-3.8-1.5l4.4-11.2c1.2,0.5,2.5,1,3.7,1.4L362.7,859.7z
         M645.1,856.7l-4.5-11.1c1.2-0.5,2.4-1,3.6-1.5l4.6,11.1C647.6,855.7,646.3,856.2,645.1,856.7z M351.3,855.2
        c-1.3-0.5-2.5-1.1-3.8-1.6l4.8-11c1.2,0.5,2.4,1,3.6,1.5L351.3,855.2z M656.3,851.9l-4.9-11c1.2-0.5,2.4-1.1,3.6-1.6l5,10.9
        C658.7,850.8,657.5,851.4,656.3,851.9z M340.1,850.3c-1.2-0.6-2.5-1.1-3.7-1.7l5.1-10.9c1.2,0.6,2.4,1.1,3.6,1.7L340.1,850.3z
         M667.3,846.8l-5.2-10.8c1.2-0.6,2.4-1.1,3.5-1.7L671,845C669.7,845.6,668.5,846.2,667.3,846.8z M329,845c-1.2-0.6-2.4-1.2-3.6-1.8
        l5.5-10.7c1.2,0.6,2.4,1.2,3.5,1.8L329,845z M678.2,841.3l-5.6-10.6c1.2-0.6,2.3-1.2,3.5-1.8l5.7,10.6
        C680.6,840.1,679.4,840.7,678.2,841.3z M318.1,839.4c-1.2-0.6-2.4-1.3-3.6-2l5.8-10.5c1.2,0.6,2.3,1.3,3.5,1.9L318.1,839.4z
         M688.9,835.5L683,825c1.1-0.6,2.3-1.3,3.4-2l6,10.4C691.2,834.2,690.1,834.8,688.9,835.5z M307.4,833.4c-1.2-0.7-2.3-1.4-3.5-2.1
        L310,821c1.1,0.7,2.3,1.3,3.4,2L307.4,833.4z M699.4,829.3l-6.2-10.3c1.1-0.7,2.2-1.4,3.4-2.1l6.3,10.2
        C701.7,827.9,700.6,828.6,699.4,829.3z M297,827.1c-1.2-0.7-2.3-1.4-3.5-2.2l6.4-10.1c1.1,0.7,2.2,1.4,3.3,2.1L297,827.1z
         M709.7,822.9l-6.5-10.1c1.1-0.7,2.2-1.4,3.3-2.2l6.7,10C712,821.4,710.9,822.1,709.7,822.9z M286.7,820.5c-1.1-0.8-2.3-1.5-3.4-2.3
        l6.8-9.9c1.1,0.7,2.2,1.5,3.3,2.2L286.7,820.5z M719.8,816l-6.9-9.8c1.1-0.8,2.2-1.5,3.2-2.3l7,9.8
        C722.1,814.5,720.9,815.3,719.8,816z M276.6,813.5c-1.1-0.8-2.2-1.6-3.3-2.4l7.1-9.7c1.1,0.8,2.1,1.5,3.2,2.3L276.6,813.5z
         M729.7,808.9l-7.2-9.6c1.1-0.8,2.1-1.6,3.1-2.4l7.3,9.6C731.9,807.3,730.8,808.1,729.7,808.9z M266.8,806.3
        c-1.1-0.8-2.2-1.7-3.2-2.5l7.4-9.5c1,0.8,2.1,1.6,3.1,2.4L266.8,806.3z M739.4,801.5l-7.5-9.4c1-0.8,2.1-1.6,3.1-2.5l7.6,9.3
        C741.5,799.8,740.5,800.6,739.4,801.5z M257.2,798.7c-1.1-0.9-2.1-1.7-3.1-2.6l7.7-9.2c1,0.8,2,1.7,3,2.5L257.2,798.7z M748.8,793.7
        l-7.8-9.2c1-0.8,2-1.7,3-2.6l7.9,9.1C750.9,792,749.9,792.9,748.8,793.7z M247.8,790.9c-1-0.9-2-1.8-3.1-2.7l8-9c1,0.9,2,1.7,3,2.6
        L247.8,790.9z M758,785.7l-8-8.9c1-0.9,1.9-1.8,2.9-2.7l8.1,8.8C760,783.9,759,784.8,758,785.7z M238.7,782.7c-1-0.9-2-1.8-3-2.8
        l8.2-8.7c1,0.9,1.9,1.8,2.9,2.7L238.7,782.7z M766.9,777.4l-8.3-8.7c0.9-0.9,1.9-1.8,2.8-2.7l8.4,8.6
        C768.9,775.5,767.9,776.4,766.9,777.4z M229.9,774.3c-1-1-1.9-1.9-2.9-2.9l8.5-8.5c0.9,0.9,1.9,1.9,2.8,2.8L229.9,774.3z
         M775.6,768.8l-8.6-8.4c0.9-0.9,1.8-1.9,2.7-2.8l8.7,8.3C777.5,766.8,776.5,767.8,775.6,768.8z M221.3,765.6c-0.9-1-1.9-2-2.8-3
        l8.8-8.2c0.9,1,1.8,1.9,2.7,2.9L221.3,765.6z M784,759.9l-8.8-8.1c0.9-1,1.8-1.9,2.6-2.9l8.9,8C785.8,757.9,784.9,758.9,784,759.9z
         M213,756.6c-0.9-1-1.8-2-2.7-3l9-7.9c0.9,1,1.7,2,2.6,3L213,756.6z M792.1,750.7l-9.1-7.8c0.9-1,1.7-2,2.6-3l9.2,7.7
        C793.9,748.7,793,749.7,792.1,750.7z M205,747.4c-0.9-1-1.7-2.1-2.6-3.1l9.3-7.6c0.8,1,1.7,2,2.5,3L205,747.4z M799.9,741.4
        l-9.3-7.5c0.8-1,1.6-2.1,2.5-3.1l9.4,7.4C801.6,739.2,800.8,740.3,799.9,741.4z M197.4,737.9c-0.8-1.1-1.7-2.1-2.5-3.2l9.5-7.3
        c0.8,1,1.6,2.1,2.4,3.1L197.4,737.9z M807.4,731.7l-9.6-7.2c0.8-1.1,1.6-2.1,2.4-3.2l9.7,7.1C809.1,729.5,808.2,730.6,807.4,731.7z
         M190,728.2c-0.8-1.1-1.6-2.2-2.4-3.3l9.7-7c0.8,1.1,1.5,2.1,2.3,3.2L190,728.2z M814.6,721.8l-9.8-6.9c0.8-1.1,1.5-2.2,2.3-3.2
        l9.9,6.8C816.2,719.6,815.4,720.7,814.6,721.8z M182.9,718.3c-0.8-1.1-1.5-2.2-2.3-3.4l10-6.7c0.7,1.1,1.5,2.2,2.2,3.3L182.9,718.3z
         M821.5,711.8l-10-6.6c0.7-1.1,1.4-2.2,2.2-3.3l10.1,6.5C823,709.5,822.3,710.6,821.5,711.8z M176.1,708.1c-0.7-1.1-1.5-2.3-2.2-3.4
        l10.2-6.4c0.7,1.1,1.4,2.2,2.1,3.3L176.1,708.1z M828.1,701.4l-10.2-6.3c0.7-1.1,1.4-2.2,2.1-3.4l10.3,6.2
        C829.5,699.1,828.8,700.3,828.1,701.4z M169.7,697.8c-0.7-1.2-1.4-2.3-2.1-3.5l10.4-6.1c0.7,1.1,1.3,2.3,2,3.4L169.7,697.8z
         M834.4,690.9l-10.4-6c0.7-1.1,1.3-2.3,1.9-3.4l10.5,5.8C835.7,688.5,835,689.7,834.4,690.9z M163.6,687.2c-0.7-1.2-1.3-2.4-2-3.6
        l10.5-5.7c0.6,1.2,1.3,2.3,1.9,3.4L163.6,687.2z M840.3,680.2l-10.6-5.6c0.6-1.2,1.2-2.3,1.8-3.5l10.7,5.5
        C841.5,677.8,840.9,679,840.3,680.2z M157.8,676.5c-0.6-1.2-1.2-2.4-1.8-3.6l10.7-5.4c0.6,1.2,1.2,2.3,1.8,3.5L157.8,676.5z
         M845.8,669.3L835,664c0.6-1.2,1.2-2.4,1.7-3.6l10.8,5.2C847,666.8,846.4,668.1,845.8,669.3z M152.4,665.6c-0.6-1.2-1.2-2.4-1.7-3.7
        l10.9-5.1c0.6,1.2,1.1,2.4,1.7,3.6L152.4,665.6z M851,658.2l-10.9-4.9c0.5-1.2,1.1-2.4,1.6-3.6l11,4.8
        C852.2,655.7,851.6,657,851,658.2z M147.3,654.5c-0.5-1.2-1.1-2.5-1.6-3.7l11-4.7c0.5,1.2,1,2.4,1.6,3.6L147.3,654.5z M855.9,647
        l-11.1-4.6c0.5-1.2,1-2.4,1.5-3.7l11.1,4.5C856.9,644.4,856.4,645.7,855.9,647z M142.6,643.3c-0.5-1.3-1-2.5-1.5-3.8l11.2-4.3
        c0.5,1.2,1,2.4,1.4,3.7L142.6,643.3z M860.4,635.6l-11.2-4.2c0.5-1.2,0.9-2.5,1.4-3.7l11.3,4.1C861.4,633,860.9,634.3,860.4,635.6z
         M138.2,631.9c-0.5-1.3-0.9-2.6-1.4-3.8l11.3-4c0.4,1.2,0.9,2.5,1.3,3.7L138.2,631.9z M864.5,624l-11.4-3.9c0.4-1.2,0.8-2.5,1.3-3.8
        l11.4,3.7C865.4,621.4,865,622.7,864.5,624z M134.2,620.4c-0.4-1.3-0.8-2.6-1.3-3.9l11.4-3.6c0.4,1.3,0.8,2.5,1.2,3.8L134.2,620.4z
         M868.3,612.4l-11.5-3.5c0.4-1.3,0.8-2.5,1.1-3.8l11.5,3.4C869.1,609.8,868.7,611.1,868.3,612.4z M130.6,608.7
        c-0.4-1.3-0.8-2.6-1.1-3.9l11.5-3.3c0.4,1.3,0.7,2.5,1.1,3.8L130.6,608.7z M871.7,600.6l-11.6-3.1c0.3-1.3,0.7-2.5,1-3.8l11.6,3
        C872.4,598,872,599.3,871.7,600.6z M127.4,596.9c-0.3-1.3-0.7-2.6-1-3.9l11.6-2.9c0.3,1.3,0.6,2.5,1,3.8L127.4,596.9z M874.7,588.8
        L863,586c0.3-1.3,0.6-2.6,0.9-3.8l11.7,2.6C875.3,586.1,875,587.5,874.7,588.8z M124.5,585.1c-0.3-1.3-0.6-2.6-0.9-4l11.7-2.5
        c0.3,1.3,0.6,2.6,0.8,3.9L124.5,585.1z M877.3,576.8l-11.8-2.4c0.3-1.3,0.5-2.6,0.8-3.9l11.8,2.3
        C877.8,574.2,877.5,575.5,877.3,576.8z M122,573.1c-0.3-1.3-0.5-2.7-0.7-4L133,567c0.2,1.3,0.5,2.6,0.7,3.9L122,573.1z M879.5,564.8
        l-11.8-2c0.2-1.3,0.4-2.6,0.6-3.9l11.9,1.9C880,562.2,879.7,563.5,879.5,564.8z M119.9,561.1c-0.2-1.3-0.4-2.7-0.6-4l11.9-1.8
        c0.2,1.3,0.4,2.6,0.6,3.9L119.9,561.1z M881.4,552.8l-11.9-1.6c0.2-1.3,0.3-2.6,0.5-3.9l11.9,1.5
        C881.7,550.1,881.5,551.4,881.4,552.8z M118.1,549c-0.2-1.3-0.3-2.7-0.5-4l11.9-1.4c0.2,1.3,0.3,2.6,0.5,3.9L118.1,549z
         M882.8,540.6l-11.9-1.2c0.1-1.3,0.3-2.6,0.4-3.9l11.9,1.1C883.1,537.9,883,539.3,882.8,540.6z M116.8,536.8
        c-0.1-1.3-0.2-2.7-0.4-4.1l12-1c0.1,1.3,0.2,2.6,0.4,3.9L116.8,536.8z M883.9,528.5l-12-0.9c0.1-1.3,0.2-2.6,0.3-3.9l12,0.8
        C884.1,525.8,884,527.1,883.9,528.5z M115.8,524.7c-0.1-1.4-0.2-2.7-0.2-4.1l12-0.6c0.1,1.3,0.1,2.6,0.2,3.9L115.8,524.7z
         M884.6,516.3l-12-0.5c0.1-1.3,0.1-2.6,0.1-3.9l12,0.4C884.7,513.6,884.7,514.9,884.6,516.3z M115.2,512.5c0-1.4-0.1-2.7-0.1-4.1
        l12-0.3c0,1.3,0.1,2.6,0.1,3.9L115.2,512.5z M884.9,504.1l-12-0.1c0-1.3,0-2.6,0-3.9v-0.5h12v0.5C885,501.4,884.9,502.7,884.9,504.1
        z M127,500.3h-12V500c0-1.3,0-2.5,0-3.8l12,0.1c0,1.2,0,2.5,0,3.7V500.3z M872.9,491.6c0-1.3-0.1-2.6-0.1-3.9l12-0.4
        c0,1.4,0.1,2.7,0.1,4.1L872.9,491.6z M127.2,488.4l-12-0.4c0-1.4,0.1-2.7,0.1-4.1l12,0.5C127.3,485.8,127.3,487.1,127.2,488.4z
         M872.4,479.8c-0.1-1.3-0.1-2.6-0.2-3.9l12-0.8c0.1,1.4,0.2,2.7,0.2,4.1L872.4,479.8z M127.8,476.6l-12-0.7c0.1-1.4,0.2-2.7,0.3-4.1
        l12,0.9C127.9,474,127.9,475.3,127.8,476.6z M871.6,468c-0.1-1.3-0.2-2.6-0.4-3.9l11.9-1.1c0.1,1.3,0.3,2.7,0.4,4L871.6,468z
         M128.7,464.8l-11.9-1.1c0.1-1.4,0.3-2.7,0.4-4.1l11.9,1.2C128.9,462.2,128.8,463.5,128.7,464.8z M870.4,456.2
        c-0.2-1.3-0.3-2.6-0.5-3.9l11.9-1.5c0.2,1.3,0.3,2.7,0.5,4L870.4,456.2z M130,453l-11.9-1.5c0.2-1.3,0.3-2.7,0.5-4l11.9,1.6
        C130.3,450.4,130.1,451.7,130,453z M868.8,444.5c-0.2-1.3-0.4-2.6-0.6-3.9l11.8-1.9c0.2,1.3,0.4,2.7,0.6,4L868.8,444.5z
         M131.6,441.3l-11.9-1.9c0.2-1.3,0.4-2.7,0.7-4l11.8,2C132.1,438.7,131.8,440,131.6,441.3z M866.9,432.8c-0.2-1.3-0.5-2.6-0.7-3.9
        l11.8-2.3c0.3,1.3,0.5,2.7,0.8,4L866.9,432.8z M133.7,429.7l-11.8-2.2c0.3-1.3,0.5-2.7,0.8-4l11.8,2.4
        C134.2,427.1,133.9,428.4,133.7,429.7z M864.6,421.2c-0.3-1.3-0.6-2.6-0.8-3.8l11.7-2.7c0.3,1.3,0.6,2.7,0.9,4L864.6,421.2z
         M136.1,418.1l-11.7-2.6c0.3-1.3,0.6-2.6,0.9-4l11.7,2.7C136.7,415.5,136.4,416.8,136.1,418.1z M861.9,409.7c-0.3-1.3-0.6-2.6-1-3.8
        l11.6-3c0.3,1.3,0.7,2.6,1,3.9L861.9,409.7z M138.8,406.6l-11.6-3c0.3-1.3,0.7-2.6,1-3.9l11.6,3.1
        C139.5,404,139.2,405.3,138.8,406.6z M858.9,398.2c-0.4-1.3-0.7-2.5-1.1-3.8l11.5-3.4c0.4,1.3,0.8,2.6,1.1,3.9L858.9,398.2z
         M142,395.2l-11.5-3.4c0.4-1.3,0.8-2.6,1.2-3.9l11.5,3.5C142.7,392.7,142.3,393.9,142,395.2z M855.5,386.9c-0.4-1.3-0.8-2.5-1.2-3.8
        l11.4-3.8c0.4,1.3,0.8,2.6,1.3,3.9L855.5,386.9z M145.5,383.8l-11.4-3.7c0.4-1.3,0.9-2.6,1.3-3.9l11.4,3.9
        C146.3,381.3,145.9,382.6,145.5,383.8z M851.7,375.7c-0.4-1.2-0.9-2.5-1.3-3.7l11.3-4.1c0.5,1.3,0.9,2.6,1.4,3.8L851.7,375.7z
         M149.4,372.6l-11.3-4.1c0.5-1.3,0.9-2.6,1.4-3.8l11.2,4.2C150.3,370.1,149.8,371.4,149.4,372.6z M847.6,364.6
        c-0.5-1.2-1-2.4-1.5-3.7l11.1-4.5c0.5,1.3,1,2.5,1.5,3.8L847.6,364.6z M153.6,361.5l-11.1-4.5c0.5-1.3,1-2.5,1.5-3.8l11.1,4.6
        C154.6,359.1,154.1,360.3,153.6,361.5z M843.1,353.6c-0.5-1.2-1-2.4-1.6-3.6l11-4.8c0.5,1.2,1.1,2.5,1.6,3.7L843.1,353.6z
         M158.2,350.6l-11-4.8c0.5-1.2,1.1-2.5,1.7-3.7l10.9,4.9C159.2,348.2,158.7,349.4,158.2,350.6z M838.3,342.9
        c-0.6-1.2-1.1-2.4-1.7-3.6l10.8-5.2c0.6,1.2,1.2,2.4,1.7,3.7L838.3,342.9z M163.1,339.8l-10.8-5.2c0.6-1.2,1.2-2.5,1.8-3.7l10.8,5.3
        C164.3,337.4,163.7,338.6,163.1,339.8z M833.2,332.3c-0.6-1.2-1.2-2.3-1.8-3.5l10.7-5.5c0.6,1.2,1.2,2.4,1.8,3.6L833.2,332.3z
         M168.4,329.2l-10.7-5.5c0.6-1.2,1.3-2.4,1.9-3.6l10.6,5.6C169.6,326.8,169,328,168.4,329.2z M827.7,321.8c-0.6-1.2-1.3-2.3-1.9-3.4
        l10.5-5.9c0.7,1.2,1.3,2.4,2,3.6L827.7,321.8z M174,318.7l-10.5-5.8c0.7-1.2,1.3-2.4,2-3.6l10.4,6
        C175.3,316.4,174.6,317.6,174,318.7z M821.9,311.5c-0.7-1.1-1.3-2.3-2-3.4l10.3-6.2c0.7,1.2,1.4,2.3,2.1,3.5L821.9,311.5z
         M179.9,308.5l-10.3-6.2c0.7-1.2,1.4-2.3,2.1-3.5l10.2,6.3C181.3,306.2,180.6,307.3,179.9,308.5z M815.8,301.5
        c-0.7-1.1-1.4-2.2-2.1-3.3l10.1-6.5c0.7,1.1,1.5,2.3,2.2,3.4L815.8,301.5z M186.2,298.4l-10.1-6.5c0.7-1.1,1.5-2.3,2.2-3.4l10,6.6
        C187.6,296.2,186.9,297.3,186.2,298.4z M809.3,291.6c-0.7-1.1-1.5-2.2-2.2-3.3l9.9-6.8c0.8,1.1,1.5,2.2,2.3,3.4L809.3,291.6z
         M192.8,288.5l-9.9-6.8c0.8-1.1,1.5-2.2,2.3-3.3l9.8,6.9C194.3,286.4,193.5,287.4,192.8,288.5z M802.6,281.9
        c-0.8-1.1-1.5-2.1-2.3-3.2l9.7-7.1c0.8,1.1,1.6,2.2,2.4,3.3L802.6,281.9z M199.6,278.9l-9.7-7.1c0.8-1.1,1.6-2.2,2.4-3.3l9.6,7.2
        C201.2,276.8,200.4,277.8,199.6,278.9z M795.5,272.4c-0.8-1-1.6-2.1-2.4-3.1l9.4-7.4c0.8,1.1,1.7,2.1,2.5,3.2L795.5,272.4z
         M206.8,269.5l-9.4-7.4c0.8-1.1,1.7-2.1,2.5-3.2l9.3,7.5C208.4,267.4,207.6,268.4,206.8,269.5z M788.1,263.2c-0.8-1-1.7-2-2.5-3
        l9.2-7.7c0.9,1,1.7,2.1,2.6,3.1L788.1,263.2z M214.3,260.3l-9.2-7.7c0.9-1,1.8-2.1,2.6-3.1l9.1,7.8
        C216,258.3,215.1,259.3,214.3,260.3z M780.5,254.2c-0.9-1-1.7-2-2.6-3l8.9-8c0.9,1,1.8,2,2.7,3L780.5,254.2z M222,251.3l-8.9-8
        c0.9-1,1.8-2,2.7-3l8.9,8.1C223.8,249.4,222.9,250.4,222,251.3z M772.5,245.4c-0.9-1-1.8-1.9-2.7-2.9l8.7-8.3c0.9,1,1.9,2,2.8,3
        L772.5,245.4z M230.1,242.6l-8.7-8.3c0.9-1,1.9-2,2.8-2.9l8.6,8.4C231.9,240.7,231,241.7,230.1,242.6z M764.3,236.9
        c-0.9-0.9-1.9-1.9-2.8-2.8l8.4-8.6c1,1,1.9,1.9,2.9,2.9L764.3,236.9z M238.4,234.2l-8.4-8.6c1-1,1.9-1.9,2.9-2.8l8.3,8.6
        C240.2,232.4,239.3,233.3,238.4,234.2z M755.8,228.6c-1-0.9-1.9-1.8-2.9-2.7l8.1-8.8c1,0.9,2,1.8,3,2.8L755.8,228.6z M246.9,226
        l-8.1-8.8c1-0.9,2-1.8,3-2.7l8.1,8.9C248.9,224.3,247.9,225.2,246.9,226z M747.1,220.6c-1-0.9-2-1.7-3-2.6l7.9-9.1
        c1,0.9,2,1.8,3.1,2.7L747.1,220.6z M255.7,218.2l-7.9-9.1c1-0.9,2.1-1.8,3.1-2.6l7.8,9.1C257.7,216.4,256.7,217.3,255.7,218.2z
         M738.1,212.9c-1-0.8-2-1.7-3.1-2.5l7.6-9.3c1.1,0.9,2.1,1.7,3.1,2.6L738.1,212.9z M264.8,210.6l-7.6-9.3c1.1-0.9,2.1-1.7,3.2-2.6
        l7.5,9.4C266.8,208.9,265.8,209.7,264.8,210.6z M728.9,205.5c-1-0.8-2.1-1.6-3.1-2.4l7.3-9.5c1.1,0.8,2.2,1.7,3.2,2.5L728.9,205.5z
         M274.1,203.2l-7.3-9.5c1.1-0.8,2.2-1.6,3.2-2.4l7.2,9.6C276.2,201.7,275.1,202.4,274.1,203.2z M719.4,198.4
        c-1.1-0.8-2.1-1.5-3.2-2.3l7-9.8c1.1,0.8,2.2,1.6,3.3,2.4L719.4,198.4z M283.6,196.2l-7-9.8c1.1-0.8,2.2-1.6,3.3-2.3l6.9,9.8
        C285.7,194.7,284.7,195.5,283.6,196.2z M709.7,191.6c-1.1-0.7-2.2-1.5-3.3-2.2l6.7-10c1.1,0.8,2.3,1.5,3.4,2.3L709.7,191.6z
         M293.3,189.5l-6.7-10c1.1-0.8,2.3-1.5,3.4-2.2l6.6,10.1C295.5,188.1,294.4,188.8,293.3,189.5z M699.8,185c-1.1-0.7-2.2-1.4-3.3-2.1
        l6.3-10.2c1.2,0.7,2.3,1.4,3.5,2.2L699.8,185z M303.2,183.1l-6.3-10.2c1.1-0.7,2.3-1.4,3.5-2.1l6.2,10.3
        C305.5,181.7,304.4,182.4,303.2,183.1z M689.7,178.8c-1.1-0.7-2.3-1.3-3.4-2l6-10.4c1.2,0.7,2.4,1.4,3.5,2.1L689.7,178.8z
         M313.4,177l-6-10.4c1.2-0.7,2.3-1.3,3.5-2l5.9,10.4C315.6,175.7,314.5,176.4,313.4,177z M679.4,173c-1.2-0.6-2.3-1.3-3.5-1.9
        l5.7-10.6c1.2,0.6,2.4,1.3,3.6,1.9L679.4,173z M323.7,171.3l-5.7-10.6c1.2-0.6,2.4-1.3,3.6-1.9l5.6,10.6
        C326,170,324.8,170.7,323.7,171.3z M669,167.4c-1.2-0.6-2.4-1.2-3.5-1.8l5.3-10.8c1.2,0.6,2.4,1.2,3.6,1.8L669,167.4z M334.1,165.9
        l-5.3-10.7c1.2-0.6,2.4-1.2,3.6-1.8l5.2,10.8C336.5,164.7,335.3,165.3,334.1,165.9z M658.3,162.2c-1.2-0.6-2.4-1.1-3.6-1.7l5-10.9
        c1.2,0.6,2.5,1.1,3.7,1.7L658.3,162.2z M344.8,160.8l-5-10.9c1.2-0.6,2.5-1.1,3.7-1.7l4.9,11C347.2,159.7,346,160.2,344.8,160.8z
         M647.5,157.3c-1.2-0.5-2.4-1-3.6-1.5l4.6-11.1c1.3,0.5,2.5,1.1,3.8,1.6L647.5,157.3z M355.6,156l-4.6-11.1c1.2-0.5,2.5-1,3.7-1.6
        l4.5,11.1C358,155,356.8,155.5,355.6,156z M636.5,152.8c-1.2-0.5-2.5-1-3.7-1.4l4.3-11.2c1.3,0.5,2.5,1,3.8,1.5L636.5,152.8z
         M366.5,151.6l-4.3-11.2c1.3-0.5,2.5-1,3.8-1.4l4.2,11.2C369,150.7,367.8,151.2,366.5,151.6z M625.4,148.7c-1.2-0.4-2.5-0.9-3.7-1.3
        l3.9-11.3c1.3,0.4,2.6,0.9,3.9,1.4L625.4,148.7z M377.7,147.6l-3.9-11.3c1.3-0.4,2.6-0.9,3.9-1.3l3.8,11.4
        C380.1,146.7,378.9,147.1,377.7,147.6z M614.1,144.8c-1.3-0.4-2.5-0.8-3.8-1.2l3.5-11.5c1.3,0.4,2.6,0.8,3.9,1.2L614.1,144.8z
         M388.9,143.9l-3.6-11.5c1.3-0.4,2.6-0.8,3.9-1.2l3.4,11.5C391.4,143.1,390.2,143.5,388.9,143.9z M602.8,141.4
        c-1.3-0.4-2.5-0.7-3.8-1.1l3.2-11.6c1.3,0.4,2.6,0.7,3.9,1.1L602.8,141.4z M400.3,140.5L397,129c1.3-0.4,2.6-0.7,3.9-1.1l3.1,11.6
        C402.8,139.8,401.5,140.2,400.3,140.5z M591.4,138.3c-1.3-0.3-2.5-0.6-3.8-0.9l2.8-11.7c1.3,0.3,2.6,0.6,4,1L591.4,138.3z
         M411.7,137.6l-2.8-11.7c1.3-0.3,2.6-0.6,4-0.9l2.7,11.7C414.3,136.9,413,137.3,411.7,137.6z M579.9,135.6c-1.3-0.3-2.6-0.6-3.9-0.8
        l2.4-11.8c1.3,0.3,2.7,0.6,4,0.8L579.9,135.6z M423.2,135l-2.5-11.7c1.3-0.3,2.7-0.5,4-0.8l2.3,11.8
        C425.8,134.4,424.5,134.7,423.2,135z M568.3,133.3c-1.3-0.2-2.6-0.5-3.9-0.7l2.1-11.8c1.3,0.2,2.7,0.5,4,0.7L568.3,133.3z
         M434.9,132.7l-2.1-11.8c1.3-0.2,2.7-0.5,4-0.7l2,11.8C437.5,132.3,436.2,132.5,434.9,132.7z M556.6,131.3c-1.3-0.2-2.6-0.4-3.9-0.6
        l1.7-11.9c1.3,0.2,2.7,0.4,4,0.6L556.6,131.3z M446.5,130.9l-1.7-11.9c1.3-0.2,2.7-0.4,4-0.6l1.6,11.9
        C449.1,130.5,447.8,130.7,446.5,130.9z M544.9,129.7c-1.3-0.2-2.6-0.3-3.9-0.4l1.3-11.9c1.4,0.1,2.7,0.3,4,0.5L544.9,129.7z
         M458.3,129.4l-1.3-11.9c1.3-0.1,2.7-0.3,4-0.4l1.2,11.9C460.9,129.1,459.6,129.2,458.3,129.4z M533.1,128.5
        c-1.3-0.1-2.6-0.2-3.9-0.3l0.9-12c1.4,0.1,2.7,0.2,4.1,0.3L533.1,128.5z M470.1,128.2l-0.9-12c1.4-0.1,2.7-0.2,4.1-0.3l0.8,12
        C472.7,128,471.4,128.1,470.1,128.2z M521.3,127.6c-1.3-0.1-2.6-0.1-3.9-0.2l0.5-12c1.4,0.1,2.7,0.1,4.1,0.2L521.3,127.6z
         M481.9,127.5l-0.6-12c1.4-0.1,2.7-0.1,4.1-0.2l0.4,12C484.5,127.4,483.2,127.4,481.9,127.5z M509.5,127.2c-1.3,0-2.6-0.1-3.9-0.1
        l0.2-12c1.4,0,2.7,0,4.1,0.1L509.5,127.2z M493.7,127.1l-0.2-12c1.4,0,2.7,0,4.1,0l0.1,12C496.3,127.1,495,127.1,493.7,127.1z"/>
    </svg>
    <svg class="outer-circle-3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <path fill="#F7931E" d="M500,869.7c-49.9,0-98.3-9.8-143.9-29.1c-44-18.6-83.6-45.3-117.5-79.2c-34-34-60.6-73.5-79.2-117.5
        c-19.3-45.6-29.1-94-29.1-143.9c0-49.9,9.8-98.3,29.1-143.9c18.6-44,45.3-83.6,79.2-117.5c34-34,73.5-60.6,117.5-79.2
        c45.6-19.3,94-29.1,143.9-29.1c49.9,0,98.3,9.8,143.9,29.1c44,18.6,83.6,45.3,117.5,79.2c34,34,60.6,73.5,79.2,117.5
        c19.3,45.6,29.1,94,29.1,143.9c0,49.9-9.8,98.3-29.1,143.9c-18.6,44-45.3,83.6-79.2,117.5s-73.5,60.6-117.5,79.2
        C598.3,860,549.9,869.7,500,869.7z M500,132.3c-49.6,0-97.8,9.7-143.1,28.9c-43.8,18.5-83.1,45-116.9,78.8
        c-33.8,33.8-60.3,73.1-78.8,116.9c-19.2,45.3-28.9,93.5-28.9,143.1s9.7,97.8,28.9,143.1c18.5,43.8,45,83.1,78.8,116.9
        c33.8,33.8,73.1,60.3,116.9,78.8c45.3,19.2,93.5,28.9,143.1,28.9s97.8-9.7,143.1-28.9c43.8-18.5,83.1-45,116.9-78.8
        c33.8-33.8,60.3-73.1,78.8-116.9c19.2-45.3,28.9-93.5,28.9-143.1s-9.7-97.8-28.9-143.1c-18.5-43.8-45-83.1-78.8-116.9
        c-33.8-33.8-73.1-60.3-116.9-78.8C597.8,142,549.6,132.3,500,132.3z"/>
    </svg>
    <svg class="middle-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <path opacity="0.38" fill="#F7931E" d="M500,789.7c-77.4,0-150.1-30.1-204.8-84.8c-54.7-54.7-84.8-127.4-84.8-204.8
        s30.1-150.1,84.8-204.8c54.7-54.7,127.4-84.8,204.8-84.8s150.1,30.1,204.8,84.8c54.7,54.7,84.8,127.4,84.8,204.8
        s-30.1,150.1-84.8,204.8C650.1,759.5,577.4,789.7,500,789.7z M500,250.3c-66.7,0-129.4,26-176.5,73.1S250.3,433.3,250.3,500
        s26,129.4,73.1,176.5c47.2,47.2,109.8,73.1,176.5,73.1s129.4-26,176.5-73.1c47.2-47.2,73.1-109.8,73.1-176.5s-26-129.4-73.1-176.5
        C629.4,276.3,566.7,250.3,500,250.3z"/>
    </svg>
    <svg class="inner-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <circle fill="none" stroke="#F7931E" stroke-miterlimit="10" cx="500" cy="500" r="129.2"/>
    </svg>
    <svg class="middle-doodads" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
    </svg>
    <svg class="middle-doodads" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <rect x="483" y="197" opacity="0.38" fill="#F7931E" width="33" height="4"/>
      <rect x="237.6" y="634.4" transform="matrix(0.866 -0.5 0.5 0.866 -293.3757 206.9996)" opacity="0.38" fill="#F7931E" width="4" height="33"/>
      <rect x="744.4" y="648.1" transform="matrix(0.4999 -0.8661 0.8661 0.4999 -182.4876 984.1016)" opacity="0.38" fill="#F7931E" width="33" height="4"/>
      <g >
        <polygon fill="#F7931E" points="463,815 477,815 477,824 481,824 481,811 463,811   "/>
        <polygon fill="#F7931E" points="519,811 519,824 523,824 523,815 537,815 537,811   "/>
      </g>
      <g>
        <polygon fill="#F7931E" points="791.3,374.5 784.3,362.4 792.1,357.9 790.1,354.5 778.8,361 787.8,376.5   "/>
        <polygon fill="#F7931E" points="759.8,328 771.1,321.5 769.1,318.1 761.3,322.6 754.3,310.5 750.8,312.5   "/>
      </g>
      <g>
        <polygon fill="#F7931E" points="245.7,310.5 238.7,322.6 230.9,318.1 228.9,321.5 240.2,328 249.2,312.5   "/>
        <polygon fill="#F7931E" points="221.2,361 209.9,354.5 207.9,357.9 215.7,362.4 208.7,374.5 212.2,376.5   "/>
      </g>
    </svg>
    <svg class="outer-triangles" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <polygon fill="#F7931E" points="500,981 506,981 503,985.2 500,989.4 497,985.2 494,981 "/>
      <polygon fill="#F7931E" points="981,500 981,494 985.2,497 989.4,500 985.2,503 981,506 "/>
      <polygon fill="#F7931E" points="500,19 494,19 497,14.8 500,10.6 503,14.8 506,19 "/>
      <polygon fill="#F7931E" points="19,500 19,506 14.8,503 10.6,500 14.8,497 19,494 "/>
    </svg>
  </div>
</div></textarea
              >
            </div>
            <div class="common">
              <textarea ref="csscode" name="csscode">
html {
  font-size: 10px;
  background: #222;
  background: linear-gradient(to bottom, #222 0%, #000 100%);
}

body {
  font-family: "Titillium Web", sans-serif;overflow: hidden
}

@-webkit-keyframes enterAnimation {
  0% {
    transform: scale(0) translate3d(0, 0, 500px) rotateX(45deg);
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0px) rotateX(0deg);
  }
}

@keyframes enterAnimation {
  0% {
    transform: scale(0) translate3d(0, 0, 500px) rotateX(45deg);
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0px) rotateX(0deg);
  }
}
@-webkit-keyframes turnAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes turnAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes bounceAnimation {
  0% {
    transform: translate3d(-50%, -50%, 0px);
  }
  100% {
    transform: translate3d(-50%, -50%, 50px);
  }
}
@keyframes bounceAnimation {
  0% {
    transform: translate3d(-50%, -50%, 0px);
  }
  100% {
    transform: translate3d(-50%, -50%, 50px);
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.container {
  width: 300px;
  margin: 0 auto;
}

.inner-circle {
  width: 20em;
  height: 20em;
  border: 1px solid #ff6a13;
  border-radius: 20em;
}

.percentage {
  font-size: 4em;
  text-align: center;
  color: #fff;
  display: block;
  border: 1px solid #ff6a13;
  width: 3em;
  height: 3em;
  margin: 0 auto;
  border-radius: 3em;
  line-height: 3em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 50px);
}

.moving-counter {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 300;
  transform: rotate(0deg);
}
.moving-counter:after {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 15px;
  background: white;
  top: 0;
  width: 4px;
  z-index: 1000;
  transform: translate3d(0, -400px, 180px);
}

.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 250ms all ease-out;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.svg-container {
  position: relative;
  transform-style: preserve-3d;
  -webkit-animation: enterAnimation 2500ms forwards cubic-bezier(0, 0, 0.25, 1.125);
          animation: enterAnimation 2500ms forwards cubic-bezier(0, 0, 0.25, 1.125);
}

svg {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
}

rect, circle, path, polygon, circle, g {
  display: block;
  transform-origin: 50% 50%;
}

.loader-bg {
  opacity: 0.33;
  transform: translate3d(-50%, -50%, 50px);
}
.loader-bg path {
  animation: turnAnimation 10s reverse infinite linear;
}

.loader-main {
  opacity: 1;
  opacity: 0.33;
  transform: translate3d(-50%, -50%, 10px);
}

.outer-circle-1 {
  opacity: 0.25;
  opacity: 0.33;
  transform: translate3d(-50%, -50%, 100px);
}

.outer-circle-2 {
  transform: translate3d(-50%, -50%, 50px);
}
.outer-circle-2 path {
  -webkit-animation: turnAnimation 500s infinite linear;
          animation: turnAnimation 500s infinite linear;
}

.middle-circle {
  opacity: 0.5;
  -webkit-animation: bounceAnimation 1s alternate infinite linear;
          animation: bounceAnimation 1s alternate infinite linear;
}

.inner-circle {
  transform: translate3d(-50%, -50%, 25px);
}

.outer-triangles {
  opacity: 0.33;
  transform: translate3d(-50%, -50%, 200px);
}

.outer-triangles polygon,
.middle-doodads polygon {
  fill: #ffffff;
}
.outer-triangles rect,
.middle-doodads rect {
  opacity: 0.5;
  fill: #ffffff;
  -webkit-animation: flickerAnimation 5s ease-out alternate infinite;
          animation: flickerAnimation 5s ease-out alternate infinite;
}

.middle-dooodads {
  transform: translate3d(-50%, -50%, -50px);
}</textarea
              >
            </div>
            <div class="common">
              <textarea ref="jscode" name="jscode">
// forked this code from mephysto.github.io
(function () {
  "use strict";
  var MEPHYSTO = MEPHYSTO || {
    // turnStrengthX: 20,
    turnStrengthX: -25,
    turnStrengthY: -20,
    sw : 0,
    sh : 0,
    mx : 0,
    my : 0,
    ox : 0,
    oy : 0,
    x : 0,
    y : 0,
    vx : 0,
    vy : 0,
    ax : 0,
    ay : 0,
    delay : 50,
    targetElement : {},
    init : function(){
      MEPHYSTO.targetElement = document.getElementsByClassName('main-container')[0];
      $( ".main-container" ).mousemove(MEPHYSTO.throttle(MEPHYSTO.onMouseMove, MEPHYSTO.delay));
    },
    // calculate tilting of landing card based on cursor location
    onMouseMove : function(e){
      MEPHYSTO.sw = window.innerWidth * 0.5;
      MEPHYSTO.sh = window.innerHeight * 0.5;
      MEPHYSTO.mx = e.clientX;
      MEPHYSTO.my = e.clientY;

      MEPHYSTO.ox = Math.floor((MEPHYSTO.sw - MEPHYSTO.mx) / MEPHYSTO.sw*100) * -0.01;
      MEPHYSTO.oy = Math.floor((MEPHYSTO.sh - MEPHYSTO.my) / MEPHYSTO.sh*100) * 0.01;

      MEPHYSTO.tiltLandingCard(MEPHYSTO.oy * MEPHYSTO.turnStrengthY, MEPHYSTO.ox * MEPHYSTO.turnStrengthX);
    },
    // tilt the landing card
    tiltLandingCard : function(_x, _y){
      MEPHYSTO.targetElement.style.webkitTransform = `rotateX(${_x}deg) rotateY(${_y}deg) translate3d(0,0,0px)`;
      MEPHYSTO.targetElement.style.MozTransform = `rotateX(${_x}deg) rotateY(${_y}deg) translate3d(0,0,0px)`;
    },
    // wait till events are done triggering before updating with callback
    debouncer: function(func, wait, immediate) {
      let timeout;
      return function() {
        let context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    },

    // limit the amount of calls being triggered per second
    throttle : function(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      let last,
          deferTimer;
      return function () {
        let context = scope || this;

        let now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }
  };

  $(document).ready(MEPHYSTO.init);
  // window.onload = MEPHYSTO.init;
  let percentage = 0,
      percText = document.getElementsByClassName('percentage')[0],
      percRect = document.getElementsByClassName('moving-counter')[0],
      percRectRotate = 0,
      myVar = setInterval(ticker, 1000);

  function ticker() {
    percentage++;
    percRectRotate++;
    percentage = percentage > 100 ? 0 : percentage;
    percText.innerHTML = percentage + "%";
    percRect.style.transform = `rotate(${percRectRotate}deg)`;
  }
}());</textarea
              >
            </div>
          </div>
          <div class="output">
            <iframe id="if"></iframe>
          </div>

          <!-- <textarea ref="code" name="code">
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>HTML5 canvas demo</title>
    <style>p {font-family: monospace;}</style>
  </head>
  <body>
    <p>Canvas pane goes here:</p>
    <canvas id=pane width=300 height=200></canvas>
    <script>
      var canvas = document.getElementById('pane');
      var context = canvas.getContext('2d');

      context.fillStyle = 'rgb(250,0,0)';
      context.fillRect(10, 10, 55, 50);

      context.fillStyle = 'rgba(0, 0, 250, 0.5)';
      context.fillRect(30, 30, 55, 50);
    </script>
  </body>
</html>
</textarea
          >

          <iframe id="preview"></iframe> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
function isArrayFn(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

//
export default {
  name: '',
  data() {
    return {
      drawer: false,
      direction: 'ltr',
    }
  },
  mounted() {},
  methods: {
    copy() {
      const inputElement = document.querySelector('#hhh')
      inputElement.select()
      document.execCommand('copy')
    },
    open() {
      let htmleditor = CodeMirror.fromTextArea(this.$refs.testcode, {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'text/html',
        extraKeys: {
          'Ctrl-Q': function(cm) {
            cm.foldCode(cm.getCursor())
          },
          F4: function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // theme: 'monokai',
        // theme: 'ambiance',
      })
      let csseditor = CodeMirror.fromTextArea(this.$refs.csscode, {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'css',
        extraKeys: {
          'Ctrl-Q': function(cm) {
            cm.foldCode(cm.getCursor())
          },
          F4: function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // theme: 'monokai',
        // theme: 'ambiance'
      })
      let jseditor = CodeMirror.fromTextArea(this.$refs.jscode, {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        extraKeys: {
          'Ctrl-Q': function(cm) {
            cm.foldCode(cm.getCursor())
          },
          F4: function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // theme: 'monokai',
        // theme: 'ambiance'
      })
      let delay1
      htmleditor.on('change', () => {
        clearTimeout(delay1)
        delay1 = setTimeout(this.updatePreview1, 500)
      })
      csseditor.on('change', () => {
        clearTimeout(delay1)
        delay1 = setTimeout(this.updatePreview1, 500)
      })
      jseditor.on('change', () => {
        clearTimeout(delay1)
        delay1 = setTimeout(this.updatePreview1, 500)
      })
      this.htmleditor = htmleditor
      this.csseditor = csseditor
      this.jseditor = jseditor
      // setTimeout(this.updatePreview1, 300)

      // let delay
      // // Initialize CodeMirror editor with a nice html5 canvas demo.
      // let editor = CodeMirror.fromTextArea(this.$refs.code, {
      //   mode: 'text/html',
      // })
      // editor.on('change', function() {
      //   clearTimeout(delay)
      //   delay = setTimeout(updatePreview, 300)
      // })

      // function updatePreview() {
      //   let previewFrame = document.getElementById('preview')
      //   let preview = previewFrame.contentDocument || previewFrame.contentWindow.document
      //   preview.open()
      //   preview.write(editor.getValue())
      //   preview.close()
      // }
      // setTimeout(updatePreview, 300)
    },
    run() {
      let htmleditor = CodeMirror.fromTextArea(this.$refs.testcode, {
        lineNumbers: true,
        mode: 'text/html',
        // theme: 'monokai',
        // theme: 'ambiance',
      })
      let csseditor = CodeMirror.fromTextArea(this.$refs.csscode, {
        lineNumbers: true,
        mode: 'css',
        // theme: 'monokai',
        // theme: 'ambiance'
      })
      let jseditor = CodeMirror.fromTextArea(this.$refs.jscode, {
        lineNumbers: true,
        mode: 'javascript',
        // theme: 'monokai',
        // theme: 'ambiance'
      })
      let jqbb = 'https://www.jq22.com/jquery/jquery-1.10.2.js'
      let codehtml = htmleditor.getValue()
      let codecss = '<style>' + csseditor.getValue() + '</style>'
      let codejs = '<scr' + 'ipt>' + jseditor.getValue() + '</scr' + 'ipt>'
      let codebb = '<scr' + 'ipt src=' + jqbb + '>' + '</scr' + 'ipt>'
      let oLdvu_e1 = window.document.getElementById('if').contentWindow.document
      oLdvu_e1.open()
      oLdvu_e1.write(codecss + codebb + codehtml + codejs)
      oLdvu_e1.close()
    },
    ll() {
      let NocOLUAPh1 = 1
      let bLv2
      let Codeshow = () => {
        NocOLUAPh1++
        if (NocOLUAPh1 > 2) {
          clearInterval(bLv2)
          NocOLUAPh1 = 1
          this.run()
        }
      }
      $('textarea').bind('input propertychange', function() {
        NocOLUAPh1 = 1
        clearInterval(bLv2)
        bLv2 = setInterval(Codeshow, 1000)
      })
    },
    test() {
      $(function() {
        bindResize(document.getElementById('editor_pane'))
      })
      function bindResize(el) {
        var els = el.style,
          x = (y = 0)
        $('#tz').mousedown(function(e) {
          $('.zz').css('display', 'block')
          ;(x = e.clientX - el.offsetWidth),
            el.setCapture
              ? (el.setCapture(),
                (el.onmousemove = function(ev) {
                  mouseMove(ev || event)
                }),
                (el.onmouseup = mouseUp))
              : $(document)
                  .bind('mousemove', mouseMove)
                  .bind('mouseup', mouseUp)
          e.preventDefault()
        })
        $('#tz').mouseup(function() {
          $('.zz').css('display', 'none')
        })
        function mouseMove(e) {
          $('.editor_pane').width(e.clientX - x + 'px')
        }
        function mouseUp() {
          el.releaseCapture
            ? (el.releaseCapture(), (el.onmousemove = el.onmouseup = null))
            : $(document)
                .unbind('mousemove', mouseMove)
                .unbind('mouseup', mouseUp)
        }
      }
    },
    updatePreview1() {
      let jqbb = 'https://www.jq22.com/jquery/jquery-1.10.2.js'
      let codehtml = this.htmleditor.getValue()
      let codecss = '<style>' + this.csseditor.getValue() + '</style>'
      let codejs = '<scr' + 'ipt>' + this.jseditor.getValue() + '</scr' + 'ipt>'
      let codebb = '<scr' + 'ipt src=' + jqbb + '>' + '</scr' + 'ipt>'
      let oLdvu_e1 = window.document.getElementById('if').contentWindow.document
      oLdvu_e1.open()
      oLdvu_e1.write(codecss + codebb + codehtml + codejs)
      oLdvu_e1.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.mm {
  left: 40px;
  top: 0;
  right: 0;
  bottom: 25px;
  position: absolute;
  background: #f3f3f3;
}
.editor_pane {
  position: relative;
  float: left;
  border-right: 1px solid #ccc;
  height: 100%;
  width: 30%;
  min-width: 10%;
  max-width: 90%;
  position: relative;
  background-color: #222222;
}
.output {
  position: relative;
  overflow: hidden;
  background-color: #222222;
  height: 100%;
}
.common {
  height: 33.333%;
  position: relative;
  margin: 0px;
  padding: 0px;
  display: block;
  border-bottom: 1px solid #424242;
}
#if {
  width: 100%;
  height: 100%;
  border: 0px none;
  display: inline;
}
.handler {
  position: absolute;
  top: 0px;
  width: 5px;
  height: 100%;
  right: -1px;
  background-color: #2c2e2f;
  z-index: 88;
  cursor: col-resize;
}
</style>
<style lang="scss">
// .nunu-drawer {
//   overflow: scroll;
// }
</style>
