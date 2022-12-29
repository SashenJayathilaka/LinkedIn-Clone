import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { firestore } from "../firebase/firebase";
import Suggestions from "./Suggestions";

type RightHandSideProps = {
  session: any;
};

const RightHandSide: React.FC<RightHandSideProps> = ({ session }) => {
  const [userCreates, setUserCreate] = useState<boolean>(false);

  const getUserData = async () => {
    if (session) {
      try {
        const docRef = doc(firestore, "users", session?.user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("User Already Created");
          setUserCreate(false);
        } else {
          setUserCreate(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  const userCreate = async (session: any) => {
    const userDocRef = doc(firestore, "users", session?.user?.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(session)));
  };

  useEffect(() => {
    getUserData();

    if (userCreates) {
      userCreate(session);
    } else return;
  }, [session, firestore, userCreates]);

  return (
    <div className="hidden xl:inline-grid md:col-span-1">
      <div
        className="absolute bg-white"
        style={{
          borderRadius: "10px",
        }}
      >
        <Suggestions />
      </div>
    </div>
  );
};
export default RightHandSide;
