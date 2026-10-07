type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <img src={picture} className="h-9 w-9 rounded-full" alt="" />
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default Avatar;
