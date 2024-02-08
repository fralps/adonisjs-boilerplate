import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'

/**
 * Options accepted by the unique rule
 */
type Options = {
  table: string
  column: string
}

/**
 * Implementation
 */
async function unique(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .from('users')
    .select(options.column)
    .from(options.table)
    .where(options.column, value)
    .first()

  if (row) {
    field.report('', 'email', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueRule = vine.createRule(unique)
