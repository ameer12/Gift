import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

const Web3Context = createContext()

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) throw new Error('useWeb3 must be used within Web3Provider')
  return context
}

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  const CONTRACT_ABI = [
    "function createOrder(string orderId, address customer) public",
    "function updateOrderStatus(string orderId, uint8 status) public",
    "function getOrderStatus(string orderId) public view returns (uint8)",
    "event OrderCreated(string orderId, address customer, uint256 timestamp)",
    "event OrderStatusUpdated(string orderId, uint8 status, uint256 timestamp)"
  ]

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!')
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      setAccount(accounts[0])
      setProvider(provider)
      setContract(contract)
      
      toast.success('Wallet connected successfully!')
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast.error('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setContract(null)
    toast.info('Wallet disconnected')
  }

  const createOrderOnChain = async (orderId) => {
    if (!contract || !account) {
      toast.error('Please connect your wallet first')
      return null
    }

    try {
      const tx = await contract.createOrder(orderId, account)
      await tx.wait()
      toast.success('Order recorded on blockchain!')
      return tx.hash
    } catch (error) {
      console.error('Error creating order on chain:', error)
      toast.error('Failed to record order on blockchain')
      return null
    }
  }

  const getOrderStatus = async (orderId) => {
    if (!contract) return null
    
    try {
      const status = await contract.getOrderStatus(orderId)
      return Number(status)
    } catch (error) {
      console.error('Error getting order status:', error)
      return null
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged')
        window.ethereum.removeAllListeners('chainChanged')
      }
    }
  }, [])

  return (
    <Web3Context.Provider value={{
      account,
      provider,
      contract,
      isConnecting,
      connectWallet,
      disconnectWallet,
      createOrderOnChain,
      getOrderStatus
    }}>
      {children}
    </Web3Context.Provider>
  )
}
