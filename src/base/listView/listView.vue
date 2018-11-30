<template>
  <scroll
    class="listview"
    :data="data" ref="listView"
    :listenScroll="listenScroll"
    @scroll="onScroll"
    :probeType="probeType"
  >
    <ul>
      <li class="list-group"   v-for="(listGroup, index) of data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{listGroup.title}}</h2>
        <ul>
          <li v-for="item in listGroup.item" :key="item.id"  @click="OnSelectItem(item)" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortTouchMove" @touchEnd="onShortTouchEnd" >
      <ul>
        <li class="item" :class="{current:  currentIndex === index}" v-for="(item, index) of shortcutList" :key="index" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixTitle" ref="fixed">
      <h1 class="fixed-title">{{fixTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length" >
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascipt-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'
const SHORTCUT_ITEM_HEIGHT = 18
const FIXED_TITLE_HEIGHT = 30
export default {
  name: 'ListView',
  created () {
    this.touch = {}
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = []
    this.fixTop = 0
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substring(0, 1)
      })
    },
    fixTitle () {
      if (this.scrollY > 0) return ''
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newValue) {
      if (newValue > 0) this.currentIndex = 0
      const value = -newValue
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        const topHeight = this.listHeight[i]
        const bottomHeight = this.listHeight[i + 1]
        if (value >= topHeight && value < bottomHeight) {
          this.diff = bottomHeight - value
          this.currentIndex = i
        }
      }
    },
    diff (newValue) {
      let fixTop = (newValue > 0 && newValue < FIXED_TITLE_HEIGHT) ? newValue - FIXED_TITLE_HEIGHT : 0
      if (this.fixTop === fixTop) return
      this.fixTop = fixTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    OnSelectItem (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      this.touch.anchorIndex = parseInt(getData(e.target, 'index'), 10)
      this.touch.lastY = e.touches[0].pageY
      this._scrollTo(this.touch.anchorIndex)
    },
    onShortTouchMove (e) {
      this.touch.currentY = e.touches[0].pageY
      const offset = (this.touch.currentY - this.touch.lastY) / SHORTCUT_ITEM_HEIGHT | 0
      const anchorIndex = this.touch.anchorIndex + offset
      this._scrollTo(anchorIndex)
    },
    onShortTouchEnd (e) {
      this.touch = {}
    },
    onScroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) return
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      const list = this.$refs.listGroup
      this.listHeight = []
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        const clientHeight = list[i].clientHeight
        height += clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
