import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Wrap,
} from "@chakra-ui/react"
import FileInput from "components/common/FileInput"
import useGuild from "components/[guild]/hooks/useGuild"
import { useThemeContext } from "components/[guild]/ThemeContext"
import { File } from "phosphor-react"
import { useFormContext } from "react-hook-form"
import RemoveBackgroundImage from "./RemoveBackgroundImage"

const BackgroundImageUploader = (): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { setLocalBackgroundImage } = useThemeContext()
  const { theme } = useGuild()

  const validateFiles = (e) => {
    const file = e?.[0]
    if (!file) return

    const fsMb = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 5
    if (fsMb > MAX_FILE_SIZE) return "Max file size is 5mb"

    // act's like onChange if it's valid
    setLocalBackgroundImage(URL.createObjectURL(file))
  }

  return (
    <FormControl isInvalid={errors?.backgroundImage}>
      <FormLabel>Custom background image</FormLabel>

      <Wrap>
        <FileInput
          accept={"image/*"}
          register={register("backgroundImage", {
            validate: validateFiles,
          })}
        >
          <Button
            leftIcon={<Icon as={File} />}
            variant="outline"
            borderWidth={1}
            rounded="md"
            fontSize="sm"
            height={10}
          >
            Choose image
          </Button>
        </FileInput>
        {theme?.[0]?.backgroundImage && <RemoveBackgroundImage />}
      </Wrap>

      <FormErrorMessage>{errors?.backgroundImage?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default BackgroundImageUploader
