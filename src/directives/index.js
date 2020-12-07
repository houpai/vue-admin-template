import Vue from "vue";
import moment from "moment";

/**
 *@desc 高度根据不同分辨率的变化而变化 v-height = 30 元素节点的高度即为 100% - 30
 *@author houpai
 *@date 2019/12/05 08:56:04
 */
Vue.directive("height", {
  bind: function (el, binding) { //初始化动作,只调用一次
    function handleResize() {
      let viewHeight = $(window).height();
      let deleHeight = binding.value;
      $(el).height(viewHeight - deleHeight);
    }

    handleResize();
    el._vueAutoHeight_ = handleResize;
    window.addEventListener("resize", handleResize);
  },
  unbind: function (el) {
    window.removeEventListener("resize", el._vueAutoHeight_);
    delete el._vueAutoHeight_;
  }
});

/**
 *@desc header右侧时间格式化
 *@author houpai
 *@date 2019/12/05 08:56:51
 */
Vue.directive("tranTime", {
  bind(el, val) {
    if (val.value) {
      $(el).html(moment(val.value).format("YYYY/MM/DD HH:mm:ss"));
    } else {
      setInterval(function () {
        $(el).html(moment().format("YYYY-MM-DD HH:mm:ss"));
      }, 1000);
    }
  }
});

