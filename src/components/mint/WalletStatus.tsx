import React from 'react';
import { WalletMultiButton } from "@/components/WalletMultiButton";
import { AlertTriangle } from 'lucide-react';

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
          <p className="text-xs text-yellow-200/90 text-center leading-relaxed">
            Phantom and Solflare wallets have been tested. Other wallets may appear as options but are used at your own risk.
          </p>
        </div>
      )}
    </>
  );
};

export default WalletStatus;
