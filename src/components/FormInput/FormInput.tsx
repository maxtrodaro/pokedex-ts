import { Input } from "@chakra-ui/react";
import { useField, Field } from "formik";
import React from "react";

type InputAttributes = React.HTMLAttributes<HTMLInputElement>;

type InputProps = {
  border: string;
  borderColor: string;
  borderRadius: string;
  color?: string;
  dataCy: string;
  marginRight?: string;
  maxLength?: number;
  name: string;
  onValueChange?: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "outline" | "unstyled" | "flushed" | "filled";
} & Omit<InputAttributes, "size">;

const FormInput: React.FC<InputProps> = ({
  border,
  borderColor,
  borderRadius,
  color,
  dataCy,
  marginRight,
  maxLength,
  name,
  onValueChange = () => {},
  size,
  variant,
  ...props
}) => {
  const [, , { setValue }] = useField({ name });

  return (
    <Input
      as={Field}
      border={border}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      data-cy={dataCy}
      mr={marginRight}
      maxLength={maxLength}
      name={name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event?.target?.value);
        onValueChange(event?.target?.value);
      }}
      size={size}
      variant={variant}
      {...props}
    />
  );
};

export default FormInput;
