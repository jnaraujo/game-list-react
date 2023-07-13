import { fireEvent, render, renderHook } from "@testing-library/react"
import Like from "@/components/Like"
import { useState } from "react"

describe("Like component", () => {
  it("should change the like state when clicked", () => {
    const LikeWrapper = () => {
      const [isLiked, setIsLiked] = useState(false)

      const handleClick = () => {
        setIsLiked(!isLiked)
      }

      return <Like isLiked={isLiked} onClick={handleClick} />
    }

    const { container } = render(<LikeWrapper />)

    const likeButton = container.querySelector("button")

    fireEvent.click(likeButton!)

    expect(likeButton?.firstChild).toHaveClass("fill-red-600")
  })
})
