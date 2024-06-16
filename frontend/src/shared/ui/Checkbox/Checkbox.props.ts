import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  text?: string
  default_value: boolean
}
