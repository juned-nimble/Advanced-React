const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  //   dogs() {
  //     global.dogs = global.dogs || [];
  //     return global.dogs;
  //   },
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    return ctx.db.query.users({}, info);
  }
  // async items(parent, args, ctx, info) {
  //   console.log('Getting Items!!');
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
