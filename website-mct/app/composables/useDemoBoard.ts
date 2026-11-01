// Daten und Verhalten des Demo-Boards im Hero. Suche und Anlegen funktionieren wie in der App:
// Text filtert, #tag filtert nach Tag, -#tag blendet einen Tag aus, Enter legt an.

export type DemoComment = { author: string, initials: string, text: string, ago: string }

export type DemoTask = {
  id: number
  name: string
  tags: string[]
  status: 'pending' | 'in_progress' | 'done'
  starred: boolean
  important: boolean
  color?: string
  assignee: string
  content?: string
  comments?: DemoComment[]
}

const TAG = /(-?)#([\p{L}\d_-]+)/gu

const seed: DemoTask[] = [{
  id: 1,
  name: 'Relaunch Bäckerei Hansen: Startseite zur Abnahme schicken',
  tags: ['kunde'],
  status: 'in_progress',
  starred: true,
  important: true,
  assignee: 'LB',
  content: 'Kunde will Freitag live gehen. Vorher die Öffnungszeiten aus dem PDF übernehmen und die Galerie auf zwölf Bilder kürzen.',
  comments: [
    { author: 'Aylin Demir', initials: 'AD', text: 'Galerie ist gekürzt, die Bilder liegen im Ordner „final“.', ago: '12m ago' },
    { author: 'Lena Brandt', initials: 'LB', text: 'Danke! Ich schicke den Link heute Nachmittag raus.', ago: '4m ago' },
  ],
}, {
  id: 2,
  name: 'Login-Fehler nach Passwort-Reset nachstellen',
  tags: ['bug'],
  status: 'pending',
  starred: false,
  important: true,
  color: '#f66c6c',
  assignee: 'JW',
  content: 'Tritt nur auf Staging auf. Das Session-Cookie wird vermutlich doppelt gesetzt.',
}, {
  id: 3,
  name: 'Rückruf Frau Weber wegen Newsletter-Vorlage',
  tags: ['kunde'],
  status: 'pending',
  starred: false,
  important: false,
  assignee: 'LB',
}, {
  id: 4,
  name: 'SSL-Zertifikat für shop.hansen.de erneuern',
  tags: ['ops'],
  status: 'pending',
  starred: false,
  important: false,
  assignee: 'MK',
}, {
  id: 5,
  name: 'Bilder für die Teamseite komprimieren',
  tags: ['design'],
  status: 'pending',
  starred: true,
  important: false,
  color: '#74b9b7',
  assignee: 'AD',
}, {
  id: 6,
  name: 'Changelog für Release 2.4 schreiben',
  tags: ['release'],
  status: 'done',
  starred: false,
  important: false,
  assignee: 'JW',
}]

export function useDemoBoard() {
  const tasks = ref<DemoTask[]>(seed.map(task => ({ ...task, tags: [...task.tags] })))
  const query = ref('')
  const selectedId = ref<number | null>(1)
  let nextId = seed.length + 1

  const allTags = computed(() => [...new Set(tasks.value.flatMap(task => task.tags))])

  const parsed = computed(() => {
    const include: string[] = []
    const exclude: string[] = []
    for (const match of query.value.matchAll(TAG)) {
      (match[1] ? exclude : include).push(match[2]!.toLowerCase())
    }
    const text = query.value.replace(TAG, '').trim().toLowerCase()
    return { include, exclude, text }
  })

  const visibleTasks = computed(() => {
    const { include, exclude, text } = parsed.value
    return tasks.value.filter(task =>
      include.every(tag => task.tags.includes(tag))
      && !exclude.some(tag => task.tags.includes(tag))
      && task.name.toLowerCase().includes(text),
    )
  })

  const selectedTask = computed(() => tasks.value.find(task => task.id === selectedId.value) ?? null)

  function create(): boolean {
    const name = query.value.replace(TAG, '').replace(/\s+/g, ' ').trim()
    if (!name) return false
    const tags = [...query.value.matchAll(TAG)].filter(m => !m[1]).map(m => m[2]!.toLowerCase())
    const task: DemoTask = { id: nextId++, name, tags, status: 'pending', starred: false, important: false, assignee: 'LB' }
    tasks.value.unshift(task)
    selectedId.value = task.id
    query.value = ''
    return true
  }

  function toggleTag(tag: string) {
    const token = `#${tag}`
    query.value = query.value.includes(token)
      ? query.value.replace(token, '').replace(/\s+/g, ' ').trim()
      : `${query.value} ${token}`.trim()
  }

  return { tasks, query, selectedId, selectedTask, allTags, parsed, visibleTasks, create, toggleTag }
}
