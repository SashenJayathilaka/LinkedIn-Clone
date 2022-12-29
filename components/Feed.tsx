import HomePost from "./HomePost";
import HomePostInput from "./HomePostInput";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [firestore]
  );

  //console.log(posts);

  return (
    <div className="col-span-full scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 xl:mr-5 items-center">
      <div>
        <HomePostInput />
      </div>
      <hr />
      <div className="mt-5">
        {posts.map((post) => (
          <div key={post.id}>
            <HomePost
              id={post.id}
              caption={post.data().caption}
              communityType={post.data().communityType}
              image={post.data().image}
              profileImage={post.data().profileImage}
              company={post.data().company}
              timestamp={post.data().timestamp}
              username={post.data().username}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feed;
