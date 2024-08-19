// screen
// near
// uniform
// expect
// clap
// nephew
// knee
// identify
// pair
// current
// message
// pill
// design
// rail
// wheat
// lens
// hundred
// rocket
// top
// reveal
// retreat
// actress
// normal
// kid


import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, fromNano, TonClient, Cell } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "screen near uniform expect clap nephew knee identify pair current message pill design rail wheat lens hundred rocket top reveal retreat actress normal kid"; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });


  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  const balance = await client.getBalance(wallet.address);
  console.log("balance:", fromNano(balance));
  // print wallet address
  console.log(wallet.address.toString({ testOnly: true }));
  // print wallet workchain
  console.log("workchain:", wallet.address.workChain);

  // prepare Counter's initial code and data cells for deployment
  const counterCode = Cell.fromBoc(fs.readFileSync("build/counter.cell"))[0]; // compilation output from step 6
  const initialCounterValue = Date.now(); // to avoid collisions use current number of milliseconds since epoch as initial value
  const counter = Counter.createForDeploy(counterCode, initialCounterValue);

  // exit if contract is already deployed
  console.log("contract address:", counter.address.toString());
  if (await client.isContractDeployed(counter.address)) {
    return console.log("Counter already deployed");
  }
}

main();
// UQDao93OwGXKxF6LKiP4b7j1CZQO9n69pswpmMfO8tdgBaOb