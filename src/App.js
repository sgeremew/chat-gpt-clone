import {useState, useEffect} from 'react';

const App = () => {
    const [ value, setValue ] = useState(null);
    const [ message, setMessages ] = useState(null);

    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
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
            setMessages(data.choices[0].message);
        } catch (err) {
            console.error(err);
        }
    };

    console.log('value: ', value);

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
                  <input value={value} onChange={(e) => setValue(e.target.value)}/>
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
