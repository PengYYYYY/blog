import { h } from 'vue'
import { VPTheme } from '@vue/theme'
import Banner from './components/Banner.vue'
import './styles/index.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {
      banner: () => h(Banner)
    })
  },
})
