import { SignIn } from "@clerk/nextjs";
import { Center } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <Center h="100%">
      <SignIn redirectUrl={"/"} />
    </Center>
  );
}
