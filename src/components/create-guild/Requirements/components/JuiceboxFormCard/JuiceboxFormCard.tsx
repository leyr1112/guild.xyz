import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import { Select } from "components/common/ChakraReactSelect"
import { useEffect, useMemo } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { RequirementFormField } from "types"
import Symbol from "../Symbol"
import useJuicebox from "./hooks/useJuicebox"

type Props = {
  index: number
  field: RequirementFormField
}

const JuiceboxFormCard = ({ index, field }: Props): JSX.Element => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  // Setting up a default address for now, it isn't editable in the UI
  useEffect(() => {
    setValue(
      `requirements.${index}.address`,
      "0xee2eBCcB7CDb34a8A822b589F9E8427C24351bfc"
    )
  }, [setValue])

  const key = useWatch({ name: `requirements.${index}.key` })

  const { projects, isLoading } = useJuicebox()
  const mappedOptions = useMemo(
    () =>
      projects?.map((project) => ({
        img: project.logoUri,
        label: project.name,
        value: project.id,
      })),
    [projects]
  )

  const pickedProject = useMemo(
    () => mappedOptions?.find((project) => project.value === key),
    [key, mappedOptions]
  )

  return (
    <>
      <FormControl isRequired isInvalid={errors?.requirements?.[index]?.key}>
        <FormLabel>Project:</FormLabel>

        <InputGroup>
          {key && (
            <Symbol
              symbol={pickedProject?.img}
              isInvalid={errors?.requirements?.[index]?.key}
            />
          )}
          <Controller
            name={`requirements.${index}.key` as const}
            control={control}
            defaultValue={field.key}
            rules={{
              required: "This field is required.",
            }}
            render={({ field: { onChange, onBlur, value: selectValue, ref } }) => (
              <Select
                ref={ref}
                isClearable
                isLoading={isLoading}
                options={mappedOptions}
                placeholder="Search..."
                value={mappedOptions?.find((option) => option.value === selectValue)}
                defaultValue={mappedOptions?.find(
                  (option) => option.value === field.key
                )}
                onChange={(selectedOption) => onChange(selectedOption?.value)}
                onBlur={onBlur}
              />
            )}
          />
        </InputGroup>

        <FormErrorMessage>
          {errors?.requirements?.[index]?.key?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.requirements?.[index]?.value}>
        <FormLabel>Minimum amount to staked:</FormLabel>

        <Controller
          name={`requirements.${index}.value` as const}
          control={control}
          defaultValue={field.value}
          rules={{
            required: "This field is required.",
            min: {
              value: 0,
              message: "Amount must be positive",
            },
          }}
          render={({
            field: { onChange, onBlur, value: numberInputValue, ref },
          }) => (
            <NumberInput
              ref={ref}
              value={numberInputValue}
              defaultValue={field.value}
              onChange={(newValue) => onChange(newValue)}
              onBlur={onBlur}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />

        <FormErrorMessage>
          {errors?.requirements?.[index]?.value?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}

export default JuiceboxFormCard
