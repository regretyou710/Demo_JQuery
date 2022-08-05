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
  var imgCount = $points.length
  var index = 0 //當前下標
  var moving = false // 標識是否正在翻頁(默認沒有)

  // 1. 點擊向右(左)的圖標, 平滑切換到下(上)一頁
  $next.click(function () {
    // 平滑翻到下一頁
    nextPage(true)
  })

  $prev.click(function () {
    // 平滑翻到上一頁
    nextPage(false)
  })

  // 3. 每隔3s自動滑動到下一頁
  var intervalId = setInterval(function () {
    nextPage(true)
  }, 1000)

  // 4. 當鼠標進入圖片區域時, 自動切換停止, 當鼠標離開後,又開始自動切換
  $container.hover(function () {
    // 清除定時器
    clearInterval(intervalId)
  }, function () {
    intervalId = setInterval(function () {
      nextPage(true)
    }, 1000)
  })

  // 6. 點擊圓點圖標切換到對應的頁
  $points.click(function () {
    // 目標頁的下標
    var targetIndex = $(this).index()
    // 只有當點擊的不是當前頁的圓點時才翻頁
    if (targetIndex != index) {
      nextPage(targetIndex)
    }
  })

  /**
   * 平滑翻頁
   * @param next
   * true: 下一頁
   * false: 上一頁
   * 數值: 指定下標頁
   */
  function nextPage(next) {
    /*
      總的時間: TIME=400
      單元移動的間隔時間: ITEM_TIME = 20
      總的偏移量: offset
      單元移動的偏移量: itemOffset = offset/(TIME/ITEM_TIME)

      啟動循環定時器不斷更新$list的left, 到達目標處停止停止定時器
     */

    //如果正在翻頁, 直接結束
    if (moving) { //已經正在翻頁中
      return
    }
    moving = true // 標識正在翻頁

    // 總的偏移量: offset
    var offset = 0

    // 計算offset
    if (typeof next === 'boolean') {
      offset = next ? -PAGE_WIDTH : PAGE_WIDTH
    } else {
      offset = -(next - index) * PAGE_WIDTH//目標下標-當前下標
    }

    // 計算單元移動的偏移量: itemOffset
    var itemOffset = offset / (TIME / ITEM_TIME)

    // 得到當前的left值
    /**
     * currLeft會因為閉包的產生使變量值不會從內存釋放(消失)
     * 閉包作用:
     * 1. 使用函數內部的變量在函數執行完後，仍然存活在內存中(延長區域變數的生命週期)
     * 2. 讓函數外部可以操作(讀寫)到函數內部的數據(變量/函數)
     */
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

        // 標識翻頁停止
        moving = false

        // 如果到達了最右邊的圖片(1.jpg), 跳轉到最左邊的第2張圖片(1.jpg)
        if (currLeft === -(imgCount + 1) * PAGE_WIDTH) {
          currLeft = -PAGE_WIDTH
        } else if (currLeft === 0) {
          // 如果到達了最左邊的圖片(5.jpg), 跳轉到最右邊的第2張圖片(5.jpg)
          currLeft = -imgCount * PAGE_WIDTH
        }
      }

      // 設置left
      $list.css('left', currLeft)
    }, ITEM_TIME)

    // 更新圓點
    updatePoints(next)
  }

  /**
   * 更新圓點
   * @param next
   */
  function updatePoints(next) {

    // 計算出目標圓點的下標targetIndex
    var targetIndex = 0
    if (typeof next === 'boolean') {
      if (next) {
        targetIndex = index + 1   // [0, imgCount-1]
        if (targetIndex === imgCount) {// 此時看到的是1.jpg-->第1個圓點
          targetIndex = 0
        }
      } else {
        targetIndex = index - 1
        if (targetIndex === -1) { // 此時看到的是5.jpg-->第5個圓點
          targetIndex = imgCount - 1
        }
      }
    } else {
      targetIndex = next
    }

    // 將當前index的<span>的class移除
    // $points.eq(index).removeClass('on')
    $points[index].className = ''//原生javascript寫法
    // 給目標圓點添加class='on'
    // $points.eq(targetIndex).addClass('on')
    $points[targetIndex].className = 'on'//原生javascript寫法

    // 將index更新為targetIndex
    index = targetIndex
  }
})