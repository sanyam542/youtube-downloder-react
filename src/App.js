import Axios from "axios";
import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const input = useRef();
  // const [loading, setLoading] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    // setLoading(true);
    console.log(input);
    const data = await Axios.get(
      `https://ytdl-server.onrender.com/load?url=${input.current.value}`
    );
    setData(data);
    // setLoading(false);
  }
  return (
    <div className="App">
      <h1>Youtube Video Downloader</h1>
      <form action="" onSubmit={submitForm}>
        <input
          id="link"
          ref={input}
          type="text"
          placeholder="Enter youtube video link"
        />
        <br />
        <button type="submit">LOAD</button>
      </form>
      {data !== null ? (
        <>
          <iframe
            title="video"
            width="570"
            height="320"
            src={`${data.data.url}`}
          />
          <div
            style={{
              marginTop: "2rem",
              paddingLeft: "10rem",
              paddingRight: "10rem",
            }}
          >
            <h1>Avilable Formats</h1>
            <br />

            {data?.data.info.map((value) => (
              <a href={value.url}>
                {value.mimeType.split(";")[0] + " "}
                {value.hasAudio === false ? <>/no audio/ </> : null}
                {value.hasVideo ? value.height + "p" : ""}
                (Click To Download)
                <br />
                <br />
              </a>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
