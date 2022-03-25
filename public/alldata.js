function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    //Fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
    <h5>All Data in Store</h5>
    {data}<br/>
    </>
  );
}


/* React.useEffect(() => {
    async function dataGrab() {
      var res = await fetch(url);
      var data = await res.json()
      setUser(data[0]);
    }
  dataGrab()
}, []);
 */
    












/* 
  //Fetch all accounts from API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUser(data[0]);
    });
}, []);
return (
  <>
  <h5>All Data in Store</h5>
  {data}<br/>
  </>
);
} */