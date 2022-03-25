function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  //Set state
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);




  function handle(){
  const url = `/account/login/${email}/${password}`;

    
    //Grab user data
    async function userAsync() {
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser(data[0]);
        userAuth(data[0])
      });
    }
  
  //Validate 
  function userAuth(user) {
    if (!user) {
      console.log('one')      
      props.setStatus('fail!')      
      return;      
    }
    if (user.password == password) {
      console.log('Login success!')            
      props.setStatus('');
      props.setShow(false);
      return;      
    }
    console.log('three')          
    props.setStatus('fail!');        
  }
  
userAsync();


  /* userAsync()
  .then(() => {
    userAuth()
  }) */

  }
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
  };