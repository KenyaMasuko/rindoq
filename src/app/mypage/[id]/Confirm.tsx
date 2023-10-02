"use client";

import { Button } from "@mantine/core";

export const Confirm: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Button
      onClick={(e) => {
        if (!confirm("くいずを削除しますか？")) {
          e.preventDefault();
        }
      }}
      color="red"
      type="submit"
      variant="outline"
    >
      {children}
    </Button>
  );
};
