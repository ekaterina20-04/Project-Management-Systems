import { Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export const ScrollButtons: React.FC = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowUp(scrollTop > 100);

      setShowDown(scrollTop + windowHeight < fullHeight - 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // вызвать один раз при загрузке

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: scrollHeight, behavior: "smooth" });
  };

  return (
    <VStack
      position="fixed"
      right="16px"
      top="95%"
      transform="translateY(-50%)"
      zIndex={1000}
    >
      {showUp && (
        <Flex
          onClick={scrollToTop}
          p={2}
          borderRadius="md"
          bg="gray.100"
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <FaAngleUp />
        </Flex>
      )}

      {showDown && (
        <Flex
          onClick={scrollToBottom}
          p={2}
          borderRadius="md"
          bg="gray.100"
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <FaAngleDown />
        </Flex>
      )}
    </VStack>
  );
};
