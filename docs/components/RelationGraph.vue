<template>
  <div class="relation-graph">
    <div v-if="showToolbar" class="rg-toolbar">
      <input
        v-model="searchText"
        class="rg-search"
        type="text"
        :placeholder="searchPlaceholder"
      />
      <button class="rg-btn" type="button" @click="reset">重置</button>
      <span class="rg-hint">{{ hint }}</span>
    </div>

    <div class="rg-stage">
      <div
        ref="containerRef"
        class="rg-canvas"
        :style="{ height: canvasHeight }"
      />

      <aside v-if="showPanel" class="rg-panel">
        <template v-if="activeNode">
          <div class="rg-panel-cluster">
            {{ clusterName(activeNode.cluster) }}
          </div>
          <h4 class="rg-panel-title">{{ activeNode.label }}</h4>
          <p v-if="activeNode.def" class="rg-panel-def">
            {{ activeNode.def }}
          </p>
          <div v-if="relatedLabels.length" class="rg-panel-related">
            <b>关联概念：</b>{{ relatedLabels.join('、') }}
          </div>
        </template>
        <div v-else class="rg-panel-empty">
          点击左侧任意节点，查看它的定义并高亮关联概念。
        </div>
      </aside>
    </div>

    <div v-if="clusters.length" class="rg-legend">
      <span v-for="c in clusters" :key="c.id" class="rg-legend-item">
        <i class="rg-dot" :style="{ background: c.color }" />{{ c.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

interface RGNode {
  id: string
  label: string
  cluster?: string
  def?: string
}
interface RGEdge {
  source: string
  target: string
  label?: string
}
interface RGCluster {
  id: string
  name: string
  color: string
}

const props = withDefaults(
  defineProps<{
    nodes: RGNode[]
    edges: RGEdge[]
    clusters?: RGCluster[]
    height?: string
    /** grouped: 按 cluster 分行摆放,结构清晰,适合"概念地图"场景(默认)。force: 力导向自由布局。 */
    layout?: 'grouped' | 'force'
    showToolbar?: boolean
    showPanel?: boolean
    searchPlaceholder?: string
    hint?: string
  }>(),
  {
    clusters: () => [],
    height: '560px',
    layout: 'grouped',
    showToolbar: true,
    showPanel: true,
    searchPlaceholder: '搜索节点…',
    hint: '同色 = 同主题;箭头表示方向,线上文字说明关系。点击节点聚焦其关联概念,空白处或“重置”恢复。'
  }
)

const canvasHeight = ref(props.height)

const containerRef = ref<HTMLDivElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let graph: any = null
let themeObserver: MutationObserver | null = null
let sizeObserver: ResizeObserver | null = null

const searchText = ref('')
const activeId = ref<string | null>(null)
const hoverId = ref<string | null>(null)

const byId = computed(() =>
  Object.fromEntries(props.nodes.map((n) => [n.id, n]))
)

// 邻接表:节点 id -> 与之相连的节点 id 集合(无向,用于高亮关联概念)
const adjacency = computed(() => {
  const map: Record<string, Set<string>> = {}
  props.nodes.forEach((n) => {
    map[n.id] = new Set()
  })
  props.edges.forEach((e) => {
    map[e.source]?.add(e.target)
    map[e.target]?.add(e.source)
  })
  return map
})

const focusId = computed(() => hoverId.value || activeId.value)
const activeNode = computed(() =>
  focusId.value ? byId.value[focusId.value] : null
)
const relatedLabels = computed(() => {
  const f = focusId.value
  if (!f) return []
  return [...(adjacency.value[f] || [])]
    .map((id) => byId.value[id]?.label)
    .filter(Boolean) as string[]
})

function clusterColor(id?: string) {
  return props.clusters.find((c) => c.id === id)?.color || '#6c8cff'
}
function clusterName(id?: string) {
  return props.clusters.find((c) => c.id === id)?.name || ''
}

// 读取当前 VitePress 主题(light/dark)对应的 CSS 变量,让 G6 canvas 内的文字/连线跟随主题切换
function readTheme() {
  const s = getComputedStyle(document.documentElement)
  const pick = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback
  return {
    text: pick('--vp-c-text-2', '#666'),
    bg: pick('--vp-c-bg', '#fff'),
    border: pick('--vp-c-divider', '#e2e2e3')
  }
}

function edgeId(e: RGEdge, i: number) {
  return `${e.source}->${e.target}-${i}`
}

// 节点是按文字长度撑开的"药丸"形状,力导向布局的碰撞检测(nodeSize)要用同一个宽度才能真正防重叠
function nodeWidth(label?: string) {
  const len = label?.length || 4
  return Math.min(200, Math.max(56, len * 15 + 24))
}

// 按 cluster 分行摆放节点(同主题一行,自动换行),取代物理模拟布局。
// 结构固定、同主题必然相邻,比力导向的"随机大杂烩"更容易看清关系脉络。
function computeGroupedLayout(width: number) {
  const rowHeight = 46
  const subRowGap = 14
  const clusterGap = 40
  const padX = 20
  const padY = 30
  const colGap = 14

  const order = props.clusters.length
    ? props.clusters.map((c) => c.id)
    : [...new Set(props.nodes.map((n) => n.cluster || ''))]

  const positions: Record<string, { x: number; y: number }> = {}
  let y = padY

  order.forEach((clusterId) => {
    const list = props.nodes.filter((n) => (n.cluster || '') === clusterId)
    if (!list.length) return
    let x = padX
    let rowTop = y
    list.forEach((n) => {
      const w = nodeWidth(n.label)
      if (x + w > width - padX && x > padX) {
        x = padX
        rowTop += rowHeight + subRowGap
      }
      positions[n.id] = { x: x + w / 2, y: rowTop + rowHeight / 2 }
      x += w + colGap
    })
    y = rowTop + rowHeight + clusterGap
  })

  return { positions, height: Math.max(y - clusterGap + padY, 320) }
}

function buildGraphData(
  positions?: Record<string, { x: number; y: number }>
) {
  return {
    nodes: props.nodes.map((n) => ({
      id: n.id,
      data: { ...n },
      style: positions?.[n.id]
        ? { x: positions[n.id].x, y: positions[n.id].y }
        : undefined
    })),
    edges: props.edges.map((e, i) => {
      // 弧度按两端点距离缩放:相邻同行节点间距很短,固定弧度会把整条线拱进相邻节点的图形里,
      // 导致激活态高亮时那条边看起来"消失"在节点下方。距离越远才需要更大的弧度来避免线条重叠。
      let curveOffset = 18
      const from = positions?.[e.source]
      const to = positions?.[e.target]
      if (from && to) {
        const dist = Math.hypot(to.x - from.x, to.y - from.y)
        curveOffset = Math.min(40, Math.max(6, dist * 0.15))
      }
      return {
        id: edgeId(e, i),
        source: e.source,
        target: e.target,
        data: {
          label: e.label || '',
          sourceCluster: byId.value[e.source]?.cluster,
          curveOffset
        }
      }
    })
  }
}

function applyFocus() {
  if (!graph) return
  const f = focusId.value
  const connected = f ? adjacency.value[f] : null
  const q = searchText.value.trim().toLowerCase()
  const states: Record<string, string[]> = {}

  props.nodes.forEach((n) => {
    const searchDim = q !== '' && !n.label.toLowerCase().includes(q)
    const focusDim = f != null && n.id !== f && !connected?.has(n.id)
    if (f != null && n.id === f) states[n.id] = ['active']
    else if (searchDim || focusDim) states[n.id] = ['inactive']
    else states[n.id] = []
  })

  props.edges.forEach((e, i) => {
    const id = edgeId(e, i)
    if (!f) {
      states[id] = []
      return
    }
    states[id] =
      e.source === f || e.target === f ? ['active'] : ['inactive']
  })

  graph.setElementState(states)
}

function reset() {
  activeId.value = null
  hoverId.value = null
  searchText.value = ''
  applyFocus()
}

async function initGraph() {
  if (!containerRef.value) return
  const { Graph } = await import('@antv/g6')
  const theme = readTheme()
  const accent = props.clusters[0]?.color || '#6c8cff'

  // 显式测量容器宽度再建图:容器刚挂载时若尺寸还没定型(比如右侧目录还没让出空间),
  // 交给 G6 自动探测可能量到一个偏小的宽度,导致布局把节点都挤在一小块区域里。
  const rect = containerRef.value.getBoundingClientRect()
  const width = Math.max(rect.width, 320)

  let positions: Record<string, { x: number; y: number }> | undefined
  let height = Math.max(rect.height, 320)
  if (props.layout === 'grouped') {
    const grouped = computeGroupedLayout(width)
    positions = grouped.positions
    height = grouped.height
    canvasHeight.value = `${height}px`
    await nextTick() // 等父容器真正长到新高度,再按这个高度建 G6 canvas,避免闪一下跳高
  }

  graph = new Graph({
    container: containerRef.value,
    width,
    height,
    autoResize: true,
    data: buildGraphData(positions),
    node: {
      type: 'rect',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: {
        size: (d: any) => [nodeWidth(d.data?.label), 32],
        radius: 16,
        fill: (d: any) => clusterColor(d.data?.cluster),
        fillOpacity: 0.16,
        stroke: (d: any) => clusterColor(d.data?.cluster),
        lineWidth: 1.4,
        cursor: 'pointer',
        labelText: (d: any) => d.data?.label,
        labelPlacement: 'center',
        labelFontSize: 12,
        labelFontWeight: 500,
        labelFill: theme.text
      },
      state: {
        active: { lineWidth: 2.4, fillOpacity: 0.32, zIndex: 10 },
        inactive: { opacity: 0.2 }
      }
    },
    edge: {
      type: 'quadratic',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: {
        curveOffset: (d: any) => d.data?.curveOffset ?? 18,
        stroke: (d: any) => clusterColor(d.data?.sourceCluster),
        strokeOpacity: 0.45,
        lineWidth: 1.2,
        endArrow: true,
        endArrowSize: 7,
        labelText: (d: any) => d.data?.label || '',
        labelFontSize: 10.5,
        labelFill: theme.text,
        labelOpacity: 0.85,
        labelBackground: true,
        labelBackgroundFill: theme.bg,
        labelBackgroundOpacity: 0.75
      },
      state: {
        active: {
          stroke: accent,
          strokeOpacity: 1,
          lineWidth: 2.2,
          labelOpacity: 1,
          labelFontWeight: 600,
          zIndex: 10
        },
        inactive: { opacity: 0.06 }
      }
    },
    layout:
      props.layout === 'force'
        ? {
            type: 'force',
            linkDistance: 180,
            nodeStrength: -420,
            edgeStrength: 40,
            preventOverlap: true,
            collideStrength: 1,
            nodeSize: (d: any) => nodeWidth(d.data?.label)
          }
        : undefined,
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element']
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graph.on('node:click', (e: any) => {
    const id = e.target.id as string
    if (activeId.value === id) {
      reset()
      return
    }
    activeId.value = id
    hoverId.value = null
    applyFocus()
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graph.on('node:pointerenter', (e: any) => {
    hoverId.value = e.target.id
    applyFocus()
  })
  graph.on('node:pointerleave', () => {
    hoverId.value = null
    applyFocus()
  })
  graph.on('canvas:click', () => reset())

  await graph.render()
  await graph.fitView({ padding: 24 })
  applyFocus()
}

watch(searchText, (val) => {
  const q = val.trim().toLowerCase()
  const hits = props.nodes.filter((n) => n.label.toLowerCase().includes(q))
  if (q === '') activeId.value = null
  else if (hits.length === 1) activeId.value = hits[0].id
  applyFocus()
})

// 亮/暗主题切换(html.dark class 变化)时,canvas 内文字/连线颜色需要重新初始化才能生效
function scheduleReinit() {
  graph?.destroy()
  graph = null
  nextTick(initGraph)
}

onMounted(async () => {
  await nextTick()
  await initGraph()
  themeObserver = new MutationObserver(scheduleReinit)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  // 容器尺寸变化(如右侧目录让出/占用空间、窗口缩放)时,让画布重新适配内容,而不是留白或裁切
  sizeObserver = new ResizeObserver(() => graph?.fitView({ padding: 24 }))
  if (containerRef.value) sizeObserver.observe(containerRef.value)
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  sizeObserver?.disconnect()
  graph?.destroy()
})
</script>

<style scoped>
.relation-graph {
  margin: 20px 0;
}

.rg-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.rg-search {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  min-width: 200px;
  outline: none;
}
.rg-search:focus {
  border-color: var(--vp-c-brand-1);
}

.rg-btn {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}
.rg-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.rg-hint {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.rg-stage {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rg-canvas {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.rg-panel {
  width: 100%;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 90px;
  font-size: 14px;
}
.rg-panel-cluster {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.rg-panel-title {
  font-size: 16px;
  margin: 0 0 8px;
}
.rg-panel-def {
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}
.rg-panel-related {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}
.rg-panel-related b {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.rg-panel-empty {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.rg-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 14px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.rg-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.rg-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
