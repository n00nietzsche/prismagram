import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, __, { request }) => {
      const { user } = request; // me
      const { id: parentId } = parent; // somebody

      return await prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }]
      });
    },
    isSelf: (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return await prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    }
  }
};
