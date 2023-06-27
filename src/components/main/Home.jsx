import React, { useEffect, useState } from "react";
import { databaseService } from "../../firebase";
import { getDocs, getDoc, addDoc, collection } from "firebase/firestore";
const Home = () => {
  const [NweetContent, setNweetContent] = useState("");
  const [NweetContents, setNweetContents] = useState([]);

  const getNweets = async () => {
    const dbNweets = await getDocs(collection(databaseService, "Nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweetContents((prev) => [nweetObject, ...prev]);
    });
    //console.log(document.data()));
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(databaseService, "nweets"), {
      NweetContent,
      createdAt: Date.now(),
    });
    setNweetContent("");
  };
  const handleContent = (e) => {
    setNweetContent(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={NweetContent}
          onChange={handleContent}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {NweetContents.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
