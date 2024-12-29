import { useParams } from "next/navigation";

const Verify = () => {
  const params = useParams();
  return (
    <div>
      <button>Verify</button>
    </div>
  );
};

export default Verify;
