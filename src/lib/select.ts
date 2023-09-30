import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { asc, desc, eq, or } from "drizzle-orm";

async function main() {
  const selectUsers = await db.select().from(users);
  console.log("全てのユーザー");
  console.log(selectUsers);
  console.log("\n------------------------------------\n");

  const selectPosts = await db.select().from(posts);
  console.log("全ての投稿");
  console.log(selectPosts);
  console.log("\n------------------------------------\n");

  const select1User = await db.select().from(users).limit(1);
  console.log("1件のユーザー");
  console.log(select1User);
  console.log("\n------------------------------------\n");

  const selectYamadaTaroUsers = await db
    .select()
    .from(users)
    .where(eq(users.name, "山田太郎"));
  console.log("名前が山田太郎のユーザー");
  console.log(selectYamadaTaroUsers);
  console.log("\n------------------------------------\n");

  const selectSuzukiHanakoOrYamadaTarouUsers = await db
    .select()
    .from(users)
    .where(or(eq(users.name, "鈴木花子"), eq(users.name, "山田太郎")));
  console.log("名前が鈴木花子または山田太郎のユーザー");
  console.log(selectSuzukiHanakoOrYamadaTarouUsers);
  console.log("\n------------------------------------\n");

  const selectUsersAndPosts = await db
    .select({
      userId: users.id,
      userName: users.name,
      post: {
        postId: posts.id,
        postTitle: posts.title,
      },
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .orderBy(asc(users.id), desc(posts.id));

  console.log("ユーザーと投稿");
  console.log(selectUsersAndPosts);
  console.log("\n------------------------------------\n");

  const queryUsersAndPosts = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });

  console.log("ユーザーと投稿");
  console.log(JSON.stringify(queryUsersAndPosts, null, 2));
  console.log("\n------------------------------------\n");
}

main();
