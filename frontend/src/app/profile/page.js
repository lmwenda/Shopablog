import { useUser } from "@/context/UserContext";
import { BASE_URL } from "../exportedDefinitions";
import ProfileComponent from "./profilecomponent";

const Page = async() => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
};

export default Page;
