<template>
  <div>
    <div class="h-row" style="margin: -12px -13px -13px -12px;">
      <div
        v-for="icon in icons"
        :key="icon"
        class="h-col h-col-xl-3 h-col-lg-4 h-col-md-6 h-col-sm-12 h-col-xs-12"
        style="padding: 12px 13px 13px 12px;"
      >
        <div class="icon-info">
          <div class="copy" @click="copy(icon)"></div>
          <p>
            <svg-icon :icon-class="'icon-' + icon" class="svgicon" />
          </p>
          <p style="margin-top: 20px;" class="text-ellipsis">{{ icon }}</p>
        </div>
      </div>
      <div class="h-row-clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-icons',
  data() {
    return {
      icons: [
        'zuojiantou',
        'zhudongchuda',
        'zhankai',
        'zan',
        'yunshuzhong',
        'yuyin',
        'youjiantou',
        'yijianfankui',
        'xinxi',
        'xinzeng',
        'xihuan',
        'woyaomaiche',
        'weizhangchaxun',
        'wanchengdingdan',
        'tuihui',
        'tupian',
        'tianjiawenjian',
        'tianjia',
        'suo',
        'suoxiao',
        'sousuo',
        'shuaxin',
        'shujufenxi',
        'shouqi',
        'shoucang',
        'shijian',
        'shengxu',
        'shenpi',
        'shenqing',
        'shezhishoukuanren',
        'shezhi',
        'shangchengdingdan',
        'shanjian',
        'shanchu',
        'saoyisao',
        'queren',
        'quanbudingdan',
        'quanbu',
        'qitadingdan',
        'pingjiaguanli',
        'monidanping',
        'manyunbaozhuanlan',
        'manmanka',
        'luntan',
        'lingdang',
        'lichengjisuan',
        'kongchezhaohuo',
        'kehufuwu',
        'kefu',
        'jingxuanluxian',
        'jingxuanlipin',
        'jingpinzhuanxian',
        'jiangxu',
        'jianpan',
        'jisuan',
        'huanhaoche',
        'huati',
        'guolufeifapiao',
        'guangbo',
        'guanbi',
        'gengduo1',
        'gengduo',
        'fulizhongxin',
        'fuwu',
        'fangda',
        'falvgonggao',
        'fasong',
        'ershouche',
        'dingyichetequan',
        'dingdan',
        'daoda',
        'danwei',
        'daiqianhetong',
        'daipingjia',
        'daiqianxieyi',
        'chongzhi',
        'chehui',
        'chechang',
        'caidan',
        'bianji',
        'baoxian',
        'baitiaoedu'
      ]
    };
  },
  methods: {
    copy(icon) {
      this.$Clipboard({
        text: `<svg-icon icon-class="icon-${icon}"/>`,
        showSuccessTip: '复制成功'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.icon-info {
  position: relative;
  background: #f0f6ff;
  border-radius: 3px;
  padding: 20px 0;
  text-align: center;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background: #e6ebf2;
    .copy {
      display: flex;
    }
  }
  .copy {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: 0;
    bottom: 0;
  }
  .svgicon {
    width: 28px;
    height: 28px;
  }
}
</style>
