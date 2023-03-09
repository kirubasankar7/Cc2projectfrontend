import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export const Medical=()=> {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId]=useState('')
    const[drugName,setDrugName]=useState('')
    const[strength,setStrength]=useState('')
    const[brand,setBrand]=useState('')
    
    const[med,setMed]=useState([])
    const [numMeds, setNumMeds] = useState(0);
    const classes = useStyles();

    const handleClick=(e)=>{
        e.preventDefault()
        const Medical={id,drugName,strength,brand,}
        console.log(med)
        fetch("http://localhost:8080/post",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(Medical)
        }).then(()=>{
            console.log("New Med added");
            setNumMeds(numMeds +1);
          });
};

const handleUpdate = (id) => {
  const Medical = med.find((s) => s.id === id);
  const updateddrugName = prompt('Enter updated drugname:', Medical.drugName);
  const updatedstrength = prompt('Enter updated strength', Medical.strength);
  const updatedbrand = prompt('Enter updated brand', Medical.brand);
  
  const updatedMed = {
    id: Medical.id,
  DrugName: updateddrugName,
    Strength:updatedstrength,
    Brand:updatedbrand,
    
  };
  fetch('http://localhost:8080/put', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedMed),
  })

  .then(() => {
    setNumMeds(numMeds +1);
  });
};

const handleDelete = (id) => {
  fetch(`http://localhost:8080/delete?id=${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      setNumMeds(numMeds +1);
    });
};





useEffect(()=>{
    fetch("http://localhost:8080/get")
    .then(res=>res.json())
    .then((result)=>{
      setMed(result);
    }
  );
  },[numMeds]);
    return (
  
      <Container>
          <Paper elevation={3} style={paperStyle} >
              <h1 style={{color:"green"}}><u>Add Medicine</u></h1>
  
      <form className={classes.root} noValidate autoComplete="off">

      <TextField id="outlined-basic" label="ID" variant="outlined" fullWidth 
        value={id}
        onChange={(e)=>setId(e.target.value)}
        />
      
        <TextField id="outlined-basic" label="DRUGNAME" variant="outlined" fullWidth 
        value={drugName}
        onChange={(e)=>setDrugName(e.target.value)}
        />
        <TextField id="outlined-basic" label="STRENGTH" variant="outlined" fullWidth
        value={strength}
        onChange={(e)=>setStrength(e.target.value)}
        />
        <TextField id="outlined-basic" label="BRAND" variant="outlined" fullWidth 
        value={brand}
        onChange={(e)=>setBrand(e.target.value)}
        />
       
        <Button variant="contained" color="secondary" onClick={handleClick}>
    Submit
  </Button>
      </form>
     
      </Paper>
      <h1>Medicine list</h1>
  
      
  
        {med.map((Medical)=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={Medical.id}>
            <div className='output'>
            <div style={{ paddingRight: 50 }}>
           Id:{Medical.id}<br/>
           DrugName:{Medical.drugName}<br/>
           Strength:{Medical.strength}<br/>
          Brand:{Medical.brand}<br/>
           
           </div>
           <div>
            <Button variant="contained" color='secondary' style={{marginTop: 25,marginLeft: 200 }} onClick={() =>handleDelete(Medical.id)}>
              Delete
            </Button>
            <br/>
            <Button
  variant="contained"
  color="secondary"
  style={{ marginTop: 25, marginLeft: 200 }}
  onClick={() => handleUpdate(Medical.id)}
>
  Update
</Button>
           </div>
  </div>
          </Paper>
        ))}
      
        </Container>
  )
}
  export default Medical