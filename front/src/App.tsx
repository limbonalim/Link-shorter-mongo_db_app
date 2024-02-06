import './App.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import axiosApi from './axiosApi.ts';
import { ApiURL } from './constants.ts';
import { Button, Grid, TextField, Typography } from '@mui/material';

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
        <Grid container direction='column' spacing={2}>
          <Grid item><Typography variant='h2'>Shorten your link!</Typography></Grid>
          <Grid item>
            <TextField
              sx={{width: '100%'}}
              onChange={onChange}
              value={state.url}
              label='Link'
              name="url"
            />
          </Grid>
          <Grid item>
            <Button type="submit">Shorten!</Button>
          </Grid>

        </Grid>
      </form>
      {linkTag}
    </>

  );
};

export default App;
