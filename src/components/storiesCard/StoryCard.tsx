type StoryProps = {
  id: string;
  speaker: string;
  story: string;
};

const StoryCard = (props: StoryProps): JSX.Element => {
  return (
    <div className="block rounded-lg bg-story shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] m-5 mb-8 p-5">
      <h5 className="mb-2 text-xl font-medium leading-tight text-font">
        {props.speaker}
      </h5>
      <h6 className="mb-4 text-base text-font">{props.id}</h6>
      <p className="mb-4 text-base text-font">{props.story}</p>
    </div>
  );
};

export default StoryCard;