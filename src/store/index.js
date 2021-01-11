import { init } from '@rematch/core';
import selectPlugin from '@rematch/select';
import * as homePageModels from '../HomePage/models';

const store = init({
	models: {
		...homePageModels
	},
	plugins: [selectPlugin()]
});

export default store;
export const { dispatch, select } = store;