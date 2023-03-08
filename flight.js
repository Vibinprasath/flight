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

export const Flight=()=> {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[passenger_id,setpassenger_id]=useState('')
    const[name,setName]=useState('')
    const[phone_num,setphone_num]=useState('')
    
    const[flt,setFlt]=useState([])
    const [numFlts, setNumFlts] = useState(0);
    const classes = useStyles();

    const handleClick=(e)=>{
        e.preventDefault()
        const Flight={passenger_id,name,phone_num}
        fetch("http://localhost:8080/post",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(Flight)
        }).then(()=>{
            console.log(flt)
            console.log("New flight added");
            setNumFlts(numFlts +1);
          });
};

const handleUpdate = (id) => {
//   const Flight = flt.find((s) => s.id === id);
  const updatedpassenger_id = prompt('Enter updated passenger_id:', Flight.passenger_id);
  const updatedname = prompt('Enter updated name', Flight.name);
  const updatedphone_num = prompt('Enter updated number', Flight.phone_num);
  
  const updatedFlt = {
   passenger_id: updatedpassenger_id,
    name: updatedname,
    phone_num: updatedphone_num,
  };
  console.log(updatedFlt)
  fetch('http://localhost:8080/put', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFlt),
  })

  .then(() => {
    setNumFlts(numFlts +1);
  });
};

const handleDelete = (id) => {
    console.log(id)
  fetch(`http://localhost:8080/delete?id=${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      setNumFlts(numFlts +1);
    });
};





useEffect(()=>{
    fetch("http://localhost:8080/get")
    .then(res=>res.json())
    .then((result)=>{
      setFlt(result);
      console.log(flt)
    }
  );
  },[numFlts]);

    return (
  <div style={{backgroundImage:"url('https://e0.pxfuel.com/wallpapers/187/400/desktop-wallpaper-sky-miscellanea-miscellaneous-flight-plane-airplane-aviation-thumbnail.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    
       <Container>
          <Paper elevation={3} style={paperStyle} >
              <h1 style={{color:"black"}}><u>Flight Ticket Booking</u></h1>
  
      <form className={classes.root} noValidate autoComplete="off">

      <TextField id="outlined-basic" label="passenger_id" variant="outlined" fullWidth 
        value={passenger_id}
        onChange={(e)=>setpassenger_id(e.target.value)}
        />
      
        <TextField id="outlined-basic" label="NAME" variant="outlined" fullWidth 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="phone_num" variant="outlined" fullWidth
        value={phone_num}
        onChange={(e)=>setphone_num(e.target.value)}
        />
       
       
        <Button variant="contained" color="primary" onClick={handleClick}>
    Submit
  </Button>
      </form>
     
      </Paper>
      <h1>Flights</h1>
  
      
        {flt.map((data)=>(
             <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={data.id}>
             <div className='output'>
             <div style={{ paddingRight: 50 }}>
            passenger_id:{data.passenger_id}<br/>
            name:{data.name}<br/>
            phone_num:{data.phone_num}<br/>
           
            
            </div>
            <div>
             <Button variant="contained" color='primary' style={{marginTop: 25,marginLeft: 200 }} onClick={()=>{handleDelete(data.passenger_id)}}>
               Delete
             </Button>
             <br/>
             <Button
   variant="contained"
   color="secondary"
   style={{ marginTop: 25, marginLeft: 200 }}
   onClick={() => handleUpdate(data.passenger_id)}
 >
   Update
 </Button>
            </div>
   </div>
           </Paper>
         ))}
       
        </Container> 
        </div>
  )
}
  export default Flight;