import { Story } from "../../pages/Stories/StoriesContainer";
import { useRouter } from "next/router";
import { deleteStory } from "@/services/storiesApi";

export const StoryTitleCard = (props: Story): JSX.Element => {
  const router = useRouter();

  const openStory = () => {
    router.push(`/stories/${props.id_story}`);
  };

  const handleDeleteStory = async () => {
    await deleteStory(props.id_story).then(() => {
      router.reload();
    });
  };

  return (
    <div
      key={props.id_story}
      className="content-center max-w-fit justify-center rounded-lg md:max-w-6xl shadow-xl px-8 py-6 bg-white m-6 "
    >
      <h5 className="my-3 pb-3 text-2xl text-center font-extrabold leading-tight text-title">
        {props.title?.toUpperCase()}
      </h5>
      <p className="mb-4 pb-6 text-base text-blue-800 whitespace-pre-line line-clamp-1">
        {props.story}
      </p>
      <div className="buttons_container py-6 flex md:flex-row flex-col gap-5 md:justify-end items-center justify-center">
        <button
          onClick={openStory}
          className="md:self-end md:w-48 w-full py-2 text-white rounded-md bg-button hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hover transition duration-300"
        >
          Open
        </button>
        <button
          onClick={handleDeleteStory}
          className="md:self-end md:w-48 w-full py-2 text-white rounded-md bg-button hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hover transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
