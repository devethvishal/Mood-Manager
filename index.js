window.ethereum.request({
  method: "eth_requestAccounts",
});
var contractAddr = "0x9ba953cbc58cd42fea0972dc2901d75e7ec666fb";
var contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "oldMood",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newMood",
        type: "string",
      },
    ],
    name: "MoodChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
var Mood;

const provider = new ethers.providers.Web3Provider(
  window.ethereum,
  "ropsten"
);
provider.listAccounts().then((accounts) => {
  console.log(accounts[0]);
  const signer = provider.getSigner(accounts[0]);
  Mood = new ethers.Contract(contractAddr, contractAbi, signer);
});

const getMyMood = async () => {
  moodPromise = Mood.getMood();
  const mood = await moodPromise;
  console.log(mood);
  document.getElementById("moodUpdated").innerText="I am " + mood + " now.";
};

const setMyMood = async () => {
  const mood = document.getElementById("mood").value;
  document.getElementById("mood").value="";
  const tx = await Mood.setMood(mood);
  console.log(tx.hash);
  document.getElementById('status').setAttribute('style','display:block');
  document.querySelector('a').setAttribute('href',"https://ropsten.etherscan.io/tx/"+tx.hash);
  Mood.on("MoodChanged", (oldMood, newMood) => {
    console.log("newMood :" + newMood + " oldMood :" + oldMood);
    document.getElementById("moodUpdated").innerText =
      "I am " + newMood + " now.";
  });
};
//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