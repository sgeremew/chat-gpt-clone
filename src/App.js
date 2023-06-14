import {useState, useEffect} from 'react';

const App = () => {
    const [ value, setValue ] = useState('');
    const [ message, setMessage ] = useState(null);
    const [ previousChats, setPreviousChats ] = useState([]);
    const [ currentTitle, setCurrentTitle ] = useState(null);

    const createNewChat = () => {
        setMessage(null);
        setValue('');
        setCurrentTitle(null);
    };

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
    };

    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {
            await getMessages();
        }
    };

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
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setMessage(data.choices?.[0].message || 'N/A');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        }
        if (currentTitle && value && message) {
            setPreviousChats(prevChats => (
                [...prevChats,
                    {
                        title: currentTitle,
                        role: 'user',
                        content: value
                    },
                    {
                        title: currentTitle,
                        role: message.role,
                        content: message.content
                    }
                ]
            ));
        }
    }, [message, currentTitle]);

    const currentChat = previousChats.filter(prevChat => prevChat.title === currentTitle);
    const uniqueTitles = Array.from(new Set(previousChats.map(prevChat => prevChat.title)));

  return (
    <div className="app">
      <section className={"sidebar"}>
        <button onClick={createNewChat}>+ New Chat</button>
          <ul className={"history"}>
              {uniqueTitles?.map((uniqueTitle, index) =>
                  <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          </ul>
        <nav>
          <p>Made by Sam</p>
        </nav>
      </section>
      <section className={"main"}>
          {!currentTitle && <h1>SamGPT</h1>}
          <ul className={"feed"}>
              {currentChat?.map((chatMessage, index) =>
                  <li key={index}>
                      <p className="role">{chatMessage.role}</p>
                      <p>{chatMessage.content}</p>
                  </li>)}
          </ul>
          <div className={"bottom-section"}>
              <div className={"input-container"}>
                  <input value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={handleKeyUp}/>
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
