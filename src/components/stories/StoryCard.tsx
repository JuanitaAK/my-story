type storyProps = {
  id: string;
  speaker: string;
  story: string;
};

export const StoryCard = (props: storyProps): JSX.Element => {
  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 m-5 p-5">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {props.speaker}
      </h5>
      <h6 className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {props.id}
      </h6>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {props.story}
      </p>
    </div>
  );
};

export default StoryCard;
