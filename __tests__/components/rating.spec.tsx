import Rating from "@/components/Rating"
import { fireEvent, render } from "@testing-library/react"
import { useState } from "react"

describe("Rating component", () => {
  it("should change the star color when clicked", () => {
    function Wrapper() {
      const [rating, setRating] = useState(0)

      return <Rating count={4} onClick={setRating} rating={rating} />
    }
    const { container } = render(<Wrapper />)

    const stars = container.querySelectorAll("svg")

    for (let i = 0; i < stars.length; i++) {
      expect(stars[i]).toHaveAttribute("fill", "transparent")
    }

    fireEvent.click(stars[stars.length - 1])

    for (let i = 0; i < stars.length; i++) {
      expect(stars[i]).toHaveAttribute("fill", "#ffd100")
    }

    fireEvent.click(stars[1])

    for (let i = 0; i < stars.length; i++) {
      if (i <= 1) {
        expect(stars[i]).toHaveAttribute("fill", "#ffd100")
      } else {
        expect(stars[i]).toHaveAttribute("fill", "transparent")
      }
    }
  })
})
