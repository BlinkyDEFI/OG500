import React from 'react';
import { WalletMultiButton } from "@/components/WalletMultiButton";

interface WalletStatusProps {
  connected: boolean;
}

export const WalletStatus: React.FC<WalletStatusProps> = ({ connected }) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <WalletMultiButton />
      </div>
      
      {!connected && (
        <div className="space-y-3">
          <div className="text-center text-green-400 py-2">
            Connect your wallet to mint.
          </div>
          <div className="p-3 bg-gray-800 rounded-md border border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              Phantom and Solflare wallets have been tested. Other wallets may appear as options but are used at your own risk.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletStatus;
