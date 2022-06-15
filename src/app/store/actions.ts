import { createAction, props } from '@ngrx/store';

export const Add = createAction('[Annotations] Add', props<{ annotation: any }>());
export const Remove = createAction('[Annotations] Remove', props<{ annotationId: string }>());