import { BuySellItem, HelpPost, WorkOffer } from './item';

export type RootStackParamList = {
  Home: undefined;
  ItemDetails: { item: BuySellItem };
  HelpDetails: { post: HelpPost };
  WorkDetails: { offer: WorkOffer };
  Experts: undefined;
  Post: undefined;
  MyPosts: undefined;
  Profile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Experts: undefined;
  Post: undefined;
  MyPosts: undefined;
  Profile: undefined;
}; 