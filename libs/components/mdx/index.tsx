import dynamic from 'next/dynamic'

const UseOptimisticSandpack = dynamic(() => import('./react-19/use-optimistic-sandpack'))
const UseActionStateSandpack = dynamic(() => import('./react-19/use-action-state-sandpack'))
const UseDeferredValueSandpack = dynamic(() => import('./react-19/use-sandpack'))
const UseSandpack = dynamic(() => import('./react-19/use-sandpack'))

export const MDXComponents = {
  UseOptimisticSandpack,
  UseActionStateSandpack,
  UseDeferredValueSandpack,
  UseSandpack,
}
