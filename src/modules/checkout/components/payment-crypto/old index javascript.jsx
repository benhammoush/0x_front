import { navigate } from "gatsby"
import React, { useState, Fragment, useEffect, useRef } from "react"
import { useCart } from "../../../hooks/use-cart"
import WalletConnectLogo from "../../../icons/walletconnect.svg"
import MetamaskConnectLogo from "../../../icons/metamask.svg"
import AvaxLogo from "../../../icons/avax.svg"
import ArbiLogo from "../../../icons/Arbitrum.svg"
import ErrLogo from "../../../icons/error_icon.svg"
import MaticLogo from "../../../icons/matic.svg"
import UsdcLogo from "../../../icons/usdc.svg"
import JeurLogo from "../../../icons/jeur.svg"
import TetherLogo from "../../../icons/tether.svg"
import EthLogo from "../../../icons/eth.svg"
import EuLogoW from "../../../icons/euw.svg"
import EuLogoB from "../../../icons/eub.svg"
import ErrorMessage from "../../utility/error-message"
import DaiLogo from "../../../icons/dai.svg"
import BnbLogo from "../../../icons/bnb.svg"
import buffer from "buffer"
import { Menu, Transition, Dialog } from "@headlessui/react"

const { Buffer } = buffer

if (!window.Buffer) window.Buffer = Buffer

