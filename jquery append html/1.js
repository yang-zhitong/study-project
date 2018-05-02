html: function (value) {
  return access(this, function (value) {
    var elem = this[0] || {},
      i = 0,
      l = this.length;

    // 直接获取值
    if (value === undefined && elem.nodeType === 1) {
      return elem.innerHTML;
    }

    // See if we can take a shortcut and just use innerHTML
    //rnoInnerhtml = <script|<style|<link/i 
    //rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i  获取标签名


    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
      !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
      // wrapMap 是对一些特殊元素进行包裹
      // 比如td、option，td包裹上<table><tbody><tr></tr></tbody></table>
      // 还有一些对字符串的预处理 比如<span/> 会成为<span></span>
      value = jQuery.htmlPrefilter(value);

      try {
        for (; i < l; i++) {
          elem = this[i] || {};

          // Remove element nodes and prevent memory leaks
          if (elem.nodeType === 1) {
            //清除绑定的事件和数据
            jQuery.cleanData(getAll(elem, false));
            //elem.innerHTML = ”div“是可以的
            elem.innerHTML = value;
          }
        }

        elem = 0;
        // If using innerHTML throws an exception, use the fallback method
      } catch (e) {}
    }

    if (elem) {
      //不能通过innerHTML直接添加的通过一下方式添加 比如
      //$("div.shadow").html($("<div>"))
      this.empty().append(value);
    }
  }, null, value, arguments.length);
}