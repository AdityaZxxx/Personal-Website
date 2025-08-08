"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { toast } from "sonner";
import { Button } from "../ui/button";

const WALLET_ADDRESSES = {
  SOL: process.env.NEXT_PUBLIC_SOL_PUBLIC_KEY!,
  ETH: process.env.NEXT_PUBLIC_ETH_PUBLIC_KEY!,
  BTC: process.env.NEXT_PUBLIC_BTC_PUBLIC_KEY!,
};

const coins = [
  {
    id: "SOL",
    name: "Solana",
    icon: SiSolana,
    color: "text-[#9945FF]",
    address: WALLET_ADDRESSES.SOL,
    logo: "/crypto/sol-logo.svg",
  },
  {
    id: "ETH",
    name: "Ethereum",
    icon: SiEthereum,
    color: "text-[#627EEA]",
    address: WALLET_ADDRESSES.ETH,
    logo: "/crypto/eth-logo.svg",
  },
  {
    id: "BTC",
    name: "Bitcoin",
    icon: SiBitcoin,
    color: "text-[#F7931A]",
    address: WALLET_ADDRESSES.BTC,
    logo: "/crypto/btc-logo.svg",
  },
];

type CoinId = "BTC" | "SOL" | "ETH";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export function BuyMeCrypto() {
  const [copiedAddress, setCopiedAddress] = useState("");
  const [activeTab, setActiveTab] = useState<CoinId>(coins[0].id as CoinId);
  const [direction, setDirection] = useState(0);

  const handleCopy = (address: string, coin: CoinId) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast.success(`Copied ${coin} address to clipboard!`);
    setTimeout(() => setCopiedAddress(""), 2000);
  };

  const handleTabChange = (newTabId: string) => {
    const newTab = newTabId as CoinId;
    const oldIndex = coins.findIndex((c) => c.id === activeTab);
    const newIndex = coins.findIndex((c) => c.id === newTab);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const activeCoinData = coins.find((c) => c.id === activeTab)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-fit rounded-3xl border border-neutral-800 bg-neutral-950/60 p-6 md:p-8 backdrop-blur-md shadow-inner shadow-black/10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_100%_at_50%_150%,rgba(120,119,198,0.12),transparent)]" />

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.h3
            className="text-2xl font-semibold text-slate-100 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Support My Work
          </motion.h3>
          <p className="mt-2 max-w-md text-sm text-neutral-400 mx-auto lg:mx-0 leading-relaxed">
            If my content helps you, feel free to tip in crypto. Every donation
            fuels more work and experiments.
          </p>
        </div>

        <div className="w-full max-w-sm mx-auto rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900/60 to-neutral-950 p-4 backdrop-blur-md">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full h-12 grid-cols-3 gap-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-md ">
              {coins.map((coin) => (
                <TabsTrigger
                  key={coin.id}
                  value={coin.id}
                  className="text-sm font-medium py-2 text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-neutral-800/70 transition-colors"
                >
                  <coin.icon className={cn("mr-1 h-4 w-4", coin.color)} />
                  {coin.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4 min-h-[150px] overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="space-y-4 text-center"
                >
                  <p className="text-sm text-neutral-400">
                    Send{" "}
                    <span className={activeCoinData.color}>
                      ${activeCoinData.id}
                    </span>{" "}
                    to the address below or scan QR code.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      handleCopy(
                        activeCoinData.address,
                        activeCoinData.name as CoinId
                      )
                    }
                  >
                    {copiedAddress === activeCoinData.address ? (
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center"
                      >
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Copied!
                      </motion.span>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Address
                      </>
                    )}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full text-neutral-300 hover:text-white"
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        Scan QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-900 border border-neutral-800 text-white backdrop-blur-sm">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <activeCoinData.icon
                            className={cn("h-5 w-5", activeCoinData.color)}
                          />
                          {activeCoinData.name} Address
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-lg shadow-lg">
                          <QRCodeSVG
                            value={activeCoinData.address}
                            size={200}
                            level="H"
                            imageSettings={{
                              src: activeCoinData.logo,
                              height: 40,
                              width: 40,
                              excavate: true,
                            }}
                          />
                        </div>
                        <p className="text-xs text-neutral-400 break-all max-w-xs text-center">
                          {activeCoinData.address}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            handleCopy(
                              activeCoinData.address,
                              activeCoinData.name as CoinId
                            )
                          }
                        >
                          {copiedAddress === activeCoinData.address ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}
                          {copiedAddress === activeCoinData.address
                            ? "Copied!"
                            : "Copy Address"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}
