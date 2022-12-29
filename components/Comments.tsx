import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import moment from "moment";
import { Avatar, Text } from "@chakra-ui/react";

type CommentsProps = {
  id: any;
  setCommentsLength: any;
};

const Comments: React.FC<CommentsProps> = ({ id, setCommentsLength }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [firestore, id]
  );
  useEffect(() => {
    setCommentsLength(comments.length);
  });

  return (
    <div>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black mb-5">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center
            space-x-2 mb-3"
            >
              <Avatar
                size="xs"
                src={comment.data().userImage}
                name={comment.data().username}
              />
              <p className="text-sm flex-1">
                <span className="font-bold">
                  {comment.data().username.slice(0, 6)}{" "}
                </span>
                {comment.data().comment}
              </p>
              <p className="text-[12px] px-2">
                {moment(
                  new Date(comment.data().timestamp?.seconds * 1000)
                ).fromNow()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Comments;
