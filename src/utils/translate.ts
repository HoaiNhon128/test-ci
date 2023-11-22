import { merge } from 'lodash';
import en from '../languages/en';
import nb from '../languages/nb';

const languages = {
	en,
	nb,
};

function format(text: string, ...value: Array<string | number>): string {
	return text.replace(/{([0-9]+)}/g, function (_match, index) {
		return typeof value[index] === 'undefined' ? '' : String(value[index]);
	});
}

const getLanguage = () => {
	const locale = window.localStorage.getItem('locale');
	const lang = languages[locale];

	if (!lang) return en;

	if (locale !== 'en') {
		return merge(en, lang);
	}

	return lang;
};

type Language = typeof en & { formatString: typeof format };

export const strings: Language = { ...getLanguage(), formatString: format };
