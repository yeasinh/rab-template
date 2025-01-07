import { BaseActionType } from "@lib/action.type";
import {
  SearchMemberResult,
  SearchMobileAppFeatureResult,
  SearchNocResult,
  SearchObjectiveResult,
  SearchOverviewResult,
  SearchQuery,
} from "@lib/services/search/search.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface SearchSliceStateType {
  searchFetchStatus: FetchStatusEnum;
  searchFetchError?: string;
  searchOverviewResponse?: SearchOverviewResult;
  searchObjectiveResponse?: SearchObjectiveResult;
  searchMobileAppFeatureResponse?: SearchMobileAppFeatureResult;
  searchMemberResponse?: SearchMemberResult;
  searchNocResponse?: SearchNocResult;
}

export interface SearchActionType extends BaseActionType {
  payload: {
    request: SearchQuery;
  };
}

export interface SearchOverviewSuccessActionType extends BaseActionType {
  payload: {
    response: SearchOverviewResult;
    path: string;
  };
}

export interface SearchObjectiveSuccessActionType extends BaseActionType {
  payload: {
    response: SearchObjectiveResult;
    path: string;
  };
}

export interface SearchMobileAppFeatureSuccessActionType
  extends BaseActionType {
  payload: {
    response: SearchMobileAppFeatureResult;
    path: string;
  };
}

export interface SearchMemberSuccessActionType extends BaseActionType {
  payload: {
    response: SearchMemberResult;
    path: string;
  };
}

export interface SearchNocSuccessActionType extends BaseActionType {
  payload: {
    response: SearchNocResult;
    path: string;
  };
}

export interface SearchFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
