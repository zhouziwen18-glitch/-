/**
 * @file PublicationNetworkSection.tsx
 * @description Enhanced network visualization connecting publications with draggable nodes.
 */

import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { SectionHeader } from './SectionHeader'
import { publications, type Publication } from '../../data/publications'

interface NetworkNode {
  id: string
  label: string
  x: number
  y: number
  kind: 'topic' | 'paper'
  color?: string
  fx?: number | null
  fy?: number | null
}

interface NetworkEdge {
  source: string
  target: string
}

type TopicId =
  | 'food-safety'
  | 'microbiology'
  | 'ai-ml'
  | 'risk-assessment'
  | 'health-cross'
  | 'spectroscopy'
  | 'genomics'
  | 'sensors'

const TOPIC_COLORS: Record<string, { main: string; light: string; glow: string }> = {
  'food-safety': { main: '#ef4444', light: '#fef2f2', glow: 'rgba(239, 68, 68, 0.3)' },
  microbiology: { main: '#8b5cf6', light: '#f5f3ff', glow: 'rgba(139, 92, 246, 0.3)' },
  'ai-ml': { main: '#06b6d4', light: '#ecfeff', glow: 'rgba(6, 182, 212, 0.3)' },
  'risk-assessment': { main: '#22c55e', light: '#f0fdf4', glow: 'rgba(34, 197, 94, 0.3)' },
  'health-cross': { main: '#f59e0b', light: '#fffbeb', glow: 'rgba(245, 158, 11, 0.3)' },
  spectroscopy: { main: '#ec4899', light: '#f2f5f9', glow: 'rgba(236, 72, 153, 0.3)' },
  genomics: { main: '#10b981', light: '#f0fdf4', glow: 'rgba(16, 185, 129, 0.3)' },
  sensors: { main: '#6366f1', light: '#f0f1ff', glow: 'rgba(99, 102, 241, 0.3)' },
}

const OWN_INSTITUTIONS = ['上海理工大学', '福建农林大学']

const ALL_INSTITUTIONS = [
  { name: '上海理工大学', keywords: ['上海理工大学', 'usst', 'USST'] },
  { name: '福建农林大学', keywords: ['福建农林大学', 'fafu', 'FAFU'] },
  { name: '上海海洋大学', keywords: ['上海海洋大学', 'shou', 'SHOU', 'Fang T'] },
  { name: '江苏省疾病预防控制中心', keywords: ['江苏', 'CDC', '疾控', 'Jiangsu'] },
  { name: '希腊农业科学院', keywords: ['Nychas', '希腊', 'Agricultural', 'Doulgeraki'] },
  { name: '浙江工业大学', keywords: ['浙江工业大学', 'Zhejiang University of Technology'] },
]

function extractAffiliations(authors: string): string[] {
  const found: string[] = []
  for (const aff of ALL_INSTITUTIONS) {
    for (const kw of aff.keywords) {
      if (authors.toLowerCase().includes(kw.toLowerCase())) {
        if (!found.includes(aff.name)) {
          found.push(aff.name)
        }
        break
      }
    }
  }
  return found
}

function extractCollaboratingInstitutions(authors: string): string[] {
  const allAffiliations = extractAffiliations(authors)
  return allAffiliations.filter((aff) => !OWN_INSTITUTIONS.includes(aff))
}

