
/*Q1) Describe the process, in a react/redux project, to fetch a set of data from a remote API endpoint, then to store that data into redux and then to present it on the screen.?

first of all I do create the redux store either with createStore function from react redux
or with configureStore from redux toolkit

1) with configureStore
  a) creating the Store
  - create a store with a root reducer 
  - provide the store to the react app root file (as index.js)
  - create the slice with createSlice and set the initialeState
  - create the reducer and the action for the slice and export them to be used in store
  - add the reducer to the store root reducer

  b) data fetching and usage
  - now we can fetch data from the API endpoint using fetch, axios or my preffered tool unfetch
  - client-side fetch is done in componentDidMount lifecycle or in useEffect for function components
  - then we dispatch the result data with useDispatch() hook and now the fetched data is in our store ready to be accessed in all of our app
  - to access the fetched data I do access the store with useSelector hook from react-redux and store it in a constant
  - now we can use it in our tsx and ofcourse I do handle the success and error too in that stage

2) in serverSide fetching as in (NextJS)
  - I create the store with react-toolkit as in the previous example
  - but here I will have to use something called next-redux-wrapper to be able to rehydrate the clientSide Store with the serverSide Store 
    to prevent data loss after the server has done with fetching data
  - export the wrapper with the store in it
  - provide it to the _app.js file (root nextJS file) as a HOC

  - I will use getServerSideProps from the wrapper we created early
  - fetch the data from the API endpoint with getServerSideProps (a NextJS function that will run the data fetching on the serverSide)
  - then I dispatch to the store with the fetched data result inside getServerSideProps
  - then I can use that data with useSelector 
  
*/


// Q2) generateUrl

const params = {
    height: 300,
    interval: "3h",
    locale: "en",
    toolbar_bg: "",
    pair: "BTC_USD",
    width: 360,
  };
  
  function generateUrl(params) {
    let url = new URL("http://testurl.bitfinx.com/");
    let filteredParams = Object.keys(params)
      .filter((i) => {
        // check for empty null or undefined values
        if (params[i]) return i;
      })
      .forEach((key) => {
        // add to the url parameters
        url.searchParams.append(key, params[key]);
      });
    return url.href
  }
  //test result
  console.log(generateUrl(params));


// Q3) code refactor

const volumeSetup = function volumeSetup() {
  // name the function so that you don't get a console errpr with annonymous function → bettter for debug
  // setup volume unit interface
  const volumeUnit = window.APP.util
    .getSettings("ticker_vol_unit")
    .toUpperCase();

  // I will use swtich statment instead of many else if
  // also we don't need element variable as we can use .prop here directly
  switch (volumeUnit) {
    case "FIRSTCCY":
      $("#tickervolccy_0").prop("checked", true);
      break;
    case "USD":
      $("#tickervolccy_USD").prop("checked", true);
      break;
    case "BTC":
      $("#tickervolccy_BTC").prop("checked", true);
      break;
    case "ETH":
      $("#tickervolccy_ETH").prop("checked", true);
      break;

    default: // if it has no value
      break; // or through an error here
  }

  // override currencies list

  return window.APP.util.initCurrenciesList(); // return the result directly
};

/* what I have done in the refactoring
  - named the function inside the function expression better for debugging rather than annonymous function name
  - use switch instead of multiple else if
  - remove element variable as this step is not needed because we can change "checked" prop inside switch cases
  - return the result directly instead of storing it in a variable result
   */
