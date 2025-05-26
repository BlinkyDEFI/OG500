import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOKEN_AMOUNT } from '@/utils/config';
import { useToast } from "@/hooks/use-toast";

interface MintFormProps {
  blinkyBalance: number | null;
  onMintSingle: () => Promise<{ success: boolean; error?: string }>;
  onMintComplete: (nftName: string) => void;
  onUpdateBalance: () => Promise<void>;
  status: string;
  setStatus: (status: string) => void;
  itemsRedeemed: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const MintForm: React.FC<MintFormProps> = ({ 
  blinkyBalance, 
  onMintSingle,
  onMintComplete,
  onUpdateBalance,
  status,
  setStatus,
  itemsRedeemed,
  isLoading,
  setIsLoading
}) => {
  const [mintAmount, setMintAmount] = useState(1);
  const { toast } = useToast();

  const costPerNft = Number(TOKEN_AMOUNT) / 1_000_000;

  const handleMintClick = async () => {
    if (mintAmount < 1 || mintAmount > 10) {
      toast({
        title: "Invalid Amount",
        description: "Please select between 1-10 NFTs to mint",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setStatus(`Starting mint process for ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}...`);

    for (let i = 1; i <= mintAmount; i++) {
      try {
        setStatus(`Minting NFT ${i} of ${mintAmount}... Please approve in your wallet.`);
        
        const result = await onMintSingle();
        
        if (result.success) {
          setStatus(`✅ NFT ${i} of ${mintAmount} minted successfully!`);
          
          // Update balance after successful mint
          await onUpdateBalance();
          
          // Show success for this mint
          onMintComplete("Blinky OG VIP NFT");
          
          // Small delay between mints to prevent issues
          if (i < mintAmount) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } else {
          setStatus(`❌ Mint ${i} failed: ${result.error}`);
          setIsLoading(false);
          
          toast({
            title: "Mint Failed",
            description: `NFT ${i}: ${result.error}`,
            variant: "destructive",
          });
          return; // Stop the loop on error
        }
      } catch (error: any) {
        console.error(`Mint ${i} error:`, error);
        setStatus(`❌ Mint ${i} failed`);
        setIsLoading(false);
        
        toast({
          title: "Mint Failed",
          description: `NFT ${i}: ${error.message || "Unknown error"}`,
          variant: "destructive",
        });
        return; // Stop the loop on error
      }
    }

    // All mints completed successfully
    setIsLoading(false);
    setStatus(`✅ All ${mintAmount} NFTs minted successfully!`);
    
    toast({
      title: "Minting Complete!",
      description: `Successfully minted all ${mintAmount} NFTs`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Balance display */}
      {blinkyBalance !== null && (
        <div className="text-center text-green-400 font-medium">
          Your BLINKY Balance: {blinkyBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      )}
      
      {/* Mint amount selector */}
      <div className="flex items-center justify-between">
        <label className="text-green-400 font-medium">
          Mint Amount:
        </label>
        <Input
          type="number"
          min={1}
          max={10}
          value={mintAmount}
          onChange={(e) => setMintAmount(Number(e.target.value))}
          disabled={isLoading}
          className="w-20 text-center bg-gray-800 border-gray-700 text-white"
        />
      </div>
      
      {/* Cost display */}
      <div className="text-center text-green-400 text-sm">
        Cost per mint: {costPerNft} BLINKY
      </div>
      
      {/* Total cost display */}
      <div className="text-center text-white text-sm">
        Total cost: {(costPerNft * mintAmount).toFixed(2)} BLINKY
      </div>
      
      {/* Mint button */}
      <Button
        onClick={handleMintClick}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md font-medium"
      >
        {isLoading ? 'Processing...' : `Mint ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}`}
      </Button>
      
      {/* Instructions */}
      <div className="p-3 bg-gray-800 rounded-md border border-gray-700">
        <p className="text-sm text-green-400">
          Select the number of NFTs to mint (1-10). Each NFT will require wallet approval and will be minted individually.
        </p>
      </div>
      
      {/* Status display */}
      <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
        <p className="text-sm text-green-400 font-medium">
          Status: <span className="font-normal">{status || 'Ready to mint'}</span>
        </p>
        <p className="text-sm text-green-400 font-medium">
          Items Redeemed: <span className="font-normal">{itemsRedeemed}</span>
        </p>
      </div>
    </div>
  );
};

export default MintForm;
