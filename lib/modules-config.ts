export type ModuleId =
  | 'bienvenida'
  | 'modulo-2-el-principito'
  | 'modulo-3-conceptos'
  | 'modulo-4-glosario'
  | 'modulo-5-retos'
  | 'modulo-6-proyecto'
  | 'modulo-7-cierre'

export type ModuleConfig = {
  id: ModuleId
  route: string
  img: string
}

/** Order matches the suggested navigation order from the content document. */
export const MODULES: ModuleConfig[] = [
  { id: 'bienvenida', route: '/bienvenida', img: '/images/planet-airfield.png' },
  { id: 'modulo-2-el-principito', route: '/modulo-2-el-principito', img: '/images/planet-b612.png' },
  { id: 'modulo-3-conceptos', route: '/modulo-3-conceptos', img: '/images/planet-books.png' },
  { id: 'modulo-4-glosario', route: '/modulo-4-glosario', img: '/images/planet-garden.png' },
  { id: 'modulo-5-retos', route: '/modulo-5-retos', img: '/images/planet-station.png' },
  { id: 'modulo-6-proyecto', route: '/modulo-6-proyecto', img: '/images/planet-creative.png' },
  { id: 'modulo-7-cierre', route: '/modulo-7-cierre', img: '/images/planet-home.png' },
]

export function getModule(id: ModuleId) {
  const index = MODULES.findIndex((m) => m.id === id)
  return {
    config: MODULES[index],
    prev: index > 0 ? MODULES[index - 1] : null,
    next: index < MODULES.length - 1 ? MODULES[index + 1] : null,
  }
}
