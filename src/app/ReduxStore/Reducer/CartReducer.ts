import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, languageAR, languageEN } from '../actions/CartAction';

export const initialState = +localStorage.getItem('cartCount')!;

const _CartReducer = createReducer(
  initialState,
  on(increment, (state) => {
   const count =  localStorage.getItem('cartCount')? localStorage.getItem('cartCount') : 0
    localStorage.setItem('cartCount', (state! + 1).toString());
    return  +count! + 1
    }
    ),
  on(decrement, (state) => {
      localStorage.setItem('cartCount', (state! - 1).toString());
      return state! - 1;

  }),
  on(reset, (state) => 0)
);

export const initialLang = "ar";

const _LanguageReducer = createReducer(
  initialLang,
  on(languageAR, (state) => {
    return 'ar';
  }),
  on(languageEN, (state) => {
    return 'en';
  })
);
export function CartReducer(state: any, action: any) {
  return _CartReducer(state, action);
}
export function LanguageReducer(state: any, action: any) {
  return _LanguageReducer(state, action);
}
