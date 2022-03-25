function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle(){
    const url = `/account/bal/${email}`;
     
    
    //Grab user data
    async function userAsync() {
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setBalance(data[0].balance);
        userAuth(data[0])
        console.log(data.balance)
      });
    }
    
    
    
    function userAuth(user) {
    console.log(user)
    if (!user) {
      console.log(user);
      props.setStatus('fail!');      
      return;      
    }

    setBalance(user.balance);
    console.log(user);
    props.setStatus('Your balance is: ' + user.balance);
    props.setShow(false);
  }

userAsync();

}
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}