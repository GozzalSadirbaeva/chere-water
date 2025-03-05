import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_POCKETBASE_URL;

function Translation() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/api/collections/translations/records`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.records) {
          setText(data.records[0].text); 
        }
      })
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  return (
    <div>
      <h1>Tarjima:</h1>
      <p>{text}</p>
    </div>
  );
}

export default Translation;
