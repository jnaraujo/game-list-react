import Button from "@/components/Button"
import { render } from "@testing-library/react"

describe("Button component", () => {
  it("should be loading", () => {
    const { container } = render(<Button loading>Button</Button>)

    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("should be disabled", () => {
    const { container } = render(<Button disabled>Button</Button>)

    expect(container.querySelector("button")).toBeDisabled()
  })

  it("should be secondary", () => {
    const { container } = render(<Button secondary>Button</Button>)

    expect(container.querySelector("button")).toHaveClass(
      "border-2 border-violet-600 bg-transparent text-violet-600 hover:bg-zinc-100",
    )
  })

  it("should be a child", () => {
    const { container } = render(
      <Button asChild>
        <span>Button</span>
      </Button>,
    )

    expect(container.querySelector("span")).toBeInTheDocument()
  })
})
