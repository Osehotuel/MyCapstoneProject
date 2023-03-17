
let accounts = [];

let walletAddress = "";

function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      /* MetaMask is installed */
      window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((accounts) => {
        accounts = accounts,
        walletAddress = accounts[0];
        accounts.push(walletAddress);
        console.log(walletAddress);
      }).catch((err) => {
        console.error(err.message);
      });
    } catch (err) {
      console.error(err.message);
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask");
  }
}

function getCurrentWalletConnected() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      window.ethereum.request({
        method: "eth_accounts",
      }).then((accounts) => {
        if (accounts.length > 0) {
          walletAddress = accounts[0];
          console.log(walletAddress);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      }).catch((err) => {
        console.error(err.message);
      });
    } catch (err) {
      console.error(err.message);
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask");
  }
}

function addWalletListener() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      walletAddress = accounts[0];
      console.log(walletAddress);
    });
  } else {
    /* MetaMask is not installed */
    walletAddress = "";    console.log("Please install MetaMask");
  }
}


//Sending Ethereum to an address

function pay(value){
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x28188604F07B326E803B0d3fB81a7F2241304520',
          value: '0x29a2241af62c0000',
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error(error));
};

function donate(address, value) {
  
  if (ethereum && ethereum.request) {
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: address,
            value: `0x${value.toString(16)}`,
            gasPrice: '0x09184e72a000',
            gas: '0x2710',
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  } else {
    console.error('Ethereum is not connected.');
  }
}


// function donate( address, value) { //for donations
//   ethereum
//     .request({
//       method: 'eth_sendTransaction',
//       params: [
//         {
//           from: accounts[0],
//           to: address,
//           value: `0x${value.toString(16)}`,
//           gasPrice: '0x09184e72a000',
//           gas: '0x2710',
//         },
//       ],
//     })
//     .then((txHash) => console.log(txHash))
//     .catch((error) => console.error(error));
// }

// // Example usage:
// // sendEthButton.addEventListener('click', () => {
// //   const address = '0x28188604F07B326E803B0d3fB81a7F2241304520';
// //   const value = 1000000000000000000; // 1 ETH in wei
// //   sendEthToAddress(value);
// // });

const connectWalletbtn = document.getElementById('connectWallet');

const donatebtn = document.getElementById("donate");

  // Add a click event listener to the button
  donatebtn.addEventListener('click', async () => {
    // Define the recipient address and the amount of ETH to send

    const address = "0x4717E8ce9790f0cF82d631AE3Ae684FA793d2D89"
    const value = 1000000000000000000; // 1 ETH in wei
  

    // Call the sendEthToAddress() function
    donate( address, value);
  });

  connectWalletbtn.addEventListener('click', async () => {
    connectWallet()
  })


// getCurrentWalletConnected();
// addWalletListener();




