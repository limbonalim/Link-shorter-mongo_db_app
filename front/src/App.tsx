import './App.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import axiosApi from './axiosApi.ts';
import { ApiURL } from './constants.ts';

interface IApiAnswer {
  originalUrl: string;
  shortUrl: string;
}

interface IPostData {
  url: string;
}

const App = () => {
  const [state, setState] = useState<IPostData>({
    url: ''
  });
  const [link, setLink] = useState<IApiAnswer>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prev => (
      {
        ...prev,
        [name]: value
      }
    ));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await axiosApi.post(`/links`, state);
    setLink(result.data);
    setState({url: ''});
  };

  let linkTag;

  if (link?.shortUrl) {
    linkTag = (<a href={`${ApiURL}/${link.shortUrl}`} target="_blank">{`${ApiURL}/${link.shortUrl}`}</a>);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Shorten your link!</h1>
        <input
          onChange={onChange}
          value={state.url}
          name="url"
        />
        <button type="submit">Shorten!</button>
      </form>
      {linkTag}
    </>

  );
};

export default App;
