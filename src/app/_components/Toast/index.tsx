import { Anchor, Center, Flex, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import toast, { Toaster as RHT } from "react-hot-toast";

type Props = {
  alertMessage: string;
  linkText: string | null;
  id: string;
};

export const Toast: React.FC<Props> = (props) => {
  return toast((t) => (
    <span>
      <Flex gap="xs" align="center" justify="center">
        <IconCircleCheck size={28} color="green" />
        <Text fz={14}>{props.alertMessage}</Text>
      </Flex>
      {props.linkText && (
        <Center mt={5}>
          <Link
            href={`/mypage/${props.id}`}
            onClick={() => toast.dismiss(t.id)}
            prefetch={false}
            passHref
          >
            <Anchor fz={14} fw="bold">
              {props.linkText}
            </Anchor>
          </Link>
        </Center>
      )}
    </span>
  ));
};

export const BurnedToast: React.FC<{ errorMessage: string }> = (props) =>
  toast.error(props.errorMessage);

export const MyToaster = () => <RHT />;
