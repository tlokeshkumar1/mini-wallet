import React, { useState } from 'react';
import Web3 from 'web3';
import { Input , Button } from '@mantine/core';
import { IconLock , IconUser } from '@tabler/icons-react';

function Home() {

    const [infuraApiKey, setInfuraApiKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [senderName, setSenderName] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [etherscanUrl] = useState('');
    
    const handleSendETH = async () => {

        try {

            const web3 = new Web3(`https://sepolia.infura.io/v3/${infuraApiKey}`);;
            const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(senderAccount.address);
            const weiToSend = web3.utils.toWei(amountToSend, 'ether');
            const etherscanUrl = `https://sepolia.etherscan.io/address/${recipientAddress}`;

            const txData = web3.utils.utf8ToHex(`Sender: ${senderName}, Receiver: ${receiverName}`);

            const txObject = {
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(21544), // Gas limit for a standard ETH transfer
                to: recipientAddress,
                value: web3.utils.toHex(weiToSend),
                data: txData, // Include sender and receiver names in the transaction data
            };

            const signedTx = await senderAccount.signTransaction(txObject);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            fetch("http://localhost:8000/home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    infuraApiKey,
                    senderName,
                    privateKey,
                    receiverName,
                    recipientAddress,
                    amountToSend,
                    transactionHash
                })
            })
            setTransactionHash(receipt.transactionHash);
        } catch (err) {
            console.error('Error sending ETH:', err);
        }
    };

    return (

        <center>
            <br />
            <h1>Ethereum Transaction</h1>
            <br />

            <div>
                <label>Enter Infura API Key :  </label>
                <Input.Wrapper id="input-demo">
                    <Input
                        type="text" id="input-demo" 
                        style={{ width: '500px' }}
                        size="xs"
                        value={infuraApiKey}
                        onChange={(e) => setInfuraApiKey(e.target.value)}
                    />
                </Input.Wrapper>
            </div>
            <br />
            <div>
                <label>Sender Name :  </label>
                <Input
                    type="text"
                    value={senderName} icon={<IconUser />} size="xs" style={{ width: '200px' }}
                    onChange={(e) => setSenderName(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>Private Key :  </label>
                <Input
                    type="text" size="xs" icon={<IconLock />} style={{ width: '500px' }}
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>Receiver Name :  </label>
                <Input
                    type="text"
                    value={receiverName} icon={<IconUser />} size="xs" style={{ width: '200px' }}
                    onChange={(e) => setReceiverName(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>Recipient Address :  </label>
                <Input
                    type="text"
                    value={recipientAddress} size="xs" style={{ width: '500px' }}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>How Much Coins Wants To Send (ETH) :  </label>
                <Input
                    type="text"
                    value={amountToSend} size="xs" style={{ width: '200px' }}
                    onChange={(e) => setAmountToSend(e.target.value)}
                />
            </div>
            <br />
            <Button color="dark" onClick={handleSendETH}>Send ETHEREUM</Button>
            {transactionHash && (
                <div>
                    <p>Transaction Successful !!!!!</p>

                    <p>Transaction Hash: {transactionHash}</p>

                    <p>Sender Name: {senderName}</p>

                    <p>Receiver Name: {receiverName}</p>

                    <p>Transaction Faucets: {amountToSend}</p>
                    
                    <a href={`https://sepolia.etherscan.io/address/${recipientAddress}`}>Etherscan</a>

                </div>
            )}

        </center>
    );

}

export default Home