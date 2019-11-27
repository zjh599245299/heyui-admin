<style lang="less">
.app-home-vue {
  .home-part-body {
    height: 350px;

    .echarts-vue {
      height: 350px;
    }
  }

  .home-part-body2 {
    height: 420px;

    .echarts-vue {
      height: 420px;
    }
  }

  .progress-div {
    > p {
      padding: 8px 0;
    }

    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }

      &-text {
        width: 40px;
      }
    }
  }
}
</style>
<template>
  <div class="app-home-vue">
    <Row :space="30">
      <Cell :lg="16" :md="24" :sm="24" :xl="16" :xs="24">
        <div class="h-panel">
          <div class="relative">
            <Tabs class="common-panel-tabs" :datas="{ type1: '数据走势', type2: '数据分布' }" v-model="type" />
            <div class="middle-right" style="right: 25px;">
              <span @click="openMore" class="text-hover">查看更多</span>
            </div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1" key="type1" v-if="type === 'type1'"></Chart>
            <Chart :options="data3" key="type2" v-if="type === 'type2'"></Chart>
          </div>
        </div>
      </Cell>
      <Cell :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">订单统计</div>
            <div class="h-panel-right">
              <span class="gray-color">总共达成</span>
              <i class="h-split"></i>
              <span class="font20 primary-color">200</span>
              <i class="h-split"></i>
              <span class="gray-color">W</span>
            </div>
          </div>
          <div class="h-panel-body progress-div home-part-body">
            <p>
              <Progress :percent="99" color="green">
                <span slot="title">订单状态</span>
                <span slot="text">4个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="88" color="blue">
                <span slot="title">订单状态</span>
                <span slot="text">0个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="55" color="red">
                <span slot="title">订单状态</span>
                <span slot="text">0个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="77" color="blue">
                <span slot="title">订单状态</span>
                <span slot="text">0个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="66" color="yellow">
                <span slot="title">订单状态</span>
                <span slot="text">0个</span>
              </Progress>
            </p>
          </div>
        </div>
      </Cell>

      <Cell :lg="16" :md="24" :sm="24" :xl="16" :xs="24">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">数据比例</div>
          </div>
          <div class="home-part-body2">
            <Chart :options="data2"></Chart>
          </div>
        </div>
      </Cell>

      <Cell :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">数据比例</div>
          </div>
          <div class="h-panel-body home-part-body2">
            <Row :space="20">
              <Cell :width="10" class="text-right">
                <h-circle :percent="76" :size="90" :stroke-width="10">
                  <p>
                    <span class="font28">{{ parseInt((123 * 76) / 100) }}</span>
                    <span class="gray-color"> / 123</span>
                  </p>
                </h-circle>
              </Cell>
              <Cell :width="14">
                <p class="gray-color">目前达成比例</p>
                <p class="dark-color font22">122,332,98</p>
              </Cell>
              <p class="clearfix"></p>
              <Cell :width="10" class="text-right">
                <h-circle :percent="99" :size="90" :stroke-width="10" color="green">
                  <p>
                    <span class="font28">{{ parseInt((123 * 76) / 100) }}</span>
                    <span class="gray-color"> / 123</span>
                  </p>
                </h-circle>
              </Cell>
              <Cell :width="14">
                <p class="gray-color">目前达成比例</p>
                <p class="dark-color font22">122,332,98</p>
              </Cell>
              <p class="clearfix"></p>
              <Cell :width="10" class="text-right">
                <h-circle :percent="22" :size="90" :stroke-width="10" color="red">
                  <p>
                    <span class="font28">{{ parseInt((123 * 76) / 100) }}</span>
                    <span class="gray-color"> / 123</span>
                  </p>
                </h-circle>
              </Cell>
              <Cell :width="14">
                <p class="gray-color">目前达成比例</p>
                <p class="dark-color font22">122,332,98</p>
              </Cell>
            </Row>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from '../demo-components/components/datas/data1';
import data2 from '../demo-components/components/datas/data2';
import data3 from '../demo-components/components/datas/data4';

export default {
  data() {
    return {
      data1,
      data2,
      data3,
      type: 'type1'
    };
  },
  methods: {
    openMore() {
      this.$router.push({ name: 'Chart' });
    }
  },
  mounted() {}
};
</script>
