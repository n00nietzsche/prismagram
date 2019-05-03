import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFeed: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      const followingUsers = following.map(followingUser => followingUser.id);
      //console.log(following);
      const posts = await prisma.posts({
        where: { user: { id_in: followingUsers } }
      });

      return posts;
    }
  }
};
