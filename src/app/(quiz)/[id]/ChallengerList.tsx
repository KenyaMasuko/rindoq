import { getChallengers } from "@/lib/getChallengers";
import { Avatar, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import classes from "./ChallengerList.module.css";

export const ChallengerList: React.FC<{ id: string }> = async (props) => {
  const challengers = await getChallengers(Number(props.id));
  const now = new Date();
  const japanTimeZoneOffset = 9 * 60;
  const today = new Date(
    now.getTime() + japanTimeZoneOffset * 60 * 1000
  ) as any;

  return (
    <>
      {challengers.map((x, i) => {
        const specifiedDate = new Date(x.updatedAt) as any;
        const timeDifference = today - specifiedDate;
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        return (
          <Paper
            key={x.challengerInfo.id}
            withBorder
            radius="md"
            className={classes.comment}
          >
            <Group>
              <Avatar src={x.challengerInfo.imageUrl} radius="xl" />
              <div>
                {x.challengerInfo.firstName && x.challengerInfo.lastName && (
                  <Text fz="sm">
                    {x.challengerInfo.firstName + x.challengerInfo.lastName}
                  </Text>
                )}
                <Text fz="xs" c="dimmed">
                  {daysDifference}日前
                </Text>
              </div>
            </Group>
          </Paper>
        );
      })}
    </>
  );
};
