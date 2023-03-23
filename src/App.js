import React, { useEffect, useState } from 'react';
import './App.css';
import sound from './sound.png'
import cartoon from './cartoon.png'
const App = () => {
  const [search, setSearch] = useState("Lavish");
  const [audio, setAudio] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [defination, setDefination] = useState("");
  const [example, setExample] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [title, setTitle] = useState(false);

  const fetchInformation = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
    try {
      const fetchData = await fetch(url);
      const data = await fetchData.json();
      setTitle(false)
      setPhonetic(data[0].phonetic)
      setAudio(data[0].phonetics[0].audio)
      setPartOfSpeech(data[0].meanings[0].partOfSpeech)
      setDefination(data[0].meanings[0].definitions[0].definition)
      setExample(data[0].meanings[0].definitions[0].example)
    } catch (error) {
      setTitle(true);
    }
  }

  useEffect(() => {
    fetchInformation();
  }, [search])

  function handleSearch() {
    setSearch(document.getElementById("search").value)
  }
  function handleSound() {
    const sound = document.getElementById('voice');
    sound.play();
  }
  return (
    <>
      <h1>!!! Dictionary !!!</h1>
      <div className='background'>
        <div className='dictionary-box'>
          <div className="search-box">
            <input type="search" id="search" placeholder='Enter a word' />
            <button className='btn' onClick={handleSearch}>Search</button>
          </div>
          {title ? (
            <h3>Word not found</h3>
          ) :
            (
              <div className='information'>
                <h2>{search}</h2>
                <div className="part-of-speech">
                  <span>{partOfSpeech} {phonetic}</span>
                  {audio ? <img src={sound} alt="/" className='sound' onClick={handleSound} /> : <></>}
                </div>
                <p className='defination'><span>Defination:</span> {defination}</p>
                <p className='example'><span>Example: </span>{example ? example : "Not availabe"}</p>
                <audio src={audio} id='voice' />
              </div>)}
        </div>
        <img src={cartoon} alt="/" className='cartoon' />

      </div>
    </>

  )
}

export default App;