function usePublicationNetwork() {
  const topicNodes: NetworkNode[] = [
    { id: 'food-safety', label: '食品安全', x: 15, y: 20, kind: 'topic', color: TOPIC_COLORS['food-safety'].main },
    { id: 'microbiology', label: '食品微生物', x: 85, y: 18, kind: 'topic', color: TOPIC_COLORS.microbiology.main },
    { id: 'ai-ml', label: '机器学习', x: 12, y: 60, kind: 'topic', color: TOPIC_COLORS['ai-ml'].main },
    { id: 'risk-assessment', label: '风险评估', x: 50, y: 40, kind: 'topic', color: TOPIC_COLORS['risk-assessment'].main },
    { id: 'health-cross', label: '交叉健康', x: 88, y: 65, kind: 'topic', color: TOPIC_COLORS['health-cross'].main },
    { id: 'spectroscopy', label: '光谱分析', x: 30, y: 35, kind: 'topic', color: TOPIC_COLORS.spectroscopy.main },
    { id: 'genomics', label: '基因组学', x: 70, y: 32, kind: 'topic', color: TOPIC_COLORS.genomics.main },
    { id: 'sensors', label: '智能传感', x: 45, y: 72, kind: 'topic', color: TOPIC_COLORS.sensors.main },
  ]

  const paperPositions = publications.map((_, index) => {
    const angle = (index / publications.length) * Math.PI * 2 + (index % 2) * 0.4
    const layer = Math.floor(index / 4)
    const baseRadius = 18 + layer * 14
    const radiusVar = (index % 3) * 4
    const radius = baseRadius + radiusVar
    const centerX = 50 + Math.cos(angle) * radius
    const centerY = 50 + Math.sin(angle) * radius * 0.8
    return {
      x: Math.max(5, Math.min(95, centerX)),
      y: Math.max(8, Math.min(88, centerY)),
    }
  })

  const paperNodes: NetworkNode[] = publications.map((paper, index) => ({
    id: paper.id,
    label: `${paper.year}`,
    x: paperPositions[index].x,
    y: paperPositions[index].y,
    kind: 'paper',
  }))

  const topicEdges: NetworkEdge[] = [
    { source: 'kg-llm-food-safety-2026', target: 'food-safety' },
    { source: 'kg-llm-food-safety-2026', target: 'ai-ml' },
    { source: 'kg-llm-food-safety-2026', target: 'risk-assessment' },

    { source: 'dl-spectroscopy-mandarin-2026', target: 'ai-ml' },
    { source: 'dl-spectroscopy-mandarin-2026', target: 'spectroscopy' },
    { source: 'dl-spectroscopy-mandarin-2026', target: 'health-cross' },

    { source: 'ml-listeria-growth-2026', target: 'food-safety' },
    { source: 'ml-listeria-growth-2026', target: 'microbiology' },
    { source: 'ml-listeria-growth-2026', target: 'ai-ml' },
    { source: 'ml-listeria-growth-2026', target: 'risk-assessment' },

    { source: 'ugfs-net-tg-2025', target: 'ai-ml' },
    { source: 'ugfs-net-tg-2025', target: 'spectroscopy' },
    { source: 'ugfs-net-tg-2025', target: 'sensors' },

    { source: 'salmon-sashimi-listeria-2024', target: 'food-safety' },
    { source: 'salmon-sashimi-listeria-2024', target: 'microbiology' },
    { source: 'salmon-sashimi-listeria-2024', target: 'ai-ml' },

    { source: 'cfhtf2-tea-anthracnose-2023', target: 'microbiology' },
    { source: 'cfhtf2-tea-anthracnose-2023', target: 'genomics' },

    { source: 'sdia-cronobacter-2022', target: 'microbiology' },
    { source: 'sdia-cronobacter-2022', target: 'food-safety' },

    { source: 'bo-lgbm-enrofloxacin-fish-2024', target: 'food-safety' },
    { source: 'bo-lgbm-enrofloxacin-fish-2024', target: 'ai-ml' },
    { source: 'bo-lgbm-enrofloxacin-fish-2024', target: 'risk-assessment' },

    { source: 'n425-genome-tea-anthracnose-2023', target: 'microbiology' },
    { source: 'n425-genome-tea-anthracnose-2023', target: 'genomics' },
    { source: 'n425-genome-tea-anthracnose-2023', target: 'health-cross' },

    { source: 'pso-ensemble-vegetable-pesticide-2025', target: 'food-safety' },
    { source: 'pso-ensemble-vegetable-pesticide-2025', target: 'ai-ml' },
    { source: 'pso-ensemble-vegetable-pesticide-2025', target: 'sensors' },

    { source: 'quinoa-milk-process-optimization-2023', target: 'health-cross' },
    { source: 'quinoa-steam-process-2023', target: 'health-cross' },

    { source: 'ml-food-safety-warning-review-2025', target: 'food-safety' },
    { source: 'ml-food-safety-warning-review-2025', target: 'ai-ml' },
    { source: 'ml-food-safety-warning-review-2025', target: 'risk-assessment' },

    { source: 'rf-food-safety-warning-patent-2025', target: 'food-safety' },
    { source: 'rf-food-safety-warning-patent-2025', target: 'ai-ml' },
    { source: 'rf-food-safety-warning-patent-2025', target: 'risk-assessment' },
  ]

  const allNodes = [...topicNodes, ...paperNodes]
  return { nodes: allNodes, topicNodes, paperNodes, edges: topicEdges }
}

