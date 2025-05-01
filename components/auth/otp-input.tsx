"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  numInputs: number
  renderInput?: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode
  inputStyle?: React.CSSProperties
  containerStyle?: string
  shouldAutoFocus?: boolean
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  numInputs = 6,
  renderInput,
  inputStyle,
  containerStyle,
  shouldAutoFocus = true,
}) => {
  const [activeInput, setActiveInput] = useState(0)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const getOtpValue = () => (value ? value.toString().split("") : [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value

    if (val === "") {
      // Handle backspace
      const newValue = getOtpValue()
        .slice(0, index)
        .concat(getOtpValue().slice(index + 1))
      onChange(newValue.join(""))

      // Move focus to previous input if available
      if (index > 0) {
        setActiveInput(index - 1)
      }
    } else {
      // Only accept digits
      const isValid = /^\d+$/.test(val)
      if (!isValid) return

      // Get the last character if multiple characters are pasted
      const digit = val.substring(val.length - 1)

      // Update the value
      const newValue = getOtpValue().slice()
      newValue[index] = digit
      onChange(newValue.join(""))

      // Move focus to next input if available
      if (index < numInputs - 1) {
        setActiveInput(index + 1)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !getOtpValue()[index]) {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        setActiveInput(index - 1)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move focus left
      setActiveInput(index - 1)
      e.preventDefault()
    } else if (e.key === "ArrowRight" && index < numInputs - 1) {
      // Move focus right
      setActiveInput(index + 1)
      e.preventDefault()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only accept digits
    const pastedDigits = pastedData.replace(/\D/g, "")

    // Limit to the number of inputs
    const limitedDigits = pastedDigits.substring(0, numInputs)

    if (limitedDigits) {
      onChange(limitedDigits)
    }
  }

  const handleFocus = (index: number) => {
    setActiveInput(index)
  }

  // Focus the active input
  useEffect(() => {
    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus()
    }
  }, [activeInput])

  // Auto focus the first input on mount
  useEffect(() => {
    if (shouldAutoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [shouldAutoFocus])

  // Render the inputs
  const renderInputs = () => {
    const otp = getOtpValue()
    const inputs = []

    for (let i = 0; i < numInputs; i++) {
      const inputProps = {
        type: "text",
        inputMode: "numeric" as React.HTMLAttributes<HTMLInputElement>["inputMode"],
        pattern: "[0-9]*",
        maxLength: 1,
        value: otp[i] || "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, i),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, i),
        onPaste: handlePaste,
        onFocus: () => handleFocus(i),
        style: inputStyle,
        "aria-label": `Digit ${i + 1}`,
        autoComplete: i === 0 ? "one-time-code" : "off",
        ref: (ref: HTMLInputElement) => {
          inputRefs.current[i] = ref
        },
      }

      inputs.push(
        <div key={i} className="w-12">
          {renderInput ? renderInput(inputProps) : <Input {...inputProps} className="text-center text-lg" />}
        </div>,
      )
    }

    return inputs
  }

  return <div className={`flex gap-2 justify-center ${containerStyle || ""}`}>{renderInputs()}</div>
}

export default OtpInput
