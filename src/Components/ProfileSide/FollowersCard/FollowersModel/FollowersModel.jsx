import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened, setRender }) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="45%"
      opened={modalOpened}
      onClose={() => {
        setModalOpened(false);
        setRender((prev) => !prev);
      }}
    >
      <div style={{ height: "200px" }}>
        <FollowersCard location="modal" />
      </div>
    </Modal>
  );
};

export default FollowersModal;