interface DraggableNodeProps {
  node: NetworkNode
  isTopic: boolean
  isActiveTopic: boolean
  isHovered: boolean
  isDimmed: boolean
  topicColor: { main: string; light: string; glow: string } | null
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
  onDrag: (id: string, x: number, y: number) => void
  onDragEnd: (id: string) => void
  svgRef: React.RefObject<SVGSVGElement | null>
}

function DraggableNode({
  node,
  isTopic,
  isActiveTopic,
  isHovered,
  isDimmed,
  topicColor,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onDrag,
  onDragEnd,
  svgRef,
}: DraggableNodeProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; nodeX: number; nodeY: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTopic) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current || !svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const svgWidth = rect.width
      const svgHeight = rect.height
      const viewBoxWidth = 100
      const viewBoxHeight = 100

      const dx = (moveEvent.clientX - dragRef.current.startX) / svgWidth * viewBoxWidth
      const dy = (moveEvent.clientY - dragRef.current.startY) / svgHeight * viewBoxHeight

      const newX = Math.max(3, Math.min(97, dragRef.current.nodeX + dx))
      const newY = Math.max(5, Math.min(92, dragRef.current.nodeY + dy))

      onDrag(node.id, newX, newY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragRef.current = null
      onDragEnd(node.id)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      className={`cursor-pointer transition-all duration-200 ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        transform: isHovered && !isDragging ? 'scale(1.15)' : undefined,
        transformOrigin: `${node.x}px ${node.y}px`,
      }}
    >
      {isTopic && (
        <circle
          cx={node.x}
          cy={node.y}
          r={isHovered ? 7 : 5.5}
          fill={topicColor?.glow}
          className="animate-pulse"
        />
      )}

      {isHovered && !isTopic && (
        <circle
          cx={node.x}
          cy={node.y}
          r={6}
          fill="rgba(34, 197, 94, 0.2)"
          className="animate-ping"
        />
      )}

      <circle
        cx={node.x}
        cy={node.y}
        r={isHovered ? (isTopic ? 5 : 3.5) : isTopic ? 4 : 2.5}
        fill={isTopic ? topicColor?.main : '#22c55e'}
        fillOpacity={isDimmed ? 0.25 : 0.95}
        stroke={isTopic ? topicColor?.light : '#dcfce7'}
        strokeWidth={isHovered ? 1.5 : 0.7}
        filter={isHovered && isTopic ? `url(#glow-${node.id})` : undefined}
      />

      {isTopic && (
        <circle
          cx={node.x}
          cy={node.y}
          r={isHovered ? 2.5 : 1.8}
          fill="white"
          fillOpacity={isDimmed ? 0.3 : 1}
        />
      )}

      <text
        x={node.x}
        y={node.y + (isTopic ? 8 : 5.5)}
        textAnchor="middle"
        fontSize={isTopic ? 3 : 2.2}
        fill={isDimmed ? '#94a3b8' : '#334155'}
        fontWeight={500}
        className="pointer-events-none select-none"
      >
        {node.label}
      </text>
    </g>
  )
}

export function PublicationNetworkSection() {
  const { nodes: initialNodes, topicNodes, edges } = usePublicationNetwork()
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes)
  const [activeTopic, setActiveTopic] = useState<TopicId | 'all'>('all')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes])

  const collaboratingInstitutions = useMemo(() => {
    const affSet = new Set<string>()
    publications.forEach((p) => {
      p.collaboratingInstitutions?.forEach((a) => affSet.add(a))
    })
    return Array.from(affSet)
  }, [])

  const activePapers = useMemo(() => {
    if (activeTopic === 'all') return publications
    const relatedPaperIds = new Set(
      edges.filter((e) => e.target === activeTopic).map((e) => e.source),
    )
    return publications.filter((p) => relatedPaperIds.has(p.id))
  }, [activeTopic, edges])

  const hoveredPaper = hoveredNode ? publications.find((p) => p.id === hoveredNode) : null

  const getRelatedNodes = useCallback((nodeId: string) => {
    const relatedIds = new Set<string>()
    edges.forEach((edge) => {
      if (edge.source === nodeId) relatedIds.add(edge.target)
      if (edge.target === nodeId) relatedIds.add(edge.source)
    })
    return relatedIds
  }, [edges])

  const relatedNodes = hoveredNode ? getRelatedNodes(hoveredNode) : new Set<string>()

  const handleDrag = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, x, y } : n)),
    )
  }, [])

  const handleDragEnd = useCallback((id: string) => {
  }, [])

  return (
    <section className="mb-12 sm:mb-16">
      <SectionHeader title="论文网络" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            {topicNodes.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopic(activeTopic === topic.id ? 'all' : (topic.id as TopicId))}
                className={[
                  'rounded-full border px-3 py-1.5 transition-all duration-300',
                  activeTopic === topic.id
                    ? 'border-current bg-opacity-100 text-white shadow-md scale-105'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-opacity-50 hover:shadow-sm',
                ].join(' ')}
                style={{
                  backgroundColor: activeTopic === topic.id ? topic.color : undefined,
                  borderColor: activeTopic === topic.id ? topic.color : undefined,
                }}
              >
                {topic.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setActiveTopic('all')
                setSelectedPaper(null)
              }}
              className={[
                'rounded-full border px-3 py-1.5 transition-all duration-300',
                activeTopic === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
              ].join(' ')}
            >
              全部
            </button>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white">
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="h-full w-full"
              aria-label="Publication network with draggable nodes"
            >
              <defs>
                {Object.entries(TOPIC_COLORS).map(([id, colors]) => (
                  <filter key={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {edges.map((edge, index) => {
                const source = nodes.find((n) => n.id === edge.source)
                const target = nodes.find((n) => n.id === edge.target)
                if (!source || !target) return null

                const isActiveEdge = activeTopic === 'all' || edge.target === activeTopic
                const isHoverRelated = hoveredNode
                  ? edge.source === hoveredNode ||
                    edge.target === hoveredNode ||
                    relatedNodes.has(edge.source) ||
                    relatedNodes.has(edge.target)
                  : true
                const isDimmed = !isActiveEdge || !isHoverRelated
                const targetTopic = topicNodes.find((t) => t.id === edge.target)

                const dx = target.x - source.x
                const dy = target.y - source.y
                const curveStrength = Math.min(Math.abs(dx), Math.abs(dy)) * 0.15
                const midX = (source.x + target.x) / 2 + (dy > 0 ? curveStrength : -curveStrength) * (Math.random() - 0.5)
                const midY = (source.y + target.y) / 2 - (dx > 0 ? curveStrength : -curveStrength) * (Math.random() - 0.5)

                const isEdgeHighlighted = hoveredNode !== null && (edge.source === hoveredNode || edge.target === hoveredNode)
                const targetColor = targetTopic?.color || '#0ea5e9'

                return (
                  <path
                    key={`${edge.source}-${edge.target}-${index}`}
                    d={`M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                    fill="none"
                    stroke={isDimmed ? '#e2e8f0' : targetColor}
                    strokeWidth={isDimmed ? 0.3 : isEdgeHighlighted ? 1.5 : 0.7}
                    strokeOpacity={isDimmed ? 0.3 : isEdgeHighlighted ? 0.9 : 0.5}
                    className="transition-all duration-300"
                  />
                )
              })}

              {nodes.map((node) => {
                const isTopic = node.kind === 'topic'
                const isActiveTopic = node.id === activeTopic
                const isHovered = hoveredNode === node.id
                const isRelated = hoveredNode !== null && (hoveredNode === node.id || relatedNodes.has(node.id))
                const isDimmed =
                  (activeTopic !== 'all' && isTopic && node.id !== activeTopic) ||
                  (hoveredNode !== null && !isRelated)

                const topicColor = isTopic ? (TOPIC_COLORS[node.id as keyof typeof TOPIC_COLORS] || { main: '#6366f1', light: '#f0f1ff', glow: 'rgba(99, 102, 241, 0.3)' }) : null

                return (
                  <DraggableNode
                    key={node.id}
                    node={node}
                    isTopic={isTopic}
                    isActiveTopic={isActiveTopic}
                    isHovered={isHovered}
                    isDimmed={isDimmed}
                    topicColor={topicColor}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      if (!isTopic) {
                        const paper = publications.find((p) => p.id === node.id)
                        setSelectedPaper(paper || null)
                      } else {
                        setActiveTopic(node.id as TopicId)
                      }
                    }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    svgRef={svgRef}
                  />
                )
              })}
            </svg>
            <div className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-[10px] text-slate-500 shadow-sm">
              论文节点可拖动调整位置
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600">
            {Object.entries(TOPIC_COLORS).map(([id, colors]) => (
              <div key={id} className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.main }} />
                <span>{topicNodes.find((t) => t.id === id)?.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">主题关联论文</h3>
            <p className="mt-1 text-[13px] text-slate-600">
              当前主题：
              <span className="font-medium text-sky-700">
                {activeTopic === 'all'
                  ? '全部论文'
                  : topicNodes.find((t) => t.id === activeTopic)?.label}
              </span>
              <span className="ml-2 text-slate-400">({activePapers.length}篇)</span>
            </p>
            <ul className="mt-3 space-y-2 max-h-40 overflow-y-auto">
              {activePapers.map((paper) => (
                <li
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className={`cursor-pointer rounded-lg p-2 transition-all duration-200 ${
                    selectedPaper?.id === paper.id
                      ? 'bg-sky-100 border border-sky-300'
                      : 'bg-slate-50 hover:bg-sky-50'
                  }`}
                >
                  <div className="truncate text-[12px] font-medium text-slate-800">
                    {paper.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 truncate">
                    {paper.venue}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">合作单位</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {collaboratingInstitutions.length > 0 ? (
                collaboratingInstitutions.map((aff) => (
                  <span
                    key={aff}
                    className="rounded-full bg-gradient-to-r from-sky-50 to-indigo-50 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-sky-200"
                  >
                    {aff}
                  </span>
                ))
              ) : (
                <span className="text-[12px] text-slate-400">暂无外部合作单位数据</span>
              )}
            </div>
          </div>

          {hoveredPaper && (
            <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">悬停预览</h3>
              <div className="mt-2 space-y-1.5 text-[12px]">
                <div className="font-medium text-slate-900 line-clamp-2">{hoveredPaper.title}</div>
                <div className="text-[11px] text-slate-500">{hoveredPaper.authors}</div>
                <div className="text-[11px] text-slate-500 truncate">{hoveredPaper.venue}</div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {hoveredPaper.journalCategory?.categories.map((cat) => (
                    <span key={cat} className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-700">
                      {cat}
                    </span>
                  ))}
                  {hoveredPaper.journalCategory?.casPartition && (
                    <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700">
                      {hoveredPaper.journalCategory.casPartition}
                    </span>
                  )}
                  {hoveredPaper.journalCategory?.impactFactor && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                      IF: {hoveredPaper.journalCategory.impactFactor}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 border-t border-slate-100 pt-1.5">
                  <span className="text-[10px] text-slate-500">合作单位：</span>
                  <span className="text-[10px] text-slate-600">
                    {extractCollaboratingInstitutions(hoveredPaper.authors).join(' / ') || '无外部合作'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedPaper && (
            <div className="rounded-2xl border-2 border-sky-300 bg-white p-4 shadow-lg">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-slate-900">论文详情</h3>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="rounded-full p-1 hover:bg-slate-100"
                >
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="font-medium text-slate-900">
                  {selectedPaper.link ? (
                    <a
                      href={selectedPaper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-sky-600"
                    >
                      {selectedPaper.title}
                    </a>
                  ) : (
                    selectedPaper.title
                  )}
                </div>
                <div className="text-slate-600">
                  <span className="font-medium text-slate-700">作者：</span>
                  {selectedPaper.authors}
                </div>
                <div className="text-slate-600">
                  <span className="font-medium text-slate-700">期刊：</span>
                  {selectedPaper.venue}
                </div>
                <div className="text-slate-600">
                  <span className="font-medium text-slate-700">年份：</span>
                  {selectedPaper.year}
                </div>
                <div className="text-slate-600">
                  <span className="font-medium text-slate-700">合作单位：</span>
                  <span className="text-slate-600">
                    {extractCollaboratingInstitutions(selectedPaper.authors).join(' / ') || '无外部合作'}
                  </span>
                </div>
                {selectedPaper.journalCategory && (
                  <div className="mt-2 border-t border-slate-100 pt-2">
                    <div className="mb-1 font-medium text-slate-700">期刊分类：</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPaper.journalCategory.categories.map((cat) => (
                        <span key={cat} className="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700">
                          {cat}
                        </span>
                      ))}
                      {selectedPaper.journalCategory.casPartition && (
                        <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                          {selectedPaper.journalCategory.casPartition}
                        </span>
                      )}
                      {selectedPaper.journalCategory.impactFactor && (
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                          IF: {selectedPaper.journalCategory.impactFactor}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {selectedPaper.tags && selectedPaper.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedPaper.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {selectedPaper.link && (
                  <a
                    href={selectedPaper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>查看期刊原文</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}