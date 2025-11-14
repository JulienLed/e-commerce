"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { users_sync } from "@/app/generated/prisma";

export default function UserAccount() {
  const [userDatas, setUserDatas] = useState<users_sync>();
  const { userID } = useParams();

  useEffect(() => {
    const handleFetchUserDatas = async () => {
      try {
        const response = await fetch("/api/userDatas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userID }),
        });
        const data = await response.json();
        setUserDatas(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userID) {
      handleFetchUserDatas();
    } else {
      console.log("userID is false");
    }
  }, [userID]);

  return (
    <div>
      <h2>{`Bienvenue ${userDatas?.name}`}</h2>
      <div>
        <h3>Vos commandes :</h3>
        <div>{userDatas.orders}</div>
      </div>
    </div>
  );
}