const ManualPayment = () => {

  const [curr, setcurr] = useState("ETH")
  const delay = ms => new Promise(res => setTimeout(res, ms))
  const [total, settotal] = useState(Storage.totaleth)
  const [net, setnet] = useState("Arbitrum")
  let [isOpenPay, setisOpenPay] = useState(false)
  let [isOpenNetErr, setisOpenNetErr] = useState(false)
  let [isOpenTxErr, setisOpenTxErr] = useState(false)
  let [isOpenMeta, setisOpenMeta] = useState(false)

  var myCanvas = document.getElementById("canva")

  const [currprice, setcurrprice] = useState(Storage.ethprice)
  const { ethers } = require("ethers")
  const confetti = require("canvas-confetti")

  const elemEth = document.getElementById("ethereum")
  const elemArb = document.getElementById("arbitrum")
  const elemAva = document.getElementById("avalanche")
  const elemPol = document.getElementById("polygon")
  const elemBin = document.getElementById("binance")
  const elemRin = document.getElementById("rinkeby")

  // addresses
  const usdt_eth = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const usdc_eth = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const usdt_avax = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7"
  const usdt_poly = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
  const usdt_arbi = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  const usdt_rink = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02"
  const dai_avax = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
  const dai_arbi = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
  const usdc_arbi = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
  const usdc_bsc = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
  const poly_matic = "0x0000000000000000000000000000000000001010"
  const dai_matic = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
  const jeur_matic = "0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c"
  const bnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const usdt_bsc = "0x55d398326f99059fF775485246999027B3197955"
  // abi
  const usdt_abi = require("./usdt-abi.json")
  const usdc_abi = require("./usdc-abi.json")
  const avax_abi = require("./avax-abi.json")
  
  const usdc_arbi_abi = require("./usdc-arbi-abi.json")
  const dai_arbi_abi = require("./dai-arbi-abi.json")
  const usdt_arbi_abi = require("./usdt-arbi-abi.json")
  
  const dai_avax_abi = require("./dai-avax-abi.json")
  const usdt_avax_abi = require("./usdt-avax-abi.json")

  const usdt_poly_abi = require("./usdt-poly-abi.json")
  const matic_poly_abi = require("./matic_abi.json")
  const dai_poly_abi = require("./dai-poly-abi.json")
  const jeur_poly_abi = require("./jeur-poly-abi.json")

  const bnb_bsc_abi = require("./bnb-abi.json")
  const usdt_bsc_abi = require("./usdt-bsc-abi.json")
  const usdt_rink_abi = require("./usdt-rink-abi.json")


  const {
    actions: { completeCart, setPaymentSession },
  } = useCart()

  const [processing, setProcessing] = useState(false)
  const [currlog, setCurrLog] = useState(EthLogo)
  const [currnet, setCurrNet] = useState(ArbiLogo)
  const [connected, setConnected] = useState(false)
  const [id, setId] = useState(null)

  function ClosePayModal() {
    setisOpenPay(false)
  }

  function CloseErrNetModal() {
    setisOpenNetErr(false)
  }

  function CloseErrTxModal() {
    setisOpenTxErr(false)
  }

  function CloseMetaModal() {
    setisOpenMeta(false)
  }
  
  function openModal() {
    setisOpenPay(true)
  }

  function Avaxselected() {
    setcurr("AVAX")
    setCurrLog(AvaxLogo)
    setCurrNet(AvaxLogo)
    setnet("Avalanche")
    settotal(Storage.totalavax)
    setcurrprice(Storage.avaxprice)
    if (elemEth) {
      elemEth.style.display = "none"
    }
    if (elemAva) {
      elemAva.style.display = "block"
    }
    if (elemPol) {
      elemPol.style.display = "none"
    }
    if (elemBin) {
      elemBin.style.display = "none"
    }
    if (elemArb) {
      elemArb.style.display = "none"
    }
    if (elemRin) {
      elemRin.style.display = "none"
    }
  }

  function Etherselected() {
    setcurr("ETH")
    setCurrLog(EthLogo)
    setCurrNet(EthLogo)
    setnet("Ethereum")
    settotal(Storage.totaleth)
    setcurrprice(Storage.ethprice)
    if (elemEth) {
      elemEth.style.display = "block"
    }
    if (elemAva) {
      elemAva.style.display = "none"
    }
    if (elemPol) {
      elemPol.style.display = "none"
    }
    if (elemBin) {
      elemBin.style.display = "none"
    }
    if (elemArb) {
      elemArb.style.display = "none"
    }
    if (elemRin) {
      elemRin.style.display = "none"
    }
  }

  function Polyselected() {
    setcurr("MATIC")
    setCurrNet(MaticLogo)
    setCurrLog(MaticLogo)
    setnet("Polygon")
    setcurrprice(Storage.maticprice)
    settotal(Storage.totalmatic)
    if (elemEth) {
      elemEth.style.display = "none"
    }
    if (elemAva) {
      elemAva.style.display = "none"
    }
    if (elemPol) {
      elemPol.style.display = "block"
    }
    if (elemBin) {
      elemBin.style.display = "none"
    }
    if (elemArb) {
      elemArb.style.display = "none"
    }
  }

  function Binanselected() {
    setcurr("BNB")
    setCurrLog(BnbLogo)
    setCurrNet(BnbLogo)
    setnet("Binance Chain")
    setcurrprice(Storage.bnbprice)
    settotal(Storage.totalbnb)
    if (elemEth) {
      elemEth.style.display = "none"
    }
    if (elemAva) {
      elemAva.style.display = "none"
    }
    if (elemPol) {
      elemPol.style.display = "none"
    }
    if (elemBin) {
      elemBin.style.display = "block"
    }
    if (elemArb) {
      elemArb.style.display = "none"
    }
    if (elemRin) {
      elemRin.style.display = "none"
    }
  }

  function Arbitselected() {
    setcurr("ETH")
    setCurrLog(EthLogo)
    setCurrNet(ArbiLogo)
    setnet("Arbitrum")
    setcurrprice(Storage.ethprice)
    settotal(Storage.totaleth)
    if (elemEth) {
      elemEth.style.display = "none"
    }
    if (elemAva) {
      elemAva.style.display = "none"
    }
    if (elemPol) {
      elemPol.style.display = "none"
    }
    if (elemBin) {
      elemBin.style.display = "none"
    }
    if (elemArb) {
      elemArb.style.display = "block"
    }
    if (elemRin) {
      elemRin.style.display = "none"
    }
  }

  function Rinkselected() {
    setcurr("ETH")
    setCurrLog(EthLogo)
    setCurrNet(EthLogo)
    setnet("Rinkeby")
    setcurrprice(Storage.ethprice)
    settotal(Storage.totaleth)
    if (elemEth) {
      elemEth.style.display = "none"
    }
    if (elemAva) {
      elemAva.style.display = "none"
    }
    if (elemPol) {
      elemPol.style.display = "none"
    }
    if (elemBin) {
      elemBin.style.display = "none"
    }
    if (elemArb) {
      elemArb.style.display = "none"
    }
    if (elemRin) {
      elemRin.style.display = "block"
    }
  }

  function Tetherselected() {
    setcurr("USDT")
    setCurrLog(TetherLogo)
    settotal(Storage.totalusdt)
    setcurrprice(Storage.usdtprice)
  }

  function JEURselected() {
    setcurr("JEUR")
    setCurrLog(JeurLogo)
    settotal(Storage.totaljeur)
    setcurrprice(Storage.jeurprice)
  }

  function Maticselected() {
    setcurr("MATIC")
    setCurrLog(MaticLogo)
    settotal(Storage.totalmatic)
    setcurrprice(Storage.maticprice)
  }

  function USDCselected() {
    setcurr("USDC")
    setCurrLog(UsdcLogo)
    settotal(Storage.totalusdc)
    setcurrprice(Storage.usdcprice)
  }

  function Ethselected() {
    setcurr("ETH")
    setCurrLog(EthLogo)
    settotal(Storage.totaleth)
    setcurrprice(Storage.ethprice)
  }

  function AVAselected() {
    setcurr("AVAX")
    setCurrLog(AvaxLogo)
    settotal(Storage.totalavax)
    setcurrprice(Storage.avaxprice)
  }

  function DAIselected() {
    setcurr("DAI")
    setCurrLog(DaiLogo)
    settotal(Storage.totaldai)
    setcurrprice(Storage.daiprice)
  }

  function BNBselected() {
    setcurr("BNB")
    setCurrLog(BnbLogo)
    settotal(Storage.totalbnb)
    setcurrprice(Storage.bnbprice)
  }

  const handleMetamask = async () => { 
    /**
     * * Paiement metamask
     * TODO VERIFIER LES APROUVES
     */


     if (window.ethereum && window.ethereum.isMetaMask) {
     const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  

     provider.on("network", (newNetwork, oldNetwork) => {
       if (oldNetwork) {
         window.location.reload()
       }
     })
     
    const accounts = await provider.send("eth_requestAccounts", [])
    const network = await provider.getNetwork()
    const signer = provider.getSigner()

    if (curr == "ETH" && net == "Ethereum") {
    /**
    * * ETH PAYMENT ON MAINNET
    * ? FONCTIONNE
    */
      if (network.chainId == 1) {
        setProcessing(true)
        const tx = {
          from: accounts[0],
          to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
          value: ethers.utils.parseEther(total.toString()),
          nonce: await provider.getTransactionCount(accounts[0], "latest"),
          gasLimit: ethers.utils.hexlify(21000),
          gasPrice: ethers.utils.hexlify(
            parseInt(await provider.getGasPrice())
          ),
        }
        signer
        .sendTransaction(tx)
        .then(transaction => {
          var hashval = parseInt(transaction.value._hex, 16) / 100
          Storage.hash = transaction.hash
          Storage.hashfrom = transaction.from
          Storage.hashto = transaction.to
          Storage.hashvalue = hashval
          if (
            transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
            hashval == total.toString()
          ) {
            ValidatePayment()
          }
        })
        .catch((error) => {
          Storage.errorTx = error.message
          setProcessing(false)
          setisOpenTxErr(true)
        })
      } else {
        setProcessing(false)
        setisOpenNetErr(true)
      }
    }

    if (curr == "USDT" && net == "Ethereum") {
      /**
      * * USDT PAYMENT ON MAINNET
      * ? FONCTIONNE
      */
        if (network.chainId == 1) {
          setProcessing(true)
          var contract = new ethers.Contract(usdt_eth, usdt_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdt_rink_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "USDC" && net == "Ethereum") {
      /**
      * * USDC PAYMENT ON MAINNET
      * ? FONCTIONNE
      */
        if (network.chainId == 1) {
          setProcessing(true)
          console.log(total)
          var contract = new ethers.Contract(usdc_eth, usdc_abi, signer)
          console.log(contract)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdt_rink_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "ETH" && net == "Rinkeby") {
    /**
    * * ETH PAYMENT ON RINKEBY
    * 
    */
      if (network.chainId == 4) {
        setProcessing(true)
        const tx = {
          from: accounts[0],
          to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
          value: ethers.utils.parseEther(total.toString()),
          nonce: await provider.getTransactionCount(accounts[0], "latest"),
          gasLimit: ethers.utils.hexlify(21000),
          gasPrice: ethers.utils.hexlify(
            parseInt(await provider.getGasPrice())
          ),
        }
        signer
          .sendTransaction(tx)
          .then(transaction => {
            var hashval = parseInt(transaction.value._hex, 16) / 100
            hashval = hashval / 10000000000000000
            Storage.hash = transaction.hash
            Storage.hashfrom = transaction.from
            Storage.hashto = transaction.to
            Storage.hashvalue = hashval
            if (
              transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
              hashval == total.toString()
            ) {
              ValidatePayment()
            }else
            {
              Storage.errorTx = "Wrong Address or Value detected"
              setisOpenTxErr(true)
              setProcessing(false)
            }
          })
          .catch((error) => {
            Storage.errorTx = error.message
            setProcessing(false)
            setisOpenTxErr(true)
          })
      } else {
        setProcessing(false)
        setisOpenNetErr(true)
      }
    }

    if (curr == "USDT" && net == "Rinkeby") {
    /**
    * * USDT PAYMENT ON RINKEBY
    */
      if (network.chainId == 4) {
        setProcessing(true)
        var contract = new ethers.Contract(usdt_rink, usdt_rink_abi, signer)
        var numberOfTokens = ethers.utils.parseEther(total.toString())
        contract
          .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
          .then(function () {
            contract
              .transfer(
                "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                numberOfTokens
              )
              .then(transaction => {
                const inter = new ethers.utils.Interface(usdt_rink_abi)
                const decodedInput = inter.parseTransaction({
                  data: transaction.data,
                  value: transaction.value,
                })
                var hashval = parseInt(decodedInput.args[1])
                hashval = hashval / 1000000000000000000
                Storage.hash = transaction.hash
                Storage.hashfrom = transaction.from
                Storage.hashto = decodedInput.args[0]
                Storage.hashvalue = hashval
                if (
                  decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                  hashval == total.toString()
                ) {
                  ValidatePayment()
                }else
                {
                  Storage.errorTx = "Wrong Address or Value detected"
                  setisOpenTxErr(true)
                  setProcessing(false)
                }
              })
          })
          .catch((error) => {
            Storage.errorTx = error.message
            setProcessing(false)
            setisOpenTxErr(true)
          })
      } else {
        setProcessing(false)
        setisOpenNetErr(true)
      }
    }

    if (curr == "ETH" && net == "Arbitrum") {
      /**
      * * ETH PAYMENT ON ARBITRUM
      * ? FONCTIONNE
      */
        if (network.chainId == 42161) {
          setProcessing(true)
          const tx = {
            from: accounts[0],
            to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
            value: ethers.utils.parseEther(total.toString()),
            nonce: await provider.getTransactionCount(accounts[0], "latest"),
            gasLimit: ethers.utils.hexlify(21000),
            gasPrice: ethers.utils.hexlify(
              parseInt(await provider.getGasPrice())
            ),
          }
          signer
          .sendTransaction(tx)
          .then(transaction => {
            var hashval = parseInt(transaction.value._hex, 16) / 100
            Storage.hash = transaction.hash
            Storage.hashfrom = transaction.from
            Storage.hashto = transaction.to
            Storage.hashvalue = hashval
            if (
              transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
              hashval == total.toString()
            ) {
              ValidatePayment()
            }else
            {
              Storage.errorTx = "Wrong Address or Value detected"
              setisOpenTxErr(true)
            }
          })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "USDT" && net == "Arbitrum") {
      /**
      * * USDT PAYMENT ON ARBITRUM
      * ? FONCTIONNE
      */
        if (network.chainId == 42161) {
          setProcessing(true)
          var contract = new ethers.Contract(usdt_arbi, usdt_abi, signer)
          contract.attach("0x1eFB3f88Bc88f03FD1804A5C53b7141bbEf5dED8")
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdt_arbi_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "USDC" && net == "Arbitrum") {
      /**
      * * USDC PAYMENT ON ARBITRUM
      * ? FONCTIONNE
      */
        if (network.chainId == 42161) {
          setProcessing(true)
          var contract = new ethers.Contract(usdc_arbi, usdc_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdc_arbi_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "AVAX" && net == "Avalanche") {
      /**
      * * AVAX PAYMENT ON AVALANCHE
      * ? FONCTIONNE
      */
        if (network.chainId == 43114) {
          setProcessing(true)
          const tx = {
            from: accounts[0],
            to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
            value: ethers.utils.parseEther(total.toString()),
            nonce: await provider.getTransactionCount(accounts[0], "latest"),
            gasLimit: ethers.utils.hexlify(21000),
            gasPrice: ethers.utils.hexlify(
              parseInt(await provider.getGasPrice())
            ),
          }
          signer
          .sendTransaction(tx)
          .then(transaction => {
            var hashval = parseInt(transaction.value._hex, 16) / 100
            Storage.hash = transaction.hash
            Storage.hashfrom = transaction.from
            Storage.hashto = transaction.to
            Storage.hashvalue = hashval
            if (
              transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
              hashval == total.toString()
            ) {
              ValidatePayment()
            }else
            {
              Storage.errorTx = "Wrong Address or Value detected"
              setisOpenTxErr(true)
              setProcessing(false)
            }
          })
          .catch((error) => {
            Storage.errorTx = error.message
            setProcessing(false)
            setisOpenTxErr(true)
          })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }
             
    if (curr == "DAI" && net == "Avalanche") {
      /**
      * * DAI PAYMENT ON AVALANCHE
      * ? FONCTIONNE
      */
        if (network.chainId == 43114) {
          setProcessing(true)
          var contract = new ethers.Contract(dai_avax, dai_avax_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(dai_avax_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "USDT" && net == "Avalanche") {
      /**
      * * USDT PAYMENT ON AVALANCHE
      * ? FONCTIONNE
      */
        if (network.chainId == 43114) {
          setProcessing(true)
          var contract = new ethers.Contract(usdt_avax, usdt_avax_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdt_avax_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "MATIC" && net == "Polygon") {
      /**
      * * MATIC PAYMENT ON POLYGON
      * ? FONCTIONNE
      */
        if (network.chainId == 137) {
          setProcessing(true)
          const tx = {
            from: accounts[0],
            to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
            value: ethers.utils.parseEther(total.toString()),
            nonce: await provider.getTransactionCount(accounts[0], "latest"),
            gasLimit: ethers.utils.hexlify(21000),
            gasPrice: ethers.utils.hexlify(
              parseInt(await provider.getGasPrice())
            ),
          }
          signer
          .sendTransaction(tx)
          .then(transaction => {
            var hashval = parseInt(transaction.value._hex, 16) / 100
            Storage.hash = transaction.hash
            Storage.hashfrom = transaction.from
            Storage.hashto = transaction.to
            Storage.hashvalue = hashval
            if (
              transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
              hashval == total.toString()
            ) {
              ValidatePayment()
            }else
            {
              Storage.errorTx = "Wrong Address or Value detected"
              setisOpenTxErr(true)
              setProcessing(false)
            }
          })
          .catch((error) => {
            Storage.errorTx = error.message
            setProcessing(false)
            setisOpenTxErr(true)
          })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }
              
    if (curr == "DAI" && net == "Polygon") {
      /**
      * * DAI PAYMENT ON POLYGON
      * ? FONCTIONNE
      */
        if (network.chainId == 137) {
          setProcessing(true)
          var contract = new ethers.Contract(dai_matic, dai_poly_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(dai_poly_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "JEUR" && net == "Polygon") {
      /**
      * * JEUR PAYMENT ON POLYGON
      * ? FONCTIONNE
      */
        if (network.chainId == 137) {
          setProcessing(true)
          var contract = new ethers.Contract(jeur_matic, jeur_poly_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(jeur_poly_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "BNB" && net == "Binance Chain") {
      /**
      * * BNB PAYMENT ON BINANCE CHAIN
      * ? FONCTIONNE
      */
        if (network.chainId == 56) {
          setProcessing(true)
          const tx = {
            from: accounts[0],
            to: "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
            value: ethers.utils.parseEther(total.toString()),
            nonce: await provider.getTransactionCount(accounts[0], "latest"),
            gasLimit: ethers.utils.hexlify(21000),
            gasPrice: ethers.utils.hexlify(
              parseInt(await provider.getGasPrice())
            ),
          }
          signer
          .sendTransaction(tx)
          .then(transaction => {
            var hashval = parseInt(transaction.value._hex, 16) / 100
            Storage.hash = transaction.hash
            Storage.hashfrom = transaction.from
            Storage.hashto = transaction.to
            Storage.hashvalue = hashval
            if (
              transaction.to == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
              hashval == total.toString()
            ) {
              ValidatePayment()
            }else
            {
              Storage.errorTx = "Wrong Address or Value detected"
              setisOpenTxErr(true)
              setProcessing(false)
            }
          })
          .catch((error) => {
            Storage.errorTx = error.message
            setProcessing(false)
            setisOpenTxErr(true)
          })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }
              
    if (curr == "USDC" && net == "Binance Chain") {
      /**
      * * USDC PAYMENT ON BINANCE CHAIN
      * ? FONCTIONNE
      */
        if (network.chainId == 56) {
          setProcessing(true)
          var contract = new ethers.Contract(usdc_bsc, usdc_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(bnb_bsc_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }

    if (curr == "USDT" && net == "Binance Chain") {
      /**
      * * USDT PAYMENT ON BINANCE CHAIN
      * ? Fonctionne
      */
        if (network.chainId == 56) {
          setProcessing(true)
          var contract = new ethers.Contract(usdt_bsc, usdt_abi, signer)
          var numberOfTokens = ethers.utils.parseEther(total.toString())
          contract
            .approve("0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC", numberOfTokens)
            .then(function () {
              contract
                .transfer(
                  "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC",
                  numberOfTokens
                )
                .then(transaction => {
                  const inter = new ethers.utils.Interface(usdt_bsc_abi)
                  const decodedInput = inter.parseTransaction({
                    data: transaction.data,
                    value: transaction.value,
                  })
                  var hashval = parseInt(decodedInput.args[1])
                  hashval = hashval / 1000000000000000000
                  Storage.hash = transaction.hash
                  Storage.hashfrom = transaction.from
                  Storage.hashto = decodedInput.args[0]
                  Storage.hashvalue = hashval
                  if (
                    decodedInput.args[0] == "0x6C14FF6C1F38300f80DF009ee3d896dEB72D75FC" &&
                    hashval == total.toString()
                  ) {
                    ValidatePayment()
                  }else
                  {
                    Storage.errorTx = "Wrong Address or Value detected"
                    setisOpenTxErr(true)
                    setProcessing(false)
                  }
                })
            })
            .catch((error) => {
              Storage.errorTx = error.message
              setProcessing(false)
              setisOpenTxErr(true)
            })
        } else {
          setProcessing(false)
          setisOpenNetErr(true)
        }
      }
    }else{
      setisOpenMeta(true)
    }
  }

  const ValidatePayment = async () => {
    /**
     * * Validation du paiement
     * ? Ajouter les données de la Tx dans l'order ?
     */ 
    openModal()
    var myConfetti = confetti.create(myCanvas, { resize: true })
    myConfetti({particleCount: 100,spread: 160})
    await delay(7500)
    const cart = await setPaymentSession("manual")
    if (!cart) {
      setProcessing(false)
      return
    }
    const order = await completeCart(cart.id)
    if (!order) {
      setProcessing(false)
      return
    }
    setProcessing(false)
    navigate("/order-confirmed", { state: { order } })
  }

  return (
    <div>
      <div
        className={
          processing
            ? "pointer-events-none grid  animate-pulse items-center justify-center gap-x-20 pt-10 pb-10 text-black dark:text-white"
            : "grid items-center justify-center gap-x-20 pt-10 text-black dark:text-white"
        }
      >
        <div className="flex mb-5 gap-x-20">
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {net}{" "}
                  <img
                    src={currnet}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Arbitselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Arbitrum
                          <img src={ArbiLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Avaxselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Avalanche
                          <img src={AvaxLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Binanselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Binance (SC)
                          <img src={BnbLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Etherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Ethereum
                          <img src={EthLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Polyselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Polygon
                          <img src={MaticLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Rinkselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Rinkeby (dev)
                          <img src={EthLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="ethereum">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Ethselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          ETH
                          <img src={EthLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Tetherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDT
                          <img src={TetherLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={USDCselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDC
                          <img src={UsdcLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="avalanche" className="hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={AVAselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          AVAX
                          <img src={AvaxLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={DAIselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          DAI
                          <img src={DaiLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Tetherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDT
                          <img src={TetherLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="polygon" className="hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Maticselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          MATIC
                          <img src={MaticLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={DAIselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          DAI
                          <img src={DaiLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={JEURselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          JEUR
                          <img src={JeurLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="binance" className="hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={BNBselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          BNB
                          <img src={BnbLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={USDCselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDC
                          <img src={UsdcLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Tetherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDT
                          <img src={TetherLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="arbitrum" className="hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Ethselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          ETH
                          <img src={EthLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Tetherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDT
                          <img src={TetherLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={USDCselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDC
                          <img src={UsdcLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div id="rinkeby" className="hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border rounded-md border-gray4 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {curr}{" "}
                  <img
                    src={currlog}
                    className="inline w-6 mx-auto ml-3 duration-200"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-ui-medium ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkbg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Ethselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          ETH
                          <img src={EthLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={Tetherselected}
                          className={`${
                            active
                              ? "bg-blue-700 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          USDT
                          <img src={TetherLogo} className="w-auto h-5 pl-3" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
          <div className="mt-1 text-xs text-gray-500">
            1 {curr} ≈ {currprice} $
          </div>
        <div></div>
        <div>
          <div className="w-9/12 h-px mx-auto my-8 bg-ui-medium" />
          <div
            className={
              processing
                ? "pointer-events-none flex  animate-pulse flex-col items-center justify-center gap-y-8 pb-10 text-black dark:text-white"
                : "flex flex-col  items-center justify-center gap-y-8 pb-10 text-black dark:text-white"
            }
          >
            <button
              className="px-3 py-2 text-lg duration-100 rounded-md btn-ui hover:scale-110 hover:border-transparent"
              onClick={handleMetamask}
              fetching
              disabled={processing}
            >
              Pay with Metamask
              <img
                src={MetamaskConnectLogo}
                className="inline w-auto h-6 ml-5"
              />
            </button>
          </div>
        </div>

      <Transition id="payment-confirmed" appear show={isOpenPay} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={ClosePayModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 shadow-xl dark:border-darkborder rounded-2xl dark:bg-mediumbg">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black dark:text-gray-300"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="w-full mt-2 text-black dark:text-gray-300">
                    <h4>Your payment has been confirmed on the blockchain.</h4>
                    <p className="text-sm">
                      <br />
                      Tx hash : {Storage.hash}
                    </p>
                    <p className="grid w-full gap-5 mx-auto text-sm text-black dark:text-gray-300">
                      <br />
                      <div className="flex mx-auto font-medium gap-7">
                        <div>
                          Network : {net}
                          <img
                            src={currnet}
                            className="inline w-6 mx-auto ml-3 duration-200"
                          />
                        </div>
                        <div>
                          Value : {Storage.hashvalue} {curr}
                          <img
                            src={currlog}
                            className="inline w-6 mx-auto ml-3 duration-200"
                          />
                        </div>
                      </div>
                      <div>
                          From : {Storage.hashfrom} 
                      </div>
                      <div>
                          To : {Storage.hashto} 
                      </div>
                      <br />
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn-ui"
                        onClick={ClosePayModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition id="network-error" appear show={isOpenNetErr} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={CloseErrNetModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 shadow-xl dark:border-darkborder rounded-2xl dark:bg-mediumbg">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black dark:text-gray-300"
                  >
                    Network error <img className="inline h-8 pl-3" src={ErrLogo}/>
                  </Dialog.Title>
                  <div className="w-full mt-5 text-black dark:text-gray-300">
                  <h4>please switch network to <h3 className="inline">{net}</h3><img src={currnet} className="inline w-auto h-8 pl-3" /></h4>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="btn-ui"
                        onClick={CloseErrNetModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition id="Tx-error" appear show={isOpenTxErr} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={CloseErrTxModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 shadow-xl dark:border-darkborder rounded-2xl dark:bg-mediumbg">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black dark:text-gray-300"
                  >
                    Transaction error <img className="inline h-8 pl-3" src={ErrLogo}/>
                  </Dialog.Title>
                  <div className="w-full mt-5 text-black dark:text-gray-300">
                    {Storage.errorTx}
                    <div className="mt-5">
                      <button
                        type="button"
                        className="btn-ui"
                        onClick={CloseErrTxModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition id="install-metamask" appear show={isOpenMeta} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={CloseErrTxModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 shadow-xl dark:border-darkborder rounded-2xl dark:bg-mediumbg">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black dark:text-gray-300"
                  >
                    Metamask not detected <img className="inline h-8 pl-3" src={ErrLogo}/>
                  </Dialog.Title>
                  <div className="w-full mt-5 text-black dark:text-gray-300">
                    Please install Metamask and try again !
                    <div className="mt-5">
                      <button
                        type="button"
                        className="btn-ui"
                        onClick={CloseMetaModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
    </div>
  )
}

export default ManualPayment
