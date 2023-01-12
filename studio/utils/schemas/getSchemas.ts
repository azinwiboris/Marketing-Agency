import React from 'react'
import {StructureBuilder} from 'sanity/desk'

export const getSchemas = (
  S: StructureBuilder
): {
  title?: string
  name?: string
  icon?: React.ComponentType<{}> | React.ReactNode
  singleton?: boolean
}[] => {
  if (!S?.context?.schema?._original?.types) {
    console.warn('No schemas found in getSchemas(). Be sure to pass S as the first argument.')
    return []
  }
  const schemas = S.context.schema._original.types

  const schemaTypes = schemas
    .filter((type) => type.type === 'document' && type.name.indexOf('sanity.') < 0)
    .map(({title, name, icon, options}) => ({
      title,
      name,
      icon,
      singleton: (options as any)?.singleton,
    }))

  return schemaTypes
}
