import "@testing-library/jest-dom";
import { useDynamicSvgImport } from "./DynamicSVGImport";
import { renderHook } from "@testing-library/react";

describe("Testing dynamic svg imports", () => {
  it("Test dynamic Import", async() => {

    //hook with valid svg name
      const {result} = renderHook(()=>useDynamicSvgImport('delete'));
      console.log("BEFORE: ",result.current)

      await new Promise(resolve=>setTimeout(resolve, 500))
      console.log("AFTER: ",result.current)
  });
});
