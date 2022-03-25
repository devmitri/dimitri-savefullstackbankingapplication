function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [user, setUser] = React.useState(null);

  

  function handle(){

    const url = `/account/deposit/${email}`;

    
    //Grab user data
    async function userAsync() {
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUser(data[0]);
        userAuth(data[0]);
        setAmount(data[0].balance)
        console.log(amount)
        console.log(user)
      });
    }

  //Validate 
  function userAuth(user) {
    if (!user) {
      console.log(user);
      props.setStatus('fail!');
      return;      
    }
    console.log(user.balance);
    user.balance = Number(user.balance +amount);
    console.log(user.balance)
    props.setStatus('');      
    props.setShow(false);
  }
  userAsync();
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(Number(e.currentTarget.value))}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}