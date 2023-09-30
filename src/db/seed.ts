import { db } from ".";
import { users, NewUser, posts, NewPost } from "./schema";

async function main() {
  // すべてのユーザーを削除
  //
  // 以下と同等のSQL
  // DELETE FROM user;
  const deleteAllUsers = await db.delete(users);
  console.log("すべてのユーザーを削除");
  console.log(deleteAllUsers);
  console.log("\n-----------------------------------\n");

  // すべてのユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users;
  const selecAllDeletedUsers = await db.select().from(users);
  console.log("すべてのユーザーを取得");
  console.log(selecAllDeletedUsers);
  console.log("\n-----------------------------------\n");

  // 10件のユーザーを追加
  //
  // 以下と同等のSQL
  // INSERT INTO users (name, email) VALUES ('山田太郎', 'yamada@example.com');
  // INSERT INTO users (name, email) VALUES ('田中花子', 'tanaka@example.com');
  const newUsers: NewUser[] = [
    {
      name: "山田太郎",
      email: "yamada@example.com",
    },
    {
      name: "田中花子",
      email: "tanaka@example.com",
    },
  ];
  const insertUsers = await db.insert(users).values(newUsers);
  console.log("ユーザーを追加");
  console.log(insertUsers);
  console.log("\n-----------------------------------\n");

  // すべてのユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users;
  const selecAllUsers = await db.select().from(users);
  console.log("すべてのユーザーを取得");
  console.log(selecAllUsers);
  console.log("\n-----------------------------------\n");

  // すべての投稿を取得
  //
  // 以下と同等のSQL
  // DELETE FROM posts;
  const deleteAllPosts = await db.delete(posts);
  console.log("すべての投稿を取得");
  console.log(deleteAllPosts);
  console.log("\n-----------------------------------\n");

  // すべてのユーザーを抽出
  //
  // 以下と同等のSQL
  // SELECT * FROM posts;
  const selecAllDeletedPosts = await db.select().from(posts);
  console.log("すべての投稿を取得");
  console.log(selecAllDeletedPosts);
  console.log("\n-----------------------------------\n");

  // 10件のユーザーを追加
  //
  // 以下と同等のSQL
  // INSERT INTO posts (title, content, published, author_id) VALUES ('6月6日（山田太郎）', 'Hello World', true, 1);
  // INSERT INTO posts (title, content, published, author_id) VALUES ('6月7日（山田太郎）', 'Hello Universe', true, 1);
  // INSERT INTO posts (title, content, published, author_id) VALUES ('6月6日（田中花子）', 'Hello', true, 2);
  const newPosts: NewPost[] = [
    {
      title: "6月6日（山田太郎）",
      content: "Hello World",
      authorId: selecAllUsers[0].id,
    },
    {
      title: "6月7日（山田太郎）",
      content: "Hello Universe",
      authorId: selecAllUsers[0].id,
    },
    {
      title: "6月7日（田中花子）",
      content: "Hello",
      authorId: selecAllUsers[1].id,
    },
  ];
  const insertPosts = await db.insert(posts).values(newPosts);
  console.log("3件の投稿を追加");
  console.log(insertPosts);
  console.log("\n-----------------------------------\n");

  // すべてのユーザーを抽出
  //
  // 以下と同等のSQL
  // SELECT * FROM posts;
  const selecAllPosts = await db.select().from(posts);
  console.log("すべての投稿を取得");
  console.log(selecAllPosts);
  console.log("\n-----------------------------------\n");
}

main();
