import { db } from "@/db";

export const runtime = "edge";

export default async function Home() {
  const users = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 my-5 mx-auto max-w-2xl">
        {users.map((user) => (
          <div key={user.id} className="bg-blue-100 rounded-md p-5">
            <h1 className="text-lg font-bold">{user.name}</h1>
            <ul>
              <li>{user.email}</li>
            </ul>
            <div className="bg-red-100 mt-5 p-5 rounded-md">
              <h1 className="text-sm font-bold">記事投稿</h1>
              <ul>
                <li>
                  {user.posts.map((post) => (
                    <div key={post.id}>
                      <h1 className="text-sm font-bold mt-5">{post.title}</h1>
                      <ul>
                        <li>{post.content}</li>
                      </ul>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
