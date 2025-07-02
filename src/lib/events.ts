import type { Repo } from '@/types/repos'
import { Subject } from 'rxjs'

export const onRepoSelected = new Subject<Repo>()
