import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Image } from "@chakra-ui/react";

type SuggestionsProps = {};

const Suggestions: React.FC<SuggestionsProps> = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(4)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      company: faker.company.bs(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    <div className="hidden xl:inline space-y-2">
      <div className="bg-white py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none m-auto">
        <div className="flex justify-between text-sm nb-d-5">
          <h3 className="text-sm font-bold text-gray-900 m-2">
            Add to your feed
          </h3>
        </div>
        {suggestions.map((profile, key) => (
          <div key={profile.userId}>
            <div className="flex items-center justify-between m-2 mb-3">
              <img
                className="w-10 h-10
          rounded-full border p-[2px]"
                src={profile.avatar}
                alt=""
              />
              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm">{profile.username}</h2>
                <h3 className="text-xs text-gray-400">{profile.company}</h3>
              </div>
            </div>
            <div className="flex justify-center" key={profile.password}>
              <button className="bg-transparent hover:bg-gray-200 text-gray-600 border border-gray-500  font-bold py-0.5 px-4 rounded-full text-sm -mt-2">
                + Follow
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {/* Ads */}
      <div className="bg-white w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none  m-auto">
        <div className="relative w-full h-full">
          <Image src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" />
        </div>
      </div>
    </div>
  );
};
export default Suggestions;
