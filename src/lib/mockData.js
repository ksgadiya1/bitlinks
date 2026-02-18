// Mock news data for testing when database is unavailable
export const mockNewsData = [
    {
        id: "1",
        slug: "bitcoin-reaches-new-high",
        title: "Bitcoin Reaches New All-Time High Above $100,000",
        description: "Bitcoin has surpassed the $100,000 mark for the first time in history, driven by institutional adoption and positive regulatory developments.",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop",
        source_url: "https://example.com/bitcoin-ath",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
        id: "2",
        slug: "ethereum-upgrade-success",
        title: "Ethereum Successfully Completes Major Network Upgrade",
        description: "The Ethereum network has successfully implemented its latest upgrade, improving scalability and reducing transaction fees significantly.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        source_url: "https://example.com/eth-upgrade",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
        id: "3",
        slug: "crypto-regulation-update",
        title: "SEC Announces New Framework for Cryptocurrency Regulation",
        description: "The Securities and Exchange Commission has released comprehensive guidelines for cryptocurrency exchanges and digital asset securities.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
        source_url: "https://example.com/sec-crypto",
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    },
    {
        id: "4",
        slug: "defi-protocol-launch",
        title: "Major DeFi Protocol Launches on Multiple Blockchains",
        description: "A leading decentralized finance protocol has expanded to support Ethereum, Polygon, and Arbitrum, offering cross-chain liquidity.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
        source_url: "https://example.com/defi-launch",
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    },
    {
        id: "5",
        slug: "nft-marketplace-record",
        title: "NFT Marketplace Reports Record Trading Volume",
        description: "Leading NFT platforms have seen a surge in trading activity, with monthly volumes reaching new highs across major collections.",
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=600&fit=crop",
        source_url: "https://example.com/nft-volume",
        created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    },
    {
        id: "6",
        slug: "blockchain-adoption-enterprise",
        title: "Fortune 500 Companies Increase Blockchain Adoption",
        description: "A new survey reveals that over 60% of Fortune 500 companies are now actively using or exploring blockchain technology for various use cases.",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
        source_url: "https://example.com/enterprise-blockchain",
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
];
