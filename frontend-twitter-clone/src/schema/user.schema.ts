import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  username: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email(),
  followingIds: z.string().array().optional(),
  followersCount: z.any().optional(),
  emailVerified: z.date().optional(),
  createdAt: z.date().optional(),
  image: z.string().optional(),
  coverImage: z.string().optional(),
  profileImage: z.string().optional(),
  password: z.string(),
});

export type userType = z.input<typeof UserSchema>;
