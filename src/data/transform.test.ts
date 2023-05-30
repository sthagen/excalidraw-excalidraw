import { convertToExcalidrawElements } from "./transform";
import { ImportedDataState } from "./types";

describe("Test Transform", () => {
  it("should transform regular shapes", () => {
    const elements = [
      {
        type: "rectangle",
        x: 100,
        y: 100,
      },
      {
        type: "ellipse",
        x: 100,
        y: 250,
      },
      {
        type: "diamond",
        x: 100,
        y: 400,
      },
      {
        type: "rectangle",
        x: 300,
        y: 100,
        width: 200,
        height: 100,
        backgroundColor: "#c0eb75",
        strokeWidth: 2,
      },
      {
        type: "ellipse",
        x: 300,
        y: 250,
        width: 200,
        height: 100,
        backgroundColor: "#ffc9c9",
        strokeStyle: "dotted",
        fillStyle: "solid",
        strokeWidth: 2,
      },
      {
        type: "diamond",
        x: 300,
        y: 400,
        width: 200,
        height: 100,
        backgroundColor: "#a5d8ff",
        strokeColor: "#1971c2",
        strokeStyle: "dashed",
        fillStyle: "cross-hatch",
        strokeWidth: 2,
      },
    ];

    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });

  it("should transform text element", () => {
    const elements = [
      {
        type: "text",
        x: 100,
        y: 100,
        text: "HELLO WORLD!",
      },
      {
        type: "text",
        x: 100,
        y: 150,
        text: "STYLED HELLO WORLD!",
        fontSize: 20,
        strokeColor: "#5f3dc4",
      },
    ];
    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });

  it("should transform linear elements", () => {
    const elements = [
      {
        type: "arrow",
        x: 100,
        y: 20,
      },
      {
        type: "arrow",
        x: 450,
        y: 20,
        startArrowhead: "dot",
        endArrowhead: "triangle",
        strokeColor: "#1971c2",
        strokeWidth: 2,
      },
      {
        type: "line",
        x: 100,
        y: 60,
      },
      {
        type: "line",
        x: 450,
        y: 60,
        strokeColor: "#2f9e44",
        strokeWidth: 2,
        strokeStyle: "dotted",
      },
    ];
    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });

  it("should transform to text containers when label provided", () => {
    const elements = [
      {
        type: "rectangle",
        x: 100,
        y: 100,
        label: {
          text: "RECTANGLE TEXT CONTAINER",
        },
      },
      {
        type: "ellipse",
        x: 500,
        y: 100,
        width: 200,
        label: {
          text: "ELLIPSE TEXT CONTAINER",
        },
      },
      {
        type: "diamond",
        x: 100,
        y: 150,
        width: 280,
        label: {
          text: "DIAMOND\nTEXT CONTAINER",
        },
      },
      {
        type: "diamond",
        x: 100,
        y: 400,
        width: 300,
        backgroundColor: "#fff3bf",
        strokeWidth: 2,
        label: {
          text: "STYLED DIAMOND TEXT CONTAINER",
          strokeColor: "#099268",
          fontSize: 20,
        },
      },
      {
        type: "rectangle",
        x: 500,
        y: 300,
        width: 200,
        strokeColor: "#c2255c",
        label: {
          text: "TOP LEFT ALIGNED RECTANGLE TEXT CONTAINER",
          textAlign: "left",
          verticalAlign: "top",
          fontSize: 20,
        },
      },
      {
        type: "ellipse",
        x: 500,
        y: 500,
        strokeColor: "#f08c00",
        backgroundColor: "#ffec99",
        width: 200,
        label: {
          text: "STYLED ELLIPSE TEXT CONTAINER",
          strokeColor: "#c2255c",
        },
      },
    ];
    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });
  it("should transform to labelled arrows when label provided for arrows", () => {
    const elements = [
      {
        type: "arrow",
        x: 100,
        y: 100,
        label: {
          text: "LABELED ARROW",
        },
      },
      {
        type: "arrow",
        x: 100,
        y: 200,
        label: {
          text: "STYLED LABELED ARROW",
          strokeColor: "#099268",
          fontSize: 20,
        },
      },
      {
        type: "arrow",
        x: 100,
        y: 300,
        strokeColor: "#1098ad",
        strokeWidth: 2,
        label: {
          text: "ANOTHER STYLED LABELLED ARROW",
        },
      },
      {
        type: "arrow",
        x: 100,
        y: 400,
        strokeColor: "#1098ad",
        strokeWidth: 2,
        label: {
          text: "ANOTHER STYLED LABELLED ARROW",
          strokeColor: "#099268",
        },
      },
    ];
    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });

  describe("Test arrow bindings", () => {
    it("should bind arrows to shapes when start / end provided without ids", () => {
      const elements = [
        {
          type: "arrow",
          x: 255,
          y: 239,
          label: {
            text: "HELLO WORLD!!",
          },
          start: {
            type: "rectangle",
          },
          end: {
            type: "ellipse",
          },
        },
      ];
      expect(
        convertToExcalidrawElements(elements as ImportedDataState["elements"]),
      ).toMatchSnapshot();
    });

    it("should bind arrows to text when start / end provided without ids", () => {
      const elements = [
        {
          type: "arrow",
          x: 255,
          y: 239,
          label: {
            text: "HELLO WORLD!!",
          },
          start: {
            type: "text",
            text: "HEYYYYY",
          },
          end: {
            type: "text",
            text: "WHATS UP ?",
          },
        },
      ];
      expect(
        convertToExcalidrawElements(elements as ImportedDataState["elements"]),
      ).toMatchSnapshot();
    });

    it("should bind arrows to existinging shapes when start / end provided with ids", () => {
      const elements = [
        {
          type: "ellipse",
          id: "ellipse-1",
          strokeColor: "#66a80f",
          x: 630,
          y: 316,
          width: 300,
          height: 300,
          backgroundColor: "#d8f5a2",
        },
        {
          type: "diamond",
          id: "diamond-1",
          strokeColor: "#9c36b5",
          width: 140,
          x: 96,
          y: 400,
        },
        {
          type: "arrow",
          x: 247,
          y: 420,
          width: 395,
          height: 35,
          strokeColor: "#1864ab",
          start: {
            type: "rectangle",
            width: 300,
            height: 300,
          },
          end: {
            type: "ellipse",
            id: "ellipse-1",
          },
        },
        {
          type: "arrow",
          x: 227,
          y: 450,
          width: 400,
          strokeColor: "#e67700",
          start: {
            type: "diamond",
            id: "diamond-1",
          },
          end: {
            type: "ellipse",
            id: "ellipse-1",
          },
        },
      ];
      expect(
        convertToExcalidrawElements(elements as ImportedDataState["elements"]),
      ).toMatchSnapshot();
    });

    it("should bind arrows to existing text elements when start / end provided with ids", () => {
      const elements = [
        {
          x: 100,
          y: 239,
          type: "text",
          text: "HEYYYYY",
          id: "text-1",
          strokeColor: "#c2255c",
        },
        {
          type: "rectangle",
          x: 560,
          y: 139,
          id: "rect-1",
          width: 100,
          height: 200,
          backgroundColor: "#bac8ff",
        },
        {
          type: "arrow",
          x: 255,
          y: 239,
          label: {
            text: "HELLO WORLD!!",
          },
          start: {
            type: "text",
            id: "text-1",
          },
          end: {
            type: "rectangle",
            id: "rect-1",
          },
        },
      ];

      expect(
        convertToExcalidrawElements(elements as ImportedDataState["elements"]),
      ).toMatchSnapshot();
    });
  });

  it("should generate new ids if multiple elements contain same ids", () => {
    const elements = [
      {
        type: "rectangle",
        x: 300,
        y: 100,
        id: "rect-1",
        width: 100,
        height: 200,
      },

      {
        type: "rectangle",
        x: 100,
        y: 200,
        id: "rect-1",
        width: 100,
        height: 200,
      },
    ];
    expect(
      convertToExcalidrawElements(elements as ImportedDataState["elements"]),
    ).toMatchSnapshot();
  });
});