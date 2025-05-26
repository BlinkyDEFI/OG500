import React, { createContext, useContext, useMemo } from 'react';
import { useState } from "react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useCandyMachine } from "@/hooks/useCandyMachine";
import NFTDisplay from "@/components/mint/NFTDisplay";
import MintForm from "@/components/mint/MintForm";
import SuccessModal from "@/components/mint/SuccessModal";
import WalletStatus from "@/components/mint/WalletStatus";

export const MintingApp = () => {
  const { wallet, blinkyBalance, fetchUserBlinkyBalance } = useWalletBalance();
  const { mintSingle, isLoading, isInitialized, candyMachineInfo, setIsLoading } = useCandyMachine();
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mintedNftName, setMintedNftName] = useState("");

  // Handle single NFT minting
  const handleMintSingle = async () => {
    if (!wallet.connected || !isInitialized) {
      return { success: false, error: 'Wallet not connected or candy machine not initialized' };
    }
    
    try {
      const result = await mintSingle();
      return result;
    } catch (err: any) {
      console.error('Mint error:', err);
      return { success: false, error: err.message || 'Unknown error' };
    }
  };

  // Handle mint completion (show success modal)
  const handleMintComplete = (nftName: string) => {
    setMintedNftName(nftName);
    setIsModalOpen(true);
  };

  // Show loading state while initializing
  if (wallet.connected && !isInitialized && isLoading) {
    return (
      <div className="min-h-screen bg-blinky-dark flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-blinky-darkblue rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-green-400 mb-6">
              Blinky OG VIP Mint
            </h1>
            <div className="text-green-400">
              Loading Candy Machine data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blinky-dark flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-blinky-darkblue rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
              Blinky OG VIP Mint
            </h1>
            
            {/* NFT Image */}
            <NFTDisplay 
              imageUrl="https://blinkyonsol.com/wp-content/uploads/2025/04/Blinky-OG-VIP-4K-1.png"
                          />
            
            {/* Wallet Connect Button */}
            <WalletStatus connected={wallet.connected} />
            
            {/* Main Content - Conditional based on wallet connection */}
            {wallet.connected && isInitialized && (
              <MintForm
                blinkyBalance={blinkyBalance}
                onMintSingle={handleMintSingle}
                onMintComplete={handleMintComplete}
                onUpdateBalance={fetchUserBlinkyBalance}
                status={status}
                setStatus={setStatus}
                itemsRedeemed={candyMachineInfo?.itemsRedeemed?.toString() || '0'}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}

            {/* More Info Link */}
            {!wallet.connected && (
              <div className="text-center mt-4">
                <a 
                  href="https://blinkyonsol.com/mint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 underline text-sm"
                >
                  More Info About NFT Minting
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Company Logo and Footer */}
      <div className="mt-auto pb-4">
        <div className="text-center mb-4">
          <img
            src="https://blinkyonsol.com/wp-content/uploads/2025/02/Blinky_T_S_Smile_2_.png"
            alt="Blinky Logo"
            className="h-16 w-auto mx-auto"
          />
        </div>
        
        {/* Powered by Footer */}
        <div className="text-center">
          <a 
            href="https://blinkyonsol.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Powered by Blinky on Sol
          </a>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        nftName={mintedNftName} 
      />
    </div>
  );
};

export default MintingApp;
