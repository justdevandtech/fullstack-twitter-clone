import { userType } from '../schema/user.schema';

export interface IpostProps {
  data: {
    id: string;
    body: string;
    imageURL?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    likedIds: string[];
    user: userType;
    comments: [];
  }
}


