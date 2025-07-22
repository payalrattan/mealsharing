

type Props = {
  action: () => void;
  appearance: string;
  text: string;
  type?: "button" | "submit" | "reset"; 
};

export const Button = ({
  action,
  text,
  appearance,
  type = "button",
}: Props) => {
  return (
    <button onClick={action} type={type} className={appearance}>
      {text}
    </button>
  );
};
