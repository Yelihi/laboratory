import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

import InfiniteScroll from "./InfiniteScroll";
import axios from "axios";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

describe("Infinite Scrolling Component", () => {
  it("첫번째 페이지 렌더링", async () => {
    const spy = jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        data: [],
      },
    });

    render(<InfiniteScroll />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
      );
    });
  });
  it("두번째 페이지 렌더링", async () => {
    const spy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              _id: "602e2e8a82237637124e9356",
              name: "Ariana",
              trips: 780,
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              _id: "602e2ee382237643574e9358",
              name: "Guelia",
              trips: 600,
            },
          ],
        },
      });
    render(<InfiniteScroll />);

    await waitFor(() => {
      expect(spy).toHaveBeenNthCalledWith(
        1,
        "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
      );
    });
    const Title = await screen.findByText("Ariana");
    const Number = await screen.findByText("780");
    expect(Title).toBeInTheDocument();
    expect(Number).toBeInTheDocument();

    mockAllIsIntersecting(true);

    await waitFor(() => {
      expect(spy).toHaveBeenNthCalledWith(
        3,
        "https://api.instantwebtools.net/v1/passenger?page=1&size=10"
      );
    });
  });
});
