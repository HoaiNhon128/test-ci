import qs from 'qs';
import { UserData } from '../models/User';
import { Interception } from 'cypress/types/net-stubbing';
import { apiAlias, getAlias } from '@common';

export const toLocaleFixed = (num: number, fractionDigits: number) => {
  const rounded = num.toFixed(fractionDigits);
  const parsed = parseFloat(rounded);
  return parsed.toLocaleString('en');
};

export const getUserData = () => {
  return new Promise<UserData>((resolve, reject) => {
    cy.get<Interception>(getAlias(apiAlias.GET_USER_DATA), { timeout: 10000 }).then((currentSubject) => {
      if (currentSubject?.response?.statusCode < 400) {
        return resolve(currentSubject.response.body);
      }
      return resolve(null);
    });
  });
};

export const getDataApi = async (alias: string) => {
  const newAlias = alias.startsWith('@') ? alias : `@${alias}`;
  return new Promise<any>((resolve, reject) => {
    cy.get<Interception>(newAlias, { timeout: 40000 }).then((currentSubject) => {
      if (currentSubject?.response?.statusCode < 400) {
        return resolve(currentSubject.response.body);
      }
      return resolve(null);
    });
  });
};

export const bootstrapDataApi = async (
  params: Array<{ alias: string; key: string }>,
  option?: { isUserData?: boolean; isSearch?: boolean }
) => {
  const promises = await Promise.all(params.map((item) => getDataApi(item.alias)));

  const result = params.reduce((prev, curr, index) => {
    prev[curr.key] = promises[index];
    return prev;
  }, {});

  if (option) {
    if (option.isUserData) {
      result['userData'] = await getUserData();
    }

    if (option.isSearch) {
      result['search'] = await parseUrl();
    }
  }

  return result as any;
};

export const parseUrl: any = () => {
  return new Promise((resolve) => {
    cy.url().then((url) => {
      const [pathname, searchString] = url.split('?');

      const parsedQuery: qs.ParsedQs = qs.parse(searchString, { comma: true });

      let penIds: number[] = [];
      let groupIds: number[] = [];
      let dates: string[] = [];
      if (parsedQuery.penIds) {
        // Arrays containing single object are treated as standard search parameters.
        // Thus, when we parse the url parameters we must convert them back to an array.
        const penIdsArray = Array.isArray(parsedQuery.penIds) ? parsedQuery.penIds : [parsedQuery.penIds];
        penIds = penIdsArray.map(Number);
      }

      if (parsedQuery.groupIds) {
        const groupIdsArray = Array.isArray(parsedQuery.groupIds) ? parsedQuery.groupIds : [parsedQuery.groupIds];
        groupIds = groupIdsArray.map(Number);
      }

      if (parsedQuery.dates) {
        const datesArrays = Array.isArray(parsedQuery.dates) ? parsedQuery.dates : [parsedQuery.dates];
        dates = datesArrays.map(String);
      }

      const isComparingPens = parsedQuery.isComparingPens ? JSON.parse(<string>parsedQuery.isComparingPens) : false;
      const isComparingDate = parsedQuery.isComparingDate ? JSON.parse(<string>parsedQuery.isComparingDate) : false;

      const detail = parsedQuery.detail ? JSON.parse(<string>parsedQuery.detail) : false;

      const searchParam = {
        ...parsedQuery,
        penIds,
        groupIds,
        dates,
        isComparingPens,
        detail,
        isComparingDate,
        siteId: Number(parsedQuery.siteId),
      };

      resolve(searchParam);
    });
  });
};

export const getInputName = (name: string) => {
  return cy.get(`input[name="${name}"]`);
};

export const formatPathProduct = ({
  productType,
  viewType,
  siteId,
}: {
  productType: string;
  viewType: string;
  siteId: number;
}) => {
  return `/dashboard/${productType}/${viewType}?siteId=${siteId}`;
};
