/*
 功能說明:
 1. 點擊向右(左)的圖標, 平滑切換到下(上)一頁
 2. 無限循環切換: 第一頁的上一頁為最後頁, 最後一頁的下一頁是第一頁
 3. 每隔3s自動滑動到下一頁
 4. 當鼠標進入圖片區域時, 自動切換停止, 當鼠標離開後,又開始自動切換
 5. 切換頁面時, 下面的圓點也同步更新
 6. 點擊圓點圖標切換到對應的頁

 bug: 快速點擊時, 翻頁不正常
 */
$(function () {
  var $container = $('#container')
  var $list = $('#list')
  var $points = $('#pointsDiv>span')
  var $prev = $('#prev')
  var $next = $('#next')
  var PAGE_WIDTH = 600 //一頁的寬度
  var TIME = 400 // 翻頁的持續時間
  var ITEM_TIME = 20 // 單元移動的間隔時間
 
  // 1. 點擊向右(左)的圖標, 平滑切換到下(上)一頁
  $next.click(function () {
    // 平滑翻到下一頁
    nextPage(true)
  })

  $prev.click(function () {
    // 平滑翻到上一頁
    nextPage(false)
  })

  /**
   * 平滑翻頁
   * @param next
   * true: 下一頁
   * false: 上一頁
   */
  function nextPage(next) {
    /*
      總的時間: TIME=400
      單元移動的間隔時間: ITEM_TIME = 20
      總的偏移量: offset
      單元移動的偏移量: itemOffset = offset/(TIME/ITEM_TIME)

      啟動循環定時器不斷更新$list的left, 到達目標處停止停止定時器
     */

    // 總的偏移量: offset
    var offset = 0

    // 計算offset    
    offset = next ? -PAGE_WIDTH : PAGE_WIDTH

    // 計算單元移動的偏移量: itemOffset
    var itemOffset = offset / (TIME / ITEM_TIME)

    // 得到當前的left值
    var currLeft = $list.position().left

    // 計算出目標處的left值
    var targetLeft = currLeft + offset

    // 啟動循環定時器不斷更新$list的left, 到達目標處停止停止定時器
    var intervalId = setInterval(function () {
      // 計算出最新的currLeft
      currLeft += itemOffset

      if (currLeft === targetLeft) { // 到達目標位置
        // 清除定時器
        clearInterval(intervalId)
      }

      // 設置left
      $list.css('left', currLeft)
    }, ITEM_TIME)
  }
})