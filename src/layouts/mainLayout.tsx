import { Header } from "@/components/Header/ui";
import { Flex, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (<VStack maxW={'60%'} mx={'auto'}>
  <Header/>
  <Flex w={'100%'} >  {children}
  </Flex>
  </VStack>);
};
