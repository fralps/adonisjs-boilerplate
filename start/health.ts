import db from '@adonisjs/lucid/services/db'
import { DbCheck, DbConnectionCountCheck } from '@adonisjs/lucid/database'
import {
  HealthChecks,
  DiskSpaceCheck,
  MemoryHeapCheck,
  MemoryRSSCheck,
} from '@adonisjs/core/health'

export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck().warnWhenExceeds(80).failWhenExceeds(95).cacheFor('1 hour'),
  new MemoryHeapCheck(),
  new MemoryRSSCheck(),
  new DbCheck(db.connection()),
  new DbConnectionCountCheck(db.connection()),
])
