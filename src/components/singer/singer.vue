<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascipt-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listView/listView'
const HOT_TITLE = '热门歌手'
const HOT_SINGER_LEN = 10

export default {
  name: 'Singer',
  data () {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList()
        .then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSingerList(res.data.list)
          }
        })
    },
    _normalizeSingerList (list) {
      const map = {
        hot: {
          title: HOT_TITLE,
          item: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(new Singer({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            uid: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push(new Singer({
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          uid: item.Fsinger_mid
        }))
      })
      // 对数据进行排序
      const hot = []
      const ret = []
      for (let key in map) {
        const val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_TITLE) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt() - b.title.charCodeAt()
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
