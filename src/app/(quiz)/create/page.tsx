import { CreateQuizForm } from "@/app/(quiz)/create/CreateQuizForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "りんどQ | くいずを作成",
};

const Page = () => {
  return <CreateQuizForm />;
};

export default Page;
