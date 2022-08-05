/*
 1. 鼠標移入顯示,移出隱藏
 目標: 手機京東, 客戶服務, 網站導航, 我的京東, 去購物車結算, 全部商品
 2. 鼠標移動切換二級導航菜單的切換顯示和隱藏
 3. 輸入搜索關鍵字, 列表顯示匹配的結果
 4. 點擊顯示或者隱藏更多的分享圖標
 5. 鼠標移入移出切換地址的顯示隱藏
 6. 點擊切換地址tab

 7. 鼠標移入移出切換顯示迷你購物車
 8. 點擊切換產品選項 (商品詳情等顯示出來)

 9. 點擊向右/左, 移動當前展示商品的小圖片
 10. 當鼠標懸停在某個小圖上,在上方顯示對應的中圖
 11. 當鼠標在中圖上移動時, 顯示對應大圖的附近部分區域
 */

/*
1. 對哪個/些元素綁定什麽監聽?
2. 對哪個/些元素進行什麽DOM操作?
 */
$(function () {

  showhide()
  hoverSubMenu()
  search()
  share()
  address()
  clickTabs()
  hoverMiniCart()
  clickProductTabs()
  moveMiniImg()

  /*
   1. 鼠標移入顯示,移出隱藏
   目標: 手機京東, 客戶服務, 網站導航, 我的京東, 去購物車結算, 全部商品
   */
  function showhide() {
    $('[name=show_hide]').hover(function () { // 顯示
      var id = this.id + '_items'
      $('#' + id).show()
    }, function () {// 隱藏
      var id = this.id + '_items'
      $('#' + id).hide()
    })
  }

  /*
  2. 鼠標移動切換二級導航菜單的切換顯示和隱藏
  */
  function hoverSubMenu() {
    $('#category_items>div').hover(function () {
      $(this).children(':last').show()
    }, function () {
      $(this).children(':last').hide()
    })
  }

  /*
  3. 輸入搜索關鍵字, 列表顯示匹配的結果
  */
  function search() {
    $('#txtSearch')
      .on('keyup focus', function () {
        // 如果輸入框有文本才顯示列表
        var txt = this.value.trim()
        if (txt) {
          $('#search_helper').show()
        }
      })
      .blur(function () {
        // 隱藏列表
        $('#search_helper').hide()
      })
  }

  /*
  4. 點擊顯示或者隱藏更多的分享圖標
  */
  function share() {
    var isOpen = false //標識當前的狀態(初始為關閉)
    var $shareMore = $('#shareMore')
    var $parent = $shareMore.parent()
    /*
    prevAll():找兄弟元素返回的jQuery對象中的元素排列是由後往前存放
    console.log($shareMore.prevAll())
    jQuery.fn.init(6) [a.share_douban, a.share_kaixin, a.share_renren, a.share_qq, a.share_sina, span, prevObject: jQuery.fn.init(1)]
    0: a.share_douban
    1: a.share_kaixin
    2: a.share_renren
    3: a.share_qq
    4: a.share_sina
    5: span
    length: 6
    */
    var $as = $shareMore.prevAll('a:lt(2)')
    var $b = $shareMore.children()

    $shareMore.click(function () {

      if (isOpen) { // 去關閉
        isOpen = false
        $parent.css('width', 155)
        $as.hide()
        $b.removeClass('backword')
      } else { // 去打開
        isOpen = true
        $parent.css('width', 200)
        $as.show()
        $b.addClass('backword')
      }

      // isOpen = !isOpen
    })
  }

  /*
   5. 鼠標移入移出切換地址的顯示隱藏
   */
  function address() {
    //#region 方式一
    var $select = $('#store_select')

    $select.hover(function () {
      $(this).children(':gt(0)').show()
    }, function () {
      $(this).children(':gt(0)').hide()
    })
      .children(':last')//在下拉選單加完hover監聽後緊接著找到子元素加上監聽，此方式為jQuery鏈式用
      .click(function () {
        // $(this).children(':gt(0)').hide()// 不能用, 此時this是關閉圖示這個子元素不是下拉選單
        $select.children(':gt(0)').hide()
      })
    //#endregion

    //#region 方式二
    /*var $select = $('#store_select')

    $select.hover(function () {
      $(this).children(':gt(0)').show()
    }, function () {
      $(this).children(':gt(0)').hide()
    })

    $select.children(':last').click(function () {
      $select.children(':gt(0)').hide()
    })*/
    //#endregion
  }

  /*
   6. 點擊切換地址tab
   */
  function clickTabs() {
    $('#store_tabs>li').click(function () {
      //1.移除所有li的class
      $('#store_tabs>li').removeClass('hover')
      // $('#store_tabs>li').removeAttr('class')
      // $('#store_tabs>li').attr('class','')

      //2.對當前點擊的DOM元素加入class
      this.className = 'hover'//原生javascript
      // $(this).addClass('hover')//jQuery
    })
  }

  /*
   7. 鼠標移入移出切換顯示迷你購物車
   */
  function hoverMiniCart() {
    $('#minicart').hover(function () {
      this.className = 'minicart'
      $(this).children(':last').show()
    }, function () {
      this.className = ''
      $(this).children(':last').hide()
    })
  }

  /*
   8. 點擊切換產品選項 (商品詳情等顯示出來)
   */
  function clickProductTabs() {
    var $lis = $('#product_detail>ul>li')
    var $contents = $('#product_detail>div:gt(0)')
    $lis.click(function () {
      //1.移除所有li的class
      $lis.removeClass('current')

      //2.對當前點擊的DOM元素加入class
      this.className = 'current'

      //3.隱藏所有$contents
      $contents.hide()

      //4.顯示當前對應的content,所以是過濾對象不是查找(找兄弟父母孩子)對象
      var index = $(this).index()
      // $contents.eq(index).show()//jQuery
      $contents[index].style.display = 'block'//原生javascript
    })
  }

  /*
   9. 點擊向右/左, 移動當前展示商品的小圖片
   */
  function moveMiniImg() {
    var $as = $('#preview>h1>a')
    var $backward = $as.first()
    var $forward = $as.last()
    var $Ul = $('#icon_list')
    var SHOW_COUNT = 5
    var imgCount = $Ul.children('li').length
    var moveCount = 0 //移動的次數(箭頭向右為正, 向左為負)
    var liWidth = $Ul.children(':first').width()//每次移動的寬度

    // 初始化更新
    if (imgCount > SHOW_COUNT) {
      // $forward[0].className = 'forward'
      $forward.attr('class', 'forward')
    }

    // 給向右的按鈕綁定點擊監聽
    $forward.click(function () {
      // 判斷是否需要移動, 如果不需要直接結束

      /*
      ex:
      向右第一次點擊:0=7-5 =>false
      moveCount=1
      更新向右的按鈕:1=7-5 =>false

      向右第二次點擊:1=7-5 =>false
      moveCount=2
      更新向右的按鈕:2=7-5 =>true

      向右第三次點擊:2=7-5 =>true
       */

      if (moveCount === imgCount - SHOW_COUNT) {//移動次數=圖片總數-圖片顯示數量
        return
      }
      moveCount++

      //更新向左的按鈕
      $backward.attr('class', 'backward')

      // 更新向右的按鈕
      if (moveCount === imgCount - SHOW_COUNT) {
        $forward.attr('class', 'forward_disabled')
      }

      // 移動ul
      // $Ul.css({
      //   left: -moveCount * liWidth
      // })

      $Ul.css('left', -moveCount * liWidth)
    })

    // 給向左的按鈕綁定點擊監聽
    $backward.click(function () {
      // 判斷是否需要移動, 如果不需要直接結束
      if (moveCount === 0) {
        return
      }
      moveCount--

      //更新向右的按鈕            
      $forward.attr('class', 'forward')

      // 更新向左的按鈕
      if (moveCount === 0) {
        $backward.attr('class', 'backward_disabled')
      }

      // 移動ul
      $Ul.css({
        left: -moveCount * liWidth
      })
    })
  }
})