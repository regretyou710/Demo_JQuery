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
})