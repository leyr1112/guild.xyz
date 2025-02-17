import { Button, ButtonProps } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

const AccountButton = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>): JSX.Element => (
  <Button
    flexGrow={1}
    borderRadius="2xl"
    colorScheme="alpha"
    color="whiteAlpha.900"
    {...rest}
  >
    {children}
  </Button>
)

export default AccountButton
