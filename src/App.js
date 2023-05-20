const App = () => {
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
                  <div id={"submit"}>➢</div>
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
