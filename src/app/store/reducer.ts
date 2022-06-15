import { createReducer, on } from '@ngrx/store';
import {Feature} from 'geojson';
import { Add, Remove } from './actions';

import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./hydration.reducer";

export const initialState: Feature[] = [];

export const counterReducer = createReducer(
  initialState,
  on(Add, (state, { annotation }) => [ ...state, annotation]),
  on(Remove, (state, { annotationId }) => {
    return state.filter(({id}) => id !== annotationId)
  }),
);


export const metaReducers: MetaReducer[] = [hydrationMetaReducer];