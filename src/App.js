const App = () => {
    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: "how are you?"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const url = 'http://localhost:8000/completions';
        console.log('url, options', url, options);
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div className="app">
      <section className={"sidebar"}>
        <button>+ New Chat</button>
        <ul className={"history"}>
            <li>stuff here</li>
        </ul>
        <nav>
          <p>Made by Sam</p>
        </nav>
      </section>
      <section className={"main"}>
          <h1>SamGPT</h1>
          <ul className={"feed"}>

          </ul>
          <div className={"bottom-section"}>
              <div className={"input-container"}>
                  <input/>
                  <div id={"submit"} onClick={getMessages}>➢</div>
              </div>
              <p className={"info"}>
                  ChatGPT clone preview. This is a beta using the ChatGPT API.
              </p>
          </div>
      </section>

    </div>
  );
}

export default App;
