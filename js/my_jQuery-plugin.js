/*
 需求：
 1. 給 $ 添加4個工具方法:
   * min(a, b) : 返回較小的值
   * max(c, d) : 返回較大的值
   * leftTrim() : 去掉字符串左邊的空格
   * rightTrim() : 去掉字符串右邊的空格
 2. 給jQuery對象 添加3個功能方法:
 * checkAll() : 全選
 * unCheckAll() : 全不選
 * reverseCheck() : 全反選
 */
(function () {

  // 擴展$的方法
  $.extend({
    min: function (a, b) {
      return a < b ? a : b
    },
    max: function (a, b) {
      return a > b ? a : b
    },
    leftTrim: function (str) {
      return str.replace(/^\s+/, '')
    },
    rightTrim: function (str) {
      return str.replace(/\s+$/, '')
    }
  })

  // 擴展jQuery對象的方法
  $.fn.extend({
    checkAll: function () {
      this.prop('checked', true) // this是jQuery對象(當jQuery對象的方法是被jQuery對象調用所以this是jQuery對象)
    },
    unCheckAll: function () {
      this.prop('checked', false)
    },
    reverseCheck: function () {
      this.each(function () {// this是jQuery對象       
        this.checked = !this.checked // this是dom元素
      })
    }
  })

})()