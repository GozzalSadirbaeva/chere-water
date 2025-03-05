import { useCallback } from "react";

function useParseHTML() {
  const parseHTMLString = useCallback((htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.innerText || tempDiv.textContent;
  }, []);

  return { parseHTMLString };
}

export default useParseHTML;
