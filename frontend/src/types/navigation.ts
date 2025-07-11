import { BuySellItem, HelpPost, WorkOffer, Conversation } from './item';

export type RootStackParamList = {
  Home: undefined;
  ItemDetails: { item: BuySellItem };
  HelpDetails: { post: HelpPost };
  WorkDetails: { offer: WorkOffer };
  ChatList: undefined;
  ChatDetail: { conversation: Conversation };
  Search: undefined;
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