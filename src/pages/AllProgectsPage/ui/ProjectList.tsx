import { ProjectsResponse, summaryProject } from "@/enteties/summaryProjects";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ProjectList=({data}:ProjectsResponse) =>{
  const navigate=useNavigate();
  const navigateToBorderId=(borderId:number)=>{
    navigate(`board/${borderId}`)
  }
  return (
    <>
    {data.map((project: summaryProject) => (
        <Flex
          key={project.id}
          bg={"pink.100"}
          w={"100%"}
          p={5}
          borderRadius={30}
          mb={3}
          cursor={'pointer'}
          onClick={()=>navigateToBorderId(project.id)}
        >
          <Text ml={5} fontSize={"xl"}>
            {project.name}
          </Text>
        </Flex>
      ))}
      </>
  )
}
