import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useReduxStoreDispatch: () => AppDispatch = useDispatch;
export const useReduxStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
