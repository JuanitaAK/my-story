import StoryCard from "@/components/storiesCard/StoryCard";
import { stories } from "./../data/data";
import { useEffect, useState } from "react";

const StoriesContainer = () => {
  return (
    <div className="stories">
      <h3 className="text-3xl text-title font-semibold leading-tight  m-6 pb-6 ">
        Stories
      </h3>
      <div className="stories__container">
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesContainer;

// waiting to have the api
// const [stories, setStories] = useState([]);
// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   setIsLoading(true);
//   fetch("http://localhost:3000/api/stories") //dummy address api while creating the real one
//     .then((res) => res.json())
//     .then((data) => {
//       const renderedStories: any = [];

//       for (const key in data) {
//         renderedStories.push({
//           id: key,
//           ...data[key],
//         });
//       }
//       setStories(renderedStories);
//       setIsLoading(false);
//     });
// }, []);

// if (isLoading) {
//   return (
//     <div className="stories">
//       <h3 className="mb-2 text-3xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 m-5 p-5">
//         Loading...
//       </h3>
//     </div>
//   );
// }

// if (!stories) {
//   return (
//     <div className="stories">
//       <h3 className="mb-2 text-3xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 m-5 p-5">
//         No stories found
//       </h3>
//     </div>
//   );
// }