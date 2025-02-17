import { Button, Icon } from "@chakra-ui/react"
import { X } from "phosphor-react"
import useEdit from "../hooks/useEdit"

const RemoveBackgroundImage = () => {
  const { onSubmit, isLoading } = useEdit()

  const handleRemoveImage = () => onSubmit({ theme: { backgroundImage: "" } })
  return (
    <Button
      leftIcon={<Icon as={X} />}
      colorScheme="red"
      variant="outline"
      borderWidth={1}
      rounded="md"
      fontSize="sm"
      height={10}
      isLoading={isLoading}
      onClick={handleRemoveImage}
    >
      Remove image
    </Button>
  )
}

export default RemoveBackgroundImage
