import { Header } from "@/components/Header/ui";
import { Flex, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <VStack maxW={"60%"} mx={"auto"}>
      <Header />
      <Flex w={"100%"}>
      
        <Outlet />
      </Flex>
    </VStack>
  );
};
