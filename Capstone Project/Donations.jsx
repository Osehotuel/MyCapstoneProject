import { useState } from "react";
import Web3 from "web3";

const DonationForm = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDonation = async () => {
    if (!window.ethereum) {
      setErrorMessage(
        "Metamask not detected. Please install Metamask to donate in Ethereum."
      );
      return;
    }

    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.enable(); // enable Metamask
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const amount = web3.utils.toWei(donationAmount, "ether");

      // send transaction
      await web3.eth.sendTransaction({
        from: account,
        to: "0x0C42e1f54B68d2097441d26D6cd4107b9CBA431F", // coin coach wallet ID
        value: amount,
      });

      // reset form and error message
      setDonationAmount("");
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while processing your donation.");
    }
  };

  const handleInputChange = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <div class="flex items-center justify-center h-screen">
      <div class="">
        <h1 className="font-bold text-xl">Like what we do at coin coach?</h1>
        <h2>Your Ethereum donation would help us do more </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="donation-amount"
            class="block text-gray-700 font-bold mb-2"
          >
            Donation Amount (ETH)
          </label>
          <input
            type="text"
            id="donation-amount"
            value={donationAmount}
            onChange={handleInputChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div class="flex items-center justify-center">
            <button onClick={handleDonation} className="">
              Donate
            </button>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
