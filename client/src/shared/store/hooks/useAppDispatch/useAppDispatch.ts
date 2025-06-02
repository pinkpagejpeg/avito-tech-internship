import { useDispatch } from 'react-redux'

/**
 * Типизированный хук для диспатча, основанный на типе AppDispatch
 * Упрощает работу с dispatch и обеспечивает типизацию действий
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()