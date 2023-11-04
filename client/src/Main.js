import { useState, useRef } from 'react';
import { Avatar, CssBaseline, Box, Typography, Container, Button, Unstable_Grid2 as Grid, LinearProgress, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ResponsiveBox from "./ResponsiveBox";
import Swal from "sweetalert2";
import axios from "axios";
import OpenAI from "openai";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Main = () => {
  const [type, setType] = useState("technology");
  const [file, setFile] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [response, setResponse] = useState("");
  const inputFile = useRef(null);

  const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

  const onClick = async () => {
    if (!file) {
      Swal.fire({
        title: "Operation Failed!",
        text: "No file selected",
        icon: "error",
        confirmButtonText: "Ok!",
      });

      return;
    }

    const fd = new FormData();
    fd.append('pdf', file);
    setFile(null);
    inputFile.current.value = "";

    let response;

    try {
      setCompleted(false);

      response = await axios.post("http://localhost:5001/extract-text", fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: `You are an investor investing in a ${type} startup. Review and anaylze their pitch. Give critique on their pitch by including the ups and downs of the different aspects in the pitch. Include a rating (out of 10) of how well the pitch convinced you as an investor.` },
          { role: "user", content: response?.data }
        ],
        model: "gpt-4"
      });

      setCompleted(true);
      setResponse(completion.choices[0].message.content);
    } catch (err) {
      if (err.response) {
        Swal.fire({
          title: "Operation Failed!",
          text: err.response.data.message ? err.response.data.message : err.response.data,
          icon: "error",
          confirmButtonText: "Ok!",
        });
      }
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, width: 64, height: 64 }} src="logo.png" />
      </Box>
      <ResponsiveBox>
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", textAlign: 'center' }}>
          Pitch Bot Demo
        </Typography>
        <TextField label="Company type" select fullWidth sx={{ marginTop: 2 }} onChange={e => setType(e.target.value)} value={type}>
          <MenuItem value="technology" selected>Technology</MenuItem>
          <MenuItem value="healthcare">Healthcare</MenuItem>
          <MenuItem value="education">Education</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="ecommerce">Ecommerce</MenuItem>
          <MenuItem value="marketing">Marketing</MenuItem>
        </TextField>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
              Upload file
              <VisuallyHiddenInput type="file" accept=".pdf" onChange={(e) => {
                setFile(e.target.files[0])
              }} ref={inputFile} />
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="success" onClick={onClick} disabled={file == null}>Review</Button>
          </Grid>
        </Grid>
        <LinearProgress sx={{ width: '100%', marginTop: 3, display: completed === false ? 'inline' : 'none' }} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", textAlign: 'center', marginTop: 4 }}>
          Critique:
        </Typography>
        <TextField multiline value={response} fullWidth sx={{
          marginTop: 1.5, "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          }
        }} rows={15} disabled></TextField>
      </ResponsiveBox>
    </Container>
  )
}

export default Main