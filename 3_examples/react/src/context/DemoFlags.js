import React from 'react'
import Toggle from 'react-toggle'

import css from './DemoFlags.module.css'

const defaultValue = {
  useCacheUpdate: false,
  useCacheUpdateAndOptimistic: false,
  useOptimisticResponse: false,
}

export const FlagsContext = React.createContext(defaultValue)

export const FlagsProvider = ({ children }) => {
  const [flags, setFlags] = React.useState(defaultValue)

  const toggleCacheUpdate = React.useCallback(() => {
    setFlags(f => ({ ...f, useCacheUpdate: !f.useCacheUpdate }))
  }, [])

  const toggleCacheUpdateAndOptimistic = React.useCallback(() => {
    setFlags(f => ({
      ...f,
      useCacheUpdateAndOptimistic: !f.useCacheUpdateAndOptimistic,
    }))
  }, [])

  const toggleOptimistic = React.useCallback(() => {
    setFlags(f => ({ ...f, useOptimisticResponse: !f.useOptimisticResponse }))
  }, [])

  return (
    <FlagsContext.Provider
      value={{
        ...flags,
        toggleCacheUpdate,
        toggleOptimistic,
        toggleCacheUpdateAndOptimistic,
      }}
    >
      {children}
    </FlagsContext.Provider>
  )
}

const DemoFlags = () => {
  const flags = React.useContext(FlagsContext)

  return (
    <div className={css.demoFlags}>
      <div className={css.toggleWithLabel}>
        <div>Cache update orders</div>
        <Toggle
          checked={flags.useCacheUpdate}
          onChange={flags.toggleCacheUpdate}
        />
      </div>
      <div className={css.toggleWithLabel}>
        <div>Optimistic orders</div>
        <Toggle
          checked={flags.useCacheUpdateAndOptimistic}
          onChange={flags.toggleCacheUpdateAndOptimistic}
        />
      </div>
      <div className={css.toggleWithLabel}>
        <div>Optimistic deliveries</div>
        <Toggle
          checked={flags.useOptimisticResponse}
          onChange={flags.toggleOptimistic}
        />
      </div>
    </div>
  )
}

export default DemoFlags
